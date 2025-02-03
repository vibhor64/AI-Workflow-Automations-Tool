import json
from fastapi import FastAPI, Depends, HTTPException, status, Response, Request, Query
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import utils.auth as auth
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
from models import Node, Edge, Pipeline, PipelineInputs, UserCreate, Token, Epic_DB, BookName, ModifyBook, DocumentCreate
from utils.database import find_user, register_user, add_template, add_book, modify_book, remove_book, fetch_google_creds, save_google_creds
import base64
from email.message import EmailMessage
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email import message_from_bytes


'''
# 1. Form routes for cleaner code
# 2. Test integration for all google services
# 3. Create nodes for all google services
'''


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

SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
    # "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
    "openid"
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
            samesite="None",  # Strict cookie policy
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
    print("Refresh Token: ", refresh_token)
    try:
        print("Stage 2")
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
        samesite="None",  # Strict cookie policy
    )

    return {"access_token": access_token, "token_type": "bearer"}

# Google Authentication
@app.get("/auth/google")
async def google_login(request: Request):
    """Handles Google login for authentication purposes (not integrations)."""
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri, scope="openid email profile")

@app.get("/auth/google/callback")
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
    redirect_url = f"http://localhost:3000/login?access_token={access_token}"
    return RedirectResponse(redirect_url)

# Google Integrations Auth
@app.get("/auth/google/integration")
async def google_integration_login(request: Request):
    """Starts Google OAuth for API integrations."""

    try:
        redirect_uri = "http://127.0.0.1:8000/auth/google/integration/callback"  # Explicitly set redirect URI
        print(f"Redirect URI: {redirect_uri}")
        return await oauth.google.authorize_redirect(request, redirect_uri, scope=SCOPES)
    except Exception as e:
        print(f"Authorization error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to initiate OAuth: {str(e)}")

@app.get("/auth/google/integration/callback")
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

    creds_json = json.dumps(creds_dict)

    # await save_google_creds(username, creds_dict)  # Store in DB securely

    # Redirect user to frontend with access token
    redirect_url = f"http://localhost:3000/login?creds_dict={creds_json}"
    return RedirectResponse(redirect_url)

@app.post('/database/add_google_creds')
async def call_save_google_creds(creds_dict: dict, current_user = Depends(get_current_user)):
    print("creds_dict: ", creds_dict)
    result = await save_google_creds(current_user["username"], creds_dict)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

@app.get('/database/get_google_service')
async def call_fetch_google_creds(current_user = Depends(get_current_user)):
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username)  # Fetch from DB

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


@app.get('/integrations/send_draft')
async def send_draft(isDraft: bool = Query(True, description="Whether to send as a draft"), current_user = Depends(get_current_user)):
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username)  # Fetch from DB
    user_email = creds_dict["user_email"]
    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    try:
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            await save_google_creds(username, creds.to_json())  # Update refreshed creds in DB
        elif (creds.expired) and not creds.refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token found. User needs to authorize again.")
        
        # create gmail api client
        service = build("gmail", "v1", credentials=creds)

        message = EmailMessage()

        message.set_content("This is automated draft mail 2")

        message["To"] = "vibhor05sharma@gmail.com"
        message["From"] = str(user_email)
        message["Subject"] = "Automated draft"

        # encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        # pylint: disable=E1101

        if isDraft:
            create_message = {"message": {"raw": encoded_message}}
            draft = (
                service.users()
                .drafts()
                .create(userId="me", body=create_message)
                .execute()
            )
            # print(f'Draft id: {draft["id"]}\nDraft message: {draft["message"]}')
        else:
            create_message = {"raw": encoded_message}
            send_message = (
                service.users()
                .messages()
                .send(userId="me", body=create_message)
                .execute()
            )
            # print(f'Message Id: {send_message["id"]}')


    except HttpError as error:
        print(f"An error occurred: {error}")
        draft = None

@app.get('/integrations/read_emails')
async def read_emails(max_results: int = Query(10, description="Maximum number of unread emails to fetch"), labels: str = Query("INBOX", description="Comma-separated list of labels"), current_user = Depends(get_current_user)):
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username)

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    try:
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            await save_google_creds(username, creds.to_json())
        elif creds.expired and not creds.refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token found. User needs to authorize again.")

        service = build("gmail", "v1", credentials=creds)

        label_list = [label.strip().upper() for label in labels.split(",") if label.strip()]

        # Convert standard labels to Gmail API format
        gmail_labels = []
        special_mappings = {
            "UNREAD": "is:unread",
            "READ": "is:read",
            "STARRED": "is:starred",
            "DRAFT": "label:DRAFT",
            "SENT": "label:SENT",
            "SPAM": "label:SPAM",
            "TRASH": "label:TRASH"
        }
    
        for label in label_list:
            if label in special_mappings:
                gmail_labels.append(special_mappings[label])
            else:
                gmail_labels.append(f"label:{label}")  # Default format for custom labels
    
        query = " ".join(gmail_labels)

        results = (
            service.users()
            .messages()
            .list(userId="me", q=query, maxResults=max_results)
            .execute()
        )

        messages = results.get("messages", [])
        email_data = []

        for message in messages:
            msg = service.users().messages().get(userId="me", id=message["id"]).execute()
            snippet = msg.get("snippet", "No snippet available")
            headers = {h["name"]: h["value"] for h in msg["payload"]["headers"]}
            email_data.append({
                "id": message["id"],
                "snippet": snippet,
                "from": headers.get("From", "Unknown"),
                "subject": headers.get("Subject", "No Subject"),
                "date": headers.get("Date", "Unknown"),
            })

        print(email_data)
        return {"emails": email_data}

    except Exception as error:
        raise HTTPException(status_code=500, detail=f"An error occurred: {error}")


