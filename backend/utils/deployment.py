import networkx as nx
import google.generativeai as genai
import markdown
import PIL.Image
import os
from dotenv import load_dotenv
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from integrations.gmail import create_message, send_message, create_draft

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Scopes required for Gmail API
SCOPES = ['https://www.googleapis.com/auth/gmail.compose']

def execute_pipeline(pipeline):
    # Create the graph
    G = nx.DiGraph()
    global handleMap
    handleMap = {} # handle id : source node id
    global resMap
    resMap = {} # node id : result
    print(pipeline.formattedNodes)

    for node in pipeline.formattedNodes:
        G.add_node(node.id, type=node.name, rightHandles = int(node.rightHandles), leftHandles = int(node.leftHandles), sources = node.sources, targets = node.targets, fieldValue1 = node.fieldValue1, fieldValue2 = node.fieldValue2)
    for edge in pipeline.formattedEdges:
        G.add_edge(edge.source, edge.target, sourceHandle = edge.sourceHandle, targetHandle = edge.targetHandle)
        handleMap[edge.targetHandle] = edge.source

    # Topological sort to determine execution order
    execution_order = list(nx.topological_sort(G))

    res = ''
    for node_id in execution_order:
        node_data = G.nodes[node_id]
        node_type = node_data["type"]
        # Handle each node type (input, LLM, output, etc.)
        if node_type == "Input" or node_type == "File" or node_type == "Text":
            handle_input(node_id, node_data["fieldValue1"])
        elif node_type == "Database":
            handle_DB(node_id)

        elif node_type == "OpenAI" or node_type == "Anthropic" or node_type == "Llama"or node_type == "Gemini" or node_type == "Perplexity" or node_type == "AWS":
            handle_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"], node_data["sources"])
        elif node_type == "GPT-4 Vision" or node_type == "Anthropic Vision" or node_type == "Gemini Vis":
            handle_vision_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"])

        elif node_type == "Output":
            res = handle_output(node_id)
        else:
            print("Unknown node type:", node_type)
            resMap[id] = node_data["fieldValue1"]

    print(res)
    return res


def handle_input(id, fieldValue1):
    resMap[id] = fieldValue1

def handle_DB(id):
    query = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = query

def handle_llm(id, fieldValue1, fieldValue2, sources):
    if str(id + '-left-handle-0') in handleMap:
        system = resMap[handleMap[str(id + '-left-handle-0')]]
    else:
        system = fieldValue2
    
    if str(id + '-left-handle-1') in handleMap:
        prompt = resMap[handleMap[str(id + '-left-handle-1')]]
    else:
        prompt = fieldValue1
    
    for i in range(2, len(sources)):
        if str(id + '-left-handle-' + str(i)) in handleMap:
            userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
            prompt = prompt.replace('{{' + sources[i] + '}}', userVariable)
    
    print('waiting for LLM')
    print(system + prompt)
    LLMOut = model.generate_content(system+prompt)
    res= markdown.markdown(LLMOut.text, extensions=['markdown.extensions.tables'])
    resMap[id] = res

def handle_vision_llm(id, fieldValue1, fieldValue2):
    if str(id + '-left-handle-0') in handleMap:
        system = resMap[handleMap[str(id + '-left-handle-0')]]
    else:
        system = fieldValue2
    
    if str(id + '-left-handle-1') in handleMap:
        prompt = resMap[handleMap[str(id + '-left-handle-1')]]
    else:
        prompt = fieldValue1

    if str(id + '-left-handle-2') in handleMap:
        image = resMap[handleMap[str(id + '-left-handle-2')]]
    else:
        image = None
    
    LLMImage = PIL.Image.open("/path/to/organ.png")
    LLMOut = model.generate_content([system+prompt, LLMImage])
    # print("LLM OUTPUT: ", LLMOut.text)
    res=markdown.markdown(LLMOut.text, extensions=['markdown.extensions.tables'])
    resMap[id] = res
    
def handle_output(id):
    output = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = output
    return output

def handle_gmail_output(node_id, node_data):
    """Handle Gmail output node to send or draft an email."""
    user_id = node_data.get("user_id")  # Assuming you store the user ID in the node
    creds_dict = node_data.get("creds")  # Assuming you store the credentials in the node
    to = node_data.get("to")
    sender = node_data.get("from")
    message_text = resMap[handleMap[str(node_id + '-left-handle-0')]]  # Get the AI-generated output
    draft = node_data.get("draft", False)  # Default to sending the email

    if not creds_dict:
        print("No credentials found for the user.")
        return

    creds = Credentials.from_authorized_user_info(creds_dict, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("Invalid or expired credentials.")
            return

    try:
        service = build('gmail', 'v1', credentials=creds)
        message = create_message(sender, to, message_text)

        if draft:
            create_draft(service, user_id, message)
        else:
            send_message(service, user_id, message)

    except HttpError as error:
        print(f"An error occurred: {error}")