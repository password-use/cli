import {
  getCurrentLanguage,
  getSupportedLanguages,
  parseLanguageInput,
  setCurrentLanguage,
  t
} from "../i18n.js";

export async function languageCommand(languageArg?: string): Promise<void> {
  const supported = getSupportedLanguages();
  const langList = Object.entries(supported)
    .map(([code, name]) => `${code}(${name})`)
    .join(", ");

  if (!languageArg) {
    const current = await getCurrentLanguage();
    console.log(await t("languageCurrent", { lang: `${current}(${supported[current]})` }));
    console.log(await t("languageAvailable", { langs: langList }));
    return;
  }

  const normalized = parseLanguageInput(languageArg);
  if (!normalized) {
    throw new Error(await t("languageUnsupported", { lang: languageArg }));
  }

  await setCurrentLanguage(normalized);
  console.log(await t("languageSet", { lang: `${normalized}(${supported[normalized]})` }));
}
