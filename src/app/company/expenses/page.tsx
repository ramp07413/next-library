
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
import { Eye, FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { expenses } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function ExpensesPage() {
   const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'staff':
        return 'default';
      case 'utilities':
        return 'secondary';
      case 'marketing':
        return 'destructive';
      case 'supplies':
        return 'outline';
       case 'maintenance':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Expenses
          </h1>
          <p className="text-muted-foreground">
            Track and manage all company-level expenses.
          </p>
        </div>
         <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" placeholder="e.g., Office supplies" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" type="number" placeholder="e.g., 500" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Add Expense</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>A list of all recorded expenses.</CardDescription>
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
            <Input placeholder="Filter by description..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell text-center">Type</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getCategoryBadgeVariant(expense.category)} className="capitalize">
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(expense.date), "PP")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      <Badge variant={expense.type === 'recurring' ? "secondary" : "outline"} className="capitalize whitespace-nowrap">
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                        <Dialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DialogTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <FilePenLine className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Edit Expense</TooltipContent>
                          </Tooltip>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Expense</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">Description</Label>
                                <Input id="edit-description" defaultValue={expense.description} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-amount" className="text-right">Amount</Label>
                                <Input id="edit-amount" type="number" defaultValue={expense.amount} className="col-span-3" />
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
                            <TooltipTrigger asChild>
                              <DialogTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Expense Details</DialogTitle>
                              <DialogDescription>{expense.description}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                               <p><strong>ID:</strong> {expense.id}</p>
                               <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p>
                               <p><strong>Date:</strong> {format(new Date(expense.date), "PP")}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the expense: "{expense.description}".
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
