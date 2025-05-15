export type LanguageCode =
  | "pl" // Polish
  | "en" // English
  | "de" // German
  | "fr" // French
  | "es" // Spanish
  | "it" // Italian
  | "ru" // Russian
  | "ja" // Japanese
  | "zh" // Chinese
  | "ar" // Arabic
  | "pt" // Portuguese
  | "nl" // Dutch
  | "sv" // Swedish
  | "cs" // Czech
  | "ko" // Korean

export interface Language {
  code: LanguageCode
  name: {
    pl: string
    en: string
  }
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  { code: "pl", name: { pl: "Polski", en: "Polish" }, nativeName: "Polski", flag: "🇵🇱" },
  { code: "en", name: { pl: "Angielski", en: "English" }, nativeName: "English", flag: "🇬🇧" },
  { code: "de", name: { pl: "Niemiecki", en: "German" }, nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: { pl: "Francuski", en: "French" }, nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: { pl: "Hiszpański", en: "Spanish" }, nativeName: "Español", flag: "🇪🇸" },
  { code: "it", name: { pl: "Włoski", en: "Italian" }, nativeName: "Italiano", flag: "🇮��" },
  { code: "ru", name: { pl: "Rosyjski", en: "Russian" }, nativeName: "Русский", flag: "🇷🇺" },
  { code: "ja", name: { pl: "Japoński", en: "Japanese" }, nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: { pl: "Chiński", en: "Chinese" }, nativeName: "中文", flag: "🇨🇳" },
  { code: "ar", name: { pl: "Arabski", en: "Arabic" }, nativeName: "العربية", flag: "🇸🇦" },
  { code: "pt", name: { pl: "Portugalski", en: "Portuguese" }, nativeName: "Português", flag: "🇵🇹" },
  { code: "nl", name: { pl: "Holenderski", en: "Dutch" }, nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: { pl: "Szwedzki", en: "Swedish" }, nativeName: "Svenska", flag: "🇸🇪" },
  { code: "cs", name: { pl: "Czeski", en: "Czech" }, nativeName: "Čeština", flag: "🇨🇿" },
  { code: "ko", name: { pl: "Koreański", en: "Korean" }, nativeName: "한국어", flag: "🇰🇷" },
]

export function getLanguageByCode(code: LanguageCode): Language | undefined {
  return languages.find((lang) => lang.code === code)
}

export function getLanguageName(code: LanguageCode, uiLanguage: "pl" | "en" = "pl"): string {
  const language = getLanguageByCode(code)
  if (!language) return code
  return language.name[uiLanguage]
}

export function getLanguageFlag(code: LanguageCode): string {
  const language = getLanguageByCode(code)
  return language?.flag || "🌐"
}
