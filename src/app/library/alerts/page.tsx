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
import { BellRing, Check, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SEVERITY_STYLES = {
  high: {
    bg: 'bg-destructive/10',
    border: 'border-destructive',
    icon: <BellRing className="h-4 w-4 md:h-5 md:w-5 text-destructive" />,
    badge: 'destructive' as const,
  },
  medium: {
    bg: 'bg-primary/10',
    border: 'border-primary',
    icon: <Bell className="h-4 w-4 md:h-5 md:w-5 text-primary" />,
    badge: 'default' as const,
  },
  low: {
    bg: 'bg-secondary/10',
    border: 'border-secondary',
    icon: <Bell className="h-4 w-4 md:h-5 md:w-5 text-secondary-foreground" />,
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
      const prioritizedAlerts = await getPrioritizedAlerts('library');
      setAlerts(prioritizedAlerts);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  const filteredAlerts = alerts.filter(
    (alert) => filter === 'all' || alert.severity === filter
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Library Alerts
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            View and manage all notifications for your library.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
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
            <span className="sm:hidden">Mark read</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">
            Prioritized Alerts
          </CardTitle>
          <CardDescription className="text-sm">
            {loading
              ? 'Loading alerts...'
              : `Showing ${filteredAlerts.length} of ${alerts.length} alerts.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {loading ? (
            <div className="space-y-3 md:space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 md:space-x-4"
                >
                  <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-lg flex-shrink-0" />
                  <div className="space-y-2 flex-1 min-w-0">
                    <Skeleton className="h-3 md:h-4 w-full max-w-[250px]" />
                    <Skeleton className="h-3 md:h-4 w-full max-w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'flex items-start gap-3 md:gap-4 rounded-lg border p-3 md:p-4 transition-all duration-200 hover:shadow-sm',
                    SEVERITY_STYLES[alert.severity].bg,
                    SEVERITY_STYLES[alert.severity].border
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5 md:mt-1">
                    {SEVERITY_STYLES[alert.severity].icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-2 md:gap-3">
                      <p className="font-semibold text-sm md:text-base leading-tight break-words pr-2">
                        {alert.message}
                      </p>
                      <Badge
                        variant={SEVERITY_STYLES[alert.severity].badge}
                        className="capitalize text-xs md:text-sm w-fit flex-shrink-0"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1.5 md:mt-2 break-words leading-relaxed">
                      {new Date(alert.timestamp).toLocaleString()} -{' '}
                      <span className="capitalize">{alert.category}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 md:p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
              <BellRing className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4" />
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                No Alerts Found
              </h3>
              <p className="text-sm md:text-base">
                There are no alerts matching the selected filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
