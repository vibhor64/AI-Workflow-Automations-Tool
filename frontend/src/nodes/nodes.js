const defaultNodes = [
    {
      "id": "NodeNode-102",
      "type": "NodeNode",
      "position": {
        "x": 522,
        "y": 445.1999969482422
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
          "address"
        ],
        "sources": [],
        "fieldValue1": "address",
        "fieldValue2": "✨"
      },
      "width": 204,
      "height": 108,
      "selected": false,
      "positionAbsolute": {
        "x": 522,
        "y": 445.1999969482422
      },
      "dragging": false
    },
    {
      "id": "NodeNode-104",
      "type": "NodeNode",
      "position": {
        "x": 186,
        "y": 138.1999969482422
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
          "query"
        ],
        "sources": [],
        "fieldValue1": "query",
        "fieldValue2": "✨"
      },
      "width": 204,
      "height": 108,
      "selected": false,
      "positionAbsolute": {
        "x": 186,
        "y": 138.1999969482422
      },
      "dragging": false
    },
    {
      "id": "NodeNode-105",
      "type": "NodeNode",
      "position": {
        "x": 525,
        "y": 113.19999694824219
      },
      "data": {
        "name": "Gemini",
        "isInput": true,
        "isType": false,
        "rightHandles": 1,
        "leftHandles": 3,
        "bgcolor": "#ffe682",
        "headColor": "#f5d65b",
        "img": "/google.png",
        "category": "LLMs",
        "sources": [
          "system",
          "prompt",
          "query"
        ],
        "targets": [
          "response"
        ],
        "fieldValue1": "User query: {{query}}",
        "fieldValue2": "You are an expert AI email assistant. Generate a professional and effective email based *solely* on the user's query. Aim for clarity, conciseness, and a suitable tone. Output *only* the complete email."
      },
      "width": 204,
      "height": 271,
      "selected": false,
      "positionAbsolute": {
        "x": 525,
        "y": 113.19999694824219
      },
      "dragging": false
    },
    {
      "id": "NodeNode-106",
      "type": "NodeNode",
      "position": {
        "x": 891,
        "y": 125.19999694824219
      },
      "data": {
        "name": "Gmail",
        "desc": "Read emails, create drafts or just send one!",
        "Nodestate": [
          "Create draft",
          "Send email",
          "Read emails"
        ],
        "isInput": false,
        "isType": false,
        "bgcolor": "#ea4335",
        "rightHandles": 0,
        "leftHandles": 2,
        "sources": [
          "Message",
          "address"
        ],
        "targets": [],
        "fieldValue1": {
          "1": "{{address}}",
          "isDraft": true
        },
        "img": "/gmail.png",
        "category": "Integrations",
        "fieldValue2": "✨",
        "username": "a@m.com"
      },
      "width": 204,
      "height": 200,
      "selected": false,
      "positionAbsolute": {
        "x": 891,
        "y": 125.19999694824219
      },
      "dragging": false
    }
  ]

export { defaultNodes };