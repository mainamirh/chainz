"use client";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import AllocationPieChart from "./AllocationPieChart";

import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";

import { coinLogo, roundDecimalsPlaces } from "@/app/lib/utils";
import { CircleEllipsis, LoaderCircle } from "lucide-react";
import { AggregatedAllocationSK } from "./Skeleton";

type TokenMap = {
  [name: string]: {
    symbol: string;
    totalValue: number;
    cryptoId: number;
  };
};

export type AggregatedAllocation = {
  symbol: string;
  totalValue: number;
  percentage: number;
  cryptoId: number;
};

const TokenAllocation = ({
  exchangeId,
  setOtherAllocations,
}: {
  exchangeId: number | undefined;
  setOtherAllocations: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [aggregatedAllocation, setAggregatedAllocation] = useState<
    AggregatedAllocation[]
  >([]);

  const { data: tokenHolders } = useExchangeAssets(exchangeId);

  useEffect(() => {
    if (!tokenHolders) return;

    const tokenMap: TokenMap = {};
    let totalPortfolioValue = 0;

    tokenHolders.forEach(({ currency, balance }) => {
      const { name, symbol, price_usd, crypto_id } = currency;
      const value = balance * price_usd;

      if (!tokenMap[name]) {
        tokenMap[name] = { symbol, totalValue: 0, cryptoId: crypto_id };
      }
      tokenMap[name].totalValue += value;
      totalPortfolioValue += value;
    });

    const tokenAllocation = Object.values(tokenMap)
      .map((token) => ({
        ...token,
        percentage: roundDecimalsPlaces(
          (token.totalValue / totalPortfolioValue) * 100,
          2,
        ),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const firstFive = tokenAllocation.slice(0, 5);

    const othersTotalValue = tokenAllocation.slice(5).reduce(
      (acc, item) => {
        acc.totalValue += item.totalValue;
        acc.percentage += item.percentage;
        return acc;
      },
      {
        symbol: "Others",
        totalValue: 0,
        percentage: 0,
        cryptoId: -1,
      },
    );

    setAggregatedAllocation([...firstFive, othersTotalValue]);
  }, [tokenHolders]);

  useEffect(() => {
    if (searchParams.get("allocation") === "others") {
      setOtherAllocations(
        aggregatedAllocation.slice(0, 5).map((item) => item.symbol),
      );
    } else {
      setOtherAllocations([]);
    }
  }, [searchParams, aggregatedAllocation, setOtherAllocations]);

  function handleSearchParams(query: "allocation", term: string) {
    const params = new URLSearchParams(searchParams);
    // If the term is the same as the current value, delete the param
    params.get(query) === term ? params.delete(query) : params.set(query, term);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="rounded-xl border border-border bg-foreground p-5 text-[0.5rem] shadow-md md:text-[0.6rem]">
      <label htmlFor="token-allocation" className="text-xl font-semibold">
        Token Allocation
      </label>
      <div
        id="token-allocation"
        className="mx-auto aspect-square w-[300px] select-none"
      >
        {aggregatedAllocation.length > 0 ? (
          <AllocationPieChart data={aggregatedAllocation} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <LoaderCircle className="h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
      <div className="mx-auto grid w-2/3 select-none grid-cols-1 gap-2 text-sm font-medium">
        {aggregatedAllocation.length > 0 ? (
          aggregatedAllocation.map((token) => (
            <div
              key={token.symbol}
              className={`${token.symbol.toLowerCase() === searchParams.get("allocation") && "bg-border hover:bg-border"} flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-border/40`}
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
                    quality={100}
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
