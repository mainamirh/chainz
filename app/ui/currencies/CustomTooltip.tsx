import { TooltipProps } from "recharts";

import { Award, CandlestickChart, CircleDollarSign } from "lucide-react";

import {
  compactNumber,
  regularDateFormat,
  fullClockFormat,
} from "@/app/lib/utils";

import type { HistoricalData } from "@/app/lib/apis/coinpaprika";

interface CustomProps extends TooltipProps<number, string> {
  accentColor: string;
}

const CustomTooltip: React.FC<CustomProps> = ({
  active,
  payload,
  accentColor,
}) => {
  if (active && payload && payload.length) {
    const { timestamp, price, volume_24h, market_cap } = payload[0]
      .payload as HistoricalData;

    return (
      <div className="flex w-[260px] flex-col gap-2 rounded-md border border-border bg-foreground/90 p-3 shadow-md">
        <div className="mb-2 flex justify-between font-medium">
          <div className="text-xs text-content">
            {regularDateFormat(timestamp)}
          </div>
          <div className="text-content/60">{fullClockFormat(timestamp)}</div>
        </div>
        <div className="flex items-center">
          {payload[0].value === price ? (
            <span className="flex items-center gap-1 text-xs font-medium text-content/60">
              <CircleDollarSign
                style={{ color: accentColor }}
                className="h-4 w-4"
              />
              Price:&nbsp;
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-content/60">
              <Award style={{ color: accentColor }} className="h-4 w-4" />
              Market Cap:&nbsp;
            </span>
          )}
          <span className="text-[13px] font-semibold">
            &#36;
            {payload[0].value === price
              ? new Intl.NumberFormat("en-US").format(price)
              : compactNumber(market_cap)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex items-center gap-1 text-xs font-medium text-content/60">
            <CandlestickChart className="h-4 w-4 text-sky-200" />
            Vol 24h:&nbsp;
          </span>
          <span className="text-[13px] font-semibold">
            &#36;{compactNumber(volume_24h)}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
