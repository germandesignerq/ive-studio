import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dict } from './dictionary'

export type Language = 'en' | 'ru'

type LanguageContextValue = {
  lang: Language
  setLang: (l: Language) => void
  toggle: () => void
  t: typeof dict.ru
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'ive-lang'

function detectInitialLang(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ru') return stored
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLang)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const toggle = () => setLangState((l) => (l === 'en' ? 'ru' : 'en'))

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

/** Достаёт нужный язык из билингвального поля данных: { en, ru }. */
export type Localized = { en: string; ru: string }
export function useLocalized() {
  const { lang } = useLanguage()
  return (v: Localized) => v[lang]
}
