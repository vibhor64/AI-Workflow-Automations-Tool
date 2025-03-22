import discord
import requests
import re
from dotenv import load_dotenv

import os 
load_dotenv()
TOKEN = os.getenv("DISCORD_BOT_TOKEN")
WEBHOOK_URL = "http://127.0.0.1:8000/private/auth/discord/webhook"  # Your FastAPI endpoint


def convert_command_to_url(command):
    """
    Convert a command of the format !weave/!weavebot {pipeline_id} input1=input1, input2=input2
    to a URL format: http://127.0.0.1:8000/pipelines/{pipeline_id}?input1=input1&input2=input2
    
    Args:
        command (str): Input command string
        
    Returns:
        str: Formatted URL
    """
    # Extract the pipeline ID - handles both !weave and !weavebot
    pipeline_match = re.match(r'!weave(?:bot)?\s+(\S+)', command)
    if not pipeline_match:
        return "Invalid command: Could not find pipeline ID"
    
    pipeline_id = pipeline_match.group(1)
    
    # Extract key-value pairs starting from after the pipeline ID
    pairs_text = command[pipeline_match.end():]
    
    # Use a more flexible regex to find key-value pairs
    # This handles hyphenated keys, multiple words, and various formats
    pairs = re.findall(r'([^=,]+?)\s*=\s*([^,]+?)(?:,|$)', pairs_text)
    
    if not pairs:
        return f"http://127.0.0.1:8000/pipelines/{pipeline_id}"
    
    # Build query parameters
    query_params = []
    for key, value in pairs:
        # Clean up key and value
        key = key.strip()
        value = value.strip()
        
        # URL encode: replace spaces with + and handle special characters
        key_encoded = key.replace(' ', '+')
        value_encoded = value.replace(' ', '+')
        
        query_params.append(f"{key_encoded}={value_encoded}")
    
    # Construct the final URL
    url = f"http://127.0.0.1:8000/pipelines/{pipeline_id}?{'&'.join(query_params)}"
    
    return url

# Create the client as a global variable
intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

@client.event
async def on_message(message):
    # Now client is accessible here
    if message.author == client.user or not isinstance(message.channel, discord.TextChannel) or not message.content.startswith("!weave"):
        return

    # todo: check if username has access to pipeline
    # todo
    if message.content == "!weave help":
        return {"status": "executed", "message": "Usage: !weave <pipeline_id> <params>"}
    
    url = convert_command_to_url(message.content)
    if not url:
        return
    
    print("Executing pipeline...")
    response = requests.post(url)
    
    print("Response: ", response)
    if response.status_code == 200:
        print("Pipeline executed successfully")
    else:
        print("Failed to execute pipeline")
        return {"status": "executed", "message": message.content}
    
    return {"status": "executed", "message": message.content}

# Start the client
client.run(str(TOKEN))

