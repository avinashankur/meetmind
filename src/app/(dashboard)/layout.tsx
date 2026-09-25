import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-background flex h-screen min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardNavbar />
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
