"use client";

import Image from "next/image";
import { useState } from "react";

import {
  roundDecimalsPlaces,
  coinLogo,
  shortenedAddress,
} from "@/app/lib/utils";

import type { Wallet } from "@/app/lib/apis/coinmarketcap";
import { Check, Copy, WalletMinimal } from "lucide-react";

const TokenHoldersRow = ({ tokenHolder }: { tokenHolder: Wallet }) => {
  const [walletCopied, setWalletCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(tokenHolder.wallet_address)
      .then(() => {
        setWalletCopied(true);
        setTimeout(() => {
          setWalletCopied(false);
        }, 2000);
      })
      .catch(() => {
        console.log("Failed to copy");
      });
  }

  return (
    <>
      <td className="pl-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={coinLogo(tokenHolder.currency.crypto_id)}
              alt="currency-id"
              width={24}
              height={24}
              quality={100}
            />
            <Image
              src={coinLogo(tokenHolder.platform.crypto_id)}
              alt="platform-id"
              width={16}
              height={16}
              quality={100}
              className="absolute -bottom-[7px] -right-[7px]"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-medium">
              {tokenHolder.currency.symbol.toUpperCase()}
            </span>
            <div
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1 text-xs [&>svg]:hover:opacity-100"
            >
              <WalletMinimal className="h-4 w-4" />
              <span className="font-normal">
                {shortenedAddress(tokenHolder.wallet_address)}
              </span>
              {walletCopied ? (
                <Check className="h-4 w-4 opacity-0 transition-opacity" />
              ) : (
                <Copy className="h-4 w-4 opacity-0 transition-opacity" />
              )}
            </div>
          </div>
        </div>
      </td>
      <td>{roundDecimalsPlaces(tokenHolder.balance, 2).toLocaleString()}</td>
      <td>
        $
        {tokenHolder.currency.price_usd.toLocaleString("en-US", {
          maximumFractionDigits: tokenHolder.currency.price_usd > 1.0 ? 2 : 4,
          minimumFractionDigits: 2,
        })}
      </td>
      <td>
        $
        {roundDecimalsPlaces(
          tokenHolder.balance * tokenHolder.currency.price_usd,
          2,
        ).toLocaleString()}
      </td>
    </>
  );
};

export default TokenHoldersRow;
