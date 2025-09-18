import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    // requireEmailVerification: process.env.NODE_ENV === "production",
  },
  plugins: [nextCookies(), admin()],
  advanced: {
    database: {
      generateId: false,
    },
  },
});
