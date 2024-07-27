import Image from "next/image";
import type { ListingLatest } from "../lib/apis/coinmarketcap";
import { coinLogo, coinLastWeekChart } from "../lib/definitions";
import { roundDecimalsPlaces } from "../lib/utils";
import PercentChange from "./PercentChange";

const Ranking = ({ CoinsRanking }: { CoinsRanking: ListingLatest[] }) => {
  return (
    <div className="mt-[150px] border shadow-md border-border p-5 rounded-xl bg-foreground/50 overflow-auto">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead>
          <tr className="[&>th]:py-3 [&>th]:text-end [&>th]:font-semibold [&>th]:text-xs [&>th]:border-b-[1px] [&>th]:border-border">
            <th className="pl-5 w-[50px] !text-start">#</th>
            <th className="w-[130px] !text-start">Name</th>
            <th className="w-[120px]">Price</th>
            <th className="w-[60px]">1h %</th>
            <th className="w-[60px]">24h %</th>
            <th className="w-[60px]">7d %</th>
            <th className="w-[140px]">Market Cap</th>
            <th className="w-[130px]">Volume(24h)</th>
            <th className="w-[130px]">Circulating Supply</th>
            <th className="w-[160px]">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {CoinsRanking.map((data, i) => (
            <tr
              className={`${
                i !== CoinsRanking.length - 1
                  ? "[&>td]:border-b-[1px] [&>td]:border-border"
                  : "border-none"
              } hover:bg-border/30 transition-colors cursor-pointer [&>td]:text-end [&>td]:py-5 [&>td]:font-medium [&>td]:text-sm`}
              key={data.id}
            >
              <td className="pl-5 !text-start">{data.cmc_rank}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Image
                    src={coinLogo(data.id)}
                    alt="coin-icon"
                    width={24}
                    height={24}
                    className="aspect-auto"
                  />

                  {data.name}
                  <span className="text-sm font-semibold text-content/70">
                    {data.symbol}
                  </span>
                </div>
              </td>
              <td>
                ${roundDecimalsPlaces(data.quote.USD.price, 2).toLocaleString()}
              </td>
              <td>
                <PercentChange
                  price={data.quote.USD.percent_change_1h}
                  decimalPlaces={2}
                />
              </td>
              <td>
                <PercentChange
                  price={data.quote.USD.percent_change_24h}
                  decimalPlaces={2}
                />
              </td>
              <td>
                <PercentChange
                  price={data.quote.USD.percent_change_7d}
                  decimalPlaces={2}
                />
              </td>
              <td>
                $
                {roundDecimalsPlaces(
                  data.quote.USD.market_cap,
                  0
                ).toLocaleString()}
              </td>
              <td>
                {roundDecimalsPlaces(
                  data.quote.USD.volume_24h,
                  0
                ).toLocaleString()}
              </td>
              <td>
                {roundDecimalsPlaces(
                  data.circulating_supply,
                  0
                ).toLocaleString()}
              </td>
              <td>
                <Image
                  src={coinLastWeekChart(data.id)}
                  alt="last-week-chart"
                  width={1000}
                  height={1000}
                  className={`${
                    roundDecimalsPlaces(data.quote.USD.percent_change_7d, 2) >=
                    0
                      ? "week-chart-isUp"
                      : "week-chart-isDown"
                  } aspect-auto h-[50px]`}
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
