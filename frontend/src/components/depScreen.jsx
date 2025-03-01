// depScreen.js
import { React } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { Deployment } from './deployment';
import { BlankDeployment } from './blankDeployment';

const selector = (state) => ({
    // createDeployment: state.createDeployment,
    deploymentVariables: state.deploymentVariables,
    nodes: state.nodes,
    edges: state.edges,
  });

export const DepScreen = () => {

    const {
        // createDeployment,
        deploymentVariables,
        nodes,
        edges,
          } = useStore(selector, shallow);
        // console.log(deploymentVariables)
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '95vh'}}>
            {/* Category Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', marginLeft: '20px', color: '#ededed', fontWeight: 'normal'}}>
                <span>Your deployed pipelines will appear here as a unit or automation.</span>
            </div>

            {Object.keys(deploymentVariables).length > 0 ? (
                <Deployment inputs={deploymentVariables.inputs} outputs={deploymentVariables.outputs} integrations = {deploymentVariables.integration} nodes={nodes} edges={edges}/>
            ) : 
            <BlankDeployment/>
            }

        </div>
        </>
        
    )
}