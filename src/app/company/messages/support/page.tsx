
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
import { LifeBuoy, Search, Eye, CheckCircle } from "lucide-react";
import { messages } from "../data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SupportTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const supportTickets = messages.filter((m) => m.type === "support_ticket");

  const filteredTickets = supportTickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Support Tickets
        </h1>
        <p className="text-muted-foreground">
          Manage and respond to all incoming support requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Tickets</CardTitle>
          <CardDescription>
            A list of all open support tickets from libraries.
          </CardDescription>
           <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length > 0 ? (
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className={ticket.status === 'unread' ? 'font-bold' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={ticket.senderAvatar} alt={ticket.sender} data-ai-hint="person portrait" />
                            <AvatarFallback>{ticket.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {ticket.sender}
                        </div>
                      </TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === 'unread' ? 'destructive' : 'outline'}>
                          {ticket.status === 'unread' ? 'Open' : 'Resolved'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(ticket.date), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Ticket</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Ticket</TooltipContent>
                          </Tooltip>
                          {ticket.status === 'unread' && (
                             <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="sr-only">Mark as Resolved</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Mark as Resolved</TooltipContent>
                              </Tooltip>
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
        </CardContent>
      </Card>
    </div>
  );
}
