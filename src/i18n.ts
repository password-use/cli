import { readCliConfig, writeCliConfig } from "./config.js";
import type { LanguageCode } from "./types.js";

type Dict = {
  appDescription: string;
  cmdInitDesc: string;
  cmdImportDesc: string;
  cmdListDesc: string;
  cmdShowDesc: string;
  cmdGenerateDesc: string;
  cmdRotateDesc: string;
  cmdRotateArgDesc: string;
  cmdLogoutDesc: string;
  cmdLanguageDesc: string;
  cmdLanguageArgDesc: string;
  passwordOutputHelp: string;
  printOptionHelp: string;
  helpUsageTitle: string;
  helpOptionsTitle: string;
  helpCommandsTitle: string;
  helpArgumentsTitle: string;
  helpGlobalOptionsTitle: string;
  helpOptionDesc: string;
  helpVersionDesc: string;
  helpCommandDesc: string;
  errorPrefix: string;
  cmdNotInitialized: string;
  cmdNoEntriesCreate: string;
  cmdNoEntries: string;
  listTitle: string;
  copiedMasked: string;
  rotateDone: string;
  rotateCopied: string;
  rotateDeltaInvalid: string;
  rotateOutOfRange: string;
  showPassword: string;
  generatePassword: string;
  newPassword: string;
  importSuccess: string;
  initAlready: string;
  initSaveMnemonic: string;
  initConfirmMnemonic: string;
  initConfirmRequired: string;
  initSuccess: string;
  importMnemonicPrompt: string;
  importMnemonicRequired: string;
  importMnemonicInvalid: string;
  askMaster: string;
  askMasterRetry: string;
  askMasterRequired: string;
  askMasterAgain: string;
  askMasterMismatch: string;
  askEntry: string;
  askEntryNotFound: string;
  askStrength: string;
  askName: string;
  askNameRequired: string;
  askNameDuplicate: string;
  askDescription: string;
  askLength: string;
  askLengthInvalid: string;
  askCreateEntry: string;
  logoutConfirm: string;
  logoutCancelled: string;
  logoutSuccess: string;
  languageCurrent: string;
  languageSet: string;
  languageUnsupported: string;
  languageAvailable: string;
};

const SUPPORTED_LANGUAGES: Record<LanguageCode, string> = {
  en: "English",
  "zh-CN": "中文",
  fr: "Francais",
  ja: "日本語",
  ko: "한국어",
  de: "Deutsch",
  es: "Espanol",
  pt: "Portugues"
};

const EN: Dict = {
  appDescription: "Deterministic password generator CLI",
  cmdInitDesc: "Initialize account and generate mnemonic",
  cmdImportDesc: "Restore account using mnemonic",
  cmdListDesc: "List all password entries",
  cmdShowDesc: "Show password for current sequence (no rotate). {passwordOutputHelp}",
  cmdGenerateDesc: "Generate password. {passwordOutputHelp}",
  cmdRotateDesc: "Rotate sequence and generate a new password. {passwordOutputHelp}",
  cmdRotateArgDesc: "Sequence delta (default +1, supports +/-N)",
  cmdLogoutDesc: "Verify master password and clear all local data",
  cmdLanguageDesc: "Set or display CLI language",
  cmdLanguageArgDesc: "Language code (en, zh-CN, fr, ja, ko, de, es, pt)",
  passwordOutputHelp: "Default behavior copies to clipboard and does not print plaintext",
  printOptionHelp: "Print plaintext in terminal (do not copy to clipboard)",
  helpUsageTitle: "Usage:",
  helpOptionsTitle: "Options:",
  helpCommandsTitle: "Commands:",
  helpArgumentsTitle: "Arguments:",
  helpGlobalOptionsTitle: "Global Options:",
  helpOptionDesc: "display help for command",
  helpVersionDesc: "output the version number",
  helpCommandDesc: "display help for command",
  errorPrefix: "Error",
  cmdNotInitialized: "Account not initialized, please run init first",
  cmdNoEntriesCreate: "No entries found, please create one first",
  cmdNoEntries: "No password entries.",
  listTitle: "Password entries:",
  copiedMasked: "Password copied to clipboard (plaintext not shown in terminal).",
  rotateDone: "Rotated {name} to sequence={seq}",
  rotateCopied: "New password copied to clipboard (plaintext not shown in terminal).",
  rotateDeltaInvalid: "Delta must be an integer, e.g. 1, 10, -10",
  rotateOutOfRange: "Sequence out of range after rotate. Valid range: {min}~{max}",
  showPassword: "Current password ({name}, seq={seq}): {password}",
  generatePassword: "Generated password ({name}): {password}",
  newPassword: "New password: {password}",
  importSuccess: "Import completed. Local encrypted seed has been updated.",
  initAlready: "Account already initialized. Clear local store manually before reset.",
  initSaveMnemonic: "Please save the mnemonic below (shown only once):",
  initConfirmMnemonic: "I have saved the mnemonic, continue to set master password",
  initConfirmRequired: "Please save the mnemonic before continuing",
  initSuccess: "Initialization complete. Seed is encrypted and stored locally.",
  importMnemonicPrompt: "Enter mnemonic (space-separated):",
  importMnemonicRequired: "Mnemonic cannot be empty",
  importMnemonicInvalid: "Invalid mnemonic format",
  askMaster: "Enter master password:",
  askMasterRetry: "Master password is incorrect or decryption failed. Try again:",
  askMasterRequired: "Master password cannot be empty",
  askMasterAgain: "Enter master password again:",
  askMasterMismatch: "Master passwords do not match",
  askEntry: "Select password entry:",
  askEntryNotFound: "Entry not found",
  askStrength: "Select password strength:",
  askName: "Name (must be unique, immutable):",
  askNameRequired: "Name cannot be empty",
  askNameDuplicate: "Name already exists and must be unique",
  askDescription: "Description (optional):",
  askLength: "Password length (default 12):",
  askLengthInvalid: "Length must be a positive integer",
  askCreateEntry: "Create a new password entry?",
  logoutConfirm: "This will delete all local data in ~/.password-use. Continue?",
  logoutCancelled: "Logout cancelled.",
  logoutSuccess: "All local data has been removed.",
  languageCurrent: "Current language: {lang}",
  languageSet: "Language set to: {lang}",
  languageUnsupported: "Unsupported language: {lang}",
  languageAvailable: "Available languages: {langs}"
};

