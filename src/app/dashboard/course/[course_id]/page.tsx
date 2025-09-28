import CourseIndividualView from '@/components/modules/course/templates/course-individual-view'
import React from 'react'

type CourseIdPageProps = {
  params: Promise<{ course_id: string }>
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const { course_id } = await params
  return (
    <CourseIndividualView
      course_id={course_id}
    />
  )
}

export default CourseIdPage
