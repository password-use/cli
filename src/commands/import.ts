import { input } from "@inquirer/prompts";
import * as bip39 from "bip39";
import { encryptSeed, readStore, writeStore } from "@password-use/crypto-adapter";
import { askMasterPassword } from "./shared.js";

export async function importCommand(): Promise<void> {
  const store = await readStore();
  const mnemonic = (await input({
    message: "请输入助记词（空格分隔）：",
    validate: (v) => !!v || "助记词不能为空"
  })).trim();

  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("助记词格式无效");
  }

  const masterPassword = await askMasterPassword(true);
  store.account = encryptSeed(mnemonic, masterPassword);
  await writeStore(store);
  console.log("导入成功，已更新本地加密 seed。");
}
