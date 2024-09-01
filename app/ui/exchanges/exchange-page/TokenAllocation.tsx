"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AllocationPieChart from "./AllocationPieChart";

import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";

import { coinLogo, roundDecimalsPlaces } from "@/app/lib/utils";
import { CircleEllipsis } from "lucide-react";

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

const TokenAllocation = ({ exchangeId }: { exchangeId: number }) => {
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

  return (
    <div className="rounded-xl border border-border bg-foreground p-5 text-[0.5rem] shadow-md md:text-[0.6rem]">
      <label htmlFor="token-allocation" className="text-xl font-semibold">
        Token Allocation
      </label>
      <div id="token-allocation" className="mx-auto aspect-square w-[300px]">
        {aggregatedAllocation.length > 0 ? (
          <AllocationPieChart data={aggregatedAllocation} />
        ) : (
          <></>
        )}
      </div>
      {aggregatedAllocation.length > 0 ? (
        <div className="mx-auto grid w-2/3 grid-cols-1 gap-2 text-sm font-medium">
          {aggregatedAllocation.map((token) => (
            <div
              key={token.symbol}
              className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-border/60"
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
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TokenAllocation;
