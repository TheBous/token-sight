import { Connector } from "@web3-react/types";

import { injectedConnection } from "../constants/connections/injected";
import { ConnectionType } from "../constants/connectionType";

const CONNECTIONS = [injectedConnection];

export const getConnection = (c: Connector | ConnectionType) => {
	if (c instanceof Connector) {
		const connection = CONNECTIONS.find(
			(_connection) => _connection.connector === c,
		);
		if (!connection) {
			throw Error("Unsupported connector");
		}
		return connection;
	}
	switch (c) {
		case ConnectionType.INJECTED:
			return injectedConnection;
		default:
			return injectedConnection;
	}
};
