
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { seats } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function SeatsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'default';
      case 'free':
        return 'secondary';
      case 'maintenance':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredSeats = seats
    .filter((seat) => statusFilter === 'all' || seat.status === statusFilter)
    .filter((seat) =>
      seat.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Seat Management
          </h1>
          <p className="text-muted-foreground">
            View, manage, and assign library seats.
          </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Seat
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Seats</CardTitle>
          <CardDescription>
            A comprehensive list of all seats in the library.
          </CardDescription>
          <div className="flex items-center gap-2 pt-4">
             <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by seat or student..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seat Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Occupied By</TableHead>
                <TableHead>Date Assigned</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSeats.map((seat) => (
                <TableRow key={seat.id}>
                  <TableCell>
                    <div className="w-fit rounded-md border bg-muted px-2 py-1 font-mono text-sm font-medium">
                        {seat.seatNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(seat.status)} className="capitalize">
                      {seat.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {seat.studentName ? (
                      <div className="font-medium">{seat.studentName}</div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {seat.dateAssigned ? (
                      format(new Date(seat.dateAssigned), "PP")
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {seat.status === 'free' && <DropdownMenuItem>Assign Student</DropdownMenuItem>}
                        {seat.status === 'occupied' && <DropdownMenuItem>Vacate Seat</DropdownMenuItem>}
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        {seat.status !== 'maintenance' && <DropdownMenuItem>Mark for Maintenance</DropdownMenuItem>}
                        {seat.status === 'maintenance' && <DropdownMenuItem>Mark as Free</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
