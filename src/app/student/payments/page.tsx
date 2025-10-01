
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { paymentHistory } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          My Payments
        </h1>
        <p className="text-muted-foreground">
          A history of all your past transactions.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
            Review your past transactions and download receipts.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                    <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                    <Badge variant="secondary">{payment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download receipt</span>
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  );
}
