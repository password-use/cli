import { copyToClipboard, generatePassword, readStore, writeStore } from "@password-use/crypto-adapter";
import type { PasswordCliOutputOptions } from "../types.js";
import { maybeCreateEntry, promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

export async function generateCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error("账号未初始化，请先执行 init");
  }

  const changed = await maybeCreateEntry(store);
  if (changed) {
    await writeStore(store);
  }

  const selected = await selectEntry(store.entries);
  const seed = await promptMasterPasswordDecryptSeed(store.account);
  const password = await generatePassword(seed, selected);
  await copyToClipboard(password);
  if (options.print) {
    console.log(`生成密码(${selected.name}): ${password}`);
    console.log("已同时复制到剪贴板。");
  } else {
    console.log(`已为条目「${selected.name}」复制密码到剪贴板（未在终端显示明文）。`);
  }
}
