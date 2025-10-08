
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Building, Library, User, CheckCircle, Twitter, Facebook, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollAnimation from "@/components/shared/scroll-animation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const facilityImages = [
  PlaceHolderImages.find(p => p.id === 'facility-1'),
  PlaceHolderImages.find(p => p.id === 'facility-2'),
  PlaceHolderImages.find(p => p.id === 'facility-3'),
  PlaceHolderImages.find(p => p.id === 'facility-4'),
].filter(Boolean);

const testimonials = [
  {
    quote: "LibMan has completely transformed how we manage our library network. The insights we get from the company dashboard are invaluable.",
    name: "Jane Doe",
    role: "COO, Global Libraries Inc.",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || ''
  },
  {
    quote: "As a library admin, my job is so much easier now. Seat and student management is a breeze, and tracking payments is effortless.",
    name: "John Smith",
    role: "Admin, City Central Library",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || ''
  },
  {
    quote: "I love how easy it is to see my seat details and payment dues. The platform is super user-friendly for students!",
    name: "Alice Johnson",
    role: "Student, Tech Park Library",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || ''
  },
  {
    quote: "The analytics features are top-notch. We've been able to optimize our resource allocation and improve student satisfaction significantly.",
    name: "Samuel Lee",
    role: "Director of Operations",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || ''
  },
  {
    quote: "An incredible tool that has saved us countless hours. The UI is intuitive and the support has been fantastic.",
    name: "Maria Garcia",
    role: "Head Librarian, Westside Branch",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || ''
  }
];


export default function Home() {
   const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="container mx-auto flex flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold font-headline">LibMan</h1>
            </div>
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
        <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg"
            alt="Library background"
            fill
            className="object-cover"
            data-ai-hint="library background"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline">
                The Modern Solution for Library Management
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Streamline operations, enhance student experience, and gain valuable insights with our all-in-one platform. Built for companies, libraries, and students.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild>
                      <Link href="/signup">Get Started For Free <ArrowRight className="ml-2" /></Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                      <Link href="/company">View Company Demo</Link>
                  </Button>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        <Separator className="my-0" />

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">A Unified Platform for Everyone</h3>
                  <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">One solution to manage your entire library ecosystem, from high-level company oversight to the individual student experience.</p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <DashboardCard
                  title="For Companies"
                  description="Oversee all libraries, manage subscriptions, and view company-wide analytics."
                  icon={<Building className="w-10 h-10 text-primary" />}
                  href="/company"
                  />
                  <DashboardCard
                  title="For Libraries"
                  description="Manage seats, students, payments, and expenses for your specific library branch."
                  icon={<Library className="w-10 h-10 text-primary" />}
                  href="/library/1"
                  />
                  <DashboardCard
                  title="For Students"
                  description="View your seat details, track payments, and receive important alerts from your library."
                  icon={<User className="w-10 h-10 text-primary" />}
                  href="/student"
                  />
              </div>
          </ScrollAnimation>
        </section>

        <Separator className="my-0" />
        
        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">What Our Users Say</h3>
                  <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                      Hear from companies and libraries that have transformed their operations with LibMan.
                  </p>
              </div>
              <Carousel 
                plugins={[plugin.current]}
                className="w-full max-w-4xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                  <CarouselContent>
                      {testimonials.map((testimonial, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                              <Card className="flex flex-col h-full">
                                  <CardContent className="pt-6 flex-grow">
                                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                  </CardContent>
                                  <CardHeader className="flex-row items-center gap-4">
                                      <Avatar className="h-12 w-12">
                                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait" />
                                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-semibold">{testimonial.name}</p>
                                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                      </div>
                                  </CardHeader>
                              </Card>
                            </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </ScrollAnimation>
        </section>


        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">Explore Our World-Class Facilities</h3>
                  <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                      A modern, clean, and professional environment designed for focus and collaboration.
                  </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {facilityImages.map((img, index) => img && (
                      <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
                          <Image
                              src={img.imageUrl}
                              alt={img.description}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                              data-ai-hint={img.imageHint}
                          />
                      </div>
                  ))}
              </div>
          </ScrollAnimation>
        </section>
        
        <Separator className="my-0" />

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="text-3xl font-bold font-headline">Features at a Glance</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto mb-12">Everything you need to run a modern library, and more.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-5xl mx-auto">
                  <FeatureItem>Multi-library Management</FeatureItem>
                  <FeatureItem>Student & Seat Administration</FeatureItem>
                  <FeatureItem>Billing & Payment Processing</FeatureItem>
                  <FeatureItem>AI-Powered Analytics</FeatureItem>
                  <FeatureItem>Role-based Permissions</FeatureItem>
                  <FeatureItem>Customizable Theming</FeatureItem>
                  <FeatureItem>Automated Alerts</FeatureItem>
                  <FeatureItem>Expense Tracking</FeatureItem>
                </div>
          </ScrollAnimation>
        </section>
        <Separator />
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold font-headline text-white">LibMan</h3>
              </div>
              <p className="mt-4 text-sm text-white">
                The ultimate SaaS platform for modern library management. Streamline your operations and provide a better experience for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-white hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-white hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-white hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/login" className="text-white hover:text-primary transition-colors">Login</Link></li>
                <li><Link href="/signup" className="text-white hover:text-primary transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-white">Follow Us</h4>
              <div className="flex mt-4 space-x-4 text-white">
                <Link href="#" className="hover:text-primary transition-colors"><Twitter /></Link>
                <Link href="#" className="hover:text-primary transition-colors"><Facebook /></Link>
                <Link href="#" className="hover:text-primary transition-colors"><Instagram /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-white">
            <p>&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function DashboardCard({ title, description, icon, href }: DashboardCardProps) {
  return (
    <Card className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardHeader className="flex flex-col items-center gap-4 space-y-0 pb-2">
        <div className="bg-primary/10 p-4 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground flex-grow">{description}</p>
        <Link href={href} className="mt-4">
          <Button variant="ghost" className="w-full text-primary">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">{children}</span>
        </div>
    )
}

    