"use client";

import useExchangesMetadata from "../lib/hooks/useExchangesMetadata";
import ExchangeCard from "../ui/exchanges/ExchangeCard";
import ExchangeCardSK from "../ui/exchanges/ExchangeCardSK";

export default function Exchanges() {
  const { data: exchangesMetadata } = useExchangesMetadata();

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
