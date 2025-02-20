from fastapi import APIRouter
from utils.database import fetch_google_creds, save_google_creds
import base64
from email.message import EmailMessage
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request as GoogleRequest
from googleapiclient.discovery import build
import json
from fastapi import FastAPI, Depends, HTTPException, status, Response, Request, Query
from utils.auth import get_current_user
from models import DocumentCreate
# Create an instance of APIRouter
router = APIRouter(prefix="/google", tags=["google"])


@router.get('/read_emails')
async def read_emails(max_results: int = Query(10, description="Maximum number of unread emails to fetch"), labels: str = Query("INBOX", description="Comma-separated list of labels"), current_user = Depends(get_current_user)):
    """Read latest unread emails from the user's Gmail account.

    :param max_results: Maximum number of unread emails to fetch. Default is 10.
    :param labels: Comma-separated list of labels to filter emails by. Default is "INBOX".
    :return: List of EmailMessage objects, each representing an unread email.
    """
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


@router.get('/send_draft')
async def send_draft(isDraft: bool = Query(True, description="Whether to send as a draft"), current_user = Depends(get_current_user)):
    """
    Creates a draft email and sends it to the recipient

    :param isDraft: Whether to send as a draft
    :param current_user: The current user
    :return: None
    """
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

@router.post('/create_document')
async def create_document(content: DocumentCreate, current_user=Depends(get_current_user)):
    """
    Creates a Google Doc based on the provided content.
    
    :param content: Contains the title and text of the Google Doc.
    :return: The document id of the created Google Doc.
    """
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


@router.post('/read_document')
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

@router.get('/read_form')
async def read_form(form_identifier: str = Query('', description="Form ID, link, or title"), current_user=Depends(get_current_user)):
    """
    Reads a Google Form based on the provided identifier (title, link, or form ID).
    
    :param form_identifier: The title, link, or form ID of the Google Form.
    :param current_user: The currently authenticated user (dependency injection).
    :return: The metadata and questions of the Google Form.
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
        
        # Build Google Forms and Drive API clients
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
                raise HTTPException(status_code=404, detail=f"No form found with title: {form_identifier}")
            
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
        
        return {"message": "Form read successfully", "form": form_info}
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        raise HTTPException(status_code=500, detail=f"Failed to read form: {error}")


@router.get('/read_google_sheets')
async def read_google_sheets(sheet_identifier: str = Query('', description="Sheet ID, link, or title"), sheet_range: str = Query("A1:Z1000", description="Range of cells to read"), current_user=Depends(get_current_user)):
    """
    Reads data from a Google Sheet based on the provided identifier (title, link, or sheet ID).
    
    :param sheet_identifier: The title, link, or sheet ID of the Google Sheet.
    :param sheet_range: The range of cells to read (e.g., "A1:D10").
    :param current_user: The currently authenticated user (dependency injection).
    :return: The data from the specified range in the Google Sheet.
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
                raise HTTPException(status_code=404, detail=f"No sheet found with title: {sheet_identifier}")
            
            # Use the first matching sheet
            sheet_id = items[0]["id"]
        
        # Fetch the sheet data using the Google Sheets API
        result = sheets_service.spreadsheets().values().get(spreadsheetId=sheet_id, range=sheet_range).execute()
        values = result.get("values", [])
        
        return {"message": "Sheet read successfully", "data": values}
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        raise HTTPException(status_code=500, detail=f"Failed to read sheet: {error}")


@router.get('/read_meet_transcript')
async def read_meet_transcript(meet_title: str = Query('', description="Meeting title or transcript filename"), current_user=Depends(get_current_user)):
    """
    Reads the transcript of a Google Meet session based on the provided title or filename.
    
    :param meet_title: The title or filename of the Meet transcript (as stored in Google Drive).
    :param current_user: The currently authenticated user.
    :return: The transcript content if found.
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
        # Refresh credentials if needed
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            await save_google_creds(username, creds.to_json())  # Update refreshed creds in DB
        elif creds.expired and not creds.refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token found. User needs to authorize again.")
        
        # Build Google Drive & Docs API clients
        drive_service = build("drive", "v3", credentials=creds)
        docs_service = build("docs", "v1", credentials=creds)
        
        # Search for the transcript file in Google Drive
        query = f"name contains '{meet_title}' and mimeType='application/vnd.google-apps.document'"
        results = drive_service.files().list(q=query, fields="files(id, name)").execute()
        files = results.get("files", [])
        
        if not files:
            raise HTTPException(status_code=404, detail=f"No transcript found for: {meet_title}")
        
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
        
        return {"message": "Meet transcript retrieved successfully", "transcript": transcript_text}
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        raise HTTPException(status_code=500, detail=f"Failed to read transcript: {error}")