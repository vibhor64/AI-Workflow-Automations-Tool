// depScreen.js
import { React, useEffect, useState } from 'react';
import { Deployment } from './deployment';
import { BlankAutomation } from './blankAutomation';
import { Automation } from './automation';
import { requestWithAuth } from '../logic/auth';


export const AutomationsScreen = () => {
    const [pipeline, setPipeline] = useState({});

    async function fetchData() {
            try {
                const data = await requestWithAuth("/pipelines/fetch_all");
                console.log(data);
                if (data && Array.isArray(data["pipelines"])) {
                    setPipeline(data["pipelines"]);
                } else {
                    console.error("Invalid data format:", data);
                }
                return data;
            } catch (error) {
                console.error("Error fetching data:", error.message);
                return null;
            }
        }
    
        useEffect(()=> {
            fetchData();
        }, [])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '95vh'}}>
            {/* Category Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', marginLeft: '20px', color: '#ededed', fontWeight: 'normal'}}>
                <span>Your deployed automations will appear here.</span>
            </div>

            {Object.keys(pipeline).length > 0 ? (
                <Automation pipe={pipeline}/>
            ) : 
            <BlankAutomation/>
            }

        </div>
        </>
        
    )
}