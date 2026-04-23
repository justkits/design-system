import { createContext, useContext } from "react";

import type { ColorMode } from "../types";

interface ColorSchemeContextValue {
  mode: ColorMode;
  updateMode: (mode: ColorMode) => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(
  null,
);

export function useColorScheme() {
  const value = useContext(ColorSchemeContext);
  if (!value)
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  return value;
}
