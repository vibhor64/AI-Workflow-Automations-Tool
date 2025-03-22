import gmail from "/gmail.png";
import bot from "/bot.png";
import star from "/star.png";
import discord from "/discord.png";
import sheet from "/sheets.png";

const templateNodes = [
    {
        templateName: "Summarize Meetings Into Emails",
        displayImage: gmail,
        templateId: "template-777123",
        tags: ["Gen AI", "Gmail"],
        nodes: [
            {
                id: "NodeNode-7",
                type: "NodeNode",
                position: {
                    x: 584.0015135318521,
                    y: 133.33684973465552,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 3,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "transcript"],
                    targets: ["response"],
                    fieldValue1:
                        'Please generate a comprehensive yet concise summary of the following Google Meet transcript:\n\n{{transcript}}\n\nSummarize the meeting transcript and strictly output the result as a JSON object with the following keys:\n\n* `"subject"`: A concise title or subject for the meeting summary (string).\n* `"text"`: A detailed summary of the meeting, including:\n    * Meeting Title/Topic (if explicitly mentioned or can be inferred)\n    * Date and Time (if explicitly mentioned in the transcript)\n    * Attendees (List of individuals who participated, if identifiable)\n    * Key Discussion Points (Summarize the main topics discussed and the key takeaways from each)\n    * Decisions Made (Clearly list any concrete decisions that were reached during the meeting)\n    * Action Items (List all assigned tasks, including who is responsible and the due date if mentioned)\n    * Next Steps (Outline any planned follow-up actions or future meetings)\n    * Overall Sentiment/Tone (Briefly describe the general atmosphere and focus of the meeting) (string).\n\nEnsure the output is a single, valid JSON object. Do not include any introductory or concluding remarks outside of the JSON structure.',
                    fieldValue2:
                        "You are an expert AI assistant specializing in summarizing meeting transcripts. Your primary goal is to extract key information, decisions, action items, and overall sentiment from the provided text and present it in a concise and easily understandable summary. Pay close attention to speaker attributions to accurately reflect who said what and who is responsible for specific tasks. Maintain a professional and objective tone. **Crucially, your final output MUST be a valid JSON object conforming to the specified schema.**",
                },
                width: 204,
                height: 179,
                selected: false,
                positionAbsolute: {
                    x: 584.0015135318521,
                    y: 133.33684973465552,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 192.3076938041946,
                    y: 167.53203645213102,
                },
                data: {
                    name: "Google Meet",
                    desc: "Reads the transcript of a Google Meet session based on the provided title or filename. You need a Google Workspace Business Standard or higher subscription.",
                    isInput: true,
                    isType: false,
                    bgcolor: "#34d4ed",
                    rightHandles: 1,
                    leftHandles: 0,
                    targets: ["Transcript"],
                    fieldValue1: "",
                    img: "/meet.png",
                    category: "Integrations",
                    fieldValue2: "Node-8",
                    username: false,
                },
                width: 204,
                height: 200,
                selected: false,
                positionAbsolute: {
                    x: 192.3076938041946,
                    y: 167.53203645213102,
                },
                dragging: false,
            },
            {
                id: "NodeNode-13",
                type: "NodeNode",
                position: {
                    x: 969.2627830888305,
                    y: 122.51244251239089,
                },
                data: {
                    name: "Gmail",
                    desc: "Read emails, create drafts or just send one!",
                    Nodestate: ["Create draft", "Send email", "Read emails"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#ea4335",
                    rightHandles: 0,
                    leftHandles: 1,
                    sources: ["Message"],
                    targets: [],
                    fieldValue1: {
                        isDraft: true,
                    },
                    img: "/gmail.png",
                    category: "Integrations",
                    fieldValue2: "Node-13",
                    username: false,
                },
                width: 204,
                height: 200,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 969.2627830888305,
                    y: 122.51244251239089,
                },
            },
        ],
        edges: [
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-7",
                targetHandle: "NodeNode-7-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-7NodeNode-7-left-handle-2",
            },
            {
                source: "NodeNode-7",
                sourceHandle: "NodeNode-7-right-handle-0",
                target: "NodeNode-13",
                targetHandle: "NodeNode-13-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-7NodeNode-7-right-handle-0-NodeNode-13NodeNode-13-left-handle-0",
            },
        ],
    },
    {
        templateName: "Personalized Blog Generator",
        displayImage: star,
        templateId: "template-7",
        tags: ["Gen AI"],
        nodes: [
            {
                id: "NodeNode-37",
                type: "NodeNode",
                position: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Word limit"],
                    sources: [],
                    fieldValue1: "Word limit",
                    fieldValue2: "Node-37",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                dragging: false,
            },
            {
                id: "NodeNode-38",
                type: "NodeNode",
                position: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Topic and key points"],
                    sources: [],
                    fieldValue1: "Topic and key points",
                    fieldValue2: "Node-38",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                dragging: false,
            },
            {
                id: "NodeNode-39",
                type: "NodeNode",
                position: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Target Audience"],
                    sources: [],
                    fieldValue1: "Target Audience",
                    fieldValue2: "Node-39",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                dragging: false,
            },
            {
                id: "NodeNode-40",
                type: "NodeNode",
                position: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content goal"],
                    sources: [],
                    fieldValue1: "Content goal",
                    fieldValue2: "Node-40",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                dragging: false,
            },
            {
                id: "NodeNode-41",
                type: "NodeNode",
                position: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Keywords (SEO)"],
                    sources: [],
                    fieldValue1: "Keywords (SEO)",
                    fieldValue2: "Node-41",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                dragging: false,
            },
            {
                id: "NodeNode-42",
                type: "NodeNode",
                position: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Additional info"],
                    sources: [],
                    fieldValue1: "Additional info",
                    fieldValue2: "Node-42",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                dragging: false,
            },
            {
                id: "NodeNode-43",
                type: "NodeNode",
                position: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                data: {
                    name: "Database Loader",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 0,
                    bgcolor: "#f57e2a",
                    img: "/database.webp",
                    category: "Knowledge Base",
                    sources: [],
                    targets: ["Database"],
                    fieldValue1: "NodeNode-43",
                    fieldValue2: "Node-43",
                },
                width: 204,
                height: 142,
                selected: false,
                positionAbsolute: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                dragging: false,
            },
            {
                id: "NodeNode-44",
                type: "NodeNode",
                position: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 6,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "topic",
                        "limit",
                        "audience",
                        "goal",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Topic: {{topic}}\nWord limit: {{limit}}\nTarget audience: {{audience}}\nContent goal: {{goal}}\n\nGenerate a comprehensive blog post based on these parameters, ensuring a clear and engaging writing style suitable for the target audience.",
                    fieldValue2:
                        "You are a highly skilled blog writer focused on generating well-structured, informative, and engaging initial drafts based on provided core content parameters. Your goal is to create a solid foundation that can be further refined in subsequent steps. Think step-by-step to ensure all provided information is incorporated logically and effectively.\n\nSteps:\n1.  Understand the core requirements: Carefully analyze the provided topic, word limit, key points, target audience, and content goal.\n2.  Structure the blog post: Create a logical flow with a compelling introduction, well-developed body paragraphs addressing the key points, and a clear conclusion that aligns with the content goal. Consider using headings and subheadings for better readability.\n3.  Elaborate on key points: Expand on each key point with sufficient detail and explanation, keeping the target audience's knowledge level in mind.\n4.  Maintain relevance: Ensure all content directly relates to the specified topic and contributes to achieving the content goal.\n5.  Adhere to the word limit: Keep the generated content within the specified word limit, prioritizing quality and comprehensiveness.",
                },
                width: 204,
                height: 179,
                selected: false,
                positionAbsolute: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                dragging: false,
            },
            {
                id: "NodeNode-45",
                type: "NodeNode",
                position: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 7,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "blog",
                        "keywords",
                        "previous_blogs",
                        "info",
                        "tone",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft:\n\n{{blog}}\n\nKeywords: {{keywords}}\n\nPrevious Blogs: {{previous_blogs}}\n\nAdditional info: {{info}}\n\nContent tone: {{tone}}\n\nRefine the provided blog draft to incorporate these elements, ensuring a cohesive and engaging final product that aligns with our brand and targets the desired audience effectively.",
                    fieldValue2:
                        "You are an expert blog editor focused on refining existing blog drafts to align with specific brand guidelines, desired tone, personal writing style, and target keywords. Your goal is to inject personality and optimize the content for search engines and brand consistency. Think step-by-step to ensure all stylistic and brand requirements are met.\n\nSteps:\n1.  Analyze the existing draft: Carefully review the blog post generated in the previous step.\n2.  Incorporate keywords: Strategically integrate the provided keywords naturally within the text, including headings, subheadings, and body paragraphs, without compromising readability.\n3.  Align with previous blogs (if provided): Analyze the style, tone, and formatting of the provided previous blog examples and adjust the current draft to maintain consistency.\n4.  Apply constraints: Ensure the draft adheres to any specific constraints provided (e.g., avoiding certain phrases, mentioning specific products, etc.).\n5.  Adjust tone: Modify the language and sentence structure to match the specified tone (e.g., formal, informal, humorous, authoritative).\n6.  Infuse personal style (if described): Incorporate elements of the described personal writing style, such as specific vocabulary, sentence patterns, or rhetorical devices.",
                },
                width: 204,
                height: 179,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
            },
            {
                id: "NodeNode-46",
                type: "NodeNode",
                position: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content Tone"],
                    sources: [],
                    fieldValue1: "Content Tone",
                    fieldValue2: "Node-46",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                dragging: false,
            },
            {
                id: "NodeNode-47",
                type: "NodeNode",
                position: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "blog", "context"],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft: {{blog}}\n\nAdditional Information: {{context}}\n\nFocus on ensuring the accuracy of all claims, enhancing reader engagement, and maximizing the likelihood of readers staying engaged with the content until the conclusion. Provide specific suggestions for improvement where necessary.",
                    fieldValue2:
                        "You are a meticulous blog editor focused on enhancing the accuracy, engagement, and retention of existing blog content. Your goal is to ensure the blog is informative, trustworthy, and keeps readers interested until the end. Think step-by-step to ensure the blog is of the highest quality and achieves its intended impact.\n\nSteps:\n1.  Fact-check claims: Carefully review all factual statements, statistics, and claims made in the blog post. If necessary, use the provided additional information or your own knowledge to verify accuracy. Highlight any potential inaccuracies or areas needing further investigation.\n2.  Incorporate additional information (if provided): Seamlessly integrate any provided supplementary information to enrich the content and provide further context or evidence.\n3.  Enhance engagement: Identify areas where the blog could be more engaging. Consider suggesting improvements such as adding more relatable examples, asking thought-provoking questions, or incorporating storytelling elements.\n4.  Improve readability and flow: Ensure the blog has a smooth and logical flow. Suggest improvements to sentence structure, paragraph transitions, and overall organization to enhance readability.\n5.  Focus on attention and retention: Evaluate whether the blog effectively captures and maintains the reader's attention. Suggest strategies to increase reader retention, such as breaking up large blocks of text, using visuals (even if just as suggestions), and ensuring a compelling narrative or value proposition throughout.\n6.  Do not alter the tonality or writing style of the blog.",
                },
                width: 204,
                height: 1147,
                selected: false,
                positionAbsolute: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                dragging: false,
            },
            {
                id: "NodeNode-49",
                type: "NodeNode",
                position: {
                    x: 2288.5894407053493,
                    y: 534.2396983169492,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-49",
                    fieldValue2: "Node-49",
                },
                width: 204,
                height: 108,
                selected: true,
                positionAbsolute: {
                    x: 2288.5894407053493,
                    y: 534.2396983169492,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-38",
                sourceHandle: "NodeNode-38-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-38NodeNode-38-right-handle-0-NodeNode-44NodeNode-44-left-handle-2",
            },
            {
                source: "NodeNode-37",
                sourceHandle: "NodeNode-37-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-37NodeNode-37-right-handle-0-NodeNode-44NodeNode-44-left-handle-3",
            },
            {
                source: "NodeNode-40",
                sourceHandle: "NodeNode-40-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-40NodeNode-40-right-handle-0-NodeNode-44NodeNode-44-left-handle-5",
            },
            {
                source: "NodeNode-39",
                sourceHandle: "NodeNode-39-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-39NodeNode-39-right-handle-0-NodeNode-44NodeNode-44-left-handle-4",
            },
            {
                source: "NodeNode-41",
                sourceHandle: "NodeNode-41-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-41NodeNode-41-right-handle-0-NodeNode-45NodeNode-45-left-handle-3",
            },
            {
                source: "NodeNode-42",
                sourceHandle: "NodeNode-42-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-42NodeNode-42-right-handle-0-NodeNode-45NodeNode-45-left-handle-5",
            },
            {
                source: "NodeNode-43",
                sourceHandle: "NodeNode-43-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-43NodeNode-43-right-handle-0-NodeNode-45NodeNode-45-left-handle-4",
            },
            {
                source: "NodeNode-44",
                sourceHandle: "NodeNode-44-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-44NodeNode-44-right-handle-0-NodeNode-45NodeNode-45-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-6",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-45NodeNode-45-left-handle-6",
            },
            {
                source: "NodeNode-45",
                sourceHandle: "NodeNode-45-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-45NodeNode-45-right-handle-0-NodeNode-47NodeNode-47-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-47NodeNode-47-left-handle-3",
            },
            {
                source: "NodeNode-47",
                sourceHandle: "NodeNode-47-right-handle-0",
                target: "NodeNode-49",
                targetHandle: "NodeNode-49-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-47NodeNode-47-right-handle-0-NodeNode-49NodeNode-49-left-handle-0",
            },
        ],
    },
    {
        "templateName": "Write Emails in Your Style Through Discord",
        "displayImage": discord,
        "templateId": "template-21",
        "tags": [
          "Discord", "Gmail"
        ],
        "nodes": [
          {
            "id": "NodeNode-83",
            "type": "NodeNode",
            "position": {
              "x": 59,
              "y": 210.1999969482422
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
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 59,
              "y": 210.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-84",
            "type": "NodeNode",
            "position": {
              "x": 459,
              "y": 170.1999969482422
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "query",
                "style"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Here is the user query: {{query}}\n\nHere are the user's past emails that describe their writing style: {{style}}",
              "fieldValue2": "You are an AI email drafter. Generate concise, professional emails based on the user's query and writing style (inferred from past emails).\n\n**Key Principles:**\n\n* **Direct:** State the email's purpose clearly and immediately.\n* **Concise:** Use minimal words while conveying all necessary information.\n* **Professional:** Maintain a respectful and appropriate tone.\n* **Action-Oriented (if applicable):** Clearly state any required actions from the recipient.\n\n**Input:** User query describing the email's content and desired recipient. User's past sent emails (for style reference).\n\n**Output:** A complete, ready-to-send email.\n\n**Process:**\n\n1.  **Analyze User Query:** Identify the core message, recipient, and desired outcome.\n2.  **Analyze Past Emails:** Infer the user's typical tone, formality level, sentence structure, and preferred closing.\n3.  **Draft Subject Line:** Create a brief, informative subject that reflects the email's purpose.\n4.  **Compose Body:** Write a short and focused email body addressing the query directly.\n5.  **Include Call to Action (if needed):** Clearly state what the recipient should do.\n6.  **Add Closing:** Use a professional closing consistent with the user's style.\n\n**Focus on clarity and brevity while mirroring the user's established communication style.**"
            },
            "width": 204,
            "height": 991,
            "selected": false,
            "positionAbsolute": {
              "x": 459,
              "y": 170.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-87",
            "type": "NodeNode",
            "position": {
              "x": 57.913839346918024,
              "y": 412.6964377967804
            },
            "data": {
              "name": "GDocs",
              "desc": "Create a doc (or database inside Weavebot) and store all your previously sent emails there.",
              "Nodestate": [
                "Read Doc",
                "Create Doc"
              ],
              "isInput": false,
              "isType": false,
              "bgcolor": "#636ff2",
              "rightHandles": 1,
              "leftHandles": 0,
              "img": "/gdocs.png",
              "category": "Integrations",
              "fieldValue1": "",
              "fieldValue2": "✨",
              "sources": [],
              "targets": [
                "Content"
              ],
              "username": false
            },
            "width": 204,
            "height": 188,
            "selected": false,
            "positionAbsolute": {
              "x": 57.913839346918024,
              "y": 412.6964377967804
            },
            "dragging": false
          },
          {
            "id": "NodeNode-88",
            "type": "NodeNode",
            "position": {
              "x": 849.9388722232765,
              "y": 200.72819983147286
            },
            "data": {
              "name": "Discord",
              "desc": "Our discord bot will send messages to your requested channel",
              "isInput": true,
              "isType": false,
              "bgcolor": "#5865F2",
              "rightHandles": 0,
              "leftHandles": 1,
              "fieldValue1": "",
              "sources": [
                "Message Content"
              ],
              "img": "/discord.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": false
            },
            "width": 204,
            "height": 162,
            "selected": false,
            "positionAbsolute": {
              "x": 849.9388722232765,
              "y": 200.72819983147286
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-83",
            "sourceHandle": "NodeNode-83-right-handle-0",
            "target": "NodeNode-84",
            "targetHandle": "NodeNode-84-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-83NodeNode-83-right-handle-0-NodeNode-84NodeNode-84-left-handle-2"
          },
          {
            "source": "NodeNode-87",
            "sourceHandle": "NodeNode-87-right-handle-0",
            "target": "NodeNode-84",
            "targetHandle": "NodeNode-84-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-87NodeNode-87-right-handle-0-NodeNode-84NodeNode-84-left-handle-3"
          },
          {
            "source": "NodeNode-84",
            "sourceHandle": "NodeNode-84-right-handle-0",
            "target": "NodeNode-88",
            "targetHandle": "NodeNode-88-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-84NodeNode-84-right-handle-0-NodeNode-88NodeNode-88-left-handle-0"
          }
        ]
    },
    {
        "templateName": "Deep Marketing Email Expert",
        "displayImage": bot,
        "templateId": "template-37",
        "tags": [
          "Gmail", "Assistant"
        ],
        "nodes": [
          {
            "id": "NodeNode-110",
            "type": "NodeNode",
            "position": {
              "x": 461,
              "y": 103.19999694824219
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 6,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "query",
                "audience",
                "tone",
                "goal"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "User query: {{query}}\nTarget Audience: {{audience}}\nTone: {{tone}}\nContent Goal: {{goal}}",
              "fieldValue2": "Tasks: \n\n- Identify the core objective of the user's request. What is the single most important action the user wants the recipient to take after reading the email? Output this as a concise statement.\n\n- Summarize the key characteristics and motivations of the target audience that will influence the email's messaging. Focus on aspects relevant to the user query.\n\n- Identify 3-5 keywords or short phrases that best represent the desired tone and will guide the language used in the email.\n\n- Articulate the primary call to action (CTA) that directly supports the content goal. This should be a clear and concise instruction for the recipient."
            },
            "width": 204,
            "height": 583,
            "selected": false,
            "positionAbsolute": {
              "x": 461,
              "y": 103.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-111",
            "type": "NodeNode",
            "position": {
              "x": 462.2581982120571,
              "y": 714.9709580207029
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "emails",
                "context"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "List of previous emails: {{emails}}\nAdditional Context: {{context}}",
              "fieldValue2": "Task: Analyze the provided emails and identify recurring patterns in:\n    - Sentence structure and length\n    - Word choice and vocabulary\n    - Use of persuasive language and techniques\n    - Overall flow and organization\n    - Branding elements and voice consistency\nOutput a summary of the key stylistic elements that should be incorporated into the new email.\n- Also identify the most crucial pieces of information from the additional context that must be included or considered when crafting the email message."
            },
            "width": 204,
            "height": 487,
            "selected": false,
            "positionAbsolute": {
              "x": 462.2581982120571,
              "y": 714.9709580207029
            },
            "dragging": false
          },
          {
            "id": "NodeNode-112",
            "type": "NodeNode",
            "position": {
              "x": 962.4323477302476,
              "y": 31.159335187700435
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "objectives",
                "audience"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Core Objectives, content goal CTA and Tone: {{objectives}}\n    Target Audience: {{audience}}",
              "fieldValue2": "Task: Generate 3-5 distinct subject line options that are:\n    - Relevant to the core objective\n    - Appealing to the target audience\n    - Reflective of the desired tone\n    - Encourage opens and clicks (consider using power words, urgency, or personalization)"
            },
            "width": 204,
            "height": 367,
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
              "x": 962.4323477302476,
              "y": 31.159335187700435
            }
          },
          {
            "id": "NodeNode-113",
            "type": "NodeNode",
            "position": {
              "x": 963.0671980742884,
              "y": 421.6137794790685
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 5,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "objectives",
                "audience",
                "style"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Core Objectives, content goal CTA and Tone: {{objectives}}\n    Target Audience: {{audience}}\n    Stylistic elements: {{style}}",
              "fieldValue2": "Task: Create 2-3 different opening sentences or short paragraphs that aim to immediately grab the reader's attention and connect with their needs or interests, while aligning with the desired tone and writing style."
            },
            "width": 204,
            "height": 355,
            "selected": false,
            "positionAbsolute": {
              "x": 963.0671980742884,
              "y": 421.6137794790685
            },
            "dragging": false
          },
          {
            "id": "NodeNode-114",
            "type": "NodeNode",
            "position": {
              "x": 964.6604782668594,
              "y": 797.6279049258636
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 6,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "objectives",
                "audience",
                "style",
                "context"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Core Objectives, content goal CTA and Tone: {{objectives}}\n    Target Audience: {{audience}}\n    Stylistic elements: {{style}}\nAdditional context: {{context}}",
              "fieldValue2": "Task: Draft the main body of the email, ensuring it:\n    - Clearly communicates the core message\n    - Addresses the target audience's needs and interests\n    - Incorporates the desired tone and writing style\n    - Includes all necessary information from the additional context\n    - Generate 2-3 variations of the call to action that are:\n    - Clear and concise\n    - Action-oriented\n    - Enticing and encourage clicks\n    - Consistent with the overall tone and style.\n- Create 2-3 closing remarks that reinforce the brand identity and leave a positive final impression, aligning with the desired tone and style. Include standard elements like company name and optional contact information."
            },
            "width": 204,
            "height": 619,
            "selected": false,
            "positionAbsolute": {
              "x": 964.6604782668594,
              "y": 797.6279049258636
            },
            "dragging": false
          },
          {
            "id": "NodeNode-115",
            "type": "NodeNode",
            "position": {
              "x": 1330.690760856686,
              "y": 378.75059736396736
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 5,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "subject",
                "hook",
                "body"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Subject: {{subject}}\nHook: {{hook}}\nMain body: {{body}}",
              "fieldValue2": "Task: Combine one option from each of the generated elements (subject line, opening, body, CTA, closing) to create a complete initial draft of the marketing email. Choose the options that seem most cohesive and aligned with all previous outputs."
            },
            "width": 204,
            "height": 319,
            "selected": false,
            "positionAbsolute": {
              "x": 1330.690760856686,
              "y": 378.75059736396736
            },
            "dragging": false
          },
          {
            "id": "NodeNode-116",
            "type": "NodeNode",
            "position": {
              "x": 1730.011513153076,
              "y": 376.5387677655908
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 5,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "draft",
                "first",
                "style"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Initial email draft: {{draft}}\nTarget Audience Summary, copntent goal CTA and Desired Tone Keywords: {{first}}\n    Stylistic Elements Summary: {{style}}",
              "fieldValue2": "Task: Review and refine the initial email draft to ensure it is:\n    - **Hyper-optimized for marketing content:** Focus on clarity, conciseness, persuasive language, and a strong call to action.\n    - **Aligned with user's preferences:** Double-check that the tone, style, and messaging are consistent with the earlier defined parameters.\n    - **Engaging for the target audience:** Ensure the language and content resonate with their needs and interests.\n    - **Free of errors:** Check for grammar, spelling, and punctuation mistakes.\n    - **Mobile-friendly (consider this aspect in your refinement):** Suggest any formatting adjustments for better readability on mobile devices.\n\n- Strictly output the result as a JSON object with the following keys:\n`\"subject\"`: A concise title or subject for the email. `\"text\"`: Body of email\n\nOutput the final, refined marketing email."
            },
            "width": 204,
            "height": 703,
            "selected": false,
            "positionAbsolute": {
              "x": 1730.011513153076,
              "y": 376.5387677655908
            },
            "dragging": false
          },
          {
            "id": "NodeNode-117",
            "type": "NodeNode",
            "position": {
              "x": -11.690344951358924,
              "y": 170.65275751523006
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
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": -11.690344951358924,
              "y": 170.65275751523006
            },
            "dragging": false
          },
          {
            "id": "NodeNode-118",
            "type": "NodeNode",
            "position": {
              "x": -9.947833352357364,
              "y": 304.43744504449273
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
                "Target Audience"
              ],
              "sources": [],
              "fieldValue1": "Target Audience",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": -9.947833352357364,
              "y": 304.43744504449273
            },
            "dragging": false
          },
          {
            "id": "NodeNode-119",
            "type": "NodeNode",
            "position": {
              "x": -9.160929413378867,
              "y": 441.6927170357754
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
                "Tone"
              ],
              "sources": [],
              "fieldValue1": "Tone",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": -9.160929413378867,
              "y": 441.6927170357754
            },
            "dragging": false
          },
          {
            "id": "NodeNode-120",
            "type": "NodeNode",
            "position": {
              "x": -8.182017378509457,
              "y": 580.4374450444926
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
                "Content goal"
              ],
              "sources": [],
              "fieldValue1": "Content goal",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": -8.182017378509457,
              "y": 580.4374450444926
            },
            "dragging": false
          },
          {
            "id": "NodeNode-121",
            "type": "NodeNode",
            "position": {
              "x": -6.884569456965664,
              "y": 727.18217305321
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
                "Additional context"
              ],
              "sources": [],
              "fieldValue1": "Additional context",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": -6.884569456965664,
              "y": 727.18217305321
            },
            "dragging": false
          },
          {
            "id": "NodeNode-125",
            "type": "NodeNode",
            "position": {
              "x": -0.08879987912415288,
              "y": 909.1966117891931
            },
            "data": {
              "name": "Database Loader",
              "isInput": false,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 0,
              "bgcolor": "#f57e2a",
              "img": "/database.webp",
              "category": "Knowledge Base",
              "sources": [],
              "targets": [
                "Database"
              ],
              "fieldValue1": "🖊️",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 142,
            "selected": false,
            "positionAbsolute": {
              "x": -0.08879987912415288,
              "y": 909.1966117891931
            },
            "dragging": false
          },
          {
            "id": "NodeNode-126",
            "type": "NodeNode",
            "position": {
              "x": 2114.063312841882,
              "y": 382.0489960332792
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
                "addresses"
              ],
              "targets": [],
              "fieldValue1": {
                "1": "{{addresses}}",
                "isDraft": true
              },
              "img": "/gmail.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": false
            },
            "width": 204,
            "height": 200,
            "selected": false,
            "positionAbsolute": {
              "x": 2114.063312841882,
              "y": 382.0489960332792
            },
            "dragging": false
          },
          {
            "id": "NodeNode-127",
            "type": "NodeNode",
            "position": {
              "x": 2117.1354423761372,
              "y": 651.0323408875801
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
                "Email Addresses"
              ],
              "sources": [],
              "fieldValue1": "Email Addresses",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": true,
            "positionAbsolute": {
              "x": 2117.1354423761372,
              "y": 651.0323408875801
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-125",
            "sourceHandle": "NodeNode-125-right-handle-0",
            "target": "NodeNode-111",
            "targetHandle": "NodeNode-111-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-125NodeNode-125-right-handle-0-NodeNode-111NodeNode-111-left-handle-2"
          },
          {
            "source": "NodeNode-121",
            "sourceHandle": "NodeNode-121-right-handle-0",
            "target": "NodeNode-111",
            "targetHandle": "NodeNode-111-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-121NodeNode-121-right-handle-0-NodeNode-111NodeNode-111-left-handle-3"
          },
          {
            "source": "NodeNode-120",
            "sourceHandle": "NodeNode-120-right-handle-0",
            "target": "NodeNode-110",
            "targetHandle": "NodeNode-110-left-handle-5",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-120NodeNode-120-right-handle-0-NodeNode-110NodeNode-110-left-handle-5"
          },
          {
            "source": "NodeNode-119",
            "sourceHandle": "NodeNode-119-right-handle-0",
            "target": "NodeNode-110",
            "targetHandle": "NodeNode-110-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-119NodeNode-119-right-handle-0-NodeNode-110NodeNode-110-left-handle-4"
          },
          {
            "source": "NodeNode-118",
            "sourceHandle": "NodeNode-118-right-handle-0",
            "target": "NodeNode-110",
            "targetHandle": "NodeNode-110-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-118NodeNode-118-right-handle-0-NodeNode-110NodeNode-110-left-handle-3"
          },
          {
            "source": "NodeNode-117",
            "sourceHandle": "NodeNode-117-right-handle-0",
            "target": "NodeNode-110",
            "targetHandle": "NodeNode-110-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-117NodeNode-117-right-handle-0-NodeNode-110NodeNode-110-left-handle-2"
          },
          {
            "source": "NodeNode-110",
            "sourceHandle": "NodeNode-110-right-handle-0",
            "target": "NodeNode-112",
            "targetHandle": "NodeNode-112-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-110NodeNode-110-right-handle-0-NodeNode-112NodeNode-112-left-handle-2"
          },
          {
            "source": "NodeNode-118",
            "sourceHandle": "NodeNode-118-right-handle-0",
            "target": "NodeNode-112",
            "targetHandle": "NodeNode-112-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-118NodeNode-118-right-handle-0-NodeNode-112NodeNode-112-left-handle-3"
          },
          {
            "source": "NodeNode-110",
            "sourceHandle": "NodeNode-110-right-handle-0",
            "target": "NodeNode-113",
            "targetHandle": "NodeNode-113-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-110NodeNode-110-right-handle-0-NodeNode-113NodeNode-113-left-handle-2"
          },
          {
            "source": "NodeNode-118",
            "sourceHandle": "NodeNode-118-right-handle-0",
            "target": "NodeNode-113",
            "targetHandle": "NodeNode-113-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-118NodeNode-118-right-handle-0-NodeNode-113NodeNode-113-left-handle-3"
          },
          {
            "source": "NodeNode-111",
            "sourceHandle": "NodeNode-111-right-handle-0",
            "target": "NodeNode-113",
            "targetHandle": "NodeNode-113-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-111NodeNode-111-right-handle-0-NodeNode-113NodeNode-113-left-handle-4"
          },
          {
            "source": "NodeNode-110",
            "sourceHandle": "NodeNode-110-right-handle-0",
            "target": "NodeNode-114",
            "targetHandle": "NodeNode-114-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-110NodeNode-110-right-handle-0-NodeNode-114NodeNode-114-left-handle-2"
          },
          {
            "source": "NodeNode-118",
            "sourceHandle": "NodeNode-118-right-handle-0",
            "target": "NodeNode-114",
            "targetHandle": "NodeNode-114-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-118NodeNode-118-right-handle-0-NodeNode-114NodeNode-114-left-handle-3"
          },
          {
            "source": "NodeNode-111",
            "sourceHandle": "NodeNode-111-right-handle-0",
            "target": "NodeNode-114",
            "targetHandle": "NodeNode-114-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-111NodeNode-111-right-handle-0-NodeNode-114NodeNode-114-left-handle-4"
          },
          {
            "source": "NodeNode-121",
            "sourceHandle": "NodeNode-121-right-handle-0",
            "target": "NodeNode-114",
            "targetHandle": "NodeNode-114-left-handle-5",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-121NodeNode-121-right-handle-0-NodeNode-114NodeNode-114-left-handle-5"
          },
          {
            "source": "NodeNode-112",
            "sourceHandle": "NodeNode-112-right-handle-0",
            "target": "NodeNode-115",
            "targetHandle": "NodeNode-115-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-112NodeNode-112-right-handle-0-NodeNode-115NodeNode-115-left-handle-2"
          },
          {
            "source": "NodeNode-113",
            "sourceHandle": "NodeNode-113-right-handle-0",
            "target": "NodeNode-115",
            "targetHandle": "NodeNode-115-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-113NodeNode-113-right-handle-0-NodeNode-115NodeNode-115-left-handle-3"
          },
          {
            "source": "NodeNode-114",
            "sourceHandle": "NodeNode-114-right-handle-0",
            "target": "NodeNode-115",
            "targetHandle": "NodeNode-115-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-114NodeNode-114-right-handle-0-NodeNode-115NodeNode-115-left-handle-4"
          },
          {
            "source": "NodeNode-115",
            "sourceHandle": "NodeNode-115-right-handle-0",
            "target": "NodeNode-116",
            "targetHandle": "NodeNode-116-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-115NodeNode-115-right-handle-0-NodeNode-116NodeNode-116-left-handle-2"
          },
          {
            "source": "NodeNode-110",
            "sourceHandle": "NodeNode-110-right-handle-0",
            "target": "NodeNode-116",
            "targetHandle": "NodeNode-116-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-110NodeNode-110-right-handle-0-NodeNode-116NodeNode-116-left-handle-3"
          },
          {
            "source": "NodeNode-111",
            "sourceHandle": "NodeNode-111-right-handle-0",
            "target": "NodeNode-116",
            "targetHandle": "NodeNode-116-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-111NodeNode-111-right-handle-0-NodeNode-116NodeNode-116-left-handle-4"
          },
          {
            "source": "NodeNode-116",
            "sourceHandle": "NodeNode-116-right-handle-0",
            "target": "NodeNode-126",
            "targetHandle": "NodeNode-126-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-116NodeNode-116-right-handle-0-NodeNode-126NodeNode-126-left-handle-0"
          },
          {
            "source": "NodeNode-127",
            "sourceHandle": "NodeNode-127-right-handle-0",
            "target": "NodeNode-126",
            "targetHandle": "NodeNode-126-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-127NodeNode-127-right-handle-0-NodeNode-126NodeNode-126-left-handle-1"
          }
        ]
    },

    
    {
        templateName: "Daily Email Summary",
        displayImage: gmail,
        templateId: "template-812021",
        tags: ["Gmail", "Assistant", "Discord"],
        nodes: [
            {
                id: "NodeNode-55",
                type: "NodeNode",
                position: {
                    x: 156.48835965188738,
                    y: 88.31035284795246,
                },
                data: {
                    name: "Gmail",
                    desc: "Read emails, create drafts or just send one!",
                    Nodestate: ["Create draft", "Send email", "Read emails"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#ea4335",
                    rightHandles: 1,
                    leftHandles: 0,
                    sources: [],
                    targets: ["Emails"],
                    fieldValue1: {
                        2: "Unread",
                        isDraft: true,
                    },
                    img: "/gmail.png",
                    category: "Integrations",
                    fieldValue2: "Node-55",
                    username: false,
                },
                width: 204,
                height: 253,
                selected: false,
                positionAbsolute: {
                    x: 156.48835965188738,
                    y: 88.31035284795246,
                },
                dragging: false,
            },
            {
                id: "NodeNode-56",
                type: "NodeNode",
                position: {
                    x: 568.5847224160286,
                    y: 82.45116285604524,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 3,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "emails"],
                    targets: ["response"],
                    fieldValue1:
                        "Please provide a summary of my unread emails received today.\n\nHere are the unread emails:\n\n{{emails}}",
                    fieldValue2:
                        "You are an AI assistant designed to summarize unread emails. Your role is to provide concise, informative summaries that allow the user to quickly understand the content and importance of their new messages.\n\n**Key Guidelines:**\n\n* **Prioritize Importance:** If possible, identify and prioritize emails that appear to be of high importance (e.g., urgent requests, important announcements, emails from key contacts).\n* **Conciseness:** Keep summaries brief and to the point. Aim for 2-3 sentences per email.\n* **Key Information:** Include the sender, subject, and the main points of the email.\n* **Actionable Items:** If an email requests action, clearly state what is needed.\n* **Avoid Personal Opinions:** Stick to summarizing the content of the email objectively.\n* **Formatting:** Present the summary in a clear and easy-to-read format (e.g., bullet points, numbered list).\n* **If no unread emails are found for today, state that.**\n\n**Input Format:**\n\nThe unread emails will be provided to you in a structured format. Each email will include the following information:\n\n* **Sender:** (Email address or name)\n* **Subject:** (Email subject line)\n* **Date/Time:** (Date and time the email was received)\n* **Body:** (The main content of the email)",
                },
                width: 204,
                height: 919,
                selected: false,
                positionAbsolute: {
                    x: 568.5847224160286,
                    y: 82.45116285604524,
                },
                dragging: false,
            },
            {
                id: "NodeNode-58",
                type: "NodeNode",
                position: {
                    x: 925.9953119223693,
                    y: 84.99015114614798,
                },
                data: {
                    name: "Discord",
                    desc: "Our discord bot will send messages to your requested channel",
                    isInput: true,
                    isType: false,
                    bgcolor: "#5865F2",
                    rightHandles: 0,
                    leftHandles: 1,
                    fieldValue1: "",
                    sources: ["Message Content"],
                    img: "/discord.png",
                    category: "Integrations",
                    fieldValue2: "Node-58",
                    username: false,
                },
                width: 204,
                height: 162,
                selected: false,
                positionAbsolute: {
                    x: 925.9953119223693,
                    y: 84.99015114614798,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-55",
                sourceHandle: "NodeNode-55-right-handle-0",
                target: "NodeNode-56",
                targetHandle: "NodeNode-56-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-55NodeNode-55-right-handle-0-NodeNode-56NodeNode-56-left-handle-2",
            },
            {
                source: "NodeNode-56",
                sourceHandle: "NodeNode-56-right-handle-0",
                target: "NodeNode-58",
                targetHandle: "NodeNode-58-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-56NodeNode-56-right-handle-0-NodeNode-58NodeNode-58-left-handle-0",
            },
        ],
    },
    {
        templateName: "FAANG-Assured Resume Using Chain-Of-Thought",
        displayImage: star,
        templateId: "template-79302",
        tags: ["Gen AI"],
        nodes: [
            {
                id: "NodeNode-37",
                type: "NodeNode",
                position: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Experience"],
                    sources: [],
                    fieldValue1: "Experience",
                    fieldValue2: "Node-37",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                dragging: false,
            },
            {
                id: "NodeNode-38",
                type: "NodeNode",
                position: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Education"],
                    sources: [],
                    fieldValue1: "Education",
                    fieldValue2: "Node-38",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                dragging: false,
            },
            {
                id: "NodeNode-39",
                type: "NodeNode",
                position: {
                    x: 488.9808000102027,
                    y: 780.2651743418157,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Projects"],
                    sources: [],
                    fieldValue1: "Projects",
                    fieldValue2: "Node-39",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 488.9808000102027,
                    y: 780.2651743418157,
                },
                dragging: false,
            },
            {
                id: "NodeNode-40",
                type: "NodeNode",
                position: {
                    x: 492.81661045773654,
                    y: 641.5040512832171,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Skills"],
                    sources: [],
                    fieldValue1: "Skills",
                    fieldValue2: "Node-40",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.81661045773654,
                    y: 641.5040512832171,
                },
                dragging: false,
            },
            {
                id: "NodeNode-49",
                type: "NodeNode",
                position: {
                    x: 1870.1100714379113,
                    y: 531.1130499293483,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-49",
                    fieldValue2: "Node-49",
                },
                width: 204,
                height: 108,
                selected: true,
                positionAbsolute: {
                    x: 1870.1100714379113,
                    y: 531.1130499293483,
                },
                dragging: false,
            },
            {
                id: "NodeNode-50",
                type: "NodeNode",
                position: {
                    x: 843.0275614081876,
                    y: 521.2120564287736,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 8,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "Education",
                        "Experience",
                        "Skills",
                        "Projects",
                        "companies",
                        "context",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Education: {{Education}}\n\nExperience: {{Experience}}\n\nSkills: {{Skills}}\n\nProjects: {{Projects}}\n\nTarget Companies: {{companies}}\n\nAdditonal info: {{context}}\n\nGenerate an ATS-friendly resume based on this information, incorporating relevant keywords for Software Engineer roles at FAANG companies.",
                    fieldValue2:
                        "You are an expert in creating Applicant Tracking System (ATS) friendly resumes. Your primary goal is to structure the provided information into a standard resume format that is easily parsed by ATS software. Focus on clarity, conciseness, and the appropriate use of keywords. Think step-by-step to ensure optimal ATS compatibility.\n\nSteps:\n1.  Extract key information: Identify and organize the provided user details, including contact information, education, work experience, skills, and projects.\n2.  Standard resume structure: Format the information using standard resume sections (e.g., Contact, Summary/Objective, Experience, Education, Skills, Projects). Use clear and consistent formatting (e.g., bullet points, standard fonts).\n3.  Keyword incorporation: Identify relevant keywords based on the user's role and target FAANG companies. Integrate these keywords naturally within the job descriptions and skills sections. Prioritize industry-standard terminology.\n4.  Concise language: Use clear and concise language, avoiding jargon or overly creative phrasing that might confuse ATS. Focus on nouns and strong action verbs (to be further enhanced in the next stage).\n5.  ATS best practices: Adhere to ATS best practices, such as avoiding tables, graphics, and unusual formatting elements. Use standard section headings.",
                },
                width: 204,
                height: 1063,
                selected: false,
                positionAbsolute: {
                    x: 843.0275614081876,
                    y: 521.2120564287736,
                },
                dragging: false,
            },
            {
                id: "NodeNode-51",
                type: "NodeNode",
                position: {
                    x: 488.9009842086617,
                    y: 927.6325902588076,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Target Companies"],
                    sources: [],
                    fieldValue1: "Target Companies",
                    fieldValue2: "Node-51",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 488.9009842086617,
                    y: 927.6325902588076,
                },
                dragging: false,
            },
            {
                id: "NodeNode-52",
                type: "NodeNode",
                position: {
                    x: 490.1702550946817,
                    y: 1077.4065548091446,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Additional info"],
                    sources: [],
                    fieldValue1: "Additional info",
                    fieldValue2: "Node-52",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 490.1702550946817,
                    y: 1077.4065548091446,
                },
                dragging: false,
            },
            {
                id: "NodeNode-53",
                type: "NodeNode",
                position: {
                    x: 1232.6937234162676,
                    y: 521.4659067324701,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 3,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "resume"],
                    targets: ["response"],
                    fieldValue1:
                        "ATS-Friendly Resume Draft:\n{{resume}}\n\nRefine the work experience section of this resume by adding quantifiable achievements and using strong action verbs to highlight the impact of John Doe's contributions at ABC Tech.",
                    fieldValue2:
                        'You are an expert resume writer focused on maximizing the impact of work experience bullet points. Your primary goal is to transform the ATS-friendly resume draft by incorporating quantifiable achievements and strong action verbs to showcase the candidate\'s accomplishments. Think step-by-step to create compelling and results-oriented descriptions.\n\nSteps:\n1.  Analyze existing experience: Review each bullet point in the work experience section of the provided resume draft.\n2.  Identify opportunities for quantification: Look for responsibilities or tasks that can be expressed with numbers, percentages, or specific metrics to demonstrate impact.\n3.  Incorporate quantifiable achievements: Rephrase bullet points to include quantifiable results whenever possible. Focus on "how much," "how many," or "by what percentage" the candidate contributed.\n4.  Use strong action verbs: Replace generic verbs with powerful action verbs that clearly convey the candidate\'s actions and contributions (e.g., "Led," "Developed," "Implemented," "Optimized," "Increased," "Reduced").\n5.  Focus on impact and results: Ensure that each bullet point highlights the positive impact of the candidate\'s actions and the results they achieved. Use the "STAR" method (Situation, Task, Action, Result) implicitly where applicable.',
                },
                width: 204,
                height: 979,
                selected: false,
                positionAbsolute: {
                    x: 1232.6937234162676,
                    y: 521.4659067324701,
                },
                dragging: false,
            },
            {
                id: "NodeNode-54",
                type: "NodeNode",
                position: {
                    x: 1541.12654871908,
                    y: 522.9890279221864,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "Resume", "companies"],
                    targets: ["response"],
                    fieldValue1:
                        "Impactful Resume Draft:\n{{Resume}}\n\nTarget Companies: {{companies}}\n\nRefine this resume to specifically align with FAANG hiring expectations for Software Engineer roles. Emphasize relevant skills and projects, tailor the summary (or add one if missing), and use language that will resonate with FAANG recruiters and interviewers.\n\n",
                    fieldValue2:
                        "You are a resume optimization specialist with deep understanding of FAANG hiring practices and interviewer expectations. Your primary goal is to tailor the already impactful resume to specifically resonate with FAANG recruiters and hiring managers, emphasizing relevant skills, projects, and using language that demonstrates alignment with FAANG values. Think step-by-step to create a resume that stands out and prepares the candidate for interviews.\n\nSteps:\n1.  Analyze FAANG expectations: Consider the core values, technical expectations, and desired soft skills typically sought by FAANG companies (e.g., leadership, ownership, innovation, collaboration, problem-solving).\n2.  Highlight relevant skills: Ensure the skills section prominently features technologies and tools highly relevant to the target FAANG roles (based on the initial user input and common FAANG tech stacks).\n3.  Showcase impactful projects: Emphasize projects that demonstrate technical depth, problem-solving abilities, and ideally, experience with technologies or methodologies used at FAANG companies. Quantify the impact of personal projects where possible.\n4.  Tailor the summary/objective: Craft a compelling summary or objective statement that directly aligns the candidate's experience and aspirations with the types of roles they are targeting at FAANG.\n5.  Refine language for interviewer appeal: Use language that demonstrates proactiveness, ownership, and a growth mindset. Frame accomplishments in a way that highlights the candidate's potential to contribute significantly to a FAANG team.\n6.  Review for consistency and flow: Ensure the entire resume flows logically and presents a consistent narrative of the candidate's skills and experiences.\n7.  (Optional) Suggest potential interview talking points based on the highlighted achievements and projects.",
                },
                width: 204,
                height: 1325,
                selected: false,
                positionAbsolute: {
                    x: 1541.12654871908,
                    y: 522.9890279221864,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-38",
                sourceHandle: "NodeNode-38-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-38NodeNode-38-right-handle-0-NodeNode-50NodeNode-50-left-handle-2",
            },
            {
                source: "NodeNode-52",
                sourceHandle: "NodeNode-52-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-7",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-52NodeNode-52-right-handle-0-NodeNode-50NodeNode-50-left-handle-7",
            },
            {
                source: "NodeNode-51",
                sourceHandle: "NodeNode-51-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-6",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-51NodeNode-51-right-handle-0-NodeNode-50NodeNode-50-left-handle-6",
            },
            {
                source: "NodeNode-39",
                sourceHandle: "NodeNode-39-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-39NodeNode-39-right-handle-0-NodeNode-50NodeNode-50-left-handle-5",
            },
            {
                source: "NodeNode-40",
                sourceHandle: "NodeNode-40-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-40NodeNode-40-right-handle-0-NodeNode-50NodeNode-50-left-handle-4",
            },
            {
                source: "NodeNode-37",
                sourceHandle: "NodeNode-37-right-handle-0",
                target: "NodeNode-50",
                targetHandle: "NodeNode-50-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-37NodeNode-37-right-handle-0-NodeNode-50NodeNode-50-left-handle-3",
            },
            {
                source: "NodeNode-50",
                sourceHandle: "NodeNode-50-right-handle-0",
                target: "NodeNode-53",
                targetHandle: "NodeNode-53-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-50NodeNode-50-right-handle-0-NodeNode-53NodeNode-53-left-handle-2",
            },
            {
                source: "NodeNode-53",
                sourceHandle: "NodeNode-53-right-handle-0",
                target: "NodeNode-54",
                targetHandle: "NodeNode-54-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-53NodeNode-53-right-handle-0-NodeNode-54NodeNode-54-left-handle-2",
            },
            {
                source: "NodeNode-51",
                sourceHandle: "NodeNode-51-right-handle-0",
                target: "NodeNode-54",
                targetHandle: "NodeNode-54-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-51NodeNode-51-right-handle-0-NodeNode-54NodeNode-54-left-handle-3",
            },
            {
                source: "NodeNode-54",
                sourceHandle: "NodeNode-54-right-handle-0",
                target: "NodeNode-49",
                targetHandle: "NodeNode-49-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-54NodeNode-54-right-handle-0-NodeNode-49NodeNode-49-left-handle-0",
            },
        ],
    },
    
    {
        templateName: "Deep Content Writer",
        displayImage: bot,
        templateId: "template-848484",
        tags: ["Assistant"],
        nodes: [
            {
                id: "NodeNode-37",
                type: "NodeNode",
                position: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Word limit"],
                    sources: [],
                    fieldValue1: "Word limit",
                    fieldValue2: "Node-37",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                dragging: false,
            },
            {
                id: "NodeNode-38",
                type: "NodeNode",
                position: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Topic and key points"],
                    sources: [],
                    fieldValue1: "Topic and key points",
                    fieldValue2: "Node-38",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                dragging: false,
            },
            {
                id: "NodeNode-39",
                type: "NodeNode",
                position: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Target Audience"],
                    sources: [],
                    fieldValue1: "Target Audience",
                    fieldValue2: "Node-39",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                dragging: false,
            },
            {
                id: "NodeNode-40",
                type: "NodeNode",
                position: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content goal"],
                    sources: [],
                    fieldValue1: "Content goal",
                    fieldValue2: "Node-40",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                dragging: false,
            },
            {
                id: "NodeNode-41",
                type: "NodeNode",
                position: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Keywords (SEO)"],
                    sources: [],
                    fieldValue1: "Keywords (SEO)",
                    fieldValue2: "Node-41",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                dragging: false,
            },
            {
                id: "NodeNode-42",
                type: "NodeNode",
                position: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Additional info"],
                    sources: [],
                    fieldValue1: "Additional info",
                    fieldValue2: "Node-42",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                dragging: false,
            },
            {
                id: "NodeNode-43",
                type: "NodeNode",
                position: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                data: {
                    name: "Database Loader",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 0,
                    bgcolor: "#f57e2a",
                    img: "/database.webp",
                    category: "Knowledge Base",
                    sources: [],
                    targets: ["Database"],
                    fieldValue1: "NodeNode-43",
                    fieldValue2: "Node-43",
                },
                width: 204,
                height: 142,
                selected: false,
                positionAbsolute: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                dragging: false,
            },
            {
                id: "NodeNode-44",
                type: "NodeNode",
                position: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 6,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "topic",
                        "limit",
                        "audience",
                        "goal",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Topic: {{topic}}\nWord limit: {{limit}}\nTarget audience: {{audience}}\nContent goal: {{goal}}\n\nGenerate a comprehensive blog post based on these parameters, ensuring a clear and engaging writing style suitable for the target audience.",
                    fieldValue2:
                        "You are a highly skilled blog writer focused on generating well-structured, informative, and engaging initial drafts based on provided core content parameters. Your goal is to create a solid foundation that can be further refined in subsequent steps. Think step-by-step to ensure all provided information is incorporated logically and effectively.\n\nSteps:\n1.  Understand the core requirements: Carefully analyze the provided topic, word limit, key points, target audience, and content goal.\n2.  Structure the blog post: Create a logical flow with a compelling introduction, well-developed body paragraphs addressing the key points, and a clear conclusion that aligns with the content goal. Consider using headings and subheadings for better readability.\n3.  Elaborate on key points: Expand on each key point with sufficient detail and explanation, keeping the target audience's knowledge level in mind.\n4.  Maintain relevance: Ensure all content directly relates to the specified topic and contributes to achieving the content goal.\n5.  Adhere to the word limit: Keep the generated content within the specified word limit, prioritizing quality and comprehensiveness.",
                },
                width: 204,
                height: 179,
                selected: false,
                positionAbsolute: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                dragging: false,
            },
            {
                id: "NodeNode-45",
                type: "NodeNode",
                position: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 7,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "blog",
                        "keywords",
                        "previous_blogs",
                        "info",
                        "tone",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft:\n\n{{blog}}\n\nKeywords: {{keywords}}\n\nPrevious Blogs: {{previous_blogs}}\n\nAdditional info: {{info}}\n\nContent tone: {{tone}}\n\nRefine the provided blog draft to incorporate these elements, ensuring a cohesive and engaging final product that aligns with our brand and targets the desired audience effectively.",
                    fieldValue2:
                        "You are an expert blog editor focused on refining existing blog drafts to align with specific brand guidelines, desired tone, personal writing style, and target keywords. Your goal is to inject personality and optimize the content for search engines and brand consistency. Think step-by-step to ensure all stylistic and brand requirements are met.\n\nSteps:\n1.  Analyze the existing draft: Carefully review the blog post generated in the previous step.\n2.  Incorporate keywords: Strategically integrate the provided keywords naturally within the text, including headings, subheadings, and body paragraphs, without compromising readability.\n3.  Align with previous blogs (if provided): Analyze the style, tone, and formatting of the provided previous blog examples and adjust the current draft to maintain consistency.\n4.  Apply constraints: Ensure the draft adheres to any specific constraints provided (e.g., avoiding certain phrases, mentioning specific products, etc.).\n5.  Adjust tone: Modify the language and sentence structure to match the specified tone (e.g., formal, informal, humorous, authoritative).\n6.  Infuse personal style (if described): Incorporate elements of the described personal writing style, such as specific vocabulary, sentence patterns, or rhetorical devices.",
                },
                width: 204,
                height: 179,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
            },
            {
                id: "NodeNode-46",
                type: "NodeNode",
                position: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content Tone"],
                    sources: [],
                    fieldValue1: "Content Tone",
                    fieldValue2: "Node-46",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                dragging: false,
            },
            {
                id: "NodeNode-47",
                type: "NodeNode",
                position: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "blog", "context"],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft: {{blog}}\n\nAdditional Information: {{context}}\n\nFocus on ensuring the accuracy of all claims, enhancing reader engagement, and maximizing the likelihood of readers staying engaged with the content until the conclusion. Provide specific suggestions for improvement where necessary.",
                    fieldValue2:
                        "You are a meticulous blog editor focused on enhancing the accuracy, engagement, and retention of existing blog content. Your goal is to ensure the blog is informative, trustworthy, and keeps readers interested until the end. Think step-by-step to ensure the blog is of the highest quality and achieves its intended impact.\n\nSteps:\n1.  Fact-check claims: Carefully review all factual statements, statistics, and claims made in the blog post. If necessary, use the provided additional information or your own knowledge to verify accuracy. Highlight any potential inaccuracies or areas needing further investigation.\n2.  Incorporate additional information (if provided): Seamlessly integrate any provided supplementary information to enrich the content and provide further context or evidence.\n3.  Enhance engagement: Identify areas where the blog could be more engaging. Consider suggesting improvements such as adding more relatable examples, asking thought-provoking questions, or incorporating storytelling elements.\n4.  Improve readability and flow: Ensure the blog has a smooth and logical flow. Suggest improvements to sentence structure, paragraph transitions, and overall organization to enhance readability.\n5.  Focus on attention and retention: Evaluate whether the blog effectively captures and maintains the reader's attention. Suggest strategies to increase reader retention, such as breaking up large blocks of text, using visuals (even if just as suggestions), and ensuring a compelling narrative or value proposition throughout.\n6.  Do not alter the tonality or writing style of the blog.",
                },
                width: 204,
                height: 1147,
                selected: false,
                positionAbsolute: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                dragging: false,
            },
            {
                id: "NodeNode-51",
                type: "NodeNode",
                position: {
                    x: 2250.6371897327303,
                    y: 513.856822402856,
                },
                data: {
                    name: "Database Output",
                    desc: "Save pipeline output in a new database",
                    isInput: true,
                    isType: false,
                    rightHandles: 0,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database-res.png",
                    category: "Knowledge Base",
                    sources: ["results"],
                    fieldValue1: "Unique-blog-1",
                    fieldValue2: "Node-51",
                    username: false,
                },
                width: 204,
                height: 175,
                selected: true,
                dragging: false,
                positionAbsolute: {
                    x: 2250.6371897327303,
                    y: 513.856822402856,
                },
            },
        ],
        edges: [
            {
                source: "NodeNode-38",
                sourceHandle: "NodeNode-38-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-38NodeNode-38-right-handle-0-NodeNode-44NodeNode-44-left-handle-2",
            },
            {
                source: "NodeNode-37",
                sourceHandle: "NodeNode-37-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-37NodeNode-37-right-handle-0-NodeNode-44NodeNode-44-left-handle-3",
            },
            {
                source: "NodeNode-40",
                sourceHandle: "NodeNode-40-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-40NodeNode-40-right-handle-0-NodeNode-44NodeNode-44-left-handle-5",
            },
            {
                source: "NodeNode-39",
                sourceHandle: "NodeNode-39-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-39NodeNode-39-right-handle-0-NodeNode-44NodeNode-44-left-handle-4",
            },
            {
                source: "NodeNode-41",
                sourceHandle: "NodeNode-41-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-41NodeNode-41-right-handle-0-NodeNode-45NodeNode-45-left-handle-3",
            },
            {
                source: "NodeNode-42",
                sourceHandle: "NodeNode-42-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-42NodeNode-42-right-handle-0-NodeNode-45NodeNode-45-left-handle-5",
            },
            {
                source: "NodeNode-43",
                sourceHandle: "NodeNode-43-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-43NodeNode-43-right-handle-0-NodeNode-45NodeNode-45-left-handle-4",
            },
            {
                source: "NodeNode-44",
                sourceHandle: "NodeNode-44-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-44NodeNode-44-right-handle-0-NodeNode-45NodeNode-45-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-6",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-45NodeNode-45-left-handle-6",
            },
            {
                source: "NodeNode-45",
                sourceHandle: "NodeNode-45-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-45NodeNode-45-right-handle-0-NodeNode-47NodeNode-47-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-47NodeNode-47-left-handle-3",
            },
            {
                source: "NodeNode-47",
                sourceHandle: "NodeNode-47-right-handle-0",
                target: "NodeNode-51",
                targetHandle: "NodeNode-51-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-47NodeNode-47-right-handle-0-NodeNode-51NodeNode-51-left-handle-0",
            },
        ],
    },
    {
        templateName: "Discord Tech Support Bot",
        displayImage: discord,
        templateId: "template-1111111",
        tags: ["Discord", "Gen AI", "Assistant"],
        nodes: [
            {
                id: "NodeNode-1",
                type: "NodeNode",
                position: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Input"],
                    sources: [],
                    fieldValue1: "Node-1",
                    fieldValue2: "Node-1",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                dragging: false,
            },
            {
                id: "NodeNode-3",
                type: "NodeNode",
                position: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                data: {
                    name: "Database (RAG)",
                    desc: "Fetches only the relevant text chunks from the database",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database.png",
                    category: "Knowledge Base",
                    sources: ["query"],
                    targets: ["results"],
                    fieldValue1: "NodeNode-3",
                    fieldValue2: "Node-3",
                    constantValueList: [
                        {
                            name: "Max Chunk Size",
                            value: 1000,
                            placeholder: "Exactly what it says",
                        },
                        {
                            name: "Chunk Overlap",
                            value: 200,
                            placeholder: "Overlap between chunks",
                        },
                        {
                            name: "Number of Chunks",
                            value: 5,
                            placeholder: "Total number of chunks",
                        },
                    ],
                },
                width: 204,
                height: 340,
                selected: false,
                positionAbsolute: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                data: {
                    name: "Text",
                    isInput: true,
                    isType: false,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/text.webp",
                    category: "General",
                    targets: ["Output"],
                    fieldValue1:
                        "You are a helpful and knowledgeable AI assistant specialized in providing technical support for our products. Your primary goal is to assist users with their technical issues by leveraging the provided product information.\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers and troubleshooting steps.\n* **Prioritize using the provided product information:** Always attempt to answer the user's query using the information explicitly given in the product documentation.\n* **Acknowledge information limitations:** If the provided product information does not contain the answer to the user's query, clearly state that you cannot find the specific information within the given documentation. Avoid making assumptions or providing general troubleshooting steps not supported by the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate (e.g., suggesting they contact human support if the issue is beyond the scope of the provided documentation).\n* **Identify the user's problem:** Try to understand the core issue the user is facing.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more details about their problem, including specific error messages, steps they have already taken, and the product version they are using.\n* **Do not ask for personal information:** You are here to provide technical support based on the provided product information.\n* **Format your responses clearly:** Use bullet points, numbered lists, code blocks, or bold text to make instructions and information easy to follow.\n* **When referencing product information, be specific:** If you are referring to a particular section or specification in the product info, mention it (e.g., \"According to the 'Troubleshooting' section of the manual...\").\n* **Stay within the scope of technical support for our products:** Do not engage in conversations about unrelated topics or provide support for third-party products.",
                    fieldValue2: "Node-8",
                    sources: [],
                },
                width: 204,
                height: 1118,
                selected: false,
                positionAbsolute: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                dragging: false,
            },
            {
                id: "NodeNode-76",
                type: "NodeNode",
                position: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Previous chat"],
                    sources: [],
                    fieldValue1: "Previous chat",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                dragging: false,
            },
            {
                id: "NodeNode-77",
                type: "NodeNode",
                position: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 5,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query", "data", "chat"],
                    targets: ["response"],
                    fieldValue1:
                        "User query: {{query}}\n\nProduct info: {{data}}\n\nPrevious chat: {{chat}}",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 235,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
            },
            {
                id: "NodeNode-79",
                type: "NodeNode",
                position: {
                    x: 1323.4022800548028,
                    y: 3.6948733774114544,
                },
                data: {
                    name: "Discord",
                    desc: "Our discord bot will send messages to your requested channel",
                    isInput: true,
                    isType: false,
                    bgcolor: "#5865F2",
                    rightHandles: 0,
                    leftHandles: 1,
                    fieldValue1: "",
                    sources: ["Message Content"],
                    img: "/discord.png",
                    category: "Integrations",
                    fieldValue2: "✨",
                    username: false,
                },
                width: 204,
                height: 162,
                selected: false,
                positionAbsolute: {
                    x: 1323.4022800548028,
                    y: 3.6948733774114544,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-3",
                targetHandle: "NodeNode-3-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0",
            },
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-77NodeNode-77-left-handle-0",
            },
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-77NodeNode-77-left-handle-2",
            },
            {
                source: "NodeNode-76",
                sourceHandle: "NodeNode-76-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-76NodeNode-76-right-handle-0-NodeNode-77NodeNode-77-left-handle-4",
            },
            {
                source: "NodeNode-3",
                sourceHandle: "NodeNode-3-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-77NodeNode-77-left-handle-3",
            },
            {
                source: "NodeNode-77",
                sourceHandle: "NodeNode-77-right-handle-0",
                target: "NodeNode-79",
                targetHandle: "NodeNode-79-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-77NodeNode-77-right-handle-0-NodeNode-79NodeNode-79-left-handle-0",
            },
        ],
    },
    {
        templateName: "Chat with a CSV file",
        displayImage: sheet,
        templateId: "template-9001",
        tags: ["Assistant"],
        nodes: [
            {
                id: "NodeNode-55",
                type: "NodeNode",
                position: {
                    x: 146.0452545331706,
                    y: 372.476731896427,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Input"],
                    sources: [],
                    fieldValue1: "Node-55",
                    fieldValue2: "Node-55",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 146.0452545331706,
                    y: 372.476731896427,
                },
                dragging: false,
            },
            {
                id: "NodeNode-56",
                type: "NodeNode",
                position: {
                    x: 145.06872286785276,
                    y: 74.49054447435816,
                },
                data: {
                    name: "GSheets",
                    desc: "Reads data from a Google Sheet based on the provided identifier (title, link, or sheet ID).",
                    Nodestate: ["Read Sheet"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#0F9D58",
                    rightHandles: 1,
                    leftHandles: 0,
                    targets: ["Sheet Data"],
                    fieldValue1: "Node-56",
                    img: "/sheets.png",
                    category: "Integrations",
                    fieldValue2: "Node-56",
                    username: false,
                },
                width: 204,
                height: 239,
                selected: false,
                positionAbsolute: {
                    x: 145.06872286785276,
                    y: 74.49054447435816,
                },
                dragging: false,
            },
            {
                id: "NodeNode-57",
                type: "NodeNode",
                position: {
                    x: 521.7112024807711,
                    y: 60.96746621905211,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "content", "query"],
                    targets: ["response"],
                    fieldValue1:
                        "Here is the content of the spreadsheet: {{content}}\n\nNow, answer the following question: {{query}}",
                    fieldValue2:
                        "You are a helpful and knowledgeable AI assistant designed to understand and answer questions based on the content of a provided CSV file. You have access to the data within the CSV file and can perform various operations such as filtering, sorting, aggregation (sum, average, count, min, max), and searching.\n\nYour primary goal is to accurately answer user questions by analyzing the data in the CSV file. When answering, be concise and directly address the user's query. If the question requires data manipulation, clearly state the steps you took or the logic you applied. If a question cannot be answered based on the data in the CSV file, politely state that.\n\nYou can assume the first row of the CSV file contains headers that describe each column. Pay close attention to the data types within each column when performing operations.\n\nWhen presenting data, format it clearly and understandably, potentially using tables or bullet points if appropriate. Avoid making assumptions or bringing in outside information unless explicitly asked to do so in relation to the CSV data.",
                },
                width: 204,
                height: 763,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 521.7112024807711,
                    y: 60.96746621905211,
                },
            },
            {
                id: "NodeNode-58",
                type: "NodeNode",
                position: {
                    x: 882.9310257984683,
                    y: 229.51480289781153,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-58",
                    fieldValue2: "Node-58",
                },
                width: 204,
                height: 108,
                selected: true,
                positionAbsolute: {
                    x: 882.9310257984683,
                    y: 229.51480289781153,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-56",
                sourceHandle: "NodeNode-56-right-handle-0",
                target: "NodeNode-57",
                targetHandle: "NodeNode-57-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-56NodeNode-56-right-handle-0-NodeNode-57NodeNode-57-left-handle-2",
            },
            {
                source: "NodeNode-55",
                sourceHandle: "NodeNode-55-right-handle-0",
                target: "NodeNode-57",
                targetHandle: "NodeNode-57-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-55NodeNode-55-right-handle-0-NodeNode-57NodeNode-57-left-handle-3",
            },
            {
                source: "NodeNode-57",
                sourceHandle: "NodeNode-57-right-handle-0",
                target: "NodeNode-58",
                targetHandle: "NodeNode-58-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-57NodeNode-57-right-handle-0-NodeNode-58NodeNode-58-left-handle-0",
            },
        ],
    },

    
    {
        templateName: "Personalized Blog Creator",
        displayImage: star,
        templateId: "template-700",
        tags: ["Gen AI"],
        nodes: [
            {
                id: "NodeNode-37",
                type: "NodeNode",
                position: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Word limit"],
                    sources: [],
                    fieldValue1: "Word limit",
                    fieldValue2: "Node-37",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.8306093524737,
                    y: 503.9467198824635,
                },
                dragging: false,
            },
            {
                id: "NodeNode-38",
                type: "NodeNode",
                position: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Topic and key points"],
                    sources: [],
                    fieldValue1: "Topic and key points",
                    fieldValue2: "Node-38",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 492.83060935247363,
                    y: 360.84571287624203,
                },
                dragging: false,
            },
            {
                id: "NodeNode-39",
                type: "NodeNode",
                position: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Target Audience"],
                    sources: [],
                    fieldValue1: "Target Audience",
                    fieldValue2: "Node-39",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 496.5964253263216,
                    y: 652.0688148538153,
                },
                dragging: false,
            },
            {
                id: "NodeNode-40",
                type: "NodeNode",
                position: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content goal"],
                    sources: [],
                    fieldValue1: "Content goal",
                    fieldValue2: "Node-40",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 494.0858813437564,
                    y: 802.7014538077324,
                },
                dragging: false,
            },
            {
                id: "NodeNode-41",
                type: "NodeNode",
                position: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Keywords (SEO)"],
                    sources: [],
                    fieldValue1: "Keywords (SEO)",
                    fieldValue2: "Node-41",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1186.9447027385147,
                    y: 358.489122273459,
                },
                dragging: false,
            },
            {
                id: "NodeNode-42",
                type: "NodeNode",
                position: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Additional info"],
                    sources: [],
                    fieldValue1: "Additional info",
                    fieldValue2: "Node-42",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1192.1710618766883,
                    y: 679.7361164552947,
                },
                dragging: false,
            },
            {
                id: "NodeNode-43",
                type: "NodeNode",
                position: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                data: {
                    name: "Database Loader",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 0,
                    bgcolor: "#f57e2a",
                    img: "/database.webp",
                    category: "Knowledge Base",
                    sources: [],
                    targets: ["Database"],
                    fieldValue1: "NodeNode-43",
                    fieldValue2: "Node-43",
                },
                width: 204,
                height: 142,
                selected: false,
                positionAbsolute: {
                    x: 1188.2512925230583,
                    y: 503.14334274341354,
                },
                dragging: false,
            },
            {
                id: "NodeNode-44",
                type: "NodeNode",
                position: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 6,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "topic",
                        "limit",
                        "audience",
                        "goal",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Topic: {{topic}}\nWord limit: {{limit}}\nTarget audience: {{audience}}\nContent goal: {{goal}}\n\nGenerate a comprehensive blog post based on these parameters, ensuring a clear and engaging writing style suitable for the target audience.",
                    fieldValue2:
                        "You are a highly skilled blog writer focused on generating well-structured, informative, and engaging initial drafts based on provided core content parameters. Your goal is to create a solid foundation that can be further refined in subsequent steps. Think step-by-step to ensure all provided information is incorporated logically and effectively.\n\nSteps:\n1.  Understand the core requirements: Carefully analyze the provided topic, word limit, key points, target audience, and content goal.\n2.  Structure the blog post: Create a logical flow with a compelling introduction, well-developed body paragraphs addressing the key points, and a clear conclusion that aligns with the content goal. Consider using headings and subheadings for better readability.\n3.  Elaborate on key points: Expand on each key point with sufficient detail and explanation, keeping the target audience's knowledge level in mind.\n4.  Maintain relevance: Ensure all content directly relates to the specified topic and contributes to achieving the content goal.\n5.  Adhere to the word limit: Keep the generated content within the specified word limit, prioritizing quality and comprehensiveness.",
                },
                width: 204,
                height: 179,
                selected: false,
                positionAbsolute: {
                    x: 864.6477077384395,
                    y: 518.5058653554186,
                },
                dragging: false,
            },
            {
                id: "NodeNode-45",
                type: "NodeNode",
                position: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 7,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "blog",
                        "keywords",
                        "previous_blogs",
                        "info",
                        "tone",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft:\n\n{{blog}}\n\nKeywords: {{keywords}}\n\nPrevious Blogs: {{previous_blogs}}\n\nAdditional info: {{info}}\n\nContent tone: {{tone}}\n\nRefine the provided blog draft to incorporate these elements, ensuring a cohesive and engaging final product that aligns with our brand and targets the desired audience effectively.",
                    fieldValue2:
                        "You are an expert blog editor focused on refining existing blog drafts to align with specific brand guidelines, desired tone, personal writing style, and target keywords. Your goal is to inject personality and optimize the content for search engines and brand consistency. Think step-by-step to ensure all stylistic and brand requirements are met.\n\nSteps:\n1.  Analyze the existing draft: Carefully review the blog post generated in the previous step.\n2.  Incorporate keywords: Strategically integrate the provided keywords naturally within the text, including headings, subheadings, and body paragraphs, without compromising readability.\n3.  Align with previous blogs (if provided): Analyze the style, tone, and formatting of the provided previous blog examples and adjust the current draft to maintain consistency.\n4.  Apply constraints: Ensure the draft adheres to any specific constraints provided (e.g., avoiding certain phrases, mentioning specific products, etc.).\n5.  Adjust tone: Modify the language and sentence structure to match the specified tone (e.g., formal, informal, humorous, authoritative).\n6.  Infuse personal style (if described): Incorporate elements of the described personal writing style, such as specific vocabulary, sentence patterns, or rhetorical devices.",
                },
                width: 204,
                height: 179,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 1547.7169142820317,
                    y: 517.8608375669344,
                },
            },
            {
                id: "NodeNode-46",
                type: "NodeNode",
                position: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Content Tone"],
                    sources: [],
                    fieldValue1: "Content Tone",
                    fieldValue2: "Node-46",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1195.6289710909718,
                    y: 832.2298603093649,
                },
                dragging: false,
            },
            {
                id: "NodeNode-47",
                type: "NodeNode",
                position: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "blog", "context"],
                    targets: ["response"],
                    fieldValue1:
                        "Existing Blog Draft: {{blog}}\n\nAdditional Information: {{context}}\n\nFocus on ensuring the accuracy of all claims, enhancing reader engagement, and maximizing the likelihood of readers staying engaged with the content until the conclusion. Provide specific suggestions for improvement where necessary.",
                    fieldValue2:
                        "You are a meticulous blog editor focused on enhancing the accuracy, engagement, and retention of existing blog content. Your goal is to ensure the blog is informative, trustworthy, and keeps readers interested until the end. Think step-by-step to ensure the blog is of the highest quality and achieves its intended impact.\n\nSteps:\n1.  Fact-check claims: Carefully review all factual statements, statistics, and claims made in the blog post. If necessary, use the provided additional information or your own knowledge to verify accuracy. Highlight any potential inaccuracies or areas needing further investigation.\n2.  Incorporate additional information (if provided): Seamlessly integrate any provided supplementary information to enrich the content and provide further context or evidence.\n3.  Enhance engagement: Identify areas where the blog could be more engaging. Consider suggesting improvements such as adding more relatable examples, asking thought-provoking questions, or incorporating storytelling elements.\n4.  Improve readability and flow: Ensure the blog has a smooth and logical flow. Suggest improvements to sentence structure, paragraph transitions, and overall organization to enhance readability.\n5.  Focus on attention and retention: Evaluate whether the blog effectively captures and maintains the reader's attention. Suggest strategies to increase reader retention, such as breaking up large blocks of text, using visuals (even if just as suggestions), and ensuring a compelling narrative or value proposition throughout.\n6.  Do not alter the tonality or writing style of the blog.",
                },
                width: 204,
                height: 1147,
                selected: false,
                positionAbsolute: {
                    x: 1884.9787462641632,
                    y: 509.9016006703457,
                },
                dragging: false,
            },
            {
                id: "NodeNode-49",
                type: "NodeNode",
                position: {
                    x: 2288.5894407053493,
                    y: 534.2396983169492,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-49",
                    fieldValue2: "Node-49",
                },
                width: 204,
                height: 108,
                selected: true,
                positionAbsolute: {
                    x: 2288.5894407053493,
                    y: 534.2396983169492,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-38",
                sourceHandle: "NodeNode-38-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-38NodeNode-38-right-handle-0-NodeNode-44NodeNode-44-left-handle-2",
            },
            {
                source: "NodeNode-37",
                sourceHandle: "NodeNode-37-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-37NodeNode-37-right-handle-0-NodeNode-44NodeNode-44-left-handle-3",
            },
            {
                source: "NodeNode-40",
                sourceHandle: "NodeNode-40-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-40NodeNode-40-right-handle-0-NodeNode-44NodeNode-44-left-handle-5",
            },
            {
                source: "NodeNode-39",
                sourceHandle: "NodeNode-39-right-handle-0",
                target: "NodeNode-44",
                targetHandle: "NodeNode-44-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-39NodeNode-39-right-handle-0-NodeNode-44NodeNode-44-left-handle-4",
            },
            {
                source: "NodeNode-41",
                sourceHandle: "NodeNode-41-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-41NodeNode-41-right-handle-0-NodeNode-45NodeNode-45-left-handle-3",
            },
            {
                source: "NodeNode-42",
                sourceHandle: "NodeNode-42-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-42NodeNode-42-right-handle-0-NodeNode-45NodeNode-45-left-handle-5",
            },
            {
                source: "NodeNode-43",
                sourceHandle: "NodeNode-43-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-43NodeNode-43-right-handle-0-NodeNode-45NodeNode-45-left-handle-4",
            },
            {
                source: "NodeNode-44",
                sourceHandle: "NodeNode-44-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-44NodeNode-44-right-handle-0-NodeNode-45NodeNode-45-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-45",
                targetHandle: "NodeNode-45-left-handle-6",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-45NodeNode-45-left-handle-6",
            },
            {
                source: "NodeNode-45",
                sourceHandle: "NodeNode-45-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-45NodeNode-45-right-handle-0-NodeNode-47NodeNode-47-left-handle-2",
            },
            {
                source: "NodeNode-46",
                sourceHandle: "NodeNode-46-right-handle-0",
                target: "NodeNode-47",
                targetHandle: "NodeNode-47-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-46NodeNode-46-right-handle-0-NodeNode-47NodeNode-47-left-handle-3",
            },
            {
                source: "NodeNode-47",
                sourceHandle: "NodeNode-47-right-handle-0",
                target: "NodeNode-49",
                targetHandle: "NodeNode-49-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-47NodeNode-47-right-handle-0-NodeNode-49NodeNode-49-left-handle-0",
            },
        ],
    },
    
    {
        "templateName": "Automate Sales Report Mailing",
        "displayImage": gmail,
        "templateId": "template-30",
        "tags": [
          "Gmail", "Assistant"
        ],
        "nodes": [
          {
            "id": "NodeNode-1",
            "type": "NodeNode",
            "position": {
              "x": 119.38179978206608,
              "y": 112.19999694824219
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
                "Input"
              ],
              "sources": [],
              "fieldValue1": "Node-1",
              "fieldValue2": "Node-1"
            },
            "width": 204,
            "height": 110,
            "selected": false,
            "positionAbsolute": {
              "x": 119.38179978206608,
              "y": 112.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-3",
            "type": "NodeNode",
            "position": {
              "x": 410.86746503859285,
              "y": 218.87851071856193
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
            "height": 345,
            "selected": false,
            "positionAbsolute": {
              "x": 410.86746503859285,
              "y": 218.87851071856193
            },
            "dragging": false
          },
          {
            "id": "NodeNode-8",
            "type": "NodeNode",
            "position": {
              "x": 338.7571340182316,
              "y": -83.5127903394116
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
              "fieldValue1": "You are a helpful and knowledgeable AI assistant specialized in providing sales support. Your primary goal is to assist users with their sales-related queries by leveraging the provided sales data. **Crucially, your final output MUST be a valid JSON object conforming to the specified schema.**\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers.\n* **Prioritize using the provided sales data:** Always attempt to answer the user's query using the information explicitly given in the sales data.\n* **Acknowledge data limitations:** If the provided sales data does not contain the information needed to answer the query, clearly state that you cannot find the answer within the given data. Avoid making assumptions or providing information from outside the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate.\n* **Identify the user's intent:** Try to understand the underlying need behind the user's query.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more information.\n* **Do not ask for personal information:** You are here to provide sales support based on the provided data.\n* **Format your responses clearly:** Use bullet points or numbered lists when presenting multiple pieces of information.\n* **When referencing data, be specific:** If you are pulling information from a specific field in the sales data, mention it (e.g., \"According to the 'Product Name' field...\").\n* **Stay within the scope of sales support:** Do not engage in conversations unrelated to sales inquiries.\n\nstrictly output the result as a JSON object with the following keys:\n* `\"subject\"`: A concise title or subject for the email (string).\n* `\"text\"`: A detailed analysis of the data.",
              "fieldValue2": "Node-8",
              "sources": []
            },
            "width": 204,
            "height": 87,
            "selected": false,
            "positionAbsolute": {
              "x": 338.7571340182316,
              "y": -83.5127903394116
            },
            "dragging": false
          },
          {
            "id": "NodeNode-9",
            "type": "NodeNode",
            "position": {
              "x": 743.2726905712411,
              "y": -34.98500013905311
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "query",
                "data"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "User query: {{query}}\n\nSales data: {{data}}",
              "fieldValue2": "Node-9"
            },
            "width": 204,
            "height": 182,
            "selected": false,
            "positionAbsolute": {
              "x": 743.2726905712411,
              "y": -34.98500013905311
            },
            "dragging": false
          },
          {
            "id": "NodeNode-128",
            "type": "NodeNode",
            "position": {
              "x": 1117.9448548940645,
              "y": 158.61740495741304
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
                "adressess"
              ],
              "targets": [],
              "fieldValue1": {
                "1": "{{adressess}}",
                "isDraft": true
              },
              "img": "/gmail.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": false
            },
            "width": 204,
            "height": 202,
            "selected": false,
            "positionAbsolute": {
              "x": 1117.9448548940645,
              "y": 158.61740495741304
            },
            "dragging": false
          },
          {
            "id": "NodeNode-129",
            "type": "NodeNode",
            "position": {
              "x": 765.5570625512205,
              "y": 405.9798160529782
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
                "Input"
              ],
              "sources": [],
              "fieldValue1": "",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 110,
            "selected": true,
            "positionAbsolute": {
              "x": 765.5570625512205,
              "y": 405.9798160529782
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
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
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0"
          },
          {
            "source": "NodeNode-8",
            "sourceHandle": "NodeNode-8-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-9NodeNode-9-left-handle-0"
          },
          {
            "source": "NodeNode-3",
            "sourceHandle": "NodeNode-3-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-9NodeNode-9-left-handle-3"
          },
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-9NodeNode-9-left-handle-2"
          },
          {
            "source": "NodeNode-129",
            "sourceHandle": "NodeNode-129-right-handle-0",
            "target": "NodeNode-128",
            "targetHandle": "NodeNode-128-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-129NodeNode-129-right-handle-0-NodeNode-128NodeNode-128-left-handle-1"
          },
          {
            "source": "NodeNode-9",
            "sourceHandle": "NodeNode-9-right-handle-0",
            "target": "NodeNode-128",
            "targetHandle": "NodeNode-128-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-9NodeNode-9-right-handle-0-NodeNode-128NodeNode-128-left-handle-0"
          }
        ]
      },

    
    {
        templateName: "Tech Support Bot for Gmail",
        displayImage: gmail,
        templateId: "template-1000101",
        tags: ["Assistant", "Gmail"],
        nodes: [
            {
                id: "NodeNode-1",
                type: "NodeNode",
                position: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Input"],
                    sources: [],
                    fieldValue1: "Node-1",
                    fieldValue2: "Node-1",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                dragging: false,
            },
            {
                id: "NodeNode-3",
                type: "NodeNode",
                position: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                data: {
                    name: "Database (RAG)",
                    desc: "Fetches only the relevant text chunks from the database",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database.png",
                    category: "Knowledge Base",
                    sources: ["query"],
                    targets: ["results"],
                    fieldValue1: "NodeNode-3",
                    fieldValue2: "Node-3",
                    constantValueList: [
                        {
                            name: "Max Chunk Size",
                            value: 1000,
                            placeholder: "Exactly what it says",
                        },
                        {
                            name: "Chunk Overlap",
                            value: 200,
                            placeholder: "Overlap between chunks",
                        },
                        {
                            name: "Number of Chunks",
                            value: 5,
                            placeholder: "Total number of chunks",
                        },
                    ],
                },
                width: 204,
                height: 340,
                selected: false,
                positionAbsolute: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                data: {
                    name: "Text",
                    isInput: true,
                    isType: false,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/text.webp",
                    category: "General",
                    targets: ["Output"],
                    fieldValue1:
                        "You are a helpful and knowledgeable AI assistant specialized in providing technical support for our products. Your primary goal is to assist users with their technical issues by leveraging the provided product information.\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers and troubleshooting steps.\n* **Prioritize using the provided product information:** Always attempt to answer the user's query using the information explicitly given in the product documentation.\n* **Acknowledge information limitations:** If the provided product information does not contain the answer to the user's query, clearly state that you cannot find the specific information within the given documentation. Avoid making assumptions or providing general troubleshooting steps not supported by the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate (e.g., suggesting they contact human support if the issue is beyond the scope of the provided documentation).\n* **Identify the user's problem:** Try to understand the core issue the user is facing.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more details about their problem, including specific error messages, steps they have already taken, and the product version they are using.\n* **Do not ask for personal information:** You are here to provide technical support based on the provided product information.\n* **Format your responses clearly:** Use bullet points, numbered lists, code blocks, or bold text to make instructions and information easy to follow.\n* **When referencing product information, be specific:** If you are referring to a particular section or specification in the product info, mention it (e.g., \"According to the 'Troubleshooting' section of the manual...\").\n* **Stay within the scope of technical support for our products:** Do not engage in conversations about unrelated topics or provide support for third-party products.",
                    fieldValue2: "Node-8",
                    sources: [],
                },
                width: 204,
                height: 1118,
                selected: false,
                positionAbsolute: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                dragging: false,
            },
            {
                id: "NodeNode-76",
                type: "NodeNode",
                position: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Previous chat"],
                    sources: [],
                    fieldValue1: "Previous chat",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                dragging: false,
            },
            {
                id: "NodeNode-77",
                type: "NodeNode",
                position: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 5,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query", "data", "chat"],
                    targets: ["response"],
                    fieldValue1:
                        "User query: {{query}}\n\nProduct info: {{data}}\n\nPrevious chat: {{chat}}",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 235,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
            },
            {
                id: "NodeNode-81",
                type: "NodeNode",
                position: {
                    x: 1308.0040182138941,
                    y: -14.302195681775203,
                },
                data: {
                    name: "Gmail",
                    desc: "Read emails, create drafts or just send one!",
                    Nodestate: ["Create draft", "Send email", "Read emails"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#ea4335",
                    rightHandles: 0,
                    leftHandles: 1,
                    sources: ["Message"],
                    targets: [],
                    fieldValue1: {
                        isDraft: true,
                    },
                    img: "/gmail.png",
                    category: "Integrations",
                    fieldValue2: "✨",
                    username: false,
                },
                width: 204,
                height: 200,
                selected: true,
                positionAbsolute: {
                    x: 1308.0040182138941,
                    y: -14.302195681775203,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-3",
                targetHandle: "NodeNode-3-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0",
            },
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-77NodeNode-77-left-handle-0",
            },
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-77NodeNode-77-left-handle-2",
            },
            {
                source: "NodeNode-76",
                sourceHandle: "NodeNode-76-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-76NodeNode-76-right-handle-0-NodeNode-77NodeNode-77-left-handle-4",
            },
            {
                source: "NodeNode-3",
                sourceHandle: "NodeNode-3-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-77NodeNode-77-left-handle-3",
            },
            {
                source: "NodeNode-77",
                sourceHandle: "NodeNode-77-right-handle-0",
                target: "NodeNode-81",
                targetHandle: "NodeNode-81-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-77NodeNode-77-right-handle-0-NodeNode-81NodeNode-81-left-handle-0",
            },
        ],
    },
    {
        "templateName": "Contextual-Email Bot",
        "displayImage": gmail,
        "templateId": "template-34",
        "tags": [
          "Gmail"
        ],
        "nodes": [
          {
            "id": "NodeNode-1",
            "type": "NodeNode",
            "position": {
              "x": 119.38179978206608,
              "y": 112.19999694824219
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
              "x": 119.38179978206608,
              "y": 112.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-3",
            "type": "NodeNode",
            "position": {
              "x": 696.9234376463135,
              "y": 240.98911729693646
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
              "x": 696.9234376463135,
              "y": 240.98911729693646
            },
            "dragging": false
          },
          {
            "id": "NodeNode-8",
            "type": "NodeNode",
            "position": {
              "x": 308.4569736356302,
              "y": -74.58418025268598
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
              "fieldValue1": "You are a helpful and knowledgeable AI assistant specialized in providing sales support. Your primary goal is to assist users with their sales-related queries by leveraging the provided sales data. **Crucially, your final output MUST be a valid JSON object conforming to the specified schema.**\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers.\n* **Prioritize using the provided sales data:** Always attempt to answer the user's query using the information explicitly given in the sales data.\n* **Acknowledge data limitations:** If the provided sales data does not contain the information needed to answer the query, clearly state that you cannot find the answer within the given data. Avoid making assumptions or providing information from outside the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate.\n* **Identify the user's intent:** Try to understand the underlying need behind the user's query.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more information.\n* **Do not ask for personal information:** You are here to provide sales support based on the provided data.\n* **Format your responses clearly:** Use bullet points or numbered lists when presenting multiple pieces of information.\n* **When referencing data, be specific:** If you are pulling information from a specific field in the sales data, mention it (e.g., \"According to the 'Product Name' field...\").\n* **Stay within the scope of sales support:** Do not engage in conversations unrelated to sales inquiries.\n\nstrictly output the result as a JSON object with the following keys:\n* `\"subject\"`: A concise title or subject for the email (string).\n* `\"text\"`: A detailed analysis of the data.",
              "fieldValue2": "Node-8",
              "sources": []
            },
            "width": 204,
            "height": 86,
            "selected": true,
            "positionAbsolute": {
              "x": 308.4569736356302,
              "y": -74.58418025268598
            },
            "dragging": false
          },
          {
            "id": "NodeNode-9",
            "type": "NodeNode",
            "position": {
              "x": 967.1425821772832,
              "y": -76.44238747350536
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "query",
                "data"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "User query: {{query}}\n\nSales data: {{data}}",
              "fieldValue2": "Node-9"
            },
            "width": 204,
            "height": 179,
            "selected": false,
            "positionAbsolute": {
              "x": 967.1425821772832,
              "y": -76.44238747350536
            },
            "dragging": false
          },
          {
            "id": "NodeNode-108",
            "type": "NodeNode",
            "position": {
              "x": 1336.011502476024,
              "y": 73.10363958943606
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
                "addresses"
              ],
              "targets": [],
              "fieldValue1": {
                "1": "{{addresses}}",
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
              "x": 1336.011502476024,
              "y": 73.10363958943606
            },
            "dragging": false
          },
          {
            "id": "NodeNode-109",
            "type": "NodeNode",
            "position": {
              "x": 122.0115024760239,
              "y": 266.10363958943606
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
                "Addresses"
              ],
              "sources": [],
              "fieldValue1": "Addresses",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 122.0115024760239,
              "y": 266.10363958943606
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
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
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0"
          },
          {
            "source": "NodeNode-8",
            "sourceHandle": "NodeNode-8-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-9NodeNode-9-left-handle-0"
          },
          {
            "source": "NodeNode-3",
            "sourceHandle": "NodeNode-3-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-9NodeNode-9-left-handle-3"
          },
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
            "target": "NodeNode-9",
            "targetHandle": "NodeNode-9-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-9NodeNode-9-left-handle-2"
          },
          {
            "source": "NodeNode-9",
            "sourceHandle": "NodeNode-9-right-handle-0",
            "target": "NodeNode-108",
            "targetHandle": "NodeNode-108-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-9NodeNode-9-right-handle-0-NodeNode-108NodeNode-108-left-handle-0"
          },
          {
            "source": "NodeNode-109",
            "sourceHandle": "NodeNode-109-right-handle-0",
            "target": "NodeNode-108",
            "targetHandle": "NodeNode-108-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-109NodeNode-109-right-handle-0-NodeNode-108NodeNode-108-left-handle-1"
          }
        ]
    },
    
    {
        templateName: "Chat with Knowledge Base",
        displayImage: bot,
        templateId: "template-11114",
        tags: ["Assistant"],
        nodes: [
            {
                id: "NodeNode-31",
                type: "NodeNode",
                position: {
                    x: 880.8524234275453,
                    y: 16.77692796316046,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query", "context"],
                    targets: ["response"],
                    fieldValue1:
                        "User query: {{query}}\n\nContext: {{context}}",
                    fieldValue2:
                        "You are an intelligent AI assistant designed to interact with users by understanding their natural language queries and relating them to structured data. Your primary function is to provide informative and accurate responses based on the provided context, which represents relevant information extracted from a database.\n\nFollow these guidelines:\n\n* **Focus on the provided context:** Your responses MUST be based solely on the information provided in the \"Context\" section of the main prompt. Do not use external knowledge or make assumptions beyond what is explicitly stated in the context.\n* **Answer the user's query directly and concisely:** Provide clear and to-the-point answers.\n* **Synthesize information from the context:** If the answer requires combining information from multiple parts of the context, do so in a coherent and logical manner.\n* **Acknowledge limitations:** If the provided context does not contain the information needed to fully answer the user's query, state that the answer cannot be found within the given data. Avoid speculating or providing incomplete answers.\n* **Maintain a helpful and informative tone:** Address the user politely and professionally.\n* **If the query is ambiguous or requires clarification based on the context, you can ask a clarifying question directly related to the provided data.** For example, \"Based on the provided data, are you interested in the average price for 'Product A' in 'Region X' or 'Region Y'?\"\n* **Do not ask for personal information or engage in conversations unrelated to the data and the user's query.**\n* **Format your responses clearly:** Use bullet points or numbered lists when presenting multiple pieces of information extracted from the context.\n* **When referencing specific data points, you can mention the field or entity you are referring to (e.g., \"The average price is [price] based on the 'AveragePrice' field.\").**",
                },
                width: 204,
                height: 1159,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 880.8524234275453,
                    y: 16.77692796316046,
                },
            },
            {
                id: "NodeNode-33",
                type: "NodeNode",
                position: {
                    x: 551.9182194475297,
                    y: 256.2134425173292,
                },
                data: {
                    name: "Database (RAG)",
                    desc: "Fetches only the relevant text chunks from the database",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database.png",
                    category: "Knowledge Base",
                    sources: ["query"],
                    targets: ["results"],
                    fieldValue1: "NodeNode-33",
                    fieldValue2: "Node-33",
                    constantValueList: [
                        {
                            name: "Max Chunk Size",
                            value: 1000,
                            placeholder: "Exactly what it says",
                        },
                        {
                            name: "Chunk Overlap",
                            value: 200,
                            placeholder: "Overlap between chunks",
                        },
                        {
                            name: "Number of Chunks",
                            value: 5,
                            placeholder: "Total number of chunks",
                        },
                    ],
                },
                width: 204,
                height: 301,
                selected: false,
                positionAbsolute: {
                    x: 551.9182194475297,
                    y: 256.2134425173292,
                },
                dragging: false,
            },
            {
                id: "NodeNode-34",
                type: "NodeNode",
                position: {
                    x: 219.49753747799159,
                    y: 170.02877762460653,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Query"],
                    sources: [],
                    fieldValue1: "Query",
                    fieldValue2: "Node-34",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 219.49753747799159,
                    y: 170.02877762460653,
                },
                dragging: false,
            },
            {
                id: "NodeNode-35",
                type: "NodeNode",
                position: {
                    x: 1220.2126750116809,
                    y: 245.2183058357321,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-35",
                    fieldValue2: "Node-35",
                },
                width: 204,
                height: 108,
                selected: false,
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-34",
                sourceHandle: "NodeNode-34-right-handle-0",
                target: "NodeNode-33",
                targetHandle: "NodeNode-33-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-34NodeNode-34-right-handle-0-NodeNode-33NodeNode-33-left-handle-0",
            },
            {
                source: "NodeNode-31",
                sourceHandle: "NodeNode-31-right-handle-0",
                target: "NodeNode-35",
                targetHandle: "NodeNode-35-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-31NodeNode-31-right-handle-0-NodeNode-35NodeNode-35-left-handle-0",
            },
            {
                source: "NodeNode-33",
                sourceHandle: "NodeNode-33-right-handle-0",
                target: "NodeNode-31",
                targetHandle: "NodeNode-31-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-33NodeNode-33-right-handle-0-NodeNode-31NodeNode-31-left-handle-3",
            },
            {
                source: "NodeNode-34",
                sourceHandle: "NodeNode-34-right-handle-0",
                target: "NodeNode-31",
                targetHandle: "NodeNode-31-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-34NodeNode-34-right-handle-0-NodeNode-31NodeNode-31-left-handle-2",
            },
        ],
    },
    {
        "templateName": "Study Session! Expert Teaching Model",
        "displayImage": discord,
        "templateId": "template-242211",
        "tags": [
          "Discord", "Gen AI"
        ],
        "nodes": [
          {
            "id": "NodeNode-83",
            "type": "NodeNode",
            "position": {
              "x": 91,
              "y": 88.19999694824219
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
                "question"
              ],
              "sources": [],
              "fieldValue1": "question",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 91,
              "y": 88.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-84",
            "type": "NodeNode",
            "position": {
              "x": 243,
              "y": 262.1999969482422
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
              "fieldValue1": "🖊️",
              "fieldValue2": "✨",
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
              "x": 243,
              "y": 262.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-85",
            "type": "NodeNode",
            "position": {
              "x": 616,
              "y": 130.1999969482422
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "query",
                "context"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "User query: {{query}}\n\nContext: {{context}}",
              "fieldValue2": "You are an expert educator, designed to provide comprehensive and accurate explanations to students of all levels. Your primary goal is to foster deep understanding and critical thinking.\n\n*Your Role:*\n\n* *Elaborate Explanation:* When a student asks a question, provide a detailed and thorough response. Break down complex concepts into smaller, digestible parts.\n* *Contextual Accuracy:* Always ensure your explanations are consistent with and grounded in the provided context. Do not introduce information that contradicts the context.\n* *Clarity and Precision:* Use clear, concise language, avoiding jargon unless necessary. Define any technical terms you use.\n* *Step-by-Step Reasoning:* When explaining processes or solving problems, present your reasoning in a logical, step-by-step manner.\n* *Visual Aids (If Possible):* If applicable, suggest or describe how visual aids like diagrams, graphs, or examples could enhance understanding.\n* *Multiple Perspectives:* Where appropriate, present different perspectives or approaches to a problem or concept.\n* *Real-World Connections:* Connect theoretical concepts to real-world examples and applications to make learning more relevant and engaging.\n* *Error Correction:* If you detect an error in the provided context, point it out respectfully and provide the correct information.\n* *Questioning and Encouragement:* Pose thoughtful questions to encourage students to think critically and apply their knowledge. Offer positive reinforcement and encouragement.\n* *Adaptability:* Tailor your explanations to the student's level of understanding, as inferred from the question's complexity and the provided context.\n* *Mathematical Notation:* Use LaTeX formatting for all mathematical and scientific notation. For example, represent the square root of 2 as $\\sqrt{2}$ and the formula for kinetic energy as $KE = \\frac{1}{2}mv^2$.\n* *No Extraneous Information:* Only provide information that is directly related to the user's query and the provided context. Do not generate information outside of these parameters."
            },
            "width": 204,
            "height": 1243,
            "selected": false,
            "positionAbsolute": {
              "x": 616,
              "y": 130.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-86",
            "type": "NodeNode",
            "position": {
              "x": 992,
              "y": 149.1999969482422
            },
            "data": {
              "name": "Discord",
              "desc": "Our discord bot will send messages to your requested channel",
              "isInput": true,
              "isType": false,
              "bgcolor": "#5865F2",
              "rightHandles": 0,
              "leftHandles": 1,
              "fieldValue1": "🖊️",
              "sources": [
                "Message Content"
              ],
              "img": "/discord.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": "a@m.com"
            },
            "width": 204,
            "height": 164,
            "selected": false,
            "positionAbsolute": {
              "x": 992,
              "y": 149.1999969482422
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-83",
            "sourceHandle": "NodeNode-83-right-handle-0",
            "target": "NodeNode-84",
            "targetHandle": "NodeNode-84-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-83NodeNode-83-right-handle-0-NodeNode-84NodeNode-84-left-handle-0"
          },
          {
            "source": "NodeNode-84",
            "sourceHandle": "NodeNode-84-right-handle-0",
            "target": "NodeNode-85",
            "targetHandle": "NodeNode-85-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-84NodeNode-84-right-handle-0-NodeNode-85NodeNode-85-left-handle-3"
          },
          {
            "source": "NodeNode-83",
            "sourceHandle": "NodeNode-83-right-handle-0",
            "target": "NodeNode-85",
            "targetHandle": "NodeNode-85-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-83NodeNode-83-right-handle-0-NodeNode-85NodeNode-85-left-handle-2"
          },
          {
            "source": "NodeNode-85",
            "sourceHandle": "NodeNode-85-right-handle-0",
            "target": "NodeNode-86",
            "targetHandle": "NodeNode-86-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-85NodeNode-85-right-handle-0-NodeNode-86NodeNode-86-left-handle-0"
          }
        ]
    },
    
    {
        "templateName": "Chat with GDoc",
        "displayImage": star,
        "templateId": "template-2271877",
        "tags": [
          "Gen AI", "Discord"
        ],
        "nodes": [
          {
            "id": "NodeNode-833",
            "type": "NodeNode",
            "position": {
              "x": 186,
              "y": 116.19999694824219
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
                "identifier"
              ],
              "sources": [],
              "fieldValue1": "identifier",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 186,
              "y": 116.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-877",
            "type": "NodeNode",
            "position": {
              "x": 535,
              "y": 77.19999694824219
            },
            "data": {
              "name": "GDocs",
              "desc": "Read or create a document",
              "Nodestate": [
                "Read Doc",
                "Create Doc"
              ],
              "isInput": false,
              "isType": false,
              "bgcolor": "#636ff2",
              "rightHandles": 1,
              "leftHandles": 1,
              "img": "/gdocs.png",
              "category": "Integrations",
              "fieldValue1": {
                "1": "{{identifier}}"
              },
              "fieldValue2": "✨",
              "sources": [
                "identifier"
              ],
              "targets": [
                "Content"
              ],
              "username": false
            },
            "width": 204,
            "height": 188,
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
              "x": 535,
              "y": 77.19999694824219
            }
          },
          {
            "id": "NodeNode-88",
            "type": "NodeNode",
            "position": {
              "x": 536,
              "y": 320.1999969482422
            },
            "data": {
              "name": "Gemini",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 4,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/google.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "doc",
                "query"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Document: {{doc}}\n\nquery: {{query}}",
              "fieldValue2": "Answer the question based solely on the provided document"
            },
            "width": 204,
            "height": 235,
            "selected": false,
            "positionAbsolute": {
              "x": 536,
              "y": 320.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-89",
            "type": "NodeNode",
            "position": {
              "x": 184,
              "y": 270.1999969482422
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
              "x": 184,
              "y": 270.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-90",
            "type": "NodeNode",
            "position": {
              "x": 911,
              "y": 211.1999969482422
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
              "fieldValue1": "",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": true,
            "positionAbsolute": {
              "x": 911,
              "y": 211.1999969482422
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-833",
            "sourceHandle": "NodeNode-833-right-handle-0",
            "target": "NodeNode-877",
            "targetHandle": "NodeNode-877-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-833NodeNode-833-right-handle-0-NodeNode-877NodeNode-877-left-handle-0"
          },
          {
            "source": "NodeNode-89",
            "sourceHandle": "NodeNode-89-right-handle-0",
            "target": "NodeNode-88",
            "targetHandle": "NodeNode-88-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-89NodeNode-89-right-handle-0-NodeNode-88NodeNode-88-left-handle-3"
          },
          {
            "source": "NodeNode-877",
            "sourceHandle": "NodeNode-877-right-handle-0",
            "target": "NodeNode-88",
            "targetHandle": "NodeNode-88-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-877NodeNode-877-right-handle-0-NodeNode-88NodeNode-88-left-handle-2"
          },
          {
            "source": "NodeNode-88",
            "sourceHandle": "NodeNode-88-right-handle-0",
            "target": "NodeNode-90",
            "targetHandle": "NodeNode-90-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-88NodeNode-88-right-handle-0-NodeNode-90NodeNode-90-left-handle-0"
          }
        ]
    },

    {
        templateName: "Tech support AI chatbot",
        displayImage: bot,
        templateId: "template-9002",
        tags: ["Assistant"],
        nodes: [
            {
                id: "NodeNode-1",
                type: "NodeNode",
                position: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Input"],
                    sources: [],
                    fieldValue1: "Node-1",
                    fieldValue2: "Node-1",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 229.9114132620477,
                    y: 32.16286654939921,
                },
                dragging: false,
            },
            {
                id: "NodeNode-3",
                type: "NodeNode",
                position: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                data: {
                    name: "Database (RAG)",
                    desc: "Fetches only the relevant text chunks from the database",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database.png",
                    category: "Knowledge Base",
                    sources: ["query"],
                    targets: ["results"],
                    fieldValue1: "NodeNode-3",
                    fieldValue2: "Node-3",
                    constantValueList: [
                        {
                            name: "Max Chunk Size",
                            value: 1000,
                            placeholder: "Exactly what it says",
                        },
                        {
                            name: "Chunk Overlap",
                            value: 200,
                            placeholder: "Overlap between chunks",
                        },
                        {
                            name: "Number of Chunks",
                            value: 5,
                            placeholder: "Total number of chunks",
                        },
                    ],
                },
                width: 204,
                height: 340,
                selected: false,
                positionAbsolute: {
                    x: 644.9234376463135,
                    y: 139.98911729693646,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                data: {
                    name: "Text",
                    isInput: true,
                    isType: false,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/text.webp",
                    category: "General",
                    targets: ["Output"],
                    fieldValue1:
                        "You are a helpful and knowledgeable AI assistant specialized in providing technical support for our products. Your primary goal is to assist users with their technical issues by leveraging the provided product information.\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers and troubleshooting steps.\n* **Prioritize using the provided product information:** Always attempt to answer the user's query using the information explicitly given in the product documentation.\n* **Acknowledge information limitations:** If the provided product information does not contain the answer to the user's query, clearly state that you cannot find the specific information within the given documentation. Avoid making assumptions or providing general troubleshooting steps not supported by the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate (e.g., suggesting they contact human support if the issue is beyond the scope of the provided documentation).\n* **Identify the user's problem:** Try to understand the core issue the user is facing.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more details about their problem, including specific error messages, steps they have already taken, and the product version they are using.\n* **Do not ask for personal information:** You are here to provide technical support based on the provided product information.\n* **Format your responses clearly:** Use bullet points, numbered lists, code blocks, or bold text to make instructions and information easy to follow.\n* **When referencing product information, be specific:** If you are referring to a particular section or specification in the product info, mention it (e.g., \"According to the 'Troubleshooting' section of the manual...\").\n* **Stay within the scope of technical support for our products:** Do not engage in conversations about unrelated topics or provide support for third-party products.",
                    fieldValue2: "Node-8",
                    sources: [],
                },
                width: 204,
                height: 1118,
                selected: true,
                positionAbsolute: {
                    x: 401.15458230133277,
                    y: -92.30401725329656,
                },
                dragging: false,
            },
            {
                id: "NodeNode-76",
                type: "NodeNode",
                position: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Previous chat"],
                    sources: [],
                    fieldValue1: "Previous chat",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 225.07960894124014,
                    y: 180.2510231711396,
                },
                dragging: false,
            },
            {
                id: "NodeNode-77",
                type: "NodeNode",
                position: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 5,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query", "data", "chat"],
                    targets: ["response"],
                    fieldValue1:
                        "User query: {{query}}\n\nProduct info: {{data}}\n\nPrevious chat: {{chat}}",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 235,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 969.2457873451058,
                    y: -31.155696636289235,
                },
            },
            {
                id: "NodeNode-80",
                type: "NodeNode",
                position: {
                    x: 1321.7305899216242,
                    y: 31.869000062407764,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "",
                    fieldValue2: "✨",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 1321.7305899216242,
                    y: 31.869000062407764,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-3",
                targetHandle: "NodeNode-3-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0",
            },
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-77NodeNode-77-left-handle-0",
            },
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-77NodeNode-77-left-handle-2",
            },
            {
                source: "NodeNode-76",
                sourceHandle: "NodeNode-76-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-76NodeNode-76-right-handle-0-NodeNode-77NodeNode-77-left-handle-4",
            },
            {
                source: "NodeNode-3",
                sourceHandle: "NodeNode-3-right-handle-0",
                target: "NodeNode-77",
                targetHandle: "NodeNode-77-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-77NodeNode-77-left-handle-3",
            },
            {
                source: "NodeNode-77",
                sourceHandle: "NodeNode-77-right-handle-0",
                target: "NodeNode-80",
                targetHandle: "NodeNode-80-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-77NodeNode-77-right-handle-0-NodeNode-80NodeNode-80-left-handle-0",
            },
        ],
    },
    {
        templateName: "Sales support AI chatbot",
        displayImage: bot,
        templateId: "template-2020207",
        tags: ["Assistant"],
        nodes: [
            {
                id: "NodeNode-1",
                type: "NodeNode",
                position: {
                    x: 119.38179978206608,
                    y: 112.19999694824219,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Input"],
                    sources: [],
                    fieldValue1: "Node-1",
                    fieldValue2: "Node-1",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 119.38179978206608,
                    y: 112.19999694824219,
                },
                dragging: false,
            },
            {
                id: "NodeNode-3",
                type: "NodeNode",
                position: {
                    x: 696.9234376463135,
                    y: 240.98911729693646,
                },
                data: {
                    name: "Database (RAG)",
                    desc: "Fetches only the relevant text chunks from the database",
                    isInput: false,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database.png",
                    category: "Knowledge Base",
                    sources: ["query"],
                    targets: ["results"],
                    fieldValue1: "NodeNode-3",
                    fieldValue2: "Node-3",
                    constantValueList: [
                        {
                            name: "Max Chunk Size",
                            value: 1000,
                            placeholder: "Exactly what it says",
                        },
                        {
                            name: "Chunk Overlap",
                            value: 200,
                            placeholder: "Overlap between chunks",
                        },
                        {
                            name: "Number of Chunks",
                            value: 5,
                            placeholder: "Total number of chunks",
                        },
                    ],
                },
                width: 204,
                height: 301,
                selected: false,
                positionAbsolute: {
                    x: 696.9234376463135,
                    y: 240.98911729693646,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 423.99939924080064,
                    y: -234.96300393417778,
                },
                data: {
                    name: "Text",
                    isInput: true,
                    isType: false,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/text.webp",
                    category: "General",
                    targets: ["Output"],
                    fieldValue1:
                        "You are a helpful and knowledgeable AI assistant specialized in providing sales support. Your primary goal is to assist users with their sales-related queries by leveraging the provided sales data.\n\nFollow these guidelines:\n\n* **Be concise and direct:** Provide clear and to-the-point answers.\n* **Prioritize using the provided sales data:** Always attempt to answer the user's query using the information explicitly given in the sales data.\n* **Acknowledge data limitations:** If the provided sales data does not contain the information needed to answer the query, clearly state that you cannot find the answer within the given data. Avoid making assumptions or providing information from outside the provided data.\n* **Maintain a professional and helpful tone:** Address the user politely and offer further assistance if appropriate.\n* **Identify the user's intent:** Try to understand the underlying need behind the user's query.\n* **If the query is unclear, ask clarifying questions:** If you are unsure what the user is asking, politely request more information.\n* **Do not ask for personal information:** You are here to provide sales support based on the provided data.\n* **Format your responses clearly:** Use bullet points or numbered lists when presenting multiple pieces of information.\n* **When referencing data, be specific:** If you are pulling information from a specific field in the sales data, mention it (e.g., \"According to the 'Product Name' field...\").\n* **Stay within the scope of sales support:** Do not engage in conversations unrelated to sales inquiries.",
                    fieldValue2: "Node-8",
                },
                width: 204,
                height: 854,
                selected: false,
                positionAbsolute: {
                    x: 423.99939924080064,
                    y: -234.96300393417778,
                },
                dragging: false,
            },
            {
                id: "NodeNode-9",
                type: "NodeNode",
                position: {
                    x: 967.1425821772832,
                    y: -76.44238747350536,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query", "data"],
                    targets: ["response"],
                    fieldValue1:
                        "User query: {{query}}\n\nSales data: {{data}}",
                    fieldValue2: "Node-9",
                },
                width: 204,
                height: 203,
                selected: false,
                positionAbsolute: {
                    x: 967.1425821772832,
                    y: -76.44238747350536,
                },
                dragging: false,
            },
            {
                id: "NodeNode-10",
                type: "NodeNode",
                position: {
                    x: 1346.2247176280898,
                    y: 86.7084542625962,
                },
                data: {
                    name: "Database Output",
                    desc: "Save pipeline output in a new database",
                    isInput: true,
                    isType: false,
                    rightHandles: 0,
                    leftHandles: 1,
                    bgcolor: "#f57e2a",
                    img: "/database-res.png",
                    category: "Knowledge Base",
                    sources: ["results"],
                    fieldValue1: "",
                    fieldValue2: "Node-10",
                    username: false,
                },
                width: 204,
                height: 173,
                selected: false,
                positionAbsolute: {
                    x: 1346.2247176280898,
                    y: 86.7084542625962,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-3",
                targetHandle: "NodeNode-3-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0",
            },
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-9",
                targetHandle: "NodeNode-9-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-9NodeNode-9-left-handle-0",
            },
            {
                source: "NodeNode-3",
                sourceHandle: "NodeNode-3-right-handle-0",
                target: "NodeNode-9",
                targetHandle: "NodeNode-9-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-9NodeNode-9-left-handle-3",
            },
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-9",
                targetHandle: "NodeNode-9-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-9NodeNode-9-left-handle-2",
            },
            {
                source: "NodeNode-9",
                sourceHandle: "NodeNode-9-right-handle-0",
                target: "NodeNode-10",
                targetHandle: "NodeNode-10-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-9NodeNode-9-right-handle-0-NodeNode-10NodeNode-10-left-handle-0",
            },
        ],
    },
    {
        "templateName": "AI Powered FAQ bot",
        "displayImage": bot,
        "templateId": "template-6423221",
        "tags": [
          "Assistant",
        ],
        "nodes": [
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
        ],
        "edges": [
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
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
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-3NodeNode-3-left-handle-0"
          },
          {
            "source": "NodeNode-81",
            "sourceHandle": "NodeNode-81-right-handle-0",
            "target": "NodeNode-80",
            "targetHandle": "NodeNode-80-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-81NodeNode-81-right-handle-0-NodeNode-80NodeNode-80-left-handle-0"
          },
          {
            "source": "NodeNode-3",
            "sourceHandle": "NodeNode-3-right-handle-0",
            "target": "NodeNode-80",
            "targetHandle": "NodeNode-80-left-handle-3",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-3NodeNode-3-right-handle-0-NodeNode-80NodeNode-80-left-handle-3"
          },
          {
            "source": "NodeNode-1",
            "sourceHandle": "NodeNode-1-right-handle-0",
            "target": "NodeNode-80",
            "targetHandle": "NodeNode-80-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-80NodeNode-80-left-handle-2"
          },
          {
            "source": "NodeNode-80",
            "sourceHandle": "NodeNode-80-right-handle-0",
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
            "id": "reactflow__edge-NodeNode-80NodeNode-80-right-handle-0-NodeNode-5NodeNode-5-left-handle-0"
          },
          {
            "source": "NodeNode-82",
            "sourceHandle": "NodeNode-82-right-handle-0",
            "target": "NodeNode-80",
            "targetHandle": "NodeNode-80-left-handle-4",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-82NodeNode-82-right-handle-0-NodeNode-80NodeNode-80-left-handle-4"
          }
        ]
    },
    {
        templateName: "A/B Test Marketing Emails",
        displayImage: bot,
        templateId: "template-13333333",
        tags: ["Assistant", "Gmail"],
        nodes: [
            {
                id: "NodeNode-22",
                type: "NodeNode",
                position: {
                    x: 191,
                    y: 47.76999206542973,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#5b96f5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    category: "General",
                    targets: ["Product Info"],
                    sources: [],
                    fieldValue1: "Product Info",
                    fieldValue2: "Node-22",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 191,
                    y: 47.76999206542973,
                },
                dragging: false,
            },
            {
                id: "NodeNode-23",
                type: "NodeNode",
                position: {
                    x: 192,
                    y: 203.76999206542973,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#5b96f5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    category: "General",
                    targets: ["Target Audience"],
                    sources: [],
                    fieldValue1: "Target Audience",
                    fieldValue2: "Node-23",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 192,
                    y: 203.76999206542973,
                },
                dragging: false,
            },
            {
                id: "NodeNode-24",
                type: "NodeNode",
                position: {
                    x: 198,
                    y: 356.76999206542973,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#5b96f5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    category: "General",
                    targets: ["Tone"],
                    sources: [],
                    fieldValue1: "Tone",
                    fieldValue2: "Node-24",
                },
                width: 204,
                height: 108,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 198,
                    y: 356.76999206542973,
                },
            },
            {
                id: "NodeNode-25",
                type: "NodeNode",
                position: {
                    x: 194,
                    y: 502.76999206542973,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#5b96f5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOsSURBVHhe7dzfS1NxGMfxx2QoTnRjWz9ZeDebF/0B/gUSCJImmOHWypJg0kVdFSV1VRehUKa5nKTRTwwh/Av6A7xQ2500KmMTTTzikGEXMbSHte8Zm3vO8z3P624fdvV9M3bOBqdqb28PBJ0jeBCVJQGISQBiEoCYBCAmAYhJAGISgJgEICYBiEkAYhKAmAQgJgGISQBiVcX+H5DNZlvT6XRPKpUKLi4nWn78XPXh99jJaf+pX8HmwILH40243a55h8Mxj99TSFEBDMOIjsfiw3gX+zo72mf8fn8v3v/HdIAnI0/NvVEAAMDN6I0qvOVj6jsgmUxO400UZhhGFG/5KAPs7u62fZidu4h3Udh4LD6czWZb8Y4pA6yvb7ThTZiTTqd78IYpA6ytpQN4E+akUqkg3jBlgKWvibN4E+YsLida8IYpr4JUVz9mv+11Ver5KD8B4nBJAGISgJgEICYBiLEMsLm5eWfj9+/7eOeIXYCtra1bsfirB5NT0/d0iMAqgGEY0Rcvpx7lXusQgU2A7e3t6/n+i+AegUWAnZ2d0NjE5CjeczhHsHyATCbTPToem8Q7xjWC8rcgK1hZWXk3O/e5C+/5hPt6h1yNjRULYYvfgpqami50tJ97j/d8uH0SWAQAjSOwCQCaRmAVADSMwC4AaBaBZQDQKALbAKBJBOV9gOo6l5ty3yeozkeL+4BystonwXYBwGIRbBkALBTBtgEAAED1BVgBtg0Q7usdcrlcQ3ivNFsGKPeVUClsF8BKhw9m7gOsjvq/AlvfB1AffjmwDaDD4QPXALocPnAMoNPhA7cAuh0+cAqg4+EDlwC6Hj6YuQ8o9Tq3VJlMpvvZ2MQbvOdDcfilno/lPwE1NTVvB/ojYbxjFIdfDpYPAABQW1sbv3YlPID3HK6HD1wCAADU1dU974+EBvHO+fCBUwAAAKfTOXL1ct/t3Gvuhw/cAgAA1NfXP46ELt3V4fCBYwAAgIaGhoc6HD5wDaATCUBMAhCTAMQkADHlb0EfZz+tfkt+P4Z3oXbyxPFUd9f5o3g/SPkJCDYHFvAmzGk5E1jEG6YM4PF4E3gT5vh8viW8YcoAbrerqEfxin1er/c13jBlAIfDMd/Z0T6Dd1FYfyQ0WF1d/QXvmDIAAEAxz0IWfzmdzhG85aO8CjpIHt6tdmgP786Rx9f/q6KPrxflZ+o7QBweCUBMAhCTAMQkADEJQEwCEJMAxCQAMQlATAIQkwDEJAAxCUBMAhD7A3ADt5wWP6YXAAAAAElFTkSuQmCC",
                    category: "General",
                    targets: ["Use cases"],
                    sources: [],
                    fieldValue1: "Use cases",
                    fieldValue2: "Node-25",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 194,
                    y: 502.76999206542973,
                },
                dragging: false,
            },
            {
                id: "NodeNode-27",
                type: "NodeNode",
                position: {
                    x: 665.6596458111103,
                    y: 80.68713279361165,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 7,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: [
                        "system",
                        "prompt",
                        "product_info",
                        "target_audience",
                        "tone",
                        "use_cases",
                        "context",
                    ],
                    targets: ["response"],
                    fieldValue1:
                        'Generate three unique marketing promotion email ideas based on the following details:\n\n    Product Info: {{product_info}}\n    Target Audience: {{target_audience}}\n    Tone: {{tone}}\n    Use Cases: {{use_cases}}\n    Context: {{context}}\n\n\nstrictly output the result as a JSON object with the following keys:\n\n* `"subject"`: A concise title or subject for the email.\n* `"text"`: Body of email\n\nEach email idea should include:\n\n    A compelling subject line\n    A brief email outline (hook, value proposition, CTA)\n    A unique angle or approach compared to the other two emails',
                    fieldValue2:
                        "You are an expert marketing copywriter specializing in high-converting email campaigns. Your task is to generate three distinct email promotion ideas tailored to the given product, target audience, tone, and context. Each email should be engaging, well-structured, and optimized for conversion, following best practices for subject lines, body content, and calls to action. Be creative, persuasive, and concise while ensuring each email aligns with the specified parameters.\n\n**Crucially, your final output MUST be a valid JSON object conforming to the specified schema.**",
                },
                width: 204,
                height: 835,
                selected: false,
                positionAbsolute: {
                    x: 665.6596458111103,
                    y: 80.68713279361165,
                },
                dragging: false,
            },
            {
                id: "NodeNode-28",
                type: "NodeNode",
                position: {
                    x: 192.2305271002857,
                    y: 653.8964235660931,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Additional context"],
                    sources: [],
                    fieldValue1: "Additional context",
                    fieldValue2: "Node-28",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 192.2305271002857,
                    y: 653.8964235660931,
                },
                dragging: false,
            },
            {
                id: "NodeNode-29",
                type: "NodeNode",
                position: {
                    x: 1092.2605448499407,
                    y: 273.54901020745217,
                },
                data: {
                    name: "Gmail",
                    desc: "Read emails, create drafts or just send one!",
                    Nodestate: ["Create draft", "Send email", "Read emails"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#ea4335",
                    rightHandles: 0,
                    leftHandles: 1,
                    sources: ["Message"],
                    targets: [],
                    fieldValue1: {
                        isDraft: true,
                    },
                    img: "/gmail.png",
                    category: "Integrations",
                    fieldValue2: "Node-29",
                    username: false,
                },
                width: 204,
                height: 200,
                selected: true,
                positionAbsolute: {
                    x: 1092.2605448499407,
                    y: 273.54901020745217,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-28",
                sourceHandle: "NodeNode-28-right-handle-0",
                target: "NodeNode-27",
                targetHandle: "NodeNode-27-left-handle-6",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-28NodeNode-28-right-handle-0-NodeNode-27NodeNode-27-left-handle-6",
            },
            {
                source: "NodeNode-25",
                sourceHandle: "NodeNode-25-right-handle-0",
                target: "NodeNode-27",
                targetHandle: "NodeNode-27-left-handle-5",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-25NodeNode-25-right-handle-0-NodeNode-27NodeNode-27-left-handle-5",
            },
            {
                source: "NodeNode-24",
                sourceHandle: "NodeNode-24-right-handle-0",
                target: "NodeNode-27",
                targetHandle: "NodeNode-27-left-handle-4",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-24NodeNode-24-right-handle-0-NodeNode-27NodeNode-27-left-handle-4",
            },
            {
                source: "NodeNode-23",
                sourceHandle: "NodeNode-23-right-handle-0",
                target: "NodeNode-27",
                targetHandle: "NodeNode-27-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-23NodeNode-23-right-handle-0-NodeNode-27NodeNode-27-left-handle-3",
            },
            {
                source: "NodeNode-22",
                sourceHandle: "NodeNode-22-right-handle-0",
                target: "NodeNode-27",
                targetHandle: "NodeNode-27-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-22NodeNode-22-right-handle-0-NodeNode-27NodeNode-27-left-handle-2",
            },
            {
                source: "NodeNode-27",
                sourceHandle: "NodeNode-27-right-handle-0",
                target: "NodeNode-29",
                targetHandle: "NodeNode-29-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-27NodeNode-27-right-handle-0-NodeNode-29NodeNode-29-left-handle-0",
            },
        ],
    },

    {
        "templateName": "Write Emails With Discord",
        "displayImage": discord,
        "templateId": "template-2137300",
        "tags": [
          "Discord", "Gmail"
        ],
        "nodes": [
          {
            "id": "NodeNode-83",
            "type": "NodeNode",
            "position": {
              "x": 186,
              "y": 116.19999694824219
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
                "Input"
              ],
              "sources": [],
              "fieldValue1": "",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 186,
              "y": 116.19999694824219
            },
            "dragging": false
          },
          {
            "id": "NodeNode-84",
            "type": "NodeNode",
            "position": {
              "x": 665,
              "y": 138.1999969482422
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
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 200,
            "selected": true,
            "positionAbsolute": {
              "x": 665,
              "y": 138.1999969482422
            },
            "dragging": false
          },
          {
            "id": "NodeNode-85",
            "type": "NodeNode",
            "position": {
              "x": 189,
              "y": 259.1999969482422
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
                "Input"
              ],
              "sources": [],
              "fieldValue1": "",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 189,
              "y": 259.1999969482422
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-85",
            "sourceHandle": "NodeNode-85-right-handle-0",
            "target": "NodeNode-84",
            "targetHandle": "NodeNode-84-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-85NodeNode-85-right-handle-0-NodeNode-84NodeNode-84-left-handle-1"
          },
          {
            "source": "NodeNode-83",
            "sourceHandle": "NodeNode-83-right-handle-0",
            "target": "NodeNode-84",
            "targetHandle": "NodeNode-84-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-83NodeNode-83-right-handle-0-NodeNode-84NodeNode-84-left-handle-0"
          }
        ]
    },
    {
        "templateName": "Generate Tasks List",
        "displayImage": discord,
        "templateId": "template-328351",
        "tags": [
          "Discord", "Assistant"
        ],
        "nodes": [
          {
            "id": "NodeNode-88",
            "type": "NodeNode",
            "position": {
              "x": 844.8617886791972,
              "y": 217.22872134973028
            },
            "data": {
              "name": "Discord",
              "desc": "Our discord bot will send messages to your requested channel",
              "isInput": true,
              "isType": false,
              "bgcolor": "#5865F2",
              "rightHandles": 0,
              "leftHandles": 1,
              "fieldValue1": "",
              "sources": [
                "Message Content"
              ],
              "img": "/discord.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": false
            },
            "width": 204,
            "height": 162,
            "selected": false,
            "positionAbsolute": {
              "x": 844.8617886791972,
              "y": 217.22872134973028
            },
            "dragging": false
          },
          {
            "id": "NodeNode-91",
            "type": "NodeNode",
            "position": {
              "x": 459.00343932917633,
              "y": 251.49903527226502
            },
            "data": {
              "name": "OpenAI",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 3,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/openai.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "tasks"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "Here is the list of my tasks: {{tasks}}",
              "fieldValue2": "Generate a professional to-do list. The parameter \"tasks\" contains the list items. Output ONLY the formatted to-do list.\n\nExample:\n\n**Input:** tasks = meditate for 30 mins, read vagabond, call somya, buy eggs\n\n**Desired Output:**\nTo-Do List:\n\n☐ Meditate for 30 Mins\n☐ Read Vagabond\n☐ Call Somya\n☐ Buy Eggs"
            },
            "width": 204,
            "height": 415,
            "selected": false,
            "positionAbsolute": {
              "x": 459.00343932917633,
              "y": 251.49903527226502
            },
            "dragging": false
          },
          {
            "id": "NodeNode-92",
            "type": "NodeNode",
            "position": {
              "x": 112.49248744576946,
              "y": 271.80736944858194
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
                "Tasks"
              ],
              "sources": [],
              "fieldValue1": "Tasks",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 112.49248744576946,
              "y": 271.80736944858194
            },
            "dragging": false
          },
          {
            "id": "NodeNode-93",
            "type": "NodeNode",
            "position": {
              "x": 848.6696013372563,
              "y": 416.50425045483973
            },
            "data": {
              "name": "Database Output",
              "desc": "Save pipeline output in a new database",
              "isInput": true,
              "isType": false,
              "rightHandles": 0,
              "leftHandles": 1,
              "bgcolor": "#f57e2a",
              "img": "/database-res.png",
              "category": "Knowledge Base",
              "sources": [
                "results"
              ],
              "fieldValue1": "My Tasks",
              "fieldValue2": "✨",
              "username": "a@m.com"
            },
            "width": 204,
            "height": 175,
            "selected": false,
            "positionAbsolute": {
              "x": 848.6696013372563,
              "y": 416.50425045483973
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-91",
            "sourceHandle": "NodeNode-91-right-handle-0",
            "target": "NodeNode-88",
            "targetHandle": "NodeNode-88-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-91NodeNode-91-right-handle-0-NodeNode-88NodeNode-88-left-handle-0"
          },
          {
            "source": "NodeNode-91",
            "sourceHandle": "NodeNode-91-right-handle-0",
            "target": "NodeNode-93",
            "targetHandle": "NodeNode-93-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-91NodeNode-91-right-handle-0-NodeNode-93NodeNode-93-left-handle-0"
          },
          {
            "source": "NodeNode-92",
            "sourceHandle": "NodeNode-92-right-handle-0",
            "target": "NodeNode-91",
            "targetHandle": "NodeNode-91-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-92NodeNode-92-right-handle-0-NodeNode-91NodeNode-91-left-handle-2"
          }
        ]
    },
    {
        "templateName": "Summarize Pending Tasks",
        "displayImage": discord,
        "templateId": "template-245439",
        "tags": [
          "Discord", "Assistant"
        ],
        "nodes": [
          {
            "id": "NodeNode-88",
            "type": "NodeNode",
            "position": {
              "x": 848.6696013372566,
              "y": 281.96153653674037
            },
            "data": {
              "name": "Discord",
              "desc": "Our discord bot will send messages to your requested channel",
              "isInput": true,
              "isType": false,
              "bgcolor": "#5865F2",
              "rightHandles": 0,
              "leftHandles": 1,
              "fieldValue1": "",
              "sources": [
                "Message Content"
              ],
              "img": "/discord.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": false
            },
            "width": 204,
            "height": 162,
            "selected": false,
            "positionAbsolute": {
              "x": 848.6696013372566,
              "y": 281.96153653674037
            },
            "dragging": false
          },
          {
            "id": "NodeNode-90",
            "type": "NodeNode",
            "position": {
              "x": 82.02998618129428,
              "y": 283.2308074227601
            },
            "data": {
              "name": "Database Loader",
              "isInput": false,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 0,
              "bgcolor": "#f57e2a",
              "img": "/database.webp",
              "category": "Knowledge Base",
              "sources": [],
              "targets": [
                "Database"
              ],
              "fieldValue1": "🖊️",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 142,
            "selected": false,
            "positionAbsolute": {
              "x": 82.02998618129428,
              "y": 283.2308074227601
            },
            "dragging": false
          },
          {
            "id": "NodeNode-91",
            "type": "NodeNode",
            "position": {
              "x": 459.00343932917633,
              "y": 251.49903527226502
            },
            "data": {
              "name": "OpenAI",
              "isInput": true,
              "isType": false,
              "rightHandles": 1,
              "leftHandles": 3,
              "bgcolor": "#ffe682",
              "headColor": "#f5d65b",
              "img": "/openai.png",
              "category": "LLMs",
              "sources": [
                "system",
                "prompt",
                "tasks"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "To-do list: {{tasks}}",
              "fieldValue2": "Summarize my pending tasks present in my todo list in clear, direct, action-oriented manner."
            },
            "width": 204,
            "height": 223,
            "selected": false,
            "positionAbsolute": {
              "x": 459.00343932917633,
              "y": 251.49903527226502
            },
            "dragging": false
          }
        ],
        "edges": [
          {
            "source": "NodeNode-90",
            "sourceHandle": "NodeNode-90-right-handle-0",
            "target": "NodeNode-91",
            "targetHandle": "NodeNode-91-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-90NodeNode-90-right-handle-0-NodeNode-91NodeNode-91-left-handle-2"
          },
          {
            "source": "NodeNode-91",
            "sourceHandle": "NodeNode-91-right-handle-0",
            "target": "NodeNode-88",
            "targetHandle": "NodeNode-88-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-91NodeNode-91-right-handle-0-NodeNode-88NodeNode-88-left-handle-0"
          }
        ]
    },
    {
        "templateName": "Summarize My Notes",
        "displayImage": star,
        "templateId": "template-309003",
        "tags": [
          "Gen AI", "Discord"
        ],
        "nodes": [
          {
            "id": "NodeNode-94",
            "type": "NodeNode",
            "position": {
              "x": 417.1175000905227,
              "y": 391.11883273444374
            },
            "data": {
              "name": "GDocs",
              "desc": "Read or create a document",
              "Nodestate": [
                "Read Doc",
                "Create Doc"
              ],
              "isInput": false,
              "isType": false,
              "bgcolor": "#636ff2",
              "rightHandles": 1,
              "leftHandles": 1,
              "img": "/gdocs.png",
              "category": "Integrations",
              "fieldValue1": {
                "1": "{{name}}"
              },
              "fieldValue2": "✨",
              "sources": [
                "name"
              ],
              "targets": [
                "Content"
              ],
              "username": "a@m.com"
            },
            "width": 204,
            "height": 188,
            "selected": false,
            "positionAbsolute": {
              "x": 417.1175000905227,
              "y": 391.11883273444374
            },
            "dragging": false
          },
          {
            "id": "NodeNode-95",
            "type": "NodeNode",
            "position": {
              "x": 128.99300896402696,
              "y": 226.1136175518689
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
                "Name"
              ],
              "sources": [],
              "fieldValue1": "Name",
              "fieldValue2": "✨"
            },
            "width": 204,
            "height": 108,
            "selected": false,
            "positionAbsolute": {
              "x": 128.99300896402696,
              "y": 226.1136175518689
            },
            "dragging": false
          },
          {
            "id": "NodeNode-96",
            "type": "NodeNode",
            "position": {
              "x": 696.3570950148797,
              "y": 196.92038717341347
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
                "notes"
              ],
              "targets": [
                "response"
              ],
              "fieldValue1": "My notes: {{notes}}",
              "fieldValue2": "Summarize the provided text professionally and concisely. Output ONLY the summary."
            },
            "width": 204,
            "height": 211,
            "selected": true,
            "positionAbsolute": {
              "x": 696.3570950148797,
              "y": 196.92038717341347
            },
            "dragging": false
          },
          {
            "id": "NodeNode-97",
            "type": "NodeNode",
            "position": {
              "x": 1032.7138798101282,
              "y": 406.35008336668136
            },
            "data": {
              "name": "Discord",
              "desc": "Our discord bot will send messages to your requested channel",
              "isInput": true,
              "isType": false,
              "bgcolor": "#5865F2",
              "rightHandles": 0,
              "leftHandles": 1,
              "fieldValue1": "🖊️",
              "sources": [
                "Message Content"
              ],
              "img": "/discord.png",
              "category": "Integrations",
              "fieldValue2": "✨",
              "username": "a@m.com"
            },
            "width": 204,
            "height": 164,
            "selected": false,
            "positionAbsolute": {
              "x": 1032.7138798101282,
              "y": 406.35008336668136
            },
            "dragging": false
          },
          {
            "id": "NodeNode-100",
            "type": "NodeNode",
            "position": {
              "x": 1027.6367962660493,
              "y": 144.8802808466013
            },
            "data": {
              "name": "Database Output",
              "desc": "Save pipeline output in a new database",
              "isInput": true,
              "isType": false,
              "rightHandles": 0,
              "leftHandles": 2,
              "bgcolor": "#f57e2a",
              "img": "/database-res.png",
              "category": "Knowledge Base",
              "sources": [
                "results",
                "name"
              ],
              "fieldValue1": "{{name}}",
              "fieldValue2": "✨",
              "username": "a@m.com"
            },
            "width": 204,
            "height": 175,
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
              "x": 1027.6367962660493,
              "y": 144.8802808466013
            }
          }
        ],
        "edges": [
          {
            "source": "NodeNode-94",
            "sourceHandle": "NodeNode-94-right-handle-0",
            "target": "NodeNode-96",
            "targetHandle": "NodeNode-96-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-94NodeNode-94-right-handle-0-NodeNode-96NodeNode-96-left-handle-2"
          },
          {
            "source": "NodeNode-95",
            "sourceHandle": "NodeNode-95-right-handle-0",
            "target": "NodeNode-94",
            "targetHandle": "NodeNode-94-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-95NodeNode-95-right-handle-0-NodeNode-94NodeNode-94-left-handle-0"
          },
          {
            "source": "NodeNode-96",
            "sourceHandle": "NodeNode-96-right-handle-0",
            "target": "NodeNode-97",
            "targetHandle": "NodeNode-97-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-96NodeNode-96-right-handle-0-NodeNode-97NodeNode-97-left-handle-0"
          },
          {
            "source": "NodeNode-95",
            "sourceHandle": "NodeNode-95-right-handle-0",
            "target": "NodeNode-100",
            "targetHandle": "NodeNode-100-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-95NodeNode-95-right-handle-0-NodeNode-100NodeNode-100-left-handle-1"
          },
          {
            "source": "NodeNode-96",
            "sourceHandle": "NodeNode-96-right-handle-0",
            "target": "NodeNode-100",
            "targetHandle": "NodeNode-100-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-96NodeNode-96-right-handle-0-NodeNode-100NodeNode-100-left-handle-0"
          }
        ]
    },
    {
        templateName: "Summarize Meetings Into GDocs",
        displayImage: star,
        templateId: "template-612321",
        tags: ["Gen AI"],
        nodes: [
            {
                id: "NodeNode-7",
                type: "NodeNode",
                position: {
                    x: 574.5912623627245,
                    y: 91.25145588971634,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 3,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "transcript"],
                    targets: ["response"],
                    fieldValue1:
                        'Generate a comprehensive yet concise summary of the following Google Meet transcript, ensuring the output is a valid JSON object as specified in the system prompt:\n\n{{transcript}}\n\nIn your summary (which will be the value of the "text" key in the JSON output), please ensure to include the following:\n\n    Meeting Title/Topic: (If explicitly mentioned or can be inferred)\n    Date and Time: (If explicitly mentioned in the transcript)\n    Attendees: (List of individuals who participated, if identifiable)\n    Key Discussion Points: (Summarize the main topics discussed and the key takeaways from each)\n    Decisions Made: (Clearly list any concrete decisions that were reached during the meeting)\n    Action Items: (List all assigned tasks, including who is responsible and the due date if mentioned)\n    Next Steps: (Outline any planned follow-up actions or future meetings)\n    Overall Sentiment/Tone: (Briefly describe the general atmosphere and focus of the meeting)\n\nFormat the summary clearly using headings and bullet points for easy readability within the "text" value of the JSON output. The "title" key should contain a brief title for this summary.\n\nEnsure the final output is a single, valid JSON object with the keys "text" and "title".',
                    fieldValue2:
                        'You are an expert AI assistant specializing in summarizing meeting transcripts. Your primary goal is to extract key information, decisions, action items, and overall sentiment from the provided text and present it in a concise and easily understandable summary. Pay close attention to speaker attributions to accurately reflect who said what and who is responsible for specific tasks. Maintain a professional and objective tone.\n\nCrucially, all output must be strictly formatted as a JSON object with the keys "text" and "title". The "text" field will contain the meeting summary, and the "title" field will contain a concise title for the meeting summary (if inferable, otherwise a generic title like "Meeting Summary").',
                },
                width: 204,
                height: 179,
                selected: false,
                positionAbsolute: {
                    x: 574.5912623627245,
                    y: 91.25145588971634,
                },
                dragging: false,
            },
            {
                id: "NodeNode-8",
                type: "NodeNode",
                position: {
                    x: 176.92019001076864,
                    y: 102.53203645213102,
                },
                data: {
                    name: "Google Meet",
                    desc: "Reads the transcript of a Google Meet session based on the provided title or filename. You need a Google Workspace Business Standard or higher subscription.",
                    isInput: true,
                    isType: false,
                    bgcolor: "#34d4ed",
                    rightHandles: 1,
                    leftHandles: 0,
                    targets: ["Transcript"],
                    fieldValue1: "",
                    img: "/meet.png",
                    category: "Integrations",
                    fieldValue2: "Node-8",
                    username: false,
                },
                width: 204,
                height: 198,
                selected: false,
                positionAbsolute: {
                    x: 176.92019001076864,
                    y: 102.53203645213102,
                },
                dragging: false,
            },
            {
                id: "NodeNode-12",
                type: "NodeNode",
                position: {
                    x: 934.4876573762315,
                    y: 90.14888136488531,
                },
                data: {
                    name: "GDocs",
                    desc: "Read or create a document",
                    Nodestate: ["Read Doc", "Create Doc"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#636ff2",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/gdocs.png",
                    category: "Integrations",
                    fieldValue1: "Node-12",
                    fieldValue2: "Node-12",
                    sources: ["Content"],
                    targets: [],
                    username: false,
                },
                width: 204,
                height: 181,
                selected: false,
                positionAbsolute: {
                    x: 934.4876573762315,
                    y: 90.14888136488531,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-8",
                sourceHandle: "NodeNode-8-right-handle-0",
                target: "NodeNode-7",
                targetHandle: "NodeNode-7-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-8NodeNode-8-right-handle-0-NodeNode-7NodeNode-7-left-handle-2",
            },
            {
                source: "NodeNode-7",
                sourceHandle: "NodeNode-7-right-handle-0",
                target: "NodeNode-12",
                targetHandle: "NodeNode-12-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-7NodeNode-7-right-handle-0-NodeNode-12NodeNode-12-left-handle-0",
            },
        ],
    },
    {
        templateName: "Professional Email Formatting Tool",
        displayImage: star,
        templateId: "template-28326151",
        tags: ["Gen AI", "Gmail"],
        nodes: [
            {
                id: "NodeNode-1",
                type: "NodeNode",
                position: {
                    x: 59,
                    y: 280.1999969482422,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Query"],
                    sources: [],
                    fieldValue1: "Query",
                    fieldValue2: "Node-1",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 59,
                    y: 280.1999969482422,
                },
                dragging: false,
            },
            {
                id: "NodeNode-4",
                type: "NodeNode",
                position: {
                    x: 743,
                    y: 296.1999969482422,
                },
                data: {
                    name: "Gmail",
                    desc: "Read emails, create drafts or just send one!",
                    Nodestate: ["Create draft", "Send email", "Read emails"],
                    isInput: false,
                    isType: false,
                    bgcolor: "#ea4335",
                    rightHandles: 0,
                    leftHandles: 1,
                    sources: ["Message"],
                    targets: [],
                    fieldValue1: {
                        1: "",
                        isDraft: true,
                    },
                    img: "/gmail.png",
                    category: "Integrations",
                    fieldValue2: "Node-4",
                    username: false,
                },
                width: 204,
                height: 200,
                selected: false,
                positionAbsolute: {
                    x: 743,
                    y: 296.1999969482422,
                },
                dragging: false,
            },
            {
                id: "NodeNode-5",
                type: "NodeNode",
                position: {
                    x: 375.0000000000001,
                    y: 53.19999694824219,
                },
                data: {
                    name: "OpenAI",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 3,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/openai.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "query"],
                    targets: ["response"],
                    fieldValue1:
                        'Given the user query  and the context regarding the query , generate an appropriate email subject line and body. Use the following format:\n\n{\n  "subject": "Insert Subject Line Here",\n  "text": "Insert Email Body Here"\n}\n\nInstructions: \n\n    Analyze the user query to determine the intent and desired outcome.\n    Use the provided context to tailor the email content appropriately.\n    Maintain a tone consistent with the purpose of the email (e.g., professional, friendly, urgent).\n    Ensure clarity, conciseness, and relevance in both the subject line and body.\n    Avoid placeholders or vague language; provide complete and actionable content.\n     \n\nUser query: {{query}}',
                    fieldValue2:
                        'You are an AI assistant designed to help users create professional and engaging emails. Your task is to generate the subject line and body of an email based on the user\'s query and the provided context. Ensure that the tone and content align with the purpose of the communication, whether it’s formal, casual, or promotional. The output must be formatted as a JSON object with two keys: "subject" for the email subject line and "text" for the email body.',
                },
                width: 204,
                height: 179,
                selected: false,
                dragging: false,
                positionAbsolute: {
                    x: 375.0000000000001,
                    y: 53.19999694824219,
                },
            },
        ],
        edges: [
            {
                source: "NodeNode-1",
                sourceHandle: "NodeNode-1-right-handle-0",
                target: "NodeNode-5",
                targetHandle: "NodeNode-5-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-1NodeNode-1-right-handle-0-NodeNode-5NodeNode-5-left-handle-2",
            },
            {
                source: "NodeNode-5",
                sourceHandle: "NodeNode-5-right-handle-0",
                target: "NodeNode-4",
                targetHandle: "NodeNode-4-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-5NodeNode-5-right-handle-0-NodeNode-4NodeNode-4-left-handle-0",
            },
        ],
    },
    {
        templateName: "Chat with GForms",
        displayImage: star,
        templateId: "template-900",
        tags: ["Gen AI"],
        nodes: [
            {
                id: "NodeNode-60",
                type: "NodeNode",
                position: {
                    x: 198.66066437825123,
                    y: 306.9573588427913,
                },
                data: {
                    name: "Input",
                    isInput: true,
                    isType: true,
                    bgcolor: "#498bf5",
                    rightHandles: 1,
                    leftHandles: 0,
                    img: "/input.png",
                    category: "General",
                    targets: ["Query"],
                    sources: [],
                    fieldValue1: "Query",
                    fieldValue2: "Node-60",
                },
                width: 204,
                height: 108,
                selected: false,
                positionAbsolute: {
                    x: 198.66066437825123,
                    y: 306.9573588427913,
                },
                dragging: false,
            },
            {
                id: "NodeNode-61",
                type: "NodeNode",
                position: {
                    x: 198.66140338414112,
                    y: 82.89238068267395,
                },
                data: {
                    name: "GForms",
                    desc: "Reads a Google Form based on the provided identifier (title, link, or form ID).",
                    isInput: true,
                    isType: false,
                    bgcolor: "#9434ed",
                    rightHandles: 1,
                    leftHandles: 0,
                    targets: ["Form Data"],
                    fieldValue1: "",
                    img: "/forms.png",
                    category: "Integrations",
                    fieldValue2: "Node-61",
                    username: false,
                },
                width: 204,
                height: 174,
                selected: false,
                positionAbsolute: {
                    x: 198.66140338414112,
                    y: 82.89238068267395,
                },
                dragging: false,
            },
            {
                id: "NodeNode-63",
                type: "NodeNode",
                position: {
                    x: 606.6694573634256,
                    y: 125.4185561300315,
                },
                data: {
                    name: "Gemini",
                    isInput: true,
                    isType: false,
                    rightHandles: 1,
                    leftHandles: 4,
                    bgcolor: "#ffe682",
                    headColor: "#f5d65b",
                    img: "/google.png",
                    category: "LLMs",
                    sources: ["system", "prompt", "data", "query"],
                    targets: ["response"],
                    fieldValue1:
                        "Here is the data collected from the Google Form:\n\n{{data}}\n\nUser query: {{query}}",
                    fieldValue2:
                        "You are a helpful and knowledgeable AI assistant designed to understand and answer questions based on data retrieved from the Google Forms API. You have access to structured data representing responses submitted through a Google Form. Each response consists of answers to the questions defined in the form. The structure of the data will be provided in the main prompt, typically as a list of dictionaries or a similar structured format, where each dictionary represents a single form submission and keys correspond to the form questions or their identifiers.\n\nYour primary goal is to accurately answer user questions by analyzing this structured data. You can perform various operations such as filtering responses based on specific answers, counting occurrences of certain responses, identifying trends, and summarizing the data.\n\nWhen answering, be concise and directly address the user's query. Clearly state the steps you took or the logic you applied to arrive at the answer. If a question cannot be answered based on the provided data, politely state that.\n\nPay close attention to the data types of the responses. Be mindful that some responses might be free-text answers, while others might be multiple-choice selections or numerical values.\n\nWhen presenting data, format it clearly and understandably, potentially using lists, tables, or summaries as appropriate. Avoid making assumptions or bringing in outside information unless explicitly asked to do so in relation to the provided form data.",
                },
                width: 204,
                height: 1003,
                selected: false,
                positionAbsolute: {
                    x: 606.6694573634256,
                    y: 125.4185561300315,
                },
                dragging: false,
            },
            {
                id: "NodeNode-65",
                type: "NodeNode",
                position: {
                    x: 949.8514217393541,
                    y: 169.84292997434642,
                },
                data: {
                    name: "Output",
                    isInput: true,
                    isType: true,
                    bgcolor: "#58c742",
                    rightHandles: 0,
                    leftHandles: 1,
                    img: "/output.png",
                    category: "General",
                    sources: ["Output"],
                    fieldValue1: "Node-65",
                    fieldValue2: "Node-65",
                },
                width: 204,
                height: 108,
                selected: true,
                positionAbsolute: {
                    x: 949.8514217393541,
                    y: 169.84292997434642,
                },
                dragging: false,
            },
        ],
        edges: [
            {
                source: "NodeNode-61",
                sourceHandle: "NodeNode-61-right-handle-0",
                target: "NodeNode-63",
                targetHandle: "NodeNode-63-left-handle-2",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-61NodeNode-61-right-handle-0-NodeNode-63NodeNode-63-left-handle-2",
            },
            {
                source: "NodeNode-60",
                sourceHandle: "NodeNode-60-right-handle-0",
                target: "NodeNode-63",
                targetHandle: "NodeNode-63-left-handle-3",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-60NodeNode-60-right-handle-0-NodeNode-63NodeNode-63-left-handle-3",
            },
            {
                source: "NodeNode-63",
                sourceHandle: "NodeNode-63-right-handle-0",
                target: "NodeNode-65",
                targetHandle: "NodeNode-65-left-handle-0",
                type: "smoothstep",
                animated: true,
                markerEnd: {
                    type: "arrow",
                    height: "20px",
                    width: "40px",
                    color: "#aaa",
                },
                id: "reactflow__edge-NodeNode-63NodeNode-63-right-handle-0-NodeNode-65NodeNode-65-left-handle-0",
            },
        ],
    },
    {
        "templateName": "Simple Email Draft",
        "displayImage": gmail,
        "templateId": "template-312123",
        "tags": [
          "Gmail", "Discord", "assistant"
        ],
        "nodes": [
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
        ],
        "edges": [
          {
            "source": "NodeNode-104",
            "sourceHandle": "NodeNode-104-right-handle-0",
            "target": "NodeNode-105",
            "targetHandle": "NodeNode-105-left-handle-2",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-104NodeNode-104-right-handle-0-NodeNode-105NodeNode-105-left-handle-2"
          },
          {
            "source": "NodeNode-105",
            "sourceHandle": "NodeNode-105-right-handle-0",
            "target": "NodeNode-106",
            "targetHandle": "NodeNode-106-left-handle-0",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-105NodeNode-105-right-handle-0-NodeNode-106NodeNode-106-left-handle-0"
          },
          {
            "source": "NodeNode-102",
            "sourceHandle": "NodeNode-102-right-handle-0",
            "target": "NodeNode-106",
            "targetHandle": "NodeNode-106-left-handle-1",
            "type": "smoothstep",
            "animated": true,
            "markerEnd": {
              "type": "arrow",
              "height": "20px",
              "width": "40px",
              "color": "#aaa"
            },
            "id": "reactflow__edge-NodeNode-102NodeNode-102-right-handle-0-NodeNode-106NodeNode-106-left-handle-1"
          }
        ]
    },
];

export { templateNodes };
