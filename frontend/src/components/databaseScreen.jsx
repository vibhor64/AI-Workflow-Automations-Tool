// depScreen.js
import { React } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { Database } from './Database';
import { BlankDatabase } from './blankDatabase';

const selector = (state) => ({
    // createDeployment: state.createDeployment,
    database: state.database,
    addBooks: state.addBooks,
    modifyBook: state.modifyBook,
    deleteBook: state.deleteBook,
  });

export const DatabaseScreen = () => {

    const {
        // createDeployment,
        database,
        addBooks,
        modifyBook,
        deleteBook,
          } = useStore(selector, shallow);
        // console.log(deploymentVariables)
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '95vh'}}>
            {/* Category Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', marginLeft: '20px', color: '#ededed', fontWeight: 'normal'}}>
                <span>Create a custom database for training, assisting and boosting your AI models.</span>
            </div>

            {Object.keys(database).length > 0 ? (
                <Database books={database} addBooks={addBooks} modifyBook={modifyBook} deleteBook={deleteBook}/>
            ) : 
            <BlankDatabase addBooks={addBooks}/>
            }

        </div>
        </>
        
    )
}