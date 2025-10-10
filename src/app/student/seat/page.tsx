
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaChair, FaCalendarAlt, FaClock, FaHashtag } from 'react-icons/fa';
import { seatDetails } from "../data";
import { Separator } from "@/components/ui/separator";

export default function MySeatDetailPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          My Seat Detail
        </h1>
        <p className="text-muted-foreground">
          All the information related to your assigned seat.
        </p>
      </div>

       <Card className="max-w-md">
        <CardHeader>
            <CardTitle>Seat {seatDetails.seatNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <InfoItem icon={<FaHashtag />} label="Seat Number" value={seatDetails.seatNumber} />
            <Separator />
            <InfoItem icon={<FaChair />} label="Seat Type" value={seatDetails.seatType} />
            <Separator />
            <InfoItem icon={<FaClock />} label="Library Timing" value={seatDetails.libraryTiming} />
            <Separator />
            <InfoItem icon={<FaCalendarAlt />} label="Status">
            <Badge>{seatDetails.status}</Badge>
            </InfoItem>
        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full">Report an Issue</Button>
        </CardFooter>
        </Card>
    </div>
  );
}

function InfoItem({ icon, label, value, children }: { icon: React.ReactNode, label: string, value?: string, children?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            {value && <span className="font-semibold">{value}</span>}
            {children}
        </div>
    )
}
