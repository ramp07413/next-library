'use client';

import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/shared/scroll-animation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function RulesAndRegulationsPage() {
  return (
    <div>
      <Header />
      <section className="py-20 lg:py-24 bg-muted">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
            Library Rules & Regulations
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Guidelines for a safe, respectful, and productive environment for
            all members.
          </p>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h3>1. General Conduct</h3>
            <p>
              Users are expected to behave in a respectful and considerate
              manner. Disruptive behavior, including loud conversations, playing
              music without headphones, or harassment of any kind, is strictly
              prohibited.
            </p>

            <h3>2. Borrowing and Returning</h3>
            <p>
              A valid library membership is required to borrow materials. The
              loan period for most items is 14 days, with an option for renewal
              if the item is not reserved by another user. All materials must be
              returned to the main desk.
            </p>

            <h3>3. Late Fees and Fines</h3>
            <p>
              A fine of $0.25 per day is charged for each overdue item. Fines
              for lost or damaged items will be assessed based on the
              replacement cost of the item plus a processing fee. Borrowing
              privileges will be suspended for accounts with outstanding fines
              exceeding $10.00.
            </p>

            <h3>4. Seat and Study Area Usage</h3>
            <p>
              Seats are available on a first-come, first-served basis unless
              assigned through the LibMan platform. Personal belongings should
              not be left unattended to "reserve" a seat. The library is not
              responsible for lost or stolen items.
            </p>

            <h3>5. Food and Drink</h3>
            <p>
              Covered drinks are permitted. No food is allowed in the main
              reading areas or near computer terminals. Please consume all meals
              in designated areas only.
            </p>

            <h3>6. Use of Library Computers and Wi-Fi</h3>
            <p>
              Library computers and the Wi-Fi network are provided for
              educational and informational purposes. Accessing illegal or
              inappropriate content is strictly forbidden and may result in the
              termination of library privileges.
            </p>

            <h3>7. Compliance</h3>
            <p>
              Failure to comply with these rules and regulations may result in a
              warning, suspension of library privileges, or, in severe cases,
              permanent expulsion from the library.
            </p>
          </div>
        </ScrollAnimation>
      </section>
      <Footer />
    </div>
  );
}
