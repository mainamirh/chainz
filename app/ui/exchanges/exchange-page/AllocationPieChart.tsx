"use client";

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
  const [activeIndex, setActiveIndex] = useState(0);

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
            setActiveIndex(index);
          }}
          onMouseDown={(_, index) => {
            console.log(index);
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              className="cursor-pointer outline-none hover:brightness-110"
              fill={COLORS[index % COLORS.length]}
              strokeWidth={activeIndex === index ? 2 : 0}
            />
          ))}
          <Label
            value={data[activeIndex].symbol}
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
