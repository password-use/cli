import { confirm } from "@inquirer/prompts";
import { readStore } from "@password-use/crypto/node";
import { rm } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { t } from "../i18n.js";
import { promptMasterPasswordDecryptSeed } from "./shared.js";

export async function logoutCommand(): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error(await t("cmdNotInitialized"));
  }

  await promptMasterPasswordDecryptSeed(store.account);

  const approved = await confirm({
    message: await t("logoutConfirm"),
    default: false
  });
  if (!approved) {
    console.log(await t("logoutCancelled"));
    return;
  }

  await rm(join(homedir(), ".password-use"), { recursive: true, force: true });
  console.log(await t("logoutSuccess"));
}
