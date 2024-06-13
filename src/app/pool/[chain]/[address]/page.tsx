import Chart from "@/app/components/Chart";
import mapDexIcon from "@/app/lib/mapDex";
import fetchPoolAddressDetails from "@/app/lib/pool/fetchPoolAddressDetails";
import fetchTokenPoolDetails from "@/app/lib/pool/fetchTokensPoolDetails";
import cx from "classnames";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PoolData, TokenFromPool } from "./type";

type PoolProps = {
    params: { address: string, chain: string }
}

export async function generateMetadata(
    { params }: PoolProps,
): Promise<Metadata> {
    const { address } = params ?? {};
    return {
        title: `Pool ${address}`,
        description: "TokenSight test project",
    }
}

export default async function Token({ params }: PoolProps) {
    const fetchPoolDataPromise = fetchPoolAddressDetails(params.address, params.chain) as Promise<PoolData>;
    const fetchTokenPoolDetailsPromise = fetchTokenPoolDetails(params.address, params.chain) as Promise<{ data: TokenFromPool[] }>;

    const [{ data: poolData }, { data: tokensPoolData }] = await Promise.all([fetchPoolDataPromise, fetchTokenPoolDetailsPromise]);

    if (!poolData || !tokensPoolData) notFound();
    const isPositiveNumber = (value: string) => parseFloat(value) > 0;
    const isEqualsZero = (value: string) => parseFloat(value) === 0;

    const getPricePercentageDatas = () => {
        const { h1, h24, m5, h6 } = poolData?.attributes?.price_change_percentage ?? {};

        const pricePercentageDatas = [
            { title: '5 minutes', value: m5 },
            { title: '1 hour', value: h1 },
            { title: "6 hour", value: h6 },
            { title: '24 hours', value: h24 },
        ];

        return pricePercentageDatas.map((data) => {
            return {
                ...data,
                icon: isEqualsZero(data.value) ? "/dumb.svg" : isPositiveNumber(data.value) ? '/up.svg' : '/down.svg',
                color: isEqualsZero(data.value) ? "text-white" : isPositiveNumber(data.value) ? 'text-success' : 'text-error',
            }
        })
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <h1 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{poolData?.attributes?.name}</span>
                    </h1>
                    <div className={cx("badge badge-lg font-extralight", {
                        "text-error": !isPositiveNumber(poolData?.attributes?.price_change_percentage?.h1 ?? "0"),
                        "text-success": isPositiveNumber(poolData?.attributes?.price_change_percentage?.h1 ?? "0"),
                    })}>${parseFloat(poolData.attributes.base_token_price_usd ?? "0").toFixed(2)}</div>
                </div>
                <div className="flex gap-3">
                    <div className="relative w-12 h-12 tooltip" data-tip={poolData?.relationships?.dex?.data?.id}>
                        <Image src={mapDexIcon(poolData?.relationships?.dex?.data?.id)} layout="fill" objectFit="contain" alt="Dex" />
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 w-full gap-2">
                {tokensPoolData.map((token) => (
                    <div key={token.id} className="badge badge-primary badge-outline flex gap-2 p-4 max-w-full">
                        <Image src={token.attributes.image_url} width={20} height={20} alt={token.attributes.symbol} />
                        <span className="font-bold">{token.attributes.symbol}</span>
                        <span className="truncate max-w-xs md:max-w-full">{token.attributes.address}</span>
                    </div>
                ))}
            </div>
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 w-full gap-2">
                {
                    getPricePercentageDatas().map((data, index) => (
                        <div key={index} className={cx("stat w-full", {
                        })}>
                            <div className="stat-figure text-primary">
                                <Image src={data.icon} width={50} height={50} alt={data.title} />
                            </div>
                            <div className="stat-title">{data.title}</div>
                            <div className={`stat-value ${data.color}`}>{data.value}%</div>
                            <div className="stat-desc">{`From ${data.title} ago`}</div>
                        </div>
                    ))
                }
            </div>
            <div className="grid lg:grid-cols-2 mt-2 md:grid-cols-2 grid-cols-1 w-full gap-2">
                <div className="stats bg-primary text-primary-content flex flex-col lg:flex-row">
                    <div className="stat text-base-100">
                        <div className="stat-title text-base-300">FDV</div>
                        <div className="stat-value font-light">{parseFloat(poolData.attributes.fdv_usd ?? "0").toFixed(2)}</div>
                    </div>
                    <div className="stat text-base-100">
                        <div className="stat-title text-base-300">Market CAP</div>
                        <div className="stat-value font-light">{parseFloat(poolData.attributes.market_cap_usd ?? "0").toFixed(2)}</div>
                    </div>
                </div>
                <div className="stats bg-primary text-primary-content  flex flex-col lg:flex-row">
                    <div className="stat text-base-100">
                        <div className="stat-title text-base-300">Liquidity ($)</div>
                        <div className="stat-value font-light">{parseFloat(poolData.attributes.reserve_in_usd ?? "0").toFixed(2)}</div>
                    </div>
                    <div className="stat text-base-100">
                        <div className="stat-title text-base-300">Volume last hour</div>
                        <div className="stat-value font-light">{parseFloat(poolData.attributes.volume_usd.h1 ?? "0").toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            {Object.keys(poolData.attributes.transactions).map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {['buys', 'sells', 'buyers', 'sellers'].map((dataType) => (
                            <tr key={dataType}>
                                <th>{dataType}</th>
                                {Object.keys(poolData.attributes.transactions).map((timeframe) => (
                                    <td key={timeframe}>
                                        {poolData.attributes.transactions[timeframe]?.[dataType as keyof typeof poolData.attributes.transactions[0]] ?? "N/A"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 w-full h-80">
                <Chart address={params.address} chain={params.chain} />
            </div>
        </div>
    );
}