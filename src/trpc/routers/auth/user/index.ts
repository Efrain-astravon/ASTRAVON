import { protectedProcedure } from "@/trpc/init";
import prisma from "@/lib/prisma";

export const usersRouter = {
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.auth.user;
    return user;
  }),
};
