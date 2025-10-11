
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaDollar, FaArrowLeft, FaChair, FaHashtag, FaDownload } from 'react-icons/fa';
import { students } from '../data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  studentSeatDetails,
  studentSeatHistory,
  studentDues,
  studentPaymentHistory,
} from './data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Receipt, CalendarIcon, RefreshCw } from 'lucide-react';

export default function StudentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    notFound();
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'secondary';
      case 'inactive':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'secondary';
      case 'Due':
        return 'default';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start md:items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/library/students">
            <FaArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {student.name}
          </h1>
          <p className="text-muted-foreground w-52 md:w-auto">
            Detailed information for student ID: {student.id}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Student Dues */}
          <div className="grid gap-4 lg:grid-cols-7 md:block">
            <Card className="lg:col-span-4 overflow-hidden">
              <CardHeader>
                <CardTitle>Student Dues</CardTitle>
                <CardDescription>
                  Upcoming and outstanding payments.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6 md:pt-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[500px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {format(new Date(studentDues.dueDate), 'PP')}
                        </TableCell>
                        <TableCell>${studentDues.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getPaymentStatusBadgeVariant(
                              studentDues.status
                            )}
                          >
                            {studentDues.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button>
                                <Receipt className="mr-2 h-4 w-4" />
                                Pay Now
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Payment
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to process a payment of
                                  ${studentDues.amount.toFixed(2)} for{' '}
                                  {student.name}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>
                                  Confirm Payment
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <div className="grid gap-4 lg:grid-cols-7 md:block">
            <Card className="lg:col-span-4 overflow-hidden">
              <CardHeader>
                <CardTitle>Student Payment History</CardTitle>
                <CardDescription>
                  A record of all past transactions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6 md:pt-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[500px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentPaymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            {format(new Date(payment.date), 'PP')}
                          </TableCell>
                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getPaymentStatusBadgeVariant(
                                payment.status
                              )}
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FaDownload className="h-4 w-4" />
                                  <span className="sr-only">FaDownload receipt for {payment.receipt}
                                  </span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Receipt Details</DialogTitle>
                                  <DialogDescription>
                                    Receipt ID: {payment.receipt}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    <strong>Student:</strong> {student.name}
                                  </p>
                                  <p>
                                    <strong>Date:</strong>{' '}
                                    {format(new Date(payment.date), 'PPP')}
                                  </p>
                                  <p>
                                    <strong>Amount:</strong> $
                                    {payment.amount.toFixed(2)}
                                  </p>
                                  <p>
                                    <strong>Status:</strong> {payment.status}
                                  </p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Seat History */}

          <div className="grid gap-4 lg:grid-cols-7 md:block">
            <Card className="lg:col-span-4 overflow-hidden">
              <CardHeader>
                <CardTitle>Student Seat History</CardTitle>
                <CardDescription>
                  History of seats assigned to the student.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6 md:pt-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[500px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Seat Number</TableHead>
                        <TableHead>Assigned On</TableHead>
                        <TableHead>Vacated On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentSeatHistory.map((seat) => (
                        <TableRow key={seat.id}>
                          <TableCell className="font-medium">
                            {seat.seatNumber}
                          </TableCell>
                          <TableCell>
                            {format(new Date(seat.assignedDate), 'PP')}
                          </TableCell>
                          <TableCell>
                            {format(new Date(seat.vacatedDate), 'PP')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-1">
          {/* Student Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={student.avatar}
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-3xl">{student.name}</CardTitle>
                  <CardDescription>
                    Joined on {format(new Date(student.joinDate), 'PPP')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <InfoItem icon={<FaEnvelope />} label="Email" value={student.email} />
              <Separator />
              <InfoItem icon={<FaPhone />} label="Phone" value={student.phone} />
              <Separator />
              <InfoItem
                icon={<FaClock />}
                label="Shift"
                value={student.shift}
                className="capitalize"
              />
              <Separator />
              <InfoItem
                icon={<FaDollar />}
                label="Fee"
                value={`$${student.fee.toFixed(2)}`}
              />
              <Separator />
              <InfoItem icon={<FaUser />} label="Status">
                <Badge
                  variant={getStatusBadgeVariant(student.status)}
                  className="capitalize"
                >
                  {student.status}
                </Badge>
              </InfoItem>
            </CardContent>
            <CardFooter className="gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update student information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={student.name}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        defaultValue={student.email}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">Phone
                      </Label>
                      <Input
                        id="phone"
                        defaultValue={student.phone}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Save Changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Current Seat Details */}
          <Card>
            <CardHeader>
              <CardTitle>Current Seat Details</CardTitle>
              <CardDescription>
                Information about the student's assigned seat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem
                icon={<FaHashtag />}
                label="Seat Number"
                value={studentSeatDetails.seatNumber}
              />
              <Separator />
              <InfoItem
                icon={<FaChair />}
                label="Seat Type"
                value={studentSeatDetails.seatType}
              />
              <Separator />
              <InfoItem
                icon={<FaClock />}
                label="Library Timing"
                value={studentSeatDetails.libraryTiming}
              />
              <Separator />
              <InfoItem
                icon={<CalendarIcon />}
                label="Assigned On"
                value={format(new Date(studentSeatDetails.assignedDate), 'PP')}
              />
              <Separator />
              <InfoItem icon={<RefreshCw />} label="Status">
                <Badge
                  variant={
                    studentSeatDetails.status === 'Active'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {studentSeatDetails.status}
                </Badge>
              </InfoItem>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Change Seat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Seat</DialogTitle>
                    <DialogDescription>
                      Assign a new seat for {student.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col sm:items-center gap-4">
                      <Label htmlFor="new-seat" className="text-left w-full">
                        New Seat #
                      </Label>
                      <Input
                        id="new-seat"
                        placeholder="e.g., 205"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Assign New Seat</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {value && (
        <span className={`font-semibold text-sm ${className}`}>{value}</span>
      )}
      {children}
    </div>
  );
}
