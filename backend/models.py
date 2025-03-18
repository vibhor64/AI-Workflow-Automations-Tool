from pydantic import BaseModel
from typing import List, Dict, Any, Union

# Pipeline models
class Node(BaseModel):
    id: str
    name: str
    username: str
    rightHandles: int
    leftHandles: int
    sources: List[str] = []
    targets: List[str] = []
    fieldValue1: Union[str, Dict[Any, Any]] = ''
    fieldValue2: Union[str, Dict[Any, Any]] = ''

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

# Mock user database
class User(BaseModel):
    username: str
    hashed_password: str
    disabled: bool = False

class BookID(BaseModel):
    book_id: str

class PipelineRequest(BaseModel):
    pipeline_id: str

class ModifyBook(BaseModel):
    id: str
    new_data: dict

class Epic_DB(BaseModel):
    _id: str
    username: str
    password: str
    templates: List

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    # refresh_token: str
    token_type: str

class DocumentCreate(BaseModel):
    title: str | None = None  # Title is optional
    text: str | None = None  

class DiscordMessage(BaseModel):
    content: str
    author: str