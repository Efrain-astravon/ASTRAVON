import { baseProcedure, createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { chapterRouter } from "./chapter";
import { courseRouter } from "./course";
import { mediaRouter } from "./media";
import { schoolRouter } from "./school";

export const appRouter = createTRPCRouter({
  healthcheck: baseProcedure.query(() => {
    return {
      message: `tRPC backend is Healthy`,
    };
  }),
  authRouter,
  schoolRouter,
  courseRouter,
  chapterRouter,
  mediaRouter,
});

export type AppRouter = typeof appRouter;
