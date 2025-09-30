
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type LibraryAdmin = {
  id: string;
  name: string;
  email: string;
  role: 'head' | 'librarian' | 'clerk';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
};

export const admins: LibraryAdmin[] = [
  {
    id: "ADMIN-001",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "head",
    status: "active",
    joinDate: new Date("2022-08-01T09:00:00Z").toISOString(),
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
  },
  {
    id: "ADMIN-002",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    role: "librarian",
    status: "active",
    joinDate: new Date("2023-03-15T10:00:00Z").toISOString(),
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
  },
  {
    id: "ADMIN-003",
    name: "Emily White",
    email: "emily.w@example.com",
    role: "clerk",
    status: "active",
    joinDate: new Date("2023-10-20T11:00:00Z").toISOString(),
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
  },
  {
    id: "ADMIN-004",
    name: "David Green",
    email: "david.g@example.com",
    role: "librarian",
    status: "inactive",
    joinDate: new Date("2021-05-10T09:30:00Z").toISOString(),
    avatar: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '',
  },
];
