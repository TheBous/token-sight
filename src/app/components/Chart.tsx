"use client";

import { memo } from 'react';

function Chart({ address = "", chain = "" }) {
    if (!address || !chain) return null;
    return (
        <div className="w-full">
            <iframe
                height="400px"
                width="100%"
                id="geckoterminal-embed"
                title="GeckoTerminal Embed"
                src={`https://www.geckoterminal.com/${chain}/pools/${address}?embed=1&info=0&swaps=0`}
                allow="clipboard-write"
                allowFullScreen
            ></iframe>
        </div >
    );
}

export default memo(Chart);