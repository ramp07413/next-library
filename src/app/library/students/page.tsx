
"use client";

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
import { PlusCircle, Search, FilePenLine, Eye, UserCheck, UserX } from "lucide-react";
import { students, Student } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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


export default function ManageStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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

  const filteredStudents = students
    .filter(student => statusFilter === 'all' || student.status === statusFilter)
    .filter(student => shiftFilter === 'all' || student.shift === shiftFilter)
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Manage Students
          </h1>
          <p className="text-muted-foreground">
            View, edit, and manage all student profiles.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>A comprehensive list of all students in the library.</CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
             <div className="relative flex-1 md:grow-0 w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by name or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
             <Select value={shiftFilter} onValueChange={setShiftFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shifts</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
                <TableHead className="hidden md:table-cell">Join Date</TableHead>
                <TableHead className="hidden sm:table-cell">Shift</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="font-medium">{student.email}</div>
                      <div className="text-sm text-muted-foreground">{student.phone}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(student.joinDate), "PP")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">
                        {student.shift}
                    </TableCell>
                    <TableCell>
                      ${student.fee.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(student.status)} className="capitalize">
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                        <Dialog>
                            <Tooltip>
                                <DialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost"><FilePenLine className="h-4 w-4" /></Button>
                                    </TooltipTrigger>
                                </DialogTrigger>
                                <TooltipContent>Edit Student</TooltipContent>
                            </Tooltip>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit {student.name}</DialogTitle>
                                    <DialogDescription>Update the student's information.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input id="name" defaultValue={student.name} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">Email</Label>
                                        <Input id="email" type="email" defaultValue={student.email} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">Phone</Label>
                                        <Input id="phone" defaultValue={student.phone} className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit">Save Changes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <Tooltip>
                                <DialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                                    </TooltipTrigger>
                                </DialogTrigger>
                                <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{student.name}</DialogTitle>
                                    <DialogDescription>Student ID: {student.id}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2 py-4 text-sm">
                                    <p><span className="font-semibold">Email:</span> {student.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {student.phone}</p>
                                    <p><span className="font-semibold">Join Date:</span> {format(new Date(student.joinDate), "PPP")}</p>
                                    <p><span className="font-semibold">Shift:</span> <span className="capitalize">{student.shift}</span></p>
                                    <p><span className="font-semibold">Fee:</span> ${student.fee.toFixed(2)}</p>
                                    <p><span className="font-semibold">Status:</span> <Badge variant={getStatusBadgeVariant(student.status)} className="capitalize">{student.status}</Badge></p>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <AlertDialog>
                            <Tooltip>
                                <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost" className={student.status === 'active' ? "text-destructive" : "text-green-600"}>
                                        {student.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                        <span className="sr-only">{student.status === 'active' ? 'Deactivate Student' : 'Activate Student'}</span>
                                        </Button>
                                    </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>{student.status === 'active' ? 'Deactivate Student' : 'Activate Student'}</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will {student.status === 'active' ? 'deactivate' : 'activate'} the account for {student.name}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>{student.status === 'active' ? 'Deactivate' : 'Activate'}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
