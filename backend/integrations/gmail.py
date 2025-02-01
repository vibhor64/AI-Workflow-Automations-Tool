import base64
from email.mime.text import MIMEText
from googleapiclient.errors import HttpError

def create_message(sender, to, message_text):
    """Create a message for an email."""
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = ''
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def send_message(service, user_id, message):
    """Send an email message."""
    try:
        message = (service.users().messages().send(userId=user_id, body=message).execute())
        print(f"Message Id: {message['id']}")
        return message
    except HttpError as error:
        print(f"An error occurred: {error}")
        return None

def create_draft(service, user_id, message):
    """Create a draft email."""
    try:
        draft = (service.users().drafts().create(userId=user_id, body={'message': message}).execute())
        print(f"Draft Id: {draft['id']}")
        return draft
    except HttpError as error:
        print(f"An error occurred: {error}")
        return None