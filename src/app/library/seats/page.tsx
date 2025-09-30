
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
import { MoreHorizontal, PlusCircle, Search, Armchair, Circle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { seats, type Seat } from "./data";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function SeatsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

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

  const getStatusSeatColor = (status: Seat['status']) => {
    switch (status) {
      case 'occupied':
        return 'text-foreground/50';
      case 'free':
        return 'text-primary';
      case 'maintenance':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredSeats = seats
    .filter((seat) => statusFilter === 'all' || seat.status === statusFilter)
    .filter((seat) =>
      seat.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const groupedSeats = filteredSeats.reduce((acc, seat) => {
    const row = seat.seatNumber.split('-')[0];
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);


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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Seat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Seat</DialogTitle>
              <DialogDescription>
                Enter the details for the new seat.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="seatNumber" className="text-right">
                  Seat Number
                </Label>
                <Input id="seatNumber" placeholder="e.g., A-13" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save Seat</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
            <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
             <div className="flex items-center gap-2">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
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
        </div>

        <TabsContent value="grid">
            <Card>
                <CardHeader>
                    <CardTitle>Seat Layout</CardTitle>
                    <CardDescription>Visual representation of all library seats.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-6 mb-8 text-sm">
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-primary" fill="currentColor"/> Free</div>
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-foreground/50" fill="currentColor"/> Occupied</div>
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-destructive" fill="currentColor"/> Maintenance</div>
                    </div>
                    <div className="space-y-6">
                        {Object.entries(groupedSeats).map(([row, seatsInRow]) => (
                            <div key={row} className="flex items-center gap-8">
                                <div className="text-lg font-bold w-4 text-center">{row}</div>
                                <div className="grid grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-2 flex-1">
                                    {seatsInRow.map((seat) => (
                                        <TooltipProvider key={seat.id}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button onClick={() => setSelectedSeat(seat)} className={cn("flex flex-col items-center justify-center p-1 rounded-md aspect-square transition-colors", getStatusSeatColor(seat.status), 'hover:bg-accent')}>
                                                        <Armchair className="w-6 h-6" />
                                                        <span className="text-xs font-mono">{seat.seatNumber.split('-')[1]}</span>
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{seat.seatNumber}</p>
                                                    <p className="capitalize">Status: {seat.status}</p>
                                                    {seat.studentName && <p>Occupied by: {seat.studentName}</p>}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            </div>
                        ))}
                         {filteredSeats.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                No seats match the current filter.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="list">
            <Card>
                <CardHeader>
                <CardTitle>All Seats</CardTitle>
                <CardDescription>
                    A comprehensive list of all seats in the library.
                </CardDescription>
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
                        <TableRow key={seat.id} onClick={() => setSelectedSeat(seat)} className="cursor-pointer">
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
        </TabsContent>
      </Tabs>
      
      <Sheet open={!!selectedSeat} onOpenChange={(open) => !open && setSelectedSeat(null)}>
        <SheetContent>
            {selectedSeat && (
                <>
                <SheetHeader>
                    <SheetTitle>Seat {selectedSeat.seatNumber}</SheetTitle>
                    <SheetDescription>
                        Details and actions for this seat.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={getStatusBadgeVariant(selectedSeat.status)} className="capitalize">
                            {selectedSeat.status}
                        </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Occupied By</span>
                        <span>{selectedSeat.studentName || 'N/A'}</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Date Assigned</span>
                        <span>{selectedSeat.dateAssigned ? format(new Date(selectedSeat.dateAssigned), "PP") : 'N/A'}</span>
                    </div>
                </div>
                 <div className="mt-6 space-y-2">
                    <p className="font-semibold">Actions</p>
                    {selectedSeat.status === 'free' && <Button className="w-full">Assign Student</Button>}
                    {selectedSeat.status === 'occupied' && <Button variant="destructive" className="w-full">Vacate Seat</Button>}
                    {selectedSeat.status !== 'maintenance' && <Button variant="outline" className="w-full">Mark for Maintenance</Button>}
                    {selectedSeat.status === 'maintenance' && <Button variant="secondary" className="w-full">Mark as Free</Button>}
                    <Button variant="ghost" className="w-full justify-start">View Seat History</Button>
                </div>
                </>
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Add Tooltip components as they were missing from the previous response
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
