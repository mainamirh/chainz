"use client";

import { useRouter } from "next/navigation";

import RankingSK from "./RankingSK";
import RankingRow from "./RankingRow";
import useListingLatest from "@/app/lib/hooks/useListingLatest";

const Ranking = () => {
  const router = useRouter();

  const { isPending, data: CoinsRanking, numberOfCoins } = useListingLatest();

  return (
    <div className="mt-[10%] overflow-auto rounded-xl border border-border bg-foreground p-5 shadow-md">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead>
          <tr className="[&>th]:border-b-[1px] [&>th]:border-border [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
            <th className="w-[50px] pl-5 !text-start">#</th>
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
                } cursor-pointer transition-colors hover:bg-border/30 [&>td]:py-5 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
                key={data.id}
                onClick={() =>
                  router.push(
                    `/currencies/${data.name.toLowerCase()}?category=price&range=1D`,
                  )
                }
              >
                <RankingRow coinRanking={data} />
              </tr>
            ))}
          {isPending && <RankingSK numberOfCoins={numberOfCoins} />}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
