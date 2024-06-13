"use client"

import { ReactNode, memo, useMemo, useState, } from "react";
import MessagesContext, { Message } from "./MessagesContext/MessagesContext";

type WalletProviderType = {
    children: ReactNode;
};

const MessageProvider = ({ children }: WalletProviderType) => {
    const [message, setMessage] = useState<Message | null>(null);

    const memoizedMessage = useMemo(
        () => ({
            message,
            setMessage,
        }),
        [message],
    );

    return <MessagesContext.Provider value={memoizedMessage}>{children}</MessagesContext.Provider>;
};

export default memo(MessageProvider);
