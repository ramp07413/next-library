'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  FaBookOpen,
  FaCheck,
  FaAward,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaCrown,
  FaGem,
  FaShieldAlt as FaShield,
} from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/shared/scroll-animation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const membershipTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'per month',
    description:
      'Perfect for individual students looking for a dedicated study space.',
    features: [
      'Access to one library branch',
      'Dedicated seating',
      'Basic Wi-Fi access',
      'Community event access',
      'Study room booking (2 hours/day)',
      'Basic printing credits',
    ],
    cta: 'Choose Free Plan',
    icon: <FaBookOpen className="w-6 h-6" />,
    popular: false,
    gradient: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    name: 'Premium',
    price: '$15',
    period: 'per month',
    description:
      'Ideal for professionals and researchers needing more resources.',
    features: [
      'Access to all library branches',
      'Priority seating options',
      'High-speed Wi-Fi',
      'Access to digital archives',
      'Guest passes (2 per month)',
      'Extended study room booking (4 hours/day)',
      'Premium printing credits',
      'Research assistance',
    ],
    cta: 'Choose Premium Plan',
    icon: <FaCrown className="w-6 h-6" />,
    popular: true,
    gradient: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    name: 'Diamond',
    price: '$25',
    period: 'per month',
    description:
      'Great value for families who love to read and learn together.',
    features: [
      'Access for up to 4 family members',
      'Dedicated family study zones',
      "Children's section access",
      'Workshop discounts',
      'All Professional plan benefits',
      'Family event priority booking',
      'Educational resource access',
      'Homework help sessions',
    ],
    cta: 'Choose Diamond Plan',
    icon: <FaGem className="w-6 h-6" />,
    popular: false,
    gradient: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
];

export default function MembershipPage() {
  const membershipHeroImage = PlaceHolderImages.find(
    (p) => p.id === 'facility-2'
  );

  return (
    <div>
      <Header />
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        {membershipHeroImage && (
          <Image
            src={membershipHeroImage.imageUrl}
            alt={membershipHeroImage.description}
            fill
            className="object-cover"
            data-ai-hint={membershipHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline">
              Join the LibMan Community
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
              Unlock a world of knowledge, community, and growth. Find the
              perfect plan for your needs.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold font-headline">
              Membership Benefits
            </h3>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Discover the advantages of becoming a LibMan member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            <BenefitCard
              icon={<FaAward className="w-8 h-8" />}
              title="Exclusive Access"
              description="Gain entry to our network of modern, well-equipped libraries, perfect for studying and research."
              gradient="bg-primary"
            />
            <BenefitCard
              icon={<FaUsers className="w-8 h-8" />}
              title="Vibrant Community"
              description="Connect with fellow students, researchers, and professionals at our regular community events and workshops."
              gradient="bg-primary"
            />
            <BenefitCard
              icon={<FaStar className="w-8 h-8" />}
              title="Premium Resources"
              description="Access high-speed internet, digital archives, and a vast collection of books and periodicals."
              gradient="bg-primary"
            />
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">
                Active Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground">
                Library Locations
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Events Monthly
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      <section id="plans" className="py-16 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline mb-6">
                Choose Your Perfect Plan
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Simple, transparent pricing for everyone. All plans include our
                core benefits with no hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {membershipTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`
                    relative rounded-2xl border transition-all duration-200 hover:shadow-lg
                    ${
                      tier.popular
                        ? 'border-primary shadow-lg ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/30'
                    }
                    bg-card/50 backdrop-blur-sm
                  `}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="mb-4">
                        <div
                          className={`
                          inline-flex p-3 rounded-xl
                          ${
                            tier.popular
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }
                        `}
                        >
                          {tier.icon}
                        </div>
                      </div>

                      <h4 className="text-2xl font-bold font-headline mb-2">
                        {tier.name}
                      </h4>

                      <p className="text-muted-foreground text-sm mb-6">
                        {tier.description}
                      </p>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">
                            {tier.price}
                          </span>
                          <span className="text-muted-foreground">
                            {tier.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <FaCheck className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-sm text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`
                        w-full py-3 font-medium transition-all duration-200
                        ${
                          tier.popular
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg'
                            : 'border-2 border-primary/20 hover:border-primary/40 bg-transparent hover:bg-primary/5'
                        }
                      `}
                      variant={tier.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link
                        href="/signup"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {tier.cta}
                        <FaArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-background via-primary/5 to-background">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline mb-4">
              How to Join LibMan
            </h3>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
              Becoming a member is quick and easy. Follow these simple steps to
              unlock your learning potential.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <Step
                number="1"
                title="Choose a Plan"
                description="Select the membership tier that best fits your needs from our flexible options above."
                icon={<FaCrown className="w-6 h-6" />}
                gradient="bg-primary"
              />
              <Step
                number="2"
                title="Create Account"
                description="Sign up with your email and create a secure password to set up your personalized LibMan profile."
                icon={<FaUsers className="w-6 h-6" />}
                gradient="bg-primary"
              />
              <Step
                number="3"
                title="Start Learning"
                description="Access your dashboard to view seat details, manage payments, book study rooms, and explore resources."
                icon={<FaStar className="w-6 h-6" />}
                gradient="bg-primary"
              />
            </div>

            {/* Connection lines for desktop */}
            <div className="hidden md:block relative -mt-16 mb-16">
              <div className="absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
            </div>
          </div>
        </ScrollAnimation>
      </section>
      <Footer />
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  gradient = 'from-primary to-primary/80',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}) {
  return (
    <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-card hover:shadow-lg">
      <div
        className={`mx-auto bg-gradient-to-r ${gradient} text-white p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h4 className="text-xl sm:text-2xl font-semibold mb-4 font-headline">
        {title}
      </h4>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  icon,
  gradient = 'from-primary to-primary/80',
}: {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
}) {
  return (
    <div className="relative group">
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 ${gradient} text-white h-16 w-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {number}
      </div>

      <Card className="pt-12 h-full transition-all duration-300 hover:shadow-lg group-hover:bg-card/50">
        <CardHeader className="text-center pb-4">
          {icon && (
            <div
              className={`mx-auto ${gradient} text-white p-3 rounded-xl w-fit mb-4 opacity-80`}
            >
              {icon}
            </div>
          )}
          <CardTitle className="text-xl sm:text-2xl font-headline">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
