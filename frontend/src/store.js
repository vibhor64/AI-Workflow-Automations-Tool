// store.js

import { create } from "zustand";
import { defaultNodes } from "./nodes/nodes"
import { defaultEdges } from "./nodes/edges"
import { templateNodes } from "./components/templateNodes";
import { pushBook, deleteBook as removeBook, modifyBook as editBook } from "./logic/auth";
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
  nodeIDs: {},
  updateNodeIDTracking: (nodes) => {
    const currentIDs = { ...get().nodeIDs };

    nodes.forEach((node) => {
      const [type, count] = node.id.split('-');
      const number = parseInt(count, 10);

      if (!isNaN(number)) {
        currentIDs[type] = Math.max(currentIDs[type] || 0, number);
      }
    });

    set({ nodeIDs: currentIDs });
  },
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      // Initialize by scanning all nodes including template nodes
      get().updateNodeIDTracking([
        ...get().nodes,
        ...get().templateWorkflows.flatMap(template => template.nodes)
      ]);
      newIDs[type] = get().nodeIDs[type] || 0;
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
      edges: [],
    });
  },
  loadTemplate: (template) => {
    // Create deep copies of the template data to prevent reference issues
    const templateNodes = template.nodes.map(node => ({
      ...node,
      data: { ...node.data }  // Deep copy the node data
    }));
    const templateEdges = template.edges.map(edge => ({ ...edge }));

    // Update ID tracking to consider template nodes
    get().updateNodeIDTracking(templateNodes);

    // Set the new template state with copied data
    set({
      nodes: templateNodes,
      edges: templateEdges
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
    if (books.length === 0) { return }
    else if (books.length === 1) {
      const newBook = [{
        id: String(get().database.length + 1),
        name: books[0].name,
        text: books[0].text,
        urls: books[0].urls
      }];
      if (newBook[0].name === "" && newBook[0].text === "" && newBook[0].urls.length === 0) {
        console.log(newBook);
        return;
      }
      set({
        database: [...get().database, ...newBook],
      });
      let accessToken = sessionStorage.getItem("access_token");
      if (accessToken) {
        pushBook(newBook[0]);
      }
    }
    else {
      set({
        database: [...get().database, ...books],
      });
    }

  },
  modifyBook: (book) => {
    console.log(book);
    const currentDatabase = get().database;
    const bookExists = currentDatabase.some((b) => b.id === book.id);

    if (bookExists) {
      set({
        database: currentDatabase.map((b) =>
          b.id === book.id ? { ...b, ...book } : b
        ),
      });
      let accessToken = sessionStorage.getItem("access_token");
      if (accessToken) {
        editBook(book.id, book);
      }
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
      // removeBook(book.name);
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
