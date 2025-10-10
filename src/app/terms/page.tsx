'use client';

import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/shared/scroll-animation';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function TermsAndConditionsPage() {
  return (
    <div>
      <Header />
      <section className="py-20 lg:py-24 bg-muted">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
            Terms and Conditions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Please read these terms and conditions carefully before using Our
            Service.
          </p>
        </ScrollAnimation>
      </section>

      <section className="py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto">
            <h3>1. Introduction</h3>
            <p>
              Welcome to LibMan ("Company", "we", "our", "us")! These Terms of
              Service ("Terms", "Terms of Service") govern your use of our web
              pages located at [Your Website URL] operated by LibMan.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and
              explains how we collect, safeguard and disclose information that
              results from your use of our web pages. Please read it here [Link
              to Privacy Policy].
            </p>

            <h3>2. Accounts</h3>
            <p>
              When you create an account with us, you guarantee that you are
              above the age of 18, and that the information you provide us is
              accurate, complete, and current at all times. Inaccurate,
              incomplete, or obsolete information may result in the immediate
              termination of your account on our Service.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
              The Service and its original content, features and functionality
              are and will remain the exclusive property of LibMan and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of and foreign countries.
            </p>

            <h3>4. Termination</h3>
            <p>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>

            <h3>5. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of [Your Country], without regard to its conflict of law
              provisions.
            </p>

            <h3>6. Changes to Service</h3>
            <p>
              We reserve the right to withdraw or amend our Service, and any
              service or material we provide via the Service, in our sole
              discretion without notice. We will not be liable if for any reason
              all or any part of the Service is unavailable at any time or for
              any period.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              Please send your feedback, comments, requests for technical
              support by email: contact@libman.com.
            </p>
          </div>
        </ScrollAnimation>
      </section>
      <Footer />
    </div>
  );
}
