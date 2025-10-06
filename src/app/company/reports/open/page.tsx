
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
import { FileCheck, Eye } from "lucide-react";
import { reports } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openReports.map((report) => (
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
                                <DialogTitle>{report.title}</DialogTitle>
                                <DialogDescription>
                                  Report ID: {report.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-2">
                                <p><strong>Library:</strong> {report.libraryName}</p>
                                <p><strong>Submitted By:</strong> {report.submittedBy}</p>
                                <p><strong>Date:</strong> {format(new Date(report.date), "PPP")}</p>
                                <p><strong>Status:</strong> <Badge variant="destructive" className="capitalize">{report.status}</Badge></p>
                                <p><strong>Category:</strong> <Badge variant={getCategoryBadgeVariant(report.category)} className="capitalize">{report.category}</Badge></p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="text-green-600">
                                    <FileCheck className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent>Mark as Closed</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will mark the report "{report.title}" as closed.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Mark as Closed</AlertDialogAction>
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
