import { z } from "zod";

// Enums
export const LevelEnum = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const ChapterTypeEnum = z.enum(["TEXT", "AUDIO", "VIDEO"]);
