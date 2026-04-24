import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

import type { JustkitsDocsConfig } from "../scanner/config";
import { Scanner } from "../scanner/manager";
import { Watcher } from "../scanner/watch";

declare global {
  var __JUSTKITS_DOCS_STARTED__: boolean | undefined;
  var __JUSTKITS_DOCS_WATCHER__: { close(): void } | undefined;
  var __JUSTKITS_DOCS_OUTPUT_DIR__: string | undefined;
}

const DEFAULT_CONFIG: Required<JustkitsDocsConfig> = {
  contentsDir: "contents/",
  outputDir: ".next/",
  baseUrl: "/",
};

function resolveConfig(
  userConfig?: JustkitsDocsConfig,
): Required<JustkitsDocsConfig> {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

let exitHandlerRegistered = false;

export function withJustkitsDocs(
  nextConfig: NextConfig = {},
  docsConfig?: JustkitsDocsConfig,
): (phase: string) => NextConfig {
  return (phase: string) => {
    const config = resolveConfig(docsConfig);
    const isWatchMode =
      phase === PHASE_DEVELOPMENT_SERVER || process.argv.includes("--watch");

    globalThis.__JUSTKITS_DOCS_OUTPUT_DIR__ = config.outputDir;

    if (isWatchMode) {
      globalThis.__JUSTKITS_DOCS_WATCHER__?.close();
      const watcher = new Watcher(config);
      watcher.run();
      globalThis.__JUSTKITS_DOCS_WATCHER__ = watcher;

      console.log(
        "[Justkits Docs] Watch mode enabled. Watching for changes in:",
        config.contentsDir,
      );

      if (!exitHandlerRegistered) {
        exitHandlerRegistered = true;
        process.on("exit", () => globalThis.__JUSTKITS_DOCS_WATCHER__?.close());
        console.log(
          "[Justkits Docs] Exit handler registered to clean up watcher.",
        );
      }
    } else if (!globalThis.__JUSTKITS_DOCS_STARTED__) {
      globalThis.__JUSTKITS_DOCS_STARTED__ = true;
      const scanner = new Scanner(config);
      scanner.run();

      console.log(
        "[Justkits Docs] Static build completed. Manifest generated at:",
        config.outputDir,
      );
    }

    return nextConfig;
  };
}
