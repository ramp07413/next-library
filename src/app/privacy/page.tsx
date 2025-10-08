
"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/shared/scroll-animation";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <div className="container mx-auto flex flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">LibMan</h1>
          </Link>
          <div className="flex items-center gap-2">
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
              Privacy Policy
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </ScrollAnimation>
        </section>

        <section className="py-20 lg:py-24">
          <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h3>1. Information Collection</h3>
              <p>We collect information that you provide to us directly, such as when you create an account, as well as information that is automatically collected when you use our services, like your IP address and usage data.</p>
              
              <h3>2. Use of Information</h3>
              <p>The information we collect is used to provide, maintain, and improve our services, to process transactions, to communicate with you, and to ensure the security of our platform.</p>
              
              <h3>3. Data Sharing and Disclosure</h3>
              <p>We do not sell your personal information. We may share information with third-party service providers who perform services on our behalf, or if required by law.</p>
              
              <h3>4. Data Security</h3>
              <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
              
              <h3>5. Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information at any time by logging into your account settings.</p>

              <h3>6. Changes to This Policy</h3>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

              <h3>7. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, you can contact us at: contact@libman.com.</p>
            </div>
          </ScrollAnimation>
        </section>
      </main>
      <footer className="bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-800 text-center">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
