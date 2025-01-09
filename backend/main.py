from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define models
class Node(BaseModel):
    id: str
    name: str

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    formattedNodes: List[Node]
    formattedEdges: List[Edge]

# Verification functions
def checkDAG(nodes, edges):
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)
    
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

def isConnected(nodes, edges):
    if not nodes:
        return True
    
    adjacency_list = {node.id: [] for node in nodes}
    for edge in edges:
        adjacency_list[edge.source].append(edge.target)
        adjacency_list[edge.target].append(edge.source)

    start_node = nodes[0].id
    visited = set()
    queue = [start_node]

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            queue.extend(neighbor for neighbor in adjacency_list[current] if neighbor not in visited)

    return len(visited) == len(nodes)

def countIONodes(nodes):
    input_count = 0
    output_count = 0
    
    for node in nodes:
        if node.name == "Input":
            input_count += 1
        elif node.name == "Output":
            output_count += 1
    
    return input_count, output_count

@app.get('/')
def read_root():
    return {'Bing': 'Bong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    print(pipeline)
    num_nodes = len(pipeline.formattedNodes)
    num_edges = len(pipeline.formattedEdges)
    is_dag = checkDAG(pipeline.formattedNodes, pipeline.formattedEdges)
    is_con = isConnected(pipeline.formattedNodes, pipeline.formattedEdges)
    inp, out = countIONodes(pipeline.formattedNodes)
    if not is_dag and not is_con:
        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out}
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag, "is_con": is_con, "inp": inp, "out": out}
