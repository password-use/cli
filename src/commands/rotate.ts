import {
  copyToClipboard,
  generatePassword,
  readStore,
  updateEntry,
  writeStore
} from "@password-use/crypto-adapter";
import { t } from "../i18n.js";
import type { RotateCliOptions } from "../types.js";
import { promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

const SEQUENCE_MIN = 0;
const SEQUENCE_MAX = 10000;

export async function rotateCommand(options: RotateCliOptions = {}): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error(await t("cmdNotInitialized"));
  }
  const delta = options.delta ?? 1;
  if (!Number.isInteger(delta)) {
    throw new Error(await t("rotateDeltaInvalid"));
  }
  const entry = await selectEntry(store.entries);
  const nextSequence = entry.sequence + delta;
  if (nextSequence < SEQUENCE_MIN || nextSequence > SEQUENCE_MAX) {
    throw new Error(await t("rotateOutOfRange", { min: SEQUENCE_MIN, max: SEQUENCE_MAX }));
  }
  const rotated = { ...entry, sequence: nextSequence };
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
