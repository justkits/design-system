export type SpacingTokens = {
  none?: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const spacingVariables: SpacingTokens = {
  xs: "spacing-xs",
  sm: "spacing-sm",
  md: "spacing-md",
  lg: "spacing-lg",
  xl: "spacing-xl",
};

export const spacingCSSVariables: SpacingTokens = {
  xs: `var(--spacing-xs)`,
  sm: `var(--spacing-sm)`,
  md: `var(--spacing-md)`,
  lg: `var(--spacing-lg)`,
  xl: `var(--spacing-xl)`,
};
