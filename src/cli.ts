#!/usr/bin/env node
import { Command } from "commander";
import { generateCommand } from "./commands/generate.js";
import { importCommand } from "./commands/import.js";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { rotateCommand } from "./commands/rotate.js";
import { showCommand } from "./commands/show.js";

async function runWithGuard(task: () => Promise<void>): Promise<void> {
  try {
    await task();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`错误: ${message}`);
    process.exitCode = 1;
  }
}

const program = new Command();

program.name("password-use").description("Deterministic password generator CLI").version("0.1.0");
program.command("init").description("初始化账号并生成助记词").action(() => runWithGuard(initCommand));
program.command("import").description("通过助记词恢复账号").action(() => runWithGuard(importCommand));
program.command("list").description("查看所有密码条目").action(() => runWithGuard(listCommand));
const passwordOutputHelp = "默认仅复制到剪贴板、不在终端显示明文";

program
  .command("show")
  .description(`查看当前序列对应的密码（不轮换）。${passwordOutputHelp}`)
  .option("-p, --print", "在终端打印明文（仍会复制到剪贴板）")
  .action((opts: { print?: boolean }) => runWithGuard(() => showCommand({ print: Boolean(opts.print) })));
program
  .command("generate")
  .description(`生成密码。${passwordOutputHelp}`)
  .option("-p, --print", "在终端打印明文（仍会复制到剪贴板）")
  .action((opts: { print?: boolean }) => runWithGuard(() => generateCommand({ print: Boolean(opts.print) })));
program
  .command("rotate")
  .description(`序列 +1 后生成新密码。${passwordOutputHelp}`)
  .option("-p, --print", "在终端打印明文（仍会复制到剪贴板）")
  .action((opts: { print?: boolean }) => runWithGuard(() => rotateCommand({ print: Boolean(opts.print) })));

void program.parseAsync(process.argv);
