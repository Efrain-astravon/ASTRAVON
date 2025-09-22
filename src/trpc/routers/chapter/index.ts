import {
  createChapterSchema,
  chapterIdSchema,
  updateChapterSchema,
  upsertChapterSchema,
} from "./schemas";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const chapterRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createChapterSchema)
    .mutation(async ({ input }) => {
      const newChapter = await prisma.chapter.create({
        data: {
          title: input.title,
          description: input.description,
          type: input.type,
          content: input.content,
          courseId: input.courseId,
        },
      });
      return newChapter;
    }),

  get: protectedProcedure.input(chapterIdSchema).query(async ({ input }) => {
    const chapter = await prisma.chapter.findUnique({
      where: { id: input.id },
    });
    if (!chapter) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Chapter not found" });
    }
    return chapter;
  }),

  list: protectedProcedure.query(async () => {
    return await prisma.chapter.findMany({
      orderBy: { title: "asc" },
    });
  }),

  update: protectedProcedure
    .input(updateChapterSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedChapter = await prisma.chapter.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
            type: input.type,
            content: input.content,
            courseId: input.courseId,
          },
        });
        return updatedChapter;
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chapter not found",
        });
      }
    }),

  delete: protectedProcedure
    .input(chapterIdSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.chapter.delete({
          where: { id: input.id },
        });
        return { success: true };
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chapter not found",
        });
      }
    }),

  upsert: protectedProcedure
    .input(upsertChapterSchema)
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          const updatedChapter = await prisma.chapter.update({
            where: { id: input.id },
            data: {
              title: input.title,
              description: input.description,
              type: input.type,
              content: input.content,
              courseId: input.courseId,
            },
          });
          return updatedChapter;
        } catch {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Chapter not found",
          });
        }
      } else {
        const newChapter = await prisma.chapter.create({
          data: {
            title: input.title,
            description: input.description,
            type: input.type,
            content: input.content,
            courseId: input.courseId,
          },
        });
        return newChapter;
      }
    }),
});
