import json
from fastapi import FastAPI, Depends, HTTPException, status, Response, Request, Query, Cookie, Header
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from backend.routers import google
import utils.auth as auth
from utils.auth import oauth2_scheme, get_current_user
from fastapi.middleware.cors import CORSMiddleware
from utils.deployment import execute_pipeline
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request as GoogleRequest
from googleapiclient.discovery import build
from utils.validate import checkDAG, isConnected, countIONodes
from models import Node, Edge, Pipeline, PipelineInputs, UserCreate, Token, Epic_DB, BookID, PipelineRequest, ModifyBook, DocumentCreate
from utils.database import find_user, register_user, add_template, add_book, modify_book, remove_book, fetch_google_creds, save_google_creds
import base64
from email.message import EmailMessage
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email import message_from_bytes
from routers import discord, google as google_integrations, notion, airtable
from utils.pipeline_db import save_pipeline, get_pipeline, delete_pipeline, get_all_pipelines
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

"""
- Webhook endpoint for discord to test payload details
- Explore and complete google webhooks similarly
- Add feature for deploying normal pipelines as well?
- Resource: https://chat.deepseek.com/a/chat/s/2b1f814a-d95b-48ef-a5ba-5e9146163c49
- https://chatgpt.com/share/67c04b7b-5fa4-8002-8cf6-cec2749d52a3
- Test the public api: /pipelines/{pipeline_id}
- Include Redis and Celery
- Fix connector
- Fix filedValues for all instances, not just integrations


|| Work on nodes UI
"""
private_app = FastAPI(title="Private API")

private_app.include_router(google_integrations.router)
private_app.include_router(discord.router)
private_app.include_router(notion.router)
private_app.include_router(airtable.router)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# oauth2_scheme = auth.oauth2_scheme

# private_app.add_middleware(HTTPSRedirectMiddleware)
private_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

private_app.add_middleware(SessionMiddleware, secret_key=auth.GOOGLE_CLIENT_SECRET)

SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
    # "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/forms.body.readonly",
    "openid",
]
# create new route for google integration to seperate code for auth and inte
# 

# OAuth Configuration
config = Config(environ={"GOOGLE_CLIENT_ID": auth.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_SECRET": auth.GOOGLE_CLIENT_SECRET})
oauth = OAuth(config)
oauth.register(
    name="google",
    client_id=config("GOOGLE_CLIENT_ID"),
    client_secret=config("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    # client_kwargs={"scope": "openid email profile"},
    # client_kwargs={"scope": " ".join(SCOPES)},
    # client_kwargs={
    #     "scope": " ".join(SCOPES),
    #     "prompt": "consent",  # Force consent screen to ensure refresh token
    # }
)

@private_app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    # print(pipeline)
    num_nodes = len(pipeline.formattedNodes)
    num_edges = len(pipeline.formattedEdges)
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    inp, out, integration_input, integration_output = countIONodes(pipeline.formattedNodes)
    if not is_dag or not is_con:
        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out, "output": 'NONE'}
    
    output = 'Deployed'
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out,"integration_input": integration_input, "integration_output": integration_output, "output": output}

@private_app.post('/deployment/parse')
def parse_deployment(pipeline: Pipeline):
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    if not is_dag or not is_con:
        return {"pipelineOutput": "<h1>Invalid Pipeline!</h1> <p>Your pipeline is either not fully connected, or contains a cycle.</p>"}
    pipelineOutput = execute_pipeline(pipeline)
    return {"pipelineOutput": pipelineOutput}

@private_app.post('/automation/execute')
async def execute_automation(pipeline: Pipeline, request: Request):
    if isinstance(pipeline, dict):  
        pipeline = Pipeline(**pipeline)
    # Extract query parameters from the request
    query_params = dict(request.query_params)
    
    # Filter nodes where name == "Input"
    input_nodes = [node for node in pipeline.formattedNodes if node.name == "Input"]
    
    # Validate that the number of query parameters matches the number of input nodes
    if len(query_params) != len(input_nodes):
        raise HTTPException(
            status_code=400,
            detail="Mismatch between the number of query parameters and input nodes. You may leave some query parameters blank."
        )
    
    # Replace fieldValue1 in input nodes with corresponding query parameter values
    query_param_keys = set(query_params.keys())
    for node in input_nodes:
        if node.fieldValue1 in query_param_keys:
            node.fieldValue1 = query_params[node.fieldValue1]
            # query_param_keys.remove(node.fieldValue1)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"No query parameter found for input node: {node.fieldValue1}"
            )
    
    # Execute the pipeline
    print("Executing pipeline...")
    pipelineOutput = execute_pipeline(pipeline)
    return {"pipelineOutput": pipelineOutput}


