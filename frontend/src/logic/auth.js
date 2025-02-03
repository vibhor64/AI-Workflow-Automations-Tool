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
    try {
        const response = await fetch(`${BASE_URL}/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include", // Important for sending/receiving cookies
        });

        if (!response.ok) {
            clearAccessToken();
            return false;
        }

        const data = await response.json();
        setAccessToken(data.access_token);
        return true;
    } catch (error) {
        clearAccessToken();
        console.log("Error refreshing token:", error);
        return false;
    }
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

export async function signInWithGoogle() {
    try {
        const response = await fetch(`${BASE_URL}/auth/google`, {
            method: "GET",
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

// Save New Template
export async function pushTemplate(template) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }
        const response = await fetch(`${BASE_URL}/database/add_template`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ template }), // Send the template data as JSON
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Login failed!");
        }

        const data = await response.json();
        console.log("Response from push template: ", data);
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Book Operations
export async function pushBook(book) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }
        const response = await fetch(`${BASE_URL}/database/add_book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(book), // Send the book data as JSON
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Login failed!");
        }

        const data = await response.json();
        console.log("Response from push book: ", data);
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Delete Book
export async function deleteBook(book_name) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }
        const response = await fetch(`${BASE_URL}/database/remove_book`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({book_name}),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Login failed!");
        }

        const data = await response.json();
        console.log("Response from delete book: ", data);
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Modify Book
export async function modifyBook(bookId, newData) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/database/modify_book`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: bookId,  // Send book name
                new_data: newData,    // Send new data
            }),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to modify book");
        }

        const data = await response.json();
        console.log("Response from modify book: ", data);
    } catch (error) {
        console.error("Error during modify book:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function save_google_creds(creds_dict) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/database/add_google_creds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(creds_dict),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to save google creds");
        }

        const data = await response.json();
        console.log("Response from save google creds: ", data);
    } catch (error) {
        console.error("Error during saving google creds:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function send_draft() {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/send_draft?isDraft=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to send google draft");
        }

        const data = await response.json();
        console.log("Response from sending google draft: ", data);
    } catch (error) {
        console.error("Error during sending google draft:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function create_doc(content) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/create_document`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: 'New Automation Doc', 
                text: 'Automated text'
            }),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to create google doc");
        }

        const data = await response.json();
        console.log("Response from creating google doc: ", data);
    } catch (error) {
        console.error("Error during creating google doc: ", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function read_doc(doc_identifier) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/read_document?doc_identifier=${doc_identifier}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to read google doc");
        }

        const data = await response.json();
        console.log("Response from reading google doc: ", data);
    } catch (error) {
        console.error("Error during reading google doc: ", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function read_emails(max_results, labels) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/read_emails?max_results=${max_results}` + (labels ? `&labels=${labels}` : ''), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to read emails");
        }

        const data = await response.json();
        console.log("Response from reading emails: ", data);
    } catch (error) {
        console.error("Error during reading emails: ", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}