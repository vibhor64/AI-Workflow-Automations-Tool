import { useEffect, useState } from "react";
import { FourSquare, TrophySpin, Mosaic } from "react-loading-indicators";
import axios from 'axios';
import './deploy.css'
import AutomationWindow from "./automationWindow";
import queryString from "query-string";
import { save_google_creds } from "../logic/auth";

export const Deployment = (props) => {
    const { inputs, outputs, integration_input, nodes, edges } = props;
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
            username: node.data.username || '',
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
                    username: node.username || '',
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

        console.log(JSON.stringify({ formattedNodes }, null, 2));
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/deployment/parse', {
            // const response = await axios.post('http://127.0.0.1:8000/automation/parse?hello=whaterverrrr', {
                formattedNodes,
                formattedEdges,
            });
            const { pipelineOutput } = response.data;
            let displayOutput;

            if (typeof pipelineOutput === 'object' && pipelineOutput !== null) {
                // If pipelineOutput is an object, stringify it for display
                displayOutput = JSON.stringify(pipelineOutput, null, 2);
            } else {
                // Otherwise, use it as-is (assuming it's already a string)
                displayOutput = pipelineOutput;
            }
            // alert(`Deployment Successful! \n${pipelineOutput}`);
            setPipelineOutput(displayOutput);
        } catch (error) {
            console.error('Error sending pipeline data:', error);
            setPipelineOutput("An unexpected error occurred while processing the pipeline! This is likely because your pipeline inputs are invalid. If the problem persists, re-authenticate all your inbound integrations.");
            // alert('Error occurred while processing the pipeline!');
        }
        setIsLoading(false);
    };

    console.log("integration_input: ", integration_input);
    console.log("integration_input: ", integration_input.type);
    console.log("inputs: ", inputs);

    return (
        <div style={{ height: '89vh', width: '99vw', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px', overflowY: 'auto' }}>

            {/* Input */}
            <div style={{ marginTop: '1.5vh', marginLeft: '5em', }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', }}>Inputs</h1>
                {/* {integration_input && integration_input.length > 0 && <>
                
                </>} */}
                {integration_input?.map((value, index) => (
                    <div key={index} style={{ display: 'flex', marginTop: '2em', flexDirection: 'column' }}>
                        <span key={index} style={{ color: '#2D4ECF', fontWeight: 'bold', fontSize: '16px' }}>⚡{value} Integration</span>
                        {/* <textarea style={
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
                        /> */}
                    </div>
                ))}
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
                >Test</button>
                <div style={{ height: '5vh', backgroundColor: 'transparent' }}></div>
            </div>

            {/* Output */}
            <div style={{ marginTop: '1.5vh', marginLeft: '10em', width: '33vw' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', }}>Output</h1>
                {isLoading ? (
                    <div style={{ display: 'flex', marginLeft: '0em', marginTop: '3em', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
                        <Mosaic color={["#db8d39", "#7ddb39", "#782ad1", "#d12a7b"]} size="medium" text="" textColor="#2D4ECF" />
                        <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '1em', maxWidth: '50%', textAlign: 'center', color: '#5B5B5B' }}>{randomText}</div> 
                    </div>
                ) :
                    null}
                {!isLoading && pipelineOutput && (
                    <div
                        className={`output-container ${isVisible ? 'fade-in' : ''}`}
                        dangerouslySetInnerHTML={{ __html: pipelineOutput }}
                        style={{ marginTop: '1em', paddingBottom: '1em', transition: 'all 0.3s ease-out', fontWeight: '400' }}
                    ></div>
                )}
            </div>

            {/* Automation */}
            <div style={{ marginTop: '1.5vh', width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', color: '#2D4ECF' }}>Automation</h1>
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5vh', maxWidth: '90%', textAlign: 'center', color: '#5B5B5B' }}> {integration_input && integration_input.length > 0 ? 'Your current workflow can be completely automated using 3rd party integrations. Click the button below to never bother doing this task again by yourself!' : 'Your current workflow is already full automated. If you utilize third party integrations, you will need to perform this step.'}</span>

                <button
                    style={hoverButton && integration_input && integration_input.length > 0 ? { ...styles.autoButton, backgroundColor: '#2744B3' } : integration_input && integration_input.length > 0 ? styles.autoButton : { ...styles.autoButton, backgroundColor: '#8AA1FF' }}
                    onClick={() => setAutomationWindow(true)}
                    onMouseEnter={() => setHoverButton(true)}
                    onMouseLeave={() => setHoverButton(false)}>
                    {integration_input && integration_input.length > 0 ? 'Automate this ✨' : 'Automated ✅'}
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