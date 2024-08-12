"use client";

import { useSearchParams } from "next/navigation";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import CustomTooltip from "./CustomTooltip";

import { LoaderCircle } from "lucide-react";

import type { AxisDomain } from "recharts/types/util/types";
import type { HistoricalData, Range } from "@/app/lib/apis/coinpaprika";
import { compactNumber, formatByRange } from "@/app/lib/utils";

const Chart = ({
  data,
  isPlaceholderData,
}: {
  data: HistoricalData[];
  isPlaceholderData: boolean;
}) => {
  const searchParams = useSearchParams();
  const rangeParam = (searchParams.get("range") as Range) ?? "1D";
  const key = searchParams.get("category") ?? "price";

  const accentColor =
    key === "price" ? "rgb(var(--color-up))" : "rgb(var(--color-iris-darker))";

  function calculateDomain(): AxisDomain | undefined {
    if (key === "price") {
      const minPrice = Math.min(...data.map((d) => d.price)) * 0.95;
      const maxPrice = Math.max(...data.map((d) => d.price)) * 1.05;

      return [minPrice, maxPrice];
    } else if (key === "market_cap") {
      const minMarketCap = Math.min(...data.map((d) => d.market_cap)) * 0.95;
      const maxMarketCap = Math.max(...data.map((d) => d.market_cap)) * 1.05;

      return [minMarketCap, maxMarketCap];
    }
  }

  return (
    <div className="relative aspect-video w-full text-[0.5rem] md:text-[0.7rem]">
      {isPlaceholderData && (
        <div className="absolute -inset-[4px] z-10 flex items-center justify-center rounded-xl bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1">
            <LoaderCircle className="h-5 w-5 animate-spin md:h-6 md:w-6" />
            <div className="text-xs md:text-sm">Loading Data</div>
          </div>
        </div>
      )}

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="accentColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accentColor} stopOpacity={0.7} />
              <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            tick={{ fill: "rgb(var(--color-content))" }}
            stroke="rgb(var(--color-border))"
            tickMargin={10}
            minTickGap={40}
            interval={"equidistantPreserveStart"}
            tickFormatter={(value, index) =>
              formatByRange(value, index, rangeParam)
            }
          />
          <YAxis
            tickLine={false}
            tick={{ fill: "rgb(var(--color-content))" }}
            stroke="rgb(var(--color-border))"
            tickMargin={10}
            domain={calculateDomain()}
            tickCount={7}
            tickFormatter={compactNumber}
          />
          <CartesianGrid stroke="rgb(var(--color-border))" vertical={false} />
          <Tooltip content={<CustomTooltip accentColor={accentColor} />} />
          <Area
            type="monotone"
            dataKey={key}
            stroke={accentColor}
            fillOpacity={1}
            fill="url(#accentColor)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
