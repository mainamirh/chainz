"use client";

import { useState } from "react";
import { MarketRow } from "./MarketRow";
import { MarketSK } from "./MarketSK";
import Pagination from "../../common/Pagination";

import { useExchangeMarkets } from "@/lib/hooks/queries/coinpaprika";

import type { ExchangeMarket } from "@/types";

const MarketTable = ({
  exchangeName,
}: {
  exchangeName: string | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: markets, isPending } = useExchangeMarkets(
    exchangeName?.toLowerCase() ?? "",
  );

  const sortedMarkets =
    markets?.sort(
      (a, b) => b.quotes.USD.volume_24h - a.quotes.USD.volume_24h,
    ) ?? [];

  function paginatedMarkets(
    markets: ExchangeMarket[],
    start: number,
    end: number,
  ) {
    return markets.slice(start, end + 1).map((market, index, page) => (
      <tr
        key={`${market.base_currency_id}_${market.quote_currency_id}`}
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
              <th className="w-35">Volume</th>
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

export default MarketTable;
