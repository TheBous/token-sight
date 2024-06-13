const mapDexIcon = (dex: string) => {
    if (!dex) return '/dex/placeholder.png';
    const formattedString = dex.toLowerCase();
    switch (dex) {
        case 'uniswap':
        case 'uniswap_v2':
        case 'uniswap_v3':
            return '/dex/uniswap.png';
        case 'pancakeswap':
            return '/dex/pancake.png';
        case 'orca':
            return '/dex/orca.png';
        case 'raydium':
            return '/dex/raydium.png';
        case 'curve':
            return '/dex/curve.png';
        case 'thena-fusion':
            return '/dex/thena.webp';
        default:
            return '/dex/placeholder.png';

    };
}

export default mapDexIcon;