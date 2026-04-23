import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ColorSchemeContext } from "./contexts";
import { STORAGE_KEY } from "./storage";
import type { ColorMode, ColorScheme } from "../types";

interface ColorSchemeProviderProps {
  initialMode?: ColorMode;
  children: ReactNode;
}

export function ColorSchemeProvider({
  initialMode = "system",
  children,
}: Readonly<ColorSchemeProviderProps>) {
  const [mode, setMode] = useState<ColorMode>(() => {
    if (typeof localStorage === "undefined") return initialMode;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "system" || stored === "light" || stored === "dark")
      return stored;
    return initialMode;
  });

  const [systemIsDark, setSystemIsDark] = useState(
    () =>
      globalThis.window?.matchMedia("(prefers-color-scheme: dark)").matches ??
      false,
  );

  useEffect(() => {
    const query = globalThis.window?.matchMedia("(prefers-color-scheme: dark)");
    if (!query) return;
    const listener = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  let activeColorScheme: ColorScheme;
  if (mode === "system") {
    activeColorScheme = systemIsDark ? "dark" : "light";
  } else {
    activeColorScheme = mode;
  }

  useEffect(() => {
    document.documentElement.dataset.colorScheme = activeColorScheme;
    document.documentElement.style.colorScheme = activeColorScheme;
  }, [activeColorScheme]);

  const updateMode = useCallback((newMode: ColorMode) => {
    setMode(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const value = useMemo(() => ({ mode, updateMode }), [mode, updateMode]);

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
