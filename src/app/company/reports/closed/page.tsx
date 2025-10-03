
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
import { Eye, FileUp, FileX } from "lucide-react";
import { reports } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ClosedReportsPage() {
  const [closedReports] = useState(
    reports.filter((r) => r.status === "closed")
  );
  
  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'maintenance':
        return 'default';
      case 'incident':
        return 'destructive';
      case 'feedback':
        return 'secondary';
      default:
        return 'outline';
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Closed Reports
        </h1>
        <p className="text-muted-foreground">
          A history of all resolved issues and feedback.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Closed Reports</CardTitle>
          <CardDescription>A list of all reports that have been marked as closed.</CardDescription>
        </CardHeader>
        <CardContent>
          {closedReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Library</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {closedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {report.title}
                    </TableCell>
                     <TableCell className="whitespace-nowrap">
                      {report.libraryName}
                    </TableCell>
                     <TableCell>
                      <Badge variant={getCategoryBadgeVariant(report.category)} className="capitalize">{report.category}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(report.date), "PP")}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <div className="flex items-center justify-center gap-2">
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
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <FileUp className="h-4 w-4" />
                                <span className="sr-only">Re-open Report</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Re-open Report</TooltipContent>
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
                <FileX className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Closed Reports</h3>
                <p>There are no closed reports to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
