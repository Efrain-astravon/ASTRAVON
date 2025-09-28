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
          smallDescription: input.smallDescription,
          price: input.price,
          duration: input.duration,
          slug: input.slug,
          status: input.status,
          level: input.level,
          thumbnailUrl: input.thumbnailUrl,
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
        const data: any = {};
        if (input.title !== undefined) data.title = input.title;
        if (input.description !== undefined)
          data.description = input.description;
        if (input.smallDescription !== undefined)
          data.smallDescription = input.smallDescription;
        if (input.price !== undefined) data.price = input.price;
        if (input.duration !== undefined) data.duration = input.duration;
        if (input.slug !== undefined) data.slug = input.slug;
        if (input.status !== undefined) data.status = input.status;
        if (input.level !== undefined) data.level = input.level;
        if (input.thumbnailUrl !== undefined)
          data.thumbnailUrl = input.thumbnailUrl;
        if (input.teacherId !== undefined) data.teacherId = input.teacherId;
        if (input.schoolId !== undefined) data.schoolId = input.schoolId;

        const updatedCourse = await prisma.course.update({
          where: { id: input.id },
          data,
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
      const data = {
        title: input.title,
        description: input.description,
        smallDescription: input.smallDescription,
        price: input.price,
        duration: input.duration,
        slug: input.slug,
        status: input.status,
        level: input.level,
        thumbnailUrl: input.thumbnailUrl,
        teacherId: input.teacherId,
        schoolId: input.schoolId,
      };

      if (input.id) {
        try {
          const updatedCourse = await prisma.course.update({
            where: { id: input.id },
            data,
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
          data,
        });
        return newCourse;
      }
    }),
});
