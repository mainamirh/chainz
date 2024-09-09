"use client";

import Image from "next/image";
import Link from "next/link";

import { exchangePaprikaLogo, roundDecimalsPlaces } from "@/app/lib/utils";

import type { CoinMarket } from "@/app/lib/apis/coinpaprika";
import { ExternalLink } from "lucide-react";

const MarketRow = ({
  market,
  index,
}: {
  market: CoinMarket;
  index: number;
}) => {
  function trustBadgeColor(trustScore: string) {
    switch (trustScore) {
      case "high":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-red-600";
      default:
        return "bg-gray-700";
    }
  }

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffInSeconds =
    (new Date().getTime() - new Date(market.last_updated).getTime()) / 1000;
  const minutes = Math.floor(diffInSeconds / 60);

  return (
    <>
      <td className="pl-4 !text-start">{index}</td>
      <td>
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
          <span className="truncate">{market.exchange_name}</span>
        </Link>
      </td>
      <td className="!text-start">
        <Link
          href={market.market_url ?? "#"}
          target={market.market_url && "_blank"}
          className="flex w-fit items-center gap-1 font-normal text-blue-400 transition-colors hover:text-blue-500"
        >
          {market.pair}

          <ExternalLink className="h-3 w-3" />
        </Link>
      </td>
      <td>
        <div
          className={`${trustBadgeColor(market.trust_score)} float-end w-fit rounded-full px-2 py-1 text-center text-xs font-semibold capitalize text-content/90`}
        >
          {market.trust_score}
        </div>
      </td>
      <td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 4,
          maximumSignificantDigits: 4,
        }).format(market.quotes.USD.price)}
      </td>
      <td>
        {roundDecimalsPlaces(market.quotes.USD.volume_24h, 2).toLocaleString()}
      </td>
      <td>
        {roundDecimalsPlaces(
          market.adjusted_volume_24h_share,
          2,
        ).toLocaleString()}
        %
      </td>
      <td>{rtf.format(-minutes, "minute")}</td>
    </>
  );
};

export default MarketRow;
