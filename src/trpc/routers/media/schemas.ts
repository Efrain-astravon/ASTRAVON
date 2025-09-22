import { z } from "zod";

const MediaSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  chapterId: z.uuid(),
});

export type MediaType = z.infer<typeof MediaSchema>;

export const createMediaSchema = z.object({
  url: z.url("La URL debe ser válida"),
  chapterId: z.uuid(),
});

export type CreateMediaType = z.infer<typeof createMediaSchema>;

export const mediaIdSchema = z.object({
  id: z.uuid(),
});

export type MediaIdType = z.infer<typeof mediaIdSchema>;

export const updateMediaSchema = z.object({
  id: z.uuid(),
  url: z.url().optional(),
  chapterId: z.uuid().optional(),
});

export type UpdateMediaType = z.infer<typeof updateMediaSchema>;

export const upsertMediaSchema = z.object({
  id: z.uuid().optional(),
  url: z.url("La URL debe ser válida"),
  chapterId: z.uuid(),
});

export type UpsertMediaType = z.infer<typeof upsertMediaSchema>;
