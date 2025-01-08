from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    formattedNodes: List[Node]
    formattedEdges: List[Edge]

def checkDAG(nodes, edges):
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)
    
    print(graph)
    visited = set()
    cycle = set()

    def dfs(node):
        if node in cycle:  # Cycle detected
            return False
        if node in visited:  # Already processed
            return True
        
        visited.add(node)
        cycle.add(node)
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        cycle.remove(node)
        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True

@app.get('/')
def read_root():
    return {'Bing': 'Bong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.formattedNodes)
    num_edges = len(pipeline.formattedEdges)
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
