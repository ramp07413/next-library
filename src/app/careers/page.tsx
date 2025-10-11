'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaBookOpen,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
  FaBriefcase,
  FaUsers,
  FaGraduationCap,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaGlobe,
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
import { Badge } from '@/components/ui/badge';
import ScrollAnimation from '@/components/shared/scroll-animation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { jobOpenings, volunteerOpportunities } from './data';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

export default function CareersPage() {
  const careersHeroImage = PlaceHolderImages.find(
    (p) => p.id === 'careers-hero'
  );
  const volunteerImage = PlaceHolderImages.find((p) => p.id === 'volunteer-1');

  return (
    <div>
      <Header />
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
              Help us build the future of library services. Explore our open
              positions and volunteer opportunities.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Current Openings Section - Premium Design */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Open Positions</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
              Discover your next career opportunity with us. Each role offers
              growth, impact, and the chance to shape the future of learning.
            </p>
          </div>

          {/* Jobs Grid with Enhanced Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {jobOpenings.map((job, index) => (
              <Card
                key={job.id}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-md"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Gradient Border */}
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[1px] bg-white rounded-lg" />

                {/* Content */}
                <div className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="relative p-4 bg-primary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          {job.title.includes('Senior') ? (
                            <FaGraduationCap className="w-6 h-6 text-primary" />
                          ) : job.title.includes('Digital') ? (
                            <FaRocket className="w-6 h-6 text-primary" />
                          ) : (
                            <FaUsers className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </div>

                      <Badge
                        className={`font-semibold px-3 py-1 text-xs ${
                          job.type === 'Full-time'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                            : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0'
                        }`}
                      >
                        <FaClock className="w-3 h-3 mr-1" />
                        {job.type}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300 mb-3">
                      {job.title}
                    </CardTitle>

                    <CardDescription className="flex items-center gap-2 text-slate-600 text-base">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <FaMapMarkerAlt className=" text-primary" />
                      </div>
                      <span className="font-medium">{job.location}</span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow pb-6">
                    <p className="text-slate-600 leading-relaxed text-sm mb-6">
                      {job.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FaCheckCircle className="w-3 h-3 text-green-500" />
                        <span>Competitive salary & benefits</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FaCheckCircle className="w-3 h-3 text-green-500" />
                        <span>Professional development opportunities</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FaCheckCircle className="w-3 h-3 text-green-500" />
                        <span>Flexible work arrangements</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Job ID:</span>
                        <span className="font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {job.id}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button className="w-full">
                      <span>Apply Now</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </ScrollAnimation>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Volunteer Section - Modern Community Focus */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-zinc-100">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="text-primary">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="">Volunteer</span>
                <br />
                <span className="text-gray-400">With Purpose</span>
              </h3>

              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Join our community of changemakers. Every hour you contribute
                helps us build stronger, more connected communities through the
                power of knowledge and learning.
              </p>

              {/* Volunteer Opportunities Cards */}
              <div className="space-y-6 mb-10">
                {volunteerOpportunities.map((opp, index) => (
                  <div
                    key={opp.id}
                    className="group bg-white backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300"
                    style={{
                      animation: `fadeInLeft 0.6s ease-out ${
                        index * 0.2
                      }s both`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        {opp.title.includes('Event') ? (
                          <FaRocket className="w-5 h-5 text-primary" />
                        ) : opp.title.includes('Shelving') ? (
                          <FaBookOpen className="w-5 h-5 text-primary" />
                        ) : (
                          <FaUsers className="w-5 h-5 text-primary" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/70 transition-colors">
                          {opp.title}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <FaClock className="w-4 h-4 text-primary/80" />
                          <span className="text-primary font-medium text-sm">
                            {opp.commitment}
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          {opp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start Volunteering
                    <FaHeart className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </Button>

                <Button variant="secondary" size="lg">
                  Learn More
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    200+
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Active Volunteers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    5K+
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Hours Contributed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    98%
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                {/* Glass Effect Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-3xl" />

                {volunteerImage && (
                  <Image
                    src={volunteerImage.imageUrl}
                    alt={volunteerImage.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={volunteerImage.imageHint}
                  />
                )}

                {/* Overlay with content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                    <h5 className="text-white font-bold mb-2">
                      Join Our Community
                    </h5>
                    <p className="text-white/80 text-sm">
                      Connect with like-minded individuals passionate about
                      education and community service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>
      <Footer />
    </div>
  );
}
