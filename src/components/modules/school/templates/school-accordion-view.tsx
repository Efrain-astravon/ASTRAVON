"use client"

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { CourseAccordion } from '../components/individual/course-accordion'
import { CourseType } from '@/trpc/routers/course/schemas'

type SchoolAccordionViewProps = {
  school_id: string
}

const SchoolAccordionView = ({ school_id }: SchoolAccordionViewProps) => {
  const trpc = useTRPC()

  const { data: school } = useSuspenseQuery(trpc.schoolRouter.get.queryOptions({
    id: school_id
  }))
  const { data: courses } = useSuspenseQuery(trpc.courseRouter.listBySchool.queryOptions({
    schoolId: school_id
  }))

  return (
    <CourseAccordion
      school={school}
      courses={courses as CourseType[]}
    />
  )
}

export default SchoolAccordionView
