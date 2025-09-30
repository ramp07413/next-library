
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  shift: 'morning' | 'afternoon' | 'evening';
  fee: number;
  status: 'active' | 'inactive';
  avatar: string;
};

export const students: Student[] = [
  {
    id: "STU-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    joinDate: new Date("2024-06-01T09:00:00Z").toISOString(),
    shift: "morning",
    fee: 150,
    status: "active",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
  },
  {
    id: "STU-002",
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "234-567-8901",
    joinDate: new Date("2024-06-10T14:00:00Z").toISOString(),
    shift: "afternoon",
    fee: 150,
    status: "active",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
  },
  {
    id: "STU-003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "345-678-9012",
    joinDate: new Date("2024-06-05T10:30:00Z").toISOString(),
    shift: "morning",
    fee: 150,
    status: "active",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '',
  },
  {
    id: "STU-004",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "456-789-0123",
    joinDate: new Date("2024-05-15T11:00:00Z").toISOString(),
    shift: "evening",
    fee: 120,
    status: "inactive",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
  },
  {
    id: "STU-005",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    phone: "567-890-1234",
    joinDate: new Date("2024-05-20T08:00:00Z").toISOString(),
    shift: "afternoon",
    fee: 150,
    status: "active",
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '',
  },
];
