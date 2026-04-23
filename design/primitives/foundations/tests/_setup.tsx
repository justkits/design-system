import { useColorScheme } from "@/colors/scheme";

export function TestComponent() {
  const { mode, updateMode } = useColorScheme();

  return (
    <div>
      Current Theme Mode: {mode}
      <button onClick={() => updateMode("light")}>Set Light Mode</button>
      <button onClick={() => updateMode("dark")}>Set Dark Mode</button>
      <button onClick={() => updateMode("system")}>Set System Mode</button>
    </div>
  );
}

export function mockMatchMedia({ preferDark }: { preferDark?: boolean } = {}) {
  let changeListener: ((e: MediaQueryListEvent) => void) | null = null;

  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: preferDark && query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (
        _event: string,
        listener: (e: MediaQueryListEvent) => void,
      ) => {
        changeListener = listener;
      },
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  return {
    simulateChange: (prefersDark: boolean) => {
      changeListener?.({ matches: prefersDark } as MediaQueryListEvent);
    },
  };
}
