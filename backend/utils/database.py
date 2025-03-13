import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASS = os.getenv("MONGODB_PASS")
client = MongoClient(f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASS}@cluster0.dzidf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", server_api=ServerApi('1'))

db = client.epic_db 
collection_name = db["epic_db"]

async def find_user(username: str):
    user = collection_name.find_one({"_id": username})
    if user:
        return user
    else:
        return None

async def register_user(username: str, password: str):
    try:
        collection_name.insert_one({"_id": username, "username": username, "password": password})
        return {"status": "success", "message": "User registered successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def update_user(username: str, password: str):
    try:
        collection_name.find_one_and_update({"_id": username}, {"$set": {"password": password}})
        return {"status": "success", "message": "User updated successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def delete_user(username: str):
    try:
        collection_name.find_one_and_delete({"_id": username})
        return {"status": "success", "message": "User deleted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def add_template(username: str, template_data: dict):
    try:
        result = collection_name.update_one(
            {"_id": username},  
            {"$push": {"templates": template_data}},
        )
        if result.matched_count == 0:
            return {"status": "error", "message": "User not found"}
        return {"status": "success", "message": "Template added successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def remove_template(username: str, template_name: str):
    try:
        result = collection_name.update_one(
            {"_id": username},
            {"$pull": {"templates": {"template_name": template_name}}}  
        )
        if result.modified_count == 0:
            return {"status": "error", "message": "Template not found or user does not exist"}
        return {"status": "success", "message": "Template removed successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Book operations
async def add_book(username: str, book_data: dict):
    try:
        print(book_data)
        result = collection_name.update_one(
            {"_id": username},  
            {"$push": {"books": book_data}},
        )
        if result.matched_count == 0:
            return {"status": "error", "message": "User not found"}
        return {"status": "success", "message": "Book added successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def remove_book(username: str, book_id: str):
    try:
        print(username, book_id)
        result = collection_name.update_one(
            {"_id": username},
            {"$pull": {"books": {"id": book_id}}}  
        )
        if result.modified_count == 0:
            return {"status": "error", "message": "Book not found or user does not exist"}
        return {"status": "success", "message": "Book removed successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def modify_book(username: str, book_id: str, new_data: dict):
    try:
        print(username, book_id, new_data)
        result = collection_name.update_one(
            {"_id": username, "books.id": book_id},
            # {"_id": username, "books.name": book_name},
            {"$set": {"books.$": new_data}}
        )
        if result.modified_count == 0:
            # If the book does not exist, add it as a new book
            result = collection_name.update_one(
                {"_id": username},
                {"$push": {"books": new_data}}
            )
            if result.modified_count == 0:
                return {"status": "error", "message": "User does not exist"}
        return {"status": "success", "message": "Book modified successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# modify book by name (for database output node)
async def modify_book_by_name(username: str, book_name: str, new_data: dict):
    try:
        print(username, book_name, new_data)
        result = collection_name.update_one(
            {"_id": username, "books.name": book_name},  # Query by book name instead of ID
            {"$set": {"books.$": new_data}}  # Update the matched book
        )
        if result.modified_count == 0:
            # If the book does not exist, add it as a new book
            print("Book does not exist, adding new book")
            result = collection_name.update_one(
                {"_id": username},
                {"$push": {"books": new_data}}  # Add the new book to the user's books array
            )
            if result.modified_count == 0:
                print("User does not exist")
                return {"status": "error", "message": "User does not exist"}
        return {"status": "success", "message": "Book modified successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Google Integration operations
async def save_google_creds(username: str, creds_dict: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"google_creds": creds_dict}})
        return {"status": "success", "message": "Google credentials saved successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def fetch_google_creds(username: str):
    try:
        user = collection_name.find_one({"_id": username})
        if user:
            return user["google_creds"]
        else:
            return None
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Discord Integration operations
async def save_discord_creds(username: str, token_data: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"discord_creds": token_data}})
        return {"status": "success", "message": "Discord credentials saved successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def fetch_discord_creds(username: str):
    try:
        user = collection_name.find_one({"_id": username})
        if user:
            return user["discord_creds"]
        else:
            return None
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Notion Integration Options
async def save_notion_creds(username: str, token_data: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"notion_creds": token_data}})
        return {"status": "success", "message": "Notion credentials saved successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
async def fetch_notion_creds(username: str):
    try:
        user = collection_name.find_one({"_id": username})
        if user:
            return user["notion_creds"]
        else:
            return None
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Slack Integration Options
async def save_slack_creds(username: str, token_data: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"slack_creds": token_data}})
        return {"status": "success", "message": "slack credentials saved successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
async def fetch_slack_creds(username: str):
    try:
        user = collection_name.find_one({"_id": username})
        if user:
            return user["slack_creds"]
        else:
            return None
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Airtable Integration Options
async def save_airtable_creds(username: str, token_data: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"airtable_creds": token_data}})
        return {"status": "success", "message": "airtable credentials saved successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
async def fetch_airtable_creds(username: str):
    try:
        user = collection_name.find_one({"_id": username})
        if user:
            return user["airtable_creds"]
        else:
            return None
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def update_airtable_creds(username: str, token_data: dict):
    try:
        collection_name.update_one({"_id": username}, {"$set": {"airtable_creds": token_data}})
        return {"status": "success", "message": "airtable credentials updated successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}