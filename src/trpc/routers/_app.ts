import { baseProcedure, createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { chapterRouter } from "./chapter";
import { courseRouter } from "./course";
import { landingPageRouter } from "./lading_page";
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
  landingPageRouter,
});

export type AppRouter = typeof appRouter;
