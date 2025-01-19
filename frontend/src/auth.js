let accessToken = null; // Store in memory (cleared on page reload)

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your FastAPI backend URL

// Utility to set/get access token
export function setAccessToken(token) {
    sessionStorage.setItem("access_token", token);
}

export function getAccessToken() {
    return sessionStorage.getItem("access_token");
}

export function clearAccessToken() {
    sessionStorage.removeItem("access_token");
}

export async function registerUser(username, password) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Registration failed!");
    }
    console.log("User registered successfully!");
    const data = await response.json();
    setAccessToken(data.access_token);
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username, password }),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Login failed!");
        }

        const data = await response.json();
        setAccessToken(data.access_token);
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export function logoutUser() {
    clearAccessToken(); // Clear access token from sessionStorage
    // Refresh token is cleared automatically if it's in an HTTP-only cookie
    console.log("User logged out!");
}

export async function refreshToken() {
    const response = await fetch(`${BASE_URL}/refresh`, {
        method: "POST",
        credentials: "include", // Automatically sends the refresh token cookie
    });

    if (!response.ok) {
        clearAccessToken();
        throw new Error("Failed to refresh token!");
    }

    const data = await response.json();
    setAccessToken(data.access_token);
}

// Generic API Wrapper for Authenticated Requests
export async function requestWithAuth(endpoint, options = {}) {
    let token = getAccessToken();

    if (!token) {
        await refreshToken(); // Get a new token if none exists
        token = getAccessToken();
    }

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    let response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (response.status === 401) {
        // Handle token expiration
        await refreshToken();
        token = getAccessToken();

        options.headers.Authorization = `Bearer ${token}`;
        response = await fetch(`${BASE_URL}${endpoint}`, options);
    }

    if (!response.ok) {
        throw new Error("Request failed!");
    }

    return await response.json();
}
