"use client";

import PercentChange from "./common/PercentChange";
import { compactNumber } from "@/lib/utils";
import type { QuotesLatest } from "@/lib/types";

const AggregatedStats = ({
  aggregatedStats,
}: {
  aggregatedStats: QuotesLatest;
}) => {
  return (
    <div className="no-scrollbar text-content/80 shadow-border flex items-center gap-5 overflow-x-auto px-[14px] py-2 text-[11px] font-medium shadow-[inset_25px_0px_25px_-25px,inset_-25px_0px_25px_-25px] md:shadow-none [&>div]:shrink-0">
      <div className="flex items-center gap-1">
        Cryptos:
        <span className="text-iris-lighter brightness-150">
          {aggregatedStats.active_cryptocurrencies}
        </span>
      </div>
      <div className="flex items-center gap-1">
        Exchanges:
        <span className="text-iris-lighter brightness-150">
          {aggregatedStats.active_exchanges}
        </span>
      </div>

      <div className="flex items-center gap-1">
        Market Cap:
        <span className="text-iris-lighter brightness-150">
          ${compactNumber(aggregatedStats.quote.USD.total_market_cap)}
        </span>
        <PercentChange
          price={
            aggregatedStats.quote.USD
              .total_market_cap_yesterday_percentage_change
          }
          decimalPlaces={2}
        />
      </div>

      <div className="flex items-center gap-1">
        24h Vol:
        <span className="text-iris-lighter brightness-150">
          ${compactNumber(aggregatedStats.quote.USD.total_volume_24h)}
        </span>
        <PercentChange
          price={
            aggregatedStats.quote.USD
              .total_volume_24h_yesterday_percentage_change
          }
          decimalPlaces={2}
        />
      </div>

      <div className="flex items-center gap-1">
        Dominance:
        <span className="text-iris-lighter brightness-150">
          BTC: {compactNumber(aggregatedStats.btc_dominance)}%
        </span>
        <span className="text-iris-lighter brightness-150">
          ETH: {compactNumber(aggregatedStats.eth_dominance)}%
        </span>
      </div>
    </div>
  );
};

export default AggregatedStats;
