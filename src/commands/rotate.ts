import {
  copyToClipboard,
  generatePassword,
  readStore,
  updateEntry,
  writeStore
} from "@password-use/crypto-adapter";
import type { PasswordCliOutputOptions } from "../types.js";
import { promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

export async function rotateCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error("账号未初始化，请先执行 init");
  }
  const entry = await selectEntry(store.entries);
  const rotated = { ...entry, sequence: entry.sequence + 1 };
  store.entries = updateEntry(store.entries, rotated);
  await writeStore(store);

  const seed = await promptMasterPasswordDecryptSeed(store.account);
  const password = await generatePassword(seed, rotated);
  console.log(`已轮换 ${rotated.name} 到 sequence=${rotated.sequence}`);
  await copyToClipboard(password);
  if (options.print) {
    console.log(`新密码: ${password}`);
    console.log("已同时复制到剪贴板。");
  } else {
    console.log("新密码已复制到剪贴板（未在终端显示明文）。");
  }
}
