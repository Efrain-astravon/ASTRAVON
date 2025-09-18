"use client"
import { usePathname } from "next/navigation"

import {
  ChevronRight,
  BookOpenIcon,
  BotIcon,
  Settings2Icon,
  Users2Icon,
  type LucideIcon,
  ToolCaseIcon,
  FolderSearch2Icon,
  FolderTreeIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}[]

const NavMain = () => {
  const pathname = usePathname()

  const baseItems: NavItem = [
    {
      title: "Workspace",
      url: "/dashboard",
      icon: Users2Icon,
      items: [
        {
          title: "Organizations",
          url: "/dashboard/organizations",
        },
        {
          title: "Teams",
          url: "/dashboard/teams",
        },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Tools",
      url: "/dashboard/tools",
      icon: FolderSearch2Icon,
      items: [
        {
          title: "Search",
          url: "/dashboard/tools/search",
        },
        // {
        //   title: "Explorer",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Legal Areas",
      url: "/dashboard/legal-areas",
      icon: FolderTreeIcon,
      items: [
        {
          title: "Areas",
          url: "/dashboard/legal-areas",
        },
        // {
        //   title: "Get Started",
        //   url: "#",
        // },
        // {
        //   title: "Tutorials",
        //   url: "#",
        // },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2Icon,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ]

  const items = baseItems.map((item) => ({
    ...item,
    isActive: item.items
      ? item.items.some((subItem) => pathname.startsWith(subItem.url))
      : pathname.startsWith(item.url),
  }))

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain;
