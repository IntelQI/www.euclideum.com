// Simple stub types for i18n - single locale only
export type LocaleOptions = 'en';
export type Locales = readonly ['en'];

export type LocalizedRecord<T = string> = Record<LocaleOptions, T>;

// Type for translations - now just a simple object
export type IntlMessages = Record<string, any>;
