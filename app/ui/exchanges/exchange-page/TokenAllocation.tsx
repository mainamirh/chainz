"use client";

import AllocationPieChart from "./AllocationPieChart";

const TokenAllocation = ({ exchangeId }: { exchangeId: number }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-foreground p-5 text-[0.5rem] shadow-md md:text-[0.7rem]">
      <AllocationPieChart />
    </div>
  );
};

export default TokenAllocation;
