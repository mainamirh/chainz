"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import TokenHoldersRow from "./TokenHoldersRow";

import { useExchangeAssets } from "@/lib/hooks/queries/coinmarketcap";
import { roundDecimalsPlaces } from "@/lib/utils";

import type { Wallet } from "@/types";
import { TokenHoldersSK } from "./Skeleton";
import Pagination from "../../common/Pagination";

const TokenHoldersTable = ({
  exchangeId,
  otherAllocations,
}: {
  exchangeId: number | undefined;
  otherAllocations: string[];
}) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const allocationSymbol = searchParams.get("allocation");

  const {
    data: tokenHolders,
    isPending,
    isFetched,
  } = useExchangeAssets(exchangeId ?? 0);

  const selectedTokenHolders = tokenHolders
    ? tokenHolders
        .filter((wallet) =>
          allocationSymbol
            ? allocationSymbol === "others"
              ? !otherAllocations.includes(wallet.currency.symbol)
              : wallet.currency.symbol.toLowerCase() ===
                allocationSymbol.toLowerCase()
            : true,
        )
        .toSorted(
          (a, b) =>
            b.balance * b.currency.price_usd - a.balance * a.currency.price_usd,
        )
    : [];

  const totalValue = selectedTokenHolders.reduce(
    (total, wallet) => total + wallet.balance * wallet.currency.price_usd,
    0,
  );

  function paginatedTokenHolders(
    wallets: Wallet[],
    start: number,
    end: number,
  ) {
    return wallets.slice(start, end + 1).map((wallet, index, page) => (
      <tr
        key={`${wallet.wallet_address}${start + index}`}
        className={`[&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium ${
          index !== page.length - 1
            ? "[&>td]:border-border [&>td]:border-b"
            : "border-none"
        }`}
      >
        <TokenHoldersRow tokenHolder={wallet} />
      </tr>
    ));
  }

  return (
    <div className="border-border bg-foreground flex h-full flex-col gap-5 rounded-xl border p-5 shadow-md lg:w-4/6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-lg font-semibold">
          Total:
          {totalValue || isFetched ? (
            <span>${roundDecimalsPlaces(totalValue, 2).toLocaleString()}</span>
          ) : (
            <div className="bg-border h-5.25 w-42.5 animate-pulse rounded-sm" />
          )}
        </div>
        <ul className="text-content/40 text-xs font-medium [&>li]:before:mr-1 [&>li]:before:content-['*']">
          <li>
            Only wallets containing at least 100,000 USD in balance are shown
          </li>
          <li>Balances from wallets might be delayed</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed whitespace-nowrap">
          <thead>
            <tr className="[&>th]:border-border [&>th]:border-y [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
              <th className="w-45 pl-4 text-start!">Token</th>
              <th className="w-40">Balance</th>
              <th className="w-32.5">Price</th>
              <th className="w-40">Value</th>
            </tr>
          </thead>
          <tbody>
            {selectedTokenHolders.length > 0 &&
              paginatedTokenHolders(
                selectedTokenHolders,
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage - 1,
              )}
            {isPending && (
              <TokenHoldersSK numberOfTokenPerPage={itemsPerPage} />
            )}
          </tbody>
        </table>
      </div>
      {selectedTokenHolders.length > 0 && (
        <Pagination
          items={selectedTokenHolders.length}
          itemsPerPage={itemsPerPage}
          siblings={2}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TokenHoldersTable;
