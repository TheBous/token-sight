export interface TransactionData {
    buys: number;
    sells: number;
    buyers: number;
    sellers: number;
}

export interface Transactions {
    m5: TransactionData;
    m15: TransactionData;
    m30: TransactionData;
    h1: TransactionData;
    h24: TransactionData;
};

export interface PoolData {
    data: {
        id: string;
        type: string;
        attributes: {
            base_token_price_usd: string;
            base_token_price_native_currency: string;
            quote_token_price_usd: string;
            quote_token_price_native_currency: string;
            base_token_price_quote_token: string;
            quote_token_price_base_token: string;
            address: string;
            name: string;
            pool_created_at: string;
            fdv_usd: string;
            market_cap_usd: string;
            price_change_percentage: {
                m5: string;
                h1: string;
                h6: string;
                h24: string;
            };
            transactions: {
                [key: string]: TransactionData; // Utilizzo di un indice di tipo stringa
            };
            volume_usd: {
                m5: string;
                h1: string;
                h6: string;
                h24: string;
            };
            reserve_in_usd: string;
        };
        relationships: {
            base_token: {
                data: {
                    id: string;
                    type: string;
                };
            };
            quote_token: {
                data: {
                    id: string;
                    type: string;
                };
            };
            dex: {
                data: {
                    id: string;
                    type: string;
                };
            };
        };
    };
}

interface TokenAttributes {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    coingecko_coin_id: string;
    websites: string[];
    description: string;
    gt_score: number;
    discord_url: string | null;
    telegram_handle: string | null;
    twitter_handle: string | null;
}

export interface TokenFromPool {
    id: string;
    type: string;
    attributes: TokenAttributes;
}