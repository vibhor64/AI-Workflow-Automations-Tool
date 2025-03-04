// newNode.js
// Blueprint for creating new nodes
// --------------------------------------------------

import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
// import { Position } from 'reactflow';
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { useRef } from "react";
import Close from "../assets/close.png";
import {
  airtable_authentication,
  discord_authentication,
  getUsername,
  google_integration_authentication,
  notion_authentication,
  validateAirtableCredentials,
  validateDiscordCredentials,
  validateGoogleCredentials,
  validateNotionCredentials,
} from "../logic/auth";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeField: state.updateNodeField,
  deleteNode: state.deleteNode,
});

export const NewNode = ({ id, data }) => {
  const {
    name,
    isInput,
    isType,
    rightHandles,
    leftHandles,
    bgcolor,
    Nodestate,
    desc,
    img,
    category,
    sources,
    targets,
    fieldValue1,
    fieldValue2,
  } = data;

  const { updateNodeField, deleteNode } = useStore(selector, shallow);

  const [status, setStatus] = useState(null);
  const [nodeState, setNodeState] = useState();
  const initialName =
    name === "GForms" ||
    name === "Google Meet" ||
    name === "Notion" ||
    name === "Discord"
      ? ""
      : fieldValue1 || `Node-${id.split("-")[1]}`;
  const initialName2 = fieldValue2 || `Node-${id.split("-")[1]}`;
  const [currName, setCurrName] = useState(initialName);
  const [currName2, setCurrName2] = useState(initialName2);
  const [inputType, setInputType] = useState(id || "Text");
  const [LH, setLH] = useState(leftHandles);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);
  const [globalHover, setGlobalHover] = useState(0);
  const [initSources, setInitSources] = useState(sources);
  const [integrationValue1, setIntegrationValue1] = useState("");
  const [integrationValue2, setIntegrationValue2] = useState("");

  useEffect(() => {
    updateNodeField(id, "fieldValue1", initialName);
    updateNodeField(id, "fieldValue2", initialName2);
  }, [id, initialName, initialName2]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    autoResize(e.target);

    // console.log('LH: ', LH, 'vars: ', variableCount)
    const matches = getVariableCount(e.target.value.trim());
    const variableCount = matches.length;
    updateHandleCount(variableCount + LH);
    updateNodeField(id, "leftHandles", variableCount + LH);
    if (!initSources) {
      setInitSources([]);
    }
    const updatedSources = initSources?.concat(matches);
    updateNodeField(id, "sources", updatedSources);

    if (name === "Input" || name === "File") {
      updateNodeField(id, "targets", [`${e.target.value}`]);
    }
    updateNodeField(id, "fieldValue1", `${e.target.value}`);
  };

  const handleNameChange2 = (e) => {
    setCurrName2(e.target.value);
    autoResize(e.target);
    updateNodeField(id, "fieldValue2", `${e.target.value}`);
  };

  const updateNodeInternals = useUpdateNodeInternals();
  const [handleCount, setHandleCount] = useState(0);
  const updateHandleCount = useCallback(
    (LHcount) => {
      setHandleCount(LHcount);
      updateNodeInternals(id);
    },
    [id, updateNodeInternals]
  );

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const getVariableCount = (name) => {
    // const regex = /\{\{.*?\}\}/g;
    const regex = /\{\{(.*?)\}\}/g;
    const matches = name
      .match(regex)
      ?.map((match) => match.replace(match, match.slice(2, -2)));
    return matches ? matches : [];
  };

  const handleIntegrationClick = () => {
    if (name === "Discord") {
      discord_authentication();
    } else if (
      name === "GDocs" ||
      name === "GSheets" ||
      name === "Google Meet" ||
      name === "Gmail"
    ) {
      google_integration_authentication();
    } else if (name === "Airtable") {
      airtable_authentication();
    } else if (name === "Notion") {
      notion_authentication();
    }
  };

  const terminateMe = () => {
    deleteNode(id);
  };

  const handleNodeStateChange = (s) => {
    // console.log("NodeState: ", Nodestate);
    setNodeState(s);
    if (Nodestate) {
      if (s === "Create draft" || s === "Send email") {
        // Update leftHandles to 1
        updateNodeField(id, "leftHandles", 1);
        updateNodeField(id, "sources", ["Message"]);
        updateNodeField(id, "rightHandles", 0);
        updateNodeField(id, "targets", []);
        if (s === "Create draft") {
          updateNodeField(id, "fieldValue1", { ...fieldValue1, isDraft: true });
        } else {
          updateNodeField(id, "fieldValue1", {
            ...fieldValue1,
            isDraft: false,
          });
        }
      } else if (s === "Read emails") {
        // Update rightHandles to 1=
        updateNodeField(id, "leftHandles", 0);
        updateNodeField(id, "sources", []);
        updateNodeField(id, "rightHandles", 1);
        updateNodeField(id, "targets", ["Emails"]);
        // updateNodeField(id, 'fieldValue1', { ...fieldValue1, 'isDraft': "read" });
      } else if (s === "Create Doc") {
        updateNodeField(id, "leftHandles", 1);
        updateNodeField(id, "sources", ["Content"]);
        updateNodeField(id, "rightHandles", 0);
        updateNodeField(id, "targets", []);
      } else if (s === "Read Doc") {
        updateNodeField(id, "leftHandles", 0);
        updateNodeField(id, "sources", []);
        updateNodeField(id, "rightHandles", 1);
        updateNodeField(id, "targets", ["Content"]);
      }
    }
    console.log(fieldValue1);
  };

  const isValidCache = useRef(null);
  useEffect(() => {
    async function fetchStatus() {
      if (Nodestate) {
        handleNodeStateChange(Nodestate[0]);
      }

      try {
        let isValid = false;
        if (
          name === "GDocs" ||
          name === "GSheets" ||
          name === "Google Meet" ||
          name === "Gmail"
        ) {
          isValid = await validateGoogleCredentials();
        } else if (name === "Discord") {
          isValid = await validateDiscordCredentials();
        } else if (name === "Airtable") {
          // todo
          isValid = await validateAirtableCredentials();
        } else if (name === "Notion") {
          isValid = await validateNotionCredentials();
        }
        // Cache the isValid value
        isValidCache.current = isValid;
        setStatus(isValid ? true : false);
      } catch (error) {
        setStatus(false);
      }

      if (category==="Integrations"){
        const curr_username = await getUsername();
        updateNodeField(id, "username", curr_username);
      }
    }

    fetchStatus();
  }, []);
  const getCachedIsValid = () => isValidCache.current;

  const handleIntegrationValue1 = (s) => {
    setIntegrationValue1(s);
    updateNodeField(id, "fieldValue1", { ...fieldValue1, 1: s }); // to, max_results, doc indentifier

    if (name != "Gmail" && name != "GSheets" && name != "Airtable") {
      const matches = getVariableCount(s.trim());
      const variableCount = matches.length;
      updateHandleCount(variableCount + LH);
      updateNodeField(id, "leftHandles", variableCount + LH);
      if (!initSources) {
        setInitSources([]);
      }
      const updatedSources = initSources?.concat(matches);
      updateNodeField(id, "sources", updatedSources);
    }
  };

  const handleIntegrationValue2 = (s) => {
    setIntegrationValue2(s);
    updateNodeField(id, "fieldValue1", { ...fieldValue1, 2: s }); // labels

    const matches = getVariableCount(s.trim());
    const variableCount = matches.length;
    updateHandleCount(variableCount + LH);
    updateNodeField(id, "leftHandles", variableCount + LH);
    if (!initSources) {
      setInitSources([]);
    }
    const updatedSources = initSources?.concat(matches);
    if (name === "Gmail") {
      updateNodeField(id, "sources", matches);
    } else {
      updateNodeField(id, "sources", updatedSources);
    }
  };

  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.paddingBottom = "0px";
  };

  return (
    <div
      style={{
        width: 200,
        minHeight: 60,
        border: "0px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: bgcolor ? bgcolor : "#3c859e",
        borderRadius: "8px",
        boxShadow:
          " rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        color: "#fff",
        fontSize: "11px",
        fontWeight: "400",
        padding: "3px 2px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "9px",
          borderTopRightRadius: "9px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        {sources?.map((source, index) => (
          <p
            key={index}
            style={{
              position: "absolute",
              right: "210px",
              top: `${(index + 1) * (100 / (leftHandles + 1)) - 5}%`,
              color: "#7d7d7d",
              fontWeight: 400,
            }}
          >
            {source}
          </p>
        ))}

        {Array.from({ length: leftHandles }, (_, index) => (
          <Handle
            key={`${id}-left-handle-${index}`}
            isConnectable={true}
            type="target"
            isConnectableEnd={true}
            position={Position.Left}
            id={`${id}-left-handle-${index}`}
            style={{ top: `${(index + 1) * (100 / (leftHandles + 1))}%` }}
          />
        ))}

        {/* Delete Node Button */}
        <button
          onMouseEnter={() => setHoverClose(1)}
          onMouseLeave={() => setHoverClose(0)}
          style={{
            backgroundColor: hoverClose===1 ? "#e0e0e0" : "#fff",
            height: "20px", // Fixed size to match the container
            width: "20px", // Fixed size to match the container
            position: "absolute",
            top: "15px", // Center vertically
            left: "92%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust for exact centering
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            borderRadius: "50%",
            transition: "background-color 0.2s ease", // Only animate background color
          }}
          onClick={() => deleteNode(id)}
        >
          <img
            src={Close}
            alt="Close"
            style={{ width: "13px", height: "13px" }}
          />
        </button>

        {/* Node Name */}
        <div
          style={{
            display: "flex",
            paddingTop: "5px",
            paddingBottom: "5px",
            fontSize: "14px",
            fontWeight: "700",
            color: bgcolor ? bgcolor : "#3c859e",
            marginLeft: "10px",
          }}
        >
          <span>{name}</span>
        </div>

        {/* Node Image */}
        {category === "LLMs" ||
        category === "Multi-Modal" ||
        category === "Knowledge Base" ||
        name === "File" ? (
          <>
            <img
              alt="logo"
              src={img}
              style={{
                width: "40px",
                height: "40px",
                alignSelf: "center",
                marginBottom: "10px",
              }}
            />
          </>
        ) : null}

        <div
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* Node Description */}
          {desc && (
            <div
              style={{
                display: "flex",
                paddingTop: "5px",
                paddingBottom: "10px",
                fontSize: "10px",
                fontWeight: "600",
                color: "#5e5e5e",
                textAlign: "center",
              }}
            >
              {desc}
            </div>
          )}

          {/* Node State (read or write) for integrations and triggers only*/}
          {nodeState && (
            <>
              {name != "GSheets" && name != "Airtable" && (
                <label
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    marginLeft: "2px",
                    marginTop: "2px",
                    gap: "8px",
                    flexDirection: "column",
                  }}
                >
                  <select
                    value={nodeState}
                    onChange={(e) => handleNodeStateChange(e.target.value)}
                    onMouseEnter={() => setGlobalHover(2)}
                    onMouseLeave={() => setGlobalHover(0)}
                    style={{
                      backgroundColor:
                        globalHover === 2 ? "#6e7af5" : "#5865F2",
                      padding: "3px 2px",
                      borderRadius: "4px",
                      border:
                        globalHover === 2
                          ? "2px solid #6e7af5"
                          : `2px solid #5865F2`,
                      color: "#fff",
                      // backgroundColor: '#fff',
                      fontSize: "12px",
                      paddingLeft: "20px",
                      paddingRight: "15px",
                      fontWeight: 600,
                      marginLeft: "1px",
                      cursor: "pointer",
                      outline: "none",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow =
                        "0 0 5px rgba(128, 72, 199, 0.5)")
                    }
                    // onBlur={(e) => (e.target.style.boxShadow = 'rgba(0, 0, 0, 0.24) 0px 3px 8px;')}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  >
                    {Nodestate?.map((state, index) => (
                      <option
                        key={index}
                        value={state}
                        style={{ fontWeight: 600 }}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {nodeState === "Create draft" || nodeState === "Send email" ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Receiver's Email Addresses
                    </span>
                    <textarea
                      value={integrationValue1}
                      // ref={textareaRef}
                      onInput={handleInput}
                      onChange={(e) => handleIntegrationValue1(e.target.value)}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      onFocus={() => setIsFocused(3)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Eg. m@gmail.com, a@b.com"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${isFocused ? bgcolor : "#fff"}`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused === 3 ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>
                </>
              ) : nodeState === "Read emails" ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Max Results
                    </span>
                    <textarea
                      value={integrationValue1}
                      //   ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue1(e.target.value)}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(1)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Default is 100"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 1 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 1 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused === 1 ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>

                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Labels
                    </span>
                    <textarea
                      value={integrationValue2}
                      ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue2(e.target.value)}
                      onMouseEnter={() => setHover(2)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(2)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Eg. Unread, Starred, Draft"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 2 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 2 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused === 2 ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>
                </>
              ) : nodeState === "Read Doc" ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Doc Identifier
                    </span>
                    <textarea
                      value={integrationValue1}
                      // ref={textareaRef}
                      // onInput={handleInput}
                      onChange={(e) => handleIntegrationValue1(e.target.value)}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(1)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Document ID, link, or title"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 1 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 1 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>
                </>
              ) : nodeState === "Create Doc" ? (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "10px",
                    color: "#5B5B5B",
                    textAlign: "center",
                  }}
                >
                  Tip: Templates are hyper-optimized for for best results. You
                  can always use them as a starting point!
                </div>
              ) : nodeState === "Read Sheet" ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Sheet Identifier
                    </span>
                    <textarea
                      value={integrationValue1}
                      //   ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue1(e.target.value)}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(1)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Sheet ID, link, or title"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 1 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 1 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>

                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Range
                    </span>
                    <textarea
                      value={integrationValue2}
                      ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue2(e.target.value)}
                      onMouseEnter={() => setHover(2)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(2)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Eg. 100"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 2 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 2 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>
                </>
              ) : nodeState === "Read Airtable" ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Table URL
                    </span>
                    <textarea
                      value={integrationValue1}
                      //   ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue1(e.target.value)}
                      onMouseEnter={() => setHover(1)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(1)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="https://airtable.com/..."
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 1 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 1 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>

                  <label style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#363636",
                        marginLeft: "2px",
                        fontSize: "9px",
                      }}
                    >
                      Columns
                    </span>
                    <textarea
                      value={integrationValue2}
                      ref={textareaRef}
                      //   onInput={handleInput}
                      onChange={(e) => handleIntegrationValue2(e.target.value)}
                      onMouseEnter={() => setHover(2)}
                      onMouseLeave={() => setHover(0)}
                      onFocus={() => setIsFocused(2)}
                      onBlur={() => setIsFocused(0)}
                      rows={1}
                      placeholder="Eg. AB, CD, EF"
                      style={{
                        marginTop: "2px",
                        fontFamily: "Inter",
                        backgroundColor: hover === 2 ? "#d9d9d9" : "#ededed",
                        border: `2px solid ${
                          isFocused === 2 ? bgcolor : "#fff"
                        }`,
                        borderRadius: "8px",
                        padding: "5px",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        minWidth: "150px",
                        height: "14px",
                        fontSize: "12px",
                        lineHeight: "1",
                        outline: "none",
                        overflow: "hidden",
                        resize: "none",
                        color: "#a1a1a1",
                        color: `${isFocused ? "#000" : "#a1a1a1"}`,
                        transition: "border-color 0.2s ease-in-out",
                      }}
                    />
                  </label>
                </>
              ) : (
                <></>
              )}
            </>
          )}

          {/* Node Input Field Value 2 */}
          {category === "LLMs" || category === "Multi-Modal" ? (
            <label>
              <span
                style={{
                  fontWeight: 700,
                  color: "#363636",
                  marginLeft: "2px",
                  fontSize: "9px",
                }}
              >
                System
              </span>
              <textarea
                value={currName2}
                ref={textareaRef}
                onInput={handleInput}
                onChange={handleNameChange2}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                rows={1}
                placeholder="Enter here"
                style={{
                  marginTop: "2px",
                  fontFamily: "Inter",
                  backgroundColor: hover2 ? "#d9d9d9" : "#ededed",
                  border: `2px solid ${isFocused2 ? bgcolor : "#fff"}`,
                  borderRadius: "8px",
                  padding: "5px",
                  paddingLeft: "7px",
                  paddingRight: "7px",
                  minWidth: "150px",
                  height: "14px",
                  fontSize: "12px",
                  lineHeight: "1",
                  outline: "none",
                  overflow: "hidden",
                  resize: "none",
                  // color: '#a1a1a1',
                  color: `${isFocused2 ? "#000" : "#a1a1a1"}`,
                  transition: "border-color 0.2s ease-in-out",
                }}
              />
            </label>
          ) : null}

          {/* Node Input Field Value 1 */}
          {isInput ? (
            <label>
              <span
                style={{
                  fontWeight: 700,
                  color: "#363636",
                  marginLeft: "2px",
                  fontSize: "9px",
                }}
              >
                {data.name === "Text"
                  ? "Text:"
                  : category === "LLMs" || category === "Multi-Modal"
                  ? "Prompt:"
                  : data.name === "Discord"
                  ? "Channel ID"
                  : name === "GForms"
                  ? "Form Identifier:"
                  : name === "Notion"
                  ? "Page URL:"
                  : name === "Google Meet"
                  ? "Meet Title:"
                  : "Field Name:"}
              </span>
              <textarea
                value={currName}
                ref={textareaRef}
                onInput={handleInput}
                onChange={handleNameChange}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                placeholder={
                  name === "GForms"
                    ? "Form ID, link, or title"
                    : name === "Discord"
                    ? "Eg. 987654321098765432"
                    : name === "Notion"
                    ? "https://www.notion.so/..."
                    : "Enter here"
                }
                style={{
                  marginTop: "2px",
                  fontFamily: "Inter",
                  backgroundColor: hover ? "#d9d9d9" : "#ededed",
                  border: `2px solid ${isFocused ? bgcolor : "#fff"}`,
                  borderRadius: "8px",
                  padding: "5px",
                  paddingLeft: "7px",
                  paddingRight: "7px",
                  minWidth: "150px",
                  height: "14px",
                  fontSize: "12px",
                  lineHeight: "1",
                  outline: "none",
                  overflow: "hidden",
                  resize: "none",
                  // color: '#a1a1a1',
                  color: `${isFocused ? "#000" : "#a1a1a1"}`,
                  transition: "border-color 0.2s ease-in-out",
                }}
              />
            </label>
          ) : null}

          {(category === "Integrations" || category === "Triggers") && (
            <>
              <div>
                <button
                  style={{
                    backgroundColor: status
                      ? "#6e7af5"
                      : globalHover === 1
                      ? "#6e7af5"
                      : "#5865F2",
                    borderRadius: "10px",
                    border: status
                      ? `2px solid #6e7af5`
                      : globalHover === 1
                      ? `2px solid #6e7af5`
                      : `2px solid #5865F2`,
                    color: "#fff",
                    cursor: "pointer",
                    // fontFamily: 'Poppins',
                    fontSize: "12px",
                    fontWeight: 600,
                    listStyle: "none",
                    margin: "0",
                    padding: "5px 7px",
                    marginTop: "10px",
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
                  }}
                  onMouseEnter={() => setGlobalHover(1)}
                  onMouseLeave={() => setGlobalHover(0)}
                  onClick={handleIntegrationClick}
                  // disabled={status}
                >
                  {status ? "Connected ✅" : "Authenticate ❌"}
                </button>
              </div>
            </>
          )}

          {/* Node Input Field: Type */}
          {isType ? (
            <label
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: "2px",
                marginTop: "2px",
                gap: "8px",
              }}
            >
              <span
                style={{
                  marginTop: "4px",
                  fontWeight: 400,
                  color: "#363636",
                  fontSize: "10px",
                }}
              >
                Type:
              </span>
              <select
                value={inputType}
                onChange={handleTypeChange}
                style={{
                  padding: "3px 2px",
                  borderRadius: "4px",
                  border: "0px solid #8048c7",
                  backgroundColor: bgcolor ? bgcolor : "#3c859e",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginLeft: "1px",
                  cursor: "pointer",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 5px rgba(128, 72, 199, 0.5)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                <option value="Text" style={{ fontWeight: 600 }}>
                  Text
                </option>
                <option value="File" style={{ fontWeight: 600 }}>
                  File
                </option>
              </select>
            </label>
          ) : null}

          {category === "Knowledge Base" ? (
            <label
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: "2px",
                marginTop: "2px",
                gap: "8px",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  marginTop: "4px",
                  fontWeight: 600,
                  color: "#363636",
                  fontSize: "10px",
                }}
              >
                Select Database:
              </span>
              <select
                value={inputType}
                onChange={handleTypeChange}
                style={{
                  padding: "3px 2px",
                  borderRadius: "4px",
                  border: `2px solid ${bgcolor}`,
                  color: bgcolor ? bgcolor : "#3c859e",
                  backgroundColor: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginLeft: "1px",
                  cursor: "pointer",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 5px rgba(128, 72, 199, 0.5)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              >
                {name === "Databse" ? (
                  <>
                    <option value="ReactFlow Docs" style={{ fontWeight: 600 }}>
                      ReactFlow Docs
                    </option>
                    <option value="IBM QnA" style={{ fontWeight: 600 }}>
                      IBM QnA
                    </option>
                    <option
                      value="U.S.A. Presidents Wiki"
                      style={{ fontWeight: 600 }}
                    >
                      U.S.A. Presidents Wiki
                    </option>
                  </>
                ) : (
                  <>
                    <option value="Token Bufer" style={{ fontWeight: 600 }}>
                      Token Bufer
                    </option>
                    <option value="Message Buffer" style={{ fontWeight: 600 }}>
                      Message Buffer
                    </option>
                    <option
                      value="Full - Formatted"
                      style={{ fontWeight: 600 }}
                    >
                      Full - Formatted
                    </option>
                    <option value="Full - Raw" style={{ fontWeight: 600 }}>
                      Full - Raw
                    </option>
                    <option value="Vector Database" style={{ fontWeight: 600 }}>
                      Vector Database
                    </option>
                  </>
                )}
              </select>
            </label>
          ) : null}
        </div>

        {targets?.map((target, index) => (
          // <p key={index}  style={{ position: 'absolute', right: name === 'Input' ? '-30px' : category === 'General' ? '-38px' : name === 'Database' ? '-40px' : '-54px', top: `${(index + 1) * (100 / (rightHandles + 1))-2}%`, color: '#7d7d7d', fontWeight: 400 }}>
          <p
            key={index}
            style={{
              position: "absolute",
              left: "209px",
              top: `${(index + 1) * (100 / (rightHandles + 1)) - 2}%`,
              color: "#7d7d7d",
              fontWeight: 400,
            }}
          >
            {target}
          </p>
        ))}
        {Array.from({ length: rightHandles }, (_, index) => (
          <Handle
            key={`${id}-right-handle-${index}`}
            type="source"
            position={Position.Right}
            id={`${id}-right-handle-${index}`}
            style={{ top: `${(index + 1) * (100 / (rightHandles + 1))}%` }}
          />
        ))}
      </div>
    </div>
  );
};
