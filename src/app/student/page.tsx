
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaChair, FaCalendarAlt, FaClock, FaDownload, FaHashtag } from 'react-icons/fa';
import { seatDetails, paymentHistory, upcomingDues } from "./data";
import { Separator } from "@/components/ui/separator";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        My Dashboard
      </h1>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Due</CardTitle>
              <CardDescription>
                Your next payment is scheduled for{" "}
                {new Date(upcomingDues.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-4xl font-bold">
                ${upcomingDues.amount.toFixed(2)}
              </div>
              <Button className="w-full sm:w-auto">Pay Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Review your past transactions and download receipts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{payment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <FaDownload className="h-4 w-4" />
                          <span className="sr-only">FaDownload receipt</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>My Seat Details</CardTitle>
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
      </div>
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
