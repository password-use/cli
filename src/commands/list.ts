import { readStore } from "@password-use/crypto-adapter";
import { t } from "../i18n.js";

export async function listCommand(): Promise<void> {
  const store = await readStore();
  if (store.entries.length === 0) {
    console.log(await t("cmdNoEntries"));
    return;
  }
  console.log(await t("listTitle"));
  for (const entry of store.entries) {
    console.log(
      `- name=${entry.name}, seq=${entry.sequence}, strength=${entry.strength}, length=${entry.length}, desc=${entry.description ?? ""}`
    );
  }
}
