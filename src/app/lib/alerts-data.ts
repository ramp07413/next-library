import type { Alert } from "@/ai/flows/prioritize-alerts";

type MockData = {
  [key: string]: Alert[];
};

export const mockAlerts: MockData = {
  company: [
    {
      id: "comp-1",
      message: "New library 'City Central' subscription started.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: "payment",
      severity: "low",
    },
    {
      id: "comp-2",
      message: "System update scheduled for tonight at 2 AM.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      category: "system",
      severity: "medium",
    },
    {
      id: "comp-3",
      message: "Subscription payment for 'Tech Park Library' has failed.",
      timestamp: new Date().toISOString(),
      category: "payment",
      severity: "high",
    },
  ],
  library: [
    {
      id: "lib-1",
      message: "Student John Doe has paid his monthly fee.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      category: "payment",
      severity: "low",
    },
    {
      id: "lib-2",
      message: "The library will be closed this Saturday for maintenance.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "announcement",
      severity: "medium",
    },
    {
      id: "lib-3",
      message: "Emergency fire drill today at 3 PM.",
      timestamp: new Date().toISOString(),
      category: "system",
      severity: "high",
    },
    {
      id: "lib-4",
      message: "5 student payments are overdue.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      category: "payment",
      severity: "high",
    },
  ],
  student: [
    {
      id: "stu-1",
      message: "Your monthly fee receipt for June is available.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: "payment",
      severity: "low",
    },
    {
      id: "stu-2",
      message: "Library timings have been extended during exam week.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "announcement",
      severity: "medium",
    },
    {
      id: "stu-3",
      message: "Your monthly fee of $50 is due tomorrow.",
      timestamp: new Date().toISOString(),
      category: "payment",
      severity: "high",
    },
  ],
};

export const mockUserContext: { [key: string]: string } = {
  company: "User is a Company Admin. They are responsible for overall business health, including revenue and client management.",
  library: "User is a Library Admin. Their main concerns are daily operations, student management, and fee collection for their specific branch.",
  student: "User is a Student with an active seat. Their primary focus is on their seat details and payment dues.",
};
