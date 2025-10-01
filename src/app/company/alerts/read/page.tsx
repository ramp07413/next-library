
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function ReadAlertsPage() {
  const readAlerts: any[] = [];

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
           <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Check className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Read Alerts</h3>
                <p>There are no read alerts to display.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
