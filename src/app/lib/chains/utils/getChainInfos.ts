import { SupportedChainId } from "../constants/supportedChains";

import {
	BscChainInfo,
	BscTestChainInfo,
	Chain,
	ETHChainInfo,
	FantomChainInfo,
	GoerliChainInfo,
	OptimismChainInfo,
	PolygonChainInfo,
	RinkebyChainInfo,
	RopstenChainInfo
} from "../constants/chainsInfos";

export const getChainInfo = (chainId: SupportedChainId): Chain => {
	switch (chainId) {
		case SupportedChainId.ETH:
			return ETHChainInfo;
		case SupportedChainId.ROPSTEN:
			return RopstenChainInfo;
		case SupportedChainId.RINKEBY:
			return RinkebyChainInfo;
		case SupportedChainId.GOERLI:
			return GoerliChainInfo;
		case SupportedChainId.BSC:
			return BscChainInfo;
		case SupportedChainId.BSC_TEST:
			return BscTestChainInfo;
		case SupportedChainId.FANTOM:
			return FantomChainInfo;
		case SupportedChainId.POLYGON:
			return PolygonChainInfo;
		case SupportedChainId.OPTIMISM:
			return OptimismChainInfo;
		default:
			return ETHChainInfo;
	}
};
