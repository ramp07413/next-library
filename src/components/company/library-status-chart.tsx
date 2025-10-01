
"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface LibraryStatusChartProps {
    data: {
        name: string;
        value: number;
        fill: string;
    }[];
}

export function LibraryStatusChart({ data }: LibraryStatusChartProps) {
  const chartConfig = {
    active: {
      label: "Active",
      color: "hsl(var(--chart-2))",
    },
    inactive: {
      label: "Inactive",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-mt-2"
        />
      </PieChart>
    </ChartContainer>
  );
}
