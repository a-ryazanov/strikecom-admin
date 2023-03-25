export enum Locale {
  ALL = 'all',
  RU = 'ru',
  EN = 'en',
  ES = 'es',
  DE = 'de',
}

export const localeTranslations: Record<Locale, string> = {
  [Locale.ALL]: 'Все',
  [Locale.RU]: 'Русский',
  [Locale.EN]: 'Английский',
  [Locale.ES]: 'Испанский',
  [Locale.DE]: 'Немецкий',
}
