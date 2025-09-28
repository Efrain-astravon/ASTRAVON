"use client"

import ResponsiveDialog from '@/components/shared/dialog/responsive-dialog'
import React, { useState } from 'react'
import CourseUpsertForm from './course-upsert-form'

type CourseCreateButtonProps = {}

const CourseCreateButton = ({ }: CourseCreateButtonProps) => {
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
      <CourseUpsertForm
        onSuccessCallback={() => {
          setIsOpen(false)
        }}
      />
    </ResponsiveDialog>
  )
}

export default CourseCreateButton
