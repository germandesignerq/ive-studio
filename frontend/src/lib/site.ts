/**
 * Единственное место, где живёт адрес сайта.
 * Меняется здесь — и разъезжается по canonical, hreflang, sitemap, robots и og:url.
 */
export const SITE_URL = 'https://ive-studio.com'

export const SITE_NAME = 'IVE studio'
export const SITE_EMAIL = 'ivedesign93@gmail.com'

/** Картинка для превью ссылок; 1200×630, лежит в /public. */
export const OG_IMAGE = '/og-cover.jpg'

export const LOCALES = ['en', 'de', 'fr', 'uk'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

/** Языковой код для hreflang и <html lang>. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', de: 'de', fr: 'fr', uk: 'uk' }

export function isLocale(v: string | null | undefined): v is Locale {
  return v === 'en' || v === 'de' || v === 'fr' || v === 'uk'
}

/** '/de/pricing' → { locale: 'de', path: '/pricing' } */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, maybe, ...rest] = pathname.split('/')
  if (isLocale(maybe) && maybe !== DEFAULT_LOCALE) {
    const path = '/' + rest.join('/')
    return { locale: maybe, path: path === '/' ? '/' : path.replace(/\/$/, '') }
  }
  return { locale: DEFAULT_LOCALE, path: pathname === '/' ? '/' : pathname.replace(/\/$/, '') }
}

/** ('/pricing', 'de') → '/de/pricing'. Английский живёт в корне — так короче и это canonical. */
export function localePath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  if (locale === DEFAULT_LOCALE) return clean || '/'
  return `/${locale}${clean}`
}

export function absoluteUrl(path: string): string {
  return SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''))
}
