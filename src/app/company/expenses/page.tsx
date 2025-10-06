
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
        <Button>Add New Expense</Button>
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
                    <TooltipProvider>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
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
                        <Tooltip>
                           <TooltipTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete Expense</span>
                            </Button>
                          </TooltipTrigger>
                           <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
