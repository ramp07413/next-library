
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
import { PlusCircle, FilePenLine, ShieldCheck, Trash2 } from 'lucide-react';
import { roles, type Role } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function RolesPage() {
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground">
            Manage user roles and their associated permissions.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>
                Create a new role and define its description.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Label htmlFor="role-name" className="text-right">
                  Role Name
                </Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Librarian"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Label htmlFor="role-desc" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="role-desc"
                  placeholder="Describe the role's purpose"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Create Role</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>System Roles</CardTitle>
            <CardDescription>
              A list of all roles in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Users</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TooltipProvider>
                    {roles.map((role) => (
                      <TableRow key={role.name}>
                        <TableCell className="font-medium">
                          <Badge
                            variant={getRoleBadgeVariant(role.name)}
                            className="capitalize whitespace-nowrap"
                          >
                            {role.name.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell className="text-center">
                          {role.userCount}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-start gap-2">
                            <Dialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <FilePenLine className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>Edit Role</TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>
                                    Edit Role:{' '}
                                    <span className="capitalize">
                                      {role.name.replace('_', ' ')}
                                    </span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="flex flex-col items-start gap-4">
                                    <Label
                                      htmlFor="role-desc-edit"
                                      className="text-right"
                                    >
                                      Description
                                    </Label>
                                    <Textarea
                                      id="role-desc-edit"
                                      defaultValue={role.description}
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
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" asChild>
                                  <Link href="/company/users/permissions">
                                    <ShieldCheck className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Permissions</TooltipContent>
                            </Tooltip>
                            <AlertDialog>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>Delete Role</TooltipContent>
                              </Tooltip>
                              <AlertDialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the{' '}
                                    <strong>
                                      {role.name.replace('_', ' ')}
                                    </strong>{' '}
                                    role.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Delete</AlertDialogAction>
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
