import Image from "next/image";

import { CoinsRanking } from "../lib/placeholder-data";

const Ranking = () => {
  return (
    <div className="mt-[150px] border shadow-md border-border p-5 rounded-xl bg-foreground/50 overflow-auto">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead>
          <tr className="[&>th]:py-3 [&>th]:text-start [&>th]:font-medium [&>th]:text-sm">
            <th className="pl-5 w-[50px]">#</th>
            <th className="w-[150px]">Name</th>
            <th className="w-[120px]">Best Buy Price</th>
            <th className="w-[120px]">From Exchange</th>
            <th className="w-[120px]">Best Sell Price</th>
            <th className="w-[120px]">From Exchange</th>
            <th className="w-[110px]">Market Cap</th>
            <th className="w-[60px]">1h %</th>
            <th className="w-[60px]">24h %</th>
            <th className="w-[60px]">7d %</th>
            <th className="w-[100px]">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {CoinsRanking.map((data, i) => (
            <tr
              className={`${
                i !== CoinsRanking.length - 1
                  ? "[&>td]:border-b-[1px] [&>td]:border-border"
                  : "border-none"
              } hover:bg-border/30 transition-colors cursor-pointer [&>td]:py-5`}
              key={data.Name + i}
            >
              <td className="pl-5">{i + 1}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Image
                    src={data.icon}
                    alt="coin-icon"
                    width={24}
                    height={24}
                    className="aspect-auto"
                  />

                  {data.Name}
                  <span className="text-sm font-semibold text-content/70">
                    {data.symbol}
                  </span>
                </div>
              </td>
              <td>${data.bestBuyPrice.toLocaleString()}</td>
              <td>
                <Image
                  src={data.buyExchange}
                  alt="buy-exchange"
                  width={1000}
                  height={1000}
                  className="aspect-auto w-[70px] dark:backdrop-invert"
                />
              </td>
              <td>${data.bestSellPrice.toLocaleString()}</td>
              <td>
                <Image
                  src={data.sellExchange}
                  alt="sell-exchange"
                  width={1000}
                  height={1000}
                  className="aspect-auto w-[70px] dark:backdrop-invert"
                />
              </td>
              <td>${data.marketCap.toLocaleString()} B</td>
              <td>{data.lastHour}</td>
              <td>{data.lastDay}</td>
              <td>{data.lastWeek}</td>
              <td>
                <Image
                  src={data.lastWeekChart}
                  alt="last-week-chart"
                  width={1000}
                  height={1000}
                  className="aspect-auto w-[100px] h-[40px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
