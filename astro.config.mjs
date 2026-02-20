// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), icon()],
  env: {
    schema: {
      DIRECTUS_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});