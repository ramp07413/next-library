
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function StarredAlertsPage() {
  const starredAlerts: any[] = [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Starred Alerts
        </h1>
        <p className="text-muted-foreground">
          View all the alerts you have marked as important.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Starred Alerts</CardTitle>
          <CardDescription>A list of all alerts that you have starred.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            <Star className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">No Starred Alerts</h3>
            <p>You have not starred any alerts yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
