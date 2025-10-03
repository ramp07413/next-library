
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
import { Eye, Download, Undo2 } from "lucide-react";
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

export default function RefundedPaymentsPage() {
  const [refundedPayments] = useState(
    payments.filter((p) => p.status === "Refunded")
  );

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
          {refundedPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Library</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Date Refunded</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refundedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.libraryName}
                    </TableCell>
                    <TableCell>
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.subscriptionPlan}</Badge>
                    </TableCell>
                    <TableCell>
                      {payment.refundedDate ? format(new Date(payment.refundedDate), "PP") : "N/A"}
                    </TableCell>
                    <TableCell>
                       <TooltipProvider>
                        <div className="flex items-center justify-center gap-2">
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
                                <span className="sr-only">Download Credit Note</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Download Credit Note</TooltipContent>
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
              <Undo2 className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">No Refunded Transactions</h3>
              <p>There are no transactions that have been refunded.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
