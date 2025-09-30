import CompanySidebar from "@/components/company/company-sidebar";
import MainNav from "@/components/shared/main-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CompanySidebar />
      <SidebarInset>
        <div className="flex flex-col">
          <MainNav role="company" />
          <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
