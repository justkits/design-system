import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { withJustkitsDocs, type JustkitsDocsConfig } from "@justkits/docs/next";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "on" },
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const justkitsDocsConfig: JustkitsDocsConfig = {
  contentsDir: "docs",
};

export default withJustkitsDocs(
  withVanillaExtract(nextConfig),
  justkitsDocsConfig,
);
