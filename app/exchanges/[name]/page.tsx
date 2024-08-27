"use client";

import { useParams } from "next/navigation";

import useExchangesMetadata from "@/app/lib/hooks/useExchangesMetadata";
import useListingLatest from "@/app/lib/hooks/useListingLatest";

import Header from "@/app/ui/exchanges/exchange-page/Header";
import Links from "@/app/ui/exchanges/exchange-page/Links";
import Description from "@/app/ui/exchanges/exchange-page/Description";
import {
  DescriptionSK,
  HeaderSK,
  LinksSK,
} from "@/app/ui/exchanges/exchange-page/Skeleton";

export default function Exchange() {
  const { name } = useParams();

  const { data: exchangesMetadata } = useExchangesMetadata();
  const exchange =
    exchangesMetadata &&
    Object.entries(exchangesMetadata).find(
      ([_, exchange]) =>
        exchange.name.toLocaleLowerCase() ===
        decodeURIComponent(name.toString()),
    )?.[1];

  const { data: coinRanking } = useListingLatest();
  const BTC = coinRanking?.find(
    (coin) => coin.symbol.toLocaleLowerCase() === "btc",
  );

  return (
    <>
      <div className="flex h-[4000px] flex-col gap-[1%] p-[5%] md:p-[2%]">
        {exchange && BTC ? (
          <Header exchange={exchange} BTC={BTC} />
        ) : (
          <HeaderSK />
        )}

        <div className="flex h-fit w-full flex-col items-start gap-6 p-[1%] lg:flex-row">
          {exchange && BTC ? (
            <>
              <Links exchangeName={exchange.name} urls={exchange.urls} />
              <Description description={exchange.description} />
            </>
          ) : (
            <>
              <LinksSK />
              <DescriptionSK />
            </>
          )}
        </div>
      </div>
    </>
  );
}
