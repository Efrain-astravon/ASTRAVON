import {
  createCourseSchema,
  courseIdSchema,
  updateCourseSchema,
  upsertCourseSchema,
} from "./schemas";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const courseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCourseSchema)
    .mutation(async ({ input }) => {
      const newCourse = await prisma.course.create({
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          level: input.level,
          thumbnail: input.thumbnail,
          teacherId: input.teacherId,
          schoolId: input.schoolId,
        },
      });
      return newCourse;
    }),

  get: protectedProcedure.input(courseIdSchema).query(async ({ input }) => {
    const course = await prisma.course.findUnique({
      where: { id: input.id },
    });
    if (!course) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
    }
    return course;
  }),

  list: protectedProcedure.query(async () => {
    return await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  update: protectedProcedure
    .input(updateCourseSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedCourse = await prisma.course.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
            status: input.status,
            level: input.level,
            thumbnail: input.thumbnail,
            teacherId: input.teacherId,
            schoolId: input.schoolId,
          },
        });
        return updatedCourse;
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
    }),

  delete: protectedProcedure
    .input(courseIdSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.course.delete({
          where: { id: input.id },
        });
        return { success: true };
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
      }
    }),

  upsert: protectedProcedure
    .input(upsertCourseSchema)
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          const updatedCourse = await prisma.course.update({
            where: { id: input.id },
            data: {
              title: input.title,
              description: input.description,
              status: input.status,
              level: input.level,
              thumbnail: input.thumbnail,
              teacherId: input.teacherId,
              schoolId: input.schoolId,
            },
          });
          return updatedCourse;
        } catch {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          });
        }
      } else {
        const newCourse = await prisma.course.create({
          data: {
            title: input.title,
            description: input.description,
            status: input.status,
            level: input.level,
            thumbnail: input.thumbnail,
            teacherId: input.teacherId,
            schoolId: input.schoolId,
          },
        });
        return newCourse;
      }
    }),
});
