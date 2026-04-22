import { defineConfig } from "@justkits/svg2tsx";

export default defineConfig({
  mode: "facade",
  facadeName: "AppIcon",
  srcDir: "assets",
  outDir: "src/icons",
});
