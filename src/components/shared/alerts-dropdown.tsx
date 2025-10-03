
"use client";

import { Bell, BellRing, Check, Star } from "lucide-react";
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
import { formatDistanceToNow } from "date-fns";

interface AlertsDropdownProps {
  role: "company" | "library" | "student";
}

const SEVERITY_ICONS = {
  high: <BellRing className="h-4 w-4 text-destructive" />,
  medium: <Bell className="h-4 w-4 text-yellow-500" />,
  low: <Bell className="h-4 w-4 text-blue-500" />,
};

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
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : alerts.length > 0 ? (
            alerts.map((alert) => (
              <DropdownMenuItem
                key={alert.id}
                className={cn(
                  "p-2 focus:bg-accent focus:text-accent-foreground",
                  alert.status === "unread" && "font-semibold"
                )}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-1">{SEVERITY_ICONS[alert.severity]}</div>
                  <div className="flex-1">
                    <p className="text-sm leading-snug">{alert.message}</p>
                    <p className={cn("text-xs mt-1", alert.status === 'unread' ? 'text-muted-foreground' : 'text-muted-foreground/70')}>
                       {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                   {alert.starred && <Star className="h-4 w-4 text-primary fill-primary" />}
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
