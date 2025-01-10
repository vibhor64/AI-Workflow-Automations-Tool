// store.js

import { create } from "zustand";
import { defaultNodes } from "./nodes/nodes"
import { defaultEdges } from "./nodes/edges"

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  nodeIDs: (() => {
    // Initialize nodeIDs based on the defaultNodes
    const ids = {};
    defaultNodes.forEach((node) => {
      const [type, count] = node.id.split('-'); // Assume IDs are in the format "type-number"
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