@private_app.post('/automate')
async def parse_automation(pipeline: Pipeline, name: str, current_user = Depends(get_current_user)):
    """
    Deploy the pipeline for automation
    The pipeline will have input field values as name of the inputs so user can specify the values as query params while calling the pipeline

    Inputs:
        pipeline: to be deployed
        access token: for username

    Returns:
        API endpoint for the pipeline

    """
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    if not is_dag or not is_con:
        raise HTTPException(status_code=400, detail="Invalid Pipeline! Your pipeline is either not fully connected, or contains a cycle.")
    
    res = await save_pipeline(pipeline, name, username=current_user["username"])
    if res["status"] != "success":
        raise HTTPException(status_code=500, detail=res["message"])
    pipeline_id = res["pipeline_id"]

    # Return the pipeline ID and execution instructions
    return {
        "pipeline_id": pipeline_id,
        "message": "Pipeline created successfully",
    }

@private_app.post('/pipelines/{pipeline_id}')
async def execute_pipeline_endpoint(pipeline_id: str, request: Request):
    # Fetch the pipeline configuration from MongoDB
    pipeline_result = await get_pipeline(pipeline_id)
    if pipeline_result["status"] != "success":
        raise HTTPException(status_code=404, detail=pipeline_result["message"])
    if not pipeline_result["pipeline"]:
        raise HTTPException(status_code=404, detail="Pipeline does not exist")

    # Execute the pipeline's code
    try:
        print(f"Executing pipeline: {pipeline_id}")
        pipeline_output = await execute_automation(pipeline_result["pipeline"], request)
        print(f"Pipeline output: {pipeline_output}")
        return {"message": f"Pipeline {pipeline_id} executed successfully", "result": pipeline_output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing pipeline: {str(e)}")

@private_app.get('/server/pipelines/fetch_all')
async def fetch_pipelines(current_user = Depends(get_current_user)):
    data = await get_all_pipelines(current_user["username"])
    return data

@private_app.post('/server/pipelines/fetch_one')
async def fetch_one_pipeline(request_body: PipelineRequest):
    pipeline_id = request_body.pipeline_id
    print("Received pipeline_id:", pipeline_id)
    if not pipeline_id:
        raise HTTPException(status_code=400, detail="pipeline_id is required")
    
    # Fetch the pipeline
    result = await get_pipeline(pipeline_id)
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    # print(result)
    return result["pipeline"]

@private_app.delete('/server/pipelines/delete_one')
async def delete_pipe(request_body: PipelineRequest, current_user = Depends(get_current_user)):
    pipeline_id = request_body.pipeline_id
    try:
        return await delete_pipeline(pipeline_id, current_user["username"])
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# Authorization
@private_app.post("/register", response_model=Token)
async def register(user: UserCreate, response: Response):
    check_user = await find_user(user.username)
    if check_user is not None:
        print("User: ", check_user)
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = auth.get_password_hash(user.password)
    # auth.fake_users_db[user.username] = auth.User(username=user.username, hashed_password=hashed_password)
    result = await register_user(user.username, hashed_password)
    if result["status"] != "success":
        raise HTTPException(status_code=400, detail=result["message"])
    
    access_token = auth.create_access_token(data={"sub": user.username})
    refresh_token = auth.create_refresh_token(data={"sub": user.username})
    # Set the refresh token as an HTTP-only cookie
    # response.set_cookie(
    #     key="refresh_token",
    #     value=refresh_token,
    #     httponly=True,
    #     max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60, 
    #     secure=True,  # Use True if using HTTPS
    #     samesite="strict",  # Strict cookie policy
    # )

    max_age = auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60

    cookie_value = f"refresh_token={refresh_token}; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age={max_age}; Path=/"
    response.headers["Set-Cookie"] = cookie_value
    
    return {"access_token": access_token, "token_type": "bearer"}

@private_app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None):
    try:
        user = await auth.authenticate_user(form_data.username, form_data.password)
        if user is None:
            raise HTTPException(status_code=400, detail="Incorrect username or password")
        access_token = auth.create_access_token(data={"sub": user["_id"]})
        refresh_token = auth.create_refresh_token(data={"sub": user["_id"]})

        # Calculate the expiry time
        max_age = auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
        
        # Set the refresh token as an HTTP-only cookie with Partitioned attribute
        cookie_value = f"refresh_token={refresh_token}; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age={max_age}; Path=/"
        response.headers["Set-Cookie"] = cookie_value


        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error in /token endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get All User Data
