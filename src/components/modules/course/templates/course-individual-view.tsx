import React from 'react'

type CourseIndividualViewProps = {
  course_id: string
}

const CourseIndividualView = ({ course_id }: CourseIndividualViewProps) => {
  return (
    <div>{course_id}</div>
  )
}

export default CourseIndividualView
