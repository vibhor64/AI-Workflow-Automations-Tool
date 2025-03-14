import re

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
    integration_input = []
    integration_output = []
    
    for node in nodes:
        if node.name == "Input":
            input.append(node.fieldValue1)
        elif node.name == "Output" or node.name == "Database Output":
            output.append(node.fieldValue1)
        elif node.name == "Gmail" or node.name == "Discord" or node.name == "Slack" or node.name == "GDocs" or node.name == "GSheets" or node.name == "Google Meet" or node.name == "GForms" or node.name == "Airtable" or node.name == "Notion" or node.name == "API"  or node.name == "Database Loader":
            if node.rightHandles > 0:
                integration_input.append(node.name)
            else:
                integration_output.append(node.name)
    
    return input, output, integration_input, integration_output

def validate_emails(email_list):
    """
    Validate a list of email addresses and return only the valid ones.
    """
    valid_emails = []
    email_regex = r"[^@]+@[^@]+\.[^@]+"  # Simple regex for email validation

    for email in email_list:
        email = email.strip()  # Remove whitespace
        if re.match(email_regex, email):
            valid_emails.append(email)
        else:
            print(f"Invalid email address skipped: {email}")

    return valid_emails