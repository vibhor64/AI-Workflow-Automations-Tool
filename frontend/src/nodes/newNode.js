// newNode.js
// Blueprint for creating new nodes
// --------------------------------------------------


import { useState, useCallback } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
// import { Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { useRef } from 'react';


const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    updateNodeField: state.updateNodeField,
});

export const NewNode = ({ id, data }) => {
    const {
        name: name,
        isInput: isInput,
        isType: isType,
        rightHandles: rightHandles,
        leftHandles: leftHandles,
        bgcolor: bgcolor,
        desc: desc,
        img: img,
        category: category,
    } = data;

    const [currName, setCurrName] = useState(data.name || '');
    const [inputType, setInputType] = useState(id || 'Text');
    const [LH, setLH] = useState(leftHandles);
    const [isFocused, setIsFocused] = useState(false);

    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
        updateNodeField,
    } = useStore(selector, shallow);

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
        autoResize(e.target);

        const variableCount = getVariableCount(e.target.value.trim());
        console.log('LH: ', LH, 'vars: ', variableCount)
        updateHandleCount(variableCount + LH);
        updateNodeField(id, 'leftHandles', variableCount + LH)
    };

    const updateNodeInternals = useUpdateNodeInternals();
    const [handleCount, setHandleCount] = useState(0);
    const updateHandleCount = useCallback((LHcount) => {
        setHandleCount(LHcount);
        updateNodeInternals(id);
    }, [id, updateNodeInternals]);

    const autoResize = (textarea) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
    };

    const getVariableCount = (name) => {
        const regex = /\{\{.*?\}\}/g;
        const matches = name.match(regex);
        return matches ? matches.length : 0;
    };

    const textareaRef = useRef(null);

    const handleInput = (e) => {
        const textarea = textareaRef.current;
        textarea.style.paddingBottom = '0px';
    };

    return (
        <div style={{ width: 200, minHeight: 60, border: '0px solid #ccc', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: bgcolor ? bgcolor : '#3c859e', borderRadius: '8px', boxShadow: ' rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px', color: '#fff', fontSize: '11px', fontWeight: '400', padding: '3px 2px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#ffffff', borderTopLeftRadius: '9px', borderTopRightRadius: '9px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', }}>

                {Array.from({ length: leftHandles }, (_, index) => (
                    <Handle
                        key={`${id}-left-handle-${index}`}
                        isConnectable={true}
                        type="target"
                        isConnectableEnd={true}
                        position={Position.Left}
                        id={`${id}-left-handle-${index}`}
                        style={{ top: `${(index + 1) * (100 / (leftHandles + 1))}%` }}
                    />
                ))}

                <div style={{ display: 'flex', paddingTop: '5px', paddingBottom: '5px', fontSize: '14px', fontWeight: '700', color: bgcolor ? bgcolor : '#3c859e', marginLeft: '10px' }}>
                    <span>{name}</span>
                </div>

                {category === 'LLMs' || category === 'Multi-Modal' ?
                    <>
                        <img src={img} style={{ width: '40px', height: '40px', alignSelf: 'center', marginBottom: '10px' }} />
                    </>
                    : null
                }

                {/* <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginBottom: '5px', fontSize: '12px', fontWeight: '400', color: '#000' }}>
                    <span>{desc}</span>
                </div> */}

                <div style={{ paddingRight: '10px', paddingLeft: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                    {isInput ?

                        <label>
                            <span style={{ fontWeight: 700, color: '#363636', marginLeft: '2px', fontSize: '10px' }}>{data.name === 'Text' ? 'Text:' : data.category === 'LLMs' ? 'System Prompt:' : 'Field Name:'}</span>
                            <textarea
                                value={currName}
                                ref={textareaRef}
                                onInput={handleInput}
                                onChange={handleNameChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                rows={1}
                                placeholder='Enter text here'
                                style={{
                                    marginTop: '2px',
                                    fontFamily: 'Inter',
                                    backgroundColor: '#ededed',
                                    border: `2px solid ${isFocused ? bgcolor : '#fff'}`,
                                    borderRadius: '8px',
                                    lineHeight: '1',
                                    padding: '5px',
                                    paddingLeft: '7px',
                                    paddingRight: '7px',
                                    minWidth: '150px',
                                    height: '14px',
                                    fontSize: '12px',
                                    outline: 'none',
                                    overflow: "hidden",
                                    resize: "none",
                                    // color: '#a1a1a1',
                                    color: `${isFocused ? '#000' : '#a1a1a1'}`,
                                    transition: 'border-color 0.2s ease-in-out',
                                }}
                            />
                        </label>
                        :
                        null
                    }

                    {isType ?
                        <label style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: '2px', marginTop: '2px', gap: '8px' }}>
                            <span style={{ marginTop: '4px', fontWeight: 400, color: '#363636', fontSize: '10px' }}>Type:</span>
                            <select value={inputType} onChange={handleTypeChange}
                                style={{
                                    padding: '3px 2px',
                                    borderRadius: '4px',
                                    border: '0px solid #8048c7',
                                    backgroundColor: bgcolor ? bgcolor : '#3c859e',
                                    color: '#fff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    marginLeft: '1px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'border-color 0.3s, box-shadow 0.3s',
                                }}
                                onFocus={(e) => (e.target.style.boxShadow = '0 0 5px rgba(128, 72, 199, 0.5)')}
                                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                            >
                                <option value="Text"
                                    style={{ fontWeight: 600 }}
                                >Text</option>
                                <option value="File"
                                    style={{ fontWeight: 600 }}
                                >File</option>
                            </select>
                        </label>
                        : null
                    }
                </div>

                {Array.from({ length: rightHandles }, (_, index) => (
                    <Handle
                        key={`${id}-right-handle-${index}`}
                        type="source"
                        position={Position.Right}
                        id={`${id}-right-handle-${index}`}
                        style={{ top: `${(index + 1) * (100 / (rightHandles + 1))}%` }}
                    />
                ))}
            </div>
        </div>
    );
}
