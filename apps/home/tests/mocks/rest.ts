import "@vanilla-extract/css/disableRuntimeStyles";

vi.mock("next/font/google", () => ({
  Google_Sans: () => ({
    className: "google-sans-class",
  }),
  JetBrains_Mono: () => ({
    className: "jetbrains-mono-class",
  }),
  Kalam: () => ({
    className: "--font-kalam",
  }),
  Roboto_Slab: () => ({
    className: "--font-roboto-slab",
  }),
}));
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/"),
}));
