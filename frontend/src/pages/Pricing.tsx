import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { PlanCards } from '@/components/PlanCards'
import { PricingTable } from '@/components/PricingTable'
import { CtaSection } from '@/components/CtaSection'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { useLanguage } from '@/i18n/LanguageContext'

const SOURCE = 'pricing page'

export function Pricing() {
  const heroRef = useFollowGlow<HTMLElement>(50, 44)
  const { t } = useLanguage()

  return (
    <>
      <Nav source={SOURCE} />

      <header
        ref={heroRef}
        className="glow relative overflow-hidden pt-[170px] pb-[70px] max-[680px]:pt-[130px] max-[680px]:pb-10"
      >
        <div className="wrap relative z-[2]">
          <span className="eyebrow mb-[22px] block">{t.pricing.eyebrow}</span>
          <h1 className="max-w-[15ch] text-[clamp(44px,7.4vw,90px)] tracking-[-.05em] max-[680px]:max-w-none">
            {t.pricing.h1}<span className="em-u">{t.pricing.h1em}</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[clamp(18px,1.8vw,22px)] leading-[1.5] font-light text-fg-2">
            {t.pricing.lead}
          </p>
        </div>
      </header>

      {/* ── ПАКЕТЫ ── */}
      <section className="pb-[110px] max-[680px]:pb-[76px]">
        <div className="wrap">
          <PlanCards source={`${SOURCE}: cards`} />
        </div>
      </section>

      {/* ── СРАВНЕНИЕ ── */}
      <section className="pb-[110px] max-[680px]:pb-[76px]">
        <div className="wrap">
          <Reveal as="h2" className="max-w-[18ch] text-[clamp(30px,4.2vw,52px)] tracking-[-.042em]">
            {t.pricing.compareTitle}<span className="em">{t.pricing.compareTitleEm}</span>
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-[50ch] text-[18px] leading-[1.55] font-light text-fg-2">
            {t.pricing.compareLead}
          </Reveal>

          <Reveal className="mt-14">
            <PricingTable />
          </Reveal>

          <Reveal as="p" className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] font-light text-fg-3">
            {t.pricing.compareNote}
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={t.pricing.ctaTitle}
        sub={t.pricing.ctaSub}
        button={t.pricing.ctaButton}
        source={`${SOURCE}: cta`}
      />

      <Footer source={`${SOURCE}: footer`} />
    </>
  )
}
