import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import NavUserTrigger from "./nav-user-trigger"
import NavUserList from "./nav-user-list"
import { caller } from "@/trpc/server"
import { User } from "better-auth"

const NavUser = async () => {
  const user: User = await caller.authRouter.user.getCurrentUser()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <NavUserTrigger user={user} />
          <NavUserList user={user} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser;
