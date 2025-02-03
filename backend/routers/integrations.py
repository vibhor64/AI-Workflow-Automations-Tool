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
from main import get_current_user
# Create an instance of APIRouter
router = APIRouter()



@router.get('/send_draft')
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