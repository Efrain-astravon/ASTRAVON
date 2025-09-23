import { Badge } from "@/components/ui/badge";
import { LevelEnumType } from "@/trpc/routers/shared/enums";

type LevelFormatterProps = {
  level?: LevelEnumType | null;
};

const levelTranslations: Record<LevelEnumType, string> = {
  BEGINNER: "Principiante",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
};

export const LevelFormatter: React.FC<LevelFormatterProps> = ({ level }) => {
  if (!level) return <Badge variant="secondary">—</Badge>;

  return <Badge variant="secondary">{levelTranslations[level]}</Badge>;
};
