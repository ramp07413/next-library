
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type LibraryEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: 'Workshop' | 'Book Reading' | 'Community Event' | 'Author Talk';
};

export const events: LibraryEvent[] = [
  {
    id: "EVENT-001",
    title: "Summer Reading Challenge Kick-off",
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    location: "Main Hall",
    description: "Join us to kick off our annual summer reading challenge! Fun activities, prizes, and more for all ages.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'event-community-1')?.imageUrl || '',
    imageHint: "children reading",
    category: "Community Event",
  },
  {
    id: "EVENT-002",
    title: "Author Talk: An Evening with Jane Foster",
    date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    location: "Auditorium",
    description: "Meet bestselling author Jane Foster as she discusses her new novel, 'The Crimson Cipher'. Q&A and book signing to follow.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'event-author-1')?.imageUrl || '',
    imageHint: "author speaking",
    category: "Author Talk",
  },
  {
    id: "EVENT-003",
    title: "Workshop: Introduction to Creative Writing",
    date: new Date(new Date().setDate(new Date().getDate() + 22)).toISOString(),
    location: "Room 201",
    description: "Unleash your inner writer in this beginner-friendly workshop. Learn the basics of storytelling, character development, and plotting.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'event-workshop-1')?.imageUrl || '',
    imageHint: "writing workshop",
    category: "Workshop",
  },
  {
    id: "EVENT-004",
    title: "Children's Story Time",
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    location: "Children's Section",
    description: "A fun and interactive story time for kids aged 3-7. This week's theme is 'Jungle Adventures'.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'event-reading-1')?.imageUrl || '',
    imageHint: "kids storytime",
    category: "Book Reading",
  },
];
