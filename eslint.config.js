import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      // Add TypeScript-specific rules here
    },
  },

  {
    files: ["src/**/*.{js,astro}"],

    rules: {
      // Add JavaScript/Astro-specific rules here
    },
  },
];
