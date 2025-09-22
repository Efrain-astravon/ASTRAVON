import { protectedProcedure } from "@/trpc/init";

export const usersRouter = {
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.auth.user;
    return user;
  }),
};
