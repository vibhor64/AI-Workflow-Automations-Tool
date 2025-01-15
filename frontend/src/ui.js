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
import Reset from './assets/reset.png';
import axios from 'axios';
import { Templates } from './components/templates';
// import './CreateDatabase.css';

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
  clearCanvas: state.clearCanvas,
  createDeployment: state.createDeployment,
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
    onConnect,
    clearCanvas,
    createDeployment,
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

  const saveJSONFile = (data, fileName) => {
    const fileData = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
    const url = URL.createObjectURL(fileData);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendPipelineData = async () => {

    const formattedNodes = nodes.map(node => ({
      id: node.id,
      name: node.data.name,
      rightHandles: node.data.rightHandles,
      leftHandles: node.data.leftHandles,
      sources: node.data.sources || [],
      targets: node.data.targets || [],
      fieldValue1: node.data.fieldValue1 || '',
      fieldValue2: node.data.fieldValue2 || '',
    }));

    const formattedEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle
    }));

    // console.log(JSON.stringify({ formattedNodes, formattedEdges }, null, 2));
    // console.log(edges);
    // console.log(nodes);
    // saveJSONFile(nodes, 'nodes.json');
    // saveJSONFile(edges, 'edges.json');

    try {
      console.log('Sent information to backend');
      const response = await axios.post('http://127.0.0.1:8000/pipelines/parse', {
        formattedNodes,
        formattedEdges
      });
      // console.log('Response:', response.data);
      const { num_nodes, num_edges, is_dag, is_con, inp, out, integration, output } = response.data;
      if (!is_dag)
        alert(` Invalid pipeline! \n A cycle has been detected!`);
      else if (!is_con)
        alert(` Invalid pipeline! \n Graph is not connected! \n`);
      else if (inp.length < 1 || out.length < 1)
        alert(` Invalid pipeline! You need at least 1 input and 1 output node. \n Number of input nodes: ${inp.length} \n Number of output nodes: ${out.length} \n Make sure you have named all your input and output nodes`);
      else
        // alert(` Number of Nodes: ${num_nodes} \n Number of Edges: ${num_edges} \n No cycle found in graph! \n Output: ${output}`);
        alert(`Deployment Successful! Head over to Deployment tab to access your pipeline`);
        console.log(inp, out, integration);
        createDeployment(inp, out, integration);
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
            <img src={RocketImg} style={{ width: '20px', height: '20px', marginLeft: '5px', }} />
          </button>
        </div>


        <div style={{ display: 'flex',flexDirection: 'column', position: 'absolute', bottom: '3px', height: '10vh', alignItems: 'center', justifyContent: 'center', right: '15%' }}>
          <button
            style={{
              backgroundColor: '#d1d1d1',
              borderRadius: '10px',
              border: '0px solid #d1d1d1',
              color: '#fff',
              cursor: 'pointer',
              display: 'inline-block',
              // fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: 700,
              listStyle: 'none',
              margin: '0',
              padding: '5px 5px',
              textAlign: 'center',
              transition: 'all 200ms',
              verticalAlign: 'baseline',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              touchAction: 'manipulation',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}
            onClick={clearCanvas}
            type="submit"><img src={Reset} style={{ width: '20px', height: '20px', }} />
          </button>
          <p style={{ fontSize: '12px', color: '#d1d1d1', marginTop: '2px', fontWeight: 500 }}>Reset</p>
        </div>
        <Templates/>
      </div>
    </>
  )
}
