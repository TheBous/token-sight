import { ReactNode, memo, useMemo, useState, } from "react";

import WalletContext, { WalletType } from "./WalletContext/WalletContext";

type WalletProviderType = {
	children: ReactNode;
};

const WalletProvider = ({ children }: WalletProviderType) => {
	const [walletConnection, setWalletConnection] = useState<WalletType>(null);

	const memoizedWallet = useMemo(
		() => ({
			walletConnection,
			setWalletConnection,
		}),
		[walletConnection],
	);

	return <WalletContext.Provider value={memoizedWallet}>{children}</WalletContext.Provider>;
};

export default memo(WalletProvider);
