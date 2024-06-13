"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserAddress from "./UserAddress";
import useDeactivate from "./hooks/useDeactivate";

export default function NavLinks() {
    const { status } = useSession();
    const router = useRouter();
    const { deactivate } = useDeactivate();

    const logout = async () => {
        deactivate();
        await signOut();
        router.push('/login');
    };

    const login = () => router.push('/login');

    const getLoginLogoutButton = () => {
        const label = status === "authenticated" ? "Logout" : "Login";
        const callback = status === "authenticated" ? logout : login;

        return (
            <button className="btn btn-ghost border-white" onClick={callback}>
                {label}
            </button>
        );
    };
    return (
        <div className="flex gap-3 flex-col">
            {status === "authenticated" && <Link href="/dashboard">Dashboard</Link>}
            <UserAddress />
            {getLoginLogoutButton()}
        </div>
    );
}