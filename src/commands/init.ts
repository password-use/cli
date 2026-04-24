import { confirm } from "@inquirer/prompts";
import * as bip39 from "bip39";
import { encryptSeed, readStore, writeStore } from "@password-use/crypto-adapter";
import { t } from "../i18n.js";
import { askMasterPassword } from "./shared.js";

export async function initCommand(): Promise<void> {
  const store = await readStore();
  if (store.account) {
    throw new Error(await t("initAlready"));
  }

  const mnemonic = bip39.generateMnemonic(128);
  console.log(`\n${await t("initSaveMnemonic")}`);
  console.log(mnemonic);
  console.log();

  const confirmed = await confirm({
    message: await t("initConfirmMnemonic"),
    default: false
  });
  if (!confirmed) {
    throw new Error(await t("initConfirmRequired"));
  }

  const masterPassword = await askMasterPassword(true);
  store.account = encryptSeed(mnemonic, masterPassword);
  await writeStore(store);
  console.log(await t("initSuccess"));
}
