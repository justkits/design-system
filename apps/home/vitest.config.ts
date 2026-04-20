import { defineProject, mergeConfig } from "vitest/config";
import { nextConfig } from "@justkits/vitest-config/next";

const appConfig = defineProject({
  test: {
    setupFiles: ["./tests/mocks.tsx"],
  },
});

export default mergeConfig(nextConfig, appConfig);
