import { PlaceHolderImages } from "@/lib/placeholder-images";

export const kpiData = {
  totalSeats: 150,
  occupiedSeats: 125,
  freeSeats: 25,
  monthlyIncome: 12500,
};

export const occupancyData = [
  { month: "Jan", occupied: 110 },
  { month: "Feb", occupied: 115 },
  { month: "Mar", occupied: 120 },
  { month: "Apr", occupied: 118 },
  { month: "May", occupied: 122 },
  { month: "Jun", occupied: 125 },
];

export const paymentCollectionData = [
    { date: "Jun 1", collected: 4000 },
    { date: "Jun 5", collected: 3000 },
    { date: "Jun 10", collected: 5000 },
    { date: "Jun 15", collected: 2500 },
    { date: "Jun 20", collected: 6000 },
    { date: "Jun 25", collected: 1500 },
];

export const studentData = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    seat: "101",
    paymentStatus: "Paid",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl,
  },
  {
    id: "2",
    name: "Bob Williams",
    email: "bob@example.com",
    seat: "205",
    paymentStatus: "Due",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    seat: "321",
    paymentStatus: "Paid",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl,
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    seat: "102",
    paymentStatus: "Paid",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl,
  },
    {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    seat: "411",
    paymentStatus: "Overdue",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl,
  },
];
