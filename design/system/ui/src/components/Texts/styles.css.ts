import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/theme/tokens.css";

const text = recipe({
  base: {
    color: tokens.colors.text,
  },
  variants: {
    variant: {
      hero: { font: tokens.font.hero, color: tokens.colors.primary },
      titleLarge: { font: tokens.font.titleLarge },
      titleMedium: { font: tokens.font.titleMedium },
      titleSmall: { font: tokens.font.titleSmall },
      bodyLarge: { font: tokens.font.bodyLarge },
      bodyMedium: { font: tokens.font.bodyMedium },
      bodySmall: { font: tokens.font.bodySmall },
      description: { font: tokens.font.description },
    },
  },
});

export const styles = { text };
