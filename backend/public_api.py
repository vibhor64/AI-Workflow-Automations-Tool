from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.pipeline_db import get_pipeline
from private_api import execute_pipeline
from models import Pipeline

public_app = FastAPI(title="Public API")

# CORS: Allow all origins (since it's a public API)
public_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Publicly accessible
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

@public_app.post('/{pipeline_id}')
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

async def execute_automation(pipeline: Pipeline, request: Request):
    # Extract query parameters from the request
    query_params = dict(request.query_params)
    
    # Filter nodes where name == "Input"
    input_nodes = [node for node in pipeline.formattedNodes if node.name == "Input"]
    
    # Validate that the number of query parameters matches the number of input nodes
    if len(query_params) != len(input_nodes):
        raise HTTPException(
            status_code=400,
            detail="Mismatch between the number of query parameters and input nodes. You may leave some query parameters blank."
        )
    
    # Replace fieldValue1 in input nodes with corresponding query parameter values
    query_param_keys = set(query_params.keys())
    for node in input_nodes:
        if node.fieldValue1 in query_param_keys:
            node.fieldValue1 = query_params[node.fieldValue1]
            # query_param_keys.remove(node.fieldValue1)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"No query parameter found for input node: {node.fieldValue1}"
            )
    
    # Execute the pipeline
    pipelineOutput = execute_pipeline(pipeline)
    return {"pipelineOutput": pipelineOutput}