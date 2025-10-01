
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
import { MoreHorizontal, Search, Inbox, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { messages, type Message } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AllMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const getTypeBadgeVariant = (type: Message['type']) => {
    switch (type) {
      case 'library_comm':
        return 'secondary';
      case 'support_ticket':
        return 'destructive';
      case 'announcement':
        return 'default';
      default:
        return 'outline';
    }
  };

  const filteredMessages = messages
    .filter(message => typeFilter === 'all' || message.type === typeFilter)
    .filter(message => 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
                All Messages
            </h1>
            <p className="text-muted-foreground">
                View and manage all communications from a single inbox.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Showing {filteredMessages.length} of {messages.length} messages.
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="library_comm">Library Comm</SelectItem>
                <SelectItem value="support_ticket">Support Ticket</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMessages.length > 0 ? (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredMessages.map((message) => (
                    <TableRow key={message.id} className={message.status === 'unread' ? 'font-bold' : ''}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={message.senderAvatar} alt={message.sender} data-ai-hint="person portrait" />
                                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {message.sender}
                        </div>
                    </TableCell>
                    <TableCell>
                        {message.subject}
                        <p className="font-normal text-sm text-muted-foreground truncate max-w-xs">{message.content}</p>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getTypeBadgeVariant(message.type)} className="capitalize">
                            {message.type.replace('_', ' ')}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        {formatDistanceToNow(new Date(message.date), { addSuffix: true })}
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
                            <DropdownMenuItem>View Message</DropdownMenuItem>
                            {message.status === 'unread' && <DropdownMenuItem>Mark as Read</DropdownMenuItem>}
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <Inbox className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold">No Messages Found</h3>
                    <p>There are no messages matching your search or filter.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
