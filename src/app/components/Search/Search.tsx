"use client";
export const revalidate = 3600;

import type { Token } from "@/app/dashboard/page";
import cx from "classnames";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Input from "../UI/Input";

import debounce from "@/app/lib/debounce";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import "./Search.css";

interface Pool {
    name: string;
    oneHchange: string;
    marketCapUsd: string;
    address: string;
    chain: string;
}

export default function Search() {
    const [pools, setPools] = useState<Token[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const debouncedFetchTokens = useCallback(
        debounce(async (e: ChangeEvent<HTMLInputElement>) => {
            try {
                const { value } = e.target;
                if (value) {
                    try {
                        const res = await fetch(`/api/pool/${value}`);
                        const { pools } = await res.json() as { pools: Pool[] };
                        setPools(pools);
                    } catch (error) {
                        console.error('Error fetching pools:', error);
                    }
                } else setPools([]);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setLoading(true);
        debouncedFetchTokens(e);
    }, [debouncedFetchTokens]);

    const getIcon = useCallback(() => {
        if (loading) return <span className="loading loading-spinner loading-md" />;
        if (searchValue) return '/close.svg';
        return "/search.svg"
    }, [loading, searchValue]);

    const icon = useMemo(() => {
        return getIcon();
    }, [getIcon])

    const onRightIconClick = useCallback(() => {
        if (icon === '/close.svg') {
            setSearchValue('');
            setPools([]);
        }
    }, [icon]);

    return (
        <div className="relative w-full">
            <Input
                placeholder="Search..."
                rightIcon={icon}
                isFull
                isRightIconClickable={icon === '/close.svg'}
                onChange={onInputChange}
                onRightIconClick={onRightIconClick}
                initialValue={searchValue}
            />
            <div className={cx('absolute w-full', {
                'list_expand': !!pools.length,
                'list_collapse': !pools.length
            })}>
                {!!pools.length && (
                    <ul className="menu bg-base-100 p-0 [&_li>*]:rounded-full w-full mt-1">
                        {
                            pools?.map((pool) => (
                                <li key={`${pool.address}`} className="font-extralight tracking-wide flex">
                                    <Link href={`/pool/${pool.chain}/${pool?.address}`} className="flex">
                                        <div className="flex justify-between  items-center w-full flex-1">
                                            <span className="flex-1 text-left font-bold">{pool?.name}</span>
                                            <span className="flex-1 text-center">{`${pool?.oneHchange}`}</span>
                                            <span className="flex-1 text-center">{Number(pool?.marketCapUsd).toFixed(2)} USD MC</span>
                                            <span className="flex-1 font-bold text-right">{pool?.chain}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}