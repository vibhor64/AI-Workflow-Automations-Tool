import gmail from '../assets/gmail.png';
import gdocs from '../assets/gdocs.png';
import youtube from '../assets/youtube.png';

const templateNodes = [
    {
        "templateName": "YouTube Thumbnail leveraging Gen AI",
        "displayImage": youtube,
        "templateId": "template-1",
        "tags" : ["Gen AI", "YouTube"],
        "nodes": [{
            "id": "NodeNode-1",
            "type": "NodeNode",
            "position": {
                "x": 69,
                "y": 240.59999084472656
            },
            "data": {
                "name": "Input",
                "isInput": true,
                "isType": true,
                "bgcolor": "#5b96f5",
                "rightHandles": 1,
                "leftHandles": 0,
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                "category": "General",
                "targets": [
                    "user_query"
                ],
                "sources": [],
                "fieldValue1": "user_query",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 110,
            "selected": false,
            "positionAbsolute": {
                "x": 69,
                "y": 240.59999084472656
            },
            "dragging": false
        },
        {
            "id": "NodeNode-2",
            "type": "NodeNode",
            "position": {
                "x": 218,
                "y": 64.59999084472656
            },
            "data": {
                "name": "Text",
                "isInput": true,
                "isType": false,
                "bgcolor": "#5b96f5",
                "rightHandles": 1,
                "leftHandles": 0,
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK7SURBVHhe7d3NShtRGMbxSdfBU6jG0iaiVijoopuKaG+g1oVgd7YW94V4CeolKHSp9MvuWujCjwvoB6IbFxYEG4sZxY4KHck+blzIi/Y4OefMc5I8v+VLJuTw52UyukimWq0GhHNLDihdDADGAGAMAMYAYAwAxgBgGdvPAXEcD++Xy8OnJycP/+yXH8X/ztrla9I08uzpbE/Pgxk594XVABsbmx9//Fx/IedoPkewFmBu/o2dN3LE1whW7gFhGBblzDfLK2vTu7u/vQtgvAGVSuXJwuK7b3LuK982wXgDSqW9cTnzmW+bYBwgiqJeOfOdTxGMA4QHh31yVg98iWB8D9B9+5kqvs7ImUu6zyOh7wnGG1Dv0JvQ9AECcAQGuICKwACXICIwgJB2BAa4QpoRGOAaaUVggP9IIwIDaLiOwAA34DICA9yQqwgMkICLCAyQkO0IDFADmxEYoEa2IjCAgeWVtWk5S4oBwBgAjAHAGu5/wra5Ph83AIwBwBgAjAHAGACMAcAYAIwBwBgAjAHAGAAM/rcg3fWumX4+3fU63AAwBgBjADAGAGMAMAYAYwAw+HOA71yfjxsAxgBgDADGAGAMAMYAYAwABn8O0F3vmunn012vww0AYwAwBgBjADAGAGMAMAYAgz8H+M71+bgBYAwAxgBgDADGAGAMAMYAYMbPAW/ffzhC/1YYirrd8nfy1cRdOU/CeAM6OwpbctYsbJzdOMCd1tYdOWsWNs5uHKCjUFiVs2Zh4+zGAZRSq0ODA0ty3uiGBgeWlFL4AEEQBP39j1/KWaOzdWbjb0GXhWFY/Pzl65ycN5LnY6NT+Xx+Xs5rZTVAcPHThqXS3ngURb3hwWFfHJ+1ydfUE6VajvP3723ncrlf3d1dn7LZ7Hf5GhPWA1AyVu4BVDsGAGMAMAYAYwAwBgBjALBzpnE4lMdJLa0AAAAASUVORK5CYII=",
                "category": "General",
                "targets": [
                    "Output"
                ],
                "fieldValue1": "You are ThumbnailGPT, a YouTube thumbnail specialist hired by Mr. Beast, Dude Perfect....",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 87,
            "selected": false,
            "positionAbsolute": {
                "x": 218,
                "y": 64.59999084472656
            },
            "dragging": false
        },
        {
            "id": "NodeNode-3",
            "type": "NodeNode",
            "position": {
                "x": 572,
                "y": 174.59999084472656
            },
            "data": {
                "name": "GPT-4 Vision",
                "isInput": true,
                "isType": false,
                "rightHandles": 1,
                "leftHandles": 5,
                "bgcolor": "#c382ff",
                "img": "/static/media/openai.67924d2dae8e9d4cc849.png",
                "category": "Multi-Modal",
                "sources": [
                    "system",
                    "prompt",
                    "image",
                    "user_query",
                    "context"
                ],
                "targets": [
                    "response"
                ],
                "fieldValue1": "User's query:\n{{user_query}} \n\nContext:\n{{context}}",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 182,
            "selected": false,
            "positionAbsolute": {
                "x": 572,
                "y": 174.59999084472656
            },
            "dragging": false
        },
        {
            "id": "NodeNode-4",
            "type": "NodeNode",
            "position": {
                "x": 247,
                "y": 477.59999084472656
            },
            "data": {
                "name": "Database",
                "isInput": false,
                "isType": false,
                "rightHandles": 1,
                "leftHandles": 1,
                "bgcolor": "#ff9382",
                "img": "data:image/png;base64,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",
                "category": "Knowledge Base",
                "sources": [
                    "query"
                ],
                "targets": [
                    "results"
                ],
                "fieldValue1": "",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 143,
            "selected": false,
            "positionAbsolute": {
                "x": 247,
                "y": 477.59999084472656
            },
            "dragging": false
        },
        {
            "id": "NodeNode-5",
            "type": "NodeNode",
            "position": {
                "x": 888,
                "y": 71.59999084472662
            },
            "data": {
                "name": "GPT-4 Vision",
                "isInput": true,
                "isType": false,
                "rightHandles": 1,
                "leftHandles": 4,
                "bgcolor": "#c382ff",
                "img": "/static/media/openai.67924d2dae8e9d4cc849.png",
                "category": "Multi-Modal",
                "sources": [
                    "system",
                    "prompt",
                    "image",
                    "My_face"
                ],
                "targets": [
                    "response"
                ],
                "fieldValue1": "Replace the image of the person by my face. Here is a photo of my face: {{My_face}}",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 182,
            "selected": false,
            "positionAbsolute": {
                "x": 888,
                "y": 71.59999084472662
            },
            "dragging": false
        },
        {
            "id": "NodeNode-6",
            "type": "NodeNode",
            "position": {
                "x": 629,
                "y": 411.59997253417964
            },
            "data": {
                "name": "File",
                "isInput": true,
                "isType": false,
                "bgcolor": "#5b96f5",
                "rightHandles": 1,
                "leftHandles": 0,
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOQSURBVHhe7d3fS1NhHMfxY0gF3Q1/gBJM0hUKzSS6aHRRICGU/cAlLv8G/4PS6jIi+g/K7Wya4oYFIoJ33sUsVKg5mZj74baM5ZSKwbrIwfq27ezsPGffo/u87vw+Uzx78+BzmGx12WxWAj4n6ACqCwGYIQAzBGCGAMwQgBkCMKsTfR8Q2tzsCwY3+hLJ5PlwOGLd20s308dU083eG09sNtsYnRuF0ACzs+9cH/wfH9I5NyNHEBbg8dgzMT9IJ0aNIORvgN+/PEJnRjO/sDi6tLR0/AJEIhGbb/b9Kzo3IiNG0BxgZXXNQWdGZrQImgPE44lOOjM6I0XQHCAajXXR2VFglAiaT0FKp5+nY4/q6ExPSr8PxX060rwDjjrunVDzASTmCAhwiCsCAuThiIAARLUjIEAB1YyAAEVUKwIClFCNCAigQO8ICFAGPSMgQJn0ioAAKugRAQFUEh0BASogMgICVEhUBATQYH5hcZTO1EIAZgjADAGYHbvXhEXT+/qwA5ghADMEYIYAzBCAGQIwQwBmCMAMAZghADMEYIYAzBCAGQIwQwBmCMAMAZghADMEYIbXhJlhBzBDAGYIwAwBmCEAMwRghgDMcB9AKF1PpYq9LxF2ADMEYIYAzBCAGQIwQwBmCMAM9wGE0vUU0tzc9Hlo0D5gMpnW6JoS7AABdnbiF1yeCV8imbTSNSUIIEgy8a3d4570xuOJHrpWCgIIlNzdbZNljy8W27lC14pBAMG+p1JnZc+ENxKNXqVrhSCADlKpHy2yPOENh8PX6BqFACoNOwYf0Fkhe+l0k1N2+75ub1+na/kQQCWLxTJVboSDg5+mcafbu7W11UvXcjTfBzx/8TLG/VlhaijdlyjdB+S+PxAI2F3uybd0vZBTJ+v3HY4he5vZPEfXNO+A1taWT3RWC9TshF+/M2ecLs9MKBS6Rdc0B2hsaPhCZ7VCTYRMJnP69bjsDQY37ubPNQdobz/337aqJWoiZLPZ+jdOeSawvj6Qm2kO0GY2z13u6ZbpvJaoiXCp2zpt6eiYzn2tOYAkSVJ//+1hOqs15UTotl6cun/vzj+P0XwKyuf3L48Y/VP1lE5BSm9FWeg/G/IVOx0VevIl0QGkw482XFldc8Tjic5oNNaV3t9vpI/hpBRABBqh2JMv6REA/spFKPXkSwigr0AgYLdYLFN0ng8BmAk5BUHlEIAZAjBDAGYIwOwPwi6xUJn1QwUAAAAASUVORK5CYII=",
                "category": "General",
                "targets": [
                    "My_face"
                ],
                "fieldValue1": "My_face",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 137,
            "selected": false,
            "positionAbsolute": {
                "x": 629,
                "y": 411.59997253417964
            },
            "dragging": false
        },
        {
            "id": "NodeNode-7",
            "type": "NodeNode",
            "position": {
                "x": 1201.0728693667227,
                "y": 243.59999084472656
            },
            "data": {
                "name": "Output",
                "isInput": true,
                "isType": true,
                "bgcolor": "#76c965",
                "rightHandles": 0,
                "leftHandles": 1,
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQxSURBVHhe7d1raxRnGMbxO36BlCxZ8yrroiKTNNazho3tRjQYtaYNQiVVUFBQPIOCUsUVFYUWWk9Y2kILxrSCpI21RqJoNAnxfIpmkCjbzatVSXA/QXyxLsbbJ5l5dmb2jpnr9y6XUcjzZ7K72cjkDQwMEMgZwwfILQQQhgDCEEAYAghDAGEIIAwBhCGAMAQQhgDC8pz+LCiVSkV6ep7VJZPJkkSit7T/daqQf85oUlBQ8GJ8eNzDYLDwaShU3BwIBJr55+hwFCAej2+ubzhzhO9+Uhmde7oiElnBd7uyDrD/4OHs/uIotee7nXl8syOrx4D2jo56vvldPB7fzDc7tAP09fVVX21t+5bvflffcOZIKpWK8N2KdoBEoreab5DW0/Osjm9WtAO8fPlqEt8gLZlMlvDNinaA5/H/P+MbpCUSvaV8s6L9LMjq2U+2zwY+Fm5//dpXALgLAYQhgDAEEIYAwhBAGAIIw+uAQUzTjBERGYYR43/mFVwBb5mmGTvb2LT3bGPT3kyIXECAQYef+TiXEXwfgB9+Rq4i+DrAUIefkYsIvg1gdfgZXkfwbQDDMGK1Xy89wHcVLyP4NgARUWlJyZ6vli45zHcVryL4OgARUVnZp7tqvlz8A99VvIjg+wBERJMnl+1YsmjhT3xXcTsCArw1deqUbYuqq47zXcXNCAgwyPRp0zYtrJr/M99V3IqAAMzMmTPWVy2Y9xvfVdyIgAAKs2fNWjt/XvQPvqs4jYAAQygvn7O6MvqFrV/BdBIBAYZRESlfGf284i++q2QbYcS9H2D17490y2pr9um8n4ArwGW6VwICeEAnAgJ4xG4EBBCGAB6x+2CMAB6we/iEAO7TOXwaia8DRpq2tvY/W6+3L+e7iu7hE66A4bV3dJ7y8vAJAYbW2Xnj96ut12z9B+xsD58QQO3mrVu/Xr7SuorvKk4OnxDgQ7dv3znZcunKGr6rOD18QoD33b1379jFlsvr+K7ixuETArxz//6DHy80t2zku4pbh08IkPboUdf35y9c3Mp3FTcPnxCAqKvr8aGmf//bzncVtw+f/B7gSXf3/n/Ond/JdxUvDp/8HMA0zVjj3+d2813Fq8MnPwcwDCO2rLZmH985Lw+f/ByAbETw+vDJ7wFomAi5OHxCgDQeIVeHT/hx9Psy7+Hm6vAJAfS5/fXjW5AwBBCGAMIQQBgCCEMAYQggTPt1wImTvyT7+/vH8h2ICj7Jf7Vhw/og34ejfQWMD497yDdIC4WKn/DNinaAYLDwKd8graioqJtvVrQDhELFjm7ZMZpNnDihgW9WtAMEAoHmyujc03z3uxV132zJz8/v4LsV7QBERE7umTJahcPho3yzQ/tZ0GC4iY/gTXwycBsrwdtYgXNZPQaAexBAGAIIQwBhCCAMAYQhgDAEEIYAwhBAGAIIewO2Kda2uG7ajgAAAABJRU5ErkJggg==",
                "category": "General",
                "sources": [
                    "Output"
                ],
                "fieldValue1": "Final Image",
                "fieldValue2": ""
            },
            "width": 204,
            "height": 110,
            "selected": false,
            "positionAbsolute": {
                "x": 1201.0728693667227,
                "y": 243.59999084472656
            },
            "dragging": false
        }],
        "edges": [
            {
                "source": "NodeNode-1",
                "sourceHandle": "NodeNode-1-right-handle-0",
                "target": "NodeNode-4",
                "targetHandle": "NodeNode-4-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-4NodeNode-4-left-handle-0"
            },
            {
                "source": "NodeNode-4",
                "sourceHandle": "NodeNode-4-right-handle-0",
                "target": "NodeNode-3",
                "targetHandle": "NodeNode-3-left-handle-4",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-4NodeNode-4-right-handle-0-NodeNode-3NodeNode-3-left-handle-4"
            },
            {
                "source": "NodeNode-1",
                "sourceHandle": "NodeNode-1-right-handle-0",
                "target": "NodeNode-3",
                "targetHandle": "NodeNode-3-left-handle-3",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-3"
            },
            {
                "source": "NodeNode-2",
                "sourceHandle": "NodeNode-2-right-handle-0",
                "target": "NodeNode-3",
                "targetHandle": "NodeNode-3-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-2NodeNode-2-right-handle-0-NodeNode-3NodeNode-3-left-handle-0"
            },
            {
                "source": "NodeNode-5",
                "sourceHandle": "NodeNode-5-right-handle-0",
                "target": "NodeNode-7",
                "targetHandle": "NodeNode-7-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-5NodeNode-5-right-handle-0-NodeNode-7NodeNode-7-left-handle-0"
            },
            {
                "source": "NodeNode-2",
                "sourceHandle": "NodeNode-2-right-handle-0",
                "target": "NodeNode-5",
                "targetHandle": "NodeNode-5-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-2NodeNode-2-right-handle-0-NodeNode-5NodeNode-5-left-handle-0"
            },
            {
                "source": "NodeNode-6",
                "sourceHandle": "NodeNode-6-right-handle-0",
                "target": "NodeNode-5",
                "targetHandle": "NodeNode-5-left-handle-3",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-6NodeNode-6-right-handle-0-NodeNode-5NodeNode-5-left-handle-3"
            },
            {
                "source": "NodeNode-3",
                "sourceHandle": "NodeNode-3-right-handle-0",
                "target": "NodeNode-5",
                "targetHandle": "NodeNode-5-left-handle-2",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-5NodeNode-5-left-handle-2"
            }
        ]
    },
    {
        "templateName": "Expert Resume Tailor",
        "displayImage": gdocs,
        "templateId": "template-2",
        "tags" : ["Gen AI", "Resume"],
        "nodes": [
            {
                "id": "NodeNode-12",
                "type": "NodeNode",
                "position": {
                    "x": 146,
                    "y": 33.59999084472656
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "job_title"
                    ],
                    "sources": [],
                    "fieldValue1": "job_title",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 146,
                    "y": 33.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-13",
                "type": "NodeNode",
                "position": {
                    "x": 734,
                    "y": 45.59999084472656
                },
                "data": {
                    "name": "Gemini",
                    "isInput": true,
                    "isType": false,
                    "rightHandles": 1,
                    "leftHandles": 7,
                    "bgcolor": "#ffe682",
                    "headColor": "#f5d65b",
                    "img": "data:image/png;base64,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",
                    "category": "LLMs",
                    "sources": [
                        "system",
                        "prompt",
                        "job_title",
                        "company",
                        "YOE",
                        "my_info",
                        "job_desc"
                    ],
                    "targets": [
                        "response"
                    ],
                    "fieldValue1": "Based on this job description for a {{job_title}} role at {{company}}, write a resume for my past {{YOE}} years of work experience with 3-5 bullet points per role that include metrics and the most important 10 keywords from the job description. {{my_info}} No need to include an objective statement. \nJob description:\n{{job_desc}}",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 370,
                "selected": false,
                "positionAbsolute": {
                    "x": 734,
                    "y": 45.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-14",
                "type": "NodeNode",
                "position": {
                    "x": 385,
                    "y": 41.59999084472656
                },
                "data": {
                    "name": "Text",
                    "isInput": true,
                    "isType": false,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK7SURBVHhe7d3NShtRGMbxSdfBU6jG0iaiVijoopuKaG+g1oVgd7YW94V4CeolKHSp9MvuWujCjwvoB6IbFxYEG4sZxY4KHck+blzIi/Y4OefMc5I8v+VLJuTw52UyukimWq0GhHNLDihdDADGAGAMAMYAYAwAxgBgGdvPAXEcD++Xy8OnJycP/+yXH8X/ztrla9I08uzpbE/Pgxk594XVABsbmx9//Fx/IedoPkewFmBu/o2dN3LE1whW7gFhGBblzDfLK2vTu7u/vQtgvAGVSuXJwuK7b3LuK982wXgDSqW9cTnzmW+bYBwgiqJeOfOdTxGMA4QHh31yVg98iWB8D9B9+5kqvs7ImUu6zyOh7wnGG1Dv0JvQ9AECcAQGuICKwACXICIwgJB2BAa4QpoRGOAaaUVggP9IIwIDaLiOwAA34DICA9yQqwgMkICLCAyQkO0IDFADmxEYoEa2IjCAgeWVtWk5S4oBwBgAjAHAGu5/wra5Ph83AIwBwBgAjAHAGACMAcAYAIwBwBgAjAHAGAAM/rcg3fWumX4+3fU63AAwBgBjADAGAGMAMAYAYwAw+HOA71yfjxsAxgBgDADGAGAMAMYAYAwABn8O0F3vmunn012vww0AYwAwBgBjADAGAGMAMAYAgz8H+M71+bgBYAwAxgBgDADGAGAMAMYAYMbPAW/ffzhC/1YYirrd8nfy1cRdOU/CeAM6OwpbctYsbJzdOMCd1tYdOWsWNs5uHKCjUFiVs2Zh4+zGAZRSq0ODA0ty3uiGBgeWlFL4AEEQBP39j1/KWaOzdWbjb0GXhWFY/Pzl65ycN5LnY6NT+Xx+Xs5rZTVAcPHThqXS3ngURb3hwWFfHJ+1ydfUE6VajvP3723ncrlf3d1dn7LZ7Hf5GhPWA1AyVu4BVDsGAGMAMAYAYwAwBgBjALBzpnE4lMdJLa0AAAAASUVORK5CYII=",
                    "category": "General",
                    "targets": [
                        "Output"
                    ],
                    "fieldValue1": "You are a 100x developer who has worked at FAANG and several tier-1 software solution companies. You have interviewed 1000s of candidates for junior positions and is considered a master of resume writing. ",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 195,
                "selected": false,
                "positionAbsolute": {
                    "x": 385,
                    "y": 41.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-15",
                "type": "NodeNode",
                "position": {
                    "x": 150,
                    "y": 177.59999084472656
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "company"
                    ],
                    "sources": [],
                    "fieldValue1": "company",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 150,
                    "y": 177.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-16",
                "type": "NodeNode",
                "position": {
                    "x": 152,
                    "y": 319.59999084472656
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "YOE"
                    ],
                    "sources": [],
                    "fieldValue1": "YOE",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 152,
                    "y": 319.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-17",
                "type": "NodeNode",
                "position": {
                    "x": 152,
                    "y": 459.59999084472656
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "my_info"
                    ],
                    "sources": [],
                    "fieldValue1": "my_info",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 152,
                    "y": 459.59999084472656
                },
                "dragging": false
            },
            {
                "id": "NodeNode-18",
                "type": "NodeNode",
                "position": {
                    "x": 152,
                    "y": 602.7699920654297
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "job_desc"
                    ],
                    "sources": [],
                    "fieldValue1": "job_desc",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 152,
                    "y": 602.7699920654297
                },
                "dragging": false
            },
            {
                "id": "NodeNode-19",
                "type": "NodeNode",
                "position": {
                    "x": 1121,
                    "y": 174.76999206542973
                },
                "data": {
                    "name": "Output",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#76c965",
                    "rightHandles": 0,
                    "leftHandles": 1,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQxSURBVHhe7d1raxRnGMbxO36BlCxZ8yrroiKTNNazho3tRjQYtaYNQiVVUFBQPIOCUsUVFYUWWk9Y2kILxrSCpI21RqJoNAnxfIpmkCjbzatVSXA/QXyxLsbbJ5l5dmb2jpnr9y6XUcjzZ7K72cjkDQwMEMgZwwfILQQQhgDCEEAYAghDAGEIIAwBhCGAMAQQhgDC8pz+LCiVSkV6ep7VJZPJkkSit7T/daqQf85oUlBQ8GJ8eNzDYLDwaShU3BwIBJr55+hwFCAej2+ubzhzhO9+Uhmde7oiElnBd7uyDrD/4OHs/uIotee7nXl8syOrx4D2jo56vvldPB7fzDc7tAP09fVVX21t+5bvflffcOZIKpWK8N2KdoBEoreab5DW0/Osjm9WtAO8fPlqEt8gLZlMlvDNinaA5/H/P+MbpCUSvaV8s6L9LMjq2U+2zwY+Fm5//dpXALgLAYQhgDAEEIYAwhBAGAIIw+uAQUzTjBERGYYR43/mFVwBb5mmGTvb2LT3bGPT3kyIXECAQYef+TiXEXwfgB9+Rq4i+DrAUIefkYsIvg1gdfgZXkfwbQDDMGK1Xy89wHcVLyP4NgARUWlJyZ6vli45zHcVryL4OgARUVnZp7tqvlz8A99VvIjg+wBERJMnl+1YsmjhT3xXcTsCArw1deqUbYuqq47zXcXNCAgwyPRp0zYtrJr/M99V3IqAAMzMmTPWVy2Y9xvfVdyIgAAKs2fNWjt/XvQPvqs4jYAAQygvn7O6MvqFrV/BdBIBAYZRESlfGf284i++q2QbYcS9H2D17490y2pr9um8n4ArwGW6VwICeEAnAgJ4xG4EBBCGAB6x+2CMAB6we/iEAO7TOXwaia8DRpq2tvY/W6+3L+e7iu7hE66A4bV3dJ7y8vAJAYbW2Xnj96ut12z9B+xsD58QQO3mrVu/Xr7SuorvKk4OnxDgQ7dv3znZcunKGr6rOD18QoD33b1379jFlsvr+K7ixuETArxz//6DHy80t2zku4pbh08IkPboUdf35y9c3Mp3FTcPnxCAqKvr8aGmf//bzncVtw+f/B7gSXf3/n/Ond/JdxUvDp/8HMA0zVjj3+d2813Fq8MnPwcwDCO2rLZmH985Lw+f/ByAbETw+vDJ7wFomAi5OHxCgDQeIVeHT/hx9Psy7+Hm6vAJAfS5/fXjW5AwBBCGAMIQQBgCCEMAYQggTPt1wImTvyT7+/vH8h2ICj7Jf7Vhw/og34ejfQWMD497yDdIC4WKn/DNinaAYLDwKd8graioqJtvVrQDhELFjm7ZMZpNnDihgW9WtAMEAoHmyujc03z3uxV132zJz8/v4LsV7QBERE7umTJahcPho3yzQ/tZ0GC4iY/gTXwycBsrwdtYgXNZPQaAexBAGAIIQwBhCCAMAYQhgDAEEIYAwhBAGAIIewO2Kda2uG7ajgAAAABJRU5ErkJggg==",
                    "category": "General",
                    "sources": [
                        "Output"
                    ],
                    "fieldValue1": "",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 1121,
                    "y": 174.76999206542973
                },
                "dragging": false
            }
        ],
        "edges": [
            {
                "source": "NodeNode-14",
                "sourceHandle": "NodeNode-14-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-14NodeNode-14-right-handle-0-NodeNode-13NodeNode-13-left-handle-0"
            },
            {
                "source": "NodeNode-12",
                "sourceHandle": "NodeNode-12-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-2",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-12NodeNode-12-right-handle-0-NodeNode-13NodeNode-13-left-handle-2"
            },
            {
                "source": "NodeNode-15",
                "sourceHandle": "NodeNode-15-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-3",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-15NodeNode-15-right-handle-0-NodeNode-13NodeNode-13-left-handle-3"
            },
            {
                "source": "NodeNode-16",
                "sourceHandle": "NodeNode-16-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-4",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-16NodeNode-16-right-handle-0-NodeNode-13NodeNode-13-left-handle-4"
            },
            {
                "source": "NodeNode-17",
                "sourceHandle": "NodeNode-17-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-5",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-17NodeNode-17-right-handle-0-NodeNode-13NodeNode-13-left-handle-5"
            },
            {
                "source": "NodeNode-18",
                "sourceHandle": "NodeNode-18-right-handle-0",
                "target": "NodeNode-13",
                "targetHandle": "NodeNode-13-left-handle-6",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-18NodeNode-18-right-handle-0-NodeNode-13NodeNode-13-left-handle-6"
            },
            {
                "source": "NodeNode-13",
                "sourceHandle": "NodeNode-13-right-handle-0",
                "target": "NodeNode-19",
                "targetHandle": "NodeNode-19-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-13NodeNode-13-right-handle-0-NodeNode-19NodeNode-19-left-handle-0"
            }
        ]
    },
    {
        "templateName": "Marketing Email + Social Engineering",
        "displayImage": gmail,
        "templateId": "template-3",
        "tags" : ["Gen AI", "Gmail"],
        "nodes": [
            {
                "id": "NodeNode-21",
                "type": "NodeNode",
                "position": {
                    "x": 673,
                    "y": 106.76999206542973
                },
                "data": {
                    "name": "Llama",
                    "isInput": true,
                    "isType": false,
                    "rightHandles": 1,
                    "leftHandles": 6,
                    "bgcolor": "#ffe682",
                    "headColor": "#f5d65b",
                    "img": "/static/media/meta.1a5856d02b7ef9a0ac7d70498a85b407.svg",
                    "category": "LLMs",
                    "sources": [
                        "system",
                        "prompt",
                        "target_audience",
                        "challenges",
                        "solutions",
                        "context"
                    ],
                    "targets": [
                        "response"
                    ],
                    "fieldValue1": "Create an email copy without subject that is personalized to: {{target_audience}}\n\nHowever, they face several challenges.\n{{challenges}}\n\nThese are the solutions we provide:\n{{solutions}}\n\nAdditional context:\n{{context}}",
                    "fieldValue2": "Create an email copy and subject line that stresses urgency and scarcity, with a curious tone."
                },
                "width": 204,
                "height": 394,
                "selected": false,
                "positionAbsolute": {
                    "x": 673,
                    "y": 106.76999206542973
                },
                "dragging": false
            },
            {
                "id": "NodeNode-22",
                "type": "NodeNode",
                "position": {
                    "x": 191,
                    "y": 47.76999206542973
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "audience"
                    ],
                    "sources": [],
                    "fieldValue1": "audience",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 191,
                    "y": 47.76999206542973
                },
                "dragging": false
            },
            {
                "id": "NodeNode-23",
                "type": "NodeNode",
                "position": {
                    "x": 192,
                    "y": 203.76999206542973
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "challenges"
                    ],
                    "sources": [],
                    "fieldValue1": "challenges",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 192,
                    "y": 203.76999206542973
                },
                "dragging": false
            },
            {
                "id": "NodeNode-24",
                "type": "NodeNode",
                "position": {
                    "x": 198,
                    "y": 356.76999206542973
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "solutions"
                    ],
                    "sources": [],
                    "fieldValue1": "solutions",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 198,
                    "y": 356.76999206542973
                }
            },
            {
                "id": "NodeNode-25",
                "type": "NodeNode",
                "position": {
                    "x": 194,
                    "y": 502.76999206542973
                },
                "data": {
                    "name": "Input",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#5b96f5",
                    "rightHandles": 1,
                    "leftHandles": 0,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    "category": "General",
                    "targets": [
                        "context"
                    ],
                    "sources": [],
                    "fieldValue1": "context",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 194,
                    "y": 502.76999206542973
                },
                "dragging": false
            },
            {
                "id": "NodeNode-26",
                "type": "NodeNode",
                "position": {
                    "x": 1089.3047337278108,
                    "y": 248.99690672518943
                },
                "data": {
                    "name": "Output",
                    "isInput": true,
                    "isType": true,
                    "bgcolor": "#76c965",
                    "rightHandles": 0,
                    "leftHandles": 1,
                    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQxSURBVHhe7d1raxRnGMbxO36BlCxZ8yrroiKTNNazho3tRjQYtaYNQiVVUFBQPIOCUsUVFYUWWk9Y2kILxrSCpI21RqJoNAnxfIpmkCjbzatVSXA/QXyxLsbbJ5l5dmb2jpnr9y6XUcjzZ7K72cjkDQwMEMgZwwfILQQQhgDCEEAYAghDAGEIIAwBhCGAMAQQhgDC8pz+LCiVSkV6ep7VJZPJkkSit7T/daqQf85oUlBQ8GJ8eNzDYLDwaShU3BwIBJr55+hwFCAej2+ubzhzhO9+Uhmde7oiElnBd7uyDrD/4OHs/uIotee7nXl8syOrx4D2jo56vvldPB7fzDc7tAP09fVVX21t+5bvflffcOZIKpWK8N2KdoBEoreab5DW0/Osjm9WtAO8fPlqEt8gLZlMlvDNinaA5/H/P+MbpCUSvaV8s6L9LMjq2U+2zwY+Fm5//dpXALgLAYQhgDAEEIYAwhBAGAIIw+uAQUzTjBERGYYR43/mFVwBb5mmGTvb2LT3bGPT3kyIXECAQYef+TiXEXwfgB9+Rq4i+DrAUIefkYsIvg1gdfgZXkfwbQDDMGK1Xy89wHcVLyP4NgARUWlJyZ6vli45zHcVryL4OgARUVnZp7tqvlz8A99VvIjg+wBERJMnl+1YsmjhT3xXcTsCArw1deqUbYuqq47zXcXNCAgwyPRp0zYtrJr/M99V3IqAAMzMmTPWVy2Y9xvfVdyIgAAKs2fNWjt/XvQPvqs4jYAAQygvn7O6MvqFrV/BdBIBAYZRESlfGf284i++q2QbYcS9H2D17490y2pr9um8n4ArwGW6VwICeEAnAgJ4xG4EBBCGAB6x+2CMAB6we/iEAO7TOXwaia8DRpq2tvY/W6+3L+e7iu7hE66A4bV3dJ7y8vAJAYbW2Xnj96ut12z9B+xsD58QQO3mrVu/Xr7SuorvKk4OnxDgQ7dv3znZcunKGr6rOD18QoD33b1379jFlsvr+K7ixuETArxz//6DHy80t2zku4pbh08IkPboUdf35y9c3Mp3FTcPnxCAqKvr8aGmf//bzncVtw+f/B7gSXf3/n/Ond/JdxUvDp/8HMA0zVjj3+d2813Fq8MnPwcwDCO2rLZmH985Lw+f/ByAbETw+vDJ7wFomAi5OHxCgDQeIVeHT/hx9Psy7+Hm6vAJAfS5/fXjW5AwBBCGAMIQQBgCCEMAYQggTPt1wImTvyT7+/vH8h2ICj7Jf7Vhw/og34ejfQWMD497yDdIC4WKn/DNinaAYLDwKd8graioqJtvVrQDhELFjm7ZMZpNnDihgW9WtAMEAoHmyujc03z3uxV132zJz8/v4LsV7QBERE7umTJahcPho3yzQ/tZ0GC4iY/gTXwycBsrwdtYgXNZPQaAexBAGAIIQwBhCCAMAYQhgDAEEIYAwhBAGAIIewO2Kda2uG7ajgAAAABJRU5ErkJggg==",
                    "category": "General",
                    "sources": [
                        "Output"
                    ],
                    "fieldValue1": "",
                    "fieldValue2": ""
                },
                "width": 204,
                "height": 110,
                "selected": false,
                "positionAbsolute": {
                    "x": 1089.3047337278108,
                    "y": 248.99690672518943
                },
                "dragging": false
            }
        ],
        "edges": [
            {
                "source": "NodeNode-23",
                "sourceHandle": "NodeNode-23-right-handle-0",
                "target": "NodeNode-21",
                "targetHandle": "NodeNode-21-left-handle-3",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-23NodeNode-23-right-handle-0-NodeNode-21NodeNode-21-left-handle-3"
            },
            {
                "source": "NodeNode-22",
                "sourceHandle": "NodeNode-22-right-handle-0",
                "target": "NodeNode-21",
                "targetHandle": "NodeNode-21-left-handle-2",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-22NodeNode-22-right-handle-0-NodeNode-21NodeNode-21-left-handle-2"
            },
            {
                "source": "NodeNode-24",
                "sourceHandle": "NodeNode-24-right-handle-0",
                "target": "NodeNode-21",
                "targetHandle": "NodeNode-21-left-handle-4",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-24NodeNode-24-right-handle-0-NodeNode-21NodeNode-21-left-handle-4"
            },
            {
                "source": "NodeNode-25",
                "sourceHandle": "NodeNode-25-right-handle-0",
                "target": "NodeNode-21",
                "targetHandle": "NodeNode-21-left-handle-5",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-25NodeNode-25-right-handle-0-NodeNode-21NodeNode-21-left-handle-5"
            },
            {
                "source": "NodeNode-21",
                "sourceHandle": "NodeNode-21-right-handle-0",
                "target": "NodeNode-26",
                "targetHandle": "NodeNode-26-left-handle-0",
                "type": "smoothstep",
                "animated": true,
                "markerEnd": {
                    "type": "arrow",
                    "height": "20px",
                    "width": "40px",
                    "color": "#aaa"
                },
                "id": "reactflow__edge-NodeNode-21NodeNode-21-right-handle-0-NodeNode-26NodeNode-26-left-handle-0"
            }
        ]
    }
]

export { templateNodes };