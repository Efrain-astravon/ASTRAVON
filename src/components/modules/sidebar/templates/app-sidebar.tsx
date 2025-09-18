import { ComponentProps, Suspense } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import NavMain from "../components/nav-main"
import NavUser from "../components/nav-user"
import NavLogo from "../components/nav-logo"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import NavAdmin from "../components/nav-admin"

const AppSidebar = async ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
          user?.role === "admin" && <NavAdmin />
        }
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div>Loading..</div>}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
