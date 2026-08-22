import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { HTML_LANG, LOCALES, localePath, splitLocale, type Locale } from '@/lib/site'
import { storeLocale } from './detect'
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

/**
 * Язык живёт в адресе, а не в localStorage: у немецкой и французской версии
 * теперь свои URL, и поисковик может их проиндексировать.
 * localStorage остался только как память о выборе — по ней автодетект
 * (см. detect.ts) понимает, что человек уже выбрал язык сам.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { locale, path } = splitLocale(pathname)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale]
    storeLocale(locale)
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

