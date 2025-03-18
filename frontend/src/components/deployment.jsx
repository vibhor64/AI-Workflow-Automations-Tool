import { useEffect, useState } from "react";
import { Mosaic, OrbitProgress } from "react-loading-indicators";
import axios from "axios";
import "./deploy.css";
import AutomationWindow from "./automationWindow";
import { CopyBlock, dracula } from "react-code-blocks";
import LottieAnimation from "./sub/lottie";
import Select from "react-select";
import "./stylings/deployment.css";
import { discord_authentication } from "../logic/auth";

export const Deployment = (props) => {
    const { inputs, outputs, integration_input, nodes, edges } = props;
    const [inputValues, setInputValues] = useState({});
    const [hover, setHover] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [pipeName, setPipeName] = useState("");
    const [hoverInput, setHoverInput] = useState(null);
    const [hoverButton, setHoverButton] = useState(false);
    const [hoverButton2, setHoverButton2] = useState(false);
    const [focusInput, setFocusInput] = useState(null);
    const [pipelineOutput, setPipelineOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [automationWindow, setAutomationWindow] = useState(false);
    const [creds_dict, setCreds_dict] = useState(null);
    const [isDeployed, setIsDeployed] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [pipe_id, setPipe_id] = useState(null);
    const [language, setLanguage] = useState("TypeScript");

    useEffect(() => {
        if (pipelineOutput) {
            const container = document.querySelector(".output-container");
            const children = container.children;

            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.15}s`; // Adjust delay per element
            });
        }
    }, [pipelineOutput]);

    const texts = [
        "Now how should I handle this? 🤔",
        "This will require some Quantum Mechanics",
        "Damn, that's a hard one.",
        "Ah, another one of these",
        "Just a minecraft minute...",
        "I love executing these type of pipelines!",
        "I hope you're ready for this...",
        "Even Einstein couldn't execute this pipeline.",
        "Time runs slower when I am executing these pipelines.",
        "This is a hard one, but I'll give it a try...",
        "Aha, another one of these.",
        "You gotta give me harder ones next time.",
        "Resolving edges, one at a time",
        "These variables are confusing me...",
        "Whoever made this pipeline is a pure genius.",
        "My AI pet hasn't been eating enough GPUs recently, it might need a break.",
        "I will always be running pipelines for you.",
        "Resolving these edges will take 50 million fortnite years.",
    ];

    const randomText = texts[Math.floor(Math.random() * texts.length)];

    const options = [
        { value: "Discord", label: "Discord 🤖" },
        { value: "None", label: "None ❌" },
        { value: "More coming soon!", label: "More coming soon!" },
    ];

    const [selectedOption, setSelectedOption] = useState("Select Trigger?");

    const changePage2 = (page) => {
        // setSelectedCategory('Login');
        setSelectedOption(page);
        console.log(page.value);
    };

    const handleInputChange = (index, value) => {
        setInputValues((prev) => ({ ...prev, [index]: value }));
    };

    const generateQueryParams = () => {
        const params = nodes
            .filter((node) => node.data.name === "Input")
            .map((node) => {
                const value = inputValues[node.data.fieldValue1];
                if (value !== undefined) {
                    return `${encodeURIComponent(
                        node.data.fieldValue1
                    )}=${encodeURIComponent(value)}`;
                }
                return `${encodeURIComponent(node.data.fieldValue1)}=`;
            })
            .filter((param) => param !== "") //Remove empty strings
            .join("&");

        return params ? `${params}` : "";
    };

    const generateDiscordParams = () => {
        const params = nodes
            .filter((node) => node.data.name === "Input")
            .map((node) => {
                const value = inputValues[node.data.fieldValue1];
                if (value !== undefined) {
                    return `${node.data.fieldValue1}=${value},`;
                }
                return `${node.data.fieldValue1}=`;
            })
            .filter((param) => param !== ""); //Remove empty strings
        return params ? `${params}` : "";
    };

    const autoResize = (e) => {
        e.target.style.paddingBottom = "0px";
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const sendPipelineData = async () => {
        setIsVisible(false);
        const formattedNodes = nodes.map((node) => ({
            id: node.id,
            name: node.data.name,
            username: node.data.username || "",
            rightHandles: node.data.rightHandles,
            leftHandles: node.data.leftHandles,
            sources: node.data.sources || [],
            targets: node.data.targets || [],
            fieldValue1: node.data.fieldValue1 || "",
            fieldValue2: node.data.fieldValue2 || "",
        }));

        formattedNodes.forEach((node) => {
            if (node.name === "Input") {
                Object.assign(node, {
                    id: node.id,
                    name: node.name,
                    username: node.username || "",
                    rightHandles: node.rightHandles,
                    leftHandles: node.leftHandles,
                    sources: node.sources || [],
                    targets: node.targets || [],
                    fieldValue1: inputValues[node.fieldValue1],
                    fieldValue2: node.fieldValue2 || "",
                });
            }
        });

        const formattedEdges = edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
        }));

        console.log(JSON.stringify({ formattedNodes }, null, 2));
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/private/deployment/parse",
                {
                    // const response = await axios.post('http://127.0.0.1:8000/private/automation/parse?hello=whaterverrrr', {
                    formattedNodes,
                    formattedEdges,
                }
            );
            const { pipelineOutput } = response.data;
            let displayOutput;

            if (pipelineOutput?.status === "error") {
                displayOutput =
                    "An unexpected error occurred while processing the pipeline! This is likely because your pipeline inputs are invalid. If the problem persists, re-authenticate all your inbound integrations. <div>Error message from server: ";
                displayOutput += pipelineOutput["message"];
                displayOutput += "</div>";
            } else if (
                typeof pipelineOutput === "object" &&
                pipelineOutput !== null
            ) {
                // If pipelineOutput is an object, stringify it for display
                displayOutput = JSON.stringify(pipelineOutput, null, 2);
            } else {
                // Otherwise, use it as-is (assuming it's already a string)
                displayOutput = pipelineOutput;
            }
            // alert(`Deployment Successful! \n${pipelineOutput}`);
            setPipelineOutput(displayOutput);
        } catch (error) {
            console.error("Error sending pipeline data:", error);
            setPipelineOutput(
                "An unexpected error occurred while processing the pipeline! This is likely because your pipeline inputs are invalid. If the problem persists, re-authenticate all your inbound integrations."
            );
            // alert('Error occurred while processing the pipeline!');
        }
        setIsLoading(false);
    };

    const handleAutomation = async () => {
        if (pipeName === "") return alert("Please enter a pipeline name");

        setIsLoading2(true);

        const formattedNodes = nodes.map((node) => ({
            id: node.id,
            name: node.data.name,
            username: node.data.username || "",
            rightHandles: node.data.rightHandles,
            leftHandles: node.data.leftHandles,
            sources: node.data.sources || [],
            targets: node.data.targets || [],
            fieldValue1: node.data.fieldValue1 || "",
            fieldValue2: node.data.fieldValue2 || "",
        }));

        const formattedEdges = edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
        }));

        setIsLoading(false);

        try {
            // const response = await axios.post("private/automate", {
            //   formattedNodes,
            //   formattedEdges,
            // }, );
            let token = sessionStorage.getItem("access_token");

            if (!token) {
                await refreshToken(); // Get a new token if none exists
                token = getAccessToken();
            }
            let name = pipeName;
            const response = await fetch(
                `http://127.0.0.1:8000/private/automate?name=${encodeURIComponent(
                    name
                )}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        formattedNodes,
                        formattedEdges,
                    }),
                    credentials: "include",
                }
            );
            const { pipeline_id } = await response.json(); // Fix response handling
            console.log("Pipeline ID:", pipeline_id);
            setPipe_id(pipeline_id);
            setIsDeployed(true);
        } catch (error) {
            console.error("Error sending pipeline data:", error);
            // alert('Error occurred while processing the pipeline!');
        }

        setIsLoading2(false);
    };

    const codeSnippets = {
        TypeScript: `async function executePipeline(pipelineId: string): Promise<any> {
  try {
      const response = await fetch(\`\${apiUrl}/\${pipelineId}\`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
              \`HTTP error! Status: \${response.status}, Message: \${errorData.detail || response.statusText}\`
          );
      }

      const result = await response.json();
      console.log('Pipeline executed successfully:', result);
      return result;
  } catch (error: any) {
      console.error('Error executing pipeline:', error.message);
      throw error;
  }
}
    `,
        JavaScript:
            "async function executePipeline(pipelineId) {\n" +
            "  try {\n" +
            "     const response = await fetch(`${apiUrl}/${pipelineId}`, {\n" +
            "         method: 'POST',\n" +
            "         headers: {\n" +
            "             'Content-Type': 'application/json' \n" +
            "         },\n" +
            "     });\n\n" +
            "      if (!response.ok) {" +
            "\n" +
            "         const errorData = await response.json();" +
            "\n" +
            "         throw new Error(`HTTP error! Status: ${" +
            "\n" +
            "           response.status" +
            "\n" +
            "         }, Message: ${errorData.detail || response.statusText}`);" +
            "\n" +
            "     }" +
            "\n" +
            "\n" +
            "     const result = await response.json();" +
            "\n" +
            "     console.log('Pipeline executed successfully:', result);" +
            "\n" +
            "     return result;" +
            "\n" +
            " } catch (error) {" +
            "\n" +
            "     console.error('Error executing pipeline:', error.message);" +
            "\n" +
            "     throw error;" +
            "\n" +
            " }" +
            "\n" +
            "}",
        Python: `import requests

def execute_pipeline(pipeline_id):
    url = f"{apiUrl}/{pipeline_id}"
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, headers=headers)
    
    if response.status_code != 200:
        raise Exception(f"HTTP error! Status: {response.status_code}, Message: {response.json().get('detail', response.reason)}")
    
    result = response.json()
    print("Pipeline executed successfully:", result)
    return result`,
        Go: `
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

const apiUrl = "https://example.com/api" // Replace with your actual API base URL

func executePipeline(pipelineID string) (map[string]interface{}, error) {
    // Construct the full URL
    url := fmt.Sprintf("%s/%s", apiUrl, pipelineID)

    // Create the HTTP POST request
    req, err := http.NewRequest("POST", url, nil)
    if err != nil {
        return nil, fmt.Errorf("failed to create request: %w", err)
    }

    // Set headers
    req.Header.Set("Content-Type", "application/json")

    // Send the request using the default HTTP client
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("HTTP request failed: %w", err)
    }
    defer resp.Body.Close() // Ensure the response body is closed

    // Read the response body
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("failed to read response body: %w", err)
    }

    // Check for HTTP success status (200-299 range)
    if resp.StatusCode < 200 || resp.StatusCode >= 300 {
        // Parse the error response as JSON
        var errorData map[string]interface{}
        if err := json.Unmarshal(body, &errorData); err != nil {
            // If JSON parsing fails, use the raw response body or status text
            return nil, fmt.Errorf("HTTP error! Status: %d, Message: %s", resp.StatusCode, string(body))
        }

        // Extract the error message from the JSON response
        errorMessage := errorData["detail"]
        if errorMessage == nil {
            errorMessage = resp.Status
        }

        return nil, fmt.Errorf("HTTP error! Status: %d, Message: %v", resp.StatusCode, errorMessage)
    }

    // Parse the successful response as JSON
    var result map[string]interface{}
    if err := json.Unmarshal(body, &result); err != nil {
        return nil, fmt.Errorf("failed to parse response JSON: %w", err)
    }

    // Log the success message
    log.Printf("Pipeline executed successfully: %+v\n", result)

    return result, nil
}

func main() {
    // Example usage
    pipelineID := "12345" // Replace with your actual pipeline ID
    result, err := executePipeline(pipelineID)
    if err != nil {
        log.Fatalf("Error executing pipeline: %v", err)
    }

    // Print the result
    fmt.Println("Pipeline Result:", result)
}
`,
        Java: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.concurrent.CompletableFuture;

public class PipelineExecutor {

    private static final String apiUrl = "https://example.com/api"; // Replace with your API URL

    public static CompletableFuture<Void> executePipeline(String pipelineId) {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl + "/" + pipelineId))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        return client.sendAsync(request, BodyHandlers.ofString())
                .thenApply(response -> {
                    if (response.statusCode() != 200) {
                        try {
                            // Parse error response as JSON
                            String errorBody = response.body();
                            throw new RuntimeException("HTTP error! Status: " + response.statusCode() +
                                    ", Message: " + parseErrorMessage(errorBody));
                        } catch (Exception e) {
                            throw new RuntimeException("Error parsing response: " + e.getMessage());
                        }
                    }
                    return response;
                })
                .thenApply(HttpResponse::body)
                .thenAccept(result -> {
                    System.out.println("Pipeline executed successfully: " + result);
                })
                .exceptionally(error -> {
                    System.err.println("Error executing pipeline: " + error.getMessage());
                    throw new RuntimeException(error);
                });
    }

    private static String parseErrorMessage(String responseBody) {
        // Assuming the error response is JSON with a "detail" field
        try {
            return JsonParser.parseString(responseBody).getAsJsonObject().get("detail").getAsString();
        } catch (Exception e) {
            return "Unknown error";
        }
    }

    public static void main(String[] args) {
        executePipeline("12345").join(); // Example usage
    }
}
`,
        Rust: `
