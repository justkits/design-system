/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("vitest/config");

const sharedConfig = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});

module.exports = { sharedConfig };
