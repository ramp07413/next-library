'use client';

import { notFound } from 'next/navigation';
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
import { ArrowLeft } from 'lucide-react';
import { payments, type Payment } from '../data';
import { libraries, type Library } from '@/app/company/libraries/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import Link from 'next/link';

interface LibraryPaymentsClientPageProps {
  library: Library;
  libraryPayments: Payment[];
}

function LibraryPaymentsClientPage({
  library,
  libraryPayments,
}: LibraryPaymentsClientPageProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'secondary';
      case 'Pending':
        return 'default';
      case 'Overdue':
        return 'destructive';
      case 'Refunded':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start lg:items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/company/payments">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {library.libraryName} Payments
          </h1>
          <p className="text-muted-foreground">
            A complete payment history for this library.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              {libraryPayments.length > 0
                ? `Showing all ${libraryPayments.length} transactions for ${library.libraryName}.`
                : `No payment history found for ${library.libraryName}.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              {libraryPayments.length > 0 ? (
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid/Refunded Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {libraryPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono">
                          {payment.id}
                        </TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {format(new Date(payment.dueDate), 'PP')}
                        </TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? format(new Date(payment.paidDate), 'PP')
                            : payment.refundedDate
                            ? format(new Date(payment.refundedDate), 'PP')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(payment.status)}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <h3 className="text-lg font-semibold">No Payments Found</h3>
                  <p>There is no payment history for this library.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LibraryPaymentsPage({
  params,
}: {
  params: { libraryId: string };
}) {
  const library = libraries.find((lib) => lib.id === params.libraryId);
  const libraryPayments = payments.filter(
    (p) => p.libraryId === params.libraryId
  );

  if (!library) {
    notFound();
  }

  return (
    <LibraryPaymentsClientPage
      library={library}
      libraryPayments={libraryPayments}
    />
  );
}
