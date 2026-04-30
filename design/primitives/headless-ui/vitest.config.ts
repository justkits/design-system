import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@justkits/vitest-config/shared";

const config = defineProject({
  test: {
    root: __dirname,
    setupFiles: ["./tests/mocks.ts"],
  },
});

export default mergeConfig(sharedReactConfig, config);
