import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Armchair, DollarSign, Users } from "lucide-react";
import { kpiData, occupancyData, paymentCollectionData, studentData } from "./data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function LibraryDashboard() {
  const chartConfig = {
    occupied: { label: "Occupied", color: "hsl(var(--primary))" },
    collected: { label: "Collected", color: "hsl(var(--accent))" },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Library Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Seats" value={kpiData.totalSeats.toString()} icon={<Armchair />} />
        <KpiCard title="Occupied Seats" value={kpiData.occupiedSeats.toString()} icon={<Users />} />
        <KpiCard title="Free Seats" value={kpiData.freeSeats.toString()} icon={<Armchair className="text-green-500" />} />
        <KpiCard title="Monthly Income" value={`$${kpiData.monthlyIncome.toLocaleString()}`} icon={<DollarSign />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Students Overview</CardTitle>
            <CardDescription>List of students with their seat and payment status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
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
                          <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.seat}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={student.paymentStatus === 'Paid' ? 'secondary' : student.paymentStatus === 'Due' ? 'default' : 'destructive'}>
                        {student.paymentStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             <Button variant="outline" className="w-full mt-4">View All Students</Button>
          </CardContent>
        </Card>
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <AreaChart data={occupancyData} margin={{ left: -4, right: 4, top: 4, bottom: -4 }}>
                  <defs>
                    <linearGradient id="fillOccupied" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-occupied)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-occupied)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" hide />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area type="monotone" dataKey="occupied" stroke="var(--color-occupied)" fill="url(#fillOccupied)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <BarChart data={paymentCollectionData} margin={{ left: -4, right: 4, top: 4, bottom: -4 }}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="collected" fill="var(--color-collected)" radius={2} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
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