const ZH: Dict = {
  ...EN,
  appDescription: "确定性密码生成 CLI 工具",
  cmdInitDesc: "初始化账号并生成助记词",
  cmdImportDesc: "通过助记词恢复账号",
  cmdListDesc: "查看所有密码条目",
  cmdShowDesc: "查看当前序列对应的密码（不轮换）。{passwordOutputHelp}",
  cmdGenerateDesc: "生成密码。{passwordOutputHelp}",
  cmdRotateDesc: "序列 +1 后生成新密码。{passwordOutputHelp}",
  cmdRotateArgDesc: "序列变更值（默认 +1，支持 +/-N）",
  cmdLogoutDesc: "验证主密码并清理本地所有数据",
  cmdLanguageDesc: "设置或查看 CLI 语言",
  cmdLanguageArgDesc: "语言代码（en, zh-CN, fr, ja, ko, de, es, pt）",
  passwordOutputHelp: "默认仅复制到剪贴板、不在终端显示明文",
  printOptionHelp: "在终端打印明文（不复制到剪贴板）",
  helpUsageTitle: "用法：",
  helpOptionsTitle: "选项：",
  helpCommandsTitle: "命令：",
  helpArgumentsTitle: "参数：",
  helpGlobalOptionsTitle: "全局选项：",
  helpOptionDesc: "显示命令帮助",
  helpVersionDesc: "输出版本号",
  helpCommandDesc: "显示命令帮助",
  errorPrefix: "错误",
  cmdNotInitialized: "账号未初始化，请先执行 init",
  cmdNoEntriesCreate: "暂无密码条目，请先创建",
  cmdNoEntries: "暂无密码条目。",
  listTitle: "密码条目列表：",
  copiedMasked: "密码已复制到剪贴板（未在终端显示明文）。",
  rotateDone: "已轮换 {name} 到 sequence={seq}",
  rotateCopied: "新密码已复制到剪贴板（未在终端显示明文）。",
  rotateDeltaInvalid: "步长必须是整数，例如 1、10、-10",
  rotateOutOfRange: "轮换后序列超出范围，合法范围：{min}~{max}",
  showPassword: "当前密码({name}, seq={seq}): {password}",
  generatePassword: "生成密码({name}): {password}",
  newPassword: "新密码: {password}",
  importSuccess: "导入成功，已更新本地加密 seed。",
  initAlready: "账号已初始化，如需重置请先手动清理存储文件",
  initSaveMnemonic: "请务必保存下面的助记词（仅显示一次）：",
  initConfirmMnemonic: "我已保存好助记词，继续设置主密码",
  initConfirmRequired: "请先保存助记词后再继续",
  initSuccess: "初始化完成，seed 已加密保存到本地。",
  importMnemonicPrompt: "请输入助记词（空格分隔）：",
  importMnemonicRequired: "助记词不能为空",
  importMnemonicInvalid: "助记词格式无效",
  askMaster: "请输入主密码：",
  askMasterRetry: "主密码错误或无法解密，请再输入一次：",
  askMasterRequired: "主密码不能为空",
  askMasterAgain: "请再次输入主密码：",
  askMasterMismatch: "两次主密码不一致",
  askEntry: "请选择密码条目：",
  askEntryNotFound: "未找到条目",
  askStrength: "请选择密码强度：",
  askName: "名称（唯一，不可修改）：",
  askNameRequired: "名称不能为空",
  askNameDuplicate: "名称已存在，必须唯一",
  askDescription: "描述（可选）：",
  askLength: "密码长度（默认 12）：",
  askLengthInvalid: "长度必须是正整数",
  askCreateEntry: "是否创建新密码条目？",
  logoutConfirm: "将删除 ~/.password-use 下的所有本地数据，是否继续？",
  logoutCancelled: "已取消注销。",
  logoutSuccess: "本地数据已全部删除。",
  languageCurrent: "当前语言：{lang}",
  languageSet: "语言已设置为：{lang}",
  languageUnsupported: "不支持的语言：{lang}",
  languageAvailable: "可用语言：{langs}"
};

