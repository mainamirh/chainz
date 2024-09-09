"use client";

import MarketTable from "./MarketTable";

const ExchangeMarket = ({
  exchangeName,
}: {
  exchangeName: string | undefined;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="exchange-markets" className="text-2xl font-semibold">
        Markets
      </label>
      <MarketTable exchangeName={exchangeName} />
    </div>
  );
};

export default ExchangeMarket;
