# notion.py

import json
import secrets
from fastapi import FastAPI, HTTPException, Depends, Request, Query, APIRouter
from fastapi.responses import HTMLResponse, RedirectResponse
import httpx
import asyncio
import base64
import requests
import os
from dotenv import load_dotenv
from private_api import get_current_user
from utils.database import fetch_notion_creds, save_notion_creds

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/auth/notion", tags=["notion"])

# Discord OAuth2 configuration
NOTION_CLIENT_ID = os.getenv("NOTION_CLIENT_ID")
NOTION_CLIENT_SECRET = os.getenv("NOTION_CLIENT_SECRET")
NOTION_AUTH_URL = os.getenv("NOTION_AUTH_URL")
REDIRECT_URI = os.getenv("NOTION_REDIRECT_URI")
encoded_client_id_secret = base64.b64encode(f'{NOTION_CLIENT_ID}:{NOTION_CLIENT_SECRET}'.encode()).decode()


@router.get("/authorize")
async def authorize_notion(request: Request, token: str = Query(..., description="Your token")):

    redirect_url = f'{NOTION_AUTH_URL}&state={token}'
    return RedirectResponse(url=redirect_url)

@router.get("/callback")
async def oauth2callback_notion(request: Request, code: str = Query(None), state: str = Query(None)):
    try:
        if request.query_params.get('error'):
            raise HTTPException(status_code=400, detail=request.query_params.get('error'))

        if not state:
            raise HTTPException(status_code=400, detail='State parameter missing')
        
        current_user = await get_current_user(state)
        current_username = current_user["username"]
        print("Username: ", current_username)

        async with httpx.AsyncClient() as client:
            response = await client.post(
                'https://api.notion.com/v1/oauth/token',
                json={
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': REDIRECT_URI
                },
                headers={
                    'Authorization': f'Basic {encoded_client_id_secret}',
                    'Content-Type': 'application/json',
                }
            )
            response.raise_for_status()  # Raise an exception for HTTP errors
            token_data = response.json()
        
        # Save the access token (in a real app, store it securely in a database)
        print("Saving token data: ", token_data)
        result = await save_notion_creds(current_username, token_data)
        if result["status"] != "success":
            raise HTTPException(status_code=400, detail=result["message"])

        print("Successfully authenticated with Discord")
        redirect_url = f"http://localhost:3000/login"
        return RedirectResponse(redirect_url)
    
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to authenticate with Notion: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.get("/read_page/{page_id}")
async def read_notion_page(page_id: str, username: str = Depends(get_current_user)):
    try:
        # Fetch the user's Notion credentials from the database
        notion_creds = await fetch_notion_creds(username)
        if not notion_creds or "access_token" not in notion_creds:
            raise HTTPException(status_code=400, detail="Notion credentials not found for the user")
        
        access_token = notion_creds["access_token"]
        
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
        
        return {"page_data": page_data}
    
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to fetch Notion page: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.post("/validate")
async def validate(token: str = Query(..., description="Your token")):
    current_user = await get_current_user(token)
    current_username = current_user["username"]
    user_data = await fetch_notion_creds(current_username)
    if not user_data:
        return {"valid": False, "message": "Notion credentials are invalid."}
    
    return {"valid": True, "message": "Notion credentials are valid."}