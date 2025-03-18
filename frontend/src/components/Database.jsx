import { useState } from "react";
import myimg from '/books.png'
// import add from '/add2.png'
import { CreateDatabase } from "./createDatabase";

export const Database = (props) => {
    // console.log(inputs, outputs)
    const { books, addBooks, modifyBook, deleteBook } = props;
    const [hoverButton, setHoverButton] = useState(null);
    const [isCreateDatabaseVisible, setCreateDatabaseVisible] = useState(false);
    const [modifyDatabase, setModifyDatabase] = useState(null);

    const handleClose = () => {
        setCreateDatabaseVisible(false);
    };

    const closeBook = () => {
        setModifyDatabase(null);
        // console.log('closed man');
    }

    const autoResize = (e) => {
        e.target.style.paddingBottom = '0px';
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        // Header
        <div style={{ height: '89vh', width: '99vw', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px', overflowY: 'auto', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h1 style={{ marginLeft: '1.5em' }}>{ books && books.length ===1 ? 'Your Database Is Ready' : 'Your Databases Are Ready'}</h1>
                <img src={myimg} alt="Create Database" style={{ height: '45px', marginTop: '1.3em', marginLeft: '10px' }} />
            </div>

            {/* Books */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {books.map((book, i) => (
                    <div
                    key={i}
                    onClick={() => setModifyDatabase(i)}
                    style={{ height: '30vh', width: '29vw', backgroundColor: hoverButton === i ? '#C1C1C1' : '#D9D9D9', marginLeft: '3em', marginTop: '1.3em', borderRadius: '16px', display: 'flex', flexDirection: 'column', cursor: 'pointer', boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                        onMouseEnter={() => setHoverButton(i)}
                        onMouseLeave={() => setHoverButton(null)}
                    >
                        <div style={{ padding: '18px 15px', color: '#878787', fontWeight: 700, height: '40vh', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', fontSize: '14px' }}>{books && book.text.length > 444 ? book.text.substring(0, 444) + '...' : book.text}</div>
                        <div style={{ position: 'relative', width: '29vw', height: '13vh', backgroundColor: '#385EF4', bottom: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', color: '#fff', display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>
                            <div style={{marginLeft: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',}}>
                            {book.name}
                            </div>
                            </div>
                        {modifyDatabase===i ? (<CreateDatabase key={`modify-${i}`} onClose={closeBook} type="modify" id={book.id} name={book.name} text={book.text} urls={book.urls} addBooks={addBooks} modifyBook={modifyBook} deleteBook={deleteBook} />) : null}
                    </div>
                ))}

                {/* New Database */}
                <div
                    onClick={() => setCreateDatabaseVisible(true)}
                    style={{ height: '30vh', width: '29vw', backgroundColor: hoverButton === 'ooo' ? '#ededed' : '#fff', marginLeft: '3em', marginTop: '1.3em', borderRadius: '16px', display: 'flex', flexDirection: 'column', cursor: 'pointer', boxShadow: ' rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', justifyContent: 'center', alignItems: 'center', transition: 'all 0.5 ease-out' }}
                    onMouseEnter={() => setHoverButton('ooo')}
                    onMouseLeave={() => setHoverButton(null)}
                >
                    <div
                        style={{ color: '#ABABAB', fontWeight: 700, fontSize: '14px', flexDirection: 'row' }}>
                        <span style={{ fontSize: '20px', fontWeight: '400', marginRight: '10px' }}>+</span>
                        New Database</div>
                </div>
                {isCreateDatabaseVisible && <CreateDatabase onClose={handleClose} type="create" name="" text="" urls="" id="None" addBooks={addBooks} modifyBook={modifyBook} deleteBook/>}
        <div style={{height: '6vh', backgroundColor: '#fff', width: '100%', marginTop: '2vh'}}></div>
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