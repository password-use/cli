import { copyToClipboard, generatePassword, readStore } from "@password-use/crypto-adapter";
import { t } from "../i18n.js";
import type { PasswordCliOutputOptions } from "../types.js";
import { promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

/** 仅查看当前序列下生成的密码，不创建新条目、不轮换序列 */
export async function showCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const bootstrapStore = await readStore();
  if (!bootstrapStore.account) {
    throw new Error(await t("cmdNotInitialized"));
  }
  const seed = await promptMasterPasswordDecryptSeed(bootstrapStore.account);
  const store = await readStore({ seed });
  if (store.entries.length === 0) {
    throw new Error(await t("cmdNoEntriesCreate"));
  }

  const selected = await selectEntry(store.entries);
  const password = await generatePassword(seed, selected);
  if (options.print) {
    console.log(
      await t("showPassword", {
        name: selected.name,
        seq: selected.sequence,
        password
      })
    );
    return;
  } else {
    await copyToClipboard(password);
    console.log(await t("copiedMasked"));
  }
}
