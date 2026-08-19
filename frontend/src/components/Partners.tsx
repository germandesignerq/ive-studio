import { Reveal } from './Reveal'
import { partners, type Partner } from '@/data/partners'
import { useLanguage } from '@/i18n/LanguageContext'

/**
 * Стена логотипов на тонкой сетке — тот же приём, что у шагов Process.
 * Знаки прорисовываются штрихом при появлении и подсвечиваются на ховере.
 */
export function Partners() {
  const { t } = useLanguage()

  return (
    <>
      <Reveal className="flex flex-wrap items-end justify-between gap-[30px]">
        <div>
          <span className="eyebrow">{t.partners.eyebrow}</span>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(32px,4.8vw,60px)] tracking-[-.042em]">
            {t.partners.title}<span className="em">{t.partners.titleEm}</span>
          </h2>
        </div>
        <p className="mb-[6px] max-w-[44ch] text-[18px] leading-[1.5] font-light text-fg-2">
          {t.partners.lead}
        </p>
      </Reveal>

      <Reveal className="mt-[58px] grid grid-cols-3 border-t border-line max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
        {partners.map((p, i) => (
          <Cell key={p.name} partner={p} index={i} total={partners.length} />
        ))}
      </Reveal>
    </>
  )
}

function Cell({ partner, index, total }: { partner: Partner; index: number; total: number }) {
  const { t } = useLanguage()
  /* Правую границу гасим у последней колонки, нижнюю — у последнего ряда,
     иначе сетка обрастает висящими линиями по краю. */
  const lastInRow = (index + 1) % 3 === 0
  const inLastRow = index >= total - (total % 3 || 3)

  const inner = (
    <>
      <div className="draw h-[52px] w-[52px] text-fg-2 transition-colors duration-[400ms] group-hover:text-gold">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt=""
            aria-hidden
            className="h-full w-full object-contain opacity-70 transition-opacity duration-[400ms] group-hover:opacity-100"
          />
        ) : (
          partner.mark
        )}
      </div>
      <div className="mt-6 text-[24px] font-medium tracking-[-.03em] transition-colors duration-[400ms] group-hover:text-gold-soft max-[680px]:text-[22px]">
        {partner.name}
      </div>
      <div className="mt-2 font-label text-[14px] tracking-[.16em] uppercase text-fg-3">
        {partner.note}
      </div>
    </>
  )

  const className = `group glow-top flex flex-col items-center border-line px-6 py-[52px] text-center max-[680px]:py-10 ${
    lastInRow ? '' : 'border-r max-[680px]:border-r-0'
  } ${inLastRow ? 'max-[1000px]:border-b-0' : 'border-b'}`

  if (partner.url)
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`${partner.name} — ${t.work.openLive}`}
      >
        {inner}
      </a>
    )

  return <div className={className}>{inner}</div>
}
