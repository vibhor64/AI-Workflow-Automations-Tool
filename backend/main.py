from fastapi import FastAPI, Depends, HTTPException, status, Response, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import utils.auth as auth
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
from utils.deployment import execute_pipeline
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from utils.validate import checkDAG, isConnected, countIONodes
from models import Node, Edge, Pipeline, PipelineInputs, UserCreate, Token, Epic_DB
from utils.database import find_user, register_user, update_user, delete_user, add_template

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=auth.GOOGLE_CLIENT_SECRET)

# OAuth Configuration
config = Config(environ={"GOOGLE_CLIENT_ID": auth.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_SECRET": auth.GOOGLE_CLIENT_SECRET})
oauth = OAuth(config)
oauth.register(
    name="google",
    client_id=config("GOOGLE_CLIENT_ID"),
    client_secret=config("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

# Dependency to get the current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except auth.JWTError:
        raise credentials_exception
    user = await find_user(username)
    if not user:
        raise credentials_exception
    return user

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    # print(pipeline)
    num_nodes = len(pipeline.formattedNodes)
    num_edges = len(pipeline.formattedEdges)
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    inp, out, integration = countIONodes(pipeline.formattedNodes)
    if not is_dag or not is_con:
        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out, "output": 'NONE'}
    
    output = 'Deployed'
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out,"integration" : integration, "output": output}

@app.post('/deployment/parse')
def parse_deployment(pipeline: Pipeline):
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    if not is_dag or not is_con:
        return {"pipelineOutput": "<h1>Invalid Pipeline!</h1> <p>Your pipeline is either not fully connected, or contains a cycle.</p>"}
    pipelineOutput = execute_pipeline(pipeline)
    return {"pipelineOutput": pipelineOutput}

# Authorization
@app.post("/register", response_model=Token)
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
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60, 
        secure=True,  # Use True if using HTTPS
        samesite="strict",  # Strict cookie policy
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None):
    try:
        user = await auth.authenticate_user(form_data.username, form_data.password)
        if user is None:
            raise HTTPException(status_code=400, detail="Incorrect username or password")
        access_token = auth.create_access_token(data={"sub": user["_id"]})
        refresh_token = auth.create_refresh_token(data={"sub": user["_id"]})
        # Set the refresh token as an HTTP-only cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60, 
            secure=True,  # Use only for HTTPS
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error in /token endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get All User Data
@app.get("/users/me")
def read_users_me(current_user: Epic_DB = Depends(get_current_user)):
    return current_user

@app.post("/refresh", response_model=Token)
def refresh(response: Response, refresh_token: str = Depends(oauth2_scheme)):
    """
    Checks if the user has a valid refresh token for seamless login.
    """
    try:
        username = auth.verify_refresh_token(refresh_token)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    # Create new tokens
    access_token = auth.create_access_token(data={"sub": username})
    new_refresh_token = auth.create_refresh_token(data={"sub": username})

    # Update the refresh token cookie
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        secure=True,  # Use True if using HTTPS
        samesite="strict",  # Strict cookie policy
    )

    return {"access_token": access_token, "token_type": "bearer"}

# Google Authentication
@app.get("/auth/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/google/callback")
async def google_callback(request: Request, response: Response):
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
        hashed_password = auth.get_password_hash("google")  # Use a dummy password or handle separately
        # auth.fake_users_db[username] = auth.User(username=username, hashed_password=hashed_password)
        result = await register_user(username, hashed_password)
        # if result["status"] != "success":
        #     raise HTTPException(status_code=400, detail=result["message"])

    # Generate tokens
    access_token = auth.create_access_token(data={"sub": username})
    refresh_token = auth.create_refresh_token(data={"sub": username})

    # Set the tokens as HTTP-only cookies
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        secure=False,  # Use True if using HTTPS
        samesite="lax",
    )

    # Redirect to the frontend after setting cookies
    redirect_url = f"http://localhost:3000?access_token={access_token}"
    return RedirectResponse(redirect_url)

# Database operations
# Fetch user data
# @app.get('/database/fetch_user_data')
# async def fetch_user_data(username: str):
#     user = await find_user(username)
#     if user:
#         return user
#     else:
#         raise HTTPException(status_code=404, detail="User not found")

# # Register user
# @app.post('/database/register_user')
# async def call_register_user(username: str, password: str):
#     result = await register_user(username, password)
#     if result["status"] == "success":
#         return result
#     else:
#         raise HTTPException(status_code=400, detail=result["message"])
    
# # Update user
# @app.put('/database/update_user')
# async def call_update_user(username: str, password: str):
#     result = await update_user(username, password)
#     if result["status"] == "success":
#         return result
#     else:
#         raise HTTPException(status_code=400, detail=result["message"])

# # Delete user
# @app.delete('/database/delete_user')
# async def call_delete_user(username: str):
#     result = await delete_user(username)
#     if result["status"] == "success":
#         return result
#     else:
#         raise HTTPException(status_code=400, detail=result["message"])

# Template operations

# Add template
@app.post('/database/add_template')
async def call_add_template(template_data: dict, current_user: auth.User = Depends(get_current_user)):
    result = await add_template(current_user.username, template_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])