"use client"

import { ReactNode, useState } from "react"

import { SchoolType } from '@/trpc/routers/school/schemas'
import ResponsiveDialog from "@/components/shared/dialog/responsive-dialog"
import SchoolUpsertForm from "./school-upsert-form"

type SchoolEditButtonProps = {
  row: Partial<SchoolType>
  trigger?: ReactNode
  onSuccessCallback?: () => void
}

const SchoolEditButton = ({ row, trigger, onSuccessCallback }: SchoolEditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ResponsiveDialog
      title="Update your Team"
      description="Update this team to organize your work and collaborate with colleagues"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
    >
      <SchoolUpsertForm
        initialValues={row}
        onSuccessCallback={() => {
          setIsOpen(false)
          onSuccessCallback?.()
        }}
      />
    </ResponsiveDialog>
  )
}

export default SchoolEditButton
