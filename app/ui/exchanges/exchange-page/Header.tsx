"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { roundDecimalsPlaces } from "@/app/lib/utils";

import type { ExchangeMetadata } from "@/app/lib/apis/coinmarketcap";
import type { ListingLatest as Coin } from "@/app/lib/apis/coinmarketcap";
import useExchangeAssets from "@/app/lib/hooks/useExchangeAssets";

const Header = ({
  exchange,
  BTC,
}: {
  exchange: ExchangeMetadata;
  BTC: Coin;
}) => {
  const [totalValue, setTotalValue] = useState<number>(0);

  const { data: tokenHolders, isFetched } = useExchangeAssets(exchange.id);

  useEffect(() => {
    if (!tokenHolders) return;

    setTotalValue(
      tokenHolders.reduce(
        (acc, curr) => acc + curr.balance * curr.currency.price_usd,
        0,
      ),
    );
  }, [tokenHolders]);

  return (
    <div className="relative grid h-fit grid-cols-1 items-center gap-y-9 p-[2%] md:grid-cols-2 lg:grid-cols-3">
      <div
        style={{
          backgroundImage: `url(${exchange.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-x-0 top-0 -z-10 h-[30px] blur-[70px]"
      />

      <Link
        href={exchange.urls.website[0]}
        target="_blank"
        className="flex w-fit items-center gap-3"
      >
        <Image
          src={exchange.logo}
          alt={`${exchange.name}-icon`}
          width={50}
          height={50}
          className="aspect-auto"
        />
        <div className="text-2xl font-semibold">{exchange.name}</div>
      </Link>

      <div className="col-span-1 grid grid-cols-subgrid gap-y-9 md:col-span-2">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Spot Trading Volume(24h)</span>
          <span className="text-2xl font-semibold md:text-3xl">
            &#36;
            {roundDecimalsPlaces(exchange.spot_volume_usd, 2).toLocaleString()}
          </span>
          <span className="text-base text-content/70">
            {roundDecimalsPlaces(
              exchange.spot_volume_usd / BTC.quote.USD.price,
              0,
            ).toLocaleString()}
            &nbsp;BTC
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Total assets</span>
          {totalValue || isFetched ? (
            <span className="text-2xl font-semibold md:text-3xl">
              &#36;{roundDecimalsPlaces(totalValue, 2).toLocaleString()}
            </span>
          ) : (
            <div className="h-[30px] w-[260px] animate-pulse rounded bg-border" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