const FR: Dict = {
  ...EN,
  appDescription: "CLI de generation de mots de passe deterministe",
  cmdInitDesc: "Initialiser le compte et generer une phrase mnemotechnique",
  cmdImportDesc: "Restaurer le compte via phrase mnemotechnique",
  cmdListDesc: "Lister toutes les entrees de mot de passe",
  cmdLanguageDesc: "Definir ou afficher la langue du CLI",
  passwordOutputHelp: "Par defaut copie dans le presse-papiers et n'affiche pas en clair",
  printOptionHelp: "Afficher en clair dans le terminal (sans copie)",
  helpUsageTitle: "Utilisation :",
  helpOptionsTitle: "Options :",
  helpCommandsTitle: "Commandes :",
  helpArgumentsTitle: "Arguments :",
  helpGlobalOptionsTitle: "Options globales :",
  helpOptionDesc: "afficher l'aide de la commande",
  helpVersionDesc: "afficher la version",
  helpCommandDesc: "afficher l'aide de la commande",
  errorPrefix: "Erreur",
  languageCurrent: "Langue actuelle : {lang}",
  languageSet: "Langue definie : {lang}",
  languageUnsupported: "Langue non prise en charge : {lang}",
  languageAvailable: "Langues disponibles : {langs}"
};

const JA: Dict = {
  ...EN,
  appDescription: "決定論的パスワード生成CLI",
  cmdInitDesc: "アカウントを初期化してニーモニックを生成",
  cmdImportDesc: "ニーモニックでアカウントを復元",
  cmdListDesc: "すべてのパスワードエントリを表示",
  cmdShowDesc: "現在のシーケンスのパスワードを表示（ローテーションなし）。{passwordOutputHelp}",
  cmdGenerateDesc: "パスワードを生成。{passwordOutputHelp}",
  cmdRotateDesc: "シーケンスを +1 して新しいパスワードを生成。{passwordOutputHelp}",
  cmdRotateArgDesc: "シーケンス差分（既定 +1、+/-N 対応）",
  cmdLanguageDesc: "CLI の言語を設定または表示",
  cmdLanguageArgDesc: "言語コード（en, zh-CN, fr, ja, ko, de, es, pt）",
  passwordOutputHelp: "既定ではクリップボードにコピーし、平文は表示しません",
  printOptionHelp: "平文を端末に表示（クリップボードにはコピーしない）",
  helpUsageTitle: "使い方：",
  helpOptionsTitle: "オプション：",
  helpCommandsTitle: "コマンド：",
  helpArgumentsTitle: "引数：",
  helpGlobalOptionsTitle: "グローバルオプション：",
  helpOptionDesc: "コマンドのヘルプを表示",
  helpVersionDesc: "バージョン番号を表示",
  helpCommandDesc: "コマンドのヘルプを表示",
  errorPrefix: "エラー",
  languageCurrent: "現在の言語：{lang}",
  languageSet: "言語を設定しました：{lang}",
  languageUnsupported: "未対応の言語：{lang}",
  languageAvailable: "利用可能な言語：{langs}"
};

