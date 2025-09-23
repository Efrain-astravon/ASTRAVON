import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {
  createSchoolSchema,
  schoolIdSchema,
  updateSchoolSchema,
  upsertSchoolSchema,
} from "./schemas";

export const schoolRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createSchoolSchema)
    .mutation(async ({ input }) => {
      const newSchool = await prisma.school.create({
        data: {
          name: input.name,
          level: input.level,
        },
      });
      return newSchool;
    }),

  get: protectedProcedure.input(schoolIdSchema).query(async ({ input }) => {
    const school = await prisma.school.findUnique({
      where: { id: input.id },
    });
    if (!school) {
      throw new TRPCError({ code: "NOT_FOUND", message: "School not found" });
    }
    return school;
  }),

  list: protectedProcedure.query(async () => {
    return await prisma.school.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  update: protectedProcedure
    .input(updateSchoolSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedSchool = await prisma.school.update({
          where: { id: input.id },
          data: {
            name: input.name,
            level: input.level,
          },
        });
        return updatedSchool;
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "School not found" });
      }
    }),

  delete: protectedProcedure
    .input(schoolIdSchema)
    .mutation(async ({ input }) => {
      console.log(input.id)
      try {
        await prisma.school.delete({
          where: { id: input.id },
        });
        return { success: true };
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "School not found" });
      }
    }),

  upsert: protectedProcedure
    .input(upsertSchoolSchema)
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          const updatedSchool = await prisma.school.update({
            where: { id: input.id },
            data: {
              name: input.name,
              level: input.level,
            },
          });
          return updatedSchool;
        } catch {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "School not found",
          });
        }
      } else {
        const newSchool = await prisma.school.create({
          data: {
            name: input.name,
            level: input.level,
          },
        });
        return newSchool;
      }
    }),
});
