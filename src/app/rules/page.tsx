
"use client";

import Link from "next/link";
import { BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/shared/scroll-animation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RulesAndRegulationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="container mx-auto flex flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">LibMan</h1>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Quick Links <ChevronDown className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild><Link href="/about">About Us</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/membership">Membership</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/events">Events</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/careers">Careers</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/gallery">Gallery</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/contact">Contact</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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
              Library Rules & Regulations
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Guidelines for a safe, respectful, and productive environment for all members.
            </p>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h3>1. General Conduct</h3>
              <p>Users are expected to behave in a respectful and considerate manner. Disruptive behavior, including loud conversations, playing music without headphones, or harassment of any kind, is strictly prohibited.</p>
              
              <h3>2. Borrowing and Returning</h3>
              <p>A valid library membership is required to borrow materials. The loan period for most items is 14 days, with an option for renewal if the item is not reserved by another user. All materials must be returned to the main desk.</p>
              
              <h3>3. Late Fees and Fines</h3>
              <p>A fine of $0.25 per day is charged for each overdue item. Fines for lost or damaged items will be assessed based on the replacement cost of the item plus a processing fee. Borrowing privileges will be suspended for accounts with outstanding fines exceeding $10.00.</p>
              
              <h3>4. Seat and Study Area Usage</h3>
              <p>Seats are available on a first-come, first-served basis unless assigned through the LibMan platform. Personal belongings should not be left unattended to "reserve" a seat. The library is not responsible for lost or stolen items.</p>
              
              <h3>5. Food and Drink</h3>
              <p>Covered drinks are permitted. No food is allowed in the main reading areas or near computer terminals. Please consume all meals in designated areas only.</p>

              <h3>6. Use of Library Computers and Wi-Fi</h3>
              <p>Library computers and the Wi-Fi network are provided for educational and informational purposes. Accessing illegal or inappropriate content is strictly forbidden and may result in the termination of library privileges.</p>

              <h3>7. Compliance</h3>
              <p>Failure to comply with these rules and regulations may result in a warning, suspension of library privileges, or, in severe cases, permanent expulsion from the library.</p>
            </div>
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800 text-center">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
