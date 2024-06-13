import { NextRequest, NextResponse } from "next/server";

const getChain = (addressWithChain: string) => {
  if (!addressWithChain) return 'unknown';
  const parts = addressWithChain.split('_');
  const chainParts = parts.slice(0, -1);
  return chainParts.join(' ');
};

export async function GET(_: NextRequest, context: { params: { searchQuery: string } }) {
  const { params: { searchQuery } } = context ?? {};

  const response = await fetch(`https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}`);
  const { data = [] } = await response.json() ?? {};

  const pools = data.map((pool: any) => ({
    name: pool.attributes.name,
    oneHchange: pool?.attributes?.price_change_percentage?.h1 ?? 0,
    marketCapUsd: pool?.attributes?.market_cap_usd ?? 0,
    address: pool?.attributes?.address,
    chain: getChain(pool?.id),
  }));

  return NextResponse.json({ pools });
}