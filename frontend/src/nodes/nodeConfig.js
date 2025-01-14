import Input from '../assets/input.png';
import Output from '../assets/output.png';
import Anthropic from '../assets/anthropic.png';
import aws from '../assets/aws.png';
import azure from '../assets/azure.png';
import database from '../assets/database.png';
import text from '../assets/text.png';
import discord from '../assets/discord.png';
import file from '../assets/file.png';
import gdocs from '../assets/gdocs.png';
import gdrive from '../assets/gdrive.png';
import gmail from '../assets/gmail.png';
import google from '../assets/google.png';
import notion from '../assets/notion.png';
import obsidian from '../assets/obsidian.png';
import openai from '../assets/openai.png';
import perplexity from '../assets/perplexity.png';
import postgresql from '../assets/postgresql.png';
import s3 from '../assets/s3.png';
import meta from '../assets/meta.svg';
import chat from '../assets/chat.png';

const newNodesConfig = [
  {
    id: 'Input-1',
    type: 'NodeNode',
    data: {
      name: 'Input',
      isInput: true,
      isType: true,
      bgcolor: '#5b96f5',
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
      bgcolor: '#76c965',
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
      bgcolor: '#5b96f5',
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
      bgcolor: '#5b96f5',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
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
      desc: 'This is a LLM.',
      img: google,
      category: 'Multi-Modal',
      sources: ['system', 'prompt', 'image'],
      targets: ['response'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },

  {
    id: 'database-1',
    type: 'NodeNode',
    data: {
      name: 'Database',
      isInput: false,
      isType: false,
      rightHandles: 1,
      leftHandles: 1,
      bgcolor: '#ff9382',
      img: database,
      category: 'Knowledge Base',
      sources: ['query'],
      targets: ['results'],
      fieldValue1: '',
      fieldValue2: ''
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
      bgcolor: '#ff9382',
      img: chat,
      category: 'Knowledge Base',
      sources: [],
      targets: ['Chat'],
      fieldValue1: '',
      fieldValue2: ''
    },
  },
  {
    id: 'newNode-1',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: discord,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-2',
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
    id: 'newNode-8',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: notion,
      category: 'Integrations',
    },
  },
  {
    id: 'newNode-5',
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
    id: 'newNode-6',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: gmail,
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
    id: 'newNode-3',
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
  {
    id: 'newNode-4',
    type: 'NodeNode',
    data: {
      name: 'Coming Soon',
      isInput: false,
      isType: false,
      bgcolor: '#e76f51',
      rightHandles: 0,
      leftHandles: 0,
      img: gdocs,
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
      img: s3,
      category: 'Integrations',
    },
  },
];

export { newNodesConfig };