
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
import { FilePenLine, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { users } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UsersPage() {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'destructive';
      case 'super_admin':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Users
          </h1>
          <p className="text-muted-foreground">
            Manage all users and their permissions.
          </p>
        </div>
        <Button>Add New User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="hidden sm:table-cell text-center">Status</TableHead>
                <TableHead className="hidden md:table-cell text-center">Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRoleBadgeVariant(user.role)} className="whitespace-nowrap">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center">
                    <Badge variant={user.isActive ? "secondary" : "outline"} className="whitespace-nowrap">
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {format(new Date(user.createdAt), "PP")}
                  </TableCell>
                  <TableCell>
                     <TooltipProvider>
                      <div className="flex items-center justify-start gap-1 sm:gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <FilePenLine className="h-4 w-4" />
                              <span className="sr-only">Edit User</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit User</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <ShieldCheck className="h-4 w-4" />
                              <span className="sr-only">View Permissions</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Permissions</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" className={user.isActive ? "text-destructive" : "text-green-600"}>
                              {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                              <span className="sr-only">{user.isActive ? 'Deactivate User' : 'Activate User'}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{user.isActive ? 'Deactivate User' : 'Activate User'}</TooltipContent>
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
