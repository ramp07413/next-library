'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const libraryFormSchema = z.object({
  libraryName: z.string().min(2, {
    message: 'Library name must be at least 2 characters.',
  }),
  libraryEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  libraryContact: z.string().min(10, {
    message: 'Contact number must be at least 10 digits.',
  }),
  street: z.string().min(2, { message: 'Street is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().min(2, { message: 'State is required.' }),
  zip: z.string().min(5, { message: 'ZIP code must be at least 5 digits.' }),
});

type LibraryFormValues = z.infer<typeof libraryFormSchema>;

export default function RegisterLibraryPage() {
  const { toast } = useToast();
  const form = useForm<LibraryFormValues>({
    resolver: zodResolver(libraryFormSchema),
    defaultValues: {
      libraryName: '',
      libraryEmail: '',
      libraryContact: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  function onSubmit(data: LibraryFormValues) {
    console.log(data);
    toast({
      title: 'Library Registered',
      description: `The library "${data.libraryName}" has been successfully registered.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
          Register New Library
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Add a new library to your network by filling out the form below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library Details</CardTitle>
          <CardDescription>
            Provide the essential information for the new library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="libraryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Library Name</FormLabel>
                      <FormControl>
                        <Input placeholder="City Central Library" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="libraryEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Library Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@citycentral.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="libraryContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Library Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="123-456-7890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium">Library Address</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the physical address of the library.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Metropolis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP / Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Register Library
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
