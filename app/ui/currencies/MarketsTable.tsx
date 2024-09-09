"use client";

import { useState, useEffect } from "react";
import MarketRow from "./MarketRow";
import MarketSK from "./MarketSK";
import Pagination from "../common/Pagination";

import useCoinMarkets from "@/app/lib/hooks/useCoinMarkets";

import type { CoinMarket } from "@/app/lib/apis/coinpaprika";

const MarketsTable = ({ coinId }: { coinId: string | undefined }) => {
  const [marketsState, setMarketsState] = useState<CoinMarket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: markets, isPending, isSuccess } = useCoinMarkets(coinId);

  useEffect(() => {
    if (!isSuccess) return;

    markets.sort(
      (a, b) => b.adjusted_volume_24h_share - a.adjusted_volume_24h_share,
    );

    setMarketsState(markets);
  }, [markets, isSuccess]);

  function paginatedMarkets(markets: CoinMarket[], start: number, end: number) {
    return markets.reduce((acc: JSX.Element[], curr, index) => {
      if (index >= start && index <= end) {
        acc.push(
          <tr
            className={`${
              index !== markets.length - 1
                ? "[&>td]:border-b-[1px] [&>td]:border-border"
                : "border-none"
            } transition-colors hover:bg-border/30 [&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
            key={curr.exchange_id
              .concat("_")
              .concat(curr.base_currency_id)
              .concat("_")
              .concat(curr.quote_currency_id)}
          >
            <MarketRow market={curr} index={index + 1} />
          </tr>,
        );
      }
      return acc;
    }, []);
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="coin-markets" className="text-2xl font-semibold">
        {coinId ? (
          <span className="capitalize">{coinId.split("-")[1]} Markets</span>
        ) : (
          <div className="h-[30px] w-[180px] animate-pulse rounded-md bg-border" />
        )}
      </label>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-foreground p-5 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed whitespace-nowrap">
            <thead>
              <tr className="[&>th]:border-y-[1px] [&>th]:border-border [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
                <th className="w-[40px] pl-4 !text-start">#</th>
                <th className="w-[180px] !text-start">Currency</th>
                <th className="w-[130px] !text-start">Pair</th>
                <th className="w-[80px]">Trust Score</th>
                <th className="w-[120px]">Price</th>
                <th className="w-[140px]">Volume (24h)</th>
                <th className="w-[100px]">Volume %</th>
                <th className="w-[130px]">Updated</th>
              </tr>
            </thead>
            <tbody>
              {marketsState.length > 0 &&
                paginatedMarkets(
                  marketsState,
                  (currentPage - 1) * itemsPerPage,
                  (currentPage - 1) * itemsPerPage + itemsPerPage - 1,
                )}
              {isPending && <MarketSK numberOfCurrencyPerPage={itemsPerPage} />}
            </tbody>
          </table>
        </div>
        {marketsState.length > 0 && (
          <Pagination
            items={marketsState}
            itemsPerPage={itemsPerPage}
            siblings={2}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MarketsTable;
