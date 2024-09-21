import Link from "next/link";
import Button from "./ui/common/Button";
import Ranking from "./ui/home/Ranking";
import PriceConverter from "./ui/PriceConverter";

import { getQuotesLatest } from "./lib/apis/coinmarketcap";

export default async function Home() {
  const quotesLatest = await getQuotesLatest({ next: { revalidate: 60 * 60 } });

  return (
    <div className="px-[3%] pt-[60px] md:pt-[8%]">
      <div className="bg-gradient absolute inset-x-0 top-[80px] -z-10 h-[400px] opacity-50" />

      <div className="grid grid-cols-1 gap-16 px-[2%] text-sm md:text-base lg:grid-cols-11 lg:gap-7">
        <div className="flex flex-col items-start gap-4 p-[3%] text-sm md:text-base lg:col-span-6">
          <h1 className="text-3xl font-semibold md:text-5xl">
            Crypto for Everyone
          </h1>
          <p>Find the best places to buy and sell crypto</p>
          <Link href="#ranking">
            <Button className="px-6 py-3 md:px-8 md:py-4">Get Started</Button>
          </Link>
        </div>
        <div className="lg:col-span-5">
          <PriceConverter />
        </div>
      </div>
      <Ranking cryptocurrencies={quotesLatest.active_cryptocurrencies} />
    </div>
  );
}
