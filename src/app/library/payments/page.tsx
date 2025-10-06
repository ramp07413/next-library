'use client';

import { useState } from 'react';
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
import { Search, Eye, Mail, CheckCircle } from 'lucide-react';
import { payments, LibraryPayment } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function LibraryPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'secondary';
      case 'Pending':
        return 'default';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredPayments = payments
    .filter(
      (payment) => statusFilter === 'all' || payment.status === statusFilter
    )
    .filter((payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
          Student Payments
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Track and manage all student fee payments.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Payment History</CardTitle>
          <CardDescription className="text-sm">
            A list of all payments from students.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
            <div className="relative flex-1 sm:flex-initial sm:min-w-[200px] lg:min-w-[320px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by student..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0 w-full">
          <div className="w-full overflow-x-auto p-4 md:p-6 pt-0">
            <Table className="min-w-[600px] md:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Student</TableHead>
                  <TableHead className="min-w-[100px]">Amount</TableHead>
                  <TableHead className="min-w-[120px]">Due Date</TableHead>
                  <TableHead className="min-w-[120px]">Paid On</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TooltipProvider>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                            <AvatarImage
                              src={payment.studentAvatar}
                              alt={payment.studentName}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {payment.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">
                              {payment.studentName}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">
                              ID: {payment.studentId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm md:text-base font-medium">
                        ${payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-sm md:text-base">
                        {format(new Date(payment.dueDate), 'PP')}
                      </TableCell>
                      <TableCell className="text-sm md:text-base">
                        {payment.paidDate ? (
                          format(new Date(payment.paidDate), 'PP')
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(payment.status)}
                          className="text-xs md:text-sm"
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start gap-1">
                          <Dialog>
                            <Tooltip>
                              <DialogTrigger asChild>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 md:h-9 md:w-9"
                                  >
                                    <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                  </Button>
                                </TooltipTrigger>
                              </DialogTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                            <DialogContent className="max-w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                              <DialogHeader className="space-y-2">
                                <DialogTitle className="text-base md:text-lg">
                                  Payment Details
                                </DialogTitle>
                                <DialogDescription className="text-xs md:text-sm break-all">
                                  Transaction ID: {payment.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3 py-4 text-xs md:text-sm">
                                <p className="break-words">
                                  <span className="font-semibold">
                                    Student:
                                  </span>{' '}
                                  {payment.studentName}
                                </p>
                                <p>
                                  <span className="font-semibold">Amount:</span>{' '}
                                  ${payment.amount.toFixed(2)}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Due Date:
                                  </span>{' '}
                                  {format(new Date(payment.dueDate), 'PPP')}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Paid On:
                                  </span>{' '}
                                  {payment.paidDate
                                    ? format(new Date(payment.paidDate), 'PPP')
                                    : 'N/A'}
                                </p>
                                <p className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold">Status:</span>{' '}
                                  <Badge
                                    variant={getStatusBadgeVariant(
                                      payment.status
                                    )}
                                    className="text-xs"
                                  >
                                    {payment.status}
                                  </Badge>
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {payment.status !== 'Paid' && (
                            <>
                              <AlertDialog>
                                <Tooltip>
                                  <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 md:h-9 md:w-9"
                                      >
                                        <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                  </AlertDialogTrigger>
                                  <TooltipContent>Send Reminder</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                  <AlertDialogHeader className="space-y-2">
                                    <AlertDialogTitle className="text-base md:text-lg">
                                      Send Payment Reminder?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs md:text-sm">
                                      This will send an email reminder to{' '}
                                      {payment.studentName} for the payment of $
                                      {payment.amount.toFixed(2)}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                    <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="w-full sm:w-auto">
                                      Send Reminder
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <AlertDialog>
                                <Tooltip>
                                  <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-green-600 h-8 w-8 md:h-9 md:w-9"
                                      >
                                        <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                  </AlertDialogTrigger>
                                  <TooltipContent>Mark as Paid</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                  <AlertDialogHeader className="space-y-2">
                                    <AlertDialogTitle className="text-base md:text-lg">
                                      Mark as Paid?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs md:text-sm">
                                      Are you sure you want to mark this payment
                                      of ${payment.amount.toFixed(2)} from{' '}
                                      {payment.studentName} as paid?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                    <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="w-full sm:w-auto">
                                      Confirm
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TooltipProvider>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
