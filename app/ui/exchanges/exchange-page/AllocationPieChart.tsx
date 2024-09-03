"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";
import PieChartTooltip from "./PieChartTooltip";

import type { AggregatedAllocation } from "./TokenAllocation";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AllocationPieChart = ({ data }: { data: AggregatedAllocation[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeIndex = data.findIndex(
    (item) => item.symbol.toLowerCase() === searchParams.get("allocation"),
  );
  const [hoverIndex, setHoverIndex] = useState(-1);

  function handleSearchParams(query: "allocation", term: string) {
    const params = new URLSearchParams(searchParams);
    // If the term is the same as the current value, delete the param
    params.get(query) === term ? params.delete(query) : params.set(query, term);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          className="scale-150"
          cx="32.5%"
          cy="32.5%"
          activeIndex={activeIndex}
          dataKey="percentage"
          data={data}
          innerRadius={40}
          outerRadius={80}
          paddingAngle={1}
          onMouseEnter={(_, index) => {
            setHoverIndex(index);
          }}
          onMouseLeave={() => {
            setHoverIndex(-1);
          }}
          onMouseDown={(data) => {
            handleSearchParams(
              "allocation",
              data.payload.symbol.toLocaleLowerCase(),
            );
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              className="cursor-pointer outline-none hover:brightness-110"
              fill={COLORS[index % COLORS.length]}
              strokeWidth={
                activeIndex === index ? 4 : 0 || hoverIndex === index ? 2 : 0
              }
              stroke={
                activeIndex === index
                  ? COLORS[index % COLORS.length]
                  : "rgb(var(--color-content))"
              }
            />
          ))}
          <Label
            value={data[hoverIndex]?.symbol ?? data[activeIndex]?.symbol ?? ""}
            position="center"
            fill="rgb(var(--color-content))"
          />
        </Pie>
        <Tooltip content={<PieChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AllocationPieChart;
