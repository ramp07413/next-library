import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Armchair, DollarSign, Users } from 'lucide-react';
import { kpiData, studentData } from '../data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LibraryCharts } from '@/components/library/library-charts';
import { libraries } from '@/app/company/libraries/data';

// Responsive tweaks for library [id] dashboard; preserved logic/UI
export default function LibraryDashboard({
  params,
}: {
  params: { id: string };
}) {
  const library = libraries.find((lib) => lib.id === params.id);
  const libraryName = library ? library.libraryName : 'Library';

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight font-headline">
        {libraryName} Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Seats"
          value={kpiData.totalSeats.toString()}
          icon={<Armchair />}
        />
        <KpiCard
          title="Occupied Seats"
          value={kpiData.occupiedSeats.toString()}
          icon={<Users />}
        />
        <KpiCard
          title="Free Seats"
          value={kpiData.freeSeats.toString()}
          icon={<Armchair className="text-green-500" />}
        />
        <KpiCard
          title="Monthly Income"
          value={`$${kpiData.monthlyIncome.toLocaleString()}`}
          icon={<DollarSign />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">
              Students Overview
            </CardTitle>
            <CardDescription className="text-sm">
              List of students with their seat and payment status.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead className="text-right">Payment Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.map((student) => (
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
                      <TableCell>{student.seat}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            student.paymentStatus === 'Paid'
                              ? 'secondary'
                              : student.paymentStatus === 'Due'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {student.paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/library/students">View All Students</Link>
            </Button>
          </CardContent>
        </Card>
        <div className="lg:col-span-3 space-y-4">
          <LibraryCharts />
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
