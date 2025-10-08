
"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Target, Zap, Twitter, Linkedin, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollAnimation from "@/components/shared/scroll-animation";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Maria Garcia",
    role: "Head of Product",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Samuel Lee",
    role: "Lead Engineer",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '',
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    name: "Jane Smith",
    role: "UX/UI Designer",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
    social: { twitter: "#", linkedin: "#", github: "#" }
  }
];

export default function AboutUsPage() {
  const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

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
          {aboutHeroImage && (
            <Image
              src={aboutHeroImage.imageUrl}
              alt={aboutHeroImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutHeroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-headline">
                About LibMan
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-white/80">
                Empowering libraries and learning communities through innovative technology.
              </p>
            </ScrollAnimation>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h3 className="text-3xl font-bold font-headline mb-4">Our Mission</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Our mission is to provide a seamless, intuitive, and powerful management platform that connects company administrators, library staff, and students. We aim to simplify complexity, foster community, and create an environment where learning and knowledge can flourish.
                      </p>
                      <div className="space-y-4">
                          <MissionPoint icon={<Zap />} text="Streamline library operations from a single dashboard." />
                          <MissionPoint icon={<Users />} text="Enhance the student experience with easy access to resources." />
                          <MissionPoint icon={<Target />} text="Provide powerful analytics for data-driven decisions." />
                      </div>
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <Image 
                        src={PlaceHolderImages.find(p => p.id === 'facility-1')?.imageUrl || ''}
                        alt="Library facility 1"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md object-cover aspect-square"
                      />
                       <Image 
                        src={PlaceHolderImages.find(p => p.id === 'facility-2')?.imageUrl || ''}
                        alt="Library facility 2"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md object-cover aspect-square mt-8"
                      />
                   </div>
              </div>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24 bg-muted">
           <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">Our History</h3>
                  <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                    Founded in 2023, LibMan was born from a desire to modernize the library experience. We saw the challenges faced by growing library networks in managing multiple locations, diverse user groups, and complex billing structures. We set out to build a solution that was not only powerful but also a joy to use for everyone involved.
                  </p>
              </div>
          </ScrollAnimation>
        </section>
        
        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold font-headline">Meet the Team</h3>
                  <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                      The passionate individuals behind LibMan, dedicated to building the future of library management.
                  </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member) => (
                      <Card key={member.name} className="text-center hover:shadow-xl transition-shadow">
                          <CardHeader className="items-center">
                              <Avatar className="h-24 w-24 mb-4">
                                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person portrait" />
                                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <CardTitle className="text-xl">{member.name}</CardTitle>
                              <p className="text-primary">{member.role}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-center gap-4 text-muted-foreground">
                                <Link href={member.social.twitter} className="hover:text-primary"><Twitter /></Link>
                                <Link href={member.social.linkedin} className="hover:text-primary"><Linkedin /></Link>
                                <Link href={member.social.github} className="hover:text-primary"><Github /></Link>
                            </div>
                          </CardContent>
                      </Card>
                  ))}
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

function MissionPoint({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-full">
                {icon}
            </div>
            <span className="font-medium">{text}</span>
        </div>
    )
}
