import Image from "next/image";

import { TooltipProps } from "recharts";

import { compactNumber, roundDecimalsPlaces, coinLogo } from "@/app/lib/utils";

import type { AggregatedAllocation } from "./TokenAllocation";

import { CircleDollarSign, CircleEllipsis } from "lucide-react";

interface CustomProps extends TooltipProps<number, string> {}

const PieChartTooltip: React.FC<CustomProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { percentage, symbol, totalValue, cryptoId } = payload[0]
      .payload as AggregatedAllocation;

    return (
      <div className="flex w-[150px] scale-125 flex-col gap-2 rounded-md border border-border bg-foreground/90 p-3 shadow-md">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            {cryptoId !== -1 ? (
              <Image
                src={coinLogo(cryptoId)}
                alt="crypto-logo"
                width={12}
                height={12}
                quality={100}
              />
            ) : (
              <CircleEllipsis className="h-3 w-3" />
            )}
            <span className="font-medium">{symbol}</span>
          </div>
          <span className="font-semibold">
            {roundDecimalsPlaces(percentage, 2)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 font-medium text-content/60">
            <CircleDollarSign className="h-3 w-3 text-up" />
            Value:
          </div>
          <span className="font-semibold">${compactNumber(totalValue)}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default PieChartTooltip;
