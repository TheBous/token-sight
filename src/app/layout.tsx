import cx from "classnames";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import AuthProvider from "./AuthProvider";
import Messages from "./components/Messages";
import NavMenu from "./components/NavMenu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TokenSight",
  description: "TokenSight test project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const Web3ReactProviderDefault = dynamic(
    () => import('./components/Web3Provider/Web3Provider'),
    { ssr: false }
  );

  const MessagesProvider = dynamic(
    () => import('./components/MessagesProvider'),
    { ssr: false }
  );

  return (
    <AuthProvider>
      <html lang="en" className="h-screen">
        <body className={cx(inter.className, "h-screen")}>
          <link rel="icon" href="/favicon.png" sizes="any" />
          <div className="flex flex-col h-screen">
            <Web3ReactProviderDefault>
              <NavMenu />
              <div className="p-5 h-full">
                <MessagesProvider>
                  {children}
                  <Messages />
                </MessagesProvider>
              </div>
            </Web3ReactProviderDefault>
          </div>
        </body>
      </html>
    </AuthProvider >
  );
}
