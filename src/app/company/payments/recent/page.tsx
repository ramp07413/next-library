
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
import { MoreHorizontal, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <CheckCircle className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Recent Payments</h3>
                <p>There are no recently paid transactions to show.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
