import { TransactionRequest } from "@ethersproject/abstract-provider";
import type { JsonRpcSigner } from "@ethersproject/providers";

const sendTransaction = async (
	signer: JsonRpcSigner,
	transaction: TransactionRequest,
) => {
	const tx = await signer.sendTransaction(transaction);
	return tx;
};

export default sendTransaction;
