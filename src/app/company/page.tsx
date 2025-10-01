
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Users, DollarSign, Clock, ArrowUp, TrendingUp, AlertTriangle } from "lucide-react";
import { kpiData, topLibraries } from "./data";
import { Badge } from "@/components/ui/badge";
import { CompanyCharts } from "@/components/company/company-charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function CompanyDashboard() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Company Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome to the analytics hub for your entire network.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Libraries"
          value={kpiData.totalLibraries.toString()}
          icon={<Building className="h-4 w-4 text-muted-foreground" />}
          change="+2 this month"
          changeType="increase"
        />
        <KpiCard
          title="Active Students"
          value={kpiData.activeStudents.toLocaleString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+150 this month"
          changeType="increase"
        />
        <KpiCard
          title="Monthly Revenue"
          value={`$${kpiData.monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          change="+8.2% vs last month"
          changeType="increase"
        />
        <KpiCard
          title="Pending Payments"
          value={`$${kpiData.pendingPayments.toLocaleString()}`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          change="Action Required"
          changeType="warning"
        />
      </div>

      <CompanyCharts />

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Libraries</CardTitle>
          <CardDescription>
            Libraries with the highest revenue this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Library</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Students</TableHead>
                <TableHead className="text-right">Revenue Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLibraries.map((library) => (
                <TableRow key={library.id}>
                  <TableCell className="font-medium">{library.name}</TableCell>
                  <TableCell className="text-right">${library.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{library.students}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <span className="mr-2">{library.growth}%</span>
                      <Progress value={library.growth} className="w-24" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: "increase" | "decrease" | "warning";
}

function KpiCard({ title, value, icon, change, changeType }: KpiCardProps) {
  const getChangeIcon = () => {
    if (changeType === 'increase') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (changeType === 'warning') return <AlertTriangle className="w-4 h-4 text-destructive" />;
    return null;
  }
  
  const getChangeColor = () => {
    if (changeType === 'increase') return "text-green-600";
    if (changeType === 'warning') return "text-destructive";
    return "text-muted-foreground";
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs flex items-center gap-1", getChangeColor())}>
            {getChangeIcon()}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
