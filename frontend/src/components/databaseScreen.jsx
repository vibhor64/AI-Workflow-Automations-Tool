// depScreen.js
import { React, useEffect } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { Database } from "./Database";
import { BlankDatabase } from "./blankDatabase";
import { requestWithAuth } from "../logic/auth";

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

    async function fetchData() {
        try {
            const data = await requestWithAuth("/users/books");

            if (
                data &&
                Array.isArray(data) &&
                data?.length > 0 &&
                database.length === 0
            ) {
                addBooks(data);
            }
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return null;
        }
    }

    useEffect(() => {
        if (database.length === 0) {
            fetchData();
        }
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "95vh",
                }}>
                {/* Category Selector */}
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "15px",
                        marginLeft: "20px",
                        color: "#fff",
                        fontWeight: "normal",
                    }}>
                    <span>
                    Databases can store vast amount of data, and can be loaded either fully or query-based.
                    </span>
                </div>

                {Object.keys(database).length > 0 ? (
                    <Database
                        books={database}
                        addBooks={addBooks}
                        modifyBook={modifyBook}
                        deleteBook={deleteBook}
                    />
                ) : (
                    <BlankDatabase addBooks={addBooks} />
                )}
            </div>
        </>
    );
};
