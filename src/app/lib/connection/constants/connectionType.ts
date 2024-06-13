import { Connector } from "@web3-react/types";
import { Web3ReactHooks } from "@web3-react/core";

export enum ConnectionType {
	INJECTED = "INJECTED",
}

export interface Connection {
	connector: Connector;
	hooks: Web3ReactHooks;
	type: ConnectionType;
}

export enum InjectedConnectionType {
	METAMASK = "MetaMask",
	BROWSERWALLET = "Browser Wallet",
}
