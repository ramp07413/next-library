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
import { Eye, FilePenLine, Trash2, Users } from 'lucide-react';
import { expenses } from '../data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
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
import { Input } from '@/components/ui/input';

export default function StaffExpensesPage() {
  const [staffExpenses] = useState(
    expenses.filter((e) => e.category === 'staff')
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Staff Expenses
        </h1>
        <p className="text-muted-foreground">
          Track and manage all staff-related expenses.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Staff Expense History</CardTitle>
            <CardDescription>
              A list of all recorded expenses for staff.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              {staffExpenses.length > 0 ? (
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Type</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">
                          {expense.description}
                        </TableCell>
                        <TableCell>${expense.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {format(new Date(expense.date), 'PP')}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              expense.type === 'recurring'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="capitalize"
                          >
                            {expense.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <div className="flex items-center justify-center gap-2">
                              <Dialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <FilePenLine className="h-4 w-4" />
                                        <span className="sr-only">
                                          Edit Expense
                                        </span>
                                      </Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit Expense</TooltipContent>
                                </Tooltip>
                                <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <DialogHeader>
                                    <DialogTitle>Edit Expense</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex flex-col items-start gap-4">
                                      <Label
                                        htmlFor="edit-description"
                                        className="text-right"
                                      >
                                        Description
                                      </Label>
                                      <Input
                                        id="edit-description"
                                        defaultValue={expense.description}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col items-start gap-4">
                                      <Label
                                        htmlFor="edit-amount"
                                        className="text-right"
                                      >
                                        Amount
                                      </Label>
                                      <Input
                                        id="edit-amount"
                                        type="number"
                                        defaultValue={expense.amount}
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
                              <Dialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">
                                          View Details
                                        </span>
                                      </Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                                <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <DialogHeader>
                                    <DialogTitle>Expense Details</DialogTitle>
                                    <DialogDescription>
                                      {expense.description}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>
                                      <strong>ID:</strong> {expense.id}
                                    </p>
                                    <p>
                                      <strong>Amount:</strong> $
                                      {expense.amount.toFixed(2)}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{' '}
                                      {format(new Date(expense.date), 'PP')}
                                    </p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                        className="text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                                <AlertDialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the expense:
                                      "{expense.description}".
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <Users className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-semibold">No Staff Expenses</h3>
                  <p>There are no staff expenses recorded yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
