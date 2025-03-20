import networkx as nx
import google.generativeai as genai
import markdown
import PIL.Image
import os
import json
import httpx
from dotenv import load_dotenv
import base64
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
# from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from utils.database import fetch_google_creds, save_google_creds, modify_book_by_name
import asyncio
from email.message import EmailMessage
# from email import message_from_bytes
from utils.validate import validate_emails
from routers.airtable import fetch_airtable_creds, parse_airtable_url, update_airtable_creds, refresh_access_token, clean_airtable_data
from routers.notion import fetch_notion_creds
from urllib.parse import urlparse
import requests
from bson import ObjectId
from utils.rag_utils import chunk_text, retrieve_relevant_chunks
from bs4 import BeautifulSoup

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# Scopes required for Gmail API
SCOPES = ['https://www.googleapis.com/auth/gmail.compose']

# Discord OAuth2 configuration
DISCORD_API_URL = os.getenv("DISCORD_API_URL")
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")

def execute_pipeline(pipeline):
    # Create the graph
    G = nx.DiGraph()
    global handleMap 
    handleMap = {} # handle id : source node id
    global resMap
    resMap = {} # node id : result
    print("*********************")

    for node in pipeline.formattedNodes:
        G.add_node(node.id, type=node.name, rightHandles = int(node.rightHandles), leftHandles = int(node.leftHandles), sources = node.sources, targets = node.targets, fieldValue1 = node.fieldValue1, fieldValue2 = node.fieldValue2, username = node.username)
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
        if node_type == "Input" or node_type == "File" or node_type == "Trigger" or node_type == "Database Loader":
            handle_input(node_id, node_data["fieldValue1"])
        elif node_type == "Text":
            handle_text(node_id, node_data["fieldValue1"], node_data["sources"])
        elif node_type == "Database (RAG)":
            res = handle_rag_database(node_id, node_data["fieldValue1"], node_data["fieldValue2"], node_data["sources"])
        elif node_type == "Connector":
            handle_connector(node_id)

        elif node_type == "OpenAI" or node_type == "Anthropic" or node_type == "Llama"or node_type == "Gemini" or node_type == "Perplexity" or node_type == "AWS":
            handle_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"], node_data["sources"])
        elif node_type == "GPT-4 Vision" or node_type == "Anthropic Vision" or node_type == "Gemini Vis":
            handle_vision_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"])
        
        elif node_type == "Discord":
            res = send_discord_message(node_id, node_data["fieldValue1"], node_data.get("sources", []))
        elif node_type == "GForms":
            res = handle_read_form(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
        elif node_type == "GSheets":
            res = handle_read_google_sheet(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
        elif node_type == "Google Meet":
            res = handle_read_google_meet(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
        elif node_type == "Airtable":
            resMap[id] = handle_read_airtable(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
            print("res: ", resMap[id])
        elif node_type == "Notion":
            handle_read_notion(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
        elif node_type == "API":
            res = handle_read_API(node_id, node_data["fieldValue1"], node_data.get("sources", []))

        elif node_type == "Gmail":
            if node_data["rightHandles"] > 0:
                handle_read_emails(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
            else:
                handle_gmail_output(node_id, node_data["fieldValue1"], node_data["username"], node_data["sources"])
                res = "Successfully sent email to " + node_data["fieldValue1"]["1"]
        elif node_type == "GDocs":
            if node_data["rightHandles"] > 0:
                handle_read_doc(node_id, node_data["fieldValue1"], node_data["username"], node_data.get("sources", []))
            else:
                res = handle_create_doc(node_id, node_data["username"])

        elif node_type == "Output":
            print("********* Output Node Now************")
            res = handle_output(node_id)
        elif node_type == "Database Output":
            print("********* Output Node Now************")
            res = handle_database_output(node_id, node_data["fieldValue1"], node_data["username"])
        else:
            print("Unknown node type:", node_type)
            resMap[id] = str(node_data["fieldValue1"])

    print(res)
    return res


def handle_input(id, fieldValue1):
    resMap[id] = str(fieldValue1)

def handle_text(id, fieldValue1, sources):
    prompt = fieldValue1
    print(sources)
    for i in range(len(sources)):
        if str(id + '-left-handle-' + str(i)) in handleMap:
            userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
            prompt = prompt.replace('{{' + sources[i] + '}}', userVariable)
    resMap[id] = str(prompt)

def handle_DB(id):
    query = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = str(query)

def handle_rag_database(id, data, fieldValue2, sources):
    print("data: ", data)
    chunk_size = fieldValue2.get('0', 1000)
    overlap = fieldValue2.get('1', 200)
    top_k = fieldValue2.get('2', 5)
    query = resMap[handleMap[str(id + '-left-handle-0')]]

    for i in range(1, len(sources)):
        if str(id + '-left-handle-' + str(i)) in handleMap:
            userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
            chunk_size = chunk_size.replace('{{' + sources[i] + '}}', userVariable)
            overlap = overlap.replace('{{' + sources[i] + '}}', userVariable)
            top_k = top_k.replace('{{' + sources[i] + '}}', userVariable)
    
    print("chunk_size: ", chunk_size, "\n overlap: ", overlap, "\n top_k: ", top_k)
    # Process the text data into chunks for retrieval
    chunks = chunk_text(data, int(chunk_size), int(overlap))
    
    # Get the most relevant chunks based on the query
    relevant_chunks = retrieve_relevant_chunks(query, chunks, int(top_k))
    print("relevant_chunks: ", relevant_chunks)
    
    # Set the RAG result
    resMap[id] = str(relevant_chunks)
    
    return relevant_chunks

def handle_connector(id):
    for i in range(8):
        input_handle = f"{id}-left-handle-{i}"
        output_handle = f"{id}-right-handle-{i}"
        
        if input_handle in handleMap:
            print(output_handle, handleMap[input_handle], resMap[handleMap[input_handle]])
            handleMap[output_handle] = resMap[handleMap[input_handle]]
    resMap[id] = str(resMap[handleMap[str(id + '-left-handle-0')]])

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
            print("userVariable", userVariable)
            prompt = prompt.replace('{{' + sources[i] + '}}', userVariable)
    
    print('waiting for LLM')
    print(system + prompt)
    LLMOut = model.generate_content(system+prompt)
    res= markdown.markdown(LLMOut.text, extensions=['markdown.extensions.tables'])
    resMap[id] = str(res)

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
    
    LLMImage = image
    LLMOut = model.generate_content([system+prompt, "/myimg.png"])
    # print("LLM OUTPUT: ", LLMOut.text)
    res=markdown.markdown(LLMOut.text, extensions=['markdown.extensions.tables'])
    resMap[id] = str(res)
    
def handle_output(id):
    output = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = str(output)
    return output

def handle_database_output(id, db_name, username):
    output = resMap[handleMap[str(id + '-left-handle-0')]]

    db_id = str(ObjectId())[:-4]
    db_data = {
        "id" : db_id,
        "name" : db_name,
        "text" : output,
        "urls" : []
    }

    asyncio.run(modify_book_by_name(username, db_name, db_data))
    resMap[id] = str(output)
    return output

def handle_read_emails(id, fieldValue1, username, sources):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )



    try:
        max_results = str(fieldValue1["1"])
        labels = fieldValue1.get("2", "")
        # labels = labels.upper()

        for i in range(2, len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                max_results = max_results.replace('{{' + sources[i] + '}}', userVariable)
        
        max_results = int(max_results)
        
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # Build the Gmail API client
        service = build("gmail", "v1", credentials=creds)

        label_list = [label.strip().upper() for label in labels.split(",") if label.strip()]
        # label_list = labels
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
        print(query)


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
        resMap[id] = str(email_data)
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": str(error)}

def handle_gmail_output(id, fieldValue1, username, sources):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))
    user_email = creds_dict["user_email"]

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    # creds_dict = fieldValue2["creds_dict"]
    input_message = resMap[handleMap[str(id + '-left-handle-0')]]  # Get the AI-generated output
    # message = json.loads(message)
    try:
        # Try to parse the content as JSON
        input_message = json.loads(input_message)
    except json.JSONDecodeError:
        # If parsing fails, treat the content as a plain string
        input_message = {"text": input_message}
    message_text = input_message.get("text", json.dumps(input_message))
    subject = input_message.get("subject", "No reply - Automated Email")
    sender = str(user_email)

    try:
        isDraft = fieldValue1["isDraft"]
        to = fieldValue1["1"]

        for i in range(1, len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                to = to.replace('{{' + sources[i] + '}}', userVariable)
        print("email: ", to)

        # Validate and format the 'to' field
        if isinstance(to, list):  # If a list of email addresses is provided
            to = ",".join(validate_emails(to))  # Join valid emails into a comma-separated string
        elif isinstance(to, str):  # If a single string is provided
            to = ",".join(validate_emails(to.split(",")))  # Split, validate, and rejoin
        else:
            return {"status": "error", "message": "'to' field must be a list or comma-separated string."}

        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif (creds.expired) and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # create gmail api client
        service = build("gmail", "v1", credentials=creds)

        message = EmailMessage()
        message.set_content(str(message_text))
        message["To"] = str(to)
        message["From"] = str(sender)
        message["Subject"] = str(subject)

        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        if isDraft:
            create_message = {"message": {"raw": encoded_message}}
            draft = (
                service.users()
                .drafts()
                .create(userId="me", body=create_message)
                .execute()
            )
            resMap[id] = str(draft)
            return draft
        else:
            create_message = {"raw": encoded_message}
            send_message = (
                service.users()
                .messages()
                .send(userId="me", body=create_message)
                .execute()
            )
            resMap[id] = str(message)
            return message


    except HttpError as error:
        print(f"An error occurred: {error}")
        draft = None
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_doc(id, fieldValue1, username, sources):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )


    try:
        doc_identifier = fieldValue1["1"]

        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                doc_identifier = doc_identifier.replace('{{' + sources[i] + '}}', userVariable)

        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
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
                return {"status": "error", "message": f"No document found with title: {doc_identifier}"}
            
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
        
        resMap[id] = str(plain_text)
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}

def handle_create_doc(id, username):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    content = str(resMap[handleMap[str(id + '-left-handle-0')]])
    try:
        # Try to parse the content as JSON
        content = json.loads(content)
    except json.JSONDecodeError:
        # If parsing fails, treat the content as a plain string
        content = {"text": content}
    
    title = content.get("title", "Automated Doc")
    text = content.get("text", json.dumps(content))

    try:
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
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
        
        # Return the document link
        document_url = f"https://docs.google.com/document/d/{document_id}"
        resMap[id] = res = f"Successfully created document: <a href='{document_url}' target='_blank'>View Doc</a>"
        return res
     
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_form(id, form_identifier, username, sources):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    try:
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                form_identifier = form_identifier.replace('{{' + sources[i] + '}}', userVariable)
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # Build Google Docs and Drive API clients
        forms_service = build("forms", "v1", credentials=creds)
        drive_service = build("drive", "v3", credentials=creds)
        
        # Determine if the identifier is a form ID, link, or title
        form_id = None
        
        # Case 1: Identifier is a form ID (e.g., alphanumeric string like "123abc...")
        if len(form_identifier) == 44 and form_identifier.isalnum():
            form_id = form_identifier
        
        # Case 2: Identifier is a link (e.g., "https://docs.google.com/forms/d/...")
        elif form_identifier.startswith("https://docs.google.com/forms/d/"):
            form_id = form_identifier.split("/d/")[1].split("/")[0]
        
        # Case 3: Identifier is a title (search using Google Drive API)
        else:
            query = f"name='{form_identifier}' and mimeType='application/vnd.google-apps.form'"
            results = drive_service.files().list(q=query, fields="files(id)").execute()
            items = results.get("files", [])
            
            if not items:
                return {"status": "error", "message": f"No form found with title: {form_identifier}"}
            
            # Use the first matching form
            form_id = items[0]["id"]
        
        # Fetch the form metadata and questions using the Google Forms API
        form = forms_service.forms().get(formId=form_id).execute()
        form_info = {
            "title": form.get("info", {}).get("title", "Untitled Form"),
            "description": form.get("info", {}).get("description", ""),
            "questions": []
        }
        
        # Extract questions
        for item in form.get("items", []):
            question = {
                "title": item.get("title", "Untitled Question"),
                "type": item.get("questionItem", {}).get("question", {}).get("type", "Unknown"),
                "options": []
            }
            
            # Extract options for multiple-choice questions
            if question["type"] == "RADIO" or question["type"] == "CHECKBOX":
                for option in item.get("questionItem", {}).get("question", {}).get("options", []):
                    question["options"].append(option.get("value", "Unknown Option"))
            
            form_info["questions"].append(question)
        
        resMap[id] = str(form_info)
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_google_sheet(id, fieldValue1, username, sources):
    """Handle Gmail output node to send or draft an email."""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    try:
        sheet_identifier = fieldValue1["1"]
        sheet_range = fieldValue1["2"]

        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                sheet_range = sheet_range.replace('{{' + sources[i] + '}}', userVariable)
            
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # Build Google Sheets and Drive API clients
        sheets_service = build("sheets", "v4", credentials=creds)
        drive_service = build("drive", "v3", credentials=creds)
        
        # Determine if the identifier is a sheet ID, link, or title
        sheet_id = None
        
        # Case 1: Identifier is a sheet ID (e.g., alphanumeric string like "123abc...")
        if len(sheet_identifier) == 44 and sheet_identifier.isalnum():
            sheet_id = sheet_identifier
        
        # Case 2: Identifier is a link (e.g., "https://docs.google.com/spreadsheets/d/...")
        elif sheet_identifier.startswith("https://docs.google.com/spreadsheets/d/"):
            sheet_id = sheet_identifier.split("/d/")[1].split("/")[0]
        
        # Case 3: Identifier is a title (search using Google Drive API)
        else:
            query = f"name='{sheet_identifier}' and mimeType='application/vnd.google-apps.spreadsheet'"
            results = drive_service.files().list(q=query, fields="files(id)").execute()
            items = results.get("files", [])
            
            if not items:
                return {"status": "error", "message": f"No sheet found with title: {sheet_identifier}"}
            
            # Use the first matching sheet
            sheet_id = items[0]["id"]
        
        # Fetch the sheet data using the Google Sheets API
        result = sheets_service.spreadsheets().values().get(spreadsheetId=sheet_id, range=sheet_range).execute()
        values = result.get("values", [])
        
        resMap[id] = str(values)
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_google_meet(id, meet_title, username, sources):
    """Handle Gmail Meet input node to read meeting transcript"""
    creds_dict = asyncio.run(fetch_google_creds(username))

    creds = Credentials(
        token=creds_dict["token"],
        refresh_token=creds_dict.get("refresh_token"),
        token_uri=creds_dict["token_uri"],
        client_id=creds_dict["client_id"],
        client_secret=creds_dict["client_secret"],
        scopes=creds_dict["scopes"],
    )

    try:
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                meet_title = meet_title.replace('{{' + sources[i] + '}}', userVariable)
            
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # Build Google Drive & Docs API clients
        drive_service = build("drive", "v3", credentials=creds)
        docs_service = build("docs", "v1", credentials=creds)
        
        # Search for the transcript file in Google Drive
        query = f"name contains '{meet_title}' and mimeType='application/vnd.google-apps.document'"
        results = drive_service.files().list(q=query, fields="files(id, name)").execute()
        files = results.get("files", [])
        
        if not files:
            return {"status": "error", "message": f"No transcript found for: {meet_title}"}
        
        # Use the first matching transcript
        transcript_id = files[0]["id"]
        
        # Fetch the transcript content from Google Docs
        document = docs_service.documents().get(documentId=transcript_id).execute()
        content = document.get("body", {}).get("content", [])
        
        # Extract plain text
        transcript_text = ""
        for element in content:
            if "paragraph" in element:
                for text_run in element["paragraph"]["elements"]:
                    if "textRun" in text_run:
                        transcript_text += text_run["textRun"]["content"]
        
        resMap[id] = str(transcript_text)
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}

def send_discord_message(id, channel_id, sources):
    try:
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                channel_id = channel_id.replace('{{' + sources[i] + '}}', userVariable)
    
        message = str(resMap[handleMap[str(id + '-left-handle-0')]])

        message = html_to_discord_markdown(message)
        # todo: validate channel_id
        async def _send_message():
            url = f"{DISCORD_API_URL}/channels/{channel_id}/messages"
            headers = {
                "Authorization": f"Bot {DISCORD_BOT_TOKEN}",
                "Content-Type": "application/json"
            }
            payload = {
                "content": message
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers)
                response.raise_for_status()
            
            return "Message sent successfully"
        
        # Run the asynchronous function in an event loop
        result = asyncio.run(_send_message())
        # resMap[id] = message
        resMap[id] = str(message)
        return "Message sent successfully: " + message
    
    except httpx.HTTPStatusError as error:
        print(f"Failed to send message: {error}")
        return {"status": "error", "message": f"Failed to send message: {error}"}

def html_to_discord_markdown(html_text):
    # Handle plain text
    if not any(tag in html_text for tag in ["<p", "<ul", "<li", "<strong>"]):
        return html_text.strip()  # Return as-is if no HTML tags are found
    
    soup = BeautifulSoup(html_text, "html.parser")

    # Extract paragraphs and lists
    output = []
    
    for element in soup.children:
        if element.name == "p":
            output.append(element.get_text(strip=True))
        elif element.name == "ul":
            for li in element.find_all("li"):
                # Extract strong tag for sender name
                sender = li.find("strong")
                if sender:
                    sender_text = f"**{sender.get_text(strip=True)}**"
                    sender.extract()  # Remove it so it doesn't repeat
                else:
                    sender_text = ""

                message_text = li.get_text(strip=True)
                output.append(f"- {sender_text} {message_text}")

    return "\n".join(output)

def handle_read_airtable(id, fieldValue1, username, sources):
    # todo: 
    # 1. handle refresh token
    # 2. better output format
    try:
        print(fieldValue1)
        url = fieldValue1["1"]
        columns = fieldValue1["2"]
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                columns = columns.replace('{{' + sources[i] + '}}', userVariable)

        if len(columns) <2:
            columns = ""
        # Parse the URL to extract base_id and table_name
        base_id, table_name = parse_airtable_url(url)

        # Fetch the access token for the current user
        current_username = username
        creds = asyncio.run(fetch_airtable_creds(current_username))
        access_token = creds.get("access_token")
        refresh_token = creds.get("refresh_token")

        if not access_token or not refresh_token:
            return {"status": "error", "message": "Access token or refresh token not found"}

        async def _get_airtable_data(columns):
            # access_token = await refresh_access_token(refresh_token)
            # await update_airtable_creds(current_username, access_token)

            # Prepare the Airtable API request
            api_url = f"https://api.airtable.com/v0/{base_id}/{table_name}"
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
            }
            columns = columns.replace(" ", "") 
            carr = columns.split(",")
            if len(carr) == 1:
                return {"status": "error", "message": "Please enter at least two columns"}
            if columns:
                params = {
                    "fields": columns.split(","),
                }
            else:
                params = {
                    "fields": [],
                }

            print("Params: ", params)
            # Fetch data from Airtable
            async with httpx.AsyncClient() as client:
                response = await client.get(api_url, headers=headers, params=params)
                response.raise_for_status()
                data = response.json()
            return data

        data = asyncio.run(_get_airtable_data(columns))
        
        # data = clean_airtable_data(data)
        print("data: ", data)
        resMap[id] = str(data)
        return data

    except ValueError as e:
        return {"status": "error", "message": str(e)}
    except httpx.HTTPStatusError as error:
        return {"status": "error", "message": f"Failed to fetch data from Airtable: {error}"}
    except Exception as e:
        return {"status": "error", "message": f"An unexpected error occurred: {str(e)}"}

def handle_read_notion(id, notion_url, username, sources):
    try:
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                notion_url = notion_url.replace('{{' + sources[i] + '}}', userVariable)

        if not notion_url.startswith("https://www.notion.so/"):
            return {"status": "error", "message": "Invalid Notion URL format"}
        
        # Parse the URL to remove query parameters
        parsed_url = urlparse(notion_url)
        clean_url = parsed_url.path  # This removes query parameters and fragments
        url_parts = clean_url.split("-")
        if len(url_parts) < 2:
            return {"status": "error", "message": "Invalid Notion URL format"}
        
        page_id = url_parts[-1]  # The last part of the URL is the page_id

        # Fetch the user's Notion credentials from the database
        notion_creds = asyncio.run(fetch_notion_creds(username))
        if not notion_creds or "access_token" not in notion_creds:
            return {"status": "error", "message": "Notion credentials not found for the user"}
        
        access_token = notion_creds["access_token"]
        
        async def _read_notion_page(page_id):
            # Fetch the page content using the Notion API
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://api.notion.com/v1/pages/{page_id}",
                    headers={
                        "Authorization": f"Bearer {access_token}",
                        "Notion-Version": "2022-06-28",  # Specify the Notion API version
                        "Content-Type": "application/json"
                    }
                )
                response.raise_for_status()  # Raise an exception for HTTP errors
                page_data = response.json()

            return page_data
        
        page_data = asyncio.run(_read_notion_page(page_id))
        print(page_data)
        resMap[id] = str(page_data)
    
    except httpx.HTTPStatusError as error:
        return {"status": "error", "message": f"Failed to fetch Notion page: {error}"}
    except Exception as e:
        return {"status": "error", "message": f"An unexpected error occurred: {str(e)}"}

