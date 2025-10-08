
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryImages, type GalleryImage } from "./data";
import ScrollAnimation from "@/components/shared/scroll-animation";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const eventImages = galleryImages.filter(img => img.category === 'events');
  const facilityImages = galleryImages.filter(img => img.category === 'facilities');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">LibMan</h1>
          </Link>
          <nav className="hidden md:flex justify-center flex-grow">
              <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild><Link href="/about">About</Link></Button>
                  <Button variant="ghost" asChild><Link href="/membership">Membership</Link></Button>
                  <Button variant="ghost" asChild><Link href="/events">Events</Link></Button>
                  <Button variant="ghost" asChild><Link href="/careers">Careers</Link></Button>
                  <Button variant="ghost" asChild><Link href="/gallery">Gallery</Link></Button>
                  <Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button>
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
      <main className="flex-grow">
        <section className="py-20 lg:py-24 bg-muted">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
              Gallery
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A glimpse into our vibrant community and modern facilities.
            </p>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>
              
              <Dialog>
                <TabsContent value="all">
                  <ImageGrid images={galleryImages} onImageClick={setSelectedImage} />
                </TabsContent>
                <TabsContent value="events">
                  <ImageGrid images={eventImages} onImageClick={setSelectedImage} />
                </TabsContent>
                <TabsContent value="facilities">
                  <ImageGrid images={facilityImages} onImageClick={setSelectedImage} />
                </TabsContent>
                
                {selectedImage && (
                    <DialogContent className="max-w-4xl p-0">
                        <Image
                            src={selectedImage.imageUrl}
                            alt={selectedImage.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain rounded-lg"
                        />
                    </DialogContent>
                )}
              </Dialog>
            </Tabs>
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} LibMan Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


function ImageGrid({ images, onImageClick }: { images: GalleryImage[], onImageClick: (image: GalleryImage) => void }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <DialogTrigger key={image.id} asChild>
                    <div
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                        onClick={() => onImageClick(image)}
                    >
                        <Image
                            src={image.imageUrl}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-semibold text-center p-2">{image.title}</p>
                        </div>
                    </div>
                </DialogTrigger>
            ))}
        </div>
    )
}
