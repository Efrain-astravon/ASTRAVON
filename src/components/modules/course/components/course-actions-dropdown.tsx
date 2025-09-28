import { Row } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2Icon, EllipsisIcon, Trash2Icon } from 'lucide-react'
import CourseEditButton from './course-edit-button'
import { CourseType } from '@/trpc/routers/course/schemas'
import CourseDeleteButton from './course-delete-button'

type CourseActionsDropdownProps<T> = {
  row: Row<T>
  className?: string
  align?: "start" | "end" | "center"
}

const CourseActionsDropdown = <T,>({ row, className, align = "center" }: CourseActionsDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDoubleClickInsideMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className={`flex justify-center items-center ${className ?? ""}`}>
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Open row actions"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} onDoubleClick={handleDoubleClickInsideMenu}>
        <DropdownMenuGroup >
          <DropdownMenuItem asChild>
            <CourseEditButton
              row={row.original as Partial<CourseType>}
              trigger={
                <Button variant={"ghost"} size={"sm"} className="w-full">
                  <Edit2Icon className="size-4" />
                  <span>Edit</span>
                </Button>
              }
              onSuccessCallback={() => { setIsOpen(false) }}
            />

          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <CourseDeleteButton
              row={row.original as Partial<CourseType>}
              trigger={
                <Button variant={"destructive"} size={"sm"} className="w-full">
                  <Trash2Icon className="size-4" />
                  <span>Delete</span>
                </Button>
              }
              onSuccessCallback={() => { setIsOpen(false) }}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CourseActionsDropdown
