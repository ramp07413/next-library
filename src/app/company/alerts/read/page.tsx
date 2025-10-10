
"use client";

import { useEffect, useState } from "react";
import type { Alert } from "@/ai/flows/prioritize-alerts";
import { getPrioritizedAlerts } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCheck, FaBell } from 'react-icons/fa';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const SEVERITY_STYLES = {
  high: {
    bg: "bg-destructive/10",
    border: "border-destructive",
    icon: <FaBell className="h-5 w-5 text-destructive" />,
    badge: "destructive" as const,
  },
  medium: {
    bg: "bg-primary/10",
    border: "border-primary",
    icon: <FaBell className="h-5 w-5 text-primary" />,
    badge: "default" as const,
  },
  low: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    icon: <FaBell className="h-5 w-5 text-secondary-foreground" />,
    badge: "secondary" as const,
  },
};

export default function ReadAlertsPage() {
  const [readAlerts, setReadAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const allAlerts = await getPrioritizedAlerts("company");
      setReadAlerts(allAlerts.filter(a => a.status === 'read'));
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Read Alerts
        </h1>
        <p className="text-muted-foreground">
          A history of all the alerts you have already viewed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Read Alerts</CardTitle>
          <CardDescription>A list of all alerts that have been marked as read.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : readAlerts.length > 0 ? (
            <div className="space-y-4">
              {readAlerts.map((alert) => (
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
              <FaCheck className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">No Read Alerts</h3>
              <p>There are no read alerts to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
