from fastapi import FastAPI, HTTPException, Depends, Request, Query, APIRouter
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
import httpx
import os
import secrets
import base64
import hashlib
from dotenv import load_dotenv
from private_api import get_current_user 
from utils.database import save_airtable_creds, fetch_airtable_creds, update_airtable_creds
import time
from urllib.parse import urlparse, unquote

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/auth/airtable", tags=["airtable"])

# Airtable OAuth2 configuration
AIRTABLE_CLIENT_ID = os.getenv("AIRTABLE_CLIENT_ID")
AIRTABLE_CLIENT_SECRET = os.getenv("AIRTABLE_CLIENT_SECRET")
AIRTABLE_REDIRECT_URI = os.getenv("AIRTABLE_REDIRECT_URI")
AIRTABLE_AUTH_URL = os.getenv("AIRTABLE_AUTH_URL")
AIRTABLE_TOKEN_URL = os.getenv("AIRTABLE_TOKEN_URL")
AIRTABLE_API_URL = os.getenv("AIRTABLE_API_URL")
encoded_client_id_secret = base64.b64encode(f'{AIRTABLE_CLIENT_ID}:{AIRTABLE_CLIENT_SECRET}'.encode()).decode()

# OAuth2 scheme for Airtable
oauth2_scheme = OAuth2AuthorizationCodeBearer(tokenUrl="token", authorizationUrl=AIRTABLE_AUTH_URL)

@router.get("/authorize")
async def airtable_authorize(request: Request, token: str = Query(..., description="Your token")):
    """
    Redirect the user to Airtable for OAuth2 authorization.
    """
    # Store the token in the session or pass it as a state parameter
    code_verifier, code_challenge = generate_pkce_pair()
    request.session["code_verifier"] = code_verifier
    # redirect_url = f"{AIRTABLE_AUTH_URL}?response_type=code&client_id={AIRTABLE_CLIENT_ID}&redirect_uri={AIRTABLE_REDIRECT_URI}&state={token}"
    redirect_url = (
        f"{AIRTABLE_AUTH_URL}?"
        f"response_type=code&"
        f"client_id={AIRTABLE_CLIENT_ID}&"
        f"redirect_uri={AIRTABLE_REDIRECT_URI}&"
        f"scope=data.records:read&"
        f"state={token}&"
        f"code_challenge={code_challenge}&"
        f"code_challenge_method=S256"
    )
    return RedirectResponse(url=redirect_url)

@router.get("/callback")
async def airtable_callback(request: Request, code: str = Query(None), state: str = Query(None)):
    """
    Handle the OAuth2 callback from Airtable.
    Exchange the authorization code for an access token and store it securely.
    """
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code missing")
    if not state:
        raise HTTPException(status_code=400, detail="State parameter missing")

    try:
        # Retrieve the frontend token (used to identify the user)
        frontend_token = state
        if not frontend_token:
            raise HTTPException(status_code=400, detail="Frontend token missing")

        # Fetch the current user based on the frontend token
        current_user = await get_current_user(frontend_token)
        current_username = current_user["username"]
        code_verifier = request.session.get("code_verifier")
        if not code_verifier:
            raise HTTPException(status_code=400, detail="Code verifier missing")

        # Exchange the authorization code for an access token
        async with httpx.AsyncClient() as client:
            data = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": AIRTABLE_REDIRECT_URI,
                # "client_id": AIRTABLE_CLIENT_ID,
                "code_verifier": code_verifier,
            }
            headers = {
                'Authorization': f'Basic {encoded_client_id_secret}',
                "Content-Type": "application/x-www-form-urlencoded",
            }
            response = await client.post(AIRTABLE_TOKEN_URL, data=data, headers=headers)
            if response.status_code != 200:
                print(f"Token exchange failed. Response: {response.text}")
                raise HTTPException(status_code=response.status_code, detail=f"Failed to authenticate with Airtable: {response.text}")
            token_data = response.json()

        # Save the access token securely in the database
        print("Saving token data: ", token_data)
        result = await save_airtable_creds(current_username, token_data)
        if result["status"] != "success":
            raise HTTPException(status_code=400, detail=result["message"])

        print("Successfully authenticated with Airtable")
        redirect_url = f"http://localhost:3000/login"
        return RedirectResponse(redirect_url)

    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to authenticate with Airtable: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.get("/read_table")
