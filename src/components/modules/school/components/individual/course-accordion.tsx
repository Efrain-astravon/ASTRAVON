import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseType } from "@/trpc/routers/course/schemas";
import { SchoolType } from "@/trpc/routers/school/schemas";
import { LevelEnumType } from "@/trpc/routers/shared/enums";
import CourseGalleryItem from "./course-gallery-item";

type CourseAccordionProps = {
  courses: CourseType[];
  school: SchoolType;
};

const levelLabels = {
  BEGINNER: "Fácil",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
};

export function CourseAccordion({ courses, school }: CourseAccordionProps) {
  // Filtrar cursos por nivel
  const coursesByLevel: Record<LevelEnumType, CourseType[]> = {
    BEGINNER: [],
    INTERMEDIATE: [],
    ADVANCED: [],
  };

  courses.forEach((course) => {
    if (coursesByLevel[course.level]) {
      coursesByLevel[course.level].push(course);
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">{school.name}</h2>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {(Object.keys(coursesByLevel) as LevelEnumType[]).map((level) => {
          const levelCourses = coursesByLevel[level];

          return (
            <AccordionItem key={level} value={level}>
              <AccordionTrigger>{levelLabels[level]}</AccordionTrigger>
              <AccordionContent>
                {levelCourses.length === 0 ? (
                  <p className="p-4">No hay cursos disponibles para este nivel.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {levelCourses.map((course) => (
                      <CourseGalleryItem key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
