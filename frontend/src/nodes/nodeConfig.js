import Input from '/input.png';
import Output from '/output.png';
import Anthropic from '/anthropic.png';
import aws from '/aws.png';
import azure from '/azure.png';
import database from '/database.png';
import text from '/text.webp';
import discord from '/discord.png';
import file from '/file.webp';
import gdocs from '/gdocs.png';
import gdrive from '/gdrive.png';
import gmail from '/gmail.png';
import google from '/google.png';
import notion from '/notion.png';
import obsidian from '/obsidian.webp';
import openai from '/openai.png';
import perplexity from '/perplexity.png';
import postgresql from '/postgresql.webp';
import meta from '/meta.svg';
import chat from '/chat.png';
import slack from '/slack.png';
import meet from '/meet.png';
import sheet from '/sheets.png';
import forms from '/forms.png';
import airtable from '/airtable.png';
import api from '/api.png';
import databaseRes from '/database-res.png';
import databaseLoader from '/database.webp';

const newNodesConfig = [
  {
    id: 'Input-1',
    type: 'NodeNode',
    data: {
      name: 'Input',
      isInput: true,
      isType: true,
      bgcolor: '#498bf5',
      rightHandles: 1,
      leftHandles: 0,
      img: Input,
      category: 'General',
      targets: ['Input'],
      sources: [],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'Output-1',
    type: 'NodeNode',
    data: {
      name: 'Output',
      isInput: true,
      isType: true,
      bgcolor: '#58c742',
      rightHandles: 0,
      leftHandles: 1,
      img: Output,
      category: 'General',
      sources: ['Output'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'Text-1',
    type: 'NodeNode',
    data: {
      name: 'Text',
      isInput: true,
      isType: false,
      bgcolor: '#498bf5',
      rightHandles: 1,
      leftHandles: 0,
      img: text,
      category: 'General',
      targets: ['Output'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'File-1',
    type: 'NodeNode',
    data: {
      name: 'File',
      isInput: true,
      isType: false,
      bgcolor: '#498bf5',
      rightHandles: 1,
      leftHandles: 0,
      img: file,
      category: 'General',
      targets: ['Output'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-1',
    type: 'NodeNode',
    data: {
      name: 'OpenAI',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: openai,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-2',
    type: 'NodeNode',
    data: {
      name: 'Anthropic',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: Anthropic,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-6',
    type: 'NodeNode',
    data: {
      name: 'Llama',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: meta,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-3',
    type: 'NodeNode',
    data: {
      name: 'Gemini',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: google,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-4',
    type: 'NodeNode',
    data: {
      name: 'Perplexity',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: perplexity,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'llm-5',
    type: 'NodeNode',
    data: {
      name: 'AWS',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 2,
      bgcolor: '#ffe682',
      headColor: '#f5d65b',

      img: aws,
      category: 'LLMs',
      sources: ['system', 'prompt'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },

  {
    id: 'mllm-1',
    type: 'NodeNode',
    data: {
      name: 'GPT-4 Vision',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 3,
      bgcolor: '#c382ff',

      img: openai,
      category: 'Multi-Modal',
      sources: ['system', 'prompt', 'image'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'mllm-2',
    type: 'NodeNode',
    data: {
      name: 'Anthropic Vision',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 3,
      bgcolor: '#c382ff',

      img: Anthropic,
      category: 'Multi-Modal',
      sources: ['system', 'prompt', 'image'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'mllm-3',
    type: 'NodeNode',
    data: {
      name: 'Gemini Vis',
      isInput: true,
      isType: false,
      rightHandles: 1,
      leftHandles: 3,
      bgcolor: '#c382ff',

      img: google,
      category: 'Multi-Modal',
      sources: ['system', 'prompt', 'image'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'database-3',
    type: 'NodeNode',
    data: {
      name: 'Database Loader',
      isInput: false,
      isType: false,
      rightHandles: 1,
      leftHandles: 0,
      bgcolor: '#f57e2a',
      img: databaseLoader,
      category: 'Knowledge Base',
      sources: [],
      targets: ['Database'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'database-1',
    type: 'NodeNode',
    data: {
      name: 'Database (RAG)',
      desc: 'Fetches only the relevant text chunks from the database',
      isInput: false,
      isType: false,
      rightHandles: 1,
      leftHandles: 1,
      bgcolor: '#f57e2a',
      img: database,
      category: 'Knowledge Base',
      sources: ['query'],
      targets: ['results'],
      fieldValue1: '',
      fieldValue2: '',
      constantValueList : [{
        name: 'Max Chunk Size',
        value: 1000,
        placeholder: 'Exactly what it says',
      },
      {
        name: 'Chunk Overlap',
        value: 200,
        placeholder: 'Overlap between chunks',
      },
      {
        name: 'Number of Chunks',
        value: 5,
        placeholder: 'Total number of chunks',
      }
    ]
    },
  },
  {
    id: 'database-4',
    type: 'NodeNode',
    data: {
      name: 'Database Output',
      desc: 'Save pipeline output in a new database',
      isInput: true,
      isType: false,
      rightHandles: 0,
      leftHandles: 1,
      bgcolor: '#f57e2a',
      img: databaseRes,
      category: 'Knowledge Base',
      sources: ['results'],
      // targets: ['results'],
      fieldValue1: '',
      fieldValue2: '',
    },
  },
  {
    id: 'database-2',
    type: 'NodeNode',
    data: {
      name: 'Chat Memory',
      isInput: false,
      isType: false,
      rightHandles: 1,
      leftHandles: 0,
      bgcolor: '#f57e2a',
      img: chat,
      category: 'Knowledge Base',
      sources: [],
      targets: ['Chat'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'newNode-6',
    type: 'NodeNode',
    data: {
      name: 'Gmail',
      desc: 'Read emails, create drafts or just send one!',
      Nodestate: ['Create draft', 'Send email', 'Read emails'],
      isInput: false,
      isType: false,
      bgcolor: '#ea4335',
      rightHandles: 0,
      leftHandles: 0,
      sources: ['Message'],
      targets: ['Emails'],
      fieldValue1: {},
      img: gmail,
      category: 'Integrations',
    },
  },

  {
    id: 'newNode-1',
    type: 'NodeNode',
    data: {
      name: 'Discord',
      desc: 'Our discord bot will send messages to your requested channel',
      isInput: true,
      isType: false,
      bgcolor: '#5865F2',
      rightHandles: 0,
      leftHandles: 1,
      fieldValue1: '',
      sources: ['Message Content'],
      img: discord,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-4',
    type: 'NodeNode',
    data: {
      name: 'GDocs',
      desc: 'Read or create a document',
      Nodestate: ['Read Doc', 'Create Doc'],
      isInput: false,
      isType: false,
      bgcolor: '#636ff2',
      rightHandles: 0,
      leftHandles: 0,
      img: gdocs,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-3',
    type: 'NodeNode',
    data: {
      name: 'Google Meet',
      desc: 'Reads the transcript of a Google Meet session based on the provided title or filename. You need a Google Workspace Business Standard or higher subscription.',
      isInput: true,
      isType: false,
      bgcolor: '#34d4ed',
      rightHandles: 1,
      leftHandles: 0,
      targets: ['Transcript'],
      fieldValue1: '',
      img: meet,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-8',
    type: 'NodeNode',
    data: {
      name: 'Notion',
      desc: "Reads data from a Notion Page.",
      isInput: true,
      isType: false,
      bgcolor: '#1a1a1a',
      rightHandles: 1,
      leftHandles: 0,
      img: notion,
      targets: ['Page Data'],
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-2',
    type: 'NodeNode',
    data: {
      name: 'Airtable',
      desc: 'Read data from an Airtable table. You need to specify either none or at least two columns.',
      Nodestate: ['Read Airtable'],
      isInput: false,
      isType: false,
      bgcolor: '#ebdb34',
      rightHandles: 1,
      leftHandles: 0,
      targets: ['Table'],
      fieldValue1: '',
      img: airtable,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-21',
    type: 'NodeNode',
    data: {
      name: 'GSheets',
      desc: 'Reads data from a Google Sheet based on the provided identifier (title, link, or sheet ID).',
      Nodestate: ['Read Sheet'],
      isInput: false,
      isType: false,
      bgcolor: '#0F9D58',
      rightHandles: 1,
      leftHandles: 0,
      targets: ['Sheet Data'],
      fieldValue1: '',
      img: sheet,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-5',
    type: 'NodeNode',
    data: {
      name: 'GForms',
      desc: 'Reads a Google Form based on the provided identifier (title, link, or form ID).',
      isInput: true,
      isType: false,
      bgcolor: '#9434ed',
      rightHandles: 1,
      leftHandles: 0,
      targets: ['Form Data'],
      fieldValue1: '',
      img: forms,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-59',
    type: 'NodeNode',
    data: {
      name: 'API',
      desc: 'Connect to any external API. The input should be a dictionary like: {"url" : "", "method" : "", "headers" : "", etc.} Tip: You can use an LLM to further process and format the data.',
      isInput: true,
      isType: false,
      bgcolor: '#1e76fa',
      rightHandles: 1,
      leftHandles: 0,
      targets: ['API Data'],
      fieldValue1: '',
      img: api,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-7',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: slack,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-9',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: obsidian,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-10',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 1,
      leftHandles: 1,
      img: aws,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-13',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: gdrive,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-12',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: perplexity,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-11',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: postgresql,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-14',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: azure,
      category: 'Integrations',
    },
  },
];

export { newNodesConfig };