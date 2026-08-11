"use client";

import { useState } from "react";
import MarketRow from "./MarketRow";
import { MarketSK } from "./Skeletons";
import Pagination from "../../common/Pagination";

import { useCoinMarkets } from "@/lib/hooks/queries/coinpaprika";

import type { CoinMarket } from "@/types";

const MarketsTable = ({ coinId }: { coinId: string | undefined }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: markets, isPending } = useCoinMarkets(coinId ?? "");

  const sortedMarkets =
    markets?.sort(
      (a, b) => b.adjusted_volume_24h_share - a.adjusted_volume_24h_share,
    ) ?? [];

  function paginatedMarkets(markets: CoinMarket[], start: number, end: number) {
    return markets.slice(start, end + 1).map((market, index, page) => (
      <tr
        key={`${market.exchange_id}*${market.base_currency_id}*${market.quote_currency_id}`}
        className={`hover:bg-border/30 transition-colors ${
          index !== page.length - 1
            ? "[&>td]:border-border [&>td]:border-b"
            : "border-none"
        } [&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
      >
        <MarketRow market={market} index={start + index + 1} />
      </tr>
    ));
  }

  return (
    <div className="border-border bg-foreground flex flex-col gap-5 rounded-xl border p-5 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed whitespace-nowrap">
          <thead>
            <tr className="[&>th]:border-border [&>th]:border-y [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
              <th className="w-10 pl-4 text-start!">#</th>
              <th className="w-45 text-start!">Currency</th>
              <th className="w-32.5 text-start!">Pair</th>
              <th className="w-20">Trust Score</th>
              <th className="w-30">Price</th>
              <th className="w-35">Volume (24h)</th>
              <th className="w-25">Volume %</th>
              <th className="w-32.5">Updated</th>
            </tr>
          </thead>
          <tbody>
            {sortedMarkets.length > 0 &&
              paginatedMarkets(
                sortedMarkets,
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage - 1,
              )}
            {isPending && <MarketSK numberOfCurrencyPerPage={itemsPerPage} />}
          </tbody>
        </table>
      </div>
      {sortedMarkets.length > 0 && (
        <Pagination
          items={sortedMarkets.length}
          itemsPerPage={itemsPerPage}
          siblings={2}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MarketsTable;
