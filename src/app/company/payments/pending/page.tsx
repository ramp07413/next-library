
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
import { MoreHorizontal, Hourglass } from "lucide-react";
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

export default function PendingPaymentsPage() {
  const [pendingPayments] = useState(
    payments.filter((p) => p.status === "Pending" || p.status === "Overdue")
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'default';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Pending & Overdue Payments
        </h1>
        <p className="text-muted-foreground">
          Track and manage all outstanding payments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
          <CardDescription>A list of all payments that are not yet paid.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Library</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.libraryName}
                    </TableCell>
                    <TableCell>
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.dueDate), "PP")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(payment.status)}>
                        {payment.status}
                      </Badge>
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
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                           <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Hourglass className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Pending Payments</h3>
                <p>All payments are up to date.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
