"use client";

import { useQuery } from "@tanstack/react-query";
import { getListingsLatest } from "../../lib/apis/coinmarketcap";
import RankingSK from "./RankingSK";
import { RankingRow } from "./RankingRow";

const Ranking = () => {
  const COIN_COUNT = 10;

  const { isPending, data: CoinsRanking } = useQuery({
    queryKey: ["listings", "latest"],
    queryFn: () => getListingsLatest(COIN_COUNT),
    staleTime: 60 * 1000,
    // refetchInterval: 60 * 1000,
  });

  return (
    <div className="mt-[10%] border shadow-md border-border p-5 rounded-xl bg-foreground/50 overflow-auto">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead>
          <tr className="[&>th]:py-3 [&>th]:text-end [&>th]:font-semibold [&>th]:text-xs [&>th]:border-b-[1px] [&>th]:border-border">
            <th className="pl-5 w-[50px] !text-start">#</th>
            <th className="w-[130px] !text-start">Name</th>
            <th className="w-[120px]">Price</th>
            <th className="w-[60px]">1h %</th>
            <th className="w-[60px]">24h %</th>
            <th className="w-[60px]">7d %</th>
            <th className="w-[140px]">Market Cap</th>
            <th className="w-[130px]">Volume(24h)</th>
            <th className="w-[130px]">Circulating Supply</th>
            <th className="w-[160px]">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {CoinsRanking &&
            CoinsRanking.map((data, i) => (
              <tr
                className={`${
                  i !== CoinsRanking.length - 1
                    ? "[&>td]:border-b-[1px] [&>td]:border-border"
                    : "border-none"
                } hover:bg-border/30 transition-colors cursor-pointer [&>td]:text-end [&>td]:py-5 [&>td]:font-medium [&>td]:text-sm`}
                key={data.id}
              >
                <RankingRow coinRanking={data} />
              </tr>
            ))}
          {isPending && <RankingSK coinCount={COIN_COUNT} />}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
