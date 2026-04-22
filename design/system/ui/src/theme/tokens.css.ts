import { createGlobalThemeContract } from "@vanilla-extract/css";
import { createSimpleBreakpointQueries } from "@justkits/design-foundations/queries";
import {
  colorVariables,
  elevationVariables,
  radiusVariables,
  spacingVariables,
  textVariables,
  typographyVariables,
} from "@justkits/design-foundations/tokens";

export const tokens = createGlobalThemeContract({
  colors: { ...colorVariables },
  elevation: { ...elevationVariables },
  font: { ...textVariables },
  typography: { ...typographyVariables },
  radius: { ...radiusVariables },
  spacing: { ...spacingVariables },
});

export const media = {
  breakpoints: createSimpleBreakpointQueries({
    sm: "768px",
    lg: "1280px",
  }),
  hoverable: "(hover: hover) and (pointer: fine)",
};

export { colorWithOpacity } from "@justkits/design-foundations/utils";
