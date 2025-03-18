import { useEffect, useState, useRef } from "react";
import {
    loginUser,
    registerUser,
    requestWithAuth,
    refreshToken,
    save_google_creds,
    get_google_refresh_token,
} from "./logic/auth";
import guest from "/guest.webp";
import google from "/google.png";
import queryString from "query-string";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

const selector = (state) => ({
    loadTemplate: state.loadTemplate,
    addTemplate: state.addTemplate,
    templateWorkflows: state.templateWorkflows,
    nodes: state.nodes,
    edges: state.edges,
    addBooks: state.addBooks,
    database: state.database,
    templateAdded: state.templateAdded,
    setTemplateAdded: state.setTemplateAdded,
});

export const LoginWindow = ({setSelectedOption}) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [hover, setHover] = useState(0);
    const [focus, setFocus] = useState(0);
    const [incorrect, setIncorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { addTemplate, addBooks, database, templateAdded, setTemplateAdded } =
        useStore(selector, shallow);

    async function fetchData() {
        try {
            const data = await requestWithAuth("/users/username");
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return null;
        }
    }

    //   const hasRun = useRef(false);
    useEffect(() => {
        // if (hasRun.current) return; // Prevents second execution
        // hasRun.current = true;
        async function initSession() {
            await checkRefreshToken();
            await checkGoogleLogin();
            await loginWithAccessToken();
        }
        initSession();
    }, []);

    async function checkGoogleLogin() {
        let accessToken = sessionStorage.getItem("access_token");

        if (!accessToken) {
            const parsed = queryString.parse(window.location.search);
            const queryAccessToken = parsed.access_token;
            if (queryAccessToken) {
                setLoading(true);
                sessionStorage.setItem("access_token", queryAccessToken);
                accessToken = queryAccessToken;
                console.log("Google access token found in query parameters");

                // Remove the query parameters from the URL
                const newUrl =
                    window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);

                // Get refresh token
                await get_google_refresh_token();
            }
            setLoading(false);
        }
    }

    async function checkRefreshToken() {
        try {
            setLoading(true);
            let accessToken = sessionStorage.getItem("access_token");

            if (!accessToken) {
                // No access token, try seamless login
                console.log("No access token, trying seamless login");
                const seamlessLoginSuccess = await refreshToken();
                if (!seamlessLoginSuccess) {
                    // Redirect user to login page or show login prompt
                    console.log(
                        "No refresh token, User needs to log in manually"
                    );
                } else {
                    console.log("Access token refreshed!");
                }
                setLoading(false);
            }
        } catch (e) {
            console.log("Error in refreshing token: ", e);
        }
    }

    async function loginWithAccessToken() {
        try {
            setLoading(true);
            let accessToken = sessionStorage.getItem("access_token");

            if (accessToken) {
                console.log("User logged in through access token");
                const fetchedData = await fetchData();

                // Check for Google OAuth Integration Callback
                const parsed = queryString.parse(window.location.search);
                const queryCreds_dict = parsed.creds_dict;
                if (queryCreds_dict) {
                    // Parse the JSON string
                    console.log("Credentials found in query parameters");
                    const parsedCreds = JSON.parse(queryCreds_dict);
                    console.log("Parsed credentials:", parsedCreds);

                    // Remove the query parameters from the URL
                    const newUrl =
                        window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, newUrl);

                    await save_google_creds(parsedCreds);
                } else {
                    console.log("No creds_dict found in query parameters");
                }
                setLoading(false);
                if (fetchedData) {
                    gotoWeb();
                }
            }
        } catch (e) {
            console.log("Error in fetching token: ", e);
        }
        setLoading(false);
    }

    async function handleLogin(username, password) {
        // console.log(username, password);
        setLoading(true);
        try {
            await loginUser(username, password);
            console.log("Logged in!");
            const userData = await fetchData();
            // console.log("User Data:", userData);
            setLoading(false);
            if (userData) {
                gotoWeb();
            }
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Incorrect username or password");
            setLoading(false);
        }
    }

    async function handleRegister(username, password) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(username)) {
            setIncorrect("Invalid email address");
            return;
        }
        if (password.length < 3) {
            setIncorrect("Password must be at least 3 characters long");
            return;
        }

        setLoading(true);
        try {
            await registerUser(username, password);
            console.log("Logged in!");
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Username already exists");
            setLoading(false);
            return;
        }
        setLoading(false);
        gotoWeb();
    }

    async function handleGoogleLogin() {
        try {
            console.log("Logging in with Google...");
            window.location.href = "http://127.0.0.1:8000/private/auth/google";
            // await signInWithGoogle();
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Some error has occured");
            setLoading(false);
        }
    }

    const gotoWeb = () => {
        // Successfully logs in user, navigate to the web page
        setLoading(false);
        setSelectedOption({
            value: "pipelines",
            label: "Pipelines",})
        navigate("/pipelines");
    };

    return (
        <div
            className="login-bg"
            style={{
                display: "flex",
                height: "102vh",
                width: "102vw",
                backgroundColor: loading ? "#2e2e2e" : "#1c1c1c",
                border: "3px solid #2d4ecf",
                borderRadius: "10px",
                zIndex: 10,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "hidden",
            }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    flexDirection: "row",
                }}>
                {/* Login Box */}
                <div
                    style={{
                        height: "32rem",
                        width: "24rem",
                        backgroundColor: "#0a0a0a",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "16px",
                        alignItems: "center",
                        boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        justifyContent: "center",
                        opacity: loading ? 0.8 : 1,
                    }}>
                    {/* Welcome */}
                    <div
                        style={{
                            fontSize: "26px",
                            fontWeight: 700,
                            marginTop: "0vh",
                        }}>
                        Welcome To Weavebot
                    </div>
                    <div
                        style={{
                            color: "#96969F",
                            fontSize: "12px",
                            marginTop: "1vh",
                            marginBottom: "2vh",
                        }}>
                        Login with your Guest or Google account
                    </div>

                    {/* Google and Guest Login */}
                    <button
                        style={
                            hover === 1
                                ? {
                                      ...styles.autoButton,
                                      backgroundColor: "#454545",
                                  }
                                : styles.autoButton
                        }
                        onMouseEnter={() => setHover(1)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleGoogleLogin()}>
                        <img
                            src={google}
                            alt="Google"
                            style={{ height: "1em", marginRight: "1vh" }}
                        />
                        Login with Google
                    </button>
                    <button
                        style={
                            hover === 2
                                ? {
                                      ...styles.autoButton,
                                      backgroundColor: "#454545",
                                  }
                                : styles.autoButton
                        }
                        onMouseEnter={() => setHover(2)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => gotoWeb()}>
                        <img
                            src={guest}
                            alt="Google"
                            style={{ height: "1em", marginRight: "1vh" }}
                        />
                        Continue as Guest
                    </button>

                    {/* Continue with */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginTop: "2vh",
                            marginBottom: "0vh",
                        }}>
                        <div
                            style={{
                                width: "20%",
                                height: "1px",
                                backgroundColor: "#96969F",
                                marginTop: "2vh",
                                marginBottom: "2vh",
                            }}></div>
                        <div
                            style={{
                                color: "#96969F",
                                fontSize: "13px",
                                marginTop: "1vh",
                                marginBottom: "1vh",
                                marginRight: "1vh",
                                marginLeft: "1vh",
                            }}>
                            Or continue with
                        </div>
                        <div
                            style={{
                                width: "20%",
                                height: "1px",
                                backgroundColor: "#96969F",
                                marginTop: "2vh",
                                marginBottom: "2vh",
                            }}></div>
                    </div>

                    {/* Email and Password */}
                    <div style={{ ...styles.text2, alignSelf: "flex-start" }}>
                        Email
                    </div>
                    <input
                        style={
                            focus === 3
                                ? {
                                      ...styles.textInput,
                                      border: "1px solid #fff",
                                  }
                                : hover === 3
                                ? {
                                      ...styles.textInput,
                                      backgroundColor: "#1a1a1a",
                                  }
                                : styles.textInput
                        }
                        onMouseEnter={() => setHover(3)}
                        onMouseLeave={() => setHover(0)}
                        onFocus={() => setFocus(3)}
                        onBlur={() => setFocus(0)}
                        type="text"
                        placeholder="m@example.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div style={{ ...styles.text2, alignSelf: "flex-start" }}>
                        Password
                    </div>
                    <input
                        style={
                            focus === 6
                                ? {
                                      ...styles.textInput,
                                      border: "1px solid #fff",
                                  }
                                : hover === 6
                                ? {
                                      ...styles.textInput,
                                      backgroundColor: "#1a1a1a",
                                  }
                                : styles.textInput
                        }
                        onMouseEnter={() => setHover(6)}
                        onMouseLeave={() => setHover(0)}
                        onFocus={() => setFocus(6)}
                        onBlur={() => setFocus(0)}
                        type="password"
                        placeholder=""
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />

                    {incorrect && <div style={styles.text3}>{incorrect}</div>}
                    {/* Login Button */}
                    <button
                        style={
                            hover === 4
                                ? {
                                      ...styles.submitButton,
                                      backgroundColor: "#d9d9d9",
                                  }
                                : styles.submitButton
                        }
                        onMouseEnter={() => setHover(4)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleLogin(username, pass)}>
                        Login
                    </button>
                    <button
                        style={
                            hover === 5
                                ? {
                                      ...styles.autoButton2,
                                      backgroundColor: "#454545",
                                  }
                                : styles.autoButton2
                        }
                        onMouseEnter={() => setHover(5)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleRegister(username, pass)}>
                        Register
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20rem",
                    flexDirection: "column",
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "24px",
                    color: "#d1d1d1",
                }}>
                By clicking continue, you agree to our
                <div>
                    <button style={styles.tos}>Terms of Service</button>and
                    <button style={styles.tos}>Privacy Policy.</button>
                </div>
            </div>

            {/* Loading spinner */}
            {loading && (
                <div style={{ position: "absolute", }}>
                    <OrbitProgress
                        color="#2D4ECF"
                        size="medium"
                        text=""
                        textColor=""
                    />
                </div>
            )}
        </div>
    );
};

