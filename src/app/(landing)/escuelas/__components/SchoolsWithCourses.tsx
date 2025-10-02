"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { SchoolFilter } from "./SchoolFilter"
import CoursesAccordion from "./CoursesAccordion"

const LEVEL_ORDER = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const

type School = {
  id: string
  name: string
  courses: {
    id: string
    title: string
    description?: string | null
    duration?: string | null
    price?: number | null
    level?: string | null
  }[]
}

const SchoolsWithCourses = () => {
  const trpc = useTRPC()

  const { data: schools } = useSuspenseQuery(
    trpc.landingPageRouter.listWithCourses.queryOptions()
  )

  const [selectedSchoolIds, setSelectedSchoolIds] = useState<string[]>(
    schools.length > 0 ? [schools[0].id] : []
  )

  const toggleSchool = (schoolId: string) => {
    setSelectedSchoolIds((prev) =>
      prev.includes(schoolId)
        ? prev.filter((id) => id !== schoolId)
        : [...prev, schoolId]
    )
  }

  const coursesByLevel = useMemo(() => {
    const selectedSchools = schools.filter((school) =>
      selectedSchoolIds.includes(school.id)
    )
    const allCourses = selectedSchools.flatMap((school) =>
      school.courses.map((course) => ({
        ...course,
        schoolName: school.name,
        schoolId: school.id,
        level: course.level || "BEGINNER",
        duration:
          typeof course.duration === "number"
            ? course.duration.toString()
            : course.duration ?? null,
      }))
    )
    const grouped = allCourses.reduce((acc, course) => {
      const level = course.level || "BEGINNER"
      if (!acc[level]) {
        acc[level] = []
      }
      acc[level].push(course)
      return acc
    }, {} as Record<string, typeof allCourses>)
    return grouped
  }, [schools, selectedSchoolIds])

  const sortedLevels = useMemo(() => {
    return LEVEL_ORDER.filter((level) => coursesByLevel[level]?.length > 0)
  }, [coursesByLevel])

  return (
    <div className="w-full flex flex-col grow max-w-7xl mx-auto pt-8 gap-8 px-8">
      <div>
        <SchoolFilter
          schools={schools}
          selectedSchoolIds={selectedSchoolIds}
          toggleSchool={toggleSchool}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedSchoolIds.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-center py-12 text-muted-foreground">
            Selecciona al menos una escuela para ver sus cursos
          </div>
        ) : sortedLevels.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-center py-12 text-muted-foreground">
            No hay cursos disponibles para las escuelas seleccionadas
          </div>
        ) : (
          <CoursesAccordion coursesByLevel={coursesByLevel} sortedLevels={sortedLevels} />
        )}
      </div>
    </div>
  )
}

export default SchoolsWithCourses
