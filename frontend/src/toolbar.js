// toolbar.js

import { DraggableNode } from './draggableNode';
import { newNodesConfig } from './nodes/nodeConfig';
import { useState } from 'react';

export const PipelineToolbar = () => {

    const [selectedCategory, setSelectedCategory] = useState('General');
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const categories = ['General', 'LLMs', 'Knowledge Base', 'Multi-Modal', 'Integrations'];

    return (
        // <div style={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
        //     <div style={{ marginTop: '10px',marginLeft: '15px', display: 'flex', flexWrap: 'wrap', gap: '13px' }}>
        //         {newNodesConfig.map((config) => (
        //             <DraggableNode key={config.id} type={config.type} label={config.data.name} configId={config.id} img={config.data.img} category={config.data.category}/>
        //         ))}
        //     </div>
        // </div>

        <div>
            {/* Category Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', marginLeft: '15px' }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        style={{
                            backgroundColor: 'transparent',
                            // color: selectedCategory === category ? '#000' : '#fff',
                            color: hoveredCategory === category ? '#000' : selectedCategory === category ? '#1437c4' : '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={() => setHoveredCategory(category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Filtered Node List */}
            <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', flexWrap: 'wrap', gap: '13px', marginBottom: '10px' }}>
                {newNodesConfig
                    .filter((config) => config.data.category === selectedCategory)
                    .map((config) => (
                        <DraggableNode
                            key={config.id}
                            type={config.type}
                            label={config.data.name}
                            configId={config.id}
                            img={config.data.img}
                            name={config.data.name}
                        />
                    ))}
            </div>
        </div>
    );
};
