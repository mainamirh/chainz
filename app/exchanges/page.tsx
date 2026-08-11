"use client";

import { useExchangesIdMap, useExchangesMetadata } from "@/hooks/queries";
import ExchangeCard from "@/components/exchanges/ExchangeCard";
import ExchangeCardSK from "@/components/exchanges/ExchangeCardSK";

export default function Exchanges() {
  const { data: exchangesIdMap } = useExchangesIdMap(10);
  const ids = exchangesIdMap?.map((exchanges) => exchanges.id) ?? [];

  const { data: exchangesMetadata } = useExchangesMetadata({ id: ids });

  return (
    <div className="grid gap-y-5 p-[3%] text-sm md:p-[2%] lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {exchangesMetadata
        ? Object.entries(exchangesMetadata).map(([key, exchange]) => (
            <ExchangeCard key={key} exchange={exchange} />
          ))
        : [...Array(10)].map((_, i) => <ExchangeCardSK key={i} />)}
    </div>
  );
}
