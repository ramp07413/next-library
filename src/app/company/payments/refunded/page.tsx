
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


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
              <TooltipProvider>
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
                          <div className="flex items-center justify-center gap-2">
                             <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">View Details</span>
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Refund Details</DialogTitle>
                                  <DialogDescription>Transaction ID: {payment.id}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-2">
                                  <p><strong>Library:</strong> {payment.libraryName}</p>
                                  <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
                                  <p><strong>Refunded On:</strong> {payment.refundedDate ? format(new Date(payment.refundedDate), "PPP") : 'N/A'}</p>
                                  <p><strong>Subscription:</strong> <Badge variant="outline">{payment.subscriptionPlan}</Badge></p>
                                  <p><strong>Status:</strong> <Badge variant="outline">{payment.status}</Badge></p>
                                </div>
                              </DialogContent>
                            </Dialog>
                             <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <Download className="h-4 w-4" />
                                      <span className="sr-only">Download Credit Note</span>
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download Credit Note</p>
                                </TooltipContent>
                              </Tooltip>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Credit Note</DialogTitle>
                                  <DialogDescription>Credit note for transaction {payment.id}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-2">
                                  <p><strong>Credit Note ID:</strong> CN-{payment.id}</p>
                                  <p><strong>Library:</strong> {payment.libraryName}</p>
                                  <p><strong>Amount Refunded:</strong> ${payment.amount.toFixed(2)}</p>
                                  <p><strong>Date:</strong> {payment.refundedDate ? format(new Date(payment.refundedDate), "PPP") : 'N/A'}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TooltipProvider>
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