@private_app.get("/users/me")
def read_users_me(current_user: Epic_DB = Depends(get_current_user)):
    return current_user

@private_app.get("/users/username")
def read_users_me(current_user: Epic_DB = Depends(get_current_user)):
    ans = current_user["username"]
    return {"username" : ans}

# Get Books
@private_app.get("/users/books")
def read_users_me(current_user: Epic_DB = Depends(get_current_user)):
    return current_user.get('books', [])

# Get Templates
@private_app.get("/users/templates")
def read_users_me(current_user: Epic_DB = Depends(get_current_user)):
    return current_user.get("templates", [])

@private_app.post("/refresh", response_model=Token)
def refresh(response: Response, refresh_token: str = Cookie(None)):
    """
    Checks if the user has a valid refresh token for seamless login.
    """
    print("Refresh Token: ", refresh_token)
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
    try:
        username = auth.verify_refresh_token(refresh_token)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    # Create new tokens
    access_token = auth.create_access_token(data={"sub": username})
    new_refresh_token = auth.create_refresh_token(data={"sub": username})

    # Calculate the expiry time
    max_age = auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    
    # Set the refresh token as an HTTP-only cookie with Partitioned attribute
    cookie_value = f"refresh_token={new_refresh_token}; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age={max_age}; Path=/"
    response.headers["Set-Cookie"] = cookie_value

    return {"access_token": access_token, "token_type": "bearer"}

# Logout
@private_app.post("/logout")
async def logout(response: Response):
    # Clear the refresh_token cookie
    # response.delete_cookie(
    #     key="refresh_token",
    #     path="/",
    #     httponly=True,
    #     secure=True,
    #     samesite="none"
    # )
    response.headers["Set-Cookie"] = f"refresh_token=; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age=0; Path=/"
    
    print("Logout successful")
    return {"message": "Logged out successfully"}

# Google Authentication
@private_app.get("/auth/google")
async def google_login(request: Request):
    """Handles Google login for authentication purposes (not integrations)."""
    # redirect_uri = request.url_for("google_callback")
    redirect_uri = "http://127.0.0.1:8000/private/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri, scope="openid email profile")

@private_app.get("/auth/google/callback")
async def google_callback(request: Request, response: Response):
    """Processes Google authentication and logs in the user."""
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    if not user_info:
        raise HTTPException(status_code=400, detail="Google login failed")

    # Check if the user exists in your fake_users_db or create a new user
    username = user_info["email"]
    check_user = await find_user(username)
    # if username not in auth.fake_users_db:
    if check_user is None:
        # Create a new user in your fake_users_db
        hashed_password = auth.get_password_hash(username)  # Use a dummy password or handle separately
        # auth.fake_users_db[username] = auth.User(username=username, hashed_password=hashed_password)
        result = await register_user(username, hashed_password)
        # if result["status"] != "success":
        #     raise HTTPException(status_code=400, detail=result["message"])

    # Generate tokens
    access_token = auth.create_access_token(data={"sub": username})
    refresh_token = auth.create_refresh_token(data={"sub": username})

    # Calculate the expiry time
    max_age = auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60

    # Create the redirect response
    redirect_url = f"http://localhost:3000/login?access_token={access_token}"
    redirect_response = RedirectResponse(url=redirect_url)
   
    # Set cookie using the same format as your working endpoints
    cookie_value = f"refresh_token={refresh_token}; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age={max_age}; Path=/"
    redirect_response.headers["Set-Cookie"] = cookie_value
   
    return redirect_response

@private_app.post("/auth/google/get_refresh_token", response_model=Token)
def get_refresh_token(response: Response, current_user = Depends(get_current_user)):
    """
    Takes an access token and returns a refresh token.
    Expects the access token in the Authorization header as 'Bearer {token}'.
    """
    # Create a refresh token
    username = current_user["username"]
    refresh_token = auth.create_refresh_token(data={"sub": username})
    
    # Calculate the expiry time
    max_age = auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    
    # Set the refresh token as an HTTP-only cookie with Partitioned attribute
    cookie_value = f"refresh_token={refresh_token}; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age={max_age}; Path=/"
    response.headers["Set-Cookie"] = cookie_value
    
    print("refresh_token: ", refresh_token)
    return {"access_token": "Refresh token created successfully", "token_type": "bearer"}

