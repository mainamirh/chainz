"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

import { coinLogo, coinLastWeekChart } from "../../lib/definitions";
import { roundDecimalsPlaces } from "../../lib/utils";
import PercentChange from "../common/PercentChange";

import type { ListingLatest } from "@/app/lib/apis/coinmarketcap";

export const RankingRow = ({ coinRanking }: { coinRanking: ListingLatest }) => {
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const priceElement = priceRef.current;
    if (!priceElement) return;

    const priceMutation = (mutationList: MutationRecord[]) => {
      if (!mutationList[0].oldValue) return;
      const newValue = parseFloat(priceElement.innerText.replace(/[$,]/g, ""));
      const oldValue = parseFloat(
        mutationList[0].oldValue.replace(/[$,]/g, "")
      );
      priceElement.classList.add(
        newValue >= oldValue ? "positive-price" : "negative-price"
      );
      setTimeout(() => {
        priceElement.classList.remove(priceElement.classList[0]);
      }, 3000);
    };

    const priceObserver = new MutationObserver(priceMutation);

    priceObserver.observe(priceRef.current, {
      subtree: true,
      characterData: true,
      characterDataOldValue: true,
    });

    return () => {
      priceObserver.disconnect();
    };
  }, [priceRef]);

  return (
    <>
      <td className="pl-5 !text-start">{coinRanking.cmc_rank}</td>
      <td>
        <Link
          href={`/currencies/${coinRanking.name.toLowerCase()}`}
          className="flex items-center gap-2"
        >
          <Image
            src={coinLogo(coinRanking.id)}
            alt="coin-icon"
            width={24}
            height={24}
            className="aspect-auto"
          />

          {coinRanking.name}
          <span className="text-sm font-medium text-content/70">
            {coinRanking.symbol}
          </span>
        </Link>
      </td>
      <td>
        <div ref={priceRef}>
          $
          {coinRanking.quote.USD.price.toLocaleString("en-US", {
            maximumFractionDigits: coinRanking.quote.USD.price > 1.0 ? 2 : 4,
            minimumFractionDigits: 2,
          })}
        </div>
      </td>
      <td>
        <PercentChange
          price={coinRanking.quote.USD.percent_change_1h}
          decimalPlaces={2}
        />
      </td>
      <td>
        <PercentChange
          price={coinRanking.quote.USD.percent_change_24h}
          decimalPlaces={2}
        />
      </td>
      <td>
        <PercentChange
          price={coinRanking.quote.USD.percent_change_7d}
          decimalPlaces={2}
        />
      </td>
      <td>
        $
        {roundDecimalsPlaces(
          coinRanking.quote.USD.market_cap,
          0
        ).toLocaleString()}
      </td>
      <td>
        {roundDecimalsPlaces(
          coinRanking.quote.USD.volume_24h,
          0
        ).toLocaleString()}
      </td>
      <td>
        {roundDecimalsPlaces(
          coinRanking.circulating_supply,
          0
        ).toLocaleString()}
      </td>
      <td>
        <Image
          src={coinLastWeekChart(coinRanking.id)}
          alt="last-week-chart"
          width={1000}
          height={1000}
          priority={true}
          className={`${
            roundDecimalsPlaces(coinRanking.quote.USD.percent_change_7d, 2) >= 0
              ? "week-chart-isUp"
              : "week-chart-isDown"
          } aspect-auto h-[50px]`}
        />
      </td>
    </>
  );
};
