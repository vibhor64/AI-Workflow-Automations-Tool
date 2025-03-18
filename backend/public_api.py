from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.pipeline_db import get_pipeline
from private_api import execute_pipeline
from models import Pipeline
import asyncio
from concurrent.futures import ThreadPoolExecutor
from slowapi import Limiter
from slowapi.util import get_remote_address

public_app = FastAPI(title="Public API")

# CORS: Allow all origins (since it's a public API)
public_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Publicly accessible
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)

@public_app.post('/{pipeline_id}')
@limiter.limit("15 per minute")  # Limit to 15 requests per minute per IP
async def execute_pipeline_endpoint(pipeline_id: str, request: Request):
    pipeline_result = await get_pipeline(pipeline_id)
    if pipeline_result["status"] != "success":
        raise HTTPException(status_code=404, detail=pipeline_result["message"])
    
    try:
        print(f"Executing pipeline: {pipeline_id}")
        pipeline_output = await execute_automation(pipeline_result["pipeline"], request)
        return {"message": f"Pipeline {pipeline_id} executed successfully", "result": pipeline_output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing pipeline: {str(e)}")


@public_app.post('/automation/execute')
async def execute_automation(pipeline: Pipeline, request: Request):
    if isinstance(pipeline, dict):  
        pipeline = Pipeline(**pipeline)
    # Extract query parameters from the request
    query_params = dict(request.query_params)
    
    # Filter nodes where name == "Input"
    input_nodes = [node for node in pipeline.formattedNodes if node.name == "Input"]

    # Replace fieldValue1 in input nodes with corresponding query parameter values
    for node in input_nodes:
        node.fieldValue1 = query_params.get(node.fieldValue1, "")  # Default to ""
    
    # # Mandate that the number of query parameters matches the number of input nodes:
    # if len(query_params) != len(input_nodes):
    #     raise HTTPException(
    #         status_code=400,
    #         detail="Mismatch between the number of query parameters and input nodes. You may leave some query parameters blank."
    #     )
    
    # # Replace fieldValue1 in input nodes with corresponding query parameter values
    # query_param_keys = set(query_params.keys())
    # for node in input_nodes:
    #     if node.fieldValue1 in query_param_keys:
    #         node.fieldValue1 = query_params[node.fieldValue1]
    #         # query_param_keys.remove(node.fieldValue1)
    #     else:
    #         raise HTTPException(
    #             status_code=400,
    #             detail=f"No query parameter found for input node: {node.fieldValue1}"
    #         )
    
    # Execute the pipeline
    print("Executing pipeline...")
    # pipelineOutput = execute_pipeline(pipeline)
    
    # Run execute_pipeline in a separate thread to avoid asyncio issues
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        pipeline_output = await loop.run_in_executor(pool, execute_pipeline, pipeline)
    return {"pipelineOutput": pipeline_output}