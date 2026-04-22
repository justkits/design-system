import { recipe } from "@vanilla-extract/recipes";

import { media, tokens } from "@/theme/tokens.css";

const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.radius.sm,
    transition: "all 0.3s ease",
    selectors: {
      "&:disabled": {
        color: tokens.colors.textDisabled,
        cursor: "not-allowed",
      },
      "&:focus-visible": {
        outline: "none",
      },
    },
    "@media": {
      [media.hoverable]: {
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: tokens.colors.backgroundHover,
            cursor: "pointer",
          },
        },
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: tokens.colors.primary,
        color: tokens.colors.onPrimary,
        selectors: {
          "&:disabled": {
            backgroundColor: tokens.colors.surface,
          },
        },
      },
      subtle: {
        backgroundColor: tokens.colors.surface,
        color: tokens.colors.textMuted,
      },
      outline: {
        backgroundColor: "transparent",
        color: tokens.colors.text,
        border: `1px solid ${tokens.colors.border}`,
        selectors: {
          "&:disabled": {
            border: `1px solid ${tokens.colors.borderMuted}`,
          },
        },
      },
      transparent: {
        backgroundColor: "transparent",
        color: tokens.colors.primary,
      },
    },
    size: {
      small: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.sm}`,
        font: tokens.font.bodyMedium,
      },
      medium: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        font: tokens.font.bodyMedium,
      },
      large: {
        padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
        font: tokens.font.bodyLarge,
      },
      fill: {
        flex: 1,
        height: "36px",
        font: tokens.font.bodyLarge,
      },
    },
  },
});

const spinner = recipe({
  base: {
    width: "1rem",
    height: "1rem",
    border: `2px solid ${tokens.colors.onPrimary}`,
    borderTopColor: "transparent",
    borderRadius: "50%",
  },
  variants: {
    size: {
      small: {
        margin: `0.125rem 0`,
      },
      medium: {
        margin: `0.125rem 0`,
      },
      large: {
        margin: `0.25rem 0`,
      },
      fill: {
        margin: `0.25rem 0`,
      },
    },
  },
});

export const styles = { button, spinner };
