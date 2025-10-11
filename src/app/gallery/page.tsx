'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaBookOpen,
  FaGraduationCap,
  FaTimes,
  FaExpand,
  FaSpinner,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { galleryImages, type GalleryImage } from './data';
import ScrollAnimation from '@/components/shared/scroll-animation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

// Default fallback images for events and facilities
const DEFAULT_LIBRARY_IMAGE =
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
const DEFAULT_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';

// Enhanced function to get image with fallback
const getImageWithFallback = (
  imageUrl: string,
  category: 'events' | 'facilities'
): string => {
  // Check if image URL is missing, empty, or potentially broken
  if (
    !imageUrl ||
    imageUrl.trim() === '' ||
    imageUrl.includes('undefined') ||
    imageUrl.includes('null')
  ) {
    return category === 'events' ? DEFAULT_EVENT_IMAGE : DEFAULT_LIBRARY_IMAGE;
  }
  return imageUrl;
};

// Simulate more images for infinite scroll
const generateMoreImages = (
  baseImages: GalleryImage[],
  batchNumber: number
): GalleryImage[] => {
  return baseImages.map((img, index) => ({
    ...img,
    id: `${img.id}-batch-${batchNumber}-${index}`,
    title: `${img.title} ${batchNumber > 1 ? `(${batchNumber})` : ''}`,
  }));
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'events' | 'facilities'
  >('all');
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const eventImages = galleryImages.filter((img) => img.category === 'events');
  const facilityImages = galleryImages.filter(
    (img) => img.category === 'facilities'
  );

  const getFilteredBaseImages = useCallback(() => {
    switch (activeFilter) {
      case 'events':
        return eventImages;
      case 'facilities':
        return facilityImages;
      default:
        return galleryImages;
    }
  }, [activeFilter]);

  const loadMoreImages = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const baseImages = getFilteredBaseImages();
      const newBatch = generateMoreImages(baseImages, currentBatch + 1);

      setDisplayedImages((prev) => [...prev, ...newBatch]);
      setCurrentBatch((prev) => prev + 1);
      setIsLoadingMore(false);

      // Stop loading more after 3 batches to prevent infinite generation
      if (currentBatch >= 3) {
        setHasMore(false);
      }
    }, 800);
  }, [isLoadingMore, hasMore, currentBatch, getFilteredBaseImages]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentBatch(1);
    setHasMore(true);

    const timer = setTimeout(() => {
      const baseImages = getFilteredBaseImages();
      setDisplayedImages(baseImages);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeFilter, getFilteredBaseImages]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMoreImages]);

  const filterButtons = [
    {
      id: 'all',
      label: 'All Photos',
      icon: HiSparkles,
      count: galleryImages.length,
    },
    {
      id: 'events',
      label: 'Events',
      icon: FaCalendarAlt,
      count: eventImages.length,
    },
    {
      id: 'facilities',
      label: 'Facilities',
      icon: FaBookOpen,
      count: facilityImages.length,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      {/* Hero Section with Glassmorphism */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />

        <ScrollAnimation className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Our Gallery
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Discover the vibrant moments and stunning spaces that make our
            library a cornerstone of the community
          </p>
        </ScrollAnimation>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b border-border/50">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filterButtons.map((button) => {
              const Icon = button.icon;
              const isActive = activeFilter === button.id;

              return (
                <Button
                  key={button.id}
                  variant={isActive ? 'default' : 'outline'}
                  size="lg"
                  onClick={() =>
                    setActiveFilter(button.id as typeof activeFilter)
                  }
                  className={`
                    group relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95
                    ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary'
                        : 'bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-primary/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground group-hover:text-primary'
                      }`}
                    />
                    <span className="font-medium">{button.label}</span>
                    <Badge
                      variant={isActive ? 'secondary' : 'outline'}
                      className={`ml-1 transition-all duration-300 ${
                        isActive
                          ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20'
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20'
                      }`}
                    >
                      {button.count}
                    </Badge>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-pulse" />
                  )}
                </Button>
              );
            })}
          </div>
        </ScrollAnimation>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Dialog>
            <div
              className={`transition-all duration-500 ${
                isLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <ModernImageGrid
                images={displayedImages}
                onImageClick={setSelectedImage}
                isLoading={isLoading}
              />
            </div>

            {/* Infinite Scroll Trigger & Loading More */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="flex justify-center items-center py-12"
              >
                {isLoadingMore && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    <span className="text-lg font-medium">
                      Loading more images...
                    </span>
                  </div>
                )}
              </div>
            )}

            {selectedImage && (
              <DialogContent className="max-w-3xl w-[95vw] p-0 bg-background/95 backdrop-blur-xl border border-border/50 overflow-hidden">
                <div className="relative">
                  {/* Image Container with Better Aspect Ratio Management */}
                  <div className="relative w-full bg-muted/20">
                    <Image
                      src={getImageWithFallback(
                        selectedImage.imageUrl,
                        selectedImage.category
                      )}
                      alt={selectedImage.title}
                      width={1600}
                      height={1000}
                      className="w-full h-full object-contain max-h-[60vh]"
                      data-ai-hint={selectedImage.imageHint}
                      priority
                    />

                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300 z-10"
                      onClick={() => setSelectedImage(null)}
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Enhanced Info Panel */}
                  <div className="p-8 bg-gradient-to-t from-background via-background/98 to-background/95">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge
                            variant={
                              selectedImage.category === 'events'
                                ? 'default'
                                : 'secondary'
                            }
                            className="text-sm px-3 py-1"
                          >
                            {selectedImage.category === 'events' ? (
                              <>
                                <FaCalendarAlt className="w-3 h-3 mr-2" />
                                Events
                              </>
                            ) : (
                              <>
                                <FaBookOpen className="w-3 h-3 mr-2" />
                                Facilities
                              </>
                            )}
                          </Badge>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            <span>Library</span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold font-headline mb-3 text-foreground">
                          {selectedImage.title}
                        </h3>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                          {selectedImage.category === 'events'
                            ? 'Capturing memorable moments from our vibrant community events and gatherings that bring people together through the love of learning and literature.'
                            : 'Showcasing our modern facilities and thoughtfully designed learning spaces that inspire creativity, collaboration, and intellectual growth.'}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          {selectedImage.category === 'events' && (
                            <div className="flex items-center gap-2">
                              <FaUsers className="w-4 h-4" />
                              <span>Community Event</span>
                            </div>
                          )}
                          {selectedImage.category === 'facilities' && (
                            <div className="flex items-center gap-2">
                              <FaGraduationCap className="w-4 h-4" />
                              <span>Learning Space</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <HiSparkles className="w-4 h-4" />
                            <span>High Quality</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </ScrollAnimation>
      </section>

      <Footer />
    </div>
  );
}

function ModernImageGrid({
  images,
  onImageClick,
  isLoading,
}: {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  isLoading: boolean;
}) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center animate-pulse">
          <FaBookOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No images found</h3>
        <p className="text-muted-foreground">
          Try selecting a different category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <DialogTrigger key={image.id} asChild>
          <div
            className="relative rounded-2xl overflow-hidden group cursor-pointer bg-card border border-border/50 shadow-sm"
            onClick={() => onImageClick(image)}
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Image Container with Fixed Height */}
            <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80">
              <Image
                src={getImageWithFallback(image.imageUrl, image.category)}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`
                  object-cover transition-all duration-500 ease-out
                  ${
                    hoveredImage === image.id
                      ? 'scale-110 brightness-105'
                      : 'scale-100'
                  }
                `}
                data-ai-hint={image.imageHint}
                priority={index < 4}
              />

              {/* Smooth Gradient Overlay */}
              <div
                className={`
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                transition-opacity duration-300 ease-out
                ${hoveredImage === image.id ? 'opacity-100' : 'opacity-0'}
              `}
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge
                  variant={
                    image.category === 'events' ? 'default' : 'secondary'
                  }
                  className={`
                    transition-all duration-300 ease-out backdrop-blur-sm
                    ${
                      hoveredImage === image.id
                        ? 'scale-105 opacity-100'
                        : 'scale-100 opacity-90'
                    }
                  `}
                >
                  {image.category === 'events' ? (
                    <>
                      <FaCalendarAlt className="w-3 h-3 mr-1" /> Event
                    </>
                  ) : (
                    <>
                      <FaBookOpen className="w-3 h-3 mr-1" /> Facility
                    </>
                  )}
                </Badge>
              </div>

              {/* Expand Icon with better animation */}
              <div
                className={`
                absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                flex items-center justify-center border border-white/20 z-10
                transition-all duration-300 ease-out
                ${
                  hoveredImage === image.id
                    ? 'opacity-100 scale-105'
                    : 'opacity-0 scale-95'
                }
              `}
              >
                <FaExpand className="w-4 h-4 text-white" />
              </div>

              {/* Enhanced Bottom Content Overlay */}
              <div
                className={`
                absolute bottom-0 left-0 right-0 p-6 z-10
                transform transition-all duration-300 ease-out
                ${
                  hoveredImage === image.id
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-0'
                }
              `}
              >
                <h3 className="text-white font-bold text-lg font-headline mb-3 drop-shadow-lg">
                  {image.title}
                </h3>

                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>Library</span>
                  </div>
                  {image.category === 'events' && (
                    <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
                      <FaUsers className="w-3 h-3" />
                      <span>Community Event</span>
                    </div>
                  )}
                  {image.category === 'facilities' && (
                    <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
                      <FaGraduationCap className="w-3 h-3" />
                      <span>Learning Space</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Bottom Card Content */}
            <div className="p-5 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4
                    className={`
                    font-semibold truncate transition-colors duration-300 text-base
                    ${
                      hoveredImage === image.id
                        ? 'text-primary'
                        : 'text-foreground'
                    }
                  `}
                  >
                    {image.title}
                  </h4>
                  <p
                    className={`
                    text-sm text-muted-foreground mt-1 transition-all duration-300
                    ${hoveredImage === image.id ? 'text-primary/70' : ''}
                  `}
                  >
                    {image.category === 'events'
                      ? 'Community Event'
                      : 'Library Facility'}
                  </p>
                </div>

                <div
                  className={`
                  w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center
                  transition-all duration-300 ease-out
                  ${
                    hoveredImage === image.id
                      ? 'bg-primary text-primary-foreground scale-105'
                      : 'text-primary scale-100'
                  }
                `}
                >
                  {image.category === 'events' ? (
                    <FaCalendarAlt className="w-4 h-4" />
                  ) : (
                    <FaBookOpen className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      ))}
    </div>
  );
}
