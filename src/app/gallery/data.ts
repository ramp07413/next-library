import { PlaceHolderImages } from '@/lib/placeholder-images';

export type GalleryImage = {
  id: string;
  title: string;
  category: 'events' | 'facilities';
  imageUrl: string;
  imageHint: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Community Workshop',
    category: 'events',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'event-workshop-1')?.imageUrl ||
      '',
    imageHint: 'workshop people',
  },
  {
    id: 'gal-2',
    title: 'Modern Reading Area',
    category: 'facilities',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'facility-4')?.imageUrl || '',
    imageHint: 'library reading',
  },
  {
    id: 'gal-3',
    title: 'Author Jane Foster speaking',
    category: 'events',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'event-author-1')?.imageUrl || '',
    imageHint: 'author talk',
  },
  {
    id: 'gal-4',
    title: 'Spacious Interior',
    category: 'facilities',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'facility-1')?.imageUrl || '',
    imageHint: 'library hall',
  },
  {
    id: 'gal-5',
    title: "Children's Story Time",
    category: 'events',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'event-reading-1')?.imageUrl || '',
    imageHint: 'kids storytime',
  },
  {
    id: 'gal-6',
    title: 'Summer Reading Challenge',
    category: 'events',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'event-community-1')?.imageUrl ||
      '',
    imageHint: 'reading challenge',
  },
  {
    id: 'gal-7',
    title: 'Student Study Session',
    category: 'facilities',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'facility-2')?.imageUrl || '',
    imageHint: 'students collaboration',
  },
  {
    id: 'gal-8',
    title: 'Endless Bookshelves',
    category: 'facilities',
    imageUrl:
      PlaceHolderImages.find((p) => p.id === 'facility-3')?.imageUrl || '',
    imageHint: 'library shelves',
  },
];
