"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

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
import TokenHoldersTable from "@/app/ui/exchanges/exchange-page/TokenHoldersTable";
import TokenAllocation from "@/app/ui/exchanges/exchange-page/TokenAllocation";

export default function Exchange() {
  const { name } = useParams();

  /**
   * If the "other" is selected, the otherAllocation is
   * set to the first five token from aggregatedAllocation
   * to filter out the token holders table.
   *  */
  const [otherAllocations, setOtherAllocations] = useState<string[]>([]);

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
      <div className="flex flex-col gap-10 p-[5%] md:p-[2%]">
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
        <div className="flex flex-col gap-2">
          <label
            htmlFor="financial-reserves"
            className="text-2xl font-semibold"
          >
            Financial reserves
          </label>
          <div
            id="financial-reserves"
            className="flex flex-col-reverse gap-7 overflow-hidden lg:flex-row"
          >
            <TokenHoldersTable
              exchangeId={exchange?.id}
              otherAllocations={otherAllocations}
            />
            <div className="flex flex-col gap-4 lg:w-2/6">
              <TokenAllocation
                exchangeId={exchange?.id}
                setOtherAllocations={setOtherAllocations}
              />
              <p className="text-balance text-xs text-content/40 before:mr-1 before:content-['**']">
                Disclaimer: The information about holdings in third-party wallet
                addresses is provided by CoinMarketCap. CoinMarketCap does not
                verify the accuracy or timeliness of the information and
                provides it &#34;as is&#34; without warranty. CoinMarketCap is
                not responsible for the accuracy or completeness of the
                information provided by third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
