
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
import { PlusCircle, FilePenLine, ShieldCheck, Trash2 } from "lucide-react";
import { roles } from "./data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RolesPage() {

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground">
            Manage user roles and their associated permissions.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>A list of all roles in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="font-medium">
                     <Badge variant={getRoleBadgeVariant(role.name)} className="capitalize whitespace-nowrap">
                      {role.name.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                   <TableCell>{role.description}</TableCell>
                   <TableCell className="text-center">{role.userCount}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <div className="flex items-center justify-start gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <FilePenLine className="h-4 w-4" />
                              <span className="sr-only">Edit Role</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit Role</TooltipContent>
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
                            <Button size="icon" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete Role</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete Role</TooltipContent>
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
