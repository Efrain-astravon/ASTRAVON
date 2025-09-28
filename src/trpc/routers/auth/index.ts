import { createTRPCRouter } from "@/trpc/init";
import { usersRouter } from "./user";

export const authRouter = createTRPCRouter({
  // Users
  user: usersRouter,
});
