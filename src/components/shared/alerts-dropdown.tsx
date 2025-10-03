
"use client";

import { Bell, BellRing } from "lucide-react";
import { useEffect, useState } from "react";

import type { Alert } from "@/ai/flows/prioritize-alerts";
import { getPrioritizedAlerts } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AlertsDropdownProps {
  role: "company" | "library" | "student";
}

export function AlertsDropdown({ role }: AlertsDropdownProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const prioritizedAlerts = await getPrioritizedAlerts(role);
      setAlerts(prioritizedAlerts);
      setLoading(false);
    }
    fetchAlerts();
  }, [role]);

  const hasUnread = alerts.some((alert) => alert.status === "unread");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {hasUnread && !loading && (
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
          )}
          <span className="sr-only">Toggle alerts</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96">
        <DropdownMenuLabel>Prioritized Alerts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-2">
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))
          ) : alerts.length > 0 ? (
            alerts.map((alert) => (
              <DropdownMenuItem
                key={alert.id}
                className={cn(
                  "p-2 focus:bg-[hsl(var(--chart-2))] focus:text-accent-foreground",
                  alert.status === "unread" && "font-semibold"
                )}
              >
                <div className="flex items-center justify-between w-full gap-4">
                  <p className="text-sm truncate flex-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
              <BellRing className="h-8 w-8 mb-2" />
              <p>No new alerts</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
