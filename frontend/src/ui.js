// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { NewNode } from './nodes/newNode';
import { newNodesConfig } from './nodes/nodeConfig';
import RocketImg from './assets/rocket.png';
import axios from 'axios';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  NodeNode: NewNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        const configId = appData?.configId;


        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeConfig = newNodesConfig.find((node) => node.id === configId);
        if (!nodeConfig) {
          console.warn(`No configuration found for node type: ${nodeConfig}`);
          return;
        }

        const newNode = {
          id: getNodeID(type),
          type: nodeConfig.type,
          position,
          data: nodeConfig.data,
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const sendPipelineData = async () => {

    const formattedNodes = nodes.map(node => ({
      id: node.id,
      type: node.type,
    }));

    const formattedEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    console.log(JSON.stringify({ formattedNodes, formattedEdges }, null, 2));

    try {
      const response = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
        formattedNodes,
        formattedEdges
      });
      console.log('Response:', response.data);
      const { num_nodes, num_edges, is_dag } = response.data;
      if (is_dag)
        alert(`Number of Nodes: ${num_nodes} \n Number of Edges: ${num_edges} \n No cycle found in graph!`);
      else
        alert(`Number of Nodes: ${num_nodes} \n Number of Edges: ${num_edges} \n A cycle has been detected!`);
    } catch (error) {
      console.error('Error sending pipeline data:', error);
      alert('Error occurred while processing the pipeline!');
    }
  };

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100wv', height: '82vh', backgroundColor: '#ffffff', borderRadius: '10px' }} className='big-man'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>

        <div style={{ display: 'flex', position: 'absolute', bottom: '10px', height: '10vh', alignItems: 'center', justifyContent: 'center', transform: 'translate(-50%, -10%)', left: '50%' }}>
          <button
            style={{
              backgroundColor: '#5b96f5',
              borderRadius: '10px',
              border: '2px solid #5b96f5',
              color: '#fff',
              cursor: 'pointer',
              display: 'inline-block',
              // fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: 700,
              listStyle: 'none',
              margin: '0',
              padding: '11px 13px',
              textAlign: 'center',
              transition: 'all 200ms',
              verticalAlign: 'baseline',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              touchAction: 'manipulation',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={sendPipelineData}
            type="submit">Run 
            <img src={RocketImg} style={{width: '20px', height: '20px', marginLeft: '5px',}}/>
            </button>
        </div>
      </div>
    </>
  )
}
