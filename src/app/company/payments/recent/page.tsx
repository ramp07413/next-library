
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { payments } from '../data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';

export default function RecentPaymentsPage() {
  const [recentPayments] = useState(
    payments.filter((p) => p.status === 'Paid')
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

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>
              A list of all payments that have been successfully processed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentPayments.length > 0 ? (
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Library</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid On</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TooltipProvider>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.libraryName}
                        </TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? format(new Date(payment.paidDate), 'PP')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {payment.subscriptionPlan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">
                                        View Details
                                      </span>
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                <DialogHeader>
                                  <DialogTitle>Payment Details</DialogTitle>
                                  <DialogDescription>
                                    Transaction ID: {payment.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-2">
                                  <div>
                                    <strong>Library:</strong>{' '}
                                    {payment.libraryName}
                                  </div>
                                  <div>
                                    <strong>Amount:</strong> $
                                    {payment.amount.toFixed(2)}
                                  </div>
                                  <div>
                                    <strong>Paid On:</strong>{' '}
                                    {payment.paidDate
                                      ? format(
                                          new Date(payment.paidDate),
                                          'PPP'
                                        )
                                      : 'N/A'}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <strong>Subscription:</strong>{' '}
                                    <Badge variant="outline">
                                      {payment.subscriptionPlan}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <strong>Status:</strong>{' '}
                                    <Badge variant="secondary">
                                      {payment.status}
                                    </Badge>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <FaDownload className="h-4 w-4" />
                                      <span className="sr-only">FaDownload Receipt
                                      </span>
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>FaDownload Receipt</p>
                                </TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                <DialogHeader>
                                  <DialogTitle>Receipt</DialogTitle>
                                  <DialogDescription>
                                    Receipt for transaction {payment.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-2">
                                  <div>
                                    <strong>Receipt ID:</strong> REC-
                                    {payment.id}
                                  </div>
                                  <div>
                                    <strong>Library:</strong>{' '}
                                    {payment.libraryName}
                                  </div>
                                  <div>
                                    <strong>Amount Paid:</strong> $
                                    {payment.amount.toFixed(2)}
                                  </div>
                                  <div>
                                    <strong>Date:</strong>{' '}
                                    {payment.paidDate
                                      ? format(
                                          new Date(payment.paidDate),
                                          'PPP'
                                        )
                                      : 'N/A'}
                                  </div>
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
                <FaDownload className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Recent Payments</h3>
                <p>There are no recently paid transactions to show.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
