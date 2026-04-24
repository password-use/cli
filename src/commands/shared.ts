import { confirm, input, password, select } from "@inquirer/prompts";
import { decryptSeed } from "@password-use/crypto-adapter";
import type { EncryptedSeed, PasswordEntry, PasswordStrength, StoreData } from "@password-use/sdk-types";
import { t } from "../i18n.js";

const MASTER_DECRYPT_MAX_ATTEMPTS = 2;

/** 提示主密码并解密 seed；解密失败时允许再输入一次（共 2 次机会） */
export async function promptMasterPasswordDecryptSeed(account: EncryptedSeed): Promise<string> {
  for (let attempt = 1; attempt <= MASTER_DECRYPT_MAX_ATTEMPTS; attempt += 1) {
    const message =
      attempt === 1 ? await t("askMaster") : await t("askMasterRetry");
    const masterPassword = await password({
      message,
      mask: "*"
    });
    if (!masterPassword?.trim()) {
      throw new Error(await t("askMasterRequired"));
    }
    try {
      return decryptSeed(account, masterPassword);
    } catch {
      if (attempt >= MASTER_DECRYPT_MAX_ATTEMPTS) {
        throw new Error(await t("askMasterRetry"));
      }
    }
  }
  // 逻辑上不会执行到此处（满足 TS 返回值检查）
  throw new Error(await t("askMasterRetry"));
}

export async function askMasterPassword(confirmTwice = false): Promise<string> {
  const first = await password({
    message: await t("askMaster"),
    mask: "*"
  });
  if (!first) {
    throw new Error(await t("askMasterRequired"));
  }
  if (confirmTwice) {
    const second = await password({
      message: await t("askMasterAgain"),
      mask: "*"
    });
    if (first !== second) {
      throw new Error(await t("askMasterMismatch"));
    }
  }
  return first;
}

export async function selectEntry(entries: PasswordEntry[]): Promise<PasswordEntry> {
  if (entries.length === 0) {
    throw new Error(await t("cmdNoEntriesCreate"));
  }
  const selectedName = await select({
    message: await t("askEntry"),
    choices: entries.map((entry) => ({
      name: `${entry.name} (seq=${entry.sequence}, ${entry.strength}, len=${entry.length})`,
      value: entry.name
    }))
  });
  const selected = entries.find((entry) => entry.name === selectedName);
  if (!selected) {
    throw new Error(await t("askEntryNotFound"));
  }
  return selected;
}

async function askStrength(): Promise<PasswordStrength> {
  return select({
    message: await t("askStrength"),
    default: "normal",
    choices: [
      { name: "normal (a-zA-Z0-9)", value: "normal" },
      { name: "strong (a-zA-Z0-9 + special)", value: "strong" },
      { name: "number (0-9)", value: "number" }
    ]
  });
}

export async function createEntryInteractively(store: StoreData): Promise<PasswordEntry> {
  const name = await input({
    message: await t("askName"),
    validate: async (v) => !!v || (await t("askNameRequired"))
  });
  if (store.entries.some((entry) => entry.name === name)) {
    throw new Error(await t("askNameDuplicate"));
  }

  const description = await input({ message: await t("askDescription"), default: "" });
  const strength = await askStrength();
  const lengthText = await input({
    message: await t("askLength"),
    default: "12",
    validate: async (v) => {
      const parsed = Number.parseInt(v, 10);
      if (!Number.isInteger(parsed) || parsed <= 0) {
        return await t("askLengthInvalid");
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
    message: await t("askCreateEntry"),
    default: store.entries.length === 0
  });
  if (!shouldCreate) {
    return false;
  }
  const entry = await createEntryInteractively(store);
  store.entries.push(entry);
  return true;
}
