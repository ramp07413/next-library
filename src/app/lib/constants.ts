
import {
  Armchair,
  Bell,
  Building,
  CreditCard,
  LayoutGrid,
  Library,
  MessageSquare,
  FileText,
  Key,
  Receipt,
  Settings,
  User,
  UserCog,
  Users,
  Wallet,
  PlusSquare,
  List,
  Activity,
  UserCheck,
  Shield,
  History,
  Hourglass,
  Undo2,
  Briefcase,
  Users2,
  FileCheck,
  FileX,
  LifeBuoy,
  Mails,
  Star,
  CheckCircle,
  BellRing,
} from "lucide-react";

export const COMPANY_NAV_LINKS = [
  {
    label: "Company",
    icon: Briefcase,
    sub: [
      { href: "/company", label: "Dashboard", icon: LayoutGrid },
      {
        href: "/company/users",
        label: "Users",
        icon: UserCog,
      },
      {
        href: "/company/payments",
        label: "Payments",
        icon: CreditCard,
      },
      {
        href: "/company/expenses",
        label: "Expenses",
        icon: Wallet,
      },
      {
        href: "/company/reports/open",
        label: "Reports",
        icon: FileText,
      },
      { 
        href: "/company/messages", 
        label: "Messages", 
        icon: MessageSquare,
      },
      {
        href: "/company/alerts", 
        label: "Alerts", 
        icon: Bell,
      },
      { 
        href: "/company/settings", 
        label: "Settings", 
        icon: Settings 
      },
    ],
  },
  {
    label: "Libraries",
    icon: Building,
    sub: [
      {
        href: "/company/libraries",
        label: "Library List",
        icon: List,
      },
      {
        href: "/company/libraries/register",
        label: "Register Library",
        icon: PlusSquare,
      },
      {
        href: "/company/libraries/status",
        label: "Status",
        icon: Activity,
      },
    ],
  },
];


export const LIBRARY_NAV_LINKS = [
  { href: "/library", label: "Dashboard", icon: LayoutGrid },
  { href: "/library/seats", label: "Seats", icon: Armchair },
  { href: "/library/students", label: "Manage Students", icon: Users },
  { href: "/library/payments", label: "Payments", icon: CreditCard },
  { href: "/library/expenses", label: "Expenses", icon: Wallet },
  { href: "/library/alerts", label: "Alerts", icon: Bell },
  { href: "/library/admins", label: "Admin Management", icon: UserCog },
];

export const STUDENT_NAV_LINKS = [
  { href: "/student", label: "My Dashboard", icon: LayoutGrid },
  { href: "/student/details", label: "My Details", icon: User },
  { href: "/student/seat", label: "My Seat Detail", icon: Armchair },
  { href: "/student/payments", label: "My Payments", icon: CreditCard },
  { href: "/student/dues", label: "My Dues", icon: Receipt },
  { href: "/student/alerts", label: "My Alerts", icon: Bell },
];
