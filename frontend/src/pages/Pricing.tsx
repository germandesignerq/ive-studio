import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { PlanCards } from '@/components/PlanCards'
import { PricingTable } from '@/components/PricingTable'
import { CtaSection } from '@/components/CtaSection'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { usePageMeta } from '@/hooks/usePageMeta'

const SOURCE = 'pricing page'

export function Pricing() {
  usePageMeta(
    'Pricing — IVE studio',
    'Fixed scope, fixed price. What a landing page, a full website and a SaaS product cost, and exactly what each package includes.',
  )
  const heroRef = useFollowGlow<HTMLElement>(50, 44)

  return (
    <>
      <Nav source={SOURCE} />

      <header
        ref={heroRef}
        className="glow relative overflow-hidden pt-[170px] pb-[70px] max-[680px]:pt-[130px] max-[680px]:pb-10"
      >
        <div className="wrap relative z-[2]">
          <span className="eyebrow mb-[22px] block">Pricing</span>
          <h1 className="max-w-[15ch] text-[clamp(44px,7.4vw,90px)] tracking-[-.05em] max-[680px]:max-w-none">
            Fixed scope. <span className="em-u">Fixed price.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[clamp(18px,1.8vw,22px)] leading-[1.5] font-light text-fg-2">
            You know the number before we start. If we misjudged the estimate, that is our cost, not
            yours.
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
            What&apos;s in <span className="em">each package.</span>
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-[50ch] text-[18px] leading-[1.55] font-light text-fg-2">
            Everything below is included in the fixed price. Anything not listed we quote separately
            before it starts — no surprises at the invoice.
          </Reveal>

          <Reveal className="mt-14">
            <PricingTable />
          </Reveal>

          <Reveal as="p" className="mt-8 max-w-[60ch] text-[15px] leading-[1.6] font-light text-fg-3">
            Ranges reflect scope, not quality — the build standard is the same in all three. Every
            package includes weekly demos on a live link, so you see the work while it is still cheap
            to change.
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="Not sure which one fits?"
        sub="Thirty free minutes. Tell us what you're building and we'll say which package it is — or that you don't need us."
        button="Get a recommendation"
        source={`${SOURCE}: cta`}
      />

      <Footer source={`${SOURCE}: footer`} />
    </>
  )
}
