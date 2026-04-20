import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      next: "src/nextjs/index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: false,
  },
  {
    entry: {
      sidebar: "src/sidebar/index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: false,
    outputOptions: {
      banner: "'use client';",
      assetFileNames: "[name][extname]",
    },
  },
]);
