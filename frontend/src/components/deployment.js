import { useState } from "react";
import { FourSquare } from "react-loading-indicators";


export const Deployment = (props) => {
    // console.log(inputs, outputs)
    const { inputs, outputs } = props;
    const [hoverInput, setHoverInput] = useState(null);
    const [hoverButton, setHoverButton] = useState(false);
    const [hoverButton2, setHoverButton2] = useState(false);
    const [focusInput, setFocusInput] = useState(null);
    console.log(inputs)

    return (
        <div style={{ height: '89vh', width: '99vw', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px' }}>

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
                            onMouseEnter={() => setHoverInput(index)}
                            onMouseLeave={() => setHoverInput(null)}
                            onFocus={() => setFocusInput(index)}
                            onBlur={() => setFocusInput(null)}
                            rows={1}
                        />
                    </div>
                ))}
                <button style={hoverButton2 ? { ...styles.goButton, backgroundColor: '#385EF4' } : styles.goButton} onMouseEnter={() => setHoverButton2(true)} onMouseLeave={() => setHoverButton2(false)}>Run</button>
            </div>

            <div style={{ marginTop: '1.5vh', marginLeft: '10em', width: '30vw' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', }}>Output</h1>
                <div style={{ display: 'flex', marginLeft: '7em', marginTop: '3em',}}>
                    <FourSquare color="#2D4ECF" size="medium" text="Thinking Hard..." textColor="" />
                </div>
            </div>


            <div style={{ marginTop: '1.5vh', width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ fontSize: '55px', fontWeight: 'bold', color: '#2D4ECF' }}>Automation</h1>
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5vh', maxWidth: '90%', textAlign: 'center', color: '#5B5B5B' }}>Your current workflow can be completely automated using 3rd party integrations. Click the button below to never bother doing this task again by yourself!</span>
                <button style={hoverButton ? { ...styles.autoButton, backgroundColor: '#2744B3' } : styles.autoButton} onMouseEnter={() => setHoverButton(true)} onMouseLeave={() => setHoverButton(false)}>Automate this ✨</button>
            </div>
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
        width: '15vw',
        padding: '8px',
        paddingBottom: '8px',
        listStyle: 'none',
        textAlign: 'left',
        transition: 'all 0.2s',
        overflow: "hidden",
        resize: "none",
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        outline: 'none',
        touchAction: 'manipulation',
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