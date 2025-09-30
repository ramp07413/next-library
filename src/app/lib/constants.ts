import {
  Armchair,
  Bell,
  Building,
  CreditCard,
  LayoutGrid,
  Library,
  MessageSquare,
  Receipt,
  Settings,
  User,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

export const COMPANY_NAV_LINKS = [
  { href: "/company", label: "Dashboard", icon: LayoutGrid },
  { href: "#", label: "Libraries", icon: Library },
  { href: "#", label: "Users", icon: Users },
  { href: "#", label: "Payments", icon: CreditCard },
  { href: "#", label: "Expenses", icon: Wallet },
  { href: "#", label: "Alerts", icon: Bell },
  { href: "#", label: "Messages", icon: MessageSquare },
  { href: "#", label: "Settings", icon: Settings },
];

export const LIBRARY_NAV_LINKS = [
  { href: "/library", label: "Dashboard", icon: LayoutGrid },
  { href: "#", label: "Seats", icon: Armchair },
  { href: "#", label: "Manage Students", icon: Users },
  { href: "#", label: "Payments", icon: CreditCard },
  { href: "#", label: "Expenses", icon: Wallet },
  { href: "#", label: "Alerts", icon: Bell },
  { href: "#", label: "Admin Management", icon: UserCog },
];

export const STUDENT_NAV_LINKS = [
  { href: "/student", label: "My Dashboard", icon: LayoutGrid },
  { href: "#", label: "My Details", icon: User },
  { href: "#", label: "My Seat Detail", icon: Armchair },
  { href: "#", label: "My Payments", icon: CreditCard },
  { href: "#", label: "My Dues", icon: Receipt },
  { href: "#", label: "My Alerts", icon: Bell },
];