const KO: Dict = {
  ...EN,
  appDescription: "결정론적 비밀번호 생성 CLI",
  cmdInitDesc: "계정을 초기화하고 니모닉 생성",
  cmdImportDesc: "니모닉으로 계정 복구",
  cmdListDesc: "모든 비밀번호 항목 보기",
  cmdShowDesc: "현재 시퀀스의 비밀번호 보기(회전 없음). {passwordOutputHelp}",
  cmdGenerateDesc: "비밀번호 생성. {passwordOutputHelp}",
  cmdRotateDesc: "시퀀스를 +1 하고 새 비밀번호 생성. {passwordOutputHelp}",
  cmdRotateArgDesc: "시퀀스 증감값 (기본 +1, +/-N 지원)",
  cmdLanguageDesc: "CLI 언어 설정 또는 조회",
  cmdLanguageArgDesc: "언어 코드 (en, zh-CN, fr, ja, ko, de, es, pt)",
  passwordOutputHelp: "기본값은 클립보드 복사이며 평문은 출력하지 않습니다",
  printOptionHelp: "평문을 터미널에 출력 (클립보드에 복사하지 않음)",
  helpUsageTitle: "사용법:",
  helpOptionsTitle: "옵션:",
  helpCommandsTitle: "명령:",
  helpArgumentsTitle: "인수:",
  helpGlobalOptionsTitle: "전역 옵션:",
  helpOptionDesc: "명령 도움말 표시",
  helpVersionDesc: "버전 번호 출력",
  helpCommandDesc: "명령 도움말 표시",
  errorPrefix: "오류",
  languageCurrent: "현재 언어: {lang}",
  languageSet: "언어가 설정되었습니다: {lang}",
  languageUnsupported: "지원하지 않는 언어: {lang}",
  languageAvailable: "사용 가능한 언어: {langs}"
};

const DE: Dict = {
  ...EN,
  appDescription: "Deterministische Passwort-Generator CLI",
  cmdInitDesc: "Konto initialisieren und Mnemonic erzeugen",
  cmdImportDesc: "Konto mit Mnemonic wiederherstellen",
  cmdListDesc: "Alle Passwort-Eintraege anzeigen",
  cmdShowDesc: "Passwort fuer aktuelle Sequenz anzeigen (ohne Rotation). {passwordOutputHelp}",
  cmdGenerateDesc: "Passwort erzeugen. {passwordOutputHelp}",
  cmdRotateDesc: "Sequenz +1 und neues Passwort erzeugen. {passwordOutputHelp}",
  cmdRotateArgDesc: "Sequenz-Delta (Standard +1, +/-N unterstuetzt)",
  cmdLanguageDesc: "CLI-Sprache setzen oder anzeigen",
  cmdLanguageArgDesc: "Sprachcode (en, zh-CN, fr, ja, ko, de, es, pt)",
  passwordOutputHelp: "Standardmaessig in Zwischenablage kopieren, Klartext nicht anzeigen",
  printOptionHelp: "Klartext im Terminal anzeigen (nicht in Zwischenablage kopieren)",
  helpUsageTitle: "Verwendung:",
  helpOptionsTitle: "Optionen:",
  helpCommandsTitle: "Befehle:",
  helpArgumentsTitle: "Argumente:",
  helpGlobalOptionsTitle: "Globale Optionen:",
  helpOptionDesc: "Hilfe fuer Befehl anzeigen",
  helpVersionDesc: "Versionsnummer ausgeben",
  helpCommandDesc: "Hilfe fuer Befehl anzeigen",
  errorPrefix: "Fehler",
  languageCurrent: "Aktuelle Sprache: {lang}",
  languageSet: "Sprache gesetzt: {lang}",
  languageUnsupported: "Nicht unterstuetzte Sprache: {lang}",
  languageAvailable: "Verfuegbare Sprachen: {langs}"
};

const ES: Dict = {
  ...EN,
  appDescription: "CLI generador deterministico de contrasenas",
  cmdInitDesc: "Inicializar cuenta y generar mnemotecnica",
  cmdImportDesc: "Restaurar cuenta con mnemotecnica",
  cmdListDesc: "Listar todas las entradas de contrasena",
  cmdShowDesc: "Mostrar contrasena de la secuencia actual (sin rotar). {passwordOutputHelp}",
  cmdGenerateDesc: "Generar contrasena. {passwordOutputHelp}",
  cmdRotateDesc: "Incrementar secuencia y generar nueva contrasena. {passwordOutputHelp}",
  cmdRotateArgDesc: "Delta de secuencia (por defecto +1, soporta +/-N)",
  cmdLanguageDesc: "Configurar o mostrar idioma del CLI",
  cmdLanguageArgDesc: "Codigo de idioma (en, zh-CN, fr, ja, ko, de, es, pt)",
  passwordOutputHelp: "Por defecto copia al portapapeles y no muestra texto plano",
  printOptionHelp: "Mostrar texto plano en terminal (sin copiar al portapapeles)",
  helpUsageTitle: "Uso:",
  helpOptionsTitle: "Opciones:",
  helpCommandsTitle: "Comandos:",
  helpArgumentsTitle: "Argumentos:",
  helpGlobalOptionsTitle: "Opciones globales:",
  helpOptionDesc: "mostrar ayuda del comando",
  helpVersionDesc: "mostrar numero de version",
  helpCommandDesc: "mostrar ayuda del comando",
  errorPrefix: "Error",
  languageCurrent: "Idioma actual: {lang}",
  languageSet: "Idioma configurado: {lang}",
  languageUnsupported: "Idioma no soportado: {lang}",
  languageAvailable: "Idiomas disponibles: {langs}"
};

