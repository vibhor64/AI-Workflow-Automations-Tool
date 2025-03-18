import { useState } from "react";
import Close from '/close.png';
import { CopyBlock, dracula } from "react-code-blocks";

export const ApiModal = ({ pipe_id, setApiPage }) => {
  const [language, setLanguage] = useState("TypeScript");
  const [hoverClose, setHoverClose] = useState(false);
  const handleClick = () => {
    setApiPage(false);
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
        display: "flex",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        width: "40rem",
        height: "70%",
        overflow: "auto",
        borderRadius: "8px",
        border: "4px solid #2d4ecf",
        transition: "all 0.2s ease",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "20px 20px",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <div>
        {/* Close Modal */}
        <button
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          style={{
            backgroundColor: hoverClose ? "#e0e0e0" : "#fff",
            height: "30px", // Fixed size to match the container
            width: "30px", // Fixed size to match the container
            position: "absolute",
            top: "4%", // Center vertically
            left: "96%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust for exact centering
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            borderRadius: "50%",
            transition: "background-color 0.2s ease", // Only animate background color
          }}
          onClick={handleClick}
        >
          <img
            src={Close}
            alt="Close"
            style={{ width: "22px", height: "22px" }}
          />
        </button>

        <h2 style={{ textAlign: "center" }}>API Requests</h2>
        You can make API requests to your pipeline at the following URL:
        <pre
          style={{
            background: "#d9d9d9",
            maxWidth: "38rem",
            padding: "10px",
            borderRadius: "6px",
            color: "#3d3d3d",
            overflowX: "scroll",
          }}
        >
          <code>http://127.0.0.1:8000/pipelines/{pipe_id}</code>
        </pre>
        Make sure to send ALL input field values as query parameters, otherwise they will default to empty string. For example,
        <pre
          style={{
            background: "#d9d9d9",
            maxWidth: "38rem",
            padding: "10px",
            borderRadius: "6px",
            overflowX: "scroll",
            color: "#3d3d3d",
          }}
        >
          <code>
            http://127.0.0.1:8000/pipelines/{pipe_id}
            ?name=John+Pork&age=25&city=New+York&work+experience=Software+Engineer
          </code>
        </pre>
        <div
          style={{
            marginTop: "3vh",
            marginBottom: "1vh",
            maxWidth: "38rem",
            fontSize: "18px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Calling the API
        </div>
        <div style={{ marginBottom: "2vh" }}>
          Calling Weavebot APIs are as simple as calling any other generic API.
          I have provided code for the same in the code editor below.
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            border: "1px solid #ccc",
            maxWidth: "38rem",
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: "#fff",
            color: "#333",
            fontWeight: 500,
          }}
        >
          <option value="TypeScript">TypeScript</option>
          <option value="JavaScript">JavaScript</option>
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
            maxWidth: "38rem",
            padding: "20px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop: "2vh",
          }}
        />
        <div style={{ marginTop: "2vh" }}>
        Note that all code snippets (except TypeScript & JavaScript) are AI generated and hence prone to bugs.
        </div>
        <div
          style={{
            marginTop: "3vh",
            marginBottom: "1vh",
            fontSize: "18px",
            maxWidth: "38rem",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Success Response
        </div>
        Status Code:{" "}
        <div
          style={{
            backgroundColor: "#d9d9d9",
            display: "inline-block",
            borderRadius: "6px",
            maxWidth: "38rem",
            color: "#3d3d3d",
            padding: "5px 5px",
            fontSize: "12px",
          }}
        >
          200 OK
        </div>
        <pre
          style={{
            background: "#d9d9d9",
            padding: "10px",
            borderRadius: "6px",
            overflowX: "scroll",
            maxWidth: "38rem",
            color: "#3d3d3d",
          }}
        >
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
            maxWidth: "38rem",
            fontSize: "18px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Error Response
        </div>
        Status Code:{" "}
        <div
          style={{
            backgroundColor: "#d9d9d9",
            display: "inline-block",
            borderRadius: "6px",
            maxWidth: "38rem",
            color: "#3d3d3d",
            padding: "5px 5px",
            fontSize: "12px",
          }}
        >
          404 Not Found
        </div>
        <pre
          style={{
            background: "#d9d9d9",
            padding: "10px",
            borderRadius: "6px",
            maxWidth: "38rem",
            overflowX: "scroll",
            color: "#3d3d3d",
          }}
        >
          <code>
            {`{
  "detail": "<error_message>"
}`}
          </code>
        </pre>
        This occurs if the specified pipeline does not exist in the database.
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
          }}
        >
          Rate limit is set to 15 requests per minute!
        </div>
      </div>
    </div>
  );
};
