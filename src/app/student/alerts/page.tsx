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

export default function StudentAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const prioritizedAlerts = await getPrioritizedAlerts('student');
      setAlerts(prioritizedAlerts);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Alerts
          </h1>
          <p className="text-muted-foreground">
            Important notifications and updates from the library.
          </p>
        </div>
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prioritized Alerts</CardTitle>
          <CardDescription>
            {loading ? 'Loading alerts...' : `Showing ${alerts.length} alerts.`}
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
          ) : alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'flex items-start gap-4 rounded-lg border p-4',
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
                      <Badge
                        variant={SEVERITY_STYLES[alert.severity].badge}
                        className="capitalize"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
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
              <p>You have no new alerts.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
