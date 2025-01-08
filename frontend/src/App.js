import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useState } from 'react';

function App() {

  const [selectedCategory, setSelectedCategory] = useState('Pipelines');
  const [hover, setHover] = useState(false);

  return (
    <div style={{ padding: '7px', backgroundColor: '#6579c9', }}>
      {/* Category Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', marginLeft: '15px' }}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: '200px',
            borderRadius: '4px',
            border: '0px solid #fff',
            backgroundColor: 'transparent',
            color: hover ? '#007BFF' : '#fff',
            fontSize: '26px',
            fontWeight: 700,
            marginLeft: '2px',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s ease',
            fontFamily: 'Roboto',
          }}>
          <option value="Knowledge"
            style={{ fontWeight: 600, color: '#000' }}
          >Knowledge</option>
          <option value="Pipelines"
            style={{ fontWeight: 600, color: '#000' }}
          >Pipelines</option>
          <option value="Deployment"
            style={{ fontWeight: 600, color: '#000' }}
          >Deployment</option>
        </select>
      </div>

      {selectedCategory === 'Pipelines' &&
        <>
          <PipelineToolbar />
          <PipelineUI />
        </>
      }
      {selectedCategory === 'Deployment' &&
        <>
          {/* <PipelineToolbar />
      <PipelineUI /> */}
        </>
      }
      {selectedCategory === 'Knowledge' &&
        <>
          <PipelineToolbar />
          <PipelineUI />
        </>
      }
    </div>
  );
}

export default App;
