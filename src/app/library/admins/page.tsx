
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
import { PlusCircle, Search, FilePenLine, UserCheck, UserX, ShieldCheck } from "lucide-react";
import { admins, LibraryAdmin } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function AdminManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<LibraryAdmin | null>(null);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'head':
        return 'destructive';
      case 'librarian':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const filteredAdmins = admins
    .filter(admin => 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Admin Management
          </h1>
          <p className="text-muted-foreground">
            Manage admins for your library branch.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>A list of all admin users for this library.</CardDescription>
          <div className="flex items-center gap-2 pt-4">
             <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by name or email..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={admin.avatar} alt={admin.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {admin.email}
                    </TableCell>
                     <TableCell className="capitalize">
                        <Badge variant={getRoleBadgeVariant(admin.role)}>{admin.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={admin.status === 'active' ? 'secondary' : 'outline'} className="capitalize">
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(admin.joinDate), "PP")}
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
                                <TooltipContent>Edit User</TooltipContent>
                            </Tooltip>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit {admin.name}</DialogTitle>
                                    <DialogDescription>Update the details for this admin user.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input id="name" defaultValue={admin.name} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">Email</Label>
                                        <Input id="email" type="email" defaultValue={admin.email} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">Role</Label>
                                        <Select defaultValue={admin.role}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="head">Head</SelectItem>
                                                <SelectItem value="librarian">Librarian</SelectItem>
                                                <SelectItem value="clerk">Clerk</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit">Save Changes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                           </Dialog>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"><ShieldCheck className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>View Permissions</TooltipContent>
                           </Tooltip>
                            <AlertDialog>
                                <Tooltip>
                                <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost" className={admin.status === 'active' ? "text-destructive" : "text-green-600"}>
                                            {admin.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                        </Button>
                                    </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>{admin.status === 'active' ? 'Deactivate User' : 'Activate User'}</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will {admin.status === 'active' ? 'deactivate' : 'activate'} the user account for {admin.name}.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>{admin.status === 'active' ? 'Deactivate' : 'Activate'}</AlertDialogAction>
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
