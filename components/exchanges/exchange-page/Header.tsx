"use client";

import Link from "next/link";
import Image from "next/image";

import { roundDecimalsPlaces } from "@/lib/utils";

import { useExchangeAssets } from "@/lib/hooks/queries/coinmarketcap";

import type { ListingLatest as Coin, ExchangeMetadata } from "@/types";

const Header = ({
  exchange,
  BTC,
}: {
  exchange: ExchangeMetadata;
  BTC: Coin;
}) => {
  const { data: tokenHolders, isFetched } = useExchangeAssets(exchange.id);

  const totalValue = tokenHolders?.reduce(
    (acc, curr) => acc + curr.balance * curr.currency.price_usd,
    0,
  );

  return (
    <div className="relative grid h-fit grid-cols-1 items-center gap-y-9 p-[2%] md:grid-cols-2 lg:grid-cols-3">
      <div
        style={{
          backgroundImage: `url(${exchange.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-x-0 top-0 -z-10 h-7.5 blur-[70px]"
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
          <span className="text-content/70 text-base">
            {roundDecimalsPlaces(
              exchange.spot_volume_usd / BTC.quote.USD.price,
              0,
            ).toLocaleString()}
            &nbsp;BTC
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Total assets</span>
          {isFetched && totalValue ? (
            <span className="text-2xl font-semibold md:text-3xl">
              &#36;{roundDecimalsPlaces(totalValue, 2).toLocaleString()}
            </span>
          ) : (
            <div className="bg-border h-7.5 w-65 animate-pulse rounded-sm" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
