import { Suspense } from "react";

import Hero from "./ui/Hero";
import Ranking from "./ui/Ranking";

import { getListingsLatest } from "./lib/apis/coinmarketcap";

export default async function Home() {
  const topCoins = await getListingsLatest(10);

  return (
    <div className="py-[10%] px-[4%]">
      <Hero />
      <Suspense fallback={<div>loading ...</div>}>
        <Ranking CoinsRanking={topCoins} />
      </Suspense>
    </div>
  );
}
