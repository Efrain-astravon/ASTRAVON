"use client"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

type School = {
  id: string
  name: string
}
type Props = {
  schools: School[]
  selectedSchoolIds: string[]
  toggleSchool: (schoolId: string) => void
}

export const SchoolFilter = ({ schools, selectedSchoolIds, toggleSchool }: Props) => {
  const [visibleCount, setVisibleCount] = useState(5)

  const visibleSchools = schools.slice(0, visibleCount)
  const hasMore = visibleCount < schools.length

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, schools.length))
  }

  return (
    <div className="flex flex-wrap gap-3">
      {visibleSchools.map((school) => {
        const isSelected = selectedSchoolIds.includes(school.id)
        return (
          <Badge
            key={school.id}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              "px-4 py-2 text-sm font-medium"
            )}
            onClick={() => toggleSchool(school.id)}
          >
            {school.name}
          </Badge>
        )
      })}

      {hasMore && (
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer transition-all hover:scale-105",
            "px-4 py-2 text-sm font-medium flex items-center justify-center"
          )}
          onClick={showMore}
          aria-label="Mostrar más escuelas"
        >
          <Plus className="w-4 h-4" />
        </Badge>
      )}
    </div>
  )
}
