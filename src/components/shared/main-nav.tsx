import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { AlertsDropdown } from "./alerts-dropdown";
import { SettingsDropdown } from "./settings-dropdown";

interface MainNavProps {
  role: "company" | "library" | "student";
}

export default function MainNav({ role }: MainNavProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 pt-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <AlertsDropdown role={role} />
        <SettingsDropdown />
        <UserNav />
      </div>
    </header>
  );
}
