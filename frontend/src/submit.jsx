// submit.js
export const SubmitButton = () => {

    return (
        <div style={{display: 'flex', position: 'absolute', bottom: '0px', height: '10vh', alignItems: 'center', justifyContent: 'center', transform: 'translate(-50%, -10%)', left: '50%'}}>
            <button 
            style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                borderWidth: '0',
                color: '#2e0661',
                cursor: 'pointer',
                display: 'inline-block',
                // fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 600,
                listStyle: 'none',
                margin: '0',
                padding: '11px 13px',
                textAlign: 'center',
                transition: 'all 200ms',
                verticalAlign: 'baseline',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
            }}
            type="submit">Submit</button>
        </div>
    );
}
