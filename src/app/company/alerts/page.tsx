
// @/app/company/alerts/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { Alert } from "@/ai/flows/prioritize-alerts";
import { getPrioritizedAlerts } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellRing, Check, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const SEVERITY_STYLES = {
  high: {
    bg: "bg-destructive/10",
    border: "border-destructive",
    icon: <BellRing className="h-5 w-5 text-destructive" />,
    badge: "destructive" as const,
  },
  medium: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500",
    icon: <Bell className="h-5 w-5 text-yellow-500" />,
    badge: "default" as const,
  },
  low: {
    bg: "bg-blue-500/10",
    border: "border-blue-500",
    icon: <Bell className="h-5 w-5 text-blue-500" />,
    badge: "secondary" as const,
  },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const prioritizedAlerts = await getPrioritizedAlerts("company");
      setAlerts(prioritizedAlerts);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  const filteredAlerts = alerts.filter(
    (alert) => filter === "all" || alert.severity === filter
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            System Alerts
          </h1>
          <p className="text-muted-foreground">
            View and manage all system-wide notifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
          <CardDescription>
            {loading
              ? "Loading alerts..."
              : `Showing ${filteredAlerts.length} of ${alerts.length} alerts.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-4 rounded-lg border p-4",
                    SEVERITY_STYLES[alert.severity].bg,
                    SEVERITY_STYLES[alert.severity].border
                  )}
                >
                  <div className="flex-shrink-0">
                    {SEVERITY_STYLES[alert.severity].icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{alert.message}</p>
                      <Badge variant={SEVERITY_STYLES[alert.severity].badge} className="capitalize">
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleString()} -{" "}
                      <span className="capitalize">{alert.category}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
              <BellRing className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">No Alerts Found</h3>
              <p>There are no alerts matching the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
