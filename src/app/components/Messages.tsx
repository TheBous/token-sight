"use client"

import { useContext, useEffect } from "react";
import MessagesContext from "./MessagesContext/MessagesContext";

export default function Messages() {
    const { message, setMessage } = useContext(MessagesContext);

    useEffect(() => {
        if (message?.message) setTimeout(() => setMessage(null), 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message?.message]);

    if (!message) return null;

    return (
        <div role="alert" className="alert alert-error fixed top-2 right-2 w-1/3 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex flex-wrap whitespace-normal break-words">{message.message}</span>
        </div>
    );
}