import { useState } from 'react'
import { Link } from '@/i18n/Link'
import { covers } from '@/data/covers'
import { visibleWorks, workFilters, type Work, type WorkFilterKey } from '@/data/works'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from './Reveal'
import { ArrowRight } from './icons'
import { Picture } from '@/components/Picture'

export function WorkGrid() {
  const [filter, setFilter] = useState<WorkFilterKey>('all')
  const { t } = useLanguage()

  /* «Case studies» — отдельная вкладка: проекты с разбором показываются
     только в ней и намеренно не попадают ни в «All», ни в категории. */
  const matches = (w: Work) =>
    filter === 'case' ? !!w.caseStudy : !w.caseStudy && (filter === 'all' || w.category === filter)

  return (
    <>
      <Reveal className="filters mt-10 flex flex-wrap gap-2" delay={70}>
        {workFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={filter === f.key ? 'on' : ''}
            onClick={() => setFilter(f.key)}
          >
            {t.work[f.label]}
          </button>
        ))}
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-6 max-[1000px]:grid-cols-1">
        {visibleWorks.map((w, i) => {
          /* Скрываем, а не размонтируем: пересозданная карточка появилась бы
             с opacity 0 и ждала наблюдателя — фильтр выглядел бы сломанным. */
          const hidden = !matches(w)

          return (
            <Reveal
              key={w.slug}
              delay={(i % 4) * 70}
              className={`work glow-top relative rounded-lg-x border border-line bg-card transition-[transform,border-color] duration-[400ms] ease-[var(--ease)] ${
                hidden ? 'hidden' : ''
              }`}
            >
              <CardShell work={w}>
                <div className="work-cover relative aspect-16/10 overflow-hidden rounded-t-[25px] bg-[#0D0D10]">
                  {w.img ? (
                    <Picture
                      src={w.img}
                      alt={`${w.name} — ${w.tags}`}
                      sizes="(min-width: 1000px) 560px, 100vw"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms]"
                    />
                  ) : (
                    covers[w.cover!]
                  )}
                </div>
                <div className="flex items-start justify-between gap-5 p-[24px_26px_28px]">
                  <div>
                    <h3 className="text-[23px] font-medium tracking-[-.025em]">{w.name}</h3>
                    <div className="mt-[9px] flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-label text-[14.5px] tracking-[.16em] uppercase text-fg-2">
                        {w.tags}
                      </span>
                      {w.caseStudy && (
                        <span className="rounded-full border border-[rgba(233,201,127,.3)] bg-[rgba(233,201,127,.07)] px-[10px] py-[3px] font-label text-[12.5px] tracking-[.1em] uppercase text-gold-soft">
                          {t.work.caseStudy}
                        </span>
                      )}
                    </div>
                    <p className="mt-[13px] max-w-[42ch] text-[15.5px] font-light text-fg-2">
                      {w.result}
                    </p>
                  </div>
                  <span className="arrow h-[38px] w-[38px]">
                    <ArrowRight />
                  </span>
                </div>
              </CardShell>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}

/**
 * Кейс открывает разбор внутри сайта, остальные проекты — живой сайт клиента.
 * Пока адрес не задан, карточка остаётся некликабельной: битая ссылка хуже её отсутствия.
 */
function CardShell({ work, children }: { work: Work; children: React.ReactNode }) {
  const { t } = useLanguage()
  if (work.caseStudy)
    return (
      <Link to={`/work/${work.slug}`} className="card-link block">
        {children}
      </Link>
    )

  if (work.url)
    return (
      <a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link block"
        aria-label={`${work.name} — ${t.work.openLive}`}
      >
        {children}
      </a>
    )

  return <div className="block">{children}</div>
}
