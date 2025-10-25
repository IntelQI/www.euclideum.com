// Simple stub for i18n - single locale only
export const defaultLocale = "en" as const;

export const locale = {
  en: defaultLocale,
} as const;

export const labels = {
  [defaultLocale]: "English",
} as const;

export const dateLocales = {
  en: "en-US",
} as const;

export const locales = [defaultLocale] as const;

export type LocaleOptions = typeof defaultLocale;
export type Locales = typeof locales;
export type LocalizedRecord<T = string> = Record<LocaleOptions, T>;
