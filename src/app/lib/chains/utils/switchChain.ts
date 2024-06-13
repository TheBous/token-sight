import { Connector } from "@web3-react/types";

import { SupportedChainId } from "../constants/supportedChains";
import { ProviderRpcError, Web3ErrorsCode } from "../../errors/constants/errors";
import { getChainInfo } from "./getChainInfos";
import { isSupportedChain } from "./isSupportedChain";

export const switchChain = async (
	connector: Connector,
	chainId: SupportedChainId,
) => {
	const hexChainId = `0x${chainId.toString(16)}`;
	try {
		if (!isSupportedChain(chainId)) {
			throw new Error(
				`Chain ${chainId} not supported for connector (${typeof connector})`,
			);
		} else if (
			!!(window?.ethereum as any)
			&& !!(window?.ethereum as any)?.request
			&& typeof (window?.ethereum as any)?.request === "function"
		) {
			await (window.ethereum as any).request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: hexChainId }],
			});
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
			const info = getChainInfo(chainId);
			const addChainParameter = {
				chainId: hexChainId,
				chainName: info.chainName,
				rpcUrls: info?.customChain?.rpcUrls,
				blockExplorerUrls: info?.customChain?.blockExplorerUrls,
				iconUrls: info?.customChain?.iconUrls,
				nativeCurrency: info?.customChain?.nativeCurrency,
			};
			await (window?.ethereum as any)?.request({
				method: "wallet_addEthereumChain",
				params: [addChainParameter],
			});
		}
	}
};
