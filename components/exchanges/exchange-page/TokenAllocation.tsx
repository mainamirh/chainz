"use client";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import AllocationPieChart from "./AllocationPieChart";

import { useExchangeAssets } from "@/hooks/queries";

import {
  coinLogo,
  getAggregatedAllocation,
  roundDecimalsPlaces,
} from "@/lib/utils";
import { CircleEllipsis, LoaderCircle } from "lucide-react";
import { AggregatedAllocationSK } from "./Skeleton";

const TokenAllocation = ({
  exchangeId,
}: {
  exchangeId: number | undefined;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: tokenHolders } = useExchangeAssets(exchangeId ?? 0);

  const aggregatedAllocation = getAggregatedAllocation(tokenHolders);

  function handleSearchParams(query: "allocation", term: string) {
    const params = new URLSearchParams(searchParams);

    if (params.get(query) === term) {
      params.delete(query);
    } else {
      params.set(query, term);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-border bg-foreground rounded-xl border p-5 text-[0.5rem] shadow-md md:text-[0.6rem]">
      <label htmlFor="token-allocation" className="text-xl font-semibold">
        Token Allocation
      </label>
      <div
        id="token-allocation"
        className="mx-auto aspect-square w-75 select-none"
      >
        {aggregatedAllocation.length > 0 ? (
          <AllocationPieChart data={aggregatedAllocation} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <LoaderCircle className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
      <div className="mx-auto grid w-2/3 grid-cols-1 gap-2 text-sm font-medium select-none">
        {aggregatedAllocation.length > 0 ? (
          aggregatedAllocation.map((token) => (
            <div
              key={token.symbol}
              className={`${token.symbol.toLowerCase() === searchParams.get("allocation") ? "bg-border hover:bg-border" : "hover:bg-border/40"} flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition-colors`}
              onClick={() =>
                handleSearchParams("allocation", token.symbol.toLowerCase())
              }
            >
              <div className="flex items-center gap-2">
                {token.cryptoId !== -1 ? (
                  <Image
                    src={coinLogo(token.cryptoId)}
                    alt="crypto-logo"
                    width={20}
                    height={20}
                  />
                ) : (
                  <CircleEllipsis className="h-5 w-5" />
                )}
                <div className="flex items-center gap-1">{token.symbol}</div>
              </div>
              <div>{roundDecimalsPlaces(token.percentage, 2)}%</div>
            </div>
          ))
        ) : (
          <AggregatedAllocationSK />
        )}
      </div>
    </div>
  );
};

export default TokenAllocation;
