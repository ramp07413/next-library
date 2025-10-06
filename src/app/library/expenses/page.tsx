
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
import { Search, FilePenLine, Eye, Trash2, PlusCircle } from "lucide-react";
import { expenses, type LibraryExpense } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LibraryExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

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
    .filter(expense => categoryFilter === 'all' || expense.category === categoryFilter)
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
                Library Expenses
            </h1>
            <p className="text-muted-foreground">
                Track and manage all branch-level expenses.
            </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>A list of all recorded expenses for this library.</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by description..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryBadgeVariant(expense.category)} className="capitalize">
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(expense.date), "PP")}
                    </TableCell>
                     <TableCell>
                      <Badge variant={expense.type === 'recurring' ? "secondary" : "outline"} className="capitalize">
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center justify-start gap-1 sm:gap-2">
                           <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"><FilePenLine className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Expense</TooltipContent>
                           </Tooltip>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                           </Tooltip>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Expense</TooltipContent>
                           </Tooltip>
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
