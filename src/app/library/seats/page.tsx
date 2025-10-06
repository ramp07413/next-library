
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
import { PlusCircle, Search, Armchair, Circle, UserPlus, UserMinus, Wrench, CheckCircle, History, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function SeatsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const getStatusBadgeVariant = (status: Seat['status']) => {
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

  const getStatusSeatColor = (status: Seat['status']) => {
    switch (status) {
      case 'full occupied':
        return 'text-foreground/50';
      case 'half occupied':
        return 'text-yellow-500';
      case 'available':
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


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Seat Management
          </h1>
          <p className="text-muted-foreground">
            View, manage, and assign library seats.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
                    <Input id="seatNumber" placeholder="e.g., 101" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit">Save Seat</Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
            </Dialog>
             <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Seats
            </Button>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 md:grow-0 w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
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
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="half occupied">Half Occupied</SelectItem>
                    <SelectItem value="full occupied">Full Occupied</SelectItem>
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
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-sm">
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-primary" fill="currentColor"/> Available</div>
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-yellow-500" fill="currentColor"/> Half Occupied</div>
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-foreground/50" fill="currentColor"/> Full Occupied</div>
                        <div className="flex items-center gap-2"><Circle className="w-3 h-3 text-destructive" fill="currentColor"/> Maintenance</div>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                        {filteredSeats.map((seat) => (
                            <TooltipProvider key={seat.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button onClick={() => setSelectedSeat(seat)} className={cn("flex flex-col items-center justify-center p-2 rounded-md aspect-square transition-colors", getStatusSeatColor(seat.status), 'hover:bg-accent')}>
                                            <Armchair className="w-8 h-8" />
                                            <span className="text-sm font-mono">{seat.seatNumber}</span>
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
                         {filteredSeats.length === 0 && (
                            <div className="col-span-full text-center text-muted-foreground py-10">
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
                <TooltipProvider>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Seat Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Occupied By</TableHead>
                        <TableHead className="hidden md:table-cell">Date Assigned</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredSeats.map((seat) => (
                        <TableRow key={seat.id} >
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
                        <TableCell className="hidden sm:table-cell">
                            {seat.studentName ? (
                            <div className="font-medium">{seat.studentName}</div>
                            ) : (
                            <span className="text-muted-foreground">N/A</span>
                            )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {seat.dateAssigned ? (
                            format(new Date(seat.dateAssigned), "PP")
                            ) : (
                            <span className="text-muted-foreground">N/A</span>
                            )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            {seat.status === 'available' && (
                              <Dialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon"><UserPlus className="h-4 w-4" /></Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Assign Student</TooltipContent>
                                </Tooltip>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Assign Seat {seat.seatNumber}</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <Label htmlFor="student-id">Student ID</Label>
                                    <Input id="student-id" placeholder="Enter student ID"/>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild><Button type="submit">Assign</Button></DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                            {(seat.status === 'full occupied' || seat.status === 'half occupied') && (
                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon"><UserMinus className="h-4 w-4" /></Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Vacate Seat</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Vacate Seat?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to vacate seat {seat.seatNumber} occupied by {seat.studentName}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Vacate</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                             <Dialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon"><History className="h-4 w-4" /></Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>View History</TooltipContent>
                                </Tooltip>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>History for Seat {seat.seatNumber}</DialogTitle>
                                  </DialogHeader>
                                  <p className="text-center p-4">No history available.</p>
                                </DialogContent>
                              </Dialog>
                            {seat.status !== 'maintenance' && (
                               <AlertDialog>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon"><Wrench className="h-4 w-4" /></Button>
                                      </AlertDialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>Mark for Maintenance</TooltipContent>
                                  </Tooltip>
                                 <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Mark for Maintenance?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will mark seat {seat.seatNumber} as unavailable for students.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            )}
                            {seat.status === 'maintenance' && (
                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Mark as Available</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Mark as Available?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will make seat {seat.seatNumber} available for assignment.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Mark as Available</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TooltipProvider>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={!!selectedSeat} onOpenChange={(open) => !open && setSelectedSeat(null)}>
        <DialogContent className="sm:max-w-md">
            {selectedSeat && (
                <>
                <DialogHeader>
                    <DialogTitle>Seat {selectedSeat.seatNumber}</DialogTitle>
                    <DialogDescription>
                        Details and actions for this seat.
                    </DialogDescription>
                </DialogHeader>
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
                 <DialogFooter className="mt-6 flex-col sm:flex-col sm:space-x-0 space-y-2">
                    <p className="font-semibold text-left">Actions</p>
                    {selectedSeat.status === 'available' && <Button className="w-full">Assign Student</Button>}
                    {(selectedSeat.status === 'full occupied' || selectedSeat.status === 'half occupied') && <Button variant="destructive" className="w-full">Vacate Seat</Button>}
                    {selectedSeat.status !== 'maintenance' && <Button variant="outline" className="w-full">Mark for Maintenance</Button>}
                    {selectedSeat.status === 'maintenance' && <Button variant="secondary" className="w-full">Mark as Available</Button>}
                    <Button variant="ghost" className="w-full justify-start">View Seat History</Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
