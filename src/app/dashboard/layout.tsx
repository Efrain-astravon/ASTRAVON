export const dynamic = "force-dynamic";

import AppSidebar from '@/components/modules/sidebar/templates/app-sidebar';
import NavHeader from '@/components/modules/sidebar/components/nav-header';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavHeader />
        <div className="w-full h-full p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
