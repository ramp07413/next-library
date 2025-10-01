// @/components/student/student-sidebar.tsx
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { STUDENT_NAV_LINKS } from "@/app/lib/constants";
import Link from "next/link";

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold font-headline">LibMan</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {STUDENT_NAV_LINKS.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={{ children: link.label }}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
