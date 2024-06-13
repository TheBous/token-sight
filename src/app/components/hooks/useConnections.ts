import { useMemo } from "react";

import { ConnectionType } from "@/app/lib/connection/constants/connectionType";
import { getConnection } from "@/app/lib/connection/utils/getConnection";

const SELECTABLE_WALLETS = [ConnectionType.INJECTED];

const useConnections = () => {
	const selectedWallet = null;
	return useMemo(() => {
		const orderedConnectionTypes: ConnectionType[] = [];

		if (selectedWallet) {
			orderedConnectionTypes.push(selectedWallet);
		}
		orderedConnectionTypes.push(
			...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet),
		);

		return orderedConnectionTypes.map(getConnection);
	}, [selectedWallet]);
};

export default useConnections;
