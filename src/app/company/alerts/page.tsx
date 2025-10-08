// @/app/company/alerts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import type { Alert } from '@/ai/flows/prioritize-alerts';
import { getPrioritizedAlerts } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BellRing, Check, Bell, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SEVERITY_STYLES = {
  high: {
    bg: 'bg-destructive/10',
    border: 'border-destructive',
    icon: <BellRing className="h-5 w-5 text-destructive" />,
    badge: 'destructive' as const,
  },
  medium: {
    bg: 'bg-primary/10',
    border: 'border-primary',
    icon: <Bell className="h-5 w-5 text-primary" />,
    badge: 'default' as const,
  },
  low: {
    bg: 'bg-secondary/10',
    border: 'border-secondary',
    icon: <Bell className="h-5 w-5 text-secondary-foreground" />,
    badge: 'secondary' as const,
  },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const prioritizedAlerts = await getPrioritizedAlerts('company');
      setAlerts(prioritizedAlerts);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  const toggleStar = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, starred: !alert.starred } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(
    (alert) => filter === 'all' || alert.severity === filter
  );

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
            System Alerts
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View and manage all system-wide notifications.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">
            <Check className="mr-2 h-4 w-4" />{' '}
            <span className="hidden sm:inline">Mark all as read</span>
            <span className="sm:hidden">Mark all</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
          <CardDescription>
            {loading
              ? 'Loading alerts...'
              : `Showing ${filteredAlerts.length} of ${alerts.length} alerts.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
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
                      'flex flex-col sm:flex-row items-start gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4',
                      SEVERITY_STYLES[alert.severity].bg,
                      SEVERITY_STYLES[alert.severity].border
                    )}
                  >
                    <div className="flex-shrink-0">
                      {SEVERITY_STYLES[alert.severity].icon}
                    </div>
                    <div className="flex-grow w-full min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="font-semibold text-sm sm:text-base break-words">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge
                            variant={SEVERITY_STYLES[alert.severity].badge}
                            className="capitalize"
                          >
                            {alert.severity}
                          </Badge>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleStar(alert.id)}
                              >
                                <Star
                                  className={cn(
                                    'h-4 w-4',
                                    alert.starred
                                      ? 'fill-primary text-primary'
                                      : 'text-muted-foreground'
                                  )}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{alert.starred ? 'Unstar' : 'Star'} alert</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {new Date(alert.timestamp).toLocaleString()} -{' '}
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
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