const styles = {
    tos: {
        backgroundColor: "transparent",
        cursor: "pointer",
        borderWidth: "0",
        color: "#d1d1d1",
        fontSize: "11px",
        fontWeight: "bold",
        textDecoration: "underline",
        listStyle: "none",
        verticalAlign: "baseline",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter",
    },
    text3: {
        fontFamily: "Inter",
        // position: 'absolute',
        bottom: "15vh",
        color: "#e36259",
        fontSize: "10px",
        marginTop: "0.9em",
        fontWeight: 600,
        marginLeft: "3rem",
        alignSelf: "flex-start",
    },
    text2: {
        fontFamily: "Inter",
        color: "#d9d9d9",
        fontSize: "14px",
        marginTop: "0.9em",
        fontWeight: 600,
        marginLeft: "3rem",
    },
    submitButton: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        borderWidth: "0",
        color: "#000",
        cursor: "pointer",
        display: "flex",
        border: "1px solid #454545",
        fontSize: "13px",
        fontFamily: "Inter",
        fontWeight: 600,
        marginTop: "3vh",
        padding: "10px 2px",
        width: "18rem",
        textAlign: "center",
        transition: "all 0.15s",
        listStyle: "none",
        verticalAlign: "baseline",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        justifyContent: "center",
        alignItems: "center",
    },
    autoButton2: {
        backgroundColor: "transparent",
        borderRadius: "5px",
        borderWidth: "0",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        border: "1px solid #454545",
        // fontFamily: 'Poppins',
        fontFamily: "Inter",
        fontSize: "13px",
        fontWeight: 600,
        listStyle: "none",
        marginTop: "1vh",
        padding: "10px 28px",
        width: "18rem",
        textAlign: "center",
        transition: "all 0.15s",
        verticalAlign: "baseline",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        justifyContent: "center",
        alignItems: "center",
    },
    autoButton: {
        backgroundColor: "transparent",
        borderRadius: "5px",
        borderWidth: "0",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        border: "1px solid #454545",
        fontSize: "13px",
        fontWeight: 600,
        fontFamily: "Inter",
        listStyle: "none",
        marginTop: "1vh",
        padding: "8px 28px",
        width: "18rem",
        textAlign: "center",
        transition: "all 0.15s",
        justifyContent: "center",
        alignItems: "center",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",

        // verticalAlign: 'baseline',
        // whiteSpace: 'nowrap',
        // userSelect: 'none',
        // WebkitUserSelect: 'none',
        // touchAction: 'manipulation',
    },
    textInput: {
        fontFamily: "Inter",
        backgroundColor: "#000",
        borderRadius: "4px",
        border: "1px solid #454545",
        color: "#fff",
        fontSize: "14px",
        marginTop: "0.5em",
        fontWeight: "medium",
        width: "17rem",
        // height: '14px',
        padding: "8px 8px",
        transition: "all 0.15s",
        lineHeight: "1",
        outline: "none",
        overflow: "hidden",
        resize: "none",
    },
};
