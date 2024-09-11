"use client";

import { useEffect, useState } from "react";

import useCoinMarkets from "@/app/lib/hooks/useCoinMarkets";
import MarketsTable from "./MarketsTable";

import type { CoinMarket } from "@/app/lib/apis/coinpaprika";
import MarketRecommendation from "./MarketRecommendation";
import { RecommendationSK } from "./Skeletons";

import { capitalize, range } from "@/app/lib/utils";

const CoinMarket = ({ coinId }: { coinId: string | undefined }) => {
  const [recommendedMarket, setRecommendedMarket] = useState<{
    highestPrice: CoinMarket;
    lowestPrice: CoinMarket;
    forBuying: CoinMarket;
    forSelling: CoinMarket;
  }>();

  const { data: markets, isSuccess } = useCoinMarkets(coinId);

  useEffect(() => {
    if (!isSuccess || !coinId) return;

    setRecommendedMarket(
      markets.reduce(
        (result, current) => {
          const {
            quotes,
            trust_score,
            adjusted_volume_24h_share,
            market_url,
            pair,
          } = current;

          if (
            pair === `${coinId.split("-")[0].toUpperCase()}/USDT` &&
            market_url &&
            adjusted_volume_24h_share > 0
          ) {
            const isBetterForBuying =
              quotes.USD.price < result.lowestPrice.quotes.USD.price;
            const isBetterForSelling =
              quotes.USD.price > result.highestPrice.quotes.USD.price;
            const isTrusted =
              trust_score === "high" && adjusted_volume_24h_share > 0.1;

            if (isBetterForBuying) {
              result.lowestPrice = current;
              if (isTrusted) result.forBuying = current;
            }

            if (isBetterForSelling) {
              result.highestPrice = current;
              if (isTrusted) result.forSelling = current;
            }
          }

          return result;
        },
        {
          highestPrice: markets[0],
          lowestPrice: markets[0],
          forBuying: markets[0],
          forSelling: markets[0],
        },
      ),
    );
  }, [markets, isSuccess]);

  return (
    <div className="flex flex-col gap-5">
      <label htmlFor="coin-markets" className="text-2xl font-semibold">
        {coinId ? (
          <span className="capitalize">{coinId.split("-")[1]} Markets</span>
        ) : (
          <div className="h-[30px] w-[180px] animate-pulse rounded-md bg-border" />
        )}
      </label>
      <div className="relative overflow-hidden rounded-xl">
        <div className="no-scrollbar flex items-center gap-5 overflow-x-auto p-3">
          <div className="pointer-events-none absolute inset-0 shadow-[inset_25px_0px_25px_-25px,inset_-25px_0px_25px_-25px] shadow-border" />
          {coinId && recommendedMarket ? (
            <>
              <MarketRecommendation
                coinId={coinId}
                market={recommendedMarket.forBuying}
                label={`Best to Buy ${capitalize(coinId.split("-")[1])} on`}
              />
              <MarketRecommendation
                coinId={coinId}
                market={recommendedMarket.forSelling}
                label={`Best to Sell ${capitalize(coinId.split("-")[1])} on`}
              />

              <MarketRecommendation
                coinId={coinId}
                market={recommendedMarket.lowestPrice}
                label={`Lowest Price for ${capitalize(coinId.split("-")[1])} at`}
              />

              <MarketRecommendation
                coinId={coinId}
                market={recommendedMarket.highestPrice}
                label={`Highest Price for ${capitalize(coinId.split("-")[1])} at`}
              />
            </>
          ) : (
            range(1, 4).map((_, i) => <RecommendationSK key={i} />)
          )}
        </div>
      </div>

      <MarketsTable coinId={coinId} />
    </div>
  );
};

export default CoinMarket;
