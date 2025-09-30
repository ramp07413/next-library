"use client";

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  occupancyData,
  paymentCollectionData,
} from "@/app/library/data";

export function LibraryCharts() {
  const chartConfig = {
    occupied: { label: "Occupied", color: "hsl(var(--primary))" },
    collected: { label: "Collected", color: "hsl(var(--accent))" },
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Occupancy Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <AreaChart
              data={occupancyData}
              margin={{ left: -4, right: 4, top: 4, bottom: -4 }}
            >
              <defs>
                <linearGradient id="fillOccupied" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-occupied)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-occupied)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" hide />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="occupied"
                stroke="var(--color-occupied)"
                fill="url(#fillOccupied)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <BarChart
              data={paymentCollectionData}
              margin={{ left: -4, right: 4, top: 4, bottom: -4 }}
            >
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="collected" fill="var(--color-collected)" radius={2} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
