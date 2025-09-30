import StudentSidebar from "@/components/student/student-sidebar";
import MainNav from "@/components/shared/main-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <div className="flex flex-col">
          <MainNav role="student" />
          <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
