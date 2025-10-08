
"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Check, Award, Users, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/shared/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const membershipTiers = [
  {
    name: "Student",
    price: "$15",
    period: "per month",
    description: "Perfect for individual students looking for a dedicated study space.",
    features: [
      "Access to one library branch",
      "Dedicated seating",
      "Basic Wi-Fi access",
      "Community event access",
    ],
    cta: "Choose Student Plan",
  },
  {
    name: "Professional",
    price: "$25",
    period: "per month",
    description: "Ideal for professionals and researchers needing more resources.",
    features: [
      "Access to all library branches",
      "Priority seating options",
      "High-speed Wi-Fi",
      "Access to digital archives",
      "Guest passes (2 per month)",
    ],
    cta: "Choose Pro Plan",
  },
  {
    name: "Family",
    price: "$40",
    period: "per month",
    description: "Great value for families who love to read and learn together.",
    features: [
      "Access for up to 4 family members",
      "Dedicated family study zones",
      "Children's section access",
      "Workshop discounts",
      "All Professional plan benefits",
    ],
    cta: "Choose Family Plan",
  },
];

export default function MembershipPage() {
  const membershipHeroImage = PlaceHolderImages.find(p => p.id === 'facility-2');

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
                Unlock a world of knowledge, community, and growth. Find the perfect plan for your needs.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold font-headline">Membership Benefits</h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Discover the advantages of becoming a LibMan member.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <BenefitCard
                icon={<Award className="w-8 h-8 text-primary" />}
                title="Exclusive Access"
                description="Gain entry to our network of modern, well-equipped libraries, perfect for studying and research."
              />
              <BenefitCard
                icon={<Users className="w-8 h-8 text-primary" />}
                title="Vibrant Community"
                description="Connect with fellow students, researchers, and professionals at our regular community events and workshops."
              />
              <BenefitCard
                icon={<Star className="w-8 h-8 text-primary" />}
                title="Premium Resources"
                description="Access high-speed internet, digital archives, and a vast collection of books and periodicals."
              />
            </div>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold font-headline">Choose Your Plan</h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                We have a variety of membership options to suit your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipTiers.map((tier) => (
                <Card key={tier.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground ml-1">{tier.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
            <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">How to Join</h3>
                  <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Becoming a member is quick and easy. Follow these simple steps to get started.
                  </p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Step number="1" title="Choose a Plan" description="Select the membership tier that best fits your needs from the options above." />
                    <Step number="2" title="Create Account" description="Sign up with your email and create a password to set up your LibMan profile." />
                    <Step number="3" title="Start Learning" description="Log in to your dashboard to view your seat details, manage payments, and explore our resources." />
                </div>
                <div className="text-center mt-12">
                    <Button size="lg" asChild>
                        <Link href="/signup">Sign Up Now <ArrowRight className="ml-2" /></Link>
                    </Button>
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

function BenefitCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl">
                {number}
            </div>
            <Card className="pt-10 h-full">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>
    );
}
