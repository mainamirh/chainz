"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Chart from "./Chart";
import { LoaderCircle } from "lucide-react";
import useHistoricalTicks from "@/app/lib/hooks/useHistoricalTicks";

import {
  twelveHourFormat,
  dayMonthFormat,
  yearMonthFormat,
} from "@/app/lib/utils";

import type { Range } from "@/app/lib/apis/coinpaprika";

const categories = ["price", "market_cap"];
const ranges = ["1D", "7D", "1M", "1Y"];

type Query = "category" | "range";

const HistoricalChart = ({ coinId }: { coinId: string | undefined }) => {
  const searchParams = useSearchParams();
  const rangeParam = (searchParams.get("range") as Range) ?? "1D";
  const categoryParam = searchParams.get("category") ?? "Price";

  const { data: historicalTicks, isPlaceholderData } = useHistoricalTicks(
    coinId,
    rangeParam,
  );

  const pathname = usePathname();
  const router = useRouter();

  function handleSearchParams(query: Query, term: string) {
    const params = new URLSearchParams(searchParams);
    params.set(query, term);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col rounded-xl border border-border p-[3%]">
      <div className="mb-7 flex items-center justify-between gap-7 text-[0.7rem] font-medium md:text-xs">
        <div className="flex items-center gap-1 rounded-md border border-border bg-foreground p-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleSearchParams("category", category)}
              className={`${categoryParam === category && "bg-border"} rounded-md px-2 py-1 capitalize transition-colors hover:bg-border`}
            >
              <span>{category.replace("_", " ")}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-foreground p-1">
          {ranges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => handleSearchParams("range", range)}
              className={`${rangeParam === range && "bg-border"} rounded-md px-2 py-1 transition-colors hover:bg-border`}
            >
              <span>{range}</span>
            </button>
          ))}
        </div>
      </div>
      {historicalTicks ? (
        <Chart
          isPlaceholderData={isPlaceholderData}
          data={historicalTicks?.map((data) => ({
            ...data,
            timestamp: (() => {
              switch (rangeParam) {
                case "1D":
                  return twelveHourFormat(data.timestamp);
                case "7D":
                  return dayMonthFormat(data.timestamp);
                case "1M":
                  return dayMonthFormat(data.timestamp);
                case "1Y":
                  return yearMonthFormat(data.timestamp);
              }
            })(),
          }))}
        />
      ) : (
        <div className="relative aspect-video w-full text-xs md:text-sm">
          <div className="absolute -inset-[4px] flex items-center justify-center rounded-xl border border-border bg-foreground/50">
            <div className="flex flex-col items-center gap-1">
              <LoaderCircle className="h-5 w-5 animate-spin md:h-6 md:w-6" />
              <div>Loading Data</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalChart;
