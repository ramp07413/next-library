'use client';

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
  PlusCircle,
  Search,
  FilePenLine,
  Eye,
  UserCheck,
  UserX,
} from 'lucide-react';
import { students, Student } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export default function ManageStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
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
    .filter(
      (student) => statusFilter === 'all' || student.status === statusFilter
    )
    .filter((student) => shiftFilter === 'all' || student.shift === shiftFilter)
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Manage Students
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            View, edit, and manage all student profiles.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      <div className="grid lg:block gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Student List</CardTitle>
            <CardDescription className="text-sm">
              A comprehensive list of all students in the library.
            </CardDescription>
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
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[900px] md:min-w-[950px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className='min-w-[25%]'>Student</TableHead>
                    <TableHead className='min-w-[25%]'>
                      Contact
                    </TableHead>
                    <TableHead className='min-w-[25%]'>
                      Join Date
                    </TableHead>
                    <TableHead className='min-w-[25%]'>
                      Shift
                    </TableHead>
                    <TableHead className='min-w-[25%]'>Fee</TableHead>
                    <TableHead className='min-w-[25%]'>Status</TableHead>
                    <TableHead className='min-w-[25%]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TooltipProvider>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
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
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell">
                          <div className="font-medium">{student.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.phone}
                          </div>
                        </TableCell>
                        <TableCell className="table-cell">
                          {format(new Date(student.joinDate), 'PP')}
                        </TableCell>
                        <TableCell className="table-cell capitalize text-sm md:text-base">
                          {student.shift}
                        </TableCell>
                        <TableCell className="text-sm md:text-base font-medium">
                          ${student.fee.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(student.status)}
                            className="capitalize text-xs md:text-sm"
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-start gap-1">
                            <Dialog>
                              <Tooltip>
                                <DialogTrigger asChild>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 md:h-9 md:w-9"
                                    >
                                      <FilePenLine className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                </DialogTrigger>
                                <TooltipContent>Edit Student</TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                <DialogHeader className="space-y-2">
                                  <DialogTitle className="text-base md:text-lg">
                                    Edit {student.name}
                                  </DialogTitle>
                                  <DialogDescription className="text-xs md:text-sm">
                                    Update the student's information.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                      Name
                                    </Label>
                                    <Input
                                      id="name"
                                      defaultValue={student.name}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                      Email
                                    </Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      defaultValue={student.email}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                      Phone
                                    </Label>
                                    <Input
                                      id="phone"
                                      defaultValue={student.phone}
                                      className="col-span-3"
                                    />
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
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 md:h-9 md:w-9"
                                    >
                                      <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                </DialogTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader className="space-y-2">
                                  <DialogTitle className="text-base md:text-lg">
                                    {student.name}
                                  </DialogTitle>
                                  <DialogDescription className="text-xs md:text-sm break-all">
                                    Student ID: {student.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3 py-4 text-xs md:text-sm">
                                  <p>
                                    <span className="font-semibold">Email:</span>{' '}
                                    {student.email}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Phone:</span>{' '}
                                    {student.phone}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Join Date:
                                    </span>{' '}
                                    {format(new Date(student.joinDate), 'PPP')}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Shift:</span>{' '}
                                    <span className="capitalize">
                                      {student.shift}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="font-semibold">Fee:</span> $
                                    {student.fee.toFixed(2)}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Status:</span>{' '}
                                    <Badge
                                      variant={getStatusBadgeVariant(
                                        student.status
                                      )}
                                      className="capitalize"
                                    >
                                      {student.status}
                                    </Badge>
                                  </p>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <Tooltip>
                                <AlertDialogTrigger asChild>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className={
                                        student.status === 'active'
                                          ? 'text-destructive h-8 w-8 md:h-9 md:w-9'
                                          : 'text-green-600 h-8 w-8 md:h-9 md:w-9'
                                      }
                                    >
                                      {student.status === 'active' ? (
                                        <UserX className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                      ) : (
                                        <UserCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                      )}
                                      <span className="sr-only">
                                        {student.status === 'active'
                                          ? 'Deactivate Student'
                                          : 'Activate Student'}
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>
                                  {student.status === 'active'
                                    ? 'Deactivate Student'
                                    : 'Activate Student'}
                                </TooltipContent>
                              </Tooltip>
                              <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                <AlertDialogHeader className="space-y-2">
                                  <AlertDialogTitle className="text-base md:text-lg">
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-xs md:text-sm">
                                    This action will{' '}
                                    {student.status === 'active'
                                      ? 'deactivate'
                                      : 'activate'}{' '}
                                    the account for {student.name}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                  <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction className="w-full sm:w-auto">
                                    {student.status === 'active'
                                      ? 'Deactivate'
                                      : 'Activate'}
                                  </AlertDialogAction>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
