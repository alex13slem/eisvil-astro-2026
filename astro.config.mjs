// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  env: {
    schema: {
      DIRECTUS_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});
