"use client";

import { useParams, useSearchParams } from "next/navigation";

import {
  useExchangeAssets,
  useExchangesMetadata,
  useListingLatest,
} from "@/hooks/queries";

import Header from "@/components/exchanges/exchange-page/Header";
import Links from "@/components/exchanges/exchange-page/Links";
import Description from "@/components/exchanges/exchange-page/Description";
import {
  DescriptionSK,
  HeaderSK,
  LinksSK,
} from "@/components/exchanges/exchange-page/Skeleton";
import TokenHoldersTable from "@/components/exchanges/exchange-page/TokenHoldersTable";
import TokenAllocation from "@/components/exchanges/exchange-page/TokenAllocation";
import ExchangeMarket from "@/components/exchanges/exchange-market/ExchangeMarket";
import { getAggregatedAllocation } from "@/lib/utils";

export default function Exchange() {
  const { name } = useParams();
  const searchParams = useSearchParams();

  const { data: metadata } = useExchangesMetadata();
  const exchange =
    metadata &&
    Object.entries(metadata).find(
      ([, exchange]) =>
        exchange.name.toLocaleLowerCase() ===
        decodeURIComponent(name?.toString() ?? ""),
    )?.[1];

  const { data: coinRanking } = useListingLatest();
  const BTC = coinRanking?.find(
    (coin) => coin.symbol.toLocaleLowerCase() === "btc",
  );

  const { data: tokenHolders } = useExchangeAssets(exchange?.id ?? 0);

  const aggregatedAllocation = getAggregatedAllocation(tokenHolders);
  /**
   * If the "other" is selected, the otherAllocation is
   * set to the first five token from aggregatedAllocation
   * to filter out the token holders table.
   *  */
  let otherAllocations: string[] = [];

  if (searchParams.get("allocation") === "others") {
    otherAllocations = aggregatedAllocation
      .slice(0, 5)
      .map((item) => item.symbol);
  }

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
              <TokenAllocation exchangeId={exchange?.id} />
              <p className="text-content/40 text-xs text-balance before:mr-1 before:content-['**']">
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
        <ExchangeMarket exchangeName={exchange?.name} />
      </div>
    </>
  );
}
