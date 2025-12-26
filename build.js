import { build } from "esbuild";

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "dist/index.js",
  format: "iife",
  globalName: "ConstellationBackground",
  platform: "browser",
  minify: true
});
