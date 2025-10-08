import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { libraries } from '../data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Users,
  Armchair,
  Wallet,
  UserCog,
  CreditCard,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

// Importing mock data
import { students } from '@/app/library/students/data';
import { seats } from '@/app/library/seats/data';
import { expenses as libraryExpenses } from '@/app/library/expenses/data';
import { admins as libraryAdmins } from '@/app/library/admins/data';
import { payments as studentPayments } from '@/app/library/payments/data';

export default function LibraryDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const library = libraries.find((lib) => lib.id === params.id);

  if (!library) {
    notFound();
  }

  const getSeatStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'full occupied':
        return 'default';
      case 'half occupied':
        return 'outline';
      case 'available':
        return 'secondary';
      case 'maintenance':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
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

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'head':
        return 'destructive';
      case 'librarian':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/company/libraries">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {library.libraryName}
          </h1>
          <p className="text-muted-foreground">
            Detailed information for library ID: {library.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Library Details</CardTitle>
              <CardDescription>
                General information about the library.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={library.isActive ? 'secondary' : 'outline'}>
                  {library.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <Separator />
              <InfoItem
                icon={<Mail />}
                label="Email"
                value={library.libraryEmail}
              />
              <Separator />
              <InfoItem
                icon={<Phone />}
                label="Contact"
                value={library.libraryContact}
              />
              <Separator />
              <InfoItem
                icon={<MapPin />}
                label="Address"
                value={`${library.libraryAddress.street}, ${library.libraryAddress.city}, ${library.libraryAddress.state} ${library.libraryAddress.zip}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog /> Admin Details
              </CardTitle>
              <CardDescription>
                Personnel managing this library.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {libraryAdmins.slice(0, 3).map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getRoleBadgeVariant(admin.role)}
                          className="capitalize"
                        >
                          {admin.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users /> Student Details
              </CardTitle>
              <CardDescription>
                Students currently enrolled in this library.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.slice(0, 4).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {student.shift}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === 'active'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="capitalize"
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard /> Student Payment Details
              </CardTitle>
              <CardDescription>
                Recent payment transactions from students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentPayments.slice(0, 3).map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getPaymentStatusBadgeVariant(payment.status)}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Armchair /> Seat Details
                </CardTitle>
                <CardDescription>Current seat occupancy.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seat</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seats.slice(0, 3).map((seat) => (
                      <TableRow key={seat.id}>
                        <TableCell>{seat.seatNumber}</TableCell>
                        <TableCell>
                          <Badge
                            variant={getSeatStatusBadgeVariant(seat.status)}
                            className="capitalize"
                          >
                            {seat.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet /> Expense Details
                </CardTitle>
                <CardDescription>Recent library expenses.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {libraryExpenses.slice(0, 3).map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {value && (
        <span className="font-semibold text-sm text-right">{value}</span>
      )}
    </div>
  );
}
