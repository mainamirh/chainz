"use client";

import { useParams } from "next/navigation";
import useListingLatest from "@/app/lib/hooks/useListingLatest";
import CoinStats from "@/app/ui/currencies/CoinStats";
import CoinStatsSK from "@/app/ui/currencies/CoinStatsSK";

export default function Currency() {
  const { name } = useParams();

  const { data: coinRanking } = useListingLatest();
  const currency = coinRanking?.find(
    (coin) =>
      coin.name.toLocaleLowerCase() === decodeURIComponent(name.toString())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-4 p-[3%] md:p-[2%]">
      <div className="col-span-1">
        {currency ? <CoinStats currency={currency} /> : <CoinStatsSK />}
      </div>
      <div className="col-span-1">
        <section></section>
      </div>
    </div>
  );
}
