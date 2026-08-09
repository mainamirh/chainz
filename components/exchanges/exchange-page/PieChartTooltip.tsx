import Image from "next/image";

import { compactNumber, roundDecimalsPlaces, coinLogo } from "@/lib/utils";

import type { AggregatedAllocation } from "./TokenAllocation";
import type { TooltipContentProps } from "recharts";

import { CircleDollarSign, CircleEllipsis } from "lucide-react";

const PieChartTooltip: React.FC<TooltipContentProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { percentage, symbol, totalValue, cryptoId } = payload[0]
      .payload as AggregatedAllocation;

    return (
      <div className="border-border bg-foreground/90 flex w-[150px] scale-125 flex-col gap-2 rounded-md border p-3 shadow-md">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            {cryptoId !== -1 ? (
              <Image
                src={coinLogo(cryptoId)}
                alt="crypto-logo"
                width={12}
                height={12}
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
          <div className="text-content/60 flex items-center gap-1 font-medium">
            <CircleDollarSign className="text-up h-3 w-3" />
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
