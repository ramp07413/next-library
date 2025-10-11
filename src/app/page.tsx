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
import Header from '@/components/ui/header';
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

        <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                A Unified Platform for Everyone
              </h3>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                One solution to manage your entire library ecosystem, from
                high-level company oversight to the individual student
                experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
              <DashboardCard
                title="For Companies"
                description="Oversee all libraries, manage subscriptions, and view company-wide analytics with comprehensive insights."
                icon={<FaBuilding className="w-16 h-16" />}
                href="/company"
                variant="blue"
              />
              <DashboardCard
                title="For Libraries"
                description="Manage seats, students, payments, and expenses for your specific library branch with advanced tools."
                icon={<FaUniversity className="w-16 h-16" />}
                href="/library/1"
                variant="orange"
                featured={true}
              />
              <DashboardCard
                title="For Students"
                description="View your seat details, track payments, and receive important alerts from your library instantly."
                icon={<FaUser className="w-16 h-16" />}
                href="/student"
                variant="green"
              />
            </div>
          </ScrollAnimation>
        </section>

        <section className="py-24 lg:py-32 relative overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02]" />
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating orbs with different animations */}
            <div
              className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-[150px] opacity-60 animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-l from-secondary/8 to-primary/8 rounded-full blur-[120px] opacity-50"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-[100px] opacity-40"
              style={{ animation: 'float 8s ease-in-out infinite reverse' }}
            />
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-20 left-20 w-6 h-6 border border-primary/20 rounded-sm rotate-45 animate-spin"
              style={{ animationDuration: '20s' }}
            />
            <div
              className="absolute top-40 right-32 w-4 h-4 bg-accent/30 rounded-full animate-bounce"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute bottom-32 left-1/3 w-8 h-8 border-2 border-secondary/20 rounded-full animate-pulse"
              style={{ animationDuration: '3s' }}
            />
          </div>

          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
                We Care About Our Customers
                <br />
                <span className="text-primary">Experience Too</span>
              </h3>

              <p className="mt-6 text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
                Discover why thousands of libraries and institutions trust our
                platform
                <span className="block mt-2 text-lg opacity-80">
                  Real stories from real customers who've transformed their
                  operations
                </span>
              </p>
            </div>

            {/* Enhanced Carousel */}
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-7xl mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-3 md:-ml-6">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-3 md:pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="h-full group">
                      <Card
                        className={`
                        relative h-full overflow-hidden transition-all duration-700 ease-out transform
                        hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl
                        border-0 backdrop-blur-md
                        ${
                          index === 0
                            ? 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl shadow-primary/30'
                            : index === 1
                            ? 'bg-gradient-to-br from-card/90 to-card/70 shadow-xl hover:shadow-2xl'
                            : 'bg-gradient-to-br from-card/80 to-card/60 shadow-lg hover:shadow-xl'
                        }
                      `}
                      >
                        {/* Animated background elements */}
                        <div className="absolute inset-0 opacity-10">
                          {index === 0 && (
                            <>
                              <div
                                className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-current animate-spin"
                                style={{ animationDuration: '15s' }}
                              />
                              <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full border border-current opacity-60" />
                              <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-current rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2" />
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <div className="absolute top-6 right-6 w-16 h-16 bg-primary/20 rounded-lg rotate-45 animate-pulse" />
                              <div className="absolute bottom-8 left-8 w-8 h-8 bg-accent/30 rounded-full" />
                            </>
                          )}
                        </div>

                        {/* Quote Icon */}
                        <div className="absolute top-6 left-6 z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              index === 0
                                ? 'bg-primary-foreground/20'
                                : 'bg-primary/10'
                            }`}
                          >
                            <span
                              className={`text-2xl font-bold ${
                                index === 0
                                  ? 'text-primary-foreground/60'
                                  : 'text-primary/60'
                              }`}
                            >
                              "
                            </span>
                          </div>
                        </div>

                        <CardContent className="p-8 pt-16 flex-grow relative z-10">
                          {/* Star Rating */}
                          <div className="mb-6">
                            <div className="flex gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === 0
                                      ? 'bg-primary-foreground shadow-sm'
                                      : 'bg-primary shadow-sm'
                                  }`}
                                  style={{ animationDelay: `${i * 100}ms` }}
                                />
                              ))}
                            </div>

                            <p
                              className={`text-base leading-relaxed font-medium ${
                                index === 0
                                  ? 'text-primary-foreground/95'
                                  : 'text-foreground/90'
                              }`}
                            >
                              "{testimonial.quote}"
                            </p>
                          </div>
                        </CardContent>

                        <CardHeader className="p-8 pt-0 flex-row items-center gap-5 space-y-0">
                          {/* Enhanced Avatar */}
                          <div className="relative">
                            <div
                              className={`absolute -inset-1 rounded-full ${
                                index === 0
                                  ? 'bg-gradient-to-r from-primary-foreground/30 to-primary-foreground/10'
                                  : 'bg-gradient-to-r from-primary/30 to-accent/20'
                              } animate-pulse`}
                            />
                            <Avatar className="relative h-16 w-16 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent shadow-lg">
                              <AvatarImage
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                data-ai-hint="person portrait"
                                className="object-cover"
                              />
                              <AvatarFallback
                                className={`text-xl font-bold ${
                                  index === 0
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : 'bg-primary/15 text-primary'
                                }`}
                              >
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex-1">
                            <p
                              className={`font-bold text-lg ${
                                index === 0
                                  ? 'text-primary-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {testimonial.name}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                index === 0
                                  ? 'text-primary-foreground/80'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {testimonial.role}
                            </p>
                          </div>
                        </CardHeader>

                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </ScrollAnimation>

          {/* CSS Animation Definitions */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(5deg);
              }
            }
          `}</style>
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
  variant?: 'blue' | 'orange' | 'green';
  featured?: boolean;
}

