
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { upcomingDues } from "../data";
import { Calendar, DollarSign } from "lucide-react";

export default function MyDuesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          My Dues
        </h1>
        <p className="text-muted-foreground">
          View and pay your upcoming fees.
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Upcoming Due</CardTitle>
          <CardDescription>
            Your next payment is scheduled for{" "}
            {new Date(upcomingDues.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center gap-3 text-muted-foreground">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-medium">Amount</span>
              <span className="ml-auto font-bold text-foreground text-2xl">${upcomingDues.amount.toFixed(2)}</span>
            </div>
             <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">Due Date</span>
                <span className="ml-auto font-semibold text-foreground">{new Date(upcomingDues.date).toLocaleDateString()}</span>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
