import React from 'react';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <FaBookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">LibMan</h1>
        </Link>
        <nav className="hidden md:flex justify-center flex-grow">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/membership">Membership</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/events">Events</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/careers">Careers</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </nav>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
