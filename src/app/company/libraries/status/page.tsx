'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { libraries, type Library } from '../data';
import { LibraryStatusChart } from '@/components/company/library-status-chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LibraryStatusPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const totalLibraries = libraries.length;
  const activeLibraries = libraries.filter((lib) => lib.isActive).length;
  const inactiveLibraries = totalLibraries - activeLibraries;

  const statusData = [
    { name: 'Active', value: activeLibraries, fill: 'hsl(var(--chart-2))' },
    { name: 'Inactive', value: inactiveLibraries, fill: 'hsl(var(--chart-5))' },
  ];

  const filteredLibraries = libraries.filter((library) => {
    if (statusFilter === 'all') return true;
    return statusFilter === 'active' ? library.isActive : !library.isActive;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Library Status
        </h1>
        <p className="text-muted-foreground">
          Monitor the operational status of all libraries in your network.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Total Libraries"
          value={totalLibraries.toString()}
          icon={<FaBuilding className="h-6 w-6 text-muted-foreground" />}
        />
        <KpiCard
          title="Active Libraries"
          value={activeLibraries.toString()}
          icon={<FaCheckCircle className="h-6 w-6 text-green-500" />}
        />
        <KpiCard
          title="Inactive Libraries"
          value={inactiveLibraries.toString()}
          icon={<XCircle className="h-6 w-6 text-destructive" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>
              A visual breakdown of active vs. inactive libraries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LibraryStatusChart data={statusData} />
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-7 lg:col-span-2">
          <Card className="lg:col-span-7 overflow-hidden">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div>
                  <CardTitle>Library Status List</CardTitle>
                  <CardDescription>
                    Detailed status for each library.
                  </CardDescription>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-2 md:p-6 md:pt-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Library Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLibraries.map((library) => (
                      <TableRow key={library.id}>
                        <TableCell className="font-medium">
                          {library.libraryName}
                        </TableCell>
                        <TableCell>{library.libraryEmail}</TableCell>
                        <TableCell>
                          <Badge
                            variant={library.isActive ? 'secondary' : 'outline'}
                          >
                            {library.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/company/libraries/${library.id}`}>
                              View Details
                            </Link>
                          </Button>
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
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
