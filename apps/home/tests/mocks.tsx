import "@vanilla-extract/css/disableRuntimeStyles";

vi.mock("next/font/google", () => ({
  Google_Sans: () => ({
    className: "google-sans-class",
  }),
  Kalam: () => ({
    className: "--font-kalam",
  }),
}));
