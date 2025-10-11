
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { modules, rolePermissions } from './data';
import { roles } from '../roles/data';
import { ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PermissionsPage() {
  const [selectedRole, setSelectedRole] =
    useState<keyof typeof rolePermissions>('owner');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Permissions Updated',
      description: `Permissions for the "${selectedRole.replace(
        '_',
        ' '
      )}" role have been saved.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Permissions
        </h1>
        <p className="text-muted-foreground">
          Define what users can see and do based on their roles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between">
            <div>
              <CardTitle>Role-Based Permissions</CardTitle>
              <CardDescription>
                Select a role to view and edit its permissions.
              </CardDescription>
            </div>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setSelectedRole(value as keyof typeof rolePermissions)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.name} value={role.name}>
                    <span className="capitalize">
                      {role.name.replace('_', ' ')}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion
            type="multiple"
            defaultValue={modules.map((m) => m.name)}
            className="w-full"
          >
            {modules.map((module) => (
              <AccordionItem key={module.name} value={module.name}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{module.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 pl-8 pt-2">
                    {module.permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={permission.id}
                          checked={rolePermissions[selectedRole].includes(
                            permission.id
                          )}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={permission.id}
                            className="cursor-pointer"
                          >
                            {permission.description}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Action:{' '}
                            <code className="bg-muted px-1.5 py-0.5 rounded-sm">
                              {permission.action}
                            </code>
                            , Subject:{' '}
                            <code className="bg-muted px-1.5 py-0.5 rounded-sm">
                              {permission.subject}
                            </code>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
