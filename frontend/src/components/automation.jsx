import { useState } from "react";
import Trash from "../assets/trash.svg";
import Code from "../assets/code.png";
import Play from "../assets/play.png";
import { ApiModal } from "./sub/apiModal";

export const Automation = ({ pipe }) => {
  const [hover, setHover] = useState(-1);
  const [hoverClose, setHoverClose] = useState(-1);
  const [apiPage, setApiPage] = useState(false);
  const [pipe_id, setPipe_id] = useState('');

  const handlePipeClick = (id) => {
    console.log("Clicked " + id + "!");
  };

  const handleApiClick = (id) => {
    setPipe_id(id);
    setApiPage(true);
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
        {pipe?.map((pipeline, index) => (
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
                  <button
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
                      marginRight: "2px",
                    }}
                    onClick={handlePipeClick}
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
                  <button
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
                      marginRight: "2px",
                    }}
                      onClick={()=> handleApiClick(pipeline.pipeline_id)}
                  >
                    <img
                      src={Code}
                      alt="Show API Code"
                      style={{ width: "22px", height: "22px" }}
                    />
                  </button>
                  <button
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
                      marginRight: "2px",
                    }}
                    //   onClick={handleClick}
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
      {apiPage && <ApiModal pipe_id={pipe_id} setApiPage={setApiPage}/>}
    </div>
  );
};
