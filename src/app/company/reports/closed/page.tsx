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
import { Eye, FileUp, FileX } from 'lucide-react';
import { reports } from '../data';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function ClosedReportsPage() {
  const [closedReports] = useState(
    reports.filter((r) => r.status === 'closed')
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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
          Closed Reports
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          A history of all resolved issues and feedback.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>Closed Reports</CardTitle>
            <CardDescription>
              A list of all reports that have been marked as closed.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              {closedReports.length > 0 ? (
                <Table className="min-w-[900px] sm:min-w-[1000px]">
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
                    <TooltipProvider>
                      {closedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {report.title}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {report.libraryName}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getCategoryBadgeVariant(report.category)}
                              className="capitalize"
                            >
                              {report.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(report.date), 'PP')}
                          </TableCell>
                          <TableCell>
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
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                                <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <DialogHeader>
                                    <DialogTitle>{report.title}</DialogTitle>
                                    <DialogDescription>
                                      Report ID: {report.id}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-2">
                                    <p>
                                      <strong>Library:</strong>{' '}
                                      {report.libraryName}
                                    </p>
                                    <p>
                                      <strong>Submitted By:</strong>{' '}
                                      {report.submittedBy}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{' '}
                                      {format(new Date(report.date), 'PPP')}
                                    </p>
                                    <p>
                                      <strong>Status:</strong>{' '}
                                      <Badge
                                        variant="outline"
                                        className="capitalize"
                                      >
                                        {report.status}
                                      </Badge>
                                    </p>
                                    <p>
                                      <strong>Category:</strong>{' '}
                                      <Badge
                                        variant={getCategoryBadgeVariant(
                                          report.category
                                        )}
                                        className="capitalize"
                                      >
                                        {report.category}
                                      </Badge>
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
                                      >
                                        <FileUp className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Re-open Report
                                  </TooltipContent>
                                </Tooltip>
                                <AlertDialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to re-open this
                                      report?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will mark "{report.title}" as open
                                      and it will appear in the open reports
                                      list.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                      Re-open
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
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <FileX className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-semibold">No Closed Reports</h3>
                  <p>There are no closed reports to display.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
