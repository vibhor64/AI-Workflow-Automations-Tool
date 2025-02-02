import Close from '../assets/close.png';
import { useState } from 'react';

export default function AutomationWindow({ setAutomationWindow, creds_dict }) {
    const [hoverClose, setHoverClose] = useState(false);

    const handleClick = () => {
        setAutomationWindow(false);
    };

    async function handleGoogleIntegration() {
        try {
            console.log("Requesting Google Integration Access...");
            window.location.href = "http://127.0.0.1:8000/auth/google/integration";
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    
    return (
        <div style={{ display: 'flex', position: 'absolute', top: '45%', height: '32rem', left: '50%', backgroundColor: '#e0e0e0', width: '30rem', transform: 'translate(-50%, -50%)', borderRadius: '8px', border: '4px solid #2d4ecf', transition: 'all 0.2s ease', flexDirection: 'row'}}>

            <button onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}
                style={{
                    backgroundColor: hoverClose ? '#fff' : '#e0e0e0',
                    height: '30px', // Fixed size to match the container
                    width: '30px', // Fixed size to match the container
                    position: 'absolute',
                    top: '4%', // Center vertically
                    left: '96%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '50%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={handleClick}><img src={Close} alt="Close" style={{ width: '22px', height: '22px' }} /></button>

            <button onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}
                style={{
                    backgroundColor: '#2d4ecf',
                    // height: '30px', // Fixed size to match the container
                    // width: '30px', // Fixed size to match the container
                    position: 'absolute',
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={handleGoogleIntegration}>
                    Google
                </button>
            

        </div>
    )
}