use reqwest::Client;
use serde_json::Value;
use std::error::Error;

const API_URL: &str = "https://example.com/api"; // Replace with your API URL

async fn execute_pipeline(pipeline_id: &str) -> Result<(), Box<dyn Error>> {
    let client = Client::new();
    let url = format!("{}/{}", API_URL, pipeline_id);

    let response = client
        .post(&url)
        .header("Content-Type", "application/json")
        .send()
        .await?;

    if !response.status().is_success() {
        let error_data: Value = response.json().await?;
        let error_message = error_data["detail"]
            .as_str()
            .unwrap_or_else(|| response.status().canonical_reason().unwrap_or("Unknown error"));
        return Err(format!(
            "HTTP error! Status: {}, Message: {}",
            response.status(),
            error_message
        )
        .into());
    }

    let result: Value = response.json().await?;
    println!("Pipeline executed successfully: {:?}", result);
    Ok(())
}

#[tokio::main]
async fn main() {
    match execute_pipeline("12345").await {
        Ok(_) => println!("Pipeline execution completed."),
        Err(e) => eprintln!("Error executing pipeline: {}", e),
    }
}
`,
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
            }}>
            {/* Input */}
            <div style={{ marginTop: "1.5vh", marginLeft: "5em" }}>
                <h1 style={{ fontSize: "55px", fontWeight: "bold" }}>Inputs</h1>
                {/* {integration_input && integration_input.length > 0 && <>
                
                </>} */}
                {integration_input?.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            marginTop: "2em",
                            flexDirection: "column",
                        }}>
                        <span
                            key={index}
                            style={{
                                color: "#2D4ECF",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}>
                            ⚡{value} Integration
                        </span>
                    </div>
                ))}
                {inputs?.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            marginTop: "2em",
                            flexDirection: "column",
                        }}>
                        <span
                            style={{
                                color: "#5B5B5B",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}>
                            {value}:
                        </span>
                        <textarea
                            style={
                                focusInput === index
                                    ? {
                                          ...styles.textInput,
                                          border: "3px solid #2D4ECF",
                                          color: "#000",
                                      }
                                    : hoverInput === index
                                    ? {
                                          ...styles.textInput,
                                          backgroundColor: "#d9d9d9",
                                          border: "3px solid #d9d9d9",
                                      }
                                    : styles.textInput
                            }
                            type="text"
                            placeholder="Type here..."
                            value={inputValues[value] || ""}
                            onChange={(e) =>
                                handleInputChange(value, e.target.value)
                            }
                            onInput={autoResize}
                            onMouseEnter={() => setHoverInput(index)}
                            onMouseLeave={() => setHoverInput(null)}
                            onFocus={() => setFocusInput(index)}
                            onBlur={() => setFocusInput(null)}
                            rows={1}
                        />
                    </div>
                ))}
                <button
                    style={
                        hoverButton2
                            ? { ...styles.goButton, backgroundColor: "#385EF4" }
                            : styles.goButton
                    }
                    onMouseEnter={() => setHoverButton2(true)}
                    onMouseLeave={() => setHoverButton2(false)}
                    onClick={sendPipelineData}>
                    Test
                </button>
                <div
                    style={{
                        height: "5vh",
                        backgroundColor: "transparent",
                    }}></div>
            </div>

            {/* Output */}
            <div
                style={{
                    marginTop: "1.5vh",
                    marginLeft: "10em",
                    width: "33vw",
                }}>
                <h1 style={{ fontSize: "55px", fontWeight: "bold" }}>Output</h1>
                {isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            marginLeft: "0em",
                            marginTop: "3em",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            flexDirection: "column",
                        }}>
                        <Mosaic
                            color={["#db8d39", "#7ddb39", "#782ad1", "#d12a7b"]}
                            size="medium"
                            text=""
                            textColor="#2D4ECF"
                        />
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                marginTop: "1em",
                                maxWidth: "50%",
                                textAlign: "center",
                                color: "#5B5B5B",
                            }}>
                            {randomText}
                        </div>
                    </div>
                ) : null}
                {!isLoading && pipelineOutput && (
                    <div
                        className={`output-container ${
                            isVisible ? "fade-in" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: pipelineOutput }}
                        style={{
                            marginTop: "1em",
                            paddingBottom: "1em",
                            transition: "all 0.3s ease-out",
                            fontWeight: "400",
                        }}></div>
                )}
            </div>

            {/* Automation */}
            <div
                style={{
                    marginTop: "1.5vh",
                    width: "30vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <h1
                    style={{
                        fontSize: "55px",
                        fontWeight: "bold",
                        color: "#2D4ECF",
                    }}>
                    Automation
                </h1>
                <span
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "5vh",
                        maxWidth: "90%",
                        textAlign: "center",
                        color: "#5B5B5B",
                        marginBottom: "2vh",
                    }}>
                    {" "}
                    {isLoading2 ? (
                        <OrbitProgress
                            color="#2D4ECF"
                            size="medium"
                            text=""
                            textColor=""
                        />
                    ) : !isDeployed ? (
                        "Your current workflow can be completely automated. Click the button below to never bother doing this task again by yourself!"
                    ) : (
                        <div>
                            <LottieAnimation />
                            Your automation has been successfully deployed! Head
                            over to automations tab to manage your automations.
                            <div
                                style={{
                                    textAlign: "start",
                                    color: "#000",
                                    marginTop: "5vh",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                }}>
                                {selectedOption.value === "Discord" && (
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <hr></hr>
                                        <div
                                            style={{
                                                marginTop: "3vh",
                                                marginBottom: "1vh",
                                                fontSize: "29px",
                                                color: "#3a74f0",
                                                fontWeight: 800,
                                                alignSelf: 'center'
                                            }}>
                                            Discord Automation ✨
                                        </div>

                                        To execute this pipeline through discord, use the following syntax in a discord channel where Weavebot is added:
                                        <pre
                                            style={{
                                                background: "#d9d9d9",
                                                padding: "10px",
                                                borderRadius: "6px",
                                                color: "#3d3d3d",
                                                overflowX: "scroll",
                                                maxWidth: "100%",
                                            }}>
                                            <code>
                                                !weave {`{pipeline_id}`}{" "}
                                                input1=input1, input2=input2...
                                            </code>
                                        </pre>
                                        Example:
                                        <pre
                                            style={{
                                                background: "#d9d9d9",
                                                padding: "10px",
                                                borderRadius: "6px",
                                                color: "#3d3d3d",
                                                overflowX: "scroll",
                                                maxWidth: "100%",
                                            }}>
                                            <code>
                                                !weave {pipe_id} input=john
                                                pork, age=64, work experience =
                                                software engineer
                                            </code>
                                        </pre>
                                        In your case, use the following command:
                                        <pre
                                            style={{
                                                background: "#d9d9d9",
                                                padding: "10px",
                                                borderRadius: "6px",
                                                color: "#3d3d3d",
                                                overflowX: "scroll",
                                                maxWidth: "100%",
                                            }}>
                                            <code>
                                                !weave {pipe_id}{" "}
                                                {generateDiscordParams()}
                                            </code>
                                        </pre>
                                        
                                        <div
                                            style={{
                                                marginBottom: "2vh",
                                                color: "#fc5d5d",
                                            }}>
                                            Now, if you haven't already, make sure you have added our
                                            bot to your server. You haven't
                                            already, click "Add Bot" button
                                            below, but after reading everything!
                                        </div>
                                        <button
                                            style={
                                                     {
                                                          ...styles.autoButton,
                                                          justifySelf: 'center',
                                                          marginTop: '1vh'
                                                      }
                                            }
                                            onClick={() => discord_authentication()}
                                            >
                                              Add Bot to Discord 🤖
                                        </button>
                                    </div>
                                )}
                                <hr></hr>
                                <div
                                    style={{
                                        marginTop: "3vh",
                                        marginBottom: "1vh",
                                        fontSize: "18px",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}>
                                    For Developers
                                </div>
                                You can make API requests to your pipeline at
                                the following URL:
                                <pre
                                    style={{
                                        background: "#d9d9d9",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        color: "#3d3d3d",
                                        overflowX: "scroll",
                                    }}>
                                    <code>
                                        http://127.0.0.1:8000/pipelines/
                                        {pipe_id}
                                    </code>
                                </pre>
                                Make sure to send ALL input field values as
                                query parameters, otherwise they will default to
                                empty string. For example,
                                <pre
                                    style={{
                                        background: "#d9d9d9",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        overflowX: "scroll",
                                        color: "#3d3d3d",
                                    }}>
                                    <code>
                                        http://127.0.0.1:8000/pipelines/
                                        {pipe_id}
                                        ?name=John+Pork&age=25&city=New+York&work+experience=Software+Engineer
                                    </code>
                                </pre>
                                In your case, it might look something like this:
                                <pre
                                    style={{
                                        background: "#d9d9d9",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        overflowX: "scroll",
                                        color: "#3d3d3d",
                                    }}>
                                    <code>
                                        http://127.0.0.1:8000/pipelines/
                                        {pipe_id}?{generateQueryParams()}
                                    </code>
                                </pre>
                                <div
                                    style={{
                                        marginTop: "3vh",
                                        marginBottom: "1vh",
                                        fontSize: "18px",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}>
                                    Calling the API
                                </div>
                                <div style={{ marginBottom: "2vh" }}>
                                    Calling Weavebot APIs are as simple as
                                    calling any other generic API. I have
                                    provided code for the same in the code
                                    editor below.
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) =>
                                        setLanguage(e.target.value)
                                    }
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "8px",
                                        backgroundColor: "#fff",
                                        color: "#333",
                                        fontWeight: 500,
                                    }}>
                                    <option value="TypeScript">
                                        TypeScript
                                    </option>
                                    <option value="JavaScript">
                                        JavaScript
                                    </option>
                                    <option value="Python">Python</option>
                                    <option value="Go">Go</option>
                                    <option value="Rust">Rust</option>
                                    <option value="Java">Java</option>
                                </select>
                                <CopyBlock
                                    text={codeSnippets[language]}
                                    language={language}
                                    showLineNumbers={false}
                                    theme={dracula}
                                    wrapLongLines={true}
                                    customStyle={{
                                        overflowX: "auto",
                                        padding: "20px",
                                        boxShadow:
                                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                        marginTop: "2vh",
                                    }}
                                />
                                <div style={{ marginTop: "2vh" }}>
                                    Note that all code snippets (except
                                    TypeScript & JavaScript) are AI generated
                                    and hence prone to bugs.
                                </div>
                                <div
                                    style={{
                                        marginTop: "3vh",
                                        marginBottom: "1vh",
                                        fontSize: "18px",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}>
                                    Success Response
                                </div>
                                Status Code:{" "}
                                <div
                                    style={{
                                        backgroundColor: "#d9d9d9",
                                        display: "inline-block",
                                        borderRadius: "6px",
                                        color: "#3d3d3d",
                                        padding: "5px 5px",
                                        fontSize: "12px",
                                    }}>
                                    200 OK
                                </div>
                                <pre
                                    style={{
                                        background: "#d9d9d9",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        overflowX: "scroll",
                                        color: "#3d3d3d",
                                    }}>
                                    <code>
                                        {`{
  "message": "Pipeline {pipeline_id} executed successfully",
  "result": { /* Pipeline execution output, generally a string */ }
}`}
                                    </code>
                                </pre>
                                <div
                                    style={{
                                        marginTop: "3vh",
                                        marginBottom: "1vh",
                                        fontSize: "18px",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}>
                                    Error Response
                                </div>
                                Status Code:{" "}
                                <div
                                    style={{
                                        backgroundColor: "#d9d9d9",
                                        display: "inline-block",
                                        borderRadius: "6px",
                                        color: "#3d3d3d",
                                        padding: "5px 5px",
                                        fontSize: "12px",
                                    }}>
                                    404 Not Found
                                </div>
                                <pre
                                    style={{
                                        background: "#d9d9d9",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        overflowX: "scroll",
                                        color: "#3d3d3d",
                                    }}>
                                    <code>
                                        {`{
  "detail": "<error_message>"
}`}
                                    </code>
                                </pre>
                                This occurs if the specified pipeline does not
                                exist in the database.
                                <div
                                    style={{
                                        marginTop: "2.4vh",
                                        marginBottom: "1vh",
                                        maxWidth: "38rem",
                                        fontSize: "18px",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        backgroundColor: "#f23d3d",
                                        borderRadius: "6px",
                                        padding: "5px 10px",
                                    }}>
                                    Rate limit is set to 15 requests per minute!
                                </div>
                            </div>
                        </div>
                    )}
                </span>

                {/* Enter Pipeline Name */}
                {!isDeployed && (
                    <>
                        <Select
                            value={selectedOption}
                            defaultValue={"Add Trigger?"}
                            onChange={(e) => changePage2(e)}
                            options={options}
                            className="dropdown-2"
                            placeholder="Add Trigger?"
                        />
                        <label style={{ marginTop: "10px" }}>
                            <textarea
                                value={pipeName}
                                // onInput={handleInput}
                                onChange={(e) => setPipeName(e.target.value)}
                                onMouseEnter={() => setHover(1)}
                                onMouseLeave={() => setHover(0)}
                                onFocus={() => setIsFocused(3)}
                                onBlur={() => setIsFocused(0)}
                                rows={1}
                                placeholder="Automation name?"
                                style={{
                                    marginTop: "1vh",
                                    fontFamily: "Inter",
                                    backgroundColor:
                                        hover === 1 ? "#d9d9d9" : "#ededed",
                                    border: `2px solid ${
                                        isFocused ? "#2d4ecf" : "#fff"
                                    }`,
                                    borderRadius: "10px",
                                    padding: "9px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    minWidth: "150px",
                                    height: "14px",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                    outline: "none",
                                    overflow: "hidden",
                                    resize: "none",
                                    color: "#a1a1a1",
                                    color: `${
                                        isFocused === 3 ? "#000" : "#a1a1a1"
                                    }`,
                                    transition: "border-color 0.2s ease-in-out",
                                }}
                            />
                        </label>
                    </>
                )}

                <button
                    style={
                        hoverButton && !isDeployed
                            ? {
                                  ...styles.autoButton,
                                  backgroundColor: "#2744B3",
                              }
                            : !isDeployed
                            ? styles.autoButton
                            : {
                                  ...styles.autoButton,
                                  backgroundColor: "#8AA1FF",
                              }
                    }
                    // onClick={() => setAutomationWindow(true)}
                    onClick={() => handleAutomation()}
                    onMouseEnter={() => setHoverButton(true)}
                    onMouseLeave={() => setHoverButton(false)}
                    disabled={isDeployed}>
                    {!isDeployed ? "Automate this ✨" : "Automated ✅"}
                </button>
            </div>

            {/* Automation Window */}
            {automationWindow && (
                <AutomationWindow
                    setAutomationWindow={setAutomationWindow}
                    creds_dict={creds_dict}
                />
            )}
        </div>
    );
};

