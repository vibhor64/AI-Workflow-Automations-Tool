import { useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser, requestWithAuth, refreshToken } from "./auth"

async function initializeUserSession() {
    const accessToken = sessionStorage.getItem("access_token");
    try {

        if (!accessToken) {
            // No access token, try seamless login
            console.log("No access token, trying seamless login")
            const seamlessLoginSuccess = await refreshToken();
            if (!seamlessLoginSuccess) {
                // Redirect user to login page or show login prompt
                console.log("User needs to log in manually");
            }
        } else {
            console.log("User is already logged in");
        }
    } catch (e){
        console.log("Error is fetching token: ", e)
    }

}

async function handleLogin(username, password) {
    console.log(username, password);
    try {
        await loginUser(username, password);
        console.log("Logged in!");
        const userData = await fetchData();
        console.log("User Data:", userData);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function handleRegister(username, password) {
    try {
        await registerUser(username, password);
        console.log("Logged in!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function handleLogout() {
    try {
        logoutUser();
        console.log("Logged out!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}
async function fetchData() {
    try {
        const data = await requestWithAuth("/users/me");
        console.log("Protected Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}


export const LoginWindow = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        async function initSession() {
            await initializeUserSession();
        }
        initSession();
    }, []); 

    return (
        <div style={{display: 'flex', height: '50vh', width: '60vw', backgroundColor: '#fff', border: '3px solid #2d4ecf', borderRadius: '10px', zIndex: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <button onClick={() => handleLogin(username, pass)}>Login</button>
            <button onClick={() => handleLogout()}>Logout</button>
            <button onClick={() => handleRegister(username, pass)}>Register</button>
            <button onClick={() => fetchData()}>Fetch data</button>
        </div>
    )
}