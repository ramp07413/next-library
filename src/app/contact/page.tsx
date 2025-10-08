
"use client";

import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ScrollAnimation from "@/components/shared/scroll-animation";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="container mx-auto flex flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">LibMan</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We’d love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold font-headline">Contact Information</h3>
                <p className="text-muted-foreground">
                  Find us at our office, drop us a line via email, or give us a call. We're here to help.
                </p>
                <div className="space-y-6">
                  <InfoItem icon={<MapPin />}>
                    123 Main St, Metropolis, NY 10001, USA
                  </InfoItem>
                  <InfoItem icon={<Mail />}>
                    contact@libman.com
                  </InfoItem>
                  <InfoItem icon={<Phone />}>
                    (123) 456-7890
                  </InfoItem>
                </div>
                <div className="h-80 w-full rounded-lg overflow-hidden shadow-md">
                   <Image
                      src="https://images.unsplash.com/photo-1541692349887-131ea6a4a1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXAlMjBvZiUyMG5ldyUyMHlvcmt8ZW58MHx8fHwxNzU5Mjc2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Map"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="map new york"
                    />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold font-headline mb-4">Send us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Pricing Inquiry" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message here..." rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800">
          <p className="text-left text-sm text-white">&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function InfoItem({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full flex-shrink-0">
                {icon}
            </div>
            <div className="font-medium text-lg pt-1">{children}</div>
        </div>
    )
}

    
