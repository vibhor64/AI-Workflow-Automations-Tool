// store.js

import { create } from "zustand";
import { defaultNodes } from "./nodes/nodes"
import { defaultEdges } from "./nodes/edges"
import { templateNodes } from "./components/templateNodes";
// import { TemplateBooks } from "./components/templateBooks";

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  templateWorkflows: templateNodes,
  deploymentVariables: {},
  database: [],
  nodeIDs: (() => {
    // Initialize nodeIDs based on the defaultNodes
    const ids = {};
    defaultNodes.forEach((node) => {
      const [type, count] = node.id.split('-');
      const number = parseInt(count, 10);
      if (!isNaN(number)) {
        ids[type] = Math.max(ids[type] || 0, number);
      }
    });
    return ids;
  })(),
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  clearCanvas: () => {
    set({
      nodes: [],
      edges: []
    });
  },
  loadTemplate: (template) => {
    set({
      nodes: template.nodes,
      edges: template.edges
    });
  },
  addTemplate: (template) => {
    set({
      templateWorkflows: [...get().templateWorkflows, template],
    });
  },
  createDeployment: (inp, out, integration) => {
    set({
      deploymentVariables: { "inputs": inp, "outputs": out, "integration": integration },
    });
  },
  addBooks: (books) => {
    if (books.length === 0) {return}
    else if (books.length ===1 ){
      const newBook = [{
        id: get().database.length + 1,
        name: books[0].name,
        text: books[0].text,
        urls: books[0].urls
      }];
      if (newBook[0].name === "" && newBook[0].text === "" && newBook[0].urls.length === 0){
        console.log(newBook);
        return;
      }
      set({
        database: [...get().database, ...newBook],
      });
    }
    else{
      set({
        database: [...get().database, ...books],
      });
    }
    
  },
  modifyBook: (book) => {
    const currentDatabase = get().database;
    const bookExists = currentDatabase.some((b) => b.id === book.id);

    if (bookExists) {
      set({
        database: currentDatabase.map((b) =>
          b.id === book.id ? { ...b, ...book } : b
        ),
      });
    } else {
      console.warn(`Book with name "${book.name}" does not exist.`);
    }
  },
  deleteBook: (book) => {
    const currentDatabase = get().database;
    const bookExists = currentDatabase.some((b) => b.id === book.id);
  
    if (bookExists) {
      set({
        database: currentDatabase.filter((b) => b.id !== book.id),
      });
    } else {
      console.warn(`Book with id "${book.id}" does not exist.`);
    }
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '40px', color: '#aaa' } }, get().edges),
    });
  },
  // updateNodeField: (nodeId, fieldName, fieldValue) => {
  //   set({
  //     nodes: get().nodes.map((node) => {
  //       if (node.id === nodeId) {
  //         node.data = { ...node.data, [fieldName]: fieldValue };
  //         console.log('lefthandles in store: ', node.data.leftHandles)
  //       }
  //       return node;
  //     }),
  //   });
  // },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => {
      const updatedNodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      });
      get().onNodesChange([{ id: nodeId, type: 'update' }]); // Notify ReactFlow
      return { nodes: updatedNodes };
    });
  },
}));
