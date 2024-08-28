import { defineConfig } from "astro/config";
import { resolve } from 'node:path'
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import { shield } from '@kindspells/astro-shield'

const rootDir = new URL('.', import.meta.url).pathname
const modulePath = resolve(rootDir, 'src', 'generated', 'sriHashes.mjs')

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), shield({
      sri: {
        enableMiddleware: true,   // MUST be enabled!
        hashesModule: modulePath, // SHOULD be set!
      },

      // - If set, it controls how the security headers will be generated in the
      //   middleware.
      // - If not set, no security headers will be generated in the middleware.
      securityHeaders: {
        // - If set, it controls how the CSP (Content Security Policy) header will
        //   be generated in the middleware.
        // - If not set, no CSP header will be generated in the middleware.
        contentSecurityPolicy: {
          // - If set, it controls the "default" CSP directives (they can be
          //   overriden at runtime).
          // - If not set, the middleware will use a minimal set of default
          //   directives.
          cspDirectives: {
            'default-src': "'none'",
          }
        }
      }
    })],
  security: {
    checkOrigin: true
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
