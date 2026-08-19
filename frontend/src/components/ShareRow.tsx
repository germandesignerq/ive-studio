import { useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { absoluteUrl } from '@/lib/site'

const CHIP =
  'rounded-full border border-line px-[18px] py-2 text-[14.5px] text-fg-2 transition-colors duration-[250ms] ease-[var(--ease)] hover:border-[rgba(233,201,127,.45)] hover:bg-[rgba(233,201,127,.05)] hover:text-gold'

/**
 * Кнопки «поделиться». Раньше это были три ссылки на «#» — они выглядели
 * рабочими, но ничего не делали; шеринг статьи это в том числе внешние ссылки,
 * то есть трафик и сигналы для поиска.
 */
export function ShareRow({ path, title }: { path: string; title: string }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const url = absoluteUrl(path)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* буфер недоступен — адрес всё равно виден в строке браузера */
    }
  }

  return (
    <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-[30px]">
      <span className="eyebrow">{t.blog.share}</span>
      <a
        className={CHIP}
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className={CHIP}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <button type="button" className={`${CHIP} cursor-pointer`} onClick={copy}>
        {copied ? '✓' : t.blog.copyLink}
      </button>
    </div>
  )
}
