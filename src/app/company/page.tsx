import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Users, DollarSign, Clock, ArrowUp } from "lucide-react";
import { kpiData } from "./data";
import { Badge } from "@/components/ui/badge";
import { CompanyCharts } from "@/components/company/company-charts";

export default function CompanyDashboard() {
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

      <CompanyCharts />
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
