import type {
  ElevationTokens,
  RadiusTokens,
  SpacingTokens,
} from "@justkits/design-foundations";

export const elevationValues: ElevationTokens = {
  lv1: "0px 1px 3px rgba(127, 127, 127, 0.2), 0px 1px 1px rgba(127, 127, 127, 0.14), 0px 2px 1px rgba(127, 127, 127, 0.12)",
  lv2: "0px 3px 5px rgba(127, 127, 127, 0.2), 0px 6px 10px rgba(127, 127, 127, 0.14), 0px 1px 18px rgba(127, 127, 127, 0.12)",
  lv3: "0px 10px 20px rgba(127, 127, 127, 0.2), 0px 15px 25px rgba(127, 127, 127, 0.14), 0px 5px 40px rgba(127, 127, 127, 0.12)",
};

export const radiusValues: RadiusTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "50%",
};

export const spacingValues: SpacingTokens = {
  atoms: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  sections: {
    sm: "16px",
    lg: "24px",
  },
  layouts: {
    sm: "24px",
    lg: "36px",
  },
};
