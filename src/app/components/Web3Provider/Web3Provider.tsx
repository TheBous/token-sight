"use client"

import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { ReactNode, memo, useMemo } from "react";


import { Connection } from "@/app/lib/connection/constants/connectionType";
import { getConnectionName } from "@/app/lib/connection/utils/getConnectionName";
import WalletProvider from "../WalletProvider/WalletProvider";
import useConnections from "../hooks/useConnections";
import useEagerlyConnect from "../hooks/useEagerlyConnect";

type Web3ProviderType = {
	children: ReactNode;
};

const Web3Provider = ({ children }: Web3ProviderType) => {
	useEagerlyConnect();
	const connections = useConnections();
	const connectors: [Connector, Web3ReactHooks][] = connections.map(
		({ hooks, connector }) => [connector, hooks],
	);

	const key = useMemo(
		() => connections
			.map(({ type }: Connection) => getConnectionName(type))
			.join("-"),
		[connections],
	);


	return (
		<Web3ReactProvider connectors={connectors} key={key}>
			<WalletProvider>{children}</WalletProvider>
		</Web3ReactProvider>
	);
};

export default memo(Web3Provider);
