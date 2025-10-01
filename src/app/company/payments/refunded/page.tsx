
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Undo2 } from "lucide-react";

export default function RefundedPaymentsPage() {
  // Currently, there is no data for refunded payments.
  // This page serves as a placeholder.
  const refundedPayments: any[] = [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Refunded Payments
        </h1>
        <p className="text-muted-foreground">
          View all refunded transactions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Refund History</CardTitle>
          <CardDescription>A list of all refunded payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            <Undo2 className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-semibold">No Refunded Transactions</h3>
            <p>There are no transactions that have been refunded.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