const PT: Dict = {
  ...EN,
  appDescription: "CLI gerador deterministico de senhas",
  cmdInitDesc: "Inicializar conta e gerar mnemotecnico",
  cmdImportDesc: "Restaurar conta usando mnemotecnico",
  cmdListDesc: "Listar todas as entradas de senha",
  cmdShowDesc: "Mostrar senha da sequencia atual (sem rotacao). {passwordOutputHelp}",
  cmdGenerateDesc: "Gerar senha. {passwordOutputHelp}",
  cmdRotateDesc: "Aumentar sequencia e gerar nova senha. {passwordOutputHelp}",
  cmdRotateArgDesc: "Delta da sequencia (padrao +1, suporta +/-N)",
  cmdLanguageDesc: "Definir ou mostrar idioma do CLI",
  cmdLanguageArgDesc: "Codigo de idioma (en, zh-CN, fr, ja, ko, de, es, pt)",
  passwordOutputHelp: "Padrao copia para area de transferencia e nao mostra texto em claro",
  printOptionHelp: "Mostrar texto em claro no terminal (sem copiar para area de transferencia)",
  helpUsageTitle: "Uso:",
  helpOptionsTitle: "Opcoes:",
  helpCommandsTitle: "Comandos:",
  helpArgumentsTitle: "Argumentos:",
  helpGlobalOptionsTitle: "Opcoes globais:",
  helpOptionDesc: "mostrar ajuda do comando",
  helpVersionDesc: "mostrar numero da versao",
  helpCommandDesc: "mostrar ajuda do comando",
  errorPrefix: "Erro",
  languageCurrent: "Idioma atual: {lang}",
  languageSet: "Idioma definido para: {lang}",
  languageUnsupported: "Idioma nao suportado: {lang}",
  languageAvailable: "Idiomas disponiveis: {langs}"
};

const DICTS: Record<LanguageCode, Dict> = {
  en: EN,
  "zh-CN": ZH,
  fr: FR,
  ja: JA,
  ko: KO,
  de: DE,
  es: ES,
  pt: PT
};

function format(text: string, vars: Record<string, string | number> = {}): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    text
  );
}

function normalizeLanguage(input: string | undefined): LanguageCode | undefined {
  if (!input) return undefined;
  const raw = input.trim().toLowerCase();
  if (raw.startsWith("zh")) return "zh-CN";
  if (raw.startsWith("fr")) return "fr";
  if (raw.startsWith("ja")) return "ja";
  if (raw.startsWith("ko")) return "ko";
  if (raw.startsWith("de")) return "de";
  if (raw.startsWith("es")) return "es";
  if (raw.startsWith("pt")) return "pt";
  if (raw.startsWith("en")) return "en";
  return undefined;
}

function detectSystemLanguage(): LanguageCode {
  const envLocale =
    process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || Intl.DateTimeFormat().resolvedOptions().locale;
  return normalizeLanguage(envLocale) ?? "en";
}

export async function getCurrentLanguage(): Promise<LanguageCode> {
  const config = await readCliConfig();
  return config.language ?? detectSystemLanguage();
}

export async function setCurrentLanguage(language: LanguageCode): Promise<void> {
  const config = await readCliConfig();
  config.language = language;
  await writeCliConfig(config);
}

export function getSupportedLanguages(): Record<LanguageCode, string> {
  return SUPPORTED_LANGUAGES;
}

export async function t(
  key: keyof Dict,
  vars?: Record<string, string | number>
): Promise<string> {
  const language = await getCurrentLanguage();
  return format(DICTS[language][key], vars);
}

export function parseLanguageInput(input: string): LanguageCode | undefined {
  return normalizeLanguage(input);
}
