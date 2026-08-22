import { useEffect, useState } from 'react'
import { readConsent, setConsent } from '@/lib/consent'
import { useLanguage } from '@/i18n/LanguageContext'
import { Link } from '@/i18n/Link'

/**
 * Баннер согласия на аналитику. Появляется, пока посетитель не ответил,
 * и больше не возвращается — ответ лежит в localStorage, оттуда же его
 * читает inline-скрипт в index.html ещё до первого хита.
 *
 * Решение читается в эффекте, а не при первом рендере: пререндеренный HTML
 * не знает про localStorage, и без этого гидратация ругалась бы на
 * несовпадение разметки.
 */
export function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => setVisible(readConsent() === null), [])

  if (!visible) return null

  const answer = (value: 'granted' | 'denied') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label={t.cookies.label}
      className="fixed right-5 bottom-5 left-5 z-[70] mx-auto flex max-w-[680px] items-center gap-[18px] rounded-md-x border border-line bg-[rgba(10,10,11,.92)] p-[18px_22px] shadow-[0_20px_50px_-20px_rgba(0,0,0,.9)] backdrop-blur-[18px] max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:gap-[14px]"
    >
      <p className="flex-1 text-[14.5px] leading-[1.5] font-light text-fg-2">
        {t.cookies.text}{' '}
        <Link to="/privacy" className="text-fg-2 underline underline-offset-4 hover:text-gold">
          {t.cookies.more}
        </Link>
      </p>
      <div className="flex flex-none gap-[10px] max-[680px]:justify-end">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => answer('denied')}>
          {t.cookies.decline}
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => answer('granted')}>
          {t.cookies.accept}
        </button>
      </div>
    </div>
  )
}
