"use client"

import { Connector } from "@web3-react/types";
import { useEffect } from "react";

import { CustomSession } from "@/app/lib/auth/authOptions";
import { Connection } from "@/app/lib/connection/constants/connectionType";
import { getConnection } from "@/app/lib/connection/utils/getConnection";
import { useSession } from "next-auth/react";


export const connect = async (
	connector: Connector,
) => {
	try {
		if (connector.connectEagerly) await connector.connectEagerly();
		else await connector.activate();
	} catch (error) {
		console.debug(`web3-react eager connection error: ${error}`);
	}
};

const useEagerlyConnect = () => {
	const { status, data } = useSession();
	const { address: publicAddress } = (data as CustomSession)?.user ?? {};
	let selectedWallet = {} as Connector;
	let selectedConnection: Connection | null;
	selectedConnection = getConnection(selectedWallet);

	useEffect(() => {
		if (selectedConnection && status === "authenticated" && publicAddress) connect(selectedConnection.connector);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useEagerlyConnect;
