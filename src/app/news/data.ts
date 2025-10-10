
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: 'Library News' | 'New Arrivals' | 'Community';
};

export const news: NewsArticle[] = [
  {
    id: "NEWS-001",
    title: "Library Expands Digital Collection with Over 1,000 New E-Books",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    description: "We're excited to announce a major expansion of our digital library, including bestsellers, academic journals, and more.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'facility-3')?.imageUrl || '',
    imageHint: "ebooks collection",
    category: "New Arrivals",
  },
  {
    id: "NEWS-002",
    title: "New Extended Weekend Hours Starting Next Month",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    description: "By popular demand, all our library branches will now be open until 10 PM on Saturdays and Sundays.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'facility-1')?.imageUrl || '',
    imageHint: "library at night",
    category: "Library News",
  },
  {
    id: "NEWS-003",
    title: "Join Our Local History Project and Share Your Story",
    date: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(),
    description: "We're launching a community-driven project to archive local stories. Learn how you can contribute.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'event-community-1')?.imageUrl || '',
    imageHint: "community gathering",
    category: "Community",
  },
];
