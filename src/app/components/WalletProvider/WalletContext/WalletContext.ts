"use client"

import { ConnectionType } from "@/app/lib/connection/constants/connectionType";
import { createContext } from "react";

export type WalletType = ConnectionType | null;

type WalletContextType = {
	walletConnection: WalletType;
	setWalletConnection: (wallet: WalletType) => void;
};

const WalletContext = createContext<WalletContextType>({
	walletConnection: null,
	setWalletConnection: () => null,
});

export default WalletContext;
