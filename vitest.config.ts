import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
    coverage: {
      include: isCI ? ["**/*/src/**/*.{ts,tsx}"] : undefined,
      exclude: [
        "apps/*/src/**/index.ts",
        "apps/*/src/**/main.ts",
        "packages/*/src/**/index.ts",
        "packages/foundations/src/tokens/typography/code.ts",
        "packages/foundations/src/tokens/typography/quote.ts",
        "packages/foundations/src/tokens/typography/text.ts",
        "**/*/tests/*",
      ],
      provider: "v8",
      reporter: isCI ? ["clover"] : [["text", { skipFull: true }]],
    },
  },
});
