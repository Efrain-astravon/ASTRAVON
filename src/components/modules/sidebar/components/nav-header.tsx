"use client"

import { usePathname } from 'next/navigation'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

const NavHeader = () => {
  const pathname = usePathname() || ""
  const allSegments = pathname.replace(/^\/|\/$/g, "").split("/")
  const dashIndex = allSegments.indexOf("dashboard")
  const segments = dashIndex >= 0 ? allSegments.slice(dashIndex) : allSegments
  const hrefs = segments.map((_, idx) =>
    "/" + segments.slice(0, idx + 1).join("/")
  )

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.flatMap((segment, idx) => {
              const isLast = idx === segments.length - 1
              const raw = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
              const href = hrefs[idx]
              const items = [
                <BreadcrumbItem key={href}>
                  {isLast
                    ? <BreadcrumbPage>{raw}</BreadcrumbPage>
                    : <BreadcrumbLink href={href}>{raw}</BreadcrumbLink>
                  }
                </BreadcrumbItem>
              ]
              if (!isLast) {
                items.push(
                  <BreadcrumbSeparator key={`sep-${href}`} />
                )
              }
              return items
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default NavHeader
