"use client"

import { ReactNode, useState } from "react"

import ResponsiveDialog from "@/components/shared/dialog/responsive-dialog"
import { CourseType } from "@/trpc/routers/course/schemas"
import CourseUpsertForm from "./course-upsert-form"

type CourseEditButtonProps = {
  row: Partial<CourseType>
  trigger?: ReactNode
  onSuccessCallback?: () => void
}

const CourseEditButton = ({ row, trigger, onSuccessCallback }: CourseEditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ResponsiveDialog
      title="Update your Team"
      description="Update this team to organize your work and collaborate with colleagues"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
      className="top-[45%]"
    >
      <CourseUpsertForm
        initialValues={row}
        onSuccessCallback={() => {
          setIsOpen(false)
          onSuccessCallback?.()
        }}
      />
    </ResponsiveDialog>
  )
}

export default CourseEditButton
