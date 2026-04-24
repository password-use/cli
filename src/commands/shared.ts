import { confirm, input, password, select } from "@inquirer/prompts";
import { assertUniqueName, decryptSeed } from "@password-use/crypto-adapter";
import type { EncryptedSeed, PasswordEntry, PasswordStrength, StoreData } from "@password-use/sdk-types";

const MASTER_DECRYPT_MAX_ATTEMPTS = 2;

/** 提示主密码并解密 seed；解密失败时允许再输入一次（共 2 次机会） */
export async function promptMasterPasswordDecryptSeed(account: EncryptedSeed): Promise<string> {
  for (let attempt = 1; attempt <= MASTER_DECRYPT_MAX_ATTEMPTS; attempt += 1) {
    const message =
      attempt === 1 ? "请输入主密码：" : "主密码错误或无法解密，请再输入一次：";
    const masterPassword = await password({
      message,
      mask: "*"
    });
    if (!masterPassword?.trim()) {
      throw new Error("主密码不能为空");
    }
    try {
      return decryptSeed(account, masterPassword);
    } catch {
      if (attempt >= MASTER_DECRYPT_MAX_ATTEMPTS) {
        throw new Error("主密码错误，解密失败");
      }
    }
  }
  // 逻辑上不会执行到此处（满足 TS 返回值检查）
  throw new Error("主密码错误，解密失败");
}

export async function askMasterPassword(confirmTwice = false): Promise<string> {
  const first = await password({
    message: "请输入主密码：",
    mask: "*"
  });
  if (!first) {
    throw new Error("主密码不能为空");
  }
  if (confirmTwice) {
    const second = await password({
      message: "请再次输入主密码：",
      mask: "*"
    });
    if (first !== second) {
      throw new Error("两次主密码不一致");
    }
  }
  return first;
}

export async function selectEntry(entries: PasswordEntry[]): Promise<PasswordEntry> {
  if (entries.length === 0) {
    throw new Error("暂无密码条目，请先创建");
  }
  const selectedName = await select({
    message: "请选择密码条目：",
    choices: entries.map((entry) => ({
      name: `${entry.name} (seq=${entry.sequence}, ${entry.strength}, len=${entry.length})`,
      value: entry.name
    }))
  });
  const selected = entries.find((entry) => entry.name === selectedName);
  if (!selected) {
    throw new Error("未找到条目");
  }
  return selected;
}

async function askStrength(): Promise<PasswordStrength> {
  return select({
    message: "请选择密码强度：",
    default: "normal",
    choices: [
      { name: "normal (a-zA-Z0-9)", value: "normal" },
      { name: "strong (a-zA-Z0-9 + special)", value: "strong" },
      { name: "number (0-9)", value: "number" }
    ]
  });
}

export async function createEntryInteractively(store: StoreData): Promise<PasswordEntry> {
  const name = await input({ message: "名称（唯一，不可修改）：", validate: (v) => !!v || "名称不能为空" });
  assertUniqueName(store.entries, name);

  const description = await input({ message: "描述（可选）：", default: "" });
  const strength = await askStrength();
  const lengthText = await input({
    message: "密码长度（默认 12）：",
    default: "12",
    validate: (v) => {
      const parsed = Number.parseInt(v, 10);
      if (!Number.isInteger(parsed) || parsed <= 0) {
        return "长度必须是正整数";
      }
      return true;
    }
  });
  const length = Number.parseInt(lengthText, 10);
  return {
    name,
    description: description || undefined,
    sequence: 0,
    strength,
    length
  };
}

export async function maybeCreateEntry(store: StoreData): Promise<boolean> {
  const shouldCreate = await confirm({
    message: "是否创建新密码条目？",
    default: store.entries.length === 0
  });
  if (!shouldCreate) {
    return false;
  }
  const entry = await createEntryInteractively(store);
  store.entries.push(entry);
  return true;
}
