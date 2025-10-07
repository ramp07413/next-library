
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  ArrowLeft,
  Armchair,
  Hash,
  RefreshCw,
  Download,
  Receipt
} from "lucide-react";
import { students } from "../data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { studentSeatDetails, studentSeatHistory, studentDues, studentPaymentHistory } from './data';


export default function StudentDetailsPage({ params }: { params: { id: string } }) {
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
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/library/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
                {student.name}
            </h1>
            <p className="text-muted-foreground">
                Detailed information for student ID: {student.id}
            </p>
        </div>
      </div>

    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
          {/* Student Dues */}
          <Card>
            <CardHeader>
              <CardTitle>Student Dues</CardTitle>
              <CardDescription>Upcoming and outstanding payments.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                 <div className="text-4xl font-bold text-destructive">
                    ${studentDues.amount.toFixed(2)}
                </div>
                 <div className="flex-1">
                    <p className="font-semibold text-destructive">{studentDues.status}</p>
                    <p className="text-sm text-muted-foreground">Due on {format(new Date(studentDues.dueDate), "PPP")}</p>
                </div>
                <Button>
                    <Receipt className="mr-2 h-4 w-4" />
                    Pay Now
                </Button>
            </CardContent>
          </Card>

        {/* Payment History */}
        <Card>
            <CardHeader>
              <CardTitle>Student Payment History</CardTitle>
              <CardDescription>A record of all past transactions.</CardDescription>
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
                  {studentPaymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{format(new Date(payment.date), "PP")}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getPaymentStatusBadgeVariant(payment.status)}>{payment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download receipt for {payment.receipt}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>


        {/* Seat History */}
        <Card>
            <CardHeader>
              <CardTitle>Student Seat History</CardTitle>
              <CardDescription>History of seats assigned to the student.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
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
                      <TableCell className="font-medium">{seat.seatNumber}</TableCell>
                      <TableCell>{format(new Date(seat.assignedDate), "PP")}</TableCell>
                      <TableCell>{format(new Date(seat.vacatedDate), "PP")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
      </div>

      <div className="space-y-8 lg:col-span-1">
        {/* Student Details */}
        <Card>
            <CardHeader>
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar} data-ai-hint="person portrait" />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                <CardTitle className="text-3xl">{student.name}</CardTitle>
                <CardDescription>
                    Joined on {format(new Date(student.joinDate), "PPP")}
                </CardDescription>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <InfoItem icon={<Mail />} label="Email" value={student.email} />
                <Separator />
                <InfoItem icon={<Phone />} label="Phone" value={student.phone} />
                <Separator />
                <InfoItem icon={<Clock />} label="Shift" value={student.shift} className="capitalize" />
                <Separator />
                <InfoItem icon={<DollarSign />} label="Fee" value={`$${student.fee.toFixed(2)}`} />
                <Separator />
                <InfoItem icon={<User />} label="Status">
                    <Badge variant={getStatusBadgeVariant(student.status)} className="capitalize">{student.status}</Badge>
                </InfoItem>
            </CardContent>
            <CardFooter className="gap-2">
                <Button>Edit Profile</Button>
            </CardFooter>
        </Card>

        {/* Current Seat Details */}
        <Card>
            <CardHeader>
                <CardTitle>Current Seat Details</CardTitle>
                <CardDescription>Information about the student's assigned seat.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem icon={<Hash />} label="Seat Number" value={studentSeatDetails.seatNumber} />
              <Separator />
              <InfoItem icon={<Armchair />} label="Seat Type" value={studentSeatDetails.seatType} />
              <Separator />
              <InfoItem icon={<Clock />} label="Library Timing" value={studentSeatDetails.libraryTiming} />
              <Separator />
               <InfoItem icon={<CalendarIcon />} label="Assigned On" value={format(new Date(studentSeatDetails.assignedDate), "PP")} />
              <Separator />
              <InfoItem icon={<RefreshCw />} label="Status">
                <Badge variant={studentSeatDetails.status === 'Active' ? 'secondary' : 'destructive'}>{studentSeatDetails.status}</Badge>
              </InfoItem>
            </CardContent>
             <CardFooter>
                 <Button variant="outline" className="w-full">Change Seat</Button>
             </CardFooter>
          </Card>
      </div>

    </div>
    </div>
  );
}

function InfoItem({ icon, label, value, children, className }: { icon: React.ReactNode, label: string, value?: string, children?: React.ReactNode, className?: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            {value && <span className={`font-semibold text-sm ${className}`}>{value}</span>}
            {children}
        </div>
    )
}
