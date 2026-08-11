"use client";

import { useCoinMarkets } from "@/lib/hooks/queries/coinpaprika";
import MarketsTable from "./MarketsTable";

import MarketRecommendation from "./MarketRecommendation";
import { RecommendationSK } from "./Skeletons";
import { capitalize, range } from "@/lib/utils";

import type { CoinMarket } from "@/types";

type RecommendedMarkets = {
  highestPrice: CoinMarket;
  lowestPrice: CoinMarket;
  forBuying: CoinMarket;
  forSelling: CoinMarket;
};

const recommendations = [
  ["forBuying", "Best to Buy", "on"],
  ["forSelling", "Best to Sell", "on"],
  ["lowestPrice", "Lowest Price", "at"],
  ["highestPrice", "Highest Price", "at"],
] as const;

const CoinMarkets = ({ coinId }: { coinId: string | undefined }) => {
  const { data: markets } = useCoinMarkets(coinId ?? "");

  const baseCurrency = coinId?.split("-")[0].toUpperCase();

  const validMarkets = markets?.filter(
    ({ market_url, adjusted_volume_24h_share, pair }) =>
      market_url &&
      adjusted_volume_24h_share > 0 &&
      pair === `${baseCurrency}/USDT`,
  );

  const recommendedMarkets = validMarkets?.reduce<RecommendedMarkets>(
    (result, market) => {
      const price = market.quotes.USD.price;
      const isTrusted =
        market.trust_score === "high" && market.adjusted_volume_24h_share > 0.1;

      if (price < result.lowestPrice.quotes.USD.price) {
        result.lowestPrice = market;
      }

      if (price > result.highestPrice.quotes.USD.price) {
        result.highestPrice = market;
      }

      if (isTrusted && price < result.forBuying.quotes.USD.price) {
        result.forBuying = market;
      }

      if (isTrusted && price > result.forSelling.quotes.USD.price) {
        result.forSelling = market;
      }

      return result;
    },
    {
      highestPrice: validMarkets?.[0],
      lowestPrice: validMarkets?.[0],
      forBuying: validMarkets?.[0],
      forSelling: validMarkets?.[0],
    },
  );

  return (
    <div className="flex flex-col gap-5">
      <label htmlFor="coin-markets" className="text-2xl font-semibold">
        {coinId ? (
          <span className="capitalize">{coinId.split("-")[1]} Markets</span>
        ) : (
          <div className="bg-border h-7.5 w-45 animate-pulse rounded-md" />
        )}
      </label>
      <div className="no-scrollbar flex items-center gap-5 overflow-x-auto">
        {coinId && recommendedMarkets
          ? recommendations.map(([type, label, preposition]) => (
              <MarketRecommendation
                key={type}
                coinId={coinId}
                market={recommendedMarkets[type]}
                label={`${label} ${capitalize(coinId.split("-")[1])} ${preposition}`}
              />
            ))
          : range(1, 4).map((_, i) => <RecommendationSK key={i} />)}
      </div>

      <MarketsTable coinId={coinId} />
    </div>
  );
};

export default CoinMarkets;
