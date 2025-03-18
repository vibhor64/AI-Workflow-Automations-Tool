import re

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


# Test with the examples
test_commands = [
    # "!weave 6342643728642823 title = hair cleaner, target audience = anime fans, length = 200",
    # "!weavebot 67d94b79e679844cf08f450a Node=balle",
    # "!weavebot 67d94b79e679844cf08f450a Node=balle balle, node-2 = baale"
    "!weavebot 67d94b79e679844cf08f450a input=john pork, age=64"
]

for cmd in test_commands:
    print(f"Input: {cmd}")
    print(f"Output: {convert_command_to_url(cmd)}")
    print()