from fastapi import FastAPI, Depends, HTTPException, status, Response, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import auth
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
from deployment import execute_pipeline
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

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

# Define models
class Node(BaseModel):
    id: str
    name: str
    rightHandles: int
    leftHandles: int
    sources: List[str] = []
    targets: List[str] = []
    fieldValue1: str = ''
    fieldValue2: str = ''

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str
    targetHandle: str

class Pipeline(BaseModel):
    formattedNodes: List[Node]
    formattedEdges: List[Edge]

class PipelineInputs(BaseModel):
    inputValues: Dict[str, str]

# Verification functions
def checkDAG(nodes, edges):
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)
    
    visited = set()
    cycle = set()

    def dfs(node):
        if node in cycle:  # Cycle detected
            return False
        if node in visited:  # Already processed
            return True
        
        visited.add(node)
        cycle.add(node)
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        cycle.remove(node)
        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True

def isConnected(nodes, edges):
    if not nodes:
        return True
    
    adjacency_list = {node.id: [] for node in nodes}
    for edge in edges:
        adjacency_list[edge.source].append(edge.target)
        adjacency_list[edge.target].append(edge.source)

    start_node = nodes[0].id
    visited = set()
    queue = [start_node]

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            queue.extend(neighbor for neighbor in adjacency_list[current] if neighbor not in visited)

    return len(visited) == len(nodes)

def countIONodes(nodes):
    input = []
    output = []
    integration = []
    
    for node in nodes:
        if node.name == "Input":
            input.append(node.fieldValue1)
        elif node.name == "Output":
            output.append(node.fieldValue1)
        elif node.name == "Coming Soon":
            integration.append(node.name)
    
    return input, output, integration

# Dependency to get the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
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
    user = auth.fake_users_db.get(username)
    if user is None:
        raise credentials_exception
    return user

@app.get('/')
def read_root():
    return {'Bing': 'Bong'}

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
    
    # file_path = f"pipeline.json"
    # with open(file_path, "w") as file:
    #     json.dump(pipeline.dict(), file, indent=4)
    
    output = 'Deployed'
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out,"integration" : integration, "output": output}

@app.post('/deployment/parse')
def parse_deployment(pipeline: Pipeline):
    # print("Deployment")
    # with open("pipeline.json", "r") as file:
    #     pipeline = json.load(file)
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    if not is_dag or not is_con:
        return {"pipelineOutput": "<h1>Invalid Pipeline!</h1> <p>Your pipeline is either not fully connected, or contains a cycle.</p>"}
    pipelineOutput = execute_pipeline(pipeline)
    return {"pipelineOutput": pipelineOutput}

# Authorization
@app.post("/register", response_model=auth.Token)
def register(user: auth.UserCreate, response: Response):
    if user.username in auth.fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = auth.get_password_hash(user.password)
    auth.fake_users_db[user.username] = auth.User(username=user.username, hashed_password=hashed_password)
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

@app.post("/token", response_model=auth.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None):
    print(form_data.username, form_data.password)
    user = auth.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    refresh_token = auth.create_refresh_token(data={"sub": user.username})
    # Set the refresh token as an HTTP-only cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60, 
        secure=True,  # Use only for HTTPS
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
def read_users_me(current_user: auth.User = Depends(get_current_user)):
    return current_user

@app.post("/refresh", response_model=auth.Token)
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

# @app.get("/auth/google/callback")
# async def google_callback(request: Request, response: Response):
#     token = await oauth.google.authorize_access_token(request)
#     user_info = token.get("userinfo")
    
#     if not user_info:
#         raise HTTPException(status_code=400, detail="Google login failed")

#     # Check if the user exists in your fake_users_db or create a new user
#     username = user_info["email"]
#     if username not in auth.fake_users_db:
#         # Create a new user in your fake_users_db
#         hashed_password = auth.get_password_hash("google")  # Use a dummy password or handle separately
#         auth.fake_users_db[username] = auth.User(username=username, hashed_password=hashed_password)

#     # Generate tokens
#     access_token = auth.create_access_token(data={"sub": username})
#     refresh_token = auth.create_refresh_token(data={"sub": username})

#     # Set refresh token as a cookie
#     response.set_cookie(
#         key="refresh_token",
#         value=refresh_token,
#         httponly=True,
#         max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
#         secure=True,  # Use True if using HTTPS
#     )

#     return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/google/callback")
async def google_callback(request: Request, response: Response):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    if not user_info:
        raise HTTPException(status_code=400, detail="Google login failed")

    # Check if the user exists in your fake_users_db or create a new user
    username = user_info["email"]
    if username not in auth.fake_users_db:
        # Create a new user in your fake_users_db
        hashed_password = auth.get_password_hash("google")  # Use a dummy password or handle separately
        auth.fake_users_db[username] = auth.User(username=username, hashed_password=hashed_password)

    # Generate tokens
    access_token = auth.create_access_token(data={"sub": username})
    refresh_token = auth.create_refresh_token(data={"sub": username})

    # Set the tokens as HTTP-only cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=15 * 60,  # Access token expiry (15 minutes)
        secure=False,  # Use True if using HTTPS
        samesite="lax",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=auth.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        secure=False,  # Use True if using HTTPS
        samesite="lax",
    )

    # Redirect to the frontend after setting cookies
    redirect_url = "http://localhost:3000/dashboard"
    return RedirectResponse(redirect_url)