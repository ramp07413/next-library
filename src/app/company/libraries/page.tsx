
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
import { FilePenLine, Eye, Trash2 } from "lucide-react";
import { libraries } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import { Input } from "@/components/ui/input";

export default function LibrariesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Libraries
          </h1>
          <p className="text-muted-foreground">
            Manage all the libraries in your network.
          </p>
        </div>
        <Button asChild>
          <Link href="/company/libraries/register">Add New Library</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library List</CardTitle>
          <CardDescription>A list of all registered libraries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Library Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {libraries.map((library) => (
                  <TableRow key={library.id}>
                    <TableCell className="font-medium">
                      {library.libraryName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{library.libraryEmail}</div>
                      <div className="text-muted-foreground text-sm">{library.libraryContact}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {`${library.libraryAddress.street}, ${library.libraryAddress.city}, ${library.libraryAddress.state} ${library.libraryAddress.zip}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={library.isActive ? "secondary" : "outline"}>
                        {library.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                        <Dialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DialogTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <FilePenLine className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Edit Library</TooltipContent>
                          </Tooltip>
                           <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit {library.libraryName}</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">Name</Label>
                                  <Input id="name" defaultValue={library.libraryName} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">Email</Label>
                                  <Input id="email" defaultValue={library.libraryEmail} className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="submit">Save changes</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                               <DialogTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                           <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{library.libraryName}</DialogTitle>
                                <DialogDescription>ID: {library.id}</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p><strong>Email:</strong> {library.libraryEmail}</p>
                                <p><strong>Contact:</strong> {library.libraryContact}</p>
                                <p><strong>Address:</strong> {`${library.libraryAddress.street}, ${library.libraryAddress.city}, ${library.libraryAddress.state} ${library.libraryAddress.zip}`}</p>
                                <p><strong>Status:</strong> {library.isActive ? "Active" : "Inactive"}</p>
                              </div>
                            </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                               <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Delete Library</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the library "{library.libraryName}".
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
        </CardContent>
      </Card>
    </div>
  );
}
