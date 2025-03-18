import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import styles from "./templates.module.css";
import { ApiModal } from "./sub/apiModal";
import { delete_automated_pipeline, get_pipeline } from "../logic/auth";
import Close from "/close.png";
import Trash from "/trash.webp";
import Code from "/code.webp";
import Play from "/play.webp";

const selector = (state) => ({
  loadTemplate: state.loadTemplate,
  nodes: state.nodes,
  edges: state.edges,
  createDeployment: state.createDeployment,
});

export const Automation = ({ pipe }) => {
  const [pipeList, setPipe] = useState(pipe);
  const [hover, setHover] = useState(-1);
  const [hoverClose, setHoverClose] = useState(-1);
  const [hoverDeleteClose, setHoverDeleteClose] = useState(-1);
  const [apiPage, setApiPage] = useState(false);
  const [pipe_id, setPipe_id] = useState("");
  const [deletePipe, setDeletePipe] = useState(0);
  const navigate = useNavigate();

  const { loadTemplate, nodes, edges, createDeployment } = useStore(selector, shallow);

  const handlePipeClick = async (pipeline_id) => {
    console.log("Clicked " + pipeline_id + "!");

    async function fetchData() {
      try {
        const data = await get_pipeline(pipeline_id);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }
    }

    const pipeline_template = await fetchData();
    const formattedNodes = pipeline_template.formattedNodes;
    const formattedEdges = pipeline_template.formattedEdges;


    // Setup for deployment
    try {
      console.log('Sent information to backend');
      const response = await axios.post('http://127.0.0.1:8000/private/pipelines/parse', {
        formattedNodes,
        formattedEdges
      });
      
      const { num_nodes, num_edges, is_dag, is_con, inp, out, integration_input, integration_output, output } = response.data;
      // console.log("input:", inp, "output:", out, "integration_input:", integration_input, "integration_output:", integration_output);
      if (!is_dag)
        alert(` Invalid pipeline! \n A cycle has been detected!`);
      else if (!is_con)
        alert(` Invalid pipeline! \n Graph is not connected! \n`);
      else if ((inp.length < 1 && integration_input.length < 1) || (out.length < 1 && integration_output.length < 1))
        alert(` Invalid pipeline! You need at least 1 input and 1 output node (or integrations with 1 input or 1 output). \n Number of input nodes: ${inp.length} \n Number of output nodes: ${out.length} \n Make sure you have named all your input and output nodes`);
      else
        createDeployment(inp, out, integration_input, integration_output);
      // navigate to deployment
      navigate('/deployment');
    } catch (error) {
      console.error('Error sending pipeline data:', error);
      alert('Error occurred while processing the pipeline!');
    }



  };

  const handleApiClick = (id) => {
    setPipe_id(id);
    setApiPage(true);
  };

  const handleDeleteModalClose = () => {
    setDeletePipe(0);
    setHoverDeleteClose(-1);
  };

  const deletePipeline = async () => {
    console.log(deletePipe);
    await delete_automated_pipeline(deletePipe);
    setPipe((prevPipe) =>
      prevPipe.filter((pipeline) => pipeline.pipeline_id !== deletePipe)
    );
    setDeletePipe(0);
    setHoverDeleteClose(-1);
  };

  return (
    <div
      style={{
        height: "89vh",
        width: "99vw",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        borderRadius: "10px",
        overflowY: "auto",
        flexDirection: "column",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "20px", color: "#2d4ecf" }}
      >
        Your Automations ⚡
      </h1>
      <ul
        style={{ listStyle: "none", padding: "0", transition: "all 0.2s ease" }}
      >
        {pipeList?.map((pipeline, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              backgroundColor: hover === index ? "#ebebeb" : "#fff",
              borderRadius: "12px",
              margin: "0px 10px",
              transition: "all 0.1s ease-in-out",
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(-1)}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <strong>{index + 1}. &nbsp;</strong>
              <div>
                <strong
                  style={{ textDecoration: hover === index ? "underline" : "" }}
                >
                  {pipeline.name}
                </strong>
                <br />
                <small style={{ color: "gray" }}>
                  ID: {pipeline.pipeline_id}
                </small>

                {/* On Hover */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxHeight: hover === index ? "50px" : "0px",
                    opacity: hover === index ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.3s ease-out",
                    marginTop: hover === index ? "5px" : "0px",
                  }}
                >
                  {/* Load Pipeline */}
                  <button
                  title="Load Pipeline"
                    onMouseEnter={() => setHoverClose(-2000 - index)}
                    onMouseLeave={() => setHoverClose(-1)}
                    style={{
                      backgroundColor:
                        hoverClose === -2000 - index ? "#d9d9d9" : "#ebebeb",
                      position: "relative",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      borderRadius: "50%",
                      transition: "all 0.2s ease",
                      padding: "5px 5px",
                      marginRight: "4px",
                    }}
                    onClick={()=> handlePipeClick(pipeline.pipeline_id)}
                  >
                    <img
                      src={Play}
                      alt="Load Pipeline"
                      style={{
                        width: "18px",
                        height: "18px",
                        padding: "2px 2px",
                      }}
                    />
                  </button>
                  {/* Show API Doc */}
                  <button
                  title="Show API Docs"
                    onMouseEnter={() => setHoverClose(-2 - index)}
                    onMouseLeave={() => setHoverClose(-1)}
                    style={{
                      backgroundColor:
                        hoverClose === -2 - index ? "#d9d9d9" : "#ebebeb",
                      position: "relative",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      borderRadius: "50%",
                      transition: "all 0.2s ease",
                      padding: "5px 5px",
                      marginRight: "4px",
                    }}
                    onClick={() => handleApiClick(pipeline.pipeline_id)}
                  >
                    <img
                      src={Code}
                      alt="Show API Code"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </button>
                  {/* Delete Pipeline */}
                  <button
                  title="Delete Pipeline"
                    onMouseEnter={() => setHoverClose(index)}
                    onMouseLeave={() => setHoverClose(-1)}
                    style={{
                      backgroundColor:
                        hoverClose === index ? "#d9d9d9" : "#ebebeb",
                      position: "relative",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      borderRadius: "50%",
                      transition: "all 0.2s ease",
                      padding: "5px 5px",
                      marginRight: "4px",
                    }}
                    onClick={() => setDeletePipe(pipeline.pipeline_id)}
                  >
                    <img
                      src={Trash}
                      alt="Delete Pipeline"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* API Modal */}
      {apiPage && <ApiModal pipe_id={pipe_id} setApiPage={setApiPage} />}

      {/* Delete Modal */}
      {deletePipe != 0 && (
        <div
          style={{ opacity: deletePipe != 0 ? 1 : 0 }}
          className={styles.save}
        >
          <span
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#000",
              marginLeft: "15px",
              marginTop: "10px",
            }}
          >
            Delete Pipeline
          </span>
          <div
            style={{
              fontSize: "12px",
              // fontWeight: "600",
              color: "#000",
              marginLeft: "15px",
              marginTop: "14px",
              marginBottom: "8px",
            }}
          >
            Are you sure you want to delete pipeline with ID: {deletePipe}? This
            is an irreversible action.
          </div>
          <button onClick={deletePipeline} className={styles.saveButton}>
            Delete
          </button>

          <button
            onMouseEnter={() => setHoverDeleteClose(1)}
            onMouseLeave={() => setHoverDeleteClose(-1)}
            style={{
              backgroundColor: hoverDeleteClose === 1 ? "#d1d1d1" : "#fff",
              height: "30px", // Fixed size to match the container
              width: "30px", // Fixed size to match the container
              position: "absolute",
              top: "14%", // Center vertically
              left: "93%", // Center horizontally
              transform: "translate(-50%, -50%)", // Adjust for exact centering
              border: "none",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "50%",
              transition: "background-color 0.2s ease", // Only animate background color
            }}
            onClick={() => handleDeleteModalClose()}
          >
            <img
              src={Close}
              alt="Close"
              style={{ width: "22px", height: "22px" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
