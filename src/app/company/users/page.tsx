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
import { FilePenLine, UserCheck, UserX, UserPlus, Search } from 'lucide-react';
import { users } from './data';
import { libraries } from '@/app/company/libraries/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Label } from '@/components/ui/label';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'destructive';
      case 'super_admin':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const filteredUsers = users
    .filter((user) => roleFilter === 'all' || user.role === roleFilter)
    .filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
            Users
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage all users and their permissions.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2" /> Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="library" className="text-right">
                  Library
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Assign to a library" />
                  </SelectTrigger>
                  <SelectContent>
                    {libraries.map((lib) => (
                      <SelectItem key={lib.id} value={lib.id}>
                        {lib.libraryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Add User</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>
              A list of all users in the system.
            </CardDescription>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
              <div className="relative flex-1 md:grow-0 w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by email..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <TooltipProvider>
              <div className="overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Role</TableHead>
                      <TableHead>Library</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const library = user.libraryId
                        ? libraries.find((lib) => lib.id === user.libraryId)
                        : null;
                      const getLibraryText = () => {
                        if (
                          user.role === 'owner' ||
                          user.role === 'super_admin'
                        )
                          return 'LibMan Company';
                        if (user.role === 'student') return 'Student';
                        return library ? library.libraryName : 'N/A';
                      };

                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.email}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={getRoleBadgeVariant(user.role)}
                              className="whitespace-nowrap capitalize"
                            >
                              {user.role.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="">{getLibraryText()}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={user.isActive ? 'secondary' : 'outline'}
                              className="whitespace-nowrap"
                            >
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {format(new Date(user.createdAt), 'PP')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-start gap-1 sm:gap-2">
                              <Dialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                      <Button size="icon" variant="ghost">
                                        <FilePenLine className="h-4 w-4" />
                                        <span className="sr-only">
                                          Edit User
                                        </span>
                                      </Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit User</p>
                                  </TooltipContent>
                                </Tooltip>
                                <DialogContent className="max-w-[95vw] sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>
                                      Update user information.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex flex-col items-start gap-4">
                                      <Label
                                        htmlFor="email-edit"
                                        className="text-right"
                                      >
                                        Email
                                      </Label>
                                      <Input
                                        id="email-edit"
                                        defaultValue={user.email}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="submit">
                                        Save Changes
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className={
                                          user.isActive
                                            ? 'text-destructive'
                                            : 'text-green-600'
                                        }
                                      >
                                        {user.isActive ? (
                                          <UserX className="h-4 w-4" />
                                        ) : (
                                          <UserCheck className="h-4 w-4" />
                                        )}
                                        <span className="sr-only">
                                          {user.isActive
                                            ? 'Deactivate User'
                                            : 'Activate User'}
                                        </span>
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {user.isActive
                                        ? 'Deactivate User'
                                        : 'Activate User'}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                                <AlertDialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action will{' '}
                                      {user.isActive
                                        ? 'deactivate'
                                        : 'activate'}{' '}
                                      the user account for {user.email}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                      {user.isActive
                                        ? 'Deactivate'
                                        : 'Activate'}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
