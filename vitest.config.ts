import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "css-as-string",
      transform(code, id) {
        if (id.endsWith(".css")) {
          return {
            code: `export default ${JSON.stringify(code)};`,
            map: null,
          };
        }
        return undefined;
      },
    },
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: true,
  },
});
