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
            upsert=True  # If user doesn't exist, create one with this field
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