async def read_airtable(
    url: str = Query(..., description="The full Airtable table URL"),
    columns: str = Query(None),
    token: str = Depends(oauth2_scheme),
):
    """
    Read data from an Airtable table.
    """
    try:
        # Parse the URL to extract base_id and table_name
        base_id, table_name = parse_airtable_url(url)

        # Fetch the access token for the current user
        current_user = await get_current_user(token)
        current_username = current_user["username"]
        creds = await fetch_airtable_creds(current_username)
        access_token = creds.get("access_token")
        refresh_token = creds.get("refresh_token")
        # expires_at = creds.get("expires_at")

        if not access_token or not refresh_token:
            raise HTTPException(status_code=401, detail="Access token or refresh token not found")

        # if time.time() >= expires_at:
        #     print("Access token expired. Refreshing token...")
        #     access_token, expires_at = await refresh_access_token(refresh_token)
        #     await update_airtable_creds(current_username, access_token)

        # Prepare the Airtable API request
        api_url = f"{AIRTABLE_API_URL}/{base_id}/{table_name}"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }
        carr = columns.split(",")
        print("columns: ", carr)
        if len(carr) == 1:
            params = {
                "fields": carr,
            }
        if columns:
            params = {
                "fields": columns.split(","),
            }
        else:
            params = {
                "fields": [],
            }

        # Fetch data from Airtable
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()

        return {"data": data}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except httpx.HTTPStatusError as error:
        raise HTTPException(status_code=400, detail=f"Failed to fetch data from Airtable: {error}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

def generate_pkce_pair():
    """
    Generate a code_verifier and code_challenge for PKCE.
    """
    code_verifier = secrets.token_urlsafe(32)  # Random string of 32 bytes
    code_challenge = (
        base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode("utf-8")).digest())
        .decode("utf-8")
        .replace("=", "")  # Remove padding characters
    )
    return code_verifier, code_challenge

def parse_airtable_url(url: str):
    """
    Parse an Airtable URL to extract the base_id and table_name.
    """
    parsed_url = urlparse(url)
    # parsed_url = parsed_url.path  # This removes query parameters and fragments
    path_parts = parsed_url.path.strip("/").split("/")
    
    if len(path_parts) < 2:
        raise ValueError("Invalid Airtable URL. Please provide a valid table URL.")
    
    base_id = path_parts[0]
    table_name = unquote(path_parts[1])  # Decode URL-encoded characters (e.g., %20 -> space)
    return base_id, table_name

async def refresh_access_token(refresh_token: str):
    """
    Refresh the access token using the refresh token.
    """
    try:
        async with httpx.AsyncClient() as client:
            data = {
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
                "client_id": AIRTABLE_CLIENT_ID,
                "client_secret": AIRTABLE_CLIENT_SECRET,
            }
            headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            }
            response = await client.post(AIRTABLE_TOKEN_URL, data=data, headers=headers)
            response.raise_for_status()
            token_data = response.json()

            # Extract the new access token and calculate its expiration time
            access_token = token_data["access_token"]

            return access_token

    except httpx.HTTPStatusError as error:
        print(f"Failed to refresh token: {error.response.text}")
        raise HTTPException(status_code=401, detail="Failed to refresh access token")
    except Exception as e:
        print(f"Unexpected error during token refresh: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred during token refresh")

@router.post("/validate")
async def validate(token: str = Query(..., description="Your token")):
    current_user = await get_current_user(token)
    current_username = current_user["username"]
    user_data = await fetch_airtable_creds(current_username)
    if not user_data:
        return {"valid": False, "message": "Airtable credentials are invalid."}
    
    return {"valid": True, "message": "Airtable credentials are valid."}

def clean_airtable_data(raw_data):
    """
    Cleans the Airtable API read_table output into a simplified format for data analysis.

    Args:
        raw_data (dict): The raw JSON data from the Airtable API.

    Returns:
        list: A list of dictionaries containing cleaned and meaningful data.
    """
    cleaned_data = []

    # Iterate through each record in the 'records' field
    for record in raw_data.get("records", []):
        # Extract relevant fields
        record_id = record.get("id")
        created_time = record.get("createdTime")
        fields = record.get("fields", {})

        # Construct a cleaned dictionary with meaningful data
        cleaned_record = {
            "Record ID": record_id,
            "Created Time": created_time,
            "Feedback ID": fields.get("Feedback ID"),
            "Comments": fields.get("Comments"),
            "Rating": fields.get("Rating"),
            "Feedback Date": fields.get("Feedback Date"),
            "Product": fields.get("Product", []),
            "Attachments": [
                {
                    "Filename": attachment.get("filename"),
                    "URL": attachment.get("url"),
                    "Type": attachment.get("type"),
                    "Size (bytes)": attachment.get("size"),
                }
                for attachment in fields.get("Attachments", [])
            ],
        }

        # Append the cleaned record to the result list
        cleaned_data.append(cleaned_record)

    return cleaned_data
# Todo: 
# 1. Add refresh token functinality
# 2. Fix case where no. of columns specified is 1