import type { Locales, LocalizedRecord } from '@/lib/opendocs/types/i18n'

export const defaultLocale = 'en' as const

export const locale = {
  en: defaultLocale,
} as const

export const labels = {
  [defaultLocale]: 'English',
} as const

export const dateLocales: LocalizedRecord = {
  en: 'en-US',
} as const

export const locales = Object.values(locale) as Locales
