import { useState, useEffect } from "react";
import Close from "/close.png";
import Arrow from "/arrow-down.svg";
import {
    Onloading1,
    Onloading2,
    Onloading3,
    Onloading4,
} from "./sub/onloadingVideos";

export default function Onboarding({ setOnboarding }) {
    const [page, setPage] = useState(1);
    const [hover, setHover] = useState(0);

    return (
        <div
            style={{
                display: "flex",
                position: "absolute",
                top: "45%",
                left: "50%",
                height: "460px",
                width: "630px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                flexDirection: "column",
                border: "4px solid #2d4ecf",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
            {/* Close button */}
            <button
                onMouseEnter={() => setHover(1)}
                onMouseLeave={() => setHover(0)}
                style={{
                    backgroundColor: hover===1 ? "#d1d1d1" : "#fff",
                    height: "30px", // Fixed size to match the container
                    width: "30px", // Fixed size to match the container
                    position: "absolute",
                    top: "6%", // Center vertically
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
                onClick={() => setOnboarding(false)}>
                <img
                    src={Close}
                    alt="Close"
                    style={{ width: "22px", height: "22px" }}
                />
            </button>

            {page === 1 ? (
                <>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            fontWeight: "700",
                            fontSize: "32px",
                            marginTop: "1rem",
                        }}>
                        Welcome to Weavebot
                    </div>
                    <div style={{ marginLeft: "1.8rem", marginTop: "1vh" }}>
                        Start the quick tutorial — it hardly takes one minute!
                    </div>
                    {/* GIF */}
                    <Onloading1 />
                </>
            ) : page === 2 ? (
                <>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            fontWeight: "700",
                            fontSize: "32px",
                            marginTop: "1rem",
                        }}>
                        Custom Variables
                    </div>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            marginRight: "1.8rem",
                            marginTop: "1vh",
                            fontSize: "12px",
                        }}>
                        Custom variables are vital for flexibility and
                        customization. Just surround any word with double curly
                        braces and weavebot will replace it with the variable's
                        value!
                    </div>
                    {/* GIF */}
                    <Onloading2 />
                </>
            ) : page === 3 ? (
                <>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            fontWeight: "700",
                            fontSize: "32px",
                            marginTop: "1rem",
                        }}>
                        Deploy Your Pipelines
                    </div>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            marginRight: "1.8rem",
                            marginTop: "1vh",
                            fontSize: "12px",
                        }}>
                        Click on run to validate and initiate your pipeline.
                        Then head over to deployment tab for exciting features!
                    </div>
                    {/* GIF */}
                    <Onloading3 />
                </>
            ) : page === 4 ? (
                <>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            fontWeight: "700",
                            fontSize: "32px",
                            marginTop: "1rem",
                        }}>
                        Automations
                    </div>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            marginRight: "1.8rem",
                            marginTop: "1vh",
                            fontSize: "12px",
                        }}>
                        Automations allow you to remotely execute your
                        pipelines, add trigger events, build APIs, and much
                        more!
                    </div>
                    {/* GIF */}
                    <Onloading4 />
                </>
            ) : page === 5 ? (
                <>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            fontWeight: "700",
                            fontSize: "32px",
                            marginTop: "1rem",
                        }}>
                        And much, much more.
                    </div>
                    <div
                        style={{
                            marginLeft: "1.8rem",
                            marginRight: "1.8rem",
                            marginTop: "1vh",
                            fontSize: "14px",
                        }}>
                        Weavebot is here to help you do more with less. But it
                        is still in alpha stage. If you have any suggestions or
                        feedback, please let us know! We are committing to <a style={{textDecoration: 'underline', cursor: 'pointer', color: '#edb015'}} href="https://github.com/vibhor64/AI-Workflow-Automations-Tool" target="_blank">open source</a> and free software inititave.
                    </div>

                    {/* Logo */}
                    <img
                        src="/favicon.png"
                        alt="Weavebot Logo"
                        style={{
                            width: "260px",
                            height: "auto",
                            margin: "0 auto",
                            padding: "0",
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "4px solid #edb015",
                            borderRadius: "8px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                    />
                </>
            ) : null}

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "1vh",
                    position: "absolute",
                    bottom: "14px",
                    left: "30px",
                    fontSize: "12px",
                    fontWeight: 500,
                }}>
                {page}/5
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "1.8rem",
                    marginTop: "1vh",
                    position: "absolute",
                    bottom: "10px",
                    right: "0px",
                }}>
                <button
                    style={{
                        color: page === 1 ? "#ababab" : "#000",
                        border: "none",
                        cursor: page === 1 ? "not-allowed" : "pointer",
                        fontSize: "12px",
                        marginRight: "0.4rem",
                        backgroundColor: "transparent",
                        fontWeight: 500,
                        textDecoration: hover === 2 ? "underline" : "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onMouseEnter={() => setHover(2)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}>
                    <img
                        src={Arrow}
                        alt="Arrow"
                        style={{
                            width: "21px",
                            height: "21px",
                            marginLeft: "0.4rem",
                            transform: "rotate(90deg)",
                            fill: page === 1 ? "#ababab" : "#000",
                        }}
                    />
                    Previous
                </button>
                <button
                    style={{
                        color: page === 5 ? "#ababab" : "#000",
                        border: "none",
                        cursor: page === 5 ? "not-allowed" : "pointer",
                        fontSize: "12px",
                        marginRight: "0rem",
                        backgroundColor: "transparent",
                        fontWeight: 500,
                        textDecoration: hover === 3 ? "underline" : "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onMouseEnter={() => setHover(3)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setPage(page + 1)}
                    disabled={page === 5}>
                    Next
                    <img
                        src={Arrow}
                        alt="Arrow"
                        style={{
                            width: "21px",
                            height: "21px",
                            marginLeft: "0.4rem",
                            transform: "rotate(270deg)",
                            fill: page === 5 ? "#ababab" : "#000",
                        }}
                    />
                </button>
            </div>
        </div>
    );
}
