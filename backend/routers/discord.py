from fastapi import FastAPI, HTTPException, Depends, Request, Query, APIRouter
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
import httpx
import os
from datetime import datetime
from dotenv import load_dotenv
from private_api import get_current_user
from utils.database import fetch_discord_creds, save_discord_creds
# Load environment variables
load_dotenv()

router = APIRouter(prefix="/auth/discord", tags=["discord"])

# Discord OAuth2 configuration
DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
DISCORD_REDIRECT_URI = os.getenv("DISCORD_REDIRECT_URI")
DISCORD_AUTH_URL = os.getenv("DISCORD_AUTH_URL")
DISCORD_API_URL = os.getenv("DISCORD_API_URL")
DISCORD_TOKEN_URL = os.getenv("DISCORD_TOKEN_URL")
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")

# OAuth2 scheme for Discord
oauth2_scheme = OAuth2AuthorizationCodeBearer(tokenUrl="token", authorizationUrl=DISCORD_AUTH_URL)


@router.get("/authorize")
async def discord_authorize(request: Request, token: str = Query(..., description="Your token")):  # Capture the token
    # Store the token in the session.  This is crucial for preserving it.
    # request.session["frontend_token"] = token
    # print(f"Frontend Token received: {token}")

    # Redirect to Discord for authorization.  NO STATE PARAMETER NEEDED HERE.
    redirect_url = f"{DISCORD_AUTH_URL}&state={token}"
    return RedirectResponse(url=redirect_url)  # Redirect to Discord

# Handle Discord OAuth2 callback
@router.get("/callback")
async def discord_callback(request: Request, code: str = Query(None), state: str = Query(None)):
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code missing")
    if not state:
        raise HTTPException(status_code=400, detail="State parameter missing")
    try:
        # frontend_token = request.session.get("frontend_token")
        frontend_token = state
        if not frontend_token:
            raise HTTPException(status_code=400, detail="Frontend token missing")

        current_user = await get_current_user(frontend_token)
        current_username = current_user["username"]
        print("Username: ", current_username)

        # Exchange the authorization code for an access token
        async with httpx.AsyncClient() as client:
            data = {
                "client_id": DISCORD_CLIENT_ID,
                "client_secret": DISCORD_CLIENT_SECRET,
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": DISCORD_REDIRECT_URI,
                "scope": "identify guilds email bot"
            }
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            # Use HTTP Basic Auth for client_id and client_secret
            auth = (DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
            response = await client.post(DISCORD_TOKEN_URL, data=data, headers=headers, auth=auth)
            response.raise_for_status()
            token_data = response.json()
        
        # Save the access token securely in a database)
        print("Saving token data: ", token_data)
        result = await save_discord_creds(current_username, token_data)
        if result["status"] != "success":
            raise HTTPException(status_code=400, detail=result["message"])
        
        print("Successfully authenticated with Discord")
        redirect_url = f"http://localhost:3000/login"
        return RedirectResponse(redirect_url)
    
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to authenticate with Discord: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

# Send a message to a Discord channel
@router.post("/send_message")
# async def send_message(channel_id: str, message: str):
async def send_message(channel_id: str = Query(None), message: str = Query(None)):
    try:
        # Use the bot token to send a message
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
        
        return {"message": "Message sent successfully"}
    
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to send message: {error}")

# Example endpoint to get user info
@router.get("/user")
async def get_discord_user(access_token: str = Depends(oauth2_scheme)):
    try:
        url = f"{DISCORD_API_URL}/users/@me"
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            user_data = response.json()
        
        return {"user": user_data}
    
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to fetch user data: {error}")

# Refresh access token
async def refresh_access_token(refresh_token: str):
    try:
        async with httpx.AsyncClient() as client:
            data = {
                "client_id": DISCORD_CLIENT_ID,
                "client_secret": DISCORD_CLIENT_SECRET,
                "grant_type": "refresh_token",
                "refresh_token": refresh_token
            }
            headers = {"Content-Type": "application/x-www-form-urlencoded"}
            auth = (DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
            response = await client.post(DISCORD_TOKEN_URL, data=data, headers=headers, auth=auth)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        print(f"Error refreshing access token: {e}")
        return None

# Validate access token
@router.post('/validate')
async def validate_token(token: str = Query(..., description="Your token")):
    current_user = await get_current_user(token)
    current_username = current_user["username"]
    user_data = await fetch_discord_creds(current_username)
    if not user_data:
        return {"valid": False, "message": "Discord credentials are invalid."}
    
    return {"valid": True, "message": "Discord credentials are valid."}

async def get_valid_access_token(username: str):
    user_data = await fetch_discord_creds(username)
    if not user_data:
        return None
    
    access_token = user_data.get("access_token")
    refresh_token = user_data.get("refresh_token")
    expires_at = user_data.get("expires_at")
    
    if datetime.now() >= expires_at:
        # Token is expired, refresh it
        new_token_data = await refresh_access_token(refresh_token)
        if not new_token_data:
            return None
        
        # Update the database with the new token data
        await save_discord_creds(username, new_token_data)
        access_token = new_token_data["access_token"]
    
    return access_token