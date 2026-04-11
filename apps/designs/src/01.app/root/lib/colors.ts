import type { ColorTokens } from "@justkits/design-foundations";

export const baseColors = {
  WHITE: {
    light: "#F9FAFB",
    medium: "#E3E5E8",
    dark: "#CBD0D6",
  },
  BLACK: {
    light: "#3F4146",
    medium: "#1F2125",
    dark: "#0A0A0A",
  },
  BLUE: {
    light: "#3B82F6",
    dark: "#1E40AF",
  },
  GOLD: "#A78C29",
  SILVER: "#888888",
  RED: "#B91C1C",
  YELLOW: "#EBB30B",
  GREEN: "#007200",
};

export const colorValues: ColorTokens = {
  primary: `light-dark(${baseColors.BLUE.dark}, ${baseColors.BLUE.light})`,
  primaryHover: `light-dark(${baseColors.BLUE.dark}CC, ${baseColors.BLUE.light}CC)`,
  onPrimary: baseColors.WHITE.light,
  secondary: baseColors.GOLD,
  secondaryHover: baseColors.SILVER,
  onSecondary: baseColors.BLACK.dark,
  success: baseColors.GREEN,
  warning: baseColors.YELLOW,
  error: baseColors.RED,
  info: baseColors.SILVER,
  background: `light-dark(${baseColors.WHITE.light}, ${baseColors.BLACK.dark})`,
  surface: `light-dark(${baseColors.WHITE.medium}, ${baseColors.BLACK.medium})`,
  overlay: `light-dark(${baseColors.BLACK.medium}80, ${baseColors.SILVER}80)`,
  text: `light-dark(${baseColors.BLACK.dark}, ${baseColors.WHITE.light})`,
  textMuted: `light-dark(${baseColors.BLACK.light}, ${baseColors.WHITE.dark})`,
  textDisabled: `light-dark(${baseColors.SILVER}, ${baseColors.SILVER})`,
  border: `light-dark(${baseColors.BLACK.light}40, ${baseColors.WHITE.light}40)`,
  borderMuted: `${baseColors.SILVER}40`,
  borderInverted: `light-dark(${baseColors.WHITE.light}40, ${baseColors.BLACK.light}40)`,
};
