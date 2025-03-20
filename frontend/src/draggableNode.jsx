// draggableNode.js

import { useState } from "react";

export const DraggableNode = ({ type, label, configId, img, name }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType: type, configId }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const [hover, setHover] = useState(false);

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        position: 'relative',
        cursor: name=== 'Coming Soon' ? 'not-allowed' : 'grab',
        paddingLeft: '10px',
        paddingRight: '10px',
        minWidth: '70px',
        fontFamily: 'Inter',
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '6px',
        backgroundColor: '#fff',
        // backgroundColor: 'transparent',
        border: '1px solid #ccc',
        justifyContent: 'center',
        flexDirection: 'column',
        // fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: '11px',
        boxShadow: hover ? ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' : 'none',
        transition: 'all 0.2s ease',
        
      }}
      draggable={name === 'Coming Soon' ? false : true}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={img} alt={type} style={{ width: '20px', marginTop: '5px', marginBottom: '10px', transform: 'translate(-0%, -35%)', 
        cursor: name=== 'Coming Soon' ? 'not-allowed' : 'grab', 
        pointerEvents: name=== 'Coming Soon' ? 'none' : 'auto'
        }} />
      <span style={{ color: name=== 'Coming Soon' ? '#ccc' : '#000', position: 'absolute', bottom: '6px'}}>{label}</span>
    </div>
  );
};
