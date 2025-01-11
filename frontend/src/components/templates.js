// templates.js
import Add from '../assets/add.png';
import Close from '../assets/close.png';
import { useState } from 'react';
import styles from './templates.module.css';

export const Templates = () => {

    const [hover, setHover] = useState(false);
    const [hoverClose, setHoverClose] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [showBox2, setShowBox2] = useState(false);

    const handleClick = () => {
        setHoverClose(false);
        setShowBox2(false);
        setTimeout(() => setShowBox(false), 180);
    };

    const OpenBox = () => {
        setShowBox(true);
        setTimeout(() => setShowBox2(true), 20);
    };



    return (
        <>
            <div style={{ display: 'flex', position: 'absolute', top: '10px', height: '10vh', alignItems: 'center', justifyContent: 'center', left: '90%', justifyItems: 'center' }}>
                <button
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={OpenBox}
                    style={{
                        backgroundColor: hover ? '#3b59d1' : '#2d4ecf',
                        borderRadius: '4px',
                        border: hover ? '2px solid #3b59d1' : '2px solid #2d4ecf',
                        color: '#9dadff',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'inline-block',
                        fontSize: '12px',
                        fontWeight: 600,
                        listStyle: 'none',
                        margin: '0',
                        padding: '0px 8px',
                        textAlign: 'center',
                        transition: 'all 200ms',
                        verticalAlign: 'baseline',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'manipulation',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    type="submit"><p>Templates</p>
                    <img src={Add} alt="Add" style={{ width: '16px', height: '16px', marginLeft: '5px' }} />
                </button>
            </div>

            {showBox && (

                <div style={{ display: 'flex', position: 'absolute', top: '40%', height: showBox2 ? '60vh' : '0vh', left: '50%', backgroundColor: '#fff', width: showBox2 ? '70vw' : '0vw', transform: 'translate(-50%, -50%)', borderRadius: '8px', border: showBox2 ? '4px solid #2d4ecf' : '0px solid #2d4ecf', transition: 'all 0.2s ease', flexDirection: 'row', opacity: showBox2 ? 1 : 0 }}>

                    <button onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}
                        style={{ backgroundColor: hoverClose ? '#d1d1d1' : '#fff', height: hoverClose ? '30px' : '24px', width: hoverClose ? '30px' : '24px', position: 'absolute', top: '10px', right: '10px', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: '50%', transition: 'all 0.2s ease' }}
                        onClick={handleClick}><img src={Close} alt="Close" style={{ width: '22px', height: '22px' }} /></button>

                    <div style={{ height: '100%', width: '22%', display: 'flex', flexDirection: 'column', backgroundColor: '#D9D9D9', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '70px', marginLeft: '30px' }}>
                            <button className={styles.buttons}>All Templates</button>
                            <button className={styles.buttons}>Gmail</button>
                            <button className={styles.buttons}>Gen AI</button>
                            <button className={styles.buttons}>YouTube</button>
                            <button className={styles.buttons}>Saved</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '78%', }}>


                        <p style={{ marginLeft: '30px', marginTop: '20px', fontSize: '48px', fontWeight: 'bold' }}>Templates</p>

                        <div style={{ display: 'flex', marginTop: '0px', marginLeft: '30px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                            <div className={styles.cons} style={{ height: '120px', width: '120px', backgroundColor: '#D9D9D9', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '0px', marginRight: '20px' }}>
                                <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}>YouTube Thumbnail leveraging Gen AI</p>
                            </div>
                            <div className={styles.cons} style={{ height: '120px', width: '120px', backgroundColor: '#D9D9D9', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '0px', marginRight: '20px' }}>
                                <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}>YouTube Thumbnail leveraging Gen AI</p>
                            </div>
                            <div className={styles.cons} style={{ height: '120px', width: '120px', backgroundColor: '#D9D9D9', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '0px', marginRight: '20px' }}>
                                <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}>YouTube Thumbnail leveraging Gen AI</p>
                            </div>


                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
