import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { DEFAULT_LOCALE, HTML_LANG, LOCALES, localePath, splitLocale, type Locale } from '@/lib/site'
import { dict } from './dictionary'

export type Language = Locale

type LanguageContextValue = {
  lang: Language
  /** путь текущей страницы без языкового префикса — из него строятся ссылки */
  path: string
  setLang: (l: Language) => void
  toggle: () => void
  t: typeof dict.de
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'ive-lang'

/**
 * Язык живёт в адресе, а не в localStorage: у немецкой и французской версии
 * теперь свои URL, и поисковик может их проиндексировать.
 * localStorage остался только как память о выборе для первого захода на «/».
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { locale, path } = splitLocale(pathname)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale]
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* приватный режим — просто не запоминаем */
    }
  }, [locale])

  const value = useMemo<LanguageContextValue>(() => {
    const setLang = (l: Language) => navigate(localePath(path, l))
    return {
      lang: locale,
      path,
      setLang,
      toggle: () => setLang(LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length]),
      t: dict[locale],
    }
  }, [locale, path, navigate])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

/** Достаёт нужный язык из локализованного поля данных: { en, de, fr, uk }. */
export type Localized = { en: string; de: string; fr: string; uk: string }
export function useLocalized() {
  const { lang } = useLanguage()
  return (v: Localized) => v[lang]
}

/** Язык, выбранный в прошлый раз — используется только для редиректа с «/». */
export function rememberedLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale
  } catch {
    /* нет доступа к хранилищу */
  }
  return DEFAULT_LOCALE
}
