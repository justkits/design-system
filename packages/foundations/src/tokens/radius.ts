export interface RadiusTokens {
  none?: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export const radiusVariables: RadiusTokens = {
  sm: "radius-sm",
  md: "radius-md",
  lg: "radius-lg",
  full: "radius-full",
};

export const radiusCSSVariables: RadiusTokens = {
  sm: `var(--radius-sm)`,
  md: `var(--radius-md)`,
  lg: `var(--radius-lg)`,
  full: `var(--radius-full)`,
};
