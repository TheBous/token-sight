import { ConnectionType, InjectedConnectionType, } from "../constants/connectionType";

export const getConnectionName = (
	connectionType: ConnectionType,
	isMetaMask?: boolean,
) => {
	switch (connectionType) {
		case ConnectionType.INJECTED:
			return isMetaMask
				? InjectedConnectionType.METAMASK
				: InjectedConnectionType.BROWSERWALLET;
		default:
			return InjectedConnectionType.METAMASK;
	}
};
