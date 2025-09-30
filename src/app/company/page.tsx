import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Building, Users, DollarSign, Clock, ArrowUp } from "lucide-react";
import { kpiData, revenueData, usersPerLibraryData } from "./data";
import { Badge } from "@/components/ui/badge";

export default function CompanyDashboard() {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    users: {
      label: "Users",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Company Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Libraries"
          value={kpiData.totalLibraries.toString()}
          icon={<Building className="h-4 w-4 text-muted-foreground" />}
          change="+2 since last month"
        />
        <KpiCard
          title="Active Students"
          value={kpiData.activeStudents.toLocaleString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+150 since last month"
        />
        <KpiCard
          title="Monthly Revenue"
          value={`$${kpiData.monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          change="+8.2% vs last month"
        />
        <KpiCard
          title="Pending Payments"
          value={`$${kpiData.pendingPayments.toLocaleString()}`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          isWarning={true}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={revenueData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Active Users per Library</CardTitle>
            <CardDescription>Distribution of active users across top libraries.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={usersPerLibraryData} layout="vertical" margin={{ left: 12 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={80}
                />
                <XAxis type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  isWarning?: boolean;
}

function KpiCard({ title, value, icon, change, isWarning }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center">
            <ArrowUp className="w-3 h-3 mr-1 text-green-500"/>
            {change}
          </p>
        )}
        {isWarning && (
          <Badge variant="destructive" className="mt-2">Action Required</Badge>
        )}
      </CardContent>
    </Card>
  );
}
