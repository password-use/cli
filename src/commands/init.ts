import { confirm } from "@inquirer/prompts";
import * as bip39 from "bip39";
import { encryptSeed, readStore, writeStore } from "@password-use/crypto-adapter";
import { askMasterPassword } from "./shared.js";

export async function initCommand(): Promise<void> {
  const store = await readStore();
  if (store.account) {
    throw new Error("账号已初始化，如需重置请先手动清理存储文件");
  }

  const mnemonic = bip39.generateMnemonic(128);
  console.log("\n请务必保存下面的助记词（仅显示一次）：");
  console.log(mnemonic);
  console.log();

  const confirmed = await confirm({
    message: "我已保存好助记词，继续设置主密码",
    default: false
  });
  if (!confirmed) {
    throw new Error("请先保存助记词后再继续");
  }

  const masterPassword = await askMasterPassword(true);
  store.account = encryptSeed(mnemonic, masterPassword);
  await writeStore(store);
  console.log("初始化完成，seed 已加密保存到本地。");
}
