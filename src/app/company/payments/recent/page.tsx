
"use client";

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
import { Eye, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { payments } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";

export default function RecentPaymentsPage() {
  const [recentPayments] = useState(
    payments.filter((p) => p.status === "Paid")
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Recent Payments
        </h1>
        <p className="text-muted-foreground">
          View all recently completed transactions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>A list of all payments that have been successfully processed.</CardDescription>
        </CardHeader>
        <CardContent>
          {recentPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Library</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid On</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.libraryName}
                    </TableCell>
                    <TableCell>
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {payment.paidDate ? format(new Date(payment.paidDate), "PP") : "N/A"}
                    </TableCell>
                     <TableCell>
                       <Badge variant="outline">{payment.subscriptionPlan}</Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <div className="flex items-center justify-start gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download Receipt</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download Receipt</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Download className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Recent Payments</h3>
                <p>There are no recently paid transactions to show.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
