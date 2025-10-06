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
  PlusCircle,
  Search,
  FilePenLine,
  UserCheck,
  UserX,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { admins, LibraryAdmin } from './data';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { libraryModules, libraryRolePermissions } from './permissions-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function AdminManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Admin Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage admins for your library branch.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Admin Users</CardTitle>
          <CardDescription className="text-sm">
            A list of all admin users for this library.
          </CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Admin</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[100px]">Role</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Date Joined</TableHead>
                  <TableHead className="min-w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TooltipProvider>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                            <AvatarImage
                              src={admin.avatar}
                              alt={admin.name}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {admin.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">
                              {admin.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm md:text-base truncate">
                        {admin.email}
                      </TableCell>
                      <TableCell className="capitalize">
                        <Badge
                          variant={getRoleBadgeVariant(admin.role)}
                          className="text-xs md:text-sm"
                        >
                          {admin.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            admin.status === 'active' ? 'secondary' : 'outline'
                          }
                          className="capitalize text-xs md:text-sm"
                        >
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm md:text-base">
                        {format(new Date(admin.joinDate), 'PP')}
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
                              <TooltipContent>Edit User</TooltipContent>
                            </Tooltip>
                            <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                              <DialogHeader className="space-y-2">
                                <DialogTitle className="text-base md:text-lg">
                                  Edit {admin.name}
                                </DialogTitle>
                                <DialogDescription className="text-xs md:text-sm">
                                  Update the details for this admin user.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    id="name"
                                    defaultValue={admin.name}
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
                                    defaultValue={admin.email}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">
                                    Role
                                  </Label>
                                  <Select defaultValue={admin.role}>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="head">Head</SelectItem>
                                      <SelectItem value="librarian">
                                        Librarian
                                      </SelectItem>
                                      <SelectItem value="clerk">
                                        Clerk
                                      </SelectItem>
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
                          <Dialog>
                            <Tooltip>
                              <DialogTrigger asChild>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 md:h-9 md:w-9"
                                  >
                                    <ShieldCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                  </Button>
                                </TooltipTrigger>
                              </DialogTrigger>
                              <TooltipContent>View Permissions</TooltipContent>
                            </Tooltip>
                            <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                              <DialogHeader className="space-y-2">
                                <DialogTitle className="text-base md:text-lg">
                                  Permissions for{' '}
                                  <span className="capitalize">
                                    {admin.role}
                                  </span>
                                </DialogTitle>
                                <DialogDescription className="text-xs md:text-sm">
                                  These are the permissions granted to the "
                                  {admin.name}" role.
                                </DialogDescription>
                              </DialogHeader>
                              <Accordion
                                type="multiple"
                                defaultValue={libraryModules.map((m) => m.name)}
                                className="w-full"
                              >
                                {libraryModules.map((module) => (
                                  <AccordionItem
                                    key={module.name}
                                    value={module.name}
                                  >
                                    <AccordionTrigger>
                                      {module.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="grid gap-2 pl-4">
                                        {module.permissions.map(
                                          (permission) => (
                                            <div
                                              key={permission.id}
                                              className="flex items-center gap-2"
                                            >
                                              <span
                                                className={
                                                  libraryRolePermissions[
                                                    admin.role
                                                  ].includes(permission.id)
                                                    ? 'text-green-500'
                                                    : 'text-destructive'
                                                }
                                              >
                                                {libraryRolePermissions[
                                                  admin.role
                                                ].includes(permission.id) ? (
                                                  <UserCheck className="h-4 w-4" />
                                                ) : (
                                                  <UserX className="h-4 w-4" />
                                                )}
                                              </span>
                                              <Label
                                                htmlFor={permission.id}
                                                className="cursor-pointer font-normal"
                                              >
                                                {permission.description}
                                              </Label>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
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
                                      admin.status === 'active'
                                        ? 'text-destructive h-8 w-8 md:h-9 md:w-9'
                                        : 'text-green-600 h-8 w-8 md:h-9 md:w-9'
                                    }
                                  >
                                    {admin.status === 'active' ? (
                                      <UserX className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    ) : (
                                      <UserCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                              </AlertDialogTrigger>
                              <TooltipContent>
                                {admin.status === 'active'
                                  ? 'Deactivate User'
                                  : 'Activate User'}
                              </TooltipContent>
                            </Tooltip>
                            <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                              <AlertDialogHeader className="space-y-2">
                                <AlertDialogTitle className="text-base md:text-lg">
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-xs md:text-sm">
                                  This action will{' '}
                                  {admin.status === 'active'
                                    ? 'deactivate'
                                    : 'activate'}{' '}
                                  the user account for {admin.name}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="w-full sm:w-auto">
                                  {admin.status === 'active'
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
  );
}
