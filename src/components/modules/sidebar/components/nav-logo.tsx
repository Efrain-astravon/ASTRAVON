import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NavLogo = (props: Props) => {
  return (
    <Link href={"/dashboard"}>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <GalleryVerticalEndIcon className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">Astravon</span>
        <span className="">v1.0.0</span>
      </div>
    </Link>
  )
}

export default NavLogo
