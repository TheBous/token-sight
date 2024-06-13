"use client"

import { createContext } from "react";

export enum MessageType {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    INFO = "INFO",
}

export interface Message {
    type: MessageType,
    message: string,
}

export type MessageContextType = {
    message: Message | null;
    setMessage: (message: Message | null) => void;
};

const MessagesContext = createContext<MessageContextType>({
    message: null,
    setMessage: () => null,
});

export default MessagesContext;