@app.post('/integrations/create_document')
async def create_document(content: DocumentCreate, current_user=Depends(get_current_user)):
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username)  # Fetch from DB
    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    title = content.title
    text = content.text
    if not text:
        text = json.dumps(content)
    if not title:
        title = "Automated doc"
    
    try:
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            await save_google_creds(username, creds.to_json())  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token found. User needs to authorize again.")
        
        # Create Google Docs API client
        service = build("docs", "v1", credentials=creds)
        
        # Create a new document
        document = service.documents().create(body={"title": title}).execute()
        document_id = document["documentId"]
        
        # Insert content into the document
        requests = [
            {
                "insertText": {
                    "location": {
                        "index": 1
                    },
                    "text": text
                }
            }
        ]
        service.documents().batchUpdate(documentId=document_id, body={"requests": requests}).execute()
        
        return {"message": "Document created successfully", "document_id": document_id}
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        raise HTTPException(status_code=500, detail=f"Failed to create document: {error}")


@app.post('/integrations/read_document')
async def read_document(doc_identifier: str = Query('', description="Whether to send as a draft"), current_user=Depends(get_current_user)):
    """
    Reads a Google Doc based on the provided identifier (title, link, or document ID).
    
    :param doc_identifier: The title, link, or document ID of the Google Doc.
    :param current_user: The currently authenticated user (dependency injection).
    :return: The content of the Google Doc.
    """
    username = current_user["username"]
    creds_dict = await fetch_google_creds(username)  # Fetch credentials from DB
    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )
    
    try:
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            await save_google_creds(username, creds.to_json())  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token found. User needs to authorize again.")
        
        # Build Google Docs and Drive API clients
        docs_service = build("docs", "v1", credentials=creds)
        drive_service = build("drive", "v3", credentials=creds)
        
        # Determine if the identifier is a document ID, link, or title
        document_id = None
        
        # Case 1: Identifier is a document ID (e.g., alphanumeric string like "123abc...")
        if len(doc_identifier) == 44 and doc_identifier.isalnum():
            document_id = doc_identifier
        
        # Case 2: Identifier is a link (e.g., "https://docs.google.com/document/d/...")
        elif doc_identifier.startswith("https://docs.google.com/document/d/"):
            document_id = doc_identifier.split("/d/")[1].split("/")[0]
        
        # Case 3: Identifier is a title (search using Google Drive API)
        else:
            query = f"name='{doc_identifier}' and mimeType='application/vnd.google-apps.document'"
            results = drive_service.files().list(q=query, fields="files(id)").execute()
            items = results.get("files", [])
            
            if not items:
                raise HTTPException(status_code=404, detail=f"No document found with title: {doc_identifier}")
            
            # Use the first matching document
            document_id = items[0]["id"]
        
        # Fetch the document content using the Google Docs API
        document = docs_service.documents().get(documentId=document_id).execute()
        content = document.get("body", {}).get("content", [])
        
        # Extract plain text from the document content
        plain_text = ""
        for element in content:
            if "paragraph" in element:
                for text_run in element["paragraph"]["elements"]:
                    if "textRun" in text_run:
                        plain_text += text_run["textRun"]["content"]
        
        return {"message": "Document read successfully", "content": plain_text}
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        raise HTTPException(status_code=500, detail=f"Failed to read document: {error}")

# Template operations
# Add template
@app.post('/database/add_template')
async def call_add_template(template_data: dict, current_user = Depends(get_current_user)):
    result = await add_template(current_user["username"], template_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])


# Book Operations
# Add book
@app.post('/database/add_book')
async def call_add_book(book_data: dict, current_user = Depends(get_current_user)):
    # user = Epic_DB(**current_user)
    result = await add_book(current_user["username"], book_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

# Remove book
@app.delete('/database/remove_book')
async def call_remove_book(book_name: BookName, current_user = Depends(get_current_user)):
    result = await remove_book(current_user["username"], book_name.book_name)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])

# Modify book
@app.put('/database/modify_book')
async def call_modify_book(book: ModifyBook, current_user = Depends(get_current_user)):
    result = await modify_book(current_user["username"], book.id, book.new_data)
    if result["status"] == "success":
        return result
    else:
        raise HTTPException(status_code=400, detail=result["message"])