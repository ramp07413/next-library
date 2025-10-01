
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
import { MoreHorizontal, FileCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reports } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";

export default function OpenReportsPage() {
  const [openReports] = useState(
    reports.filter((r) => r.status === "open")
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
          Open Reports
        </h1>
        <p className="text-muted-foreground">
          Track and manage all unresolved issues and feedback.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Reports</CardTitle>
          <CardDescription>A list of all reports that require attention.</CardDescription>
        </CardHeader>
        <CardContent>
          {openReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Library</TableHead>
                   <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.title}
                    </TableCell>
                    <TableCell>
                      {report.libraryName}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryBadgeVariant(report.category)} className="capitalize">{report.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.date), "PP")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Closed</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <FileCheck className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold">No Open Reports</h3>
                <p>All reports have been resolved.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
