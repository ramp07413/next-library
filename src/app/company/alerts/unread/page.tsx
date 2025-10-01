
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mailbox } from "lucide-react";

export default function UnreadAlertsPage() {
  const unreadAlerts: any[] = [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Unread Alerts
        </h1>
        <p className="text-muted-foreground">
          View all the alerts you haven't read yet.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unread Alerts</CardTitle>
          <CardDescription>A list of all alerts that are unread.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Mailbox className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Unread Alerts</h3>
                <p>You are all caught up!</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
