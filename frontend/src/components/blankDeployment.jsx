import myimg from '/construction.png'

export const BlankDeployment = () => {
    return (
        <div style={{height: '89vh', width: '99vw',alignItems: 'center', backgroundColor: '#fff', color: '#000', display: 'flex', borderRadius: '10px', flexDirection: 'column'}}>
            
                <h1 style={{fontSize: '50px', fontWeight: 'bold', marginTop: '8vh'}}>No Pipeline Set!</h1>
                <img src={myimg} alt="Under Construction" style={{width: '20%'}}/>
                <span style={{fontSize: '28px', fontWeight: 'bold', marginTop: '8vh', maxWidth: '50%', textAlign: 'center', color: '#5B5B5B'}}>Head over to the pipelines tab to create a pipeline and click on the Run button at bottom center to set it up for deployment</span>
            
        </div>
    )
}