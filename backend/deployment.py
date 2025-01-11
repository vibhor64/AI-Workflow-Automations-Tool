import networkx as nx

def execute_pipeline(pipeline):
    # Create the graph
    G = nx.DiGraph()
    global handleMap
    handleMap = {} # handle id : source node id
    global resMap
    resMap = {} # node id : result

    for node in pipeline.formattedNodes:
        G.add_node(node.id, type=node.name, rightHandles = int(node.rightHandles), leftHandles = int(node.leftHandles), sources = node.sources, targets = node.targets, fieldValue1 = node.fieldValue1, fieldValue2 = node.fieldValue2)
    for edge in pipeline.formattedEdges:
        G.add_edge(edge.source, edge.target, sourceHandle = edge.sourceHandle, targetHandle = edge.targetHandle)
        handleMap[edge.targetHandle] = edge.source

    # Topological sort to determine execution order
    execution_order = list(nx.topological_sort(G))

    res = ''
    for node_id in execution_order:
        node_data = G.nodes[node_id]
        node_type = node_data["type"]
        # Handle each node type (input, LLM, output, etc.)
        if node_type == "Input" or node_type == "File" or node_type == "Text":
            handle_input(node_id, node_data["fieldValue1"])
        elif node_type == "Database":
            handle_DB(node_id)

        elif node_type == "OpenAI" or node_type == "Anthropic" or node_type == "Llama"or node_type == "Gemini" or node_type == "Perplexity" or node_type == "AWS":
            handle_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"])
        elif node_type == "GPT-4 Vision" or node_type == "Anthropic Vision" or node_type == "Gemini Vis":
            handle_vision_llm(node_id, node_data["fieldValue1"], node_data["fieldValue2"])

        elif node_type == "Output":
            res = handle_output(node_id)
        else:
            print("Unknown node type:", node_type)

    return res


def handle_input(id, fieldValue1):
    resMap[id] = fieldValue1

def handle_DB(id):
    query = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = query

def handle_llm(id, fieldValue1, fieldValue2):
    if str(id + '-left-handle-0') in handleMap:
        system = resMap[handleMap[str(id + '-left-handle-0')]]
    else:
        system = fieldValue2
    
    if str(id + '-left-handle-1') in handleMap:
        prompt = resMap[handleMap[str(id + '-left-handle-1')]]
    else:
        prompt = fieldValue1
    
    resMap[id] = system+prompt

def handle_vision_llm(id, fieldValue1, fieldValue2):
    if str(id + '-left-handle-0') in handleMap:
        system = resMap[handleMap[str(id + '-left-handle-0')]]
    else:
        system = fieldValue2
    
    if str(id + '-left-handle-1') in handleMap:
        prompt = resMap[handleMap[str(id + '-left-handle-1')]]
    else:
        prompt = fieldValue1

    if str(id + '-left-handle-2') in handleMap:
        image = resMap[handleMap[str(id + '-left-handle-2')]]
    else:
        image = None
    
    resMap[id] = system+prompt
    
def handle_output(id):
    output = resMap[handleMap[str(id + '-left-handle-0')]]
    resMap[id] = output
    return output