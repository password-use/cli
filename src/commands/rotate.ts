import {
  copyToClipboard,
  generatePassword,
  readStore,
  updateEntry,
  writeStore
} from "@password-use/crypto-adapter";
import { t } from "../i18n.js";
import type { PasswordCliOutputOptions } from "../types.js";
import { promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

export async function rotateCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error(await t("cmdNotInitialized"));
  }
  const entry = await selectEntry(store.entries);
  const rotated = { ...entry, sequence: entry.sequence + 1 };
  store.entries = updateEntry(store.entries, rotated);
  await writeStore(store);

  const seed = await promptMasterPasswordDecryptSeed(store.account);
  const password = await generatePassword(seed, rotated);
  console.log(await t("rotateDone", { name: rotated.name, seq: rotated.sequence }));
  if (options.print) {
    console.log(await t("newPassword", { password }));
    return;
  } else {
    await copyToClipboard(password);
    console.log(await t("rotateCopied"));
  }
}
