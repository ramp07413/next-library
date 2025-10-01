
// @/components/company/company-sidebar.tsx
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BookOpen, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { COMPANY_NAV_LINKS } from "@/app/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function CompanySidebar() {
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
          {COMPANY_NAV_LINKS.map((link, index) =>
            link.sub ? (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <link.icon />
                    <span>{link.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {link.sub.map((subLink) => (
                      <SidebarMenuSubItem key={subLink.href}>
                         <Link href={subLink.href} passHref>
                          <SidebarMenuSubButton
                            isActive={pathname === subLink.href}
                          >
                            <subLink.icon />
                            <span>{subLink.label}</span>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  as="a"
                  href={link.href}
                  isActive={pathname === link.href}
                  tooltip={{ children: link.label }}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
