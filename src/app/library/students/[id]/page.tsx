
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { students } from "../data";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";


export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    notFound();
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'secondary';
      case 'inactive':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/library/students">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
                {student.name}
            </h1>
            <p className="text-muted-foreground">
                Detailed information for student ID: {student.id}
            </p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={student.avatar} data-ai-hint="person portrait" />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl">{student.name}</CardTitle>
              <CardDescription>
                Joined on {format(new Date(student.joinDate), "PPP")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <InfoItem icon={<Mail />} label="Email" value={student.email} />
            <Separator />
            <InfoItem icon={<Phone />} label="Phone" value={student.phone} />
            <Separator />
            <InfoItem icon={<Clock />} label="Shift" value={student.shift} className="capitalize" />
            <Separator />
            <InfoItem icon={<DollarSign />} label="Fee" value={`$${student.fee.toFixed(2)}`} />
            <Separator />
            <InfoItem icon={<CalendarIcon />} label="Status">
                <Badge variant={getStatusBadgeVariant(student.status)} className="capitalize">{student.status}</Badge>
            </InfoItem>
        </CardContent>
        <CardFooter className="gap-2">
            <Button>Edit Profile</Button>
            <Button variant="outline">View Payment History</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function InfoItem({ icon, label, value, children, className }: { icon: React.ReactNode, label: string, value?: string, children?: React.ReactNode, className?: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            {value && <span className={`font-semibold text-sm ${className}`}>{value}</span>}
            {children}
        </div>
    )
}
