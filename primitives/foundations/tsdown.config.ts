import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/reset.css"],
  format: ["esm"],
  css: {
    splitting: true,
  },
  deps: {
    neverBundle: ["react"],
  },
});
