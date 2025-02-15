
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
    input = []
    output = []
    integration = []
    
    for node in nodes:
        if node.name == "Input":
            input.append(node.fieldValue1)
        elif node.name == "Output":
            output.append(node.fieldValue1)
        elif node.name == "Coming Soon":
            integration.append(node.name)
    
    return input, output, integration