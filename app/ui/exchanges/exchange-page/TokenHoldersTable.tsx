"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import TokenHoldersRow from "./TokenHoldersRow";

import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";
import { roundDecimalsPlaces } from "@/app/lib/utils";

import type { Wallet } from "@/app/lib/apis/coinmarketcap";
import { TokenHoldersSK } from "./Skeleton";

const TokenHoldersTable = ({
  exchangeId,
  otherAllocations,
}: {
  exchangeId: number | undefined;
  otherAllocations: string[];
}) => {
  const searchParams = useSearchParams();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [tokenHoldersState, setTokenHoldersState] = useState<Wallet[]>([]);

  const allocationSymbol = searchParams.get("allocation");
  const {
    data: tokenHolders,
    isPending,
    isFetched,
  } = useExchangeAssets(exchangeId);

  useEffect(() => {
    if (!tokenHolders) return;

    const filteredHolders = allocationSymbol
      ? tokenHolders.filter((wallet) =>
          allocationSymbol === "others"
            ? !otherAllocations.includes(wallet.currency.symbol)
            : wallet.currency.symbol.toLowerCase() ===
              allocationSymbol.toLowerCase(),
        )
      : tokenHolders;

    const sortedHolders = filteredHolders.sort(
      (a, b) =>
        b.balance * b.currency.price_usd - a.balance * a.currency.price_usd,
    );

    setTokenHoldersState(sortedHolders);

    setTotalValue(
      sortedHolders.reduce(
        (acc, curr) => acc + curr.balance * curr.currency.price_usd,
        0,
      ),
    );
  }, [tokenHolders, allocationSymbol, otherAllocations]);

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-foreground p-5 shadow-md lg:w-4/6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-lg font-semibold">
          Total:
          {totalValue || isFetched ? (
            <span>${roundDecimalsPlaces(totalValue, 2).toLocaleString()}</span>
          ) : (
            <div className="h-[21px] w-[170px] animate-pulse rounded bg-border" />
          )}
        </div>
        <ul className="text-xs font-medium text-content/40 [&>li]:before:mr-1 [&>li]:before:content-['*']">
          <li>
            Only wallets containing at least 100,000 USD in balance are shown
          </li>
          <li>Balances from wallets might be delayed</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed whitespace-nowrap">
          <thead>
            <tr className="[&>th]:border-y-[1px] [&>th]:border-border [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
              <th className="w-[180px] pl-4 !text-start">Token</th>
              <th className="w-[160px]">Balance</th>
              <th className="w-[130px]">Price</th>
              <th className="w-[160px]">Value</th>
            </tr>
          </thead>
          <tbody>
            {tokenHoldersState.length > 0 &&
              tokenHoldersState.map(
                (data, i) =>
                  i < 10 && (
                    <tr
                      className={`${
                        i !== tokenHoldersState.length - 1
                          ? "[&>td]:border-b-[1px] [&>td]:border-border"
                          : "border-none"
                      } [&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
                      key={data.wallet_address.concat(i.toString())}
                    >
                      <TokenHoldersRow tokenHolder={data} />
                    </tr>
                  ),
              )}
            {isPending && <TokenHoldersSK numberOfTokenPerPage={10} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenHoldersTable;
