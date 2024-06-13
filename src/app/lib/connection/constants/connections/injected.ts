import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import { ConnectionType, Connection } from "../connectionType";

const onError = (error: Error) => console.debug(`web3-react error: ${error}`);

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
	(actions) => new MetaMask({ actions, onError }),
);

export const injectedConnection: Connection = {
	connector: web3Injected,
	hooks: web3InjectedHooks,
	type: ConnectionType.INJECTED,
};
