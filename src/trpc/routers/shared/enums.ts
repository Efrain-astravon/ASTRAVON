import { z } from "zod";

// Enums
export const LevelEnum = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);

export type LevelEnumType = z.infer<typeof LevelEnum>;

export const ChapterTypeEnum = z.enum(["TEXT", "AUDIO", "VIDEO"]);

export type ChapterTypeEnumType = z.infer<typeof ChapterTypeEnum>;
