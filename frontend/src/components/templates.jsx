// templates.js
import Add from "/add.webp";
import save from "/save.png";
import Close from "/close.png";
import logout from "/logout.webp";
import select from "/select.webp";
import { useEffect, useState } from "react";
import styles from "./templates.module.css";
// import { templateNodes } from './templateNodes';
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import {
    clearAccessToken,
    logoutUser,
    pushTemplate,
    requestWithAuth,
} from "../logic/auth";
import arrowDown from "/arrow-down.svg";
import { useNavigate } from "react-router-dom";

const selector = (state) => ({
    loadTemplate: state.loadTemplate,
    addTemplate: state.addTemplate,
    templateWorkflows: state.templateWorkflows,
    nodes: state.nodes,
    edges: state.edges,
    templateAdded: state.templateAdded,
    setTemplateAdded: state.setTemplateAdded,
    clearBooks: state.clearBooks,
});

export const Templates = () => {
    const [hover, setHover] = useState(false);
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverSave, setHoverSave] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [showBox2, setShowBox2] = useState(false);
    const [saveBox, setSaveBox] = useState(false);
    const [content, setContent] = useState("All Templates");
    const [tempName, setTempName] = useState("My template-1");
    const [logoutBox, setLogoutBox] = useState(false);

    const {
        loadTemplate,
        addTemplate,
        templateWorkflows,
        nodes,
        edges,
        templateAdded,
        setTemplateAdded,
        clearBooks,
    } = useStore(selector, shallow);

    const handleClick = () => {
        setHoverClose(false);
        setShowBox2(false);
        setSaveBox(false);
        setTimeout(() => setShowBox(false), 180);
    };

    const handleClick2 = () => {
        setHoverClose(false);
        setShowBox2(false);
        setSaveBox(false);
        setLogoutBox(false);
        setTimeout(() => setShowBox(false), 180);
    };

    const OpenBox = () => {
        setShowBox(true);
        setTimeout(() => setShowBox2(true), 20);
    };

    const handleSaveBox = () => {
        setSaveBox(!saveBox);
    };

    const handleTemplateClick = (template) => {
        handleClick();
        loadTemplate(template);
    };

    const saveTemplate = () => {
        handleClick();
        const newTemplate = {
            templateName: tempName,
            displayImage: select,
            templateId: `template-${templateWorkflows.length + 2}`,
            tags: ["Saved"],
            nodes: nodes,
            edges: edges,
        };

        pushTemplate(newTemplate);
        addTemplate(newTemplate);

        // Convert to JSON and trigger download
        // const jsonString = JSON.stringify(newTemplate, null, 2); // Pretty print JSON
        // const blob = new Blob([jsonString], { type: "application/json" });
        // const url = URL.createObjectURL(blob);

        // const a = document.createElement("a");
        // a.href = url;
        // a.download = `${newTemplate.templateName || "template"}.json`; // Filename
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(url); // Cleanup
    };

    const navigate = useNavigate();
    const handleLogout = async () => {
        // Clear refresh token
        await logoutUser();
        // Clear access token
        sessionStorage.removeItem("access_token");

        // Clear zustand store
        clearBooks();
        setTemplateAdded(false);

        // Clean modals
        handleClick2();
        navigate("/login");
    };

    async function fetchData() {
        try {
            const data = await requestWithAuth("/users/templates");
            console.log(data);

            if (
                data &&
                Array.isArray(data) &&
                data?.length > 0 &&
                templateAdded === false
            ) {
                for (let i = 0; i < data.length; i++) {
                    addTemplate(data[i]["template"]);
                }
                setTemplateAdded(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return null;
        }
    }

    useEffect(() => {
        if (templateAdded === false) {
            fetchData();
        }
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    top: "10px",
                    height: "10vh",
                    alignItems: "center",
                    justifyContent: "center",
                    right: "2em",
                    justifyItems: "center",
                }}>
                <button
                    title="Templates"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={OpenBox}
                    style={{
                        backgroundColor: hover ? "#3b59d1" : "#2d4ecf",
                        border: hover
                            ? "2px solid #3b59d1"
                            : "2px solid #2d4ecf",
                        borderRadius: "12px",
                        boxShadow: " rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                        color: "#fff",
                        cursor: "pointer",
                        // display: 'inline-block',
                        fontSize: "12px",
                        fontFamily: "Inter",
                        fontWeight: 600,
                        listStyle: "none",
                        margin: "0",
                        padding: "0px 8px",
                        textAlign: "center",
                        transition: "all 200ms",
                        verticalAlign: "baseline",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        touchAction: "manipulation",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "row",
                    }}
                    type="submit">
                    <p>Templates</p>
                    <img
                        src={Add}
                        alt="Add"
                        style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "5px",
                        }}
                    />
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    top: "10px",
                    height: "10vh",
                    alignItems: "center",
                    justifyContent: "center",
                    right: "8.9em",
                    justifyItems: "center",
                }}>
                <button
                    title="Save Pipeline as Template"
                    onMouseEnter={() => setHoverSave(1)}
                    onMouseLeave={() => setHoverSave(0)}
                    onClick={handleSaveBox}
                    style={{
                        backgroundColor:
                            hoverSave === 1 ? "#3b59d1" : "#2d4ecf",
                        borderRadius: "4px",
                        border:
                            hoverSave === 1
                                ? "2px solid #3b59d1"
                                : "2px solid #2d4ecf",
                        // color: '#9dadff',
                        borderRadius: "20px",
                        boxShadow: " rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                        color: "#fff",
                        cursor: "pointer",
                        display: "inline-block",
                        fontSize: "8px",
                        fontWeight: 600,
                        listStyle: "none",
                        margin: "0",
                        padding: "6px 6px",
                        textAlign: "center",
                        transition: "all 200ms",
                        verticalAlign: "baseline",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        touchAction: "manipulation",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    type="submit">
                    <img
                        src={save}
                        alt="Add"
                        style={{ width: "26px", height: "26px" }}
                    />
                </button>
            </div>
            {/* Logout */}
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    top: "10px",
                    height: "10vh",
                    alignItems: "center",
                    justifyContent: "center",
                    right: "12em",
                    justifyItems: "center",
                }}>
                <button
                    title="Logout"
                    onMouseEnter={() => setHoverSave(2)}
                    onMouseLeave={() => setHoverSave(0)}
                    onClick={() => setLogoutBox(true)}
                    style={{
                        backgroundColor:
                            hoverSave === 2 ? "#3b59d1" : "#2d4ecf",
                        borderRadius: "4px",
                        border:
                            hoverSave === 2
                                ? "2px solid #3b59d1"
                                : "2px solid #2d4ecf",
                        // color: '#9dadff',
                        borderRadius: "20px",
                        boxShadow: " rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                        color: "#fff",
                        cursor: "pointer",
                        display: "inline-block",
                        fontSize: "8px",
                        fontWeight: 600,
                        listStyle: "none",
                        margin: "0",
                        padding: "8px 8px",
                        textAlign: "center",
                        transition: "all 200ms",
                        verticalAlign: "baseline",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        touchAction: "manipulation",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    type="submit">
                    <img
                        src={logout}
                        alt="Add"
                        style={{ width: "24px", height: "24px" }}
                    />
                </button>
            </div>

            {saveBox && (
                <div
                    style={{ opacity: saveBox ? 1 : 0 }}
                    className={styles.save}>
                    <span
                        style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "#000",
                            marginLeft: "15px",
                            marginTop: "14px",
                        }}>
                        Save Template
                    </span>
                    <input
                        className={styles.saveInput}
                        type="text"
                        placeholder="Template Name"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                    />
                    <button
                        onClick={saveTemplate}
                        className={styles.saveButton}>
                        Save
                    </button>

                    <button
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                        // style={{ backgroundColor: hoverClose ? '#d1d1d1' : '#fff', height: hoverClose ? '30px' : '24px', width: hoverClose ? '30px' : '24px', position: 'absolute', top: '10px', right: '10px', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: '50%', transition: 'all 0.2s ease' }}
                        style={{
                            backgroundColor: hoverClose ? "#d1d1d1" : "#fff",
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
                        onClick={handleClick}>
                        <img
                            src={Close}
                            alt="Close"
                            style={{ width: "22px", height: "22px" }}
                        />
                    </button>
                </div>
            )}

            {logoutBox && (
                <div
                    style={{ opacity: logoutBox ? 1 : 0 }}
                    className={styles.save}>
                    <span
                        style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "#000",
                            marginLeft: "15px",
                            marginTop: "14px",
                        }}>
                        Confirm Logout?
                    </span>
                    <div
                        style={{
                            fontSize: "12px",
                            fontWeight: "normal",
                            color: "#ababab",
                            marginTop: "14px",
                            marginLeft: "17px",
                            marginRight: "17px",
                            marginBottom: "14px",
                        }}>
                        Make sure to save your sensitive data before logging
                        out.
                    </div>

                    <button
                        onClick={handleLogout}
                        className={styles.saveButton}
                        style={{ borderRadius: "6px" }}>
                        Log me out!
                    </button>

                    <button
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                        style={{
                            backgroundColor: hoverClose ? "#d1d1d1" : "#fff",
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
                        onClick={handleClick2}>
                        <img
                            src={Close}
                            alt="Close"
                            style={{ width: "22px", height: "22px" }}
                        />
                    </button>
                </div>
            )}

            {showBox && (
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        top: "45%",
                        height: "29rem",
                        left: "50%",
                        backgroundColor: "#fff",
                        width: "63rem",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "8px",
                        border: showBox2
                            ? "4px solid #2d4ecf"
                            : "0px solid #2d4ecf",
                        transition: "all 0.2s ease",
                        flexDirection: "row",
                        opacity: showBox2 ? 1 : 0,
                    }}>
                    <button
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                        style={{
                            backgroundColor: hoverClose ? "#d1d1d1" : "#fff",
                            height: "30px", // Fixed size to match the container
                            width: "30px", // Fixed size to match the container
                            position: "absolute",
                            top: "5%", // Center vertically
                            left: "97%", // Center horizontally
                            transform: "translate(-50%, -50%)", // Adjust for exact centering
                            border: "none",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            borderRadius: "50%",
                            transition: "background-color 0.2s ease", // Only animate background color
                        }}
                        onClick={handleClick}>
                        <img
                            src={Close}
                            alt="Close"
                            style={{ width: "22px", height: "22px" }}
                        />
                    </button>

                    <div
                        style={{
                            height: "100%",
                            width: "22%",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#D9D9D9",
                            borderTopLeftRadius: "4px",
                            borderBottomLeftRadius: "4px",
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0px",
                                marginTop: "70px",
                                marginLeft: "30px",
                            }}>
                            <div
                                style={{
                                    marginBottom: "10px",
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "#121212",
                                    alignItems: "center",
                                    display: "flex",
                                    position: "relative",
                                    top: "-30px",
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>
                                Discover
                                <img
                                    src={arrowDown}
                                    alt="Logo"
                                    className="rotate-on-hover"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        transition: "transform 0.5s ease",
                                        transform: isHovered
                                            ? "rotate(360deg)"
                                            : "rotate(0deg)",
                                    }}
                                />
                            </div>
                            <button
                                onClick={() => setContent("All Templates")}
                                className={styles.buttons}>
                                All Templates
                            </button>
                            <button
                                onClick={() => setContent("Gmail")}
                                className={styles.buttons}>
                                Gmail
                            </button>
                            <button
                                onClick={() => setContent("Discord")}
                                className={styles.buttons}>
                                Discord
                            </button>
                            <button
                                onClick={() => setContent("Assistant")}
                                className={styles.buttons}>
                                Assistant
                            </button>
                            <button
                                onClick={() => setContent("Gen AI")}
                                className={styles.buttons}>
                                Gen AI
                            </button>
                            <button
                                onClick={() => setContent("Saved")}
                                className={styles.buttons}>
                                Saved
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            width: "78%",
                            overflowY: "auto",
                        }}>
                        <div
                            style={{
                                marginLeft: "30px",
                                marginTop: "20px",
                                fontSize: "48px",
                                fontWeight: "bold",
                            }}>
                            Browse Templates
                        </div>

                        <p
                            style={{
                                marginLeft: "30px",
                                marginTop: "8px",
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: "#ababab",
                            }}>
                            Discover templates for your needs and get started
                            with automation—no coding required.
                        </p>

                        <div
                            style={{
                                display: "flex",
                                marginTop: "5px",
                                marginLeft: "30px",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}>
                            {templateWorkflows
                                .filter(
                                    (template) =>
                                        content === "All Templates" ||
                                        template?.tags.includes(content)
                                )
                                .map((template) => (
                                    <button
                                        key={template.templateId}
                                        className={styles.cons}
                                        onClick={() =>
                                            handleTemplateClick(template)
                                        }
                                        style={{
                                            height: "120px",
                                            width: "120px",
                                            backgroundColor: "#D9D9D9",
                                            borderRadius: "8px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: "0px",
                                            marginRight: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            border: "2px solid #000",
                                            borderRadius: 20, boxShadow: '-6px 6px 0px 0px rgba(42, 42, 42, .85)', borderWidth: 1.7, borderColor: '#000', 
                                            cursor: "pointer",
                                            marginBottom: "20px",
                                        }}>
                                        <img
                                            src={
                                                template?.displayImage
                                                    ? template.displayImage
                                                    : select
                                            }
                                            alt="Template"
                                            style={{
                                                height: "40px",
                                                marginTop: "20px",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "9px",
                                                fontWeight: 600,
                                                color: "#121212",
                                                textAlign: "center",
                                                marginLeft: "8px",
                                                marginRight: "8px",
                                                marginBottom: "15px",
                                                fontFamily: "Inter",
                                            }}>
                                            {template.templateName}
                                        </p>
                                    </button>
                                ))}

                            {/* <div className={styles.cons} style={{ height: '120px', width: '120px', backgroundColor: '#D9D9D9', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '0px', marginRight: '20px' }}>
                                <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}>YouTube Thumbnail leveraging Gen AI</p>
                            </div>
                            <div className={styles.cons} style={{ height: '120px', width: '120px', backgroundColor: '#D9D9D9', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '0px', marginRight: '20px' }}>
                                <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}>YouTube Thumbnail leveraging Gen AI</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
