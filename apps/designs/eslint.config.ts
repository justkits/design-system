import { defineConfig } from "eslint/config";
import { nextEslintConfig } from "@justkits/eslint-config/next";

export default defineConfig([
  {
    extends: [nextEslintConfig],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
