import { AutomationsScreen } from "./components/automationsScreen";
import { DatabaseScreen } from "./components/databaseScreen";
import { DepScreen } from "./components/depScreen";
import { LoginWindow } from "./loginWindow";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { useState } from "react";
import Select from "react-select";
import './index.css'

import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

function App() {
    const location = useLocation();
    const pathAfterBaseURL = location.pathname
        .split("/")
        .filter(Boolean)
        .join("/");

    const [hover, setHover] = useState(false);
    const options = [
      { value: "knowledge", label: "Knowledge" },
      { value: "pipelines", label: "Pipelines" },
      { value: "deployment", label: "Deployment" },
      { value: "automations", label: "Automations" },
    ];
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(options.find(option => option.value === pathAfterBaseURL));

    const changePage = (page) => {
        // setSelectedCategory('Login');
        navigate(`/${page}`);
    };
    const changePage2 = (page) => {
        // setSelectedCategory('Login');
        setSelectedOption(page);
        console.log(page.value);
        navigate(`/${page.value}`);
    };

    return (
        <div
            style={{
                padding: "7px",
                backgroundColor: "#6B87E3",
                overflow: "hidden",
                height: "100vh",
                width: "100vw",
                position: "fixed", // Fix the parent to the viewport
                top: 0,
                left: 0,
            }}>
            {/* Category Selector */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    marginLeft: "15px",
                }}>
                {/* <select
                    defaultValue={"pipelines"}
                    onChange={(e) => changePage(e.target.value)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        width: "200px",
                        borderRadius: "4px",
                        border: "0px solid #fff",
                        backgroundColor: "transparent",
                        color: hover ? "#007BFF" : "#fff",
                        fontSize: "26px",
                        fontWeight: 700,
                        marginLeft: "2px",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.2s ease",
                        fontFamily: "Roboto",
                    }}>
                    <option
                        value="knowledge"
                        style={{ fontWeight: 600, color: "#000" }}>
                        Knowledge
                    </option>
                    <option
                        value="pipelines"
                        style={{ fontWeight: 600, color: "#000" }}>
                        Pipelines
                    </option>
                    <option
                        value="deployment"
                        style={{ fontWeight: 600, color: "#000" }}>
                        Deployment
                    </option>
                    <option
                        value="automations"
                        style={{ fontWeight: 600, color: "#000" }}>
                        Automations
                    </option>
                </select> */}

                <Select
                    value={selectedOption}
                    defaultValue={'pipelines'}
                    onChange={(e)=>changePage2(e)}
                    options={options}
                    className="dropdown"
                />
            </div>

            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginWindow setSelectedOption={setSelectedOption}/>} />
                <Route
                    path="/pipelines"
                    element={
                        <>
                            {()=>setSelectedOption({
                                value: "pipelines",
                                label: "Pipelines",})}
                            <PipelineToolbar />
                            <PipelineUI />
                        </>
                    }
                />
                <Route path="/deployment" element={
                    <>
                    {()=>setSelectedOption({
                                value: "deployment",
                                label: "Deployment",})}
                    <DepScreen />
                    </>
                    
                    } />
                <Route path="/knowledge" element={<DatabaseScreen />} />
                <Route path="/automations" element={<AutomationsScreen />} />
            </Routes>
            {/* </Router> */}
        </div>
    );
}

export default App;