export interface ElevationTokens {
  lv0?: string;
  lv1: string;
  lv2: string;
  lv3: string;
}

export const elevationVariables: ElevationTokens = {
  lv1: "elevation-lv1",
  lv2: "elevation-lv2",
  lv3: "elevation-lv3",
};

export const elevationCSSVariables: ElevationTokens = {
  lv1: `var(--elevation-lv1)`,
  lv2: `var(--elevation-lv2)`,
  lv3: `var(--elevation-lv3)`,
};
