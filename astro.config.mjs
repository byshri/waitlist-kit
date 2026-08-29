// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  srcDir: "./src/web/",

  vite: {
    plugins: [tailwindcss()],
  },
});
