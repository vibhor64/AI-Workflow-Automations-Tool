// depScreen.js
import { React, useEffect, useState } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { Database } from "./Database";
import { BlankDatabase } from "./blankDatabase";
import { requestWithAuth } from "../logic/auth";
import { OrbitProgress } from "react-loading-indicators";

const selector = (state) => ({
    // createDeployment: state.createDeployment,
    database: state.database,
    addBooks: state.addBooks,
    modifyBook: state.modifyBook,
    deleteBook: state.deleteBook,
    clearBooks: state.clearBooks,
});

export const DatabaseScreen = () => {
    const {
        // createDeployment,
        database,
        addBooks,
        modifyBook,
        deleteBook,
        clearBooks
    } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const data = await requestWithAuth("/users/books");
            console.log(data);
            if (
                data &&
                Array.isArray(data) &&
                data?.length > 0
            ) {
                clearBooks();
                addBooks(data);
            }
            setIsLoading(false);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setIsLoading(false);
            return null;
        }
    }
    
    useEffect(() => {
        fetchData();
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
                        Databases can store vast amounts of data, and can be
                        loaded either fully or query-based.
                    </span>
                </div>

                {isLoading ? (
                    <div
                        style={{
                            height: "89vh",
                            width: "99vw",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            color: "#000",
                            display: "flex",
                            borderRadius: "10px",
                            flexDirection: "column",
                        }}>
                        <h1
                            style={{
                                fontSize: "30px",
                                fontWeight: "bold",
                                marginTop: "8vh",
                            }}>
                            Loading Your Databases...
                        </h1>
                        <OrbitProgress
                            color="#2D4ECF"
                            size="large"
                            text=""
                            textColor=""
                        />
                    </div>
                ) : Object.keys(database).length > 0 ? (
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
