import { useEffect, useState, useRef } from "react";
import { loginUser, registerUser, requestWithAuth, refreshToken, } from "./logic/auth";
import guest from "./assets/guest.png"
import google from "./assets/google.png"
import queryString from "query-string";
import { useStore } from "./store";
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    loadTemplate: state.loadTemplate,
    addTemplate: state.addTemplate,
    templateWorkflows: state.templateWorkflows,
    nodes: state.nodes,
    edges: state.edges,
    addBooks: state.addBooks,
});

export const LoginWindow = ({ setSelectedCategory }) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [hover, setHover] = useState(0);
    const [focus, setFocus] = useState(0);
    const [incorrect, setIncorrect] = useState(false);

    const {
        addTemplate,
        addBooks,
    } = useStore(selector, shallow);

    async function fetchData() {
        try {
            const data = await requestWithAuth("/users/me");

            if (Array.isArray(data["templates"]) && data["templates"].length > 0) {
                for (let i = 0; i < data["templates"].length; i++) {
                    addTemplate(data["templates"][i]["template"]);
                }
            }
            
            if (Array.isArray(data["books"]) && data["books"].length > 0) {
                addBooks(data["books"]);
            }
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return null;
        }
    }

    const hasRun = useRef(false);
    useEffect(() => {

        if (hasRun.current) return; // Prevents second execution
        hasRun.current = true;
        async function initSession() {
            await initializeUserSession();
        }
        initSession();
    }, []);

    async function initializeUserSession() {
        let accessToken = sessionStorage.getItem("access_token");
        if (!accessToken) {
            const parsed = queryString.parse(window.location.search);
            const queryAccessToken = parsed.access_token;
            if (queryAccessToken) {
                sessionStorage.setItem("access_token", queryAccessToken);
                accessToken = queryAccessToken;
                // console.log("Access token found in query parameters");
                // Remove the query parameters from the URL
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        }
        try {

            if (!accessToken) {
                // No access token, try seamless login
                console.log("No access token, trying seamless login")
                const seamlessLoginSuccess = await refreshToken();
                if (!seamlessLoginSuccess) {
                    // Redirect user to login page or show login prompt
                    console.log("User needs to log in manually");
                }
            } else if (accessToken) {
                console.log("User is already logged in");
                await fetchData();
                gotoWeb();
            }
        } catch (e) {
            console.log("Error is fetching token: ", e)
        }

    }

    async function handleLogin(username, password) {
        // console.log(username, password);
        try {
            await loginUser(username, password);
            console.log("Logged in!");
            const userData = await fetchData();
            // console.log("User Data:", userData);
            if (userData) {
                gotoWeb();
            }
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Incorrect username or password");
        }
    }

    async function handleRegister(username, password) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(username)) {
            setIncorrect("Invalid email address");
            return
        }
        if (password.length < 3) {
            setIncorrect('Password must be at least 3 characters long');
            return
        }

        try {
            await registerUser(username, password);
            console.log("Logged in!");
            await fetchData();
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Username already exists");
            return
        }
        gotoWeb();
    }

    async function handleGoogleLogin() {

        try {
            console.log("Logging in with Google...");
            window.location.href = "http://127.0.0.1:8000/auth/google";
            // await signInWithGoogle();
        } catch (error) {
            console.error("Error:", error.message);
            setIncorrect("Some error has occured");
        }
    }

    // async function fetchProtectedData() {
    //     try {
    //         const response = await fetch("http://127.0.0.1:8000/users/me", {
    //             method: "GET",
    //             credentials: "include", // Include cookies in the request
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to fetch protected data");
    //         }

    //         const data = await response.json();
    //         console.log("Protected Data:", data);
    //         gotoWeb();
    //     } catch (error) {
    //         console.error("Error fetching protected data:", error.message);
    //     }
    // }

    const gotoWeb = () => {
        // Successfully logs in user, navigate to the web page
        setSelectedCategory("Pipelines");
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#383838', border: '3px solid #2d4ecf', borderRadius: '10px', zIndex: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', flexDirection: 'column' }}>

                {/* Login Box */}
                <div style={{ height: '62vh', width: '30vw', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', borderRadius: '16px', alignItems: 'center', boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>

                    {/* Welcome */}
                    <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '3vh', }}>Welcome To Future</div>
                    <div style={{ color: '#96969F', fontSize: '12px', marginTop: '1vh', marginBottom: '2vh' }}>Login with your Guest or Google account</div>

                    {/* Google and Guest Login */}
                    <button style={hover === 1 ? { ...styles.autoButton, backgroundColor: '#454545' } : styles.autoButton} onMouseEnter={() => setHover(1)} onMouseLeave={() => setHover(0)}
                        onClick={() => handleGoogleLogin()}
                    >
                        <img src={google} alt="Google" style={{ height: '2vh', marginRight: '1vh' }}
                        />
                        Login with Google</button>
                    <button style={hover === 2 ? { ...styles.autoButton, backgroundColor: '#454545' } : styles.autoButton} onMouseEnter={() => setHover(2)} onMouseLeave={() => setHover(0)}
                        onClick={() => gotoWeb()}
                    >
                        <img src={guest} alt="Google" style={{ height: '2vh', marginRight: '1vh' }} />
                        Continue as Guest</button>

                    {/* Continue with */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '2vh', marginBottom: '0vh' }}>
                        <div style={{ width: '20%', height: '1px', backgroundColor: '#96969F', marginTop: '2vh', marginBottom: '2vh' }}></div>
                        <div style={{ color: '#96969F', fontSize: '13px', marginTop: '1vh', marginBottom: '1vh', marginRight: '1vh', marginLeft: '1vh' }}>Or continue with</div>
                        <div style={{ width: '20%', height: '1px', backgroundColor: '#96969F', marginTop: '2vh', marginBottom: '2vh' }}></div>
                    </div>

                    {/* Email and Password */}
                    <div style={{ ...styles.text2, alignSelf: 'flex-start' }}>Email</div>
                    <input
                        style={
                            focus === 3 ? { ...styles.textInput, border: '1px solid #fff' } :
                                hover === 3 ? { ...styles.textInput, backgroundColor: '#1a1a1a' }
                                    : styles.textInput}
                        onMouseEnter={() => setHover(3)} onMouseLeave={() => setHover(0)}
                        onFocus={() => setFocus(3)} onBlur={() => setFocus(0)}
                        type="text"
                        placeholder="m@example.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <div style={{ ...styles.text2, alignSelf: 'flex-start' }}>Password</div>
                    <input
                        style={
                            focus === 6 ? { ...styles.textInput, border: '1px solid #fff' } :
                                hover === 6 ? { ...styles.textInput, backgroundColor: '#1a1a1a' }
                                    : styles.textInput}
                        onMouseEnter={() => setHover(6)} onMouseLeave={() => setHover(0)}
                        onFocus={() => setFocus(6)} onBlur={() => setFocus(0)}
                        type="password"
                        placeholder=""
                        value={pass}
                        onChange={(e) => setPass(e.target.value)} />

                    {incorrect && <div style={styles.text3}>{incorrect}</div>}
                    {/* Login Button */}
                    <button
                        style={hover === 4 ? { ...styles.submitButton, backgroundColor: '#d9d9d9' } : styles.submitButton}
                        onMouseEnter={() => setHover(4)} onMouseLeave={() => setHover(0)}
                        onClick={() => handleLogin(username, pass)}>Login</button>
                    <button
                        style={hover === 5 ? { ...styles.autoButton2, backgroundColor: '#454545' } : styles.autoButton2}
                        onMouseEnter={() => setHover(5)} onMouseLeave={() => setHover(0)}
                        onClick={() => handleRegister(username, pass)}>Register</button>
                    {/* <button
                        style={hover === 5 ? { ...styles.autoButton2, backgroundColor: '#454545' } : styles.autoButton2}
                        onMouseEnter={() => setHover(5)} onMouseLeave={() => setHover(0)}
                        onClick={() => fetchData()}>fetch data</button> */}
                </div>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2vh', width: '30vw', flexDirection: 'column', fontSize: '12px', position: 'absolute', bottom: '12vh', color: '#ababab' }}>
                By clicking continue, you agree to our
                <div>
                    <button style={styles.tos}>Terms of Service</button>and<button style={styles.tos}>Privacy Policy.</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    tos: {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderWidth: '0',
        color: '#ababab',
        fontSize: '12px',
        fontWeight: 'bold',
        textDecoration: 'underline',
        listStyle: 'none',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text3: {
        fontFamily: 'Inter',
        // position: 'absolute',
        bottom: '15vh',
        color: '#e36259',
        fontSize: '10px',
        marginTop: '0.9em',
        fontWeight: 600,
        marginLeft: '4.6vw',
        alignSelf: 'flex-start',
    },
    text2: {
        fontFamily: 'Inter',
        color: '#d9d9d9',
        fontSize: '14px',
        marginTop: '0.9em',
        fontWeight: 600,
        marginLeft: '4.6vw',
    },
    submitButton: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        borderWidth: '0',
        color: '#000',
        cursor: 'pointer',
        display: 'flex',
        border: '1px solid #454545',
        fontSize: '13px',
        fontWeight: 600,
        marginTop: '3vh',
        padding: '10px 2px',
        width: '21vw',
        textAlign: 'center',
        transition: 'all 200ms',
        listStyle: 'none',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        justifyContent: 'center',
        alignItems: 'center',
    },
    autoButton2: {
        backgroundColor: 'transparent',
        borderRadius: '5px',
        borderWidth: '0',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        border: '1px solid #454545',
        // fontFamily: 'Poppins',
        fontSize: '13px',
        fontWeight: 600,
        listStyle: 'none',
        marginTop: '1vh',
        padding: '10px 28px',
        width: '21vw',
        textAlign: 'center',
        transition: 'all 200ms',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        justifyContent: 'center',
        alignItems: 'center',
    },
    autoButton: {
        backgroundColor: 'transparent',
        borderRadius: '5px',
        borderWidth: '0',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        border: '1px solid #454545',
        // fontFamily: 'Poppins',
        fontSize: '13px',
        fontWeight: 600,
        listStyle: 'none',
        marginTop: '1vh',
        padding: '8px 28px',
        width: '20vw',
        textAlign: 'center',
        transition: 'all 200ms',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'Inter',
        backgroundColor: '#000',
        borderRadius: '4px',
        border: '1px solid #454545',
        color: '#fff',
        fontSize: '14px',
        marginTop: '0.5em',
        fontWeight: 'medium',
        width: '20vw',
        // height: '14px',
        padding: '8px 8px',
        transition: 'all 0.2s',
        lineHeight: '1',
        outline: 'none',
        overflow: "hidden",
        resize: "none",
    },
}