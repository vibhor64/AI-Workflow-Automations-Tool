// depScreen.js
import { React, useEffect, useState } from "react";
import { BlankAutomation } from "./blankAutomation";
import { Automation } from "./automation";
import { requestWithAuth } from "../logic/auth";
import { OrbitProgress } from "react-loading-indicators";

export const AutomationsScreen = () => {
  const [pipeline, setPipeline] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const data = await requestWithAuth("/server/pipelines/fetch_all");
      console.log(data);
      if (data && Array.isArray(data["pipelines"])) {
        setPipeline(data["pipelines"]);
      } else {
        console.error("Invalid data format:", data);
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "95vh" }}>
        {/* Category Selector */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            marginLeft: "20px",
            color: "#fff",
            fontWeight: "normal",
          }}
        >
          <span>Your deployed automations will appear here.</span>
        </div>

        {isLoading ? (
          <div
            style={{
              height: "89vh",
              width: "99vw",
              alignItems: "center",
              backgroundColor: "#fff",
              color: "#000",
              display: "flex",
              borderRadius: "10px",
              flexDirection: "column",
            }}
          >
            <h1
              style={{ fontSize: "30px", fontWeight: "bold", marginTop: "8vh" }}
            >
              Loading Deployed Automations...
            </h1>
            <OrbitProgress color="#2D4ECF" size="large" text="" textColor="" />
          </div>
        ) : Object.keys(pipeline).length > 0 ? (
          <Automation pipe={pipeline} />
        ) : (
          <BlankAutomation />
        )}
      </div>
    </>
  );
};