const styles = {
    textInput: {
        fontFamily: "Inter",
        backgroundColor: "#ededed",
        borderRadius: "10px",
        border: "3px solid #ededed",
        color: "#9A9A9A",
        fontSize: "14px",
        marginTop: "0.7em",
        fontWeight: "medium",
        minWidth: "15vw",
        // height: '14px',
        padding: "8px",
        paddingBottom: "8px",
        transition: "all 0.2s",
        lineHeight: "1",
        outline: "none",
        overflow: "hidden",
        resize: "none",
    },
    autoButton: {
        backgroundColor: "#2D4ECF",
        borderRadius: "25px",
        borderWidth: "0",
        color: "#fff",
        cursor: "pointer",
        display: "inline-block",
        // fontFamily: 'Poppins',
        fontSize: "18px",
        fontWeight: "bold",
        listStyle: "none",
        marginTop: "2vh",
        marginBottom: "2vh",
        padding: "11px 18px",
        textAlign: "center",
        transition: "all 200ms",
        verticalAlign: "baseline",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
    },
    goButton: {
        backgroundColor: "#2D4ECF",
        borderRadius: "12px",
        borderWidth: "0",
        color: "#fff",
        cursor: "pointer",
        display: "inline-block",
        // fontFamily: 'Poppins',
        fontSize: "16px",
        fontWeight: "bold",
        listStyle: "none",
        marginTop: "2.5vh",
        padding: "9px 12px",
        textAlign: "center",
        transition: "all 200ms",
        verticalAlign: "baseline",
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
    },
};
