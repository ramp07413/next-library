
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { events, type LibraryEvent } from "./data";
import { format } from "date-fns";
import ScrollAnimation from "@/components/shared/scroll-animation";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter(
    (event) => filter === "all" || event.category === filter
  );

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
              Upcoming Events
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover workshops, author talks, and community gatherings at your
              library.
            </p>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end mb-8">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Book Reading">Book Reading</SelectItem>
                  <SelectItem value="Author Talk">Author Talk</SelectItem>
                  <SelectItem value="Community Event">Community Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="flex flex-col">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover rounded-t-lg"
                          data-ai-hint={event.imageHint}
                        />
                      </div>
                      <div className="p-6">
                        <CardTitle>{event.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">
                        {event.description}
                      </p>
                      <div className="mt-4 space-y-2 text-sm">
                        <InfoItem icon={<Calendar />} text={format(new Date(event.date), "PPP p")} />
                        <InfoItem icon={<MapPin />} text={event.location} />
                        <InfoItem icon={<Tag />} text={event.category} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full">
                        Register Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No events found for the selected category.</p>
                </div>
            )}
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800">
          <p className="text-left text-sm text-white">
            &copy; {new Date().getFullYear()} LibMan Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}
