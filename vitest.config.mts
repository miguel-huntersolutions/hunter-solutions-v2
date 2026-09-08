import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

// Los tests corren en Node, sin Next: por eso hay que declarar aquí el alias "@"
// que en la aplicación resuelve tsconfig.json.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
})
