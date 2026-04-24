#!/usr/bin/env node
import { rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outfile = join(root, "dist", "cli.cjs");
const legacyOutfile = join(root, "dist", "cli.js");

await rm(join(root, "dist"), { recursive: true, force: true });

await build({
  entryPoints: [join(root, "src", "cli.ts")],
  outfile,
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  sourcemap: false,
  minify: true,
  legalComments: "none",
  external: ["argon2", "clipboardy"]
});

await writeFile(
  legacyOutfile,
  "#!/usr/bin/env node\nimport './cli.cjs';\n",
  "utf8"
);

console.log("built", outfile);
