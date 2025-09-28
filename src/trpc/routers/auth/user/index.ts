import { protectedProcedure } from "@/trpc/init";
import {
  createUserSchema,
  updateUserSchema,
  upsertUserSchema,
  userIdSchema,
  userRoleSchema,
} from "./schema";
import prisma from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const usersRouter = {
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.auth.user;
    return user;
  }),

  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),

  getById: protectedProcedure.input(userIdSchema).query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: { id: input.id },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuario no encontrado",
      });
    }
    return user;
  }),

  getByRole: protectedProcedure
    .input(userRoleSchema)
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        where: { role: input.role },
      });
      if (users.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No se encontraron usuarios con ese rol",
        });
      }
      return users;
    }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...data } = input;
        const updatedUser = await prisma.user.update({
          where: { id },
          data,
        });
        return updatedUser;
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuario no encontrado",
        });
      }
    }),

  upsert: protectedProcedure
    .input(upsertUserSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const user = await prisma.user.upsert({
        where: { id: id ?? "" },
        create: data,
        update: data,
      });
      return user;
    }),

  delete: protectedProcedure.input(userIdSchema).mutation(async ({ input }) => {
    try {
      await prisma.user.delete({
        where: { id: input.id },
      });
      return { success: true };
    } catch {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuario no encontrado",
      });
    }
  }),
};
