"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { PieChart, Pie, ResponsiveContainer, Label, Tooltip } from "recharts";

import PieChartTooltip from "./PieChartTooltip";
import PieShape from "./PieShape";
import type { AggregatedAllocation } from "@/lib/types";

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

    if (params.get(query) === term) {
      params.delete(query);
    } else {
      params.set(query, term);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          className="scale-150"
          cx="32.5%"
          cy="32.5%"
          dataKey="percentage"
          data={data}
          innerRadius={40}
          outerRadius={80}
          paddingAngle={1}
          shape={(props) =>
            PieShape({ ...props, colors: COLORS, activeIndex, hoverIndex })
          }
          onMouseEnter={(_, index) => {
            setHoverIndex(index);
          }}
          onMouseLeave={() => {
            setHoverIndex(-1);
          }}
          onMouseDown={(item) => {
            handleSearchParams("allocation", item.payload.symbol.toLowerCase());
          }}
        >
          <Label
            value={data[hoverIndex]?.symbol ?? data[activeIndex]?.symbol ?? ""}
            position="center"
            fill="rgb(var(--content))"
          />
        </Pie>

        <Tooltip
          defaultIndex={activeIndex >= 0 ? activeIndex : undefined}
          content={(props) => <PieChartTooltip {...props} />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AllocationPieChart;
