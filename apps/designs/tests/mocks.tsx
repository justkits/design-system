import "@vanilla-extract/css/disableRuntimeStyles";

vi.mock("next/font/google", () => ({
  Google_Sans: () => ({
    className: "google-sans-class",
  }),
  Kalam: () => ({
    className: "--font-kalam",
  }),
}));
vi.mock("@justkits/theme", async () => {
  const actual = await vi.importActual("@justkits/theme");
  return {
    ...actual,
    ThemeScript: () => <script>ThemeScript</script>,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: vi.fn().mockReturnValue({ mode: "light", setThemeMode: vi.fn() }),
  };
});
