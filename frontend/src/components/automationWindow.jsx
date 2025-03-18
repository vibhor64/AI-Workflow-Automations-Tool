import Close from '/close.png';
import { useState } from 'react';
import { airtable_authentication, create_doc, discord_authentication, read_airtable, read_doc, read_emails, read_google_forms, read_google_sheets, send_discord_message, send_draft } from '../logic/auth';

export default function AutomationWindow({ setAutomationWindow, creds_dict }) {
    const [hoverClose, setHoverClose] = useState(false);

    const handleClick = () => {
        setAutomationWindow(false);
    };

    async function handleGoogleIntegration() {
        try {
            console.log("Requesting Google Integration Access...");
            window.location.href = "http://127.0.0.1:8000/private/auth/google/integration";
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    return (
        <div style={{ display: 'flex', position: 'absolute', top: '45%', height: '32rem', left: '50%', backgroundColor: '#e0e0e0', width: '30rem', transform: 'translate(-50%, -50%)', borderRadius: '8px', border: '4px solid #2d4ecf', transition: 'all 0.2s ease', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

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

            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
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
            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={() => send_draft()}>
                Send Draft
            </button>

            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={() => read_google_forms('dsadsa')}>
                Read form
            </button>

            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={() => read_google_sheets('https://docs.google.com/spreadsheets/d/1xhrhUoppcTe0WB1oxqIKeKbjvXJKWbL7fesWSBuTH4E/edit?gid=1244179328#gid=1244179328', 20)}>
                Read sheet
            </button>

            {/* Discord */}
            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={() => airtable_authentication()}>
                Airtable Auth
            </button>
            <button
                style={{
                    backgroundColor: '#2d4ecf',
                    height: '30px', // Fixed size to match the container
                    width: '90px', // Fixed size to match the container
                    marginTop: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '20%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                }}
                onClick={() => read_airtable()}>
                Airtable read
            </button>


        </div>
    )
}