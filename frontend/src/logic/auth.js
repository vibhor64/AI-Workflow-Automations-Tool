export const BASE_URL = "http://127.0.0.1:8000/private";

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

export async function refreshToken() {
    try {
        const response = await fetch(`${BASE_URL}/refresh`, {
            method: "POST",
            credentials: "include", // Important for sending/receiving cookies
        });

        if (!response.ok) {
            clearAccessToken();
            return false;
        }

        const data = await response.json();
        console.log("Token refreshed");
        setAccessToken(data.access_token);
        return true;
    } catch (error) {
        clearAccessToken();
        console.log("Error refreshing token:", error);
        return false;
    }
}

export async function logoutUser() {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Logout failed!");
        }

        clearAccessToken(); 
        console.log("Cleared access token");

        console.log("Logout successful");
    } catch (error) {
        console.error("Error during logout:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function getUsername() {
    try {
        const response = await fetch(`${BASE_URL}/users/username`, {
            method: "GET",
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
        // console.log(data.username);
        return data.username;
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

export async function get_google_refresh_token() {
    try {
        let token = getAccessToken();

        const response = await fetch(`${BASE_URL}/auth/google/get_refresh_token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to create refresh google token");
        }

        const data = await response.json();
        console.log("Response from refreshing google token: ", data);
    } catch (error) {
        console.error("Error during refreshing google token: ", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

// Get Pipeline
export async function get_pipeline(pipeline_id) {
    try {
        console.log("Pipeline on client: ", pipeline_id);
        const response = await fetch(`${BASE_URL}/server/pipelines/fetch_one`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({pipeline_id}),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Delete pipeline failed!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during delete pipeline:", error.message);
        throw error;
    }
}

// Delete Automated Pipeline
export async function delete_automated_pipeline(pipeline_id) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }
        const response = await fetch(`${BASE_URL}/server/pipelines/delete_one`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({pipeline_id}),
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Delete pipeline failed!");
        }

        const data = await response.json();
        console.log("Response from delete pipeline: ", data);
    } catch (error) {
        console.error("Error during delete pipeline:", error.message);
        throw error;
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
export async function deleteBook(book_id) {
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
            body: JSON.stringify({book_id}),
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

export async function google_integration_authentication() {
    try {
        let token = getAccessToken();
        if (!token) {
            await refreshToken();
            token = getAccessToken();
        }

        // Redirect instead of fetching
        window.location.href = `${BASE_URL}/auth/google/integration`;
    } catch (error) {
        console.error("Error from discord auth: ", error.message);
        throw error;
    }
}

export async function validateGoogleCredentials() {
    try {
        // Step 1: Retrieve the access token
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Refresh the token if none exists
            token = getAccessToken();
        }

        // Step 2: Call the backend endpoint to validate credentials
        const response = await fetch(`${BASE_URL}/auth/google/validate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        // Step 3: Handle the response
        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to validate Google credentials");
        }

        const data = await response.json();
        console.log("Validation response:", data);

        // Step 4: Return the validation result
        return data.valid; // Returns `true` if valid, otherwise `false`
    } catch (error) {
        console.error("Error during Google credentials validation:", error.message);
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

export async function read_google_forms(form_identifier) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/read_form?form_identifier=${form_identifier}`, {
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


export async function read_google_sheets(sheet_identifier, sheet_range) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/read_google_sheets?sheet_identifier=${sheet_identifier}` + (sheet_range ? `&sheet_range=${sheet_range}` : ''), {
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



export async function read_google_meet(meet_title) {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/integrations/read_meet_transcript?meet_title=${meet_title}`, {
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

export async function discord_authentication() {
    try {
        let token = getAccessToken();
        if (!token) {
            await refreshToken();
            token = getAccessToken();
        }

        // Redirect instead of fetching
        window.location.href = `${BASE_URL}/auth/discord/authorize?token=${token}`;
    } catch (error) {
        console.error("Error from discord auth: ", error.message);
        throw error;
    }
}


export async function validateDiscordCredentials() {
    try {
        // Step 1: Retrieve the access token
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Refresh the token if none exists
            token = getAccessToken();
        }

        // Step 2: Call the backend endpoint to validate credentials
        const response = await fetch(`${BASE_URL}/auth/discord/validate?token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        // Step 3: Handle the response
        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to validate Discord credentials");
        }

        const data = await response.json();
        console.log("Validation response:", data);

        // Step 4: Return the validation result
        return data.valid; // Returns `true` if valid, otherwise `false`
    } catch (error) {
        console.error("Error during Discord credentials validation:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function send_discord_message() {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/auth/notion/read_page?page_id=935529701567520820`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to send message");
        }

        const data = await response.json();
        console.log("Response from sending message: ", data);
    } catch (error) {
        console.error("Error sending message: ", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function notion_authentication() {
    try {
        let token = getAccessToken();
        if (!token) {
            await refreshToken();
            token = getAccessToken();
        }

        // Redirect instead of fetching
        window.location.href = `${BASE_URL}/auth/notion/authorize?token=${token}`;
    } catch (error) {
        console.error("Error from notion auth: ", error.message);
        throw error;
    }
}

export async function airtable_authentication() {
    try {
        let token = getAccessToken();
        if (!token) {
            await refreshToken();
            token = getAccessToken();
        }

        // Redirect instead of fetching
        window.location.href = `${BASE_URL}/auth/airtable/authorize?token=${token}`;
    } catch (error) {
        console.error("Error from airtable auth: ", error.message);
        throw error;
    }
}

export async function read_airtable() {
    try {
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Get a new token if none exists
            token = getAccessToken();
        }

        const response = await fetch(`${BASE_URL}/auth/airtable/read_table?url=https://airtable.com/app698vugnq63i7ia/tbltblglold5y42Bg/viwz7pwmYt2wkvkf0?blocks=hide&columns=CommentsProduct`, {
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

export async function validateAirtableCredentials() {
    try {
        // Step 1: Retrieve the access token
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Refresh the token if none exists
            token = getAccessToken();
        }

        // Step 2: Call the backend endpoint to validate credentials
        const response = await fetch(`${BASE_URL}/auth/airtable/validate?token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        // Step 3: Handle the response
        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to validate Airtable credentials");
        }

        const data = await response.json();
        console.log("Validation response:", data);

        // Step 4: Return the validation result
        return data.valid; // Returns `true` if valid, otherwise `false`
    } catch (error) {
        console.error("Error during Google credentials validation:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

export async function validateNotionCredentials() {
    try {
        // Step 1: Retrieve the access token
        let token = getAccessToken();

        if (!token) {
            await refreshToken(); // Refresh the token if none exists
            token = getAccessToken();
        }

        // Step 2: Call the backend endpoint to validate credentials
        const response = await fetch(`${BASE_URL}/auth/notion/validate?token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Include cookies in requests
        });

        // Step 3: Handle the response
        if (!response.ok) {
            const errorData = await response.json(); // Parse error details from the server
            throw new Error(errorData.detail || "Failed to validate Notion credentials");
        }

        const data = await response.json();
        console.log("Validation response:", data);

        // Step 4: Return the validation result
        return data.valid; // Returns `true` if valid, otherwise `false`
    } catch (error) {
        console.error("Error during Notion credentials validation:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}