
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Message = {
  id: string;
  subject: string;
  sender: string;
  senderAvatar: string;
  date: string;
  type: 'library_comm' | 'support_ticket' | 'announcement';
  status: 'read' | 'unread';
  content: string;
};

export const messages: Message[] = [
  {
    id: "MSG-001",
    subject: "Monthly Performance Report",
    sender: "City Central Library",
    senderAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    type: "library_comm",
    status: "unread",
    content: "Please find attached our performance report for the previous month. We have seen a 5% increase in student sign-ups.",
  },
  {
    id: "MSG-002",
    subject: "Issue with Payment Gateway",
    sender: "Tech Park Library",
    senderAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    type: "support_ticket",
    status: "read",
    content: "We are experiencing an issue where the payment gateway is failing for some students. Can you please investigate?",
  },
  {
    id: "MSG-003",
    subject: "New Feature Announcement: AI-Powered Insights",
    sender: "LibMan Platform",
    senderAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: "announcement",
    status: "read",
    content: "We are excited to announce the launch of our new AI-powered analytics dashboard, providing deeper insights into library performance.",
  },
  {
    id: "MSG-004",
    subject: "Inquiry about Subscription Upgrade",
    sender: "Downtown Branch",
    senderAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    type: "library_comm",
    status: "read",
    content: "We are interested in upgrading to the Enterprise plan. Could you provide more details on the additional features?",
  },
  {
    id: "MSG-005",
    subject: "Bug Report: Student Export Fails",
    sender: "Suburb Community Library",
    senderAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '',
    date: new Date().toISOString(),
    type: "support_ticket",
    status: "unread",
    content: "The feature to export student data to a CSV file is not working. It returns a server error every time.",
  },
];
