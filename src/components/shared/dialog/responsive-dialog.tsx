"use client"

import { ReactNode } from "react"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"

type ModalFormProps = {
  children: ReactNode
  className?: string
  title: string
  description: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disableOutsideClick?: boolean
  trigger?: ReactNode
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
}

const ResponsiveDialog = ({
  children,
  className,
  title,
  description,
  isOpen,
  onOpenChange,
  size = 'lg',
  disableOutsideClick = false,
  trigger,
}: ModalFormProps) => {
  const isMobile = useIsMobile()

  // default trigger si no se pasa ninguno
  const defaultTrigger = (
    <Button size="sm" className="h-10 w-10 p-0" aria-label="Open modal">
      <Plus className="h-5 w-5" />
    </Button>
  )

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
          <DrawerTrigger asChild>
            {trigger || defaultTrigger}
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="bg-black/10 backdrop-blur-sm" />
            <DrawerContent className={`pb-16 ${className}`}>
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
              <div className="flex justify-center items-center">
                <div className={`w-full ${SIZE_CLASSES[size] || SIZE_CLASSES.lg}`}>
                  {children}
                </div>
              </div>
              {/* <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter> */}
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            {trigger || defaultTrigger}
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-black/10 backdrop-blur-sm" />
            <DialogContent
              onInteractOutside={disableOutsideClick ? (e) => e.preventDefault() : undefined}
              className={`top-[35%] left-[50%] translate-x-[-50%] w-full ${SIZE_CLASSES[size]} ${className}`}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {children}
              {/* <DialogFooter>
              <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter> */}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  )
}

export default ResponsiveDialog
