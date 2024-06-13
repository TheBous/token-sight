"use client";

import { useSession } from "next-auth/react";
import type { CustomSession } from "../lib/auth/authOptions";
import cutAddressMiddleChars from "../utils/cutAddress";

export default function UserAddress() {
  const { data: session } = useSession();
  const { address: publicAddress } = (session as CustomSession)?.user ?? {};

  const handleCopyAddress = () => {
    if (publicAddress) {
      navigator.clipboard.writeText(publicAddress).then(
        () => {
          alert("Address copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy address: ", err);
        }
      );
    }
  };

  if (!publicAddress) return null;
  return (
    <div
      className="p-2 border border-white rounded-full flex gap-2 cursor-pointer items-center"
      onClick={handleCopyAddress}
    >
      <div className="avatar">
        <div className="w-6 rounded-full">
          <img src={`https://effigy.im/a/${publicAddress}`} alt="avatar" />
        </div>
      </div>
      <span>{cutAddressMiddleChars(publicAddress)}</span>
    </div>
  );
}