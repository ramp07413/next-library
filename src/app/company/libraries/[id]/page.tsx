
import { notFound, redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { libraries } from '../data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function LibraryDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const library = libraries.find((lib) => lib.id === params.id);

  if (!library) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/company/libraries">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {library.libraryName}
          </h1>
          <p className="text-muted-foreground">
            Detailed information for library ID: {library.id}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library Details</CardTitle>
          <CardDescription>
            General information about the library.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={library.isActive ? 'secondary' : 'outline'}>
              {library.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <Separator />
          <InfoItem icon={<Mail />} label="Email" value={library.libraryEmail} />
          <Separator />
          <InfoItem
            icon={<Phone />}
            label="Contact"
            value={library.libraryContact}
          />
          <Separator />
          <InfoItem
            icon={<MapPin />}
            label="Address"
            value={`${library.libraryAddress.street}, ${library.libraryAddress.city}, ${library.libraryAddress.state} ${library.libraryAddress.zip}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {value && <span className="font-semibold text-sm text-right">{value}</span>}
    </div>
  );
}
