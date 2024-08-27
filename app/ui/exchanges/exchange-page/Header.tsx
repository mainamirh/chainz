"use client";

import Image from "next/image";

import { roundDecimalsPlaces } from "@/app/lib/utils";

import type { ExchangeMetadata } from "@/app/lib/apis/coinmarketcap";
import type { ListingLatest as Coin } from "@/app/lib/apis/coinmarketcap";

const Header = ({
  exchange,
  BTC,
}: {
  exchange: ExchangeMetadata;
  BTC: Coin;
}) => {
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

      <div className="flex items-center gap-3">
        <Image
          src={exchange.logo}
          alt={`${exchange.name}-icon`}
          width={50}
          height={50}
          className="aspect-auto"
        />
        <div className="text-2xl font-semibold">{exchange.name}</div>
      </div>

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
          <span className="text-2xl font-semibold md:text-3xl">
            &#36;
            {roundDecimalsPlaces(exchange.spot_volume_usd, 2).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
