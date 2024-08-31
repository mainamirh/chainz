"use client";

import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AllocationPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="aspect-square scale-125"
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          isAnimationActive={false}
          onMouseEnter={(_: any, index: number) => {
            setActiveIndex(index);
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              className="outline-none"
              fill={COLORS[index % COLORS.length]}
              strokeWidth={0}
            />
          ))}
          <Label value={data[activeIndex].name} position="center" fill="#333" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AllocationPieChart;
