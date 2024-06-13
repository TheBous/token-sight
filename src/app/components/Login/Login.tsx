"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';

import { SupportedChainId } from '@/app/lib/chains/constants/supportedChains';
import { ConnectionType } from '@/app/lib/connection/constants/connectionType';
import { ProviderRpcError, Web3ErrorsExpanded } from '@/app/lib/errors/constants/errors';
import { useWeb3React } from '@web3-react/core';
import { signIn } from 'next-auth/react';
import MessagesContext, { MessageType } from '../MessagesContext/MessagesContext';
import useIsAccountActive from '../hooks/useIsAccountActive';
import "./Login.css";

const Login = () => {
    const router = useRouter();
    const [connected, setConnected] = useState<boolean>(false);
    const { activate, error } = useIsAccountActive();
    const { message, setMessage } = useContext(MessagesContext);

    const { account, provider } = useWeb3React();
    const handleLogin = async () => {
        try {
            await activate(ConnectionType.INJECTED, SupportedChainId.ETH);
            setConnected(true);

        } catch (error: any) {
            setMessage({ type: MessageType.ERROR, message: error.message });
        }
    };

    useEffect(() => {
        const authServer = async () => {
            try {
                if (!!provider?.getSigner) {
                    const message = "wassap";
                    const signer = provider.getSigner();
                    const signature = await signer.signMessage(message);
                    const res = await signIn('credentials', {
                        redirect: false,
                        data: JSON.stringify({ signature, publicAddress: account }),
                    });
                    if (res?.error) throw new Error(res.error);
                    else router.push('/dashboard');
                }
            } catch (e) {
                const providerError = e as ProviderRpcError;
                const { message } = Web3ErrorsExpanded[providerError.code];
                setMessage({ type: MessageType.ERROR, message: message ?? providerError.message });
            }

        };

        if (connected) authServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connected, provider?.getSigner])

    console.warn(error);

    return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-10">
            <button className="btn btn-primary w-24 h-24" onClick={handleLogin}>
                <Image
                    src="/metamask.png"
                    width={50}
                    height={50}
                    alt="right"
                />
            </button>
        </div>
    );
};

export default Login;