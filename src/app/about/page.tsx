'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaBookOpen,
  FaUsers,
  FaBullseye,
  FaBolt,
  FaGithub,
} from 'react-icons/fa';
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollAnimation from '@/components/shared/scroll-animation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-1')?.imageUrl || '',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Product',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-2')?.imageUrl || '',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Samuel Lee',
    role: 'Lead Engineer',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-5')?.imageUrl || '',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Jane Smith',
    role: 'UX/UI Designer',
    avatar:
      PlaceHolderImages.find((p) => p.id === 'user-avatar-4')?.imageUrl || '',
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
];

export default function AboutUsPage() {
  const aboutHeroImage = PlaceHolderImages.find((p) => p.id === 'about-hero');

  return (
    <div>
      <Header />
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
              Empowering libraries and learning communities through innovative
              technology.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Our mission is to provide a seamless, intuitive, and powerful
                management platform that connects company administrators,
                library staff, and students. We aim to simplify complexity,
                foster community, and create an environment where learning and
                knowledge can flourish.
              </p>
              <div className="space-y-4">
                <MissionPoint
                  icon={<FaBolt />}
                  text="Streamline library operations from a single dashboard."
                />
                <MissionPoint
                  icon={<FaUsers />}
                  text="Enhance the student experience with easy access to resources."
                />
                <MissionPoint
                  icon={<FaBullseye />}
                  text="Provide powerful analytics for data-driven decisions."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={
                  PlaceHolderImages.find((p) => p.id === 'facility-1')
                    ?.imageUrl || ''
                }
                alt="Library facility 1"
                width={400}
                height={300}
                className="rounded-lg shadow-md object-cover aspect-square"
              />
              <Image
                src={
                  PlaceHolderImages.find((p) => p.id === 'facility-2')
                    ?.imageUrl || ''
                }
                alt="Library facility 2"
                width={400}
                height={300}
                className="rounded-lg shadow-md object-cover aspect-square mt-8"
              />
            </div>
          </div>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/60 to-muted">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-primary/20 blur opacity-70"></div>
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={
                        PlaceHolderImages.find((p) => p.id === 'facility-3')
                          ?.imageUrl ||
                        'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000'
                      }
                      alt="Library History"
                      width={600}
                      height={400}
                      className="object-cover w-full aspect-video"
                    />
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 md:w-32 md:h-32 bg-background rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                    <div className="text-center">
                      <div className="text-xl md:text-3xl font-bold text-primary">
                        2023
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Founded
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                {/* <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Our Journey
                  </div> */}
                <h3 className="text-3xl md:text-4xl font-bold font-headline mb-6">
                  Our History
                </h3>
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground">
                    Founded in 2023, LibMan was born from a desire to modernize
                    the library experience. We saw the challenges faced by
                    growing library networks in managing multiple locations,
                    diverse user groups, and complex billing structures.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground">
                    We set out to build a solution that was not only powerful
                    but also a joy to use for everyone involved, from
                    administrators to students.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border border-border rounded-xl p-4 bg-background/80">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        50+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Libraries using our platform
                      </div>
                    </div>
                    <div className="border border-border rounded-xl p-4 bg-background/80">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        10K+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Students supported
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-background border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <FaBookOpen size={20} />
                </div>
                <h4 className="text-xl font-bold mb-2">Beginning</h4>
                <p className="text-muted-foreground">
                  Started as a small project to help local libraries manage
                  their operations more efficiently.
                </p>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <FaUsers size={20} />
                </div>
                <h4 className="text-xl font-bold mb-2">Growth</h4>
                <p className="text-muted-foreground">
                  Expanded our team and services to accommodate the growing
                  needs of library networks nationwide.
                </p>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <FaBolt size={20} />
                </div>
                <h4 className="text-xl font-bold mb-2">Innovation</h4>
                <p className="text-muted-foreground">
                  Constantly developing new features to enhance the library
                  management experience for all users.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-28">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary font-medium">
                  Our Awesome Team
                </span>
              </div> */}
            <h3 className="text-4xl lg:text-5xl font-bold font-headline tracking-tight">
              Meet Our Team
            </h3>
            {/* <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div> */}
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
              The passionate individuals behind LibMan, dedicated to building
              the future of library management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Team member 1 - Modern 2025 Style */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  {/* Circular image with gradient border */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === 'user-avatar-1'
                          )?.imageUrl || ''
                        }
                        alt="Alison Kiara"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Alison Kiara</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    Michigan, TX
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">989-653-2986</p>
                    <p className="text-primary font-medium">
                      alisonkiara@hommy.com
                    </p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member 2 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === 'user-avatar-2'
                          )?.imageUrl || ''
                        }
                        alt="Dianne Sabin"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Dianne Sabin</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    New Jersey, TX
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">989-653-2550</p>
                    <p className="text-primary font-medium">
                      hidianne@hommy.com
                    </p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member 3 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === 'user-avatar-5'
                          )?.imageUrl || ''
                        }
                        alt="Shawn Ramirez"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Shawn Ramirez</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    Illinois, NZ
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">989-653-2986</p>
                    <p className="text-primary font-medium">
                      iamrami@hommy.com
                    </p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member 4 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === 'user-avatar-4'
                          )?.imageUrl || ''
                        }
                        alt="Jane Smith"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Jane Smith</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    UX/UI Designer
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">Design Lead</p>
                    <p className="text-primary font-medium">jane@libman.com</p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member 5 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={
                          PlaceHolderImages.find(
                            (p) => p.id === 'user-avatar-3'
                          )?.imageUrl || ''
                        }
                        alt="Alex Johnson"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Alex Johnson</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    Founder & CEO
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">Leadership</p>
                    <p className="text-primary font-medium">alex@libman.com</p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team member 6 */}
            <div className="group relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-[2rem] p-6 overflow-hidden relative z-10 h-full border border-primary/10 transition-all duration-500 hover:border-primary/30">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0 group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/60 to-primary/80 blur-[2px] p-1 -m-0.5"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkxNzE2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Maria Garcia"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">Maria Garcia</h4>
                  <p className="inline-flex items-center text-primary font-medium px-3 py-1 bg-primary/10 rounded-full mb-3">
                    Head of Product
                  </p>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <p className="text-muted-foreground">Product Strategy</p>
                    <p className="text-primary font-medium">maria@libman.com</p>
                  </div>

                  <div className="flex gap-5 text-muted-foreground mt-2">
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaXTwitter size={18} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedinIn size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="hover:text-primary transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      <Footer />
    </div>
  );
}

function MissionPoint({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 text-primary p-2 rounded-full">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}
