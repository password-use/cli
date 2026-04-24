import { readStore } from "@password-use/crypto-adapter";

export async function listCommand(): Promise<void> {
  const store = await readStore();
  if (store.entries.length === 0) {
    console.log("暂无密码条目。");
    return;
  }
  console.log("密码条目列表：");
  for (const entry of store.entries) {
    console.log(
      `- name=${entry.name}, seq=${entry.sequence}, strength=${entry.strength}, length=${entry.length}, desc=${entry.description ?? ""}`
    );
  }
}
