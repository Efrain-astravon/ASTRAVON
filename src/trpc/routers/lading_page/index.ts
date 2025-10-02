import prisma from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { SchoolsWithCoursesArrayType } from "./schemas";

export const landingPageRouter = createTRPCRouter({
  listWithCourses: baseProcedure.query(async () => {
    try {
      const schools = await prisma.school.findMany({
        include: {
          courses: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return schools as SchoolsWithCoursesArrayType;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching schools with courses",
      });
    }
  }),
});
