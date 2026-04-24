import { copyToClipboard, generatePassword, readStore, writeStore } from "@password-use/crypto-adapter";
import { t } from "../i18n.js";
import type { PasswordCliOutputOptions } from "../types.js";
import { maybeCreateEntry, promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

export async function generateCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const bootstrapStore = await readStore();
  if (!bootstrapStore.account) {
    throw new Error(await t("cmdNotInitialized"));
  }
  const seed = await promptMasterPasswordDecryptSeed(bootstrapStore.account);
  const store = await readStore({ seed });

  const createdEntry = await maybeCreateEntry(store);
  if (createdEntry) {
    await writeStore(store, { seed });
  }

  const selected = createdEntry ?? (await selectEntry(store.entries));
  const password = await generatePassword(seed, selected);
  if (options.print) {
    console.log(await t("generatePassword", { name: selected.name, password }));
    return;
  } else {
    await copyToClipboard(password);
    console.log(await t("copiedMasked"));
  }
}
