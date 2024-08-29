import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), solidJs()],
    security: {
      checkOrigin: true
    },
    output: "server",
    adapter: node({
      mode: "standalone"
    })
});
