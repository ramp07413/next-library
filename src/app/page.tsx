'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowRight,
  FaBookOpen,
  FaBuilding,
  FaUniversity,
  FaUser,
  FaCheckCircle,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollAnimation from '@/components/shared/scroll-animation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import MainLayout from '@/components/shared/main-layout';
import { Header } from '@radix-ui/react-accordion';
import Footer from '@/components/ui/footer';

const facilityImages = [
  PlaceHolderImages.find((p) => p.id === 'facility-1'),
  PlaceHolderImages.find((p) => p.id === 'facility-2'),
  PlaceHolderImages.find((p) => p.id === 'facility-3'),
  PlaceHolderImages.find((p) => p.id === 'facility-4'),
].filter(Boolean);

const testimonials = [
  {
    quote:
      'LibMan has completely transformed how we manage our library network. The insights we get from the company dashboard are invaluable.',
    name: 'Jane Doe',
    role: 'COO, Global Libraries Inc.',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-2')?.imageUrl || '',
  },
  {
    quote:
      'As a library admin, my job is so much easier now. Seat and student management is a breeze, and tracking payments is effortless.',
    name: 'John Smith',
    role: 'Admin, City Central FaUniversity',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-1')?.imageUrl || '',
  },
  {
    quote:
      'I love how easy it is to see my seat details and payment dues. The platform is super user-friendly for students!',
    name: 'Alice Johnson',
    role: 'Student, Tech Park FaUniversity',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-4')?.imageUrl || '',
  },
  {
    quote:
      "The analytics features are top-notch. We've been able to optimize our resource allocation and improve student satisfaction significantly.",
    name: 'Samuel Lee',
    role: 'Director of Operations',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-5')?.imageUrl || '',
  },
  {
    quote:
      'An incredible tool that has saved us countless hours. The UI is intuitive and the support has been fantastic.',
    name: 'Maria Garcia',
    role: 'Head Librarian, Westside Branch',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-3')?.imageUrl || '',
  },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div>
      <Header />
      <main className="flex-grow">
        <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg"
            alt="FaUniversity background"
            fill
            className="object-cover"
            data-ai-hint="library background"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline">
                The Modern Solution for FaUniversity Management
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Streamline operations, enhance student experience, and gain
                valuable insights with our all-in-one platform. Built for
                companies, libraries, and students.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started For Free <FaArrowRight className="ml-2" />
                  </Link>
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
              <h3 className="text-3xl font-bold font-headline">
                A Unified Platform for Everyone
              </h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                One solution to manage your entire library ecosystem, from
                high-level company oversight to the individual student
                experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <DashboardCard
                title="For Companies"
                description="Oversee all libraries, manage subscriptions, and view company-wide analytics."
                icon={<FaBuilding className="w-10 h-10 text-primary" />}
                href="/company"
              />
              <DashboardCard
                title="For Libraries"
                description="Manage seats, students, payments, and expenses for your specific library branch."
                icon={<FaUniversity className="w-10 h-10 text-primary" />}
                href="/library/1"
              />
              <DashboardCard
                title="For Students"
                description="View your seat details, track payments, and receive important alerts from your library."
                icon={<FaUser className="w-10 h-10 text-primary" />}
                href="/student"
              />
            </div>
          </ScrollAnimation>
        </section>

        <Separator className="my-0" />

        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-headline">
                What Our Users Say
              </h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Hear from companies and libraries that have transformed their
                operations with LibMan.
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
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full">
                        <CardContent className="pt-6 flex-grow">
                          <p className="text-muted-foreground italic">
                            "{testimonial.quote}"
                          </p>
                        </CardContent>
                        <CardHeader className="flex-row items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
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

        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* Ambient background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[120px] opacity-80"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px] opacity-80"></div>
          </div>

          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvZz48L3N2Zz4=')] bg-[length:30px_30px] opacity-[0.03] pointer-events-none"></div>

          <ScrollAnimation className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex flex-col items-center justify-center mb-16">
              {/* Title with floating effect */}
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-x-1/4 -inset-y-1/2 bg-gradient-radial from-primary/10 to-transparent blur-lg rounded-full"></div>
                <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tight">
                  Explore Our World-Class Facilities
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
                A modern, clean, and professional environment designed for focus
                and collaboration in the 2025 digital era.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {facilityImages.map(
                (img, index) =>
                  img && (
                    <div
                      key={index}
                      className="group relative h-80 sm:h-64 md:h-72 lg:h-80 xl:h-96"
                    >
                      {/* Background glow on hover */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      {/* Card with glass effect */}
                      <div className="h-full relative rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 group-hover:border-primary/20 shadow-xl transition-all duration-500">
                        {/* Image wrapper with masking effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 z-10"></div>

                        {/* Image */}
                        <Image
                          src={img.imageUrl}
                          alt={img.description}
                          width={800}
                          height={800}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          data-ai-hint={img.imageHint}
                        />

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                            {/* Title */}
                            <h3 className="text-white text-lg font-semibold font-headline mb-2">
                              {img.description || `Facility ${index + 1}`}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] opacity-70"></div>
          </div>

          <ScrollAnimation className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="relative inline-block">
              <div className="absolute -inset-x-1/3 -inset-y-1 bg-gradient-radial from-primary/10 to-transparent blur-sm rounded-full"></div>
              <h3 className="relative text-3xl md:text-4xl font-bold font-headline tracking-tight">
                Features at a Glance
              </h3>
            </div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto mb-14">
              Everything you need to run a modern library in the 2025 digital
              landscape.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: 'Multi-library Management',
                  description:
                    'Manage multiple library locations from one central dashboard.',
                },
                {
                  title: 'Student & Seat Administration',
                  description:
                    'Efficient seat allocation and student profile management.',
                },
                {
                  title: 'Billing & Payment Processing',
                  description:
                    'Secure payment processing with multiple payment options.',
                },
                {
                  title: 'AI-Powered Analytics',
                  description:
                    'Intelligent insights to optimize your library operations.',
                },
                {
                  title: 'Role-based Permissions',
                  description:
                    'Granular access control for staff and administrators.',
                },
                {
                  title: 'Customizable Theming',
                  description:
                    "Match your library's brand with custom theming options.",
                },
                {
                  title: 'Automated Alerts',
                  description:
                    'Timely notifications for students and administrators.',
                },
                {
                  title: 'Expense Tracking',
                  description:
                    'Comprehensive financial reporting and budget management.',
                },
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"></div>
                  <div className="relative flex flex-col h-full p-6 rounded-xl border border-border group-hover:border-primary/25 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg group-hover:translate-y-[-2px]">
                    <div className="h-12 w-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300">
                      <FaCheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-left">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground text-left">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </section>
        <Separator />
      </main>
      <Footer />
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
        <div className="bg-primary/10 p-4 rounded-full">{icon}</div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground flex-grow">{description}</p>
        <Link href={href} className="mt-4">
          <Button variant="ghost" className="w-full text-primary">
            Learn More <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <FaCheckCircle className="w-5 h-5 text-green-500" />
      <span className="font-medium">{children}</span>
    </div>
  );
}
