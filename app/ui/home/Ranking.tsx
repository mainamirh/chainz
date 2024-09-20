"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import RankingSK from "./RankingSK";
import RankingRow from "./RankingRow";
import useListingLatest from "@/app/lib/hooks/useListingLatest";
import Pagination from "../common/Pagination";

const Ranking = ({ cryptocurrencies }: { cryptocurrencies: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1");
  const itemsPerPage = 20;

  const { isPending, data: coinsRanking } = useListingLatest(
    currentPage,
    itemsPerPage,
  );

  function handleSearchParams(query: "page", term: string) {
    if (term === "1") {
      router.replace(`${pathname}`, { scroll: false });
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set(query, term);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mt-[10%] flex flex-col gap-5 overflow-auto rounded-xl border border-border bg-foreground p-5 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed whitespace-nowrap">
          <thead>
            <tr className="[&>th]:border-y-[1px] [&>th]:border-border [&>th]:py-3 [&>th]:text-end [&>th]:text-xs [&>th]:font-semibold">
              <th className="w-[50px] pl-5 !text-start">#</th>
              <th className="w-[160px] !text-start">Name</th>
              <th className="w-[110px]">Price</th>
              <th className="w-[80px]">1h %</th>
              <th className="w-[70px]">24h %</th>
              <th className="w-[70px]">7d %</th>
              <th className="w-[140px]">Market Cap</th>
              <th className="w-[130px]">Volume(24h)</th>
              <th className="w-[140px]">Circulating Supply</th>
              <th className="w-[180px] pr-3">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {coinsRanking &&
              coinsRanking.map((coin, index) => (
                <tr
                  className={`${
                    index !== coinsRanking.length - 1
                      ? "[&>td]:border-b-[1px] [&>td]:border-border"
                      : "border-none"
                  } cursor-pointer transition-colors hover:bg-border/30 [&>td]:py-4 [&>td]:text-end [&>td]:text-sm [&>td]:font-medium`}
                  key={coin.id}
                  onClick={() =>
                    router.push(
                      `/currencies/${coin.name.toLowerCase()}?category=price&range=1D`,
                    )
                  }
                >
                  <RankingRow coinRanking={coin} />
                </tr>
              ))}
            {isPending && <RankingSK numberOfCoins={itemsPerPage} />}
          </tbody>
        </table>
      </div>
      {coinsRanking && coinsRanking.length > 0 && (
        <Pagination
          items={cryptocurrencies}
          itemsPerPage={itemsPerPage}
          siblings={2}
          currentPage={currentPage}
          onPageChange={(page) => handleSearchParams("page", page.toString())}
        />
      )}
    </div>
  );
};

export default Ranking;
