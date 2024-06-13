import { useWeb3React } from "@web3-react/core";
import { useContext, useState } from "react";
import { useWindowSizes } from "./useWindowSizes";

import { SupportedChainId } from "@/app/lib/chains/constants/supportedChains";
import { ConnectionType } from "@/app/lib/connection/constants/connectionType";
import activateAccount from "@/app/lib/connection/utils/activate";
import { getConnection } from "@/app/lib/connection/utils/getConnection";
import { ProviderRpcError } from "@/app/lib/errors/constants/errors";
import WalletContext from "../WalletProvider/WalletContext/WalletContext";

const useIsAccountActive = () => {
	const { setWalletConnection } = useContext(WalletContext);
	const { isActive } = useWeb3React();
	const [isPending, setIsPending] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const { width } = useWindowSizes();

	const activate = async (
		connectionType: ConnectionType,
		chainId?: SupportedChainId,
	) => {
		try {
			const connection = getConnection(connectionType);
			const { connector: newConnector, type } = connection;
			setIsPending(true);
			if (connection) {
				await activateAccount({
					connector: newConnector,
					chainId,
					isMobile: width <= 767,
				});
				setWalletConnection(type);
				setIsPending(false);
				setError("");
			}
		} catch (e: unknown) {
			const providerError = e as ProviderRpcError;
			setError(providerError.message);
			setIsPending(false);
			console.error(providerError);
		}
	};

	return {
		error,
		isActive,
		isPending,
		activate,
	};
};

export default useIsAccountActive;
