'use client';

import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/shared/scroll-animation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const faqData = [
  {
    question: 'How do I create an account?',
    answer:
      "You can create an account by clicking the 'Sign Up' button on the homepage. Fill in the required details, and you'll be ready to go. The system supports different roles, including Student, Library Admin, and Company Admin.",
  },
  {
    question: 'How do I find my assigned seat?',
    answer:
      'Once you log in as a student, your dashboard will display your currently assigned seat number, along with other details like library timings and seat type.',
  },
  {
    question: 'How can I pay my monthly fees?',
    answer:
      "Navigate to the 'My Dues' or 'My Payments' section in your student dashboard. You will see your upcoming payments and an option to 'Pay Now' using our secure payment gateway.",
  },
  {
    question: 'What are the borrowing rules?',
    answer:
      "Borrowing rules may vary by library. Please check with your specific library branch for details on borrowing limits, duration, and renewal policies. This information is often available in the library's local resource section.",
  },
  {
    question:
      'How do I report an issue with my seat or the library facilities?',
    answer:
      "In your student dashboard, under 'My Seat Details,' there is a button to 'Report an Issue.' You can use this to notify the library administration of any problems.",
  },
  {
    question: 'Can I change my assigned seat?',
    answer:
      "Seat changes are typically handled by the library administration. Please contact your library's front desk to request a seat change. Some libraries may offer this option through the platform, subject to availability.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <Header />
      <section className="py-20 lg:py-24 bg-muted">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions? We've got answers. Find the information you're
            looking for about the LibMan platform.
          </p>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollAnimation>
      </section>
      <Footer />
    </div>
  );
}
