export enum Web3ErrorsCode {
	UNRECOGNIZED_CHAIN_ID = 4902,
	UNRECOGNIZED_CHAIN_ID_2 = -32603,
	USER_REJECTED = 4100,
	USER_DENIED_TRANSACTION = 4001,
	METHOD_NOT_SUPPORTED_BY_PROVIDER = 4200,
	PROVIDER_DISCONNECTED = 4900,
	PROVIDER_DISCONNECTED_CHAIN = 4901,
	INVALID_JSON = 32700,
	REQUEST_INVALID_JSON = 32600,
	REQUEST_INVALID_JSON_2 = -32600,
	METHOD_NOT_EXIST = 32601,
	METHOD_NOT_EXIST_2 = 32601,
	INVALID_PARAMS = 32602,
	INVALID_PARAMS_2 = -32602,
	INTERNAL_RPC_ERROR = 32603,
	INTERNAL_RPC_ERROR_2 = -32603,
	INVALID_INPUT = -32000,
	RESOURCE_NOT_FOUND = -32001,
	RESOURCE_UNAVAILBLE = -32002,
	TRANSACTION_REJECTED = -32003,
	METHOD_NOT_SUPPORTED = -32004,
	REQUEST_LIMIT = -32005,
}

export interface ProviderRpcError extends Error {
	message: string;
	code: Web3ErrorsCode;
}

export interface ExpandedWeb3Error extends Error {
	message: string;
	data?: unknown;
	standard?: string;
	explanation?: string;
	name: string;
}

export const Web3ErrorsExpanded: {
	[key in Web3ErrorsCode]: ExpandedWeb3Error;
} = {
	[Web3ErrorsCode.INVALID_JSON]: {
		name: "Invalid JSON",
		standard: "JSON RPC 2.0",
		message:
			"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
	},
	[Web3ErrorsCode.REQUEST_INVALID_JSON]: {
		name: "Invalid request object",
		standard: "JSON RPC 2.0",
		message: "The JSON sent is not a valid Request object.",
	},
	[Web3ErrorsCode.REQUEST_INVALID_JSON_2]: {
		name: "Invalid request object",
		standard: "JSON RPC 2.0",
		message: "The JSON sent is not a valid Request object.",
	},
	[Web3ErrorsCode.METHOD_NOT_EXIST]: {
		name: "Method does not exist",
		standard: "JSON RPC 2.0",
		message: "The method does not exist / is not available.",
	},
	[Web3ErrorsCode.INVALID_PARAMS]: {
		name: "Invalid method params",
		standard: "JSON RPC 2.0",
		message: "Invalid method parameter(s).",
		explanation: "",
	},
	[Web3ErrorsCode.INVALID_PARAMS_2]: {
		name: "Invalid method params",
		standard: "JSON RPC 2.0",
		message: "Invalid method parameter(s).",
		explanation: "",
	},
	[Web3ErrorsCode.INTERNAL_RPC_ERROR]: {
		name: "RPC - Interval error",
		standard: "JSON RPC 2.0",
		message: "Internal JSON-RPC error.",
	},
	[Web3ErrorsCode.INTERNAL_RPC_ERROR_2]: {
		name: "Wrong address",
		standard: "JSON RPC 2.0",
		message: "Wrong address.",
	},
	[Web3ErrorsCode.INVALID_INPUT]: {
		name: "Invalid Input",
		standard: "EIP-1474",
		message: "Invalid input.",
	},
	[Web3ErrorsCode.RESOURCE_NOT_FOUND]: {
		name: "Resource 404",
		standard: "EIP-1474",
		message: "Resource not found.",
	},
	[Web3ErrorsCode.RESOURCE_UNAVAILBLE]: {
		name: "Resource unavailable",
		standard: "EIP-1474",
		message: "Resource unavailable.",
	},
	[Web3ErrorsCode.TRANSACTION_REJECTED]: {
		name: "Transaction rejected",
		standard: "EIP-1474",
		message: "Transaction rejected.",
	},
	[Web3ErrorsCode.METHOD_NOT_SUPPORTED]: {
		name: "Method not supported",
		standard: "EIP-1474",
		message: "Method not supported.",
	},
	[Web3ErrorsCode.REQUEST_LIMIT]: {
		name: "Rate Limiter reached",
		standard: "EIP-1474",
		message: "Request limit exceeded.",
	},
	[Web3ErrorsCode.USER_DENIED_TRANSACTION]: {
		name: "User rejected",
		standard: "EIP-1193",
		message: "User rejected the request.",
	},
	[Web3ErrorsCode.USER_REJECTED]: {
		name: "Not authorized",
		standard: "EIP-1193",
		message:
			"The requested account and/or method has not been authorized by the user.",
	},
	[Web3ErrorsCode.METHOD_NOT_SUPPORTED_BY_PROVIDER]: {
		name: "Not supported by provider",
		standard: "EIP-1193",
		message: "The requested method is not supported by this Ethereum provider.",
	},
	[Web3ErrorsCode.PROVIDER_DISCONNECTED]: {
		name: "Provider disconnected all chains",
		standard: "EIP-1193",
		message: "The provider is disconnected from all chains.",
	},
	[Web3ErrorsCode.PROVIDER_DISCONNECTED_CHAIN]: {
		name: "Provider disconnected chain",
		standard: "EIP-1193",
		message: "The provider is disconnected from the specified chain.",
	},
	[Web3ErrorsCode.UNRECOGNIZED_CHAIN_ID]: {
		name: "Unrecognized chain id",
		standard: "EIP-1193",
		message: "Unrecognized chain id.",
	},
};
