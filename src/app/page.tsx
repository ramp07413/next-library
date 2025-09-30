import Link from "next/link";
import { ArrowRight, Building, Library, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold text-primary">LibMan Platform</h1>
      </header>
      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight font-headline">
              The Modern Solution for Library Management
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Streamline operations, enhance student experience, and gain valuable insights with our all-in-one platform.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h3 className="text-2xl font-bold text-center mb-10 font-headline">Choose Your Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <DashboardCard
              title="Company Dashboard"
              description="Oversee all libraries, manage subscriptions, and view company-wide analytics."
              icon={<Building className="w-10 h-10 text-primary" />}
              href="/company"
            />
            <DashboardCard
              title="Library Dashboard"
              description="Manage seats, students, payments, and expenses for your specific library branch."
              icon={<Library className="w-10 h-10 text-primary" />}
              href="/library"
            />
            <DashboardCard
              title="Student Dashboard"
              description="View your seat details, track payments, and receive important alerts from your library."
              icon={<User className="w-10 h-10 text-primary" />}
              href="/student"
            />
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LibMan Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function DashboardCard({ title, description, icon, href }: DashboardCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <div className="bg-secondary p-3 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-muted-foreground flex-grow">{description}</p>
        <Link href={href} className="mt-4">
          <Button className="w-full">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
