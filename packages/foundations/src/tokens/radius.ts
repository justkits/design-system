export interface RadiusTokens {
  none?: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export const radiusVariables: RadiusTokens = {
  xs: "radius-xs",
  sm: "radius-sm",
  md: "radius-md",
  lg: "radius-lg",
  xl: "radius-xl",
  full: "radius-full",
};

export const radiusCSSVariables: RadiusTokens = {
  xs: `var(--radius-xs)`,
  sm: `var(--radius-sm)`,
  md: `var(--radius-md)`,
  lg: `var(--radius-lg)`,
  xl: `var(--radius-xl)`,
  full: `var(--radius-full)`,
};
