from fastapi import FastAPI, HTTPException, Depends, Request, Query, APIRouter
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
import httpx
import os
from dotenv import load_dotenv
from private_api import get_current_user  # Assuming this function exists in your project
from utils.database import fetch_slack_creds, save_slack_creds  # Assuming these functions exist in your project

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/auth/slack", tags=["slack"])

# Slack OAuth2 configuration
SLACK_CLIENT_ID = os.getenv("SLACK_CLIENT_ID")
SLACK_CLIENT_SECRET = os.getenv("SLACK_CLIENT_SECRET")
SLACK_REDIRECT_URI = os.getenv("SLACK_REDIRECT_URI")
SLACK_AUTH_URL = "https://slack.com/oauth/v2/authorize"
SLACK_TOKEN_URL = "https://slack.com/api/oauth.v2.access"

# Slack API configuration
SLACK_API_URL = "https://slack.com/api"

# OAuth2 scheme for Slack
oauth2_scheme = OAuth2AuthorizationCodeBearer(tokenUrl="token", authorizationUrl=SLACK_AUTH_URL)

@router.get("/authorize")
async def slack_authorize(request: Request, token: str = Query(..., description="Your token")):
    """
    Redirect the user to Slack's authorization page.
    The `state` parameter is used to pass the frontend token securely.
    """
    redirect_url = (
        f"{SLACK_AUTH_URL}?"
        f"client_id={SLACK_CLIENT_ID}&"
        f"redirect_uri={SLACK_REDIRECT_URI}&"
        f"scope=users:read,chat:write&"  # Adjust scopes as needed
        f"state={token}"
    )
    return RedirectResponse(url=redirect_url)

@router.get("/callback")
async def slack_callback(
    request: Request,
    code: str = Query(None),
    state: str = Query(None)
):
    """
    Handle the callback from Slack after the user authorizes the app.
    """
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code missing")
    if not state:
        raise HTTPException(status_code=400, detail="State parameter missing")

    try:
        # Retrieve the frontend token from the `state` parameter
        frontend_token = state
        if not frontend_token:
            raise HTTPException(status_code=400, detail="Frontend token missing")

        # Validate the frontend token and retrieve the current user
        current_user = await get_current_user(frontend_token)
        current_username = current_user["username"]
        print("Username: ", current_username)

        # Exchange the authorization code for an access token
        async with httpx.AsyncClient() as client:
            data = {
                "client_id": SLACK_CLIENT_ID,
                "client_secret": SLACK_CLIENT_SECRET,
                "code": code,
                "redirect_uri": SLACK_REDIRECT_URI
            }
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            response = await client.post(SLACK_TOKEN_URL, data=data, headers=headers)
            response.raise_for_status()
            token_data = response.json()

        # Check if the token exchange was successful
        if not token_data.get("ok"):
            raise HTTPException(status_code=400, detail=f"Slack error: {token_data.get('error')}")

        # Save the Slack credentials securely in the database
        print("Saving token data: ", token_data)
        result = await save_slack_creds(current_username, token_data)
        if result["status"] != "success":
            raise HTTPException(status_code=400, detail=result["message"])

        print("Successfully authenticated with Slack")
        redirect_url = f"http://localhost:3000/login"  # Redirect to your frontend login page
        return RedirectResponse(redirect_url)

    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to authenticate with Slack: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.post("/send_message")
async def send_message(
    channel_id: str = Query(..., description="Slack channel ID"),
    message: str = Query(..., description="Message to send"),
    username: str = Query(..., description="Username of the user sending the message")
):
    """
    Send a message to a Slack channel using the user's access token.
    """
    try:
        # Fetch the user's Slack credentials (access token) from the database
        slack_creds = await fetch_slack_creds(username)
        if not slack_creds or "access_token" not in slack_creds:
            raise HTTPException(status_code=400, detail="User has not authenticated with Slack")

        access_token = slack_creds["access_token"]

        # Prepare the payload for the Slack API
        url = f"{SLACK_API_URL}/chat.postMessage"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        payload = {
            "channel": channel_id,
            "text": message
        }

        # Send the message using the Slack API
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            response_data = response.json()

        # Check if the message was sent successfully
        if not response_data.get("ok"):
            raise HTTPException(status_code=400, detail=f"Slack error: {response_data.get('error')}")

        return {"message": "Message sent successfully"}

    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to send message: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")