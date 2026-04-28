import { input } from "@inquirer/prompts";
import {
  encryptSeed,
  readStore,
  validateMnemonic,
  writeStore
} from "@password-use/crypto/node";
import { t } from "../i18n.js";
import { askMasterPassword } from "./shared.js";

export async function importCommand(): Promise<void> {
  const store = await readStore();
  const mnemonic = (await input({
    message: await t("importMnemonicPrompt"),
    validate: async (v) => !!v || (await t("importMnemonicRequired"))
  })).trim();

  if (!validateMnemonic(mnemonic)) {
    throw new Error(await t("importMnemonicInvalid"));
  }

  const masterPassword = await askMasterPassword(true);
  store.account = await encryptSeed(mnemonic, masterPassword);
  await writeStore(store);
  console.log(await t("importSuccess"));
}
