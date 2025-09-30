import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "./Logo"
import BurguerIcon from "./BurguerIcon"
import { BookPlusIcon, HouseIcon, User2Icon } from "lucide-react"
import Link from "next/link"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", icon: HouseIcon, active: true },
  { href: "/escuelas", label: "Escuelas", icon: BookPlusIcon },
]

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <BurguerIcon className="pointer-events-none" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="py-1.5"
                          active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link href={"/"} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        active={link.active}
                        href={link.href}
                        className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                      >
                        <Icon
                          size={16}
                          className="text-muted-foreground/80"
                          aria-hidden="true"
                        />
                        <span>{link.label}</span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="text-sm">
            <Link href="/sign-in">
              <div className="flex justify-center items-center gap-2">
                <User2Icon className="size-4" />
                <p>Iniciar Sesión</p>
              </div></Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
