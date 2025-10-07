
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
import { Search, FilePenLine, Eye, Trash2, PlusCircle } from 'lucide-react';
import { expenses, type LibraryExpense } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export default function LibraryExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getCategoryBadgeVariant = (category: LibraryExpense['category']) => {
    switch (category) {
      case 'rent':
        return 'default';
      case 'staff':
        return 'secondary';
      case 'books':
        return 'destructive';
      case 'utilities':
        return 'outline';
      case 'events':
        return 'default';
      default:
        return 'outline';
    }
  };

  const filteredExpenses = expenses
    .filter(
      (expense) =>
        categoryFilter === 'all' || expense.category === categoryFilter
    )
    .filter((expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Library Expenses
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track and manage all branch-level expenses.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new expense.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="new-description"
                  placeholder="e.g., New book order"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="new-amount"
                  type="number"
                  placeholder="e.g., 500"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-Time</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Add Expense</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:block gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Expense History</CardTitle>
            <CardDescription className="text-sm">
              A list of all recorded expenses for this library.
            </CardDescription>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
              <div className="relative flex-1 sm:flex-initial sm:min-w-[200px] lg:min-w-[320px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by description..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[900px] md:min-w-[950px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className='min-w-[25%]'>Description</TableHead>
                    <TableHead className='min-w-[15%]'>Category</TableHead>
                    <TableHead className='min-w-[25%]'>Amount</TableHead>
                    <TableHead className='min-w-[25%]'>Date</TableHead>
                    <TableHead className='min-w-[25%]'>Type</TableHead>
                    <TableHead className='min-w-[15%]'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TooltipProvider>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium text-sm md:text-base">
                          {expense.description}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getCategoryBadgeVariant(expense.category)}
                            className="capitalize text-xs md:text-sm"
                          >
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm md:text-base font-medium">
                          ${expense.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm md:text-base">
                          {format(new Date(expense.date), 'PP')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              expense.type === 'recurring'
                                ? 'secondary'
                                : 'outline'
                            }
                            className="capitalize text-xs md:text-sm"
                          >
                            {expense.type}
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
                                <TooltipContent>Edit Expense</TooltipContent>
                              </Tooltip>
                              <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                <DialogHeader className="space-y-2">
                                  <DialogTitle className="text-base md:text-lg">
                                    Edit Expense
                                  </DialogTitle>
                                  <DialogDescription className="text-xs md:text-sm">
                                    Update the details for this expense.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="description"
                                      className="text-right"
                                    >
                                      Description
                                    </Label>
                                    <Input
                                      id="description"
                                      defaultValue={expense.description}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="amount"
                                      className="text-right"
                                    >
                                      Amount
                                    </Label>
                                    <Input
                                      id="amount"
                                      type="number"
                                      defaultValue={expense.amount}
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
                                    Expense Details
                                  </DialogTitle>
                                  <DialogDescription className="text-xs md:text-sm break-words">
                                    {expense.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3 py-4 text-xs md:text-sm">
                                  <p>
                                    <span className="font-semibold">ID:</span>{' '}
                                    {expense.id}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Amount:</span>{' '}
                                    ${expense.amount.toFixed(2)}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Date:</span>{' '}
                                    {format(new Date(expense.date), 'PPP')}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Category:
                                    </span>{' '}
                                    <Badge
                                      variant={getCategoryBadgeVariant(
                                        expense.category
                                      )}
                                      className="capitalize"
                                    >
                                      {expense.category}
                                    </Badge>
                                  </p>
                                  <p>
                                    <span className="font-semibold">Type:</span>{' '}
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
                                      className="text-destructive h-8 w-8 md:h-9 md:w-9"
                                    >
                                      <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>Delete Expense</TooltipContent>
                              </Tooltip>
                              <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
                                <AlertDialogHeader className="space-y-2">
                                  <AlertDialogTitle className="text-base md:text-lg">
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-xs md:text-sm">
                                    This action cannot be undone. This will
                                    permanently delete the expense record for "
                                    {expense.description}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                  <AlertDialogCancel className="mt-0 w-full sm:w-auto">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction className="w-full sm:w-auto">
                                    Delete
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