# Google Integrations Auth
@private_app.get("/auth/google/integration")
async def google_integration_login(request: Request):
    """Starts Google OAuth for API integrations."""

    try:
        redirect_uri = "http://127.0.0.1:8000/private/auth/google/integration/callback"  # Explicitly set redirect URI
        print(f"Redirect URI: {redirect_uri}")
        return await oauth.google.authorize_redirect(request, redirect_uri, scope=SCOPES, access_type="offline", prompt="consent")
    except Exception as e:
        print(f"Authorization error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to initiate OAuth: {str(e)}")

@private_app.get("/auth/google/integration/callback")
async def google_integration_callback(request: Request):
    """Handles OAuth callback for Google API integrations."""
    print("OAuth Callback Query Params:", request.query_params)  # Debugging log

    token = await oauth.google.authorize_access_token(request)
    print("OAuth Token Response:", token)  # Debugging log
    print("OAuth Token Response:", type(token))  # Debugging log
    user_info = token.get("userinfo")

    if not user_info:
        raise HTTPException(status_code=400, detail="Google login failed")
    
    user_email = user_info.get("email")
    if not user_email:
        raise HTTPException(status_code=400, detail="Email not found in Google user info")

    # Store Google OAuth credentials securely
    creds_dict = {
        "user_email": user_email,
        "token": token["access_token"],
        "refresh_token": token.get("refresh_token"),
        "token_uri": "https://oauth2.googleapis.com/token",
        "client_id": auth.GOOGLE_CLIENT_ID,
        "client_secret": auth.GOOGLE_CLIENT_SECRET,
        "scopes": token.get("scope", "").split(),
    }

    print("Google OAuth Credentials:", creds_dict)
    creds_json = json.dumps(creds_dict)

    # await save_google_creds(username, creds_dict)  # Store in DB securely

    # Redirect user to frontend with access token
    redirect_url = f"http://localhost:3000/login?creds_dict={creds_json}"
    return RedirectResponse(redirect_url)

@private_app.post("/auth/google/validate")
async def validate_google_credentials(current_user=Depends(get_current_user)):
    """
    Validates the user's Google OAuth credentials by checking token expiry and refreshing if necessary.
    """
    try:
        # Step 1: Fetch the user's stored credentials from the database
        username = current_user["username"]
        creds_dict = await fetch_google_creds(username)
        if not creds_dict:
            raise HTTPException(status_code=401, detail="No Google credentials found.")

        creds = Credentials(
            token=creds_dict["token"],
            refresh_token=creds_dict.get("refresh_token"),
            token_uri=creds_dict["token_uri"],
            client_id=creds_dict["client_id"],
            client_secret=creds_dict["client_secret"],
            scopes=creds_dict["scopes"],
        )

        # Step 3: Check if the token is expired
        if creds.expired:
            if creds.refresh_token:
                # Step 4: Refresh the token if expired
                creds.refresh(Request())
                # Update the refreshed credentials in the database
                await save_google_creds(username, {
                    "token": creds.token,
                    "refresh_token": creds.refresh_token,
                    "token_uri": creds.token_uri,
                    "client_id": creds.client_id,
                    "client_secret": creds.client_secret,
                    "scopes": creds.scopes,
                })
            else:
                return {"valid": False, "message": "Google credentials are invalid."}

        # Step 5: Return validation result
        return {"valid": True, "message": "Google credentials are valid."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to validate credentials: {str(e)}")

@private_app.post('/database/add_google_creds')
async def call_save_google_creds(creds_dict: dict, current_user = Depends(get_current_user)):
    # print("creds_dict: ", creds_dict)
    result = await save_google_creds(current_user["username"], creds_dict)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

@private_app.get('/database/get_google_service')
async def call_fetch_google_creds(current_user = Depends(get_current_user)):
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username) 

    if not creds_dict:
        raise HTTPException(status_code=401, detail="No Google credentials found.")

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        await save_google_creds(username, creds.to_json())  # Update refreshed creds in DB

    return creds

# Template operations
# Add template
@private_app.post('/database/add_template')
async def call_add_template(template_data: dict, current_user = Depends(get_current_user)):
    result = await add_template(current_user["username"], template_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])


# Book Operations
# Add book
@private_app.post('/database/add_book')
async def call_add_book(book_data: dict, current_user = Depends(get_current_user)):
    # user = Epic_DB(**current_user)
    result = await add_book(current_user["username"], book_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

# Remove book
@private_app.delete('/database/remove_book')
async def call_remove_book(book_id: BookID, current_user = Depends(get_current_user)):
    result = await remove_book(current_user["username"], book_id.book_id)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

# Modify book
@private_app.put('/database/modify_book')
async def call_modify_book(book: ModifyBook, current_user = Depends(get_current_user)):
    result = await modify_book(current_user["username"], book.id, book.new_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])