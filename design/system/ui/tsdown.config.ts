import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/components/*/index.ts", "src/icons/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
  },
  {
    entry: ["src/theme/tokens.css.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      neverBundle: ["@vanilla-extract/css"],
    },
  },
  {
    entry: ["src/styles.css.ts"],
    plugins: [
      vanillaExtractPlugin({
        extract: {
          name: "styles.css",
          sourcemap: false,
        },
      }),
    ],
    format: ["esm"],
    clean: false,
    outputOptions: {
      assetFileNames: "styles.css",
    },
  },
]);