def handle_read_API(id, input_data, sources):
    """
    Fetches data from a dynamically constructed URL based on user-provided inputs.

    Args:
        id (str): Identifier used to locate variables in `handleMap`.
        url (str): Base URL template with placeholders like '{{source}}'.
        sources (list): List of source keys to replace placeholders in the URL.

    Returns:
        dict: JSON response from the API if successful.
        str: Error message if an exception occurs.
    """
    try:
        for i in range(len(sources)):
            if str(id + '-left-handle-' + str(i)) in handleMap:
                userVariable = resMap[handleMap[str(id + '-left-handle-' + str(i))]]
                input_data = input_data.replace('{{' + sources[i] + '}}', userVariable)
        
        print(input_data)
        input_data = json.loads(input_data)
        url = input_data.get("url")
        params = input_data.get("params", {})
        headers = input_data.get("headers", {})
        method = input_data.get("method", "GET")
        payload = input_data.get("payload", {})
        timeout = input_data.get("timeout", 30)
        
        # Send a GET request to the constructed URL
        response = requests.get(method, url, params=params, headers=headers, json=payload, timeout=timeout)
        
        # Raise an exception if the response contains an HTTP error status code
        response.raise_for_status()
        
        # Parse and return the JSON response
        resMap[id] = str(response.json())
        return str(response.json())
    
    except requests.exceptions.Timeout:
        msg = "Error: The request timed out. Please check the URL and try again."
        resMap[id] = str(msg)
        return msg
    except json.JSONDecodeError:
        msg = '''Error: Invalid JSON format in input data. Example input: \n {
    "base_url": "https://api.example.com",
    "params": {"anime": "ReLIFE"},
    "headers": {"x-api-key": "YOUR_API_KEY"}
} \n Make sure to use double quotes (") around keys and values, not single quotes (').'''
        resMap[id] = str(msg)
        return msg
    except requests.exceptions.ConnectionError:
        msg = "Error: Unable to connect to the server. Please verify the URL."
        resMap[id] = str(msg)
        return msg
    except requests.exceptions.HTTPError as http_err:
        msg =  f"HTTP error occurred: {http_err}"
        resMap[id] = str(msg)
        return msg
    except ValueError:
        msg = "Error: Invalid JSON response received from the server."
        resMap[id] = str(msg)
        return msg
    except KeyError as key_err:
        msg = f"KeyError: Missing key in handleMap or resMap - {key_err}"
        resMap[id] = str(msg)
        return msg
    except Exception as e:
        msg = f"An unexpected error occurred: {e}"
        resMap[id] = str(msg)
        return msg
