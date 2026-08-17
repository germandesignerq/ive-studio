import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dict } from './dictionary'

export type Language = 'en' | 'de' | 'fr'

const languages: Language[] = ['en', 'de', 'fr']

type LanguageContextValue = {
  lang: Language
  setLang: (l: Language) => void
  toggle: () => void
  t: typeof dict.de
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'ive-lang'

function isLanguage(v: string | null): v is Language {
  return v === 'en' || v === 'de' || v === 'fr'
}

function detectInitialLang(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLanguage(stored)) return stored
  const browser = navigator.language.toLowerCase()
  if (browser.startsWith('de')) return 'de'
  if (browser.startsWith('fr')) return 'fr'
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLang)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const toggle = () => setLangState((l) => languages[(languages.indexOf(l) + 1) % languages.length])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

/** Достаёт нужный язык из билингвального поля данных: { en, de, fr }. */
export type Localized = { en: string; de: string; fr: string }
export function useLocalized() {
  const { lang } = useLanguage()
  return (v: Localized) => v[lang]
}
