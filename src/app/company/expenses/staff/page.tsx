
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
import { Eye, FilePenLine, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { expenses } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StaffExpensesPage() {
  const [staffExpenses] = useState(
    expenses.filter((e) => e.category === "staff")
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

      <Card>
        <CardHeader>
          <CardTitle>Staff Expense History</CardTitle>
          <CardDescription>A list of all recorded expenses for staff.</CardDescription>
        </CardHeader>
        <CardContent>
          {staffExpenses.length > 0 ? (
            <Table>
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
                    <TableCell>
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(expense.date), "PP")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={expense.type === 'recurring' ? "secondary" : "outline"} className="capitalize">
                        {expense.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <TooltipProvider>
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <FilePenLine className="h-4 w-4" />
                                <span className="sr-only">Edit Expense</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Expense</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
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
        </CardContent>
      </Card>
    </div>
  );
}
