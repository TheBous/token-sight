import { verifyMessage } from 'ethers/hash';
import jwt from 'jsonwebtoken';
import { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


interface CustomUser extends User {
    jwt?: string;
    address?: string;
}

export interface CustomSession extends Session {
    user: CustomUser;
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'MetaMask',
            credentials: {
                data: { type: 'object', required: true },
            },
            async authorize(credentials) {
                try {
                    const { signature, publicAddress } = JSON.parse(
                        credentials?.data || '{}'
                    );

                    const recoveredAddress = verifyMessage('wassap', signature);
                    if (recoveredAddress.toLowerCase() === publicAddress.toLowerCase()) {
                        const token = jwt.sign(
                            { publicAddress },
                            process.env.JWT_SECRET as string,
                            { expiresIn: '1h' }
                        );

                        return {
                            ...JSON.parse(credentials?.data || '{}'),
                            jwt: token,
                            address: publicAddress,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.jwt = (user as CustomUser).jwt;
                token.address = (user as CustomUser).address;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session as CustomSession;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;