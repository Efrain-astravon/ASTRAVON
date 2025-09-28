import { z } from "zod";
import { LevelEnum, ShowStatusEnum } from "../shared/enums";

const CourseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().optional(),
  smallDescription: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().int().optional(),
  slug: z.string().optional(),
  status: ShowStatusEnum,
  level: LevelEnum,
  thumbnailUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  teacherId: z.uuid(),
  schoolId: z.uuid(),
});

export type CourseType = z.infer<typeof CourseSchema>;

export const createCourseSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  smallDescription: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().int().optional(),
  slug: z.string().optional(),
  status: ShowStatusEnum,
  level: LevelEnum,
  thumbnailUrl: z.url().optional(),
  teacherId: z.uuid(),
  schoolId: z.uuid(),
});

export type CreateCourseType = z.infer<typeof createCourseSchema>;

export const courseIdSchema = z.object({
  id: z.uuid(),
});

export type CourseIdType = z.infer<typeof courseIdSchema>;

export const updateCourseSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  smallDescription: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().int().optional(),
  slug: z.string().optional(),
  status: ShowStatusEnum.optional(),
  level: LevelEnum.optional(),
  thumbnailUrl: z.url().optional(),
  teacherId: z.uuid().optional(),
  schoolId: z.uuid().optional(),
});

export type UpdateCourseType = z.infer<typeof updateCourseSchema>;

export const upsertCourseSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  smallDescription: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().int().optional(),
  slug: z.string().optional(),
  status: ShowStatusEnum,
  level: LevelEnum,
  thumbnailUrl: z.url().optional(),
  teacherId: z.uuid(),
  schoolId: z.uuid(),
});

export type UpsertCourseType = z.infer<typeof upsertCourseSchema>;
