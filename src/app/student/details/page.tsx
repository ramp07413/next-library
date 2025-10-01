
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { studentProfile } from "../data";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDetailsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Details
        </h1>
        <p className="text-muted-foreground">
            View and manage your personal information.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={studentProfile.avatar} data-ai-hint="person portrait" />
              <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl">{studentProfile.name}</CardTitle>
              <CardDescription>
                Your profile is up to date.
              </CardDescription>
              <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <InfoItem icon={<User />} label="Name" value={studentProfile.name} />
            <Separator />
            <InfoItem icon={<Mail />} label="Email" value={studentProfile.email} />
            <Separator />
            <InfoItem icon={<Phone />} label="Phone" value={studentProfile.phone} />
            <Separator />
            <InfoItem icon={<CalendarIcon />} label="Join Date" value={studentProfile.joinDate} />
        </CardContent>
      </Card>
    </div>
  );
}


function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            {value && <span className="font-semibold text-sm">{value}</span>}
        </div>
    )
}
