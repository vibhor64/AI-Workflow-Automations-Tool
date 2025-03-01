import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";
import axios from 'axios';
import './deploy.css'
import AutomationWindow from "./automationWindow";
import queryString from "query-string";
import { save_google_creds } from "../logic/auth";

export const Deployment = (props) => {
    const { inputs, outputs, integrations, nodes, edges } = props;
    const [inputValues, setInputValues] = useState({});
    const [hoverInput, setHoverInput] = useState(null);
    const [hoverButton, setHoverButton] = useState(false);
    const [hoverButton2, setHoverButton2] = useState(false);
    const [focusInput, setFocusInput] = useState(null);
    const [pipelineOutput, setPipelineOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [automationWindow, setAutomationWindow] = useState(false);
    const [creds_dict, setCreds_dict] = useState(null);

    useEffect(() => {
        if (pipelineOutput) {

            const container = document.querySelector('.output-container');
            const children = container.children;

            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.15}s`; // Adjust delay per element
            });
        }
    }, [pipelineOutput]);

    // useEffect(() => {
    //     try {
    //         // Fetch required credentials
            
    //     } catch (error) {
    //         console.error("Error processing query parameters:", error);
    //     }
    // }, []);
// 

    const handleInputChange = (index, value) => {
        setInputValues(prev => ({ ...prev, [index]: value }));
        // console.log(inputValues);
    };

    const autoResize = (e) => {
        e.target.style.paddingBottom = '0px';
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const sendPipelineData = async () => {
        setIsVisible(false);
        const formattedNodes = nodes.map(node => ({
            id: node.id,
            name: node.data.name,
            rightHandles: node.data.rightHandles,
            leftHandles: node.data.leftHandles,
            sources: node.data.sources || [],
            targets: node.data.targets || [],
            fieldValue1: node.data.fieldValue1 || '',
            fieldValue2: node.data.fieldValue2 || '',
        }));

        formattedNodes.forEach(node => {
            if (node.name === 'Input') {
                Object.assign(node, {
                    id: node.id,
                    name: node.name,
                    rightHandles: node.rightHandles,
                    leftHandles: node.leftHandles,
                    sources: node.sources || [],
                    targets: node.targets || [],
                    fieldValue1: inputValues[node.fieldValue1],
                    fieldValue2: node.fieldValue2 || '',
                });
            }
        });

        const formattedEdges = edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle
        }));

        // console.log(JSON.stringify({ formattedNodes }, null, 2));
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/deployment/parse', {
                formattedNodes,
                formattedEdges,
            });
            const { pipelineOutput } = response.data;
            // alert(`Deployment Successful! \n${pipelineOutput}`);
            setPipelineOutput(pipelineOutput);
        } catch (error) {
            console.error('Error sending pipeline data:', error);
            alert('Error occurred while processing the pipeline!');
        }
        setIsLoading(false);
    };

    return (
        <div style={{ height: '89vh', width: '99vw', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px', overflowY: 'auto' }}>

            <div style={{ marginTop: '1.5vh', marginLeft: '5em', }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', }}>Inputs</h1>
                {inputs?.map((value, index) => (
                    <div key={index} style={{ display: 'flex', marginTop: '2em', flexDirection: 'column' }}>
                        <span style={{ color: '#5B5B5B', fontWeight: 'bold', fontSize: '20px' }}>{value}:</span>
                        <textarea style={
                            focusInput === index ? { ...styles.textInput, border: '3px solid #2D4ECF', color: '#000' } :
                                hoverInput === index ? { ...styles.textInput, backgroundColor: '#C6C6C6', border: '3px solid #C6C6C6' }
                                    : styles.textInput}
                            type="text"
                            placeholder="Type here..."
                            value={inputValues[value] || ''}
                            onChange={(e) => handleInputChange(value, e.target.value)}
                            onInput={autoResize}
                            onMouseEnter={() => setHoverInput(index)}
                            onMouseLeave={() => setHoverInput(null)}
                            onFocus={() => setFocusInput(index)}
                            onBlur={() => setFocusInput(null)}
                            rows={1}
                        />
                    </div>
                ))}
                <button style={hoverButton2 ? { ...styles.goButton, backgroundColor: '#385EF4' } : styles.goButton} onMouseEnter={() => setHoverButton2(true)} onMouseLeave={() => setHoverButton2(false)}
                    onClick={sendPipelineData}
                >Run</button>
                <div style={{ height: '5vh', backgroundColor: 'transparent' }}></div>
            </div>

            {/* Output */}
            <div style={{ marginTop: '1.5vh', marginLeft: '10em', width: '33vw' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', }}>Output</h1>
                {isLoading ? (
                    <div style={{ display: 'flex', marginLeft: '7em', marginTop: '3em', }}>
                        <FourSquare color="#2D4ECF" size="medium" text="Thinking Hard..." textColor="" />
                    </div>
                ) :
                    null}
                {!isLoading && pipelineOutput && (
                    <div
                        className={`output-container ${isVisible ? 'fade-in' : ''}`}
                        dangerouslySetInnerHTML={{ __html: pipelineOutput }}
                        style={{ marginTop: '1em', paddingBottom: '1em', transition: 'all 0.3s ease-out' }}
                    ></div>
                )}
            </div>

            {/* Automation */}
            <div style={{ marginTop: '1.5vh', width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', color: '#2D4ECF' }}>Automation</h1>
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5vh', maxWidth: '90%', textAlign: 'center', color: '#5B5B5B' }}> {integrations && integrations.length > 0 ? 'Your current workflow can be completely automated using 3rd party integrations. Click the button below to never bother doing this task again by yourself!' : 'Your current workflow is already full automated. If you utilize third party integrations, you will need to perform this step.'}</span>

                <button
                    style={hoverButton && integrations && integrations.length > 0 ? { ...styles.autoButton, backgroundColor: '#2744B3' } : integrations && integrations.length > 0 ? styles.autoButton : { ...styles.autoButton, backgroundColor: '#8AA1FF' }}
                    onClick={() => setAutomationWindow(true)}
                    onMouseEnter={() => setHoverButton(true)}
                    onMouseLeave={() => setHoverButton(false)}>
                    {integrations && integrations.length > 0 ? 'Automate this ✨' : 'Automated ✅'}
                </button>
            </div>

            {/* Automation Window */}
            {automationWindow && <AutomationWindow setAutomationWindow={setAutomationWindow} creds_dict={creds_dict} />}
        </div>
    )
}

const styles = {
    textInput: {
        fontFamily: 'Inter',
        backgroundColor: '#d9d9d9',
        borderRadius: '12px',
        border: '3px solid #d9d9d9',
        color: '#9A9A9A',
        fontSize: '14px',
        marginTop: '0.7em',
        fontWeight: 'medium',
        minWidth: '15vw',
        // height: '14px',
        padding: '8px',
        paddingBottom: '8px',
        transition: 'all 0.2s',
        lineHeight: '1',
        outline: 'none',
        overflow: "hidden",
        resize: "none",
    },
    autoButton: {
        backgroundColor: '#2D4ECF',
        borderRadius: '25px',
        borderWidth: '0',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        // fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: 'bold',
        listStyle: 'none',
        marginTop: '5vh',
        padding: '11px 18px',
        textAlign: 'center',
        transition: 'all 200ms',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
    },
    goButton: {
        backgroundColor: '#2D4ECF',
        borderRadius: '12px',
        borderWidth: '0',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        // fontFamily: 'Poppins',
        fontSize: '16px',
        fontWeight: 'bold',
        listStyle: 'none',
        marginTop: '2.5vh',
        padding: '9px 12px',
        textAlign: 'center',
        transition: 'all 200ms',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
    }
}