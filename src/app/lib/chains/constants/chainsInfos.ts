/* eslint-disable max-lines */
import { SupportedChainId } from "./supportedChains";

type CustomChain = {
	chainId: string;
	chainName: string;
	blockExplorerUrls?: string[];
	iconUrls?: string[];
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: string[];
};

export type Chain = {
	hasFungibleTokens: boolean;
	hasNonFungibleTokens: boolean;
	hasGas: boolean;
	hasDataInTransaction: boolean;
	symbol: string;
	ticker: string;
	decimals: number;
	feeUnitLabel: string;
	chainId: SupportedChainId;
	isEthereumLike: boolean;
	createWithBlockies: boolean;
	checkENS: boolean;
	hasFees: boolean;
	chainName: string;
	supportsEip1559: boolean;
	isTestnet: boolean;
	customChain?: CustomChain;
	logo?: string;
};

export const ETHChainInfo: Chain = {
	// logo: ethereumLogo,
	hasFungibleTokens: true,
	hasNonFungibleTokens: true,
	hasGas: true, // transaction_fees = gas_limit * gas_price
	hasDataInTransaction: true,
	symbol: "Ξ",
	ticker: "ETH",
	decimals: 18,
	feeUnitLabel: "GWEI",
	chainId: SupportedChainId.ETH,
	isEthereumLike: true,
	createWithBlockies: true,
	checkENS: true,
	hasFees: true,
	chainName: "Ethereum",
	supportsEip1559: true,
	isTestnet: false,
};
export const RopstenChainInfo: Chain = {
	...ETHChainInfo,
	symbol: "ΞT",
	chainId: SupportedChainId.ROPSTEN,
	chainName: "Ropsten Testnet",
	supportsEip1559: false,
	isTestnet: true,
};
export const RinkebyChainInfo: Chain = {
	...ETHChainInfo,
	symbol: "ΞT",
	chainId: SupportedChainId.RINKEBY,
	chainName: "Rinkeby Testnet",
	supportsEip1559: false,
	isTestnet: true,
};
export const GoerliChainInfo: Chain = {
	...ETHChainInfo,
	symbol: "ΞT",
	chainId: SupportedChainId.GOERLI,
	chainName: "Goerli Testnet",
	supportsEip1559: true,
	isTestnet: true,
};
export const BscChainInfo = {
	...ETHChainInfo,
	logo: "",
	symbol: "BNB",
	ticker: "BNB",
	chainId: SupportedChainId.BSC,
	hasFees: true,
	checkENS: true,
	chainName: "Binance Smart Chain",
	customChain: {
		chainId: `0x${(56).toString(16)}`,
		chainName: "Binance Smart Chain",
		nativeCurrency: {
			name: "BNB",
			symbol: "BNB",
			decimals: 18,
		},
		rpcUrls: ["https://bsc-dataseed.binance.org/"],
	},
	supportsEip1559: false,
};
export const BscTestChainInfo: Chain = {
	...BscChainInfo,
	chainId: SupportedChainId.BSC_TEST,
	chainName: "Binance Smart Chain Test",
	customChain: {
		chainId: `0x${(97).toString(16)}`,
		chainName: "Binance Smart Chain Test",
		nativeCurrency: {
			name: "BNB TEST",
			symbol: "BNB",
			decimals: 18,
		},
		rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
	},
	supportsEip1559: false,
};

export const FantomChainInfo: Chain = {
	...ETHChainInfo,
	logo: "",
	symbol: "FTM",
	ticker: "FTM",
	chainId: SupportedChainId.FANTOM,
	hasFees: true,
	chainName: "Fantom",
	customChain: {
		chainId: `0x${(250).toString(16)}`,
		chainName: "Fantom",
		nativeCurrency: {
			name: "FANTOM",
			symbol: "FTM",
			decimals: 18,
		},
		rpcUrls: ["https://rpc.ftm.tools/"],
	},
	supportsEip1559: false,
};

export const PolygonChainInfo: Chain = {
	...ETHChainInfo,
	logo: "",
	symbol: "MATIC",
	ticker: "MATIC",
	chainId: SupportedChainId.POLYGON,
	hasFees: true,
	chainName: "Polygon",
	customChain: {
		chainId: `0x${(137).toString(16)}`,
		chainName: "Polygon",
		nativeCurrency: {
			name: "POLYGON",
			symbol: "MATIC",
			decimals: 18,
		},
		rpcUrls: ["https://polygon-rpc.com/"],
	},
	supportsEip1559: true,
};

export const OptimismChainInfo: Chain = {
	...ETHChainInfo,
	logo: "",
	symbol: "ETH",
	ticker: "ETH",
	chainId: SupportedChainId.OPTIMISM,
	hasFees: true,
	chainName: "Optimism",
	customChain: {
		chainId: `0x${(10).toString(16)}`,
		chainName: "Optimism",
		nativeCurrency: {
			name: "OPTIMISM",
			symbol: "ETH",
			decimals: 18,
		},
		rpcUrls: ["https://rpc.ankr.com/optimism/"],
	},
	supportsEip1559: false,
};