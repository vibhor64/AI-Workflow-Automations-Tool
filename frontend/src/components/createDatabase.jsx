import { useState } from "react";
import Close from '../assets/close.png';
import Delete from '../assets/delete.png';
import info from '../assets/info.png';
import { pushBook, deleteBook as removeBook, modifyBook as editBook } from '../logic/auth';

export const CreateDatabase = ({ onClose, type, id, name, text, urls, addBooks, modifyBook, deleteBook }) => {
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);
    const [bookName, setBookName] = useState(name);
    const [bookText, setBookText] = useState(text);
    const [bookUrl, setBookUrl] = useState(urls || []);
    const [focusInput, setFocusInput] = useState(false);
    const [hoverInput, setHoverInput] = useState(false);
    const [focusInput2, setFocusInput2] = useState(false);
    const [hoverInput2, setHoverInput2] = useState(false);
    const [hoverInput3, setHoverInput3] = useState(false);
    const [hoverInput4, setHoverInput4] = useState(false);
    const [hoverInput5, setHoverInput5] = useState(false);
    // console.log(id);

    const handleButtonClick = (e) => {
        e.stopPropagation();
        onClose();
    };

    const handleUrlChange = (e, index) => {
        // set URL with index = index as e.target.value
        setBookUrl((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = e.target.value;
            return updatedUrls;
        });
    };

    const handleAddLink = () => {
        setBookUrl((prevUrls) => [...prevUrls, '']);
    };

    let accessToken = sessionStorage.getItem("access_token");

    const saveBook = (e) => {
        if (type === 'create' && bookName !== '') {
            // pushBook({"id": id, "name": bookName, "text": bookText, "urls": bookUrl });
            addBooks([{ "id": id, "name": bookName, "text": bookText, "urls": bookUrl }]);
            console.log("Created book with id: ", id);
            handleButtonClick(e);
        }
        else if (bookName !== '') {
            // editBook(bookName, {"id": id, "name": bookName, "text": bookText, "urls": bookUrl });
            modifyBook({ "id": id, "name": bookName, "text": bookText, "urls": bookUrl });
            handleButtonClick(e);
        }
    }

    const DeleteBook = async (e) => {
        if (accessToken) {
            await removeBook(bookName);
        }
        await deleteBook({ "id": id, "name": bookName, "text": bookText, "urls": bookUrl });
        handleButtonClick(e);
    }

    return (

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '55vh', width: '60vw', borderRadius: '12px', border: '3px solid #2D4ECF', backgroundColor: '#fff', zIndex: '100', cursor: 'default', overflowY: 'auto' }}>

            <button onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}
                style={{
                    backgroundColor: hoverClose ? '#d1d1d1' : '#fff',
                    height: '30px', // Fixed size to match the container
                    width: '30px', // Fixed size to match the container
                    position: 'absolute',
                    top: '5%', // Center vertically
                    left: '97%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    border: 'none',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '50%',
                    transition: 'background-color 0.2s ease', // Only animate background color
                  }}
                onClick={handleButtonClick}><img src={Close} alt="Close" style={{ width: '22px', height: '22px' }} /></button>

            {type !== 'create' ? (

                <button onMouseEnter={() => setHoverDelete(true)} onMouseLeave={() => setHoverDelete(false)}
                    // style={{ backgroundColor: hoverDelete ? '#d1d1d1' : '#fff', height: hoverDelete ? '30px' : '24px', width: hoverDelete ? '30px' : '24px', position: 'absolute', top: '10px', right: '50px', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: '50%', transition: 'all 0.2s ease' }}
                    style={{
                        backgroundColor: hoverDelete ? '#d1d1d1' : '#fff',
                        height: '30px', // Fixed size to match the container
                        width: '30px', // Fixed size to match the container
                        position: 'absolute',
                        top: '5%', // Center vertically
                        left: '93%', // Center horizontally
                        transform: 'translate(-50%, -50%)', // Adjust for exact centering
                        border: 'none',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        borderRadius: '50%',
                        transition: 'background-color 0.2s ease', // Only animate background color
                      }}
                    onClick={DeleteBook}><img src={Delete} alt="Close" style={{ width: '22px', height: '22px' }} /></button>
            ) : null}
            <button onMouseEnter={() => setHoverInput5(true)} onMouseLeave={() => setHoverInput5(false)}
                style={{ backgroundColor: hoverInput5 ? '#526bd1' : '#2D4ECF', height: '26px', width: '50px', position: 'absolute', bottom: '10px', right: '20px', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: '6px', transition: 'all 0.2s ease', color: '#fff', fontWeight: 'bold' }}
                onClick={saveBook}>Save</button>
            <h1 style={{ marginLeft: '40px', color: '#2D4ECF' }}>{type === 'create' ? 'Create Database' : 'Modify Database'}</h1>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Column 1 */}
                <div style={{ marginLeft: '40px', marginTop: '10px', marginRight: '40px' }}>
                    <div style={{ color: '#000', fontSize: '20px', fontWeight: 'bold' }}>
                        Name
                    </div>
                    <input value={bookName} onChange={(e) => setBookName(e.target.value)} style={
                        focusInput ? { ...styles.nameInput, border: '3px solid #2D4ECF', color: '#000' } :
                            hoverInput ? { ...styles.nameInput, backgroundColor: '#C6C6C6', border: '3px solid #C6C6C6' }
                                : styles.nameInput}
                        onMouseEnter={() => setHoverInput(true)}
                        onMouseLeave={() => setHoverInput(false)}
                        onFocus={() => setFocusInput(true)}
                        onBlur={() => setFocusInput(false)}
                        placeholder="Type here..."
                    />

                    <div style={{ color: '#000', fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>
                        {type === 'create' ? 'Index Knowledge' : 'Existing Knowledge'}
                    </div>
                    <textarea value={bookText} onChange={(e) => setBookText(e.target.value)} style={
                        focusInput2 ? { ...styles.textInput, border: '3px solid #2D4ECF', color: '#000' } :
                            hoverInput2 ? { ...styles.textInput, backgroundColor: '#C6C6C6', border: '3px solid #C6C6C6' }
                                : styles.textInput}
                        onMouseEnter={() => setHoverInput2(true)}
                        onMouseLeave={() => setHoverInput2(false)}
                        onFocus={() => setFocusInput2(true)}
                        onBlur={() => setFocusInput2(false)}
                        placeholder="Type here..."
                    />
                </div>

                {/* Column 2 */}
                <div style={{ marginLeft: '20px', width: '37%', }}>
                    <div style={{ color: '#000', fontSize: '20px', fontWeight: 'bold', }}>
                        Add Links
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', fontSize: '10px', marginTop: '7px', fontWeight: 'regular', color: '#787878', marginBottom: '10px' }}>
                        <img src={info} alt="info" style={{ height: '12px', marginRight: '4px', }} />
                        Textual data from web pages are extracted and added to the knowledge base
                    </div>

                    {bookUrl.map((url, index) => (
                        <input key={index} value={bookUrl[index]} onChange={(e) => handleUrlChange(e, index)} style={hoverInput3 === index ? { ...styles.urlInput, backgroundColor: '#C6C6C6', } : styles.urlInput} placeholder="URL..."
                            onMouseEnter={() => setHoverInput3(index)}
                            onMouseLeave={() => setHoverInput3(null)}
                        />
                    ))}
                    <button style={hoverInput4 ? { ...styles.addLink, backgroundColor: '#C6C6C6', } : styles.addLink}
                        onMouseEnter={() => setHoverInput4(true)}
                        onMouseLeave={() => setHoverInput4(false)}
                        onClick={handleAddLink}
                    >+ Link</button>
                    <div style={{ height: '10px' }}></div>
                </div>
            </div>
        </div>

    )
}

