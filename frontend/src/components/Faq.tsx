import { faq } from '@/data/faq'
import { useLocalized } from '@/i18n/LanguageContext'
import { Reveal } from './Reveal'

/**
 * Вопросы с главной. Разметка — обычные <details>: раскрываются без JS,
 * поэтому текст ответа виден краулеру и попадает в сниппет вместе с
 * `FAQPage` из seo.ts. Оба берут содержимое из data/faq.ts — расходиться нечему.
 */
export function Faq() {
  const pick = useLocalized()

  return (
    <ul className="mt-[52px] border-t border-line">
      {faq.map((item, i) => (
        <Reveal as="li" key={item.q.en} delay={(i % 3) * 70} className="border-b border-line">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start gap-6 py-7 text-[19px] font-medium tracking-[-.02em] transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{pick(item.q)}</span>
              <Plus className="mt-[5px] flex-none text-gold transition-transform duration-[350ms] ease-[var(--ease)] group-open:rotate-45" />
            </summary>
            <p className="max-w-[62ch] pb-7 text-[16px] leading-[1.6] font-light text-fg-2">
              {pick(item.a)}
            </p>
          </details>
        </Reveal>
      ))}
    </ul>
  )
}

const Plus = ({ className }: { className?: string }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    className={className}
    aria-hidden
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)
