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
import { kpiData, studentData } from './data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LibraryCharts } from '@/components/library/library-charts';

export default function LibraryDashboard() {
  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Library Dashboard
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
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">
                              {student.name}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm md:text-base">
                        {student.seat}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            student.paymentStatus === 'Paid'
                              ? 'secondary'
                              : student.paymentStatus === 'Due'
                              ? 'default'
                              : 'destructive'
                          }
                          className="text-xs md:text-sm"
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
        <CardTitle className="text-xs md:text-sm font-medium">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="text-xl md:text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
