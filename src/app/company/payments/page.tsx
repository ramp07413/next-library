
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
import { Eye, Mail, CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { payments } from "./data";
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

export default function PaymentsPage() {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'secondary';
      case 'Pending':
        return 'default';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Payment History
        </h1>
        <p className="text-muted-foreground">
          Track and manage all library subscription payments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A list of all payments from libraries.</CardDescription>
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
            <Input placeholder="Filter by library..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Library</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Subscription</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.libraryName}
                  </TableCell>
                  <TableCell>
                    ${payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{payment.subscriptionPlan}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(payment.dueDate), "PP")}
                  </TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <TooltipProvider>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Details</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Send Reminder</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Send Reminder</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Mark as Paid</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Mark as Paid</TooltipContent>
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
