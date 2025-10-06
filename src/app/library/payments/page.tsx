
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
import { MoreHorizontal, Search, Eye, Mail, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { payments } from "./data";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LibraryPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredPayments = payments
    .filter(payment => statusFilter === 'all' || payment.status === statusFilter)
    .filter(payment => 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Student Payments
        </h1>
        <p className="text-muted-foreground">
          Track and manage all student fee payments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>A list of all payments from students.</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by student..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                       <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={payment.studentAvatar} alt={payment.studentName} data-ai-hint="person portrait" />
                          <AvatarFallback>{payment.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{payment.studentName}</p>
                          <p className="text-sm text-muted-foreground">ID: {payment.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.dueDate), "PP")}
                    </TableCell>
                    <TableCell>
                      {payment.paidDate ? format(new Date(payment.paidDate), "PP") : <span className="text-muted-foreground">N/A</span>}
                    </TableCell>
                     <TableCell>
                      <Badge variant={getStatusBadgeVariant(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                          {payment.status !== 'Paid' && (
                              <>
                                  <Tooltip>
                                      <TooltipTrigger asChild>
                                          <Button size="icon" variant="ghost"><Mail className="h-4 w-4" /></Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Send Reminder</TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                      <TooltipTrigger asChild>
                                          <Button size="icon" variant="ghost" className="text-green-600"><CheckCircle className="h-4 w-4" /></Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Mark as Paid</TooltipContent>
                                  </Tooltip>
                              </>
                          )}
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
