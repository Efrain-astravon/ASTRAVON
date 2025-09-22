import { z } from "zod";
import { ChapterTypeEnum } from "../shared/enums";

const ChapterSchema = z.object({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional(),
  type: ChapterTypeEnum,
  content: z.string(),
  courseId: z.number().int(),
});

export type ChapterType = z.infer<typeof ChapterSchema>;

export const createChapterSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  type: ChapterTypeEnum,
  content: z.string().min(1, "El contenido es requerido"),
  courseId: z.uuid(),
});

export type CreateChapterType = z.infer<typeof createChapterSchema>;

export const chapterIdSchema = z.object({
  id: z.uuid(),
});

export type ChapterIdType = z.infer<typeof chapterIdSchema>;

export const updateChapterSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: ChapterTypeEnum.optional(),
  content: z.string().optional(),
  courseId: z.uuid().optional(),
});

export type UpdateChapterType = z.infer<typeof updateChapterSchema>;

export const upsertChapterSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  type: ChapterTypeEnum,
  content: z.string().min(1, "El contenido es requerido"),
  courseId: z.uuid(),
});

export type UpsertChapterType = z.infer<typeof upsertChapterSchema>;
