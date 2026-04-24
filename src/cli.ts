#!/usr/bin/env node
import { Command } from "commander";
import { generateCommand } from "./commands/generate.js";
import { importCommand } from "./commands/import.js";
import { initCommand } from "./commands/init.js";
import { languageCommand } from "./commands/language.js";
import { listCommand } from "./commands/list.js";
import { logoutCommand } from "./commands/logout.js";
import { rotateCommand } from "./commands/rotate.js";
import { showCommand } from "./commands/show.js";
import { t } from "./i18n.js";

async function runWithGuard(task: () => Promise<void>): Promise<void> {
  try {
    await task();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${await t("errorPrefix")}: ${message}`);
    process.exitCode = 1;
  }
}

const program = new Command();

async function bootstrap(): Promise<void> {
  const helpTitleMap: Record<string, string> = {
    "Usage:": await t("helpUsageTitle"),
    "Options:": await t("helpOptionsTitle"),
    "Commands:": await t("helpCommandsTitle"),
    "Arguments:": await t("helpArgumentsTitle"),
    "Global Options:": await t("helpGlobalOptionsTitle")
  };

  program.configureHelp({
    helpWidth: 100,
    styleTitle: (str: string) => helpTitleMap[str] ?? str
  });

  const passwordOutputHelp = await t("passwordOutputHelp");
  const printOptionHelp = await t("printOptionHelp");

  program
    .name("password-use")
    .description(await t("appDescription"))
    .version("0.1.0", "-V, --version", await t("helpVersionDesc"))
    .helpOption("-h, --help", await t("helpOptionDesc"))
    .helpCommand("help [command]", await t("helpCommandDesc"));

  program.command("init").description(await t("cmdInitDesc")).action(() => runWithGuard(initCommand));
  program.command("import").description(await t("cmdImportDesc")).action(() => runWithGuard(importCommand));
  program.command("list").description(await t("cmdListDesc")).action(() => runWithGuard(listCommand));
  program.command("logout").description(await t("cmdLogoutDesc")).action(() => runWithGuard(logoutCommand));
  program
    .command("language")
    .description(await t("cmdLanguageDesc"))
    .argument("[lang]", await t("cmdLanguageArgDesc"))
    .action((lang?: string) => runWithGuard(() => languageCommand(lang)));

  program
    .command("show")
    .description(await t("cmdShowDesc", { passwordOutputHelp }))
    .option("-p, --print", printOptionHelp)
    .action((opts: { print?: boolean }) => runWithGuard(() => showCommand({ print: Boolean(opts.print) })));
  program
    .command("generate")
    .description(await t("cmdGenerateDesc", { passwordOutputHelp }))
    .option("-p, --print", printOptionHelp)
    .action((opts: { print?: boolean }) => runWithGuard(() => generateCommand({ print: Boolean(opts.print) })));
  program
    .command("rotate")
    .description(await t("cmdRotateDesc", { passwordOutputHelp }))
    .argument("[delta]", await t("cmdRotateArgDesc"))
    .option("-p, --print", printOptionHelp)
    .action((deltaRaw: string | undefined, opts: { print?: boolean }) =>
      runWithGuard(() =>
        rotateCommand({
          print: Boolean(opts.print),
          delta: deltaRaw === undefined ? 1 : Number.parseInt(deltaRaw, 10)
        })
      )
    );

  await program.parseAsync(process.argv);
}

void bootstrap();
