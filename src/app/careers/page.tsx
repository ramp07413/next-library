
"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, MapPin, Clock, Briefcase, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollAnimation from "@/components/shared/scroll-animation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { jobOpenings, volunteerOpportunities } from "./data";

export default function CareersPage() {
  const careersHeroImage = PlaceHolderImages.find(p => p.id === 'careers-hero');
  const volunteerImage = PlaceHolderImages.find(p => p.id === 'volunteer-1');

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
          {careersHeroImage && (
            <Image
              src={careersHeroImage.imageUrl}
              alt={careersHeroImage.description}
              fill
              className="object-cover"
              data-ai-hint={careersHeroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline">
                Join Our Team
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Help us build the future of library services. Explore our open positions and volunteer opportunities.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold font-headline">Current Openings</h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                We are looking for passionate and talented individuals to join our growing team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 pt-2">
                        <Badge variant="secondary">{job.type}</Badge>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold font-headline mb-4">Volunteer With Us</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Make a difference in your community by volunteering at one of our libraries. We have a variety of roles to suit your interests and availability.
                </p>
                <div className="space-y-4">
                  {volunteerOpportunities.map((opp) => (
                    <div key={opp.id}>
                        <h4 className="font-semibold">{opp.title}</h4>
                        <p className="text-sm text-muted-foreground"><strong>Commitment:</strong> {opp.commitment}</p>
                        <p className="text-sm mt-1">{opp.description}</p>
                    </div>
                  ))}
                </div>
                 <Button asChild className="mt-8">
                    <Link href="/contact">Become a Volunteer <Heart className="ml-2" /></Link>
                </Button>
              </div>
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
                 {volunteerImage && (
                    <Image
                      src={volunteerImage.imageUrl}
                      alt={volunteerImage.description}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover"
                      data-ai-hint={volunteerImage.imageHint}
                    />
                 )}
              </div>
            </div>
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800">
          <p className="text-center sm:text-left text-sm text-white">&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
