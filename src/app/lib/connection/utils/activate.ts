import { Connector } from "@web3-react/types";

import { SupportedChainId } from "../../chains/constants/supportedChains";
import { switchChain } from "../../chains/utils/switchChain";
import { ProviderRpcError, Web3ErrorsCode, } from "../../errors/constants/errors";
import { connectMetamaskMobile } from "./connectMetamaskMobile";
import installMetamask from "./installMetamask";

type ActivateAccountParams = {
	connector?: Connector;
	chainId?: SupportedChainId;
	isMobile?: boolean;
};

const activateAccount = async ({
	connector,
	chainId,
	isMobile = false,
}: ActivateAccountParams) => {
	try {
		if (window.ethereum) {
			if (connector) await connector.activate(chainId);
		} else if (isMobile) {
			connectMetamaskMobile();
		} else {
			installMetamask();
		}
	} catch (e: unknown) {
		const providerError = e as ProviderRpcError;
		if (
			[
				Web3ErrorsCode.UNRECOGNIZED_CHAIN_ID,
				Web3ErrorsCode.UNRECOGNIZED_CHAIN_ID_2,
			].includes(providerError.code)
			&& connector
		) {
			await switchChain(connector, chainId as number);
		} else {
			throw new Error(providerError.message);
		}
	}
};

export default activateAccount;
