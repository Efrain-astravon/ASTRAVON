"use client"

import {
  type LucideIcon,
  School2Icon,
  Users2Icon,
  LibraryBigIcon,
  BookOpenIcon,
  SquarePlayIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"

type Project = {
  name: string
  url: string
  icon: LucideIcon
  isActive?: boolean,
}

const NavAdmin = () => {

  const pathName = usePathname()

  const projects: Project[] = [
    {
      name: "Escuelas",
      url: "/dashboard/school",
      icon: School2Icon,
    },
    {
      name: "Cursos",
      url: "/dashboard/course",
      icon: LibraryBigIcon,
    },
    {
      name: "Capítulos",
      url: "/dashboard/chapter",
      icon: BookOpenIcon,
    },
    {
      name: "Multimedia",
      url: "/dashboard/media",
      icon: SquarePlayIcon,
    },
    {
      name: "Usuarios",
      url: "/dashboard/user",
      icon: Users2Icon,
    },
  ]

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>Admin Platform</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className=""
          >
            <Link href={item.url} className="w-full">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.name} className={`${pathName === item.url && "bg-primary/90 hover:bg-primary "}`}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Link>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavAdmin;
