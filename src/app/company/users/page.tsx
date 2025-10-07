
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
import { FilePenLine, ShieldCheck, UserCheck, UserX, UserPlus, Search } from "lucide-react";
import { users } from "./data";
import { libraries } from "@/app/company/libraries/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Users
          </h1>
          <p className="text-muted-foreground">
            Manage all users and their permissions.
          </p>
        </div>
        <Button asChild>
          <Link href="/company/users/register"><UserPlus className="mr-2" />Add New User</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
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
        <CardContent>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Library</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {filteredUsers.map((user) => {
                    const library = user.libraryId ? libraries.find(lib => lib.id === user.libraryId) : null;
                    const getLibraryText = () => {
                      if (user.role === 'student') return 'Student';
                      if (user.role === 'owner' || user.role === 'super_admin') return 'LibMan Company';
                      return library ? library.libraryName : 'N/A';
                    };

                    return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="whitespace-nowrap capitalize">
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getLibraryText()}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        <Badge variant={user.isActive ? "secondary" : "outline"} className="whitespace-nowrap">
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {format(new Date(user.createdAt), "PP")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start gap-1 sm:gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <FilePenLine className="h-4 w-4" />
                                <span className="sr-only">Edit User</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit User</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                               <Button size="icon" variant="ghost">
                                <ShieldCheck className="h-4 w-4" />
                                <span className="sr-only">View Permissions</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Permissions</p>
                            </TooltipContent>
                          </Tooltip>
                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <Button size="icon" variant="ghost" className={user.isActive ? "text-destructive" : "text-green-600"}>
                                      {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                      <span className="sr-only">{user.isActive ? 'Deactivate User' : 'Activate User'}</span>
                                    </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{user.isActive ? 'Deactivate User' : 'Activate User'}</p>
                              </TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will {user.isActive ? 'deactivate' : 'activate'} the user account for {user.email}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>
                                  {user.isActive ? 'Deactivate' : 'Activate'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )})}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