function DashboardCard({
  title,
  description,
  icon,
  href,
  variant = 'blue',
  featured = false,
}: DashboardCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'orange':
        return {
          iconBg:
            'bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10',
          iconColor: 'text-orange-600 dark:text-orange-400',
          buttonBg:
            'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
          glowColor: 'shadow-orange-500/20',
        };
      case 'green':
        return {
          iconBg:
            'bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10',
          iconColor: 'text-green-600 dark:text-green-400',
          buttonBg:
            'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
          glowColor: 'shadow-green-500/20',
        };
      default: // blue
        return {
          iconBg:
            'bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10',
          iconColor: 'text-blue-600 dark:text-blue-400',
          buttonBg:
            'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
          glowColor: 'shadow-blue-500/20',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="group relative h-full">
      {/* Card container with modern design */}
      <Card
        className={`
        relative h-full overflow-hidden
        bg-white dark:bg-slate-900/50 backdrop-blur-sm
        border border-gray-200/60 dark:border-slate-700/60
        shadow-lg hover:shadow-xl ${styles.glowColor}
        transition-all duration-300 ease-out
        transform hover:-translate-y-1
        ${featured ? 'ring-2 ring-orange-200 dark:ring-orange-800/30' : ''}
      `}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-gray-100/50 to-transparent dark:from-slate-800/30 rounded-full" />
        </div>

        {/* Card content */}
        <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
          {/* Icon with modern styling */}
          <div className="mb-6">
            <div
              className={`
              relative p-6 rounded-3xl shadow-lg
              ${styles.iconBg}
              transition-all duration-300 ease-out
              group-hover:scale-105 group-hover:rotate-3
            `}
            >
              <div className={styles.iconColor}>{icon}</div>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-2xl font-bold font-headline mb-4 text-foreground">
            {title}
          </h4>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-base mb-8 flex-grow">
            {description}
          </p>

          {/* Button */}
          <Link href={href} className="w-full">
            <Button className={`w-full`}>
              <span className="relative flex items-center justify-center gap-2">
                {featured ? 'Upgrade' : 'Learn More'}
                <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
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
