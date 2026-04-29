import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/ui/tokens.css";

const page = style({
  display: "flex",
});

const sidebar = style({
  padding: `${tokens.spacing.md} ${tokens.spacing.sm}`,
  gap: tokens.spacing.sm,
  borderRight: `1px solid ${tokens.colors.borderMuted}`,
  backgroundColor: tokens.colors.surface,
  boxShadow: tokens.elevation.lv1,
  overflow: "hidden",
  transition: "width 0.3s ease",
});

const content = style({
  flex: 1,
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
});

export const styles = { page, sidebar, content };
