"use client"

import ResponsiveDialog from '@/components/shared/dialog/responsive-dialog'
import { useState } from 'react'
import SchoolUpsertForm from './school-upsert-form'

type SchoolCreateButtonProps = {
}

const SchoolCreateButton = ({ }: SchoolCreateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ResponsiveDialog
      title="Create a New Procedure"
      description="Create a procedure to investigate"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      size="md"
      className='md:top-[45%]'
    >
      <SchoolUpsertForm
        onSuccessCallback={() => {
          setIsOpen(false)
        }}
      />
    </ResponsiveDialog>
  )
}

export default SchoolCreateButton
