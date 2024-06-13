const fetchPoolAddressDetails = async (address: string, chain: string) => {
    if (!address || !chain) return;
    const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/${chain}/pools/${address}`);
    return await response.json();
};

export default fetchPoolAddressDetails;