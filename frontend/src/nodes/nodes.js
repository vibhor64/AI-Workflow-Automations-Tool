const defaultNodes = [
  {
    "id": "NodeNode-1",
    "type": "NodeNode",
    "position": {
      "x": 90.49574031049639,
      "y": 133.41378958746145
    },
    "data": {
      "name": "Input",
      "isInput": true,
      "isType": true,
      "bgcolor": "#498bf5",
      "rightHandles": 1,
      "leftHandles": 0,
      "img": "/input.png",
      "category": "General",
      "targets": [
        "Query"
      ],
      "sources": [],
      "fieldValue1": "Query",
      "fieldValue2": "Node-1"
    },
    "width": 204,
    "height": 108,
    "selected": false,
    "positionAbsolute": {
      "x": 90.49574031049639,
      "y": 133.41378958746145
    },
    "dragging": false
  },
  {
    "id": "NodeNode-3",
    "type": "NodeNode",
    "position": {
      "x": 370.4787015524819,
      "y": 291.1999969482422
    },
    "data": {
      "name": "Database (RAG)",
      "desc": "Fetches only the relevant text chunks from the database",
      "isInput": false,
      "isType": false,
      "rightHandles": 1,
      "leftHandles": 1,
      "bgcolor": "#f57e2a",
      "img": "/database.png",
      "category": "Knowledge Base",
      "sources": [
        "query"
      ],
      "targets": [
        "results"
      ],
      "fieldValue1": "NodeNode-3",
      "fieldValue2": "Node-3",
      "constantValueList": [
        {
          "name": "Max Chunk Size",
          "value": 1000,
          "placeholder": "Exactly what it says"
        },
        {
          "name": "Chunk Overlap",
          "value": 200,
          "placeholder": "Overlap between chunks"
        },
        {
          "name": "Number of Chunks",
          "value": 5,
          "placeholder": "Total number of chunks"
        }
      ]
    },
    "width": 204,
    "height": 340,
    "selected": false,
    "positionAbsolute": {
      "x": 370.4787015524819,
      "y": 291.1999969482422
    },
    "dragging": false
  },
  {
    "id": "NodeNode-5",
    "type": "NodeNode",
    "position": {
      "x": 1065,
      "y": 159.1999969482422
    },
    "data": {
      "name": "Output",
      "isInput": true,
      "isType": true,
      "bgcolor": "#58c742",
      "rightHandles": 0,
      "leftHandles": 1,
      "img": "/output.png",
      "category": "General",
      "sources": [
        "Output"
      ],
      "fieldValue1": "Node-5",
      "fieldValue2": "Node-5"
    },
    "width": 204,
    "height": 108,
    "selected": false,
    "positionAbsolute": {
      "x": 1065,
      "y": 159.1999969482422
    },
    "dragging": false
  },
  {
    "id": "NodeNode-80",
    "type": "NodeNode",
    "position": {
      "x": 673.8408465923147,
      "y": 73.02793172634875
    },
    "data": {
      "name": "OpenAI",
      "isInput": true,
      "isType": false,
      "rightHandles": 1,
      "leftHandles": 5,
      "bgcolor": "#ffe682",
      "headColor": "#f5d65b",
      "img": "/openai.png",
      "category": "LLMs",
      "sources": [
        "system",
        "prompt",
        "query",
        "context",
        "chat"
      ],
      "targets": [
        "response"
      ],
      "fieldValue1": "Given the user query  and the context regarding the query , generate an appropriate answer for the user.\n\nInstructions: \n\n    Analyze the user query to determine the intent and desired outcome.\n    Use the provided context to tailor the email content appropriately.\n    Maintain a tone consistent with the purpose of the email (e.g., professional, friendly, urgent).\n    Ensure clarity, conciseness, and relevance in both the subject line and body.\n    Avoid placeholders or vague language; provide complete and actionable content.\n  \n\nUser query: {{query}}\n\nContext: {{context}}\n\nPrevious chat: {{chat}}",
      "fieldValue2": "✨"
    },
    "width": 204,
    "height": 179,
    "selected": false,
    "positionAbsolute": {
      "x": 673.8408465923147,
      "y": 73.02793172634875
    },
    "dragging": false
  },
  {
    "id": "NodeNode-81",
    "type": "NodeNode",
    "position": {
      "x": 358.29588494305983,
      "y": -15.088169700631653
    },
    "data": {
      "name": "Text",
      "isInput": true,
      "isType": false,
      "bgcolor": "#498bf5",
      "rightHandles": 1,
      "leftHandles": 0,
      "img": "/text.webp",
      "category": "General",
      "targets": [
        "Output"
      ],
      "fieldValue1": "You are an AI assistant designed to help users create professional and engaging emails. Your task is to generate the subject line and body of an email based on the user's query and the provided context. Ensure that the tone and content align with the purpose of the communication, whether it’s formal, casual, or promotional.",
      "fieldValue2": "✨"
    },
    "width": 204,
    "height": 86,
    "selected": false,
    "positionAbsolute": {
      "x": 358.29588494305983,
      "y": -15.088169700631653
    },
    "dragging": false
  },
  {
    "id": "NodeNode-82",
    "type": "NodeNode",
    "position": {
      "x": 92.49954187519592,
      "y": 273.16983616169966
    },
    "data": {
      "name": "Input",
      "isInput": true,
      "isType": true,
      "bgcolor": "#498bf5",
      "rightHandles": 1,
      "leftHandles": 0,
      "img": "/input.png",
      "category": "General",
      "targets": [
        "Previous chat"
      ],
      "sources": [],
      "fieldValue1": "Previous chat",
      "fieldValue2": "✨"
    },
    "width": 204,
    "height": 108,
    "selected": false,
    "positionAbsolute": {
      "x": 92.49954187519592,
      "y": 273.16983616169966
    },
    "dragging": false
  }
]

export { defaultNodes };