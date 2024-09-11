"use client";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink } from "lucide-react";

import {
  exchangePaprikaLogo,
  compactNumber,
  trustBadgeColor,
} from "@/app/lib/utils";

import type { CoinMarket } from "@/app/lib/apis/coinpaprika";

const MarketRecommendation = ({
  market,
  label,
}: {
  coinId: string;
  market: CoinMarket;
  label: string;
}) => {
  return (
    <div className="flex w-[340px] shrink-0 flex-col gap-3 overflow-hidden rounded-xl border border-border bg-foreground p-5 shadow-md">
      <div>
        <Link
          href={market.market_url ?? "#"}
          target={"_blank"}
          className="flex w-fit items-center gap-1 text-xs font-normal text-blue-400 transition-colors hover:text-blue-500"
        >
          {market.pair}

          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex items-center justify-between text-2xl font-semibold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 4,
          maximumSignificantDigits: 5,
        }).format(market.quotes.USD.price)}

        <div className="flex items-center gap-1 text-xs text-content/80">
          <span>Vol:</span>$
          {compactNumber(market.quotes.USD.volume_24h).toLocaleString()}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <p className="shrink-0">{label}</p>
        <Link
          href={`/exchanges/${market.exchange_name.toLowerCase()}`}
          className="flex shrink-0 items-center gap-2 text-sm font-medium"
        >
          <Image
            src={exchangePaprikaLogo(market.exchange_id)}
            alt="exchange-icon"
            width={100}
            height={100}
            className="aspect-auto w-6"
          />
          <span className="w-[110px] truncate">{market.exchange_name}</span>
        </Link>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-content/80">
        Trust Score:
        <div
          className={`${trustBadgeColor(market.trust_score)} rounded-full px-2 py-1 text-center font-semibold capitalize text-white/90`}
        >
          {market.trust_score}
        </div>
      </div>
    </div>
  );
};

export default MarketRecommendation;
