import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from models import Pipeline
from bson import ObjectId

load_dotenv()
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASS = os.getenv("MONGODB_PASS")
client = MongoClient(f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASS}@cluster0.dzidf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", server_api=ServerApi('1'))

db = client.epic_db 
pipelines_db = db["pipelines_db"]
epic_db = db["epic_db"]


async def save_pipeline(pipeline: Pipeline, name: str, username: str,):
    pipeline_id = str(ObjectId())
    
    print("Trying to push now: ", pipeline_id)
    # Insert the pipeline into the pipelines_db
    try:
        result = pipelines_db.insert_one(
            {"_id": pipeline_id, "pipeline": pipeline.dict()},
        )
        if not result.inserted_id:
            return {"status": "error", "message": "Failed to save pipeline"}
    except Exception as e:
        return {"status": "error", "message": f"MongoDB failed to update: {str(e)}"}
    print("Inserted to pipelines_db")
    print("Trying to push now")

    # Insert the pipeline_id into the user's data
    try:
        result = epic_db.update_one(
            {"_id": username},  
            {"$push": {"pipelines": {"pipeline_id": pipeline_id, "name": name}}},
        )
        if result.matched_count == 0:
            return {"status": "error", "message": "User not found"}
        return {"status": "success", "message": "Pipeline saved successfully", "pipeline_id": str(pipeline_id)}
    except Exception as e:
        return {"status": "error", "message": f"MongoDB failed to update: {str(e)}"}
    
async def get_pipeline(pipeline_id: str):
    try:
        pipeline = pipelines_db.find_one({"_id": pipeline_id})
        if pipeline:
            return { "status": "success", "pipeline": pipeline["pipeline"]}
        else:
            return {"status": "error", "message": "Pipeline not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def delete_pipeline(pipeline_id: str, username: str):
    try:        
        # Delete the pipeline from the pipelines_db
        pipelines_db.find_one_and_delete({"_id": pipeline_id})
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
    # Delete the pipeline_id from the user's data
    try:
        result = epic_db.update_one(
            {"_id": username},
            {"$pull": {"pipelines": {"pipeline_id": pipeline_id}}}
        )
        if result.modified_count == 0:
            return {"status": "error", "message": "Pipeline not found or user does not exist"}
        return {"status": "success", "message": "Pipeline removed successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def get_all_pipelines(username: str):
    try:
        pipelines = epic_db.find_one({"_id": username}).get("pipelines", [])
        return {"status": "success", "pipelines": pipelines}
    except Exception as e:
        return {"status": "error", "message": str(e)}