import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      next: "src/nextjs/index.ts",
      index: "src/index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: false,
  },
]);
