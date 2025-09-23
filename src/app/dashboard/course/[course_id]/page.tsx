import React from 'react'

type CourseIdPageProps = {
  params: Promise<{ course_id: string }>
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
  const { course_id } = await params
  return (
    <div>CourseIdPage {course_id}</div>
  )
}

export default CourseIdPage
