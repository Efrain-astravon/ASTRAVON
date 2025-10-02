import { z } from "zod";
import { CourseSchema } from "../course/schemas";
import { SchoolSchema } from "../school/schemas";

const CourseWithRelationsSchema = CourseSchema;

const SchoolWithCoursesSchema = SchoolSchema.extend({
  courses: z.array(CourseWithRelationsSchema),
});

export type SchoolWithCoursesType = z.infer<typeof SchoolWithCoursesSchema>;

const SchoolsWithCoursesArraySchema = z.array(SchoolWithCoursesSchema);
export type SchoolsWithCoursesArrayType = z.infer<
  typeof SchoolsWithCoursesArraySchema
>;
