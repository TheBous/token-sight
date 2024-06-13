import { SupportedChainId } from "../constants/supportedChains";

const getChainIdFromName = (_chain: string | number) => {
	const chain = typeof _chain === "string" ? _chain.toLowerCase() : _chain;

	if (chain === "eth" || chain === 1) {
		return SupportedChainId.ETH;
	}
	if (chain === "ropsten" || chain === 3) {
		return SupportedChainId.ROPSTEN;
	}
	if (chain === "rinkeby" || chain === 4) {
		return SupportedChainId.RINKEBY;
	}
	if (chain === "goerli" || chain === 5) {
		return SupportedChainId.GOERLI;
	}
	if (chain === "bsc" || chain === 56) {
		return SupportedChainId.BSC;
	}
	if (chain === "fantom" || chain === 250) {
		return SupportedChainId.FANTOM;
	}
	if (chain === "polygon" || chain === 137) {
		return SupportedChainId.POLYGON;
	}
	if (chain === "optimism" || chain === 10) {
		return SupportedChainId.OPTIMISM;
	}
	return null;
};

export default getChainIdFromName;
