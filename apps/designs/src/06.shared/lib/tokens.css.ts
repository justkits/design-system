import { createGlobalThemeContract } from "@vanilla-extract/css";
import {
  colorVariables,
  elevationVariables,
  fontVariables,
  radiusVariables,
  spacingVariables,
} from "@justkits/design-foundations";

export const tokens = createGlobalThemeContract({
  colors: { ...colorVariables },
  elevation: { ...elevationVariables },
  font: { ...fontVariables },
  radius: { ...radiusVariables },
  spacing: { ...spacingVariables },
});
