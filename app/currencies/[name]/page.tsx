"use client";

import { useParams } from "next/navigation";

import useListingLatest from "@/app/lib/hooks/useListingLatest";
import CoinStats from "@/app/ui/currencies/CoinStats";
import CoinStatsSK from "@/app/ui/currencies/CoinStatsSK";
import HistoricalChart from "@/app/ui/currencies/HistoricalChart";
import MarketsTable from "@/app/ui/currencies/MarketsTable";

export default function Currency() {
  const { name } = useParams();

  const { data: coinRanking } = useListingLatest();
  const currency = coinRanking?.find(
    (coin) =>
      coin.name.toLocaleLowerCase() === decodeURIComponent(name.toString()),
  );

  return (
    <div className="flex flex-col gap-10 p-[3%] md:p-[2%]">
      <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-3 lg:gap-5">
        <div className="col-span-1">
          {currency ? <CoinStats currency={currency} /> : <CoinStatsSK />}
        </div>
        <div className="col-span-2">
          <HistoricalChart
            coinId={
              currency
                ? `${currency.symbol.toLowerCase()}-${currency.name.toLowerCase().split(" ")[0]}`
                : undefined
            }
          />
        </div>
      </div>
      <MarketsTable
        coinId={currency?.symbol
          .toLowerCase()
          .concat("-")
          .concat(currency?.name.toLowerCase().split(" ")[0])}
      />
    </div>
  );
}
