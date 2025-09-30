
export type User = {
  id: string;
  email: string;
  role: 'student' | 'admin' | 'super_admin' | 'owner';
  isActive: boolean;
  createdAt: string;
};

export const users: User[] = [
  {
    id: "1",
    email: "owner@libman.com",
    role: "owner",
    isActive: true,
    createdAt: new Date("2023-01-15T10:00:00Z").toISOString(),
  },
  {
    id: "2",
    email: "superadmin@libman.com",
    role: "super_admin",
    isActive: true,
    createdAt: new Date("2023-02-20T11:30:00Z").toISOString(),
  },
  {
    id: "3",
    email: "admin.citycentral@libman.com",
    role: "admin",
    isActive: true,
    createdAt: new Date("2023-03-01T09:00:00Z").toISOString(),
  },
    {
    id: "4",
    email: "admin.techpark@libman.com",
    role: "admin",
    isActive: false,
    createdAt: new Date("2023-04-10T14:20:00Z").toISOString(),
  },
  {
    id: "5",
    email: "student.johndoe@example.com",
    role: "student",
    isActive: true,
    createdAt: new Date("2024-05-25T18:00:00Z").toISOString(),
  },
  {
    id: "6",
    email: "student.janesmith@example.com",
    role: "student",
    isActive: true,
    createdAt: new Date("2024-06-01T12:00:00Z").toISOString(),
  },
];
