'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBookOpen, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { news } from './data';
import { format } from 'date-fns';
import ScrollAnimation from '@/components/shared/scroll-animation';

export default function NewsPage() {
  const [filter, setFilter] = useState('all');

  const filteredNews = news.filter(
    (article) => filter === 'all' || article.category === filter
  );

  return (
    <div>
      <section className="py-20 lg:py-24 bg-muted">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
            News & Announcements
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Stay up-to-date with the latest news, events, and new arrivals from
            our libraries.
          </p>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-8">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Library News">Library News</SelectItem>
                <SelectItem value="New Arrivals">New Arrivals</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <Card key={article.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={article.imageHint}
                      />
                    </div>
                    <div className="p-6">
                      <CardTitle>{article.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">
                      {article.description}
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <InfoItem
                        icon={<FaCalendarAlt />}
                        text={format(new Date(article.date), 'PPP')}
                      />
                      <InfoItem icon={<FaTag />} text={article.category} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No news found for the selected category.
              </p>
            </div>
          )}
        </ScrollAnimation>
      </section>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}
