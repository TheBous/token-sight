import { SupportedChainId } from "../constants/supportedChains";

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
	SupportedChainId,
).filter((id) => typeof id === "number") as SupportedChainId[];

export const isSupportedChain = (
	chainId: number | null | undefined,
): chainId is SupportedChainId => !!chainId && !!SupportedChainId[chainId];
