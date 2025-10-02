"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "./CourseCard"

const LEVEL_LABELS = {
  BEGINNER: "Principiante",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
} as const

type Course = {
  id: string
  title: string
  description?: string | null
  duration?: string | null
  price?: number | null
  schoolName: string
  level: string
}

type Props = {
  coursesByLevel: Record<string, Course[]>
  sortedLevels: string[]
  defaultOpenLevels?: string[]
}

const CoursesAccordion = ({ coursesByLevel, sortedLevels, defaultOpenLevels }: Props) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpenLevels ?? []}
      className="space-y-4 grow"
    >
      {sortedLevels.map((level) => {
        const courses = coursesByLevel[level]
        const levelLabel = LEVEL_LABELS[level as keyof typeof LEVEL_LABELS] || level
        return (
          <AccordionItem
            key={level}
            value={level}
            className="border rounded-lg px-6 bg-card"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold">{levelLabel}</h3>
                <Badge variant="secondary" className="ml-2">
                  {courses.length} {courses.length === 1 ? "curso" : "cursos"}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default CoursesAccordion
