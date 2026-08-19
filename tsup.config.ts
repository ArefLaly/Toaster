import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom"],
  async onSuccess() {
    copyFileSync("src/styles/toastra.css", "dist/toastra.css");
    for (const file of ["dist/index.js", "dist/index.cjs"] as const) {
      const source = readFileSync(file, "utf8");
      if (!source.startsWith('"use client"')) {
        writeFileSync(file, `"use client";\n${source}`);
      }
    }
  },
});
