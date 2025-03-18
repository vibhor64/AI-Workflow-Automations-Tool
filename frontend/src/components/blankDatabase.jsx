import { useState } from 'react';
import myimg from '/books.png'
import add from '/add2.png'
import { TemplateBooks } from './templateBooks';
import { CreateDatabase } from './createDatabase';

export const BlankDatabase = ({addBooks}) => {
    const [hoverButton, setHoverButton] = useState(false);
    const [hoverButton2, setHoverButton2] = useState(false);
    const [isCreateDatabaseVisible, setCreateDatabaseVisible] = useState(false);

    const handleClose = () => {
        setCreateDatabaseVisible(false);
    };

    return (
        <div style={{ height: '89vh', width: '99vw', alignItems: 'center', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px', flexDirection: 'column' }}>

            <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '8vh' }}>Your Knowledge base is empty!</h1>
            <img src={myimg} alt="Under Construction" style={{ width: '16%' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5vh', maxWidth: '30%', textAlign: 'center', color: '#5B5B5B' }}>Create a custom database for training, assisting and boosting your AI models.</span>

            <button style={hoverButton ? { ...styles.autoButton, backgroundColor: '#5879FF' } : styles.autoButton} onMouseEnter={() => setHoverButton(true)} onMouseLeave={() => setHoverButton(false)} onClick={() => setCreateDatabaseVisible(true)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={add} alt="Create Database" style={{ height: '30px' }} />
                <>Create Database</>
                </div>
            </button>

            <button style={hoverButton2 ? { ...styles.autoButton2, color: '#a9a9a9' } : styles.autoButton2} onMouseEnter={() => setHoverButton2(true)} onMouseLeave={() => setHoverButton2(false)} onClick={() => addBooks(TemplateBooks)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <>Load Example Database</>
                </div>
            </button>
            {isCreateDatabaseVisible && <CreateDatabase onClose={handleClose} type="create" name="" text="" urls="" id="None" addBooks={addBooks}/>}

        </div>
    )
}

const styles = {
    autoButton: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#8AA1FF',
        borderRadius: '25px',
        borderWidth: '0',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-block',
        justifyContent: 'center',
        alignItems: 'center',
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
    autoButton2: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: '25px',
        borderWidth: '0',
        color: '#d9d9d9',
        cursor: 'pointer',
        display: 'inline-block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        listStyle: 'none',
        marginTop: '2vh',
        padding: '1px 1px',
        textAlign: 'center',
        transition: 'all 200ms',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
    },
}