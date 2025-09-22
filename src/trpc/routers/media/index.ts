import {
  createMediaSchema,
  mediaIdSchema,
  updateMediaSchema,
  upsertMediaSchema,
} from "./schemas";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const mediaRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createMediaSchema)
    .mutation(async ({ input }) => {
      const newMedia = await prisma.media.create({
        data: {
          url: input.url,
          chapterId: input.chapterId,
        },
      });
      return newMedia;
    }),

  get: protectedProcedure.input(mediaIdSchema).query(async ({ input }) => {
    const media = await prisma.media.findUnique({
      where: { id: input.id },
    });
    if (!media) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
    }
    return media;
  }),

  list: protectedProcedure.query(async () => {
    return await prisma.media.findMany({
      orderBy: { id: "asc" },
    });
  }),

  update: protectedProcedure
    .input(updateMediaSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedMedia = await prisma.media.update({
          where: { id: input.id },
          data: {
            url: input.url,
            chapterId: input.chapterId,
          },
        });
        return updatedMedia;
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
      }
    }),

  delete: protectedProcedure
    .input(mediaIdSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.media.delete({
          where: { id: input.id },
        });
        return { success: true };
      } catch {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
      }
    }),

  upsert: protectedProcedure
    .input(upsertMediaSchema)
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          const updatedMedia = await prisma.media.update({
            where: { id: input.id },
            data: {
              url: input.url,
              chapterId: input.chapterId,
            },
          });
          return updatedMedia;
        } catch {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Media not found",
          });
        }
      } else {
        const newMedia = await prisma.media.create({
          data: {
            url: input.url,
            chapterId: input.chapterId,
          },
        });
        return newMedia;
      }
    }),
});
