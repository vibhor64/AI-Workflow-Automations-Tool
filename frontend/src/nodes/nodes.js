const defaultNodes = [
    {
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
            "desc": "This is a LLM.",
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
            "desc": "This is a LLM.",
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
    }
]

export { defaultNodes };