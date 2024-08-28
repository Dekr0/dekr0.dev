import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import { shield } from '@kindspells/astro-shield'


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), shield({})],
  security: {
    checkOrigin: true
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
