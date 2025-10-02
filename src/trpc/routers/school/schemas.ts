import { z } from "zod";
import { LevelEnum } from "../shared/enums";

export const SchoolSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  level: LevelEnum,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type SchoolType = z.infer<typeof SchoolSchema>;

export const createSchoolSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  level: LevelEnum,
});

export type CreateSchoolType = z.infer<typeof createSchoolSchema>;

export const schoolIdSchema = z.object({
  id: z.uuid(),
});

export type SchoolIdType = z.infer<typeof schoolIdSchema>;

export const updateSchoolSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "El nombre es requerido").optional(),
  level: LevelEnum.optional(),
});

export type UpdateSchoolType = z.infer<typeof updateSchoolSchema>;

export const upsertSchoolSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  level: LevelEnum,
});

export type UpsertSchoolType = z.infer<typeof upsertSchoolSchema>;
