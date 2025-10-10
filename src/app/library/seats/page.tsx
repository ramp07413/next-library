'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FaCircle,
  FaCheckCircle,
  FaTrash,
  FaUserMinus,
  FaUserPlus,
  FaHistory,
  FaWrench,
} from 'react-icons/fa';
import { MdChair } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import { seats, type Seat } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LuCirclePlus } from 'react-icons/lu';

export default function SeatsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [seatToDelete, setSeatToDelete] = useState('');

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

  // We use status colors directly on seats

  const getStatusSeatColor = (status: Seat['status']) => {
    switch (status) {
      case 'full occupied':
        return 'bg-gray-300 text-foreground border-gray-400';
      case 'half occupied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-muted-foreground border-gray-300';
    }
  };

  const filteredSeats = seats
    .filter((seat) => statusFilter === 'all' || seat.status === statusFilter)
    .filter(
      (seat) =>
        seat.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seat.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // We don't need grouping by tables anymore

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Seat Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            View, manage, and assign library seats.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <LuCirclePlus className="mr-2 h-4 w-4" /> Add New Seat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-base md:text-lg">
                  Add New Seat
                </DialogTitle>
                <DialogDescription className="text-xs md:text-sm">
                  Enter the details for the new seat.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col sm:items-center gap-4">
                  <Label htmlFor="seatNumber" className="text-left w-full">
                    Seat Number
                  </Label>
                  <Input
                    id="seatNumber"
                    placeholder="e.g., 101"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save Seat</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <FaTrash className="mr-2 h-4 w-4" /> Delete Seat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Seat</DialogTitle>
                <DialogDescription>
                  Enter the seat number you want to permanently delete.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col sm:items-center gap-4">
                  <Label htmlFor="seat-to-delete" className="text-left w-full">
                    Seat Number
                  </Label>
                  <Input
                    id="seat-to-delete"
                    placeholder="e.g., 102"
                    className="col-span-3"
                    value={seatToDelete}
                    onChange={(e) => setSeatToDelete(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={!seatToDelete}>
                      Delete Seat
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete seat <strong>{seatToDelete}</strong>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Confirm Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              <IoSearchSharp className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
          <div className="grid lg:block gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4 overflow-hidden">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">
                  Seat Layout
                </CardTitle>
                <CardDescription className="text-sm">
                  Visual representation of all library seats.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className="w-3 h-3 text-primary"
                      fill="currentColor"
                    />{' '}
                    Available
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className="w-3 h-3 text-yellow-500"
                      fill="currentColor"
                    />{' '}
                    Half Occupied
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className="w-3 h-3 text-foreground/50"
                      fill="currentColor"
                    />{' '}
                    Full Occupied
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className="w-3 h-3 text-destructive"
                      fill="currentColor"
                    />{' '}
                    Maintenance
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 md:gap-4">
                  {filteredSeats.map((seat) => (
                    <TooltipProvider key={seat.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedSeat(seat)}
                            className={cn(
                              'flex flex-col items-center justify-center p-2 md:p-3 rounded-md aspect-square transition-colors w-full border',
                              getStatusSeatColor(seat.status),
                              'hover:opacity-80'
                            )}
                          >
                            <MdChair className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                            <span className="text-xs md:text-sm font-mono mt-1">
                              {seat.seatNumber}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{seat.seatNumber}</p>
                          <p className="capitalize">Status: {seat.status}</p>
                          {seat.studentName && (
                            <p>Occupied by: {seat.studentName}</p>
                          )}
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
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="grid lg:block gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4 overflow-hidden">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">All Seats</CardTitle>
                <CardDescription className="text-sm">
                  A comprehensive list of all seats in the library.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6 md:pt-0">
                <TooltipProvider>
                  <div className="overflow-x-auto">
                    <Table className="min-w-[900px] md:min-w-[950px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[15%]">
                            Seat Number
                          </TableHead>
                          <TableHead className="min-w-[15%]">Status</TableHead>
                          <TableHead className="min-w-[25%]">
                            Occupied By
                          </TableHead>
                          <TableHead className="min-w-[20%]">
                            Date Assigned
                          </TableHead>
                          <TableHead className="min-w-[25%]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSeats.map((seat) => (
                          <TableRow key={seat.id}>
                            <TableCell>
                              <div
                                className={cn(
                                  'w-fit rounded-md border px-3 py-2 font-mono text-sm md:text-base font-medium',
                                  getStatusSeatColor(seat.status)
                                )}
                              >
                                {seat.seatNumber}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(seat.status)}
                                className="capitalize text-xs md:text-sm"
                              >
                                {seat.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="table-cell">
                              {seat.studentName ? (
                                <div className="font-medium text-sm md:text-base">
                                  {seat.studentName}
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm md:text-base">
                                  N/A
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="table-cell text-sm md:text-base">
                              {seat.dateAssigned ? (
                                format(new Date(seat.dateAssigned), 'PP')
                              ) : (
                                <span className="text-muted-foreground">
                                  N/A
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-start gap-1">
                                {seat.status === 'available' && (
                                  <Dialog>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <DialogTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 md:h-9 md:w-9"
                                          >
                                            <FaUserPlus className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                          </Button>
                                        </DialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Assign Student
                                      </TooltipContent>
                                    </Tooltip>
                                    <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                      <DialogHeader className="space-y-2">
                                        <DialogTitle className="text-base md:text-lg">
                                          Assign Seat {seat.seatNumber}
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <Label htmlFor="student-id">
                                          Student ID
                                        </Label>
                                        <Input
                                          id="student-id"
                                          placeholder="Enter student ID"
                                        />
                                      </div>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button type="submit">Assign</Button>
                                        </DialogClose>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                {(seat.status === 'full occupied' ||
                                  seat.status === 'half occupied') && (
                                  <AlertDialog>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 md:h-9 md:w-9"
                                          >
                                            <FaUserMinus className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Vacate Seat
                                      </TooltipContent>
                                    </Tooltip>
                                    <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                      <AlertDialogHeader className="space-y-2">
                                        <AlertDialogTitle className="text-base md:text-lg">
                                          Vacate Seat?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-xs md:text-sm">
                                          Are you sure you want to vacate seat{' '}
                                          {seat.seatNumber} occupied by{' '}
                                          {seat.studentName}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                        <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="w-full sm:w-auto">
                                          Vacate
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                                <Dialog>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 md:h-9 md:w-9"
                                        >
                                          <FaHistory className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                        </Button>
                                      </DialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      View History
                                    </TooltipContent>
                                  </Tooltip>
                                  <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                    <DialogHeader className="space-y-2">
                                      <DialogTitle className="text-base md:text-lg">
                                        History for Seat {seat.seatNumber}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <p className="text-center p-4">
                                      No history available.
                                    </p>
                                  </DialogContent>
                                </Dialog>
                                {seat.status !== 'maintenance' && (
                                  <AlertDialog>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 md:h-9 md:w-9"
                                          >
                                            <FaWrench className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Mark for Maintenance
                                      </TooltipContent>
                                    </Tooltip>
                                    <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                      <AlertDialogHeader className="space-y-2">
                                        <AlertDialogTitle className="text-base md:text-lg">
                                          Mark for Maintenance?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-xs md:text-sm">
                                          This will mark seat {seat.seatNumber}{' '}
                                          as unavailable for students.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                        <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="w-full sm:w-auto">
                                          Confirm
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                                {seat.status === 'maintenance' && (
                                  <AlertDialog>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 md:h-9 md:w-9"
                                          >
                                            <FaCheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600" />
                                          </Button>
                                        </AlertDialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Mark as Available
                                      </TooltipContent>
                                    </Tooltip>
                                    <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                      <AlertDialogHeader className="space-y-2">
                                        <AlertDialogTitle className="text-base md:text-lg">
                                          Mark as Available?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-xs md:text-sm">
                                          This will make seat {seat.seatNumber}{' '}
                                          available for assignment.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                        <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="w-full sm:w-auto">
                                          Mark as Available
                                        </AlertDialogAction>
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
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!selectedSeat}
        onOpenChange={(open) => !open && setSelectedSeat(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          {selectedSeat && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-base md:text-lg">
                  Seat {selectedSeat.seatNumber}
                </DialogTitle>
                <DialogDescription className="text-xs md:text-sm">
                  Details and actions for this seat.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Seat Number</span>
                  <div
                    className={cn(
                      'rounded-md border px-3 py-2 font-mono text-sm font-medium',
                      getStatusSeatColor(selectedSeat.status)
                    )}
                  >
                    {selectedSeat.seatNumber}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={getStatusBadgeVariant(selectedSeat.status)}
                    className="capitalize"
                  >
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
                  <span>
                    {selectedSeat.dateAssigned
                      ? format(new Date(selectedSeat.dateAssigned), 'PP')
                      : 'N/A'}
                  </span>
                </div>
              </div>
              <DialogFooter className="mt-6 flex-col sm:flex-col sm:space-x-0 space-y-2">
                <p className="font-semibold text-left">Actions</p>
                {selectedSeat.status === 'available' && (
                  <Button className="w-full">Assign Student</Button>
                )}
                {(selectedSeat.status === 'full occupied' ||
                  selectedSeat.status === 'half occupied') && (
                  <Button variant="destructive" className="w-full">
                    Vacate Seat
                  </Button>
                )}
                {selectedSeat.status !== 'maintenance' && (
                  <Button variant="outline" className="w-full">
                    Mark for Maintenance
                  </Button>
                )}
                {selectedSeat.status === 'maintenance' && (
                  <Button variant="secondary" className="w-full">
                    Mark as Available
                  </Button>
                )}
                <Button variant="ghost" className="w-full justify-start">
                  View Seat History
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
