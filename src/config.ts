import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import type { LanguageCode } from "./types.js";

export interface CliConfig {
  language?: LanguageCode;
}

const CONFIG_DIR = ".password-use";
const CONFIG_FILE = "cli-config.json";

function resolveConfigPath(baseDir = homedir()): string {
  return join(baseDir, CONFIG_DIR, CONFIG_FILE);
}

export async function readCliConfig(baseDir = homedir()): Promise<CliConfig> {
  const path = resolveConfigPath(baseDir);
  try {
    const content = await readFile(path, "utf8");
    return JSON.parse(content) as CliConfig;
  } catch {
    return {};
  }
}

export async function writeCliConfig(config: CliConfig, baseDir = homedir()): Promise<void> {
  const path = resolveConfigPath(baseDir);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
