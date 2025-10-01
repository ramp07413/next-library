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

  const isLinkActive = (href: string) => {
    // Exact match for dashboard, partial for others
    if (href === "/company") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isSubGroupActive = (subLinks: any[]) => {
    return subLinks.some((subLink) => isLinkActive(subLink.href));
  }

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
          {COMPANY_NAV_LINKS.map((link, index) => (
            <Collapsible
              key={index}
              className="w-full"
              defaultOpen={isSubGroupActive(link.sub)}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  variant="ghost"
                  className="w-full justify-start group"
                  isActive={isSubGroupActive(link.sub) && !link.sub.some(l => pathname.startsWith(l.href) && l.href !== '/company')}
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
                       <Link href={subLink.href} passHref legacyBehavior>
                        <SidebarMenuSubButton
                          isActive={isLinkActive(subLink.href)}
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
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