const styles = {
    nameInput: {
        fontFamily: 'Inter',
        backgroundColor: '#d9d9d9',
        borderRadius: '12px',
        border: '3px solid #d9d9d9',
        color: '#9A9A9A',
        fontSize: '12px',
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
    textInput: {
        fontFamily: 'Inter',
        backgroundColor: '#d9d9d9',
        borderRadius: '12px',
        border: '3px solid #d9d9d9',
        color: '#9A9A9A',
        fontSize: '12px',
        marginTop: '0.7em',
        fontWeight: 'medium',
        width: '25vw',
        height: '24vh',
        padding: '8px',
        paddingBottom: '8px',
        transition: 'all 0.2s',
        lineHeight: '1',
        outline: 'none',
        // overflow: "hidden",
        resize: "none",
    },
    urlInput: {
        fontFamily: 'Monospace',
        backgroundColor: '#d9d9d9',
        borderRadius: '0px',
        border: '0px solid #d9d9d9',
        color: '#9A9A9A',
        fontSize: '12px',
        marginTop: '0.2em',
        fontWeight: 'medium',
        width: '20vw',
        height: '14px',
        padding: '8px',
        paddingBottom: '8px',
        transition: 'all 0.2s',
        lineHeight: '1',
        outline: 'none',
        overflow: "hidden",
        resize: "none",
        cursor: "pointer"
    },
    addLink: {
        // fontFamily: 'Monospace',
        backgroundColor: '#d9d9d9',
        borderRadius: '0px',
        border: '0px solid #d9d9d9',
        color: '#9A9A9A',
        fontSize: '12px',
        marginTop: '0.2em',
        fontWeight: 'bold',
        width: '21vw',
        cursor: 'pointer',
        // height: '14px',
        padding: '8px',
        paddingBottom: '8px',
        transition: 'all 0.2s',
        lineHeight: '1',
        outline: 'none',
        overflow: "hidden",
        resize: "none",
    },
}