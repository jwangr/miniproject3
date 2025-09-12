"use client";

import { createContext, useState } from "react";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([
        [{
            "role": "user",
            "parts": [
                {
                    "text": "Hello"
                }
            ]
        },
        {
            "role": "model",
            "parts": [
                {
                    "text": "Great to meet you. What would you like to know?"
                }
            ]
        }]
    ])

    const addHistory = (prompt, response) => {
        console.log("Before addHistory runs");
        console.log(prompt, response, chatHistory);
        setChatHistory([...chatHistory,
        [{
            "role": "user",
            "parts": [
                {
                    "text": prompt
                }
            ]
        },
        {
            "role": "model",
            "parts": [
                {
                    "text": response.content
                }
            ]
        }]
        ]);
    };

    return (
        <HistoryContext.Provider value={{ chatHistory, addHistory }}>
            {children}
        </HistoryContext.Provider>
    )
}

export { HistoryContext, HistoryProvider }