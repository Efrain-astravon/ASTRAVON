"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Course = {
  id: string
  title: string
  description?: string | null
  duration?: string | null
  price?: number | null
  schoolName: string
}

type Props = {
  course: Course
}

export const CourseCard = ({ course }: Props) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <Badge variant="outline" className="shrink-0">
            {course.schoolName}
          </Badge>
        </div>
        {course.description && (
          <CardDescription className="line-clamp-3">{course.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {course.duration && (
            <Badge variant="secondary" className="text-xs">
              {course.duration}
            </Badge>
          )}
          {course.price !== null && course.price !== undefined && (
            <Badge variant="secondary" className="text-xs">${course.price}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
