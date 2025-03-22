// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap, useUpdateNodeInternals } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { NewNode } from "./nodes/newNode";
import { newNodesConfig } from "./nodes/nodeConfig";
import RocketImg from "/rocket.png";
import Reset from "/reset.png";
import Help from "/help.svg";
import axios from "axios";
import { Templates } from "./components/templates";
import { useNavigate } from "react-router-dom";
// import './CreateDatabase.css';

import "reactflow/dist/style.css";
import Onboarding from "./components/onboarding";

const gridSize = 10;
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
    
    const [hover, setHover] = useState(false);
    const [onboarding, setOnboarding] = useState(false);
    if (!sessionStorage.getItem("new_user")){
        sessionStorage.setItem("new_user", "1");
        setOnboarding(true);
    } 

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData("application/reactflow")) {
                const appData = JSON.parse(
                    event.dataTransfer.getData("application/reactflow")
                );
                const type = appData?.nodeType;
                const configId = appData?.configId;

                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeConfig = newNodesConfig.find(
                    (node) => node.id === configId
                );
                if (!nodeConfig) {
                    console.warn(
                        `No configuration found for node type: ${nodeConfig}`
                    );
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
        event.dataTransfer.dropEffect = "move";
    }, []);

    const sendPipelineData = async () => {
        const formattedNodes = nodes.map((node) => ({
            id: node.id,
            name: node.data.name,
            username: node.data.username || "",
            rightHandles: node.data.rightHandles,
            leftHandles: node.data.leftHandles,
            sources: node.data.sources || [],
            targets: node.data.targets || [],
            fieldValue1: node.data.fieldValue1 || "",
            fieldValue2: node.data.fieldValue2 || "",
        }));

        const formattedEdges = edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
        }));

        // console.log(JSON.stringify({ formattedNodes, formattedEdges }, null, 2));
        console.log(formattedNodes);
        // console.log(formattedEdges);
        // saveJSONFile(nodes, 'nodes.json');
        // saveJSONFile(edges, 'edges.json');

        try {
            console.log("Sent information to backend");
            const response = await axios.post(
                "http://127.0.0.1:8000/private/pipelines/parse",
                {
                    formattedNodes,
                    formattedEdges,
                }
            );
            // console.log('Response:', response.data);
            const {
                num_nodes,
                num_edges,
                is_dag,
                is_con,
                inp,
                out,
                integration_input,
                integration_output,
                output,
            } = response.data;
            // console.log("input:", inp, "output:", out, "integration_input:", integration_input, "integration_output:", integration_output);
            if (!is_dag)
                alert(` Invalid pipeline! \n A cycle has been detected!`);
            else if (!is_con)
                alert(` Invalid pipeline! \n Graph is not connected! \n`);
            else if (
                (inp.length < 1 && integration_input.length < 1) ||
                (out.length < 1 && integration_output.length < 1)
            )
                alert(
                    ` Invalid pipeline! You need at least 1 input and 1 output node (or integrations with 1 input or 1 output). \n Number of input nodes: ${inp.length} \n Number of output nodes: ${out.length} \n Make sure you have named all your input and output nodes`
                );
            // alert(` Number of Nodes: ${num_nodes} \n Number of Edges: ${num_edges} \n No cycle found in graph! \n Output: ${output}`);
            else
                alert(
                    `Deployment Successful! Head over to Deployment tab to access your pipeline`
                );
            // console.log(inp, out, integration_input, integration_output);
            createDeployment(inp, out, integration_input, integration_output);
        } catch (error) {
            console.error("Error sending pipeline data:", error);
            alert("Error occurred while processing the pipeline!");
        }
    };

    return (
        <>
            <div
                ref={reactFlowWrapper}
                style={{
                    height: "80.8vh",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    display: "flex",
                    width: "99vw",
                }}
                className="big-man">
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
                    deleteKeyCode={["Delete"]}
                    onAnimationEnd={useUpdateNodeInternals}
                    connectionLineType="smoothstep">
                    <Background color="#808080" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>

                {/* Run 🚀 */}
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        bottom: "10px",
                        height: "10vh",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "translate(-50%, -10%)",
                        left: "50%",
                    }}>
                    <button
                        onMouseEnter={() => setHover(1)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                            background: `linear-gradient(to right, rgb(153, 183, 231),rgb(59, 128, 239))`,
                            borderRadius: "10px",
                            // border: '2px solid #5b96f5',
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            display: "inline-block",
                            // fontFamily: 'Inter',
                            fontSize: "18px",
                            fontWeight: 700,
                            listStyle: "none",
                            margin: "0",
                            padding: "11px 13px",
                            textAlign: "center",
                            transition: "all 0.1s",
                            verticalAlign: "baseline",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            touchAction: "manipulation",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={sendPipelineData}
                        type="submit">
                        Run
                        <img
                            src={RocketImg}
                            style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "5px",
                                transform: hover
                                    ? "rotate(360deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.5s ease-in-out",
                                background: hover
                                    ? "linear-gradient(to right, red, yellow)" // Gradient color
                                    : "white", // Default color
                                background: "linear-gradient(to right, red, yellow)", // Default color
                                WebkitMaskImage: `url(${RocketImg})`, // Use the rocket as a mask
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskSize: "contain",
                                maskImage: `url(${RocketImg})`, // Standard mask
                                maskRepeat: "no-repeat",
                                maskSize: "contain",
                            }}
                        />
                    </button>
                </div>

                {/* Reset 🔄 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        bottom: "3px",
                        height: "10vh",
                        alignItems: "center",
                        justifyContent: "center",
                        right: "15rem",
                    }}>
                    <button
                        style={{
                            backgroundColor: "#d1d1d1",
                            borderRadius: "10px",
                            border: "0px solid #d1d1d1",
                            color: "#fff",
                            cursor: "pointer",
                            display: "inline-block",
                            // fontFamily: 'Poppins',
                            fontSize: "18px",
                            fontWeight: 700,
                            listStyle: "none",
                            margin: "0",
                            padding: "5px 5px",
                            textAlign: "center",
                            transition: "all 200ms",
                            verticalAlign: "baseline",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            touchAction: "manipulation",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow:
                                " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                        onClick={clearCanvas}
                        type="submit">
                        <img
                            src={Reset}
                            alt="Reset"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </button>
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#d1d1d1",
                            marginTop: "2px",
                            fontWeight: 500,
                        }}>
                        Reset
                    </p>
                </div>

                {/* Help */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        bottom: "60px",
                        height: "10vh",
                        alignItems: "center",
                        justifyContent: "center",
                        right: "15rem",
                    }}>
                    <button
                        style={{
                            backgroundColor: "#d1d1d1",
                            borderRadius: "10px",
                            border: "0px solid #d1d1d1",
                            color: "#fff",
                            cursor: "pointer",
                            display: "inline-block",
                            // fontFamily: 'Poppins',
                            fontSize: "18px",
                            fontWeight: 700,
                            listStyle: "none",
                            margin: "0",
                            padding: "5px 5px",
                            textAlign: "center",
                            transition: "all 200ms",
                            verticalAlign: "baseline",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            touchAction: "manipulation",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow:
                                " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                        onClick={()=>setOnboarding(true)}
                        type="submit" title="Help">
                        <img
                            src={Help}
                            alt="Help"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </button>
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#d1d1d1",
                            marginTop: "2px",
                            fontWeight: 500,
                        }}>
                        Help
                    </p>
                </div>
                <Templates />
                {onboarding && 
                <Onboarding setOnboarding={setOnboarding}/>}
            </div>
        </>
    );
};
