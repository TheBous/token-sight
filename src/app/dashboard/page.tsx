import { Metadata } from "next";
import Search from "../components/Search/Search";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "TokenSight test project",
};

export interface Token {
    name: string;
    oneHchange: string;
    marketCapUsd: string;
    address: string;
    chain: string;
}


export default async function Dashboard() {
    return (
        <div className="h-full flex-1 flex items-center justify-center flex-col">
            <Search />
        </div>
    );
}