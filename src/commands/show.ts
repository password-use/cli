import { copyToClipboard, generatePassword, readStore } from "@password-use/crypto-adapter";
import type { PasswordCliOutputOptions } from "../types.js";
import { promptMasterPasswordDecryptSeed, selectEntry } from "./shared.js";

/** 仅查看当前序列下生成的密码，不创建新条目、不轮换序列 */
export async function showCommand(options: PasswordCliOutputOptions = {}): Promise<void> {
  const store = await readStore();
  if (!store.account) {
    throw new Error("账号未初始化，请先执行 init");
  }
  if (store.entries.length === 0) {
    throw new Error("暂无密码条目，请先在 generate 流程中创建条目");
  }

  const selected = await selectEntry(store.entries);
  const seed = await promptMasterPasswordDecryptSeed(store.account);
  const password = await generatePassword(seed, selected);
  await copyToClipboard(password);
  if (options.print) {
    console.log(`当前密码(${selected.name}, seq=${selected.sequence}): ${password}`);
    console.log("已同时复制到剪贴板。");
  } else {
    console.log(
      `已为「${selected.name}」(seq=${selected.sequence}) 复制密码到剪贴板（未在终端显示明文）。`
    );
  }
}
