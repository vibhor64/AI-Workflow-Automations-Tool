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
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from utils.database import fetch_google_creds, save_google_creds
import asyncio
from email.message import EmailMessage
from email import message_from_bytes

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

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
        if node_type == "Input" or node_type == "File" or node_type == "Text" or node_type == "Trigger":
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


def handle_read_emails(id, max_results, labels, username):
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
        # Check if the credentials are expired and refresh them if necessary
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            asyncio.run(save_google_creds(username, creds.to_json()))  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            return {"status": "error", "message": "No refresh token found. User needs to authorize again."}
        
        # Build the Gmail API client
        service = build("gmail", "v1", credentials=creds)

        # label_list = [label.strip().upper() for label in labels.split(",") if label.strip()]
        label_list = labels
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
        
        resMap[id] = email_data
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": str(error)}

def handle_gmail_output(id, username, fieldValue2):
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

    isDraft = fieldValue2["isDraft"]
    creds_dict = fieldValue2["creds_dict"]
    to = fieldValue2["to"]
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
            resMap[id] = draft
            return draft
        else:
            create_message = {"raw": encoded_message}
            send_message = (
                service.users()
                .messages()
                .send(userId="me", body=create_message)
                .execute()
            )
            resMap[id] = "success"
            # print(f'Message Id: {send_message["id"]}')


    except HttpError as error:
        print(f"An error occurred: {error}")
        draft = None
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_doc(id, username, doc_identifier):
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
        
        resMap[id] = plain_text
    
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
        
        resMap[id] = "success"
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_form(id, username, form_identifier):
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
        
        resMap[id] = form_info
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_google_sheet(id, username, sheet_identifier, sheet_range):
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
        
        resMap[id] = values
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}


def handle_read_google_meet(id, username, meet_title):
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
        
        resMap[id] = transcript_text
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return {"status": "error", "message": f"An error occurred: {error}"}

def send_discord_message(id, channel_id, message):
    try:
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
        resMap[id] = result
        return {"message": result}
    
    except httpx.HTTPStatusError as error:
        print(f"Failed to send message: {error}")
        return {"status": "error", "message": f"Failed to send message: {error}"}
