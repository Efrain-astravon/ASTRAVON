import { z } from "zod";

const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  role: z.string(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email inválido"),
  emailVerified: z.boolean().optional(),
  image: z.string().nullable().optional(),
  role: z.string().optional(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export const userIdSchema = z.object({
  id: z.uuid(),
});

export type UserIdSchema = z.infer<typeof userIdSchema>;

export const userRoleSchema = z.object({
  role: z.string(),
});

export type UserRoleType = z.infer<typeof userRoleSchema>;

export const updateUserSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "El nombre es requerido").optional(),
  email: z.email("Email inválido").optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().nullable().optional(),
  role: z.string().optional(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const upsertUserSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Email inválido"),
  emailVerified: z.boolean().optional(),
  image: z.string().nullable().optional(),
  role: z.string().optional(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
});

export type UpsertUserType = z.infer<typeof upsertUserSchema>;
