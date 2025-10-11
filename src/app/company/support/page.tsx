
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
import { FaCheckCircle } from 'react-icons/fa';
import { messages, type Message } from './data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Eye, Search, LifeBuoy } from 'lucide-react';

export default function AllMessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const supportTickets = messages.filter((m) => m.type === 'support_ticket');

  const filteredTickets = supportTickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
            Support Tickets
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and respond to all incoming support requests.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-7 lg:col-span-2">
        <Card className="lg:col-span-7 overflow-hidden">
          <CardHeader>
            <CardTitle>Active Tickets</CardTitle>
            <CardDescription>
              Showing {filteredTickets.length} of {supportTickets.length}{' '}
              support tickets.
            </CardDescription>
            <div className="flex items-center gap-2 pt-4">
              <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by subject or sender..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              {filteredTickets.length > 0 ? (
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow
                          key={ticket.id}
                          className={
                            ticket.status === 'unread' ? 'font-bold' : ''
                          }
                        >
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                <AvatarImage
                                  src={ticket.senderAvatar}
                                  alt={ticket.sender}
                                  data-ai-hint="person portrait"
                                />
                                <AvatarFallback>
                                  {ticket.sender.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm sm:text-base">
                                {ticket.sender}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <span className="text-sm sm:text-base">
                              {ticket.subject}
                            </span>
                            <p className="font-normal text-xs sm:text-sm text-muted-foreground truncate max-w-[150px] sm:max-w-xs">
                              {ticket.content}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                ticket.status === 'unread'
                                  ? 'destructive'
                                  : 'outline'
                              }
                            >
                              {ticket.status === 'unread' ? 'Open' : 'Resolved'}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {formatDistanceToNow(new Date(ticket.date), {
                              addSuffix: true,
                            })}
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
                                  <TooltipContent>View Ticket</TooltipContent>
                                </Tooltip>
                                <DialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                  <DialogHeader>
                                    <DialogTitle>{ticket.subject}</DialogTitle>
                                    <DialogDescription>
                                      From: {ticket.sender}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>{ticket.content}</p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {ticket.status === 'unread' && (
                                <AlertDialog>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                          className="text-green-600"
                                        >
                                          <FaCheckCircle className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Mark as Resolved
                                    </TooltipContent>
                                  </Tooltip>
                                  <AlertDialogContent className="max-w-[95vw] sm:max-w-md rounded-md">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will mark the ticket "
                                        {ticket.subject}" as resolved.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction>
                                        Mark as Resolved
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TooltipProvider>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <LifeBuoy className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-semibold">No Open Tickets</h3>
                  <p>There are no active support tickets at the moment.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
