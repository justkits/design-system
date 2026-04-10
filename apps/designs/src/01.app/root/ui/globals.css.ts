import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

import { tokens } from "@shared/lib/tokens.css";
import { elevationValues, radiusValues, spacingValues } from "../lib/boxes";
import { colorValues } from "../lib/colors";
import { fontValues } from "../lib/fonts";

createGlobalTheme(":root", tokens, {
  colors: { ...colorValues },
  elevation: { ...elevationValues },
  font: { ...fontValues },
  radius: { ...radiusValues },
  spacing: { ...spacingValues },
});

globalStyle("html, body", {
  backgroundColor: tokens.colors.background,
  color: tokens.colors.text,
  userSelect: "none",
  scrollbarGutter: "stable",
});
