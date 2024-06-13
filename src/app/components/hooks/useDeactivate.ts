import { useWeb3React } from "@web3-react/core";
import { useContext } from "react";
import WalletContext from "../WalletProvider/WalletContext/WalletContext";

const useDeactivate = () => {
	const { setWalletConnection } = useContext(WalletContext);
	const { isActive, connector } = useWeb3React();

	const deactivate = () => {
		try {
			if (isActive) {
				if (connector.deactivate) connector.deactivate();
				else connector.resetState();
				
				setWalletConnection(null);
			} else throw new Error("Already deactivated");
		} catch (error) {
			console.error(error);
		}
	};

	return { deactivate };
};

export default useDeactivate;
