import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { WorkGrid } from '@/components/WorkGrid'
import { Testimonials } from '@/components/Testimonials'
import { Partners } from '@/components/Partners'
import { HeroVeil, SilkCanvas } from '@/components/SilkCanvas'
import { LeadForm } from '@/components/LeadForm'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useCallModal } from '@/context/CallModalContext'
import { useLanguage, useLocalized } from '@/i18n/LanguageContext'
import { Check } from '@/components/icons'

const SOURCE = 'home'

export function Home() {
  usePageMeta(
    'IVE — UX/UI design and web development studio',
    'We design and build websites that actually convert. UX/UI design and development for startups and growing businesses.',
  )
  const heroRef = useFollowGlow<HTMLElement>(50, 44)
  const { openCall } = useCallModal()
  const { t } = useLanguage()
  const pick = useLocalized()

  return (
    <>
      <Nav source={SOURCE} />

      {/* ── HERO ── */}
      <header
        ref={heroRef}
        id="top"
        className="glow relative overflow-hidden py-[190px] pb-[140px] max-[680px]:py-[130px] max-[680px]:pb-[90px]"
      >
        <SilkCanvas />
        <HeroVeil />
        <div className="wrap relative z-[2]">
          <h1 className="max-w-[13ch] text-[clamp(48px,8vw,104px)] tracking-[-.05em] max-[680px]:max-w-none">
            {t.home.heroLine1}
            <span className="em-u">{t.home.heroEm}</span>
          </h1>
          <p className="mt-[30px] max-w-[46ch] text-[clamp(18px,1.7vw,22px)] leading-[1.5] font-light text-fg-2">
            <b className="font-medium text-fg">{t.home.heroBoldSub}</b>
            {t.home.heroSub}
          </p>
          <div className="mt-10 flex flex-wrap gap-[14px]">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openCall({ source: `${SOURCE}: hero` })}
            >
              {t.common.startProject}
            </button>
            <a className="btn btn-ghost" href="#work">
              {t.common.seeProjects}
            </a>
          </div>
        </div>
      </header>

      {/* ── PROBLEM ── */}
      <Section tight>
        <Reveal as="span" className="eyebrow">
          {t.home.problemEyebrow}
        </Reveal>
        <Reveal as="h2" className="mt-4 max-w-[17ch] text-[clamp(32px,4.8vw,60px)] tracking-[-.042em] max-[680px]:max-w-none">
          {t.home.problemTitle1}<br />
          <span className="em">{t.home.problemTitleEm}</span>
        </Reveal>
        <Reveal className="mt-16 grid grid-cols-3 border-t border-line max-[1000px]:grid-cols-1">
          {problems.map((p, i) => (
            <div
              key={p.title.en}
              className={`group glow-top border-line p-[34px_36px_42px] max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:p-[28px_0_30px] max-[1000px]:last:border-b-0 ${
                i === 0 ? 'pl-0' : ''
              } ${i === problems.length - 1 ? 'border-r-0 pr-0' : 'border-r'}`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(233,201,127,.3)] bg-[rgba(233,201,127,.05)] text-gold transition-colors duration-[350ms] group-hover:border-[rgba(233,201,127,.55)] group-hover:text-gold-soft">
                {p.icon}
              </span>
              <h3 className="mt-[22px] mb-3 min-h-[2.1em] max-w-[18ch] text-[23px] font-medium tracking-[-.025em] max-[1000px]:min-h-0 max-[1000px]:max-w-none">
                {pick(p.title)}
              </h3>
              <p className="max-w-[28ch] text-[16px] leading-[1.5] font-light text-fg-2">{pick(p.text)}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── SERVICES ── */}
      <Section id="services">
        <Reveal as="span" className="eyebrow">
          {t.home.servicesEyebrow}
        </Reveal>
        <Reveal as="h2" className="mt-4 max-w-[17ch] text-[clamp(32px,4.8vw,60px)] tracking-[-.042em] max-[680px]:max-w-none">
          {t.home.servicesTitle1}
          <br />
          {t.home.servicesTitle2}<span className="em">{t.home.servicesTitleEm}</span>
        </Reveal>
        <div className="mt-[58px] grid grid-cols-2 gap-[22px] max-[680px]:grid-cols-1">
          {services.map((s, i) => (
            <Reveal
              key={s.title.en}
              delay={(i % 4) * 70}
              className="card glow-top p-[40px_40px_44px] max-[680px]:p-[30px_26px_34px]"
            >
              <div className="ico mb-[26px] h-[54px] w-[54px] rounded-[15px]">{s.icon}</div>
              <h3 className="mb-[14px] text-[28px] font-medium tracking-[-.03em]">{pick(s.title)}</h3>
              <p className="max-w-[34ch] text-[16.5px] leading-[1.5] font-light text-fg-2">
                {pick(s.text)}
              </p>
              <div className="mt-[22px] flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item.en}
                    className="rounded-full border border-line px-[14px] py-[5px] text-[13.5px] text-fg-3"
                  >
                    {pick(item)}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── PROCESS ── */}
      <Section tight id="process">
        <Reveal as="span" className="eyebrow">
          {t.home.processEyebrow}
        </Reveal>
        <Reveal as="h2" className="mt-4 text-[clamp(32px,4.8vw,60px)] tracking-[-.042em]">
          {t.home.processTitle}<span className="em">{t.home.processTitleEm}</span>
        </Reveal>
        <Reveal className="mt-[58px] grid grid-cols-4 border-t border-line max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
          {steps.map((s, i) => (
            <div
              key={s.no}
              className={`group glow-top flex flex-col border-r border-line p-[34px_32px_44px] max-[1000px]:border-b max-[1000px]:p-[30px_26px_34px] max-[680px]:border-r-0 max-[680px]:border-b max-[680px]:p-[28px_0_30px] max-[680px]:last:border-b-0 ${
                i === 0 ? 'pl-0' : ''
              } ${i === steps.length - 1 ? 'border-r-0 pr-0' : ''}`}
            >
              <div className="font-label text-[15.5px] tracking-[.18em] text-gold transition-colors group-hover:text-gold-soft">
                {s.no}
              </div>
              <h3 className="mt-4 mb-3 text-[22px] font-medium tracking-[-.025em]">{pick(s.title)}</h3>
              <p className="max-w-[24ch] flex-1 text-[15.5px] leading-[1.5] font-light text-fg-2">
                {pick(s.text)}
              </p>
              <div className="mt-5 font-label text-[17px] text-fg-2">{pick(s.when)}</div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ── PORTFOLIO ── */}
      <Section tight id="work">
        <Reveal className="flex flex-wrap items-end justify-between gap-[30px]">
          <div>
            <span className="eyebrow">{t.home.portfolioEyebrow}</span>
            <h2 className="mt-4 text-[clamp(32px,4.8vw,60px)] tracking-[-.042em]">
              {t.home.portfolioTitle}<span className="em">{t.home.portfolioTitleEm}</span>
            </h2>
          </div>
          <p className="mb-[6px] max-w-[48ch] text-[18px] leading-[1.5] font-light text-fg-2">
            {t.home.portfolioLead}
          </p>
        </Reveal>
        <WorkGrid />
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section tight id="reviews">
        <Reveal className="flex flex-wrap items-end justify-between gap-[30px]">
          <div>
            <span className="eyebrow">{t.home.reviewsEyebrow}</span>
            <h2 className="mt-4 text-[clamp(32px,4.8vw,60px)] tracking-[-.042em]">
              {t.home.reviewsTitle}<span className="em">{t.home.reviewsTitleEm}</span>
            </h2>
          </div>
          <p className="mb-[6px] max-w-[48ch] text-[18px] leading-[1.5] font-light text-fg-2">
            {t.home.reviewsLead}
          </p>
        </Reveal>

        <Reveal>
          <Testimonials />
        </Reveal>

      </Section>

      {/* ── PARTNERS ── */}
      <Section tight>
        <Partners />
      </Section>

      {/* ── RESULTS ── */}
      <Section>
        <Reveal as="span" className="eyebrow">
          {t.home.resultsEyebrow}
        </Reveal>
        <Reveal as="h2" className="mt-4 max-w-[17ch] text-[clamp(32px,4.8vw,60px)] tracking-[-.042em] max-[680px]:max-w-none">
          {t.home.resultsTitle1}
          <br />
          <span className="em">{t.home.resultsTitleEm}</span>
        </Reveal>
        <div className="mt-[58px] grid grid-cols-3 gap-[22px] max-[1000px]:grid-cols-1">
          {results.map((r, i) => (
            <Reveal
              key={r.title.en}
              delay={(i % 4) * 70}
              style={{ '--draw-delay': `${(i % 4) * 70}ms` } as React.CSSProperties}
              className="group glow-top rounded-lg-x border border-[rgba(233,201,127,.2)] bg-[linear-gradient(180deg,rgba(233,201,127,.06),transparent_60%)] p-[38px_34px_40px] transition-[transform,border-color] duration-[350ms] hover:-translate-y-1 hover:border-[rgba(233,201,127,.42)]"
            >
              <h3 className="mb-3 flex items-center gap-[13px] text-[26px] font-medium tracking-[-.03em]">
                <span className="draw flex-none text-gold transition-colors duration-[350ms] group-hover:text-gold-soft">
                  {r.icon}
                </span>
                {pick(r.title)}
              </h3>
              <p className="max-w-[28ch] text-[16px] leading-[1.5] font-light text-fg-2">{pick(r.text)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── WHY US ── */}
      <Section tight>
        <Reveal as="span" className="eyebrow">
          {t.home.whyEyebrow}
        </Reveal>
        <Reveal as="h2" className="mt-4 text-[clamp(32px,4.8vw,60px)] tracking-[-.042em]">
          {t.home.whyTitle}<span className="em">{t.home.whyTitleEm}</span>
        </Reveal>
        <Reveal as="ul" className="mt-[52px] grid grid-cols-2 gap-x-[60px] max-[1000px]:grid-cols-1">
          {why.map((w) => (
            <li key={w.k} className="group glow-top flex items-start gap-5 border-t border-line py-7">
              <span className="flex-none pt-[6px] font-label text-[15.5px] text-gold transition-colors duration-[350ms] group-hover:text-gold-soft">
                {w.k}
              </span>
              <div>
                <h3 className="text-[21px] font-medium tracking-[-.02em]">{pick(w.title)}</h3>
                <p className="mt-2 max-w-[32ch] text-[15.5px] leading-[1.5] font-light text-fg-2">
                  {pick(w.text)}
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* ── FINAL CTA + FORM ── */}
      <ClosingSection />

      <Footer source={`${SOURCE}: footer`} />
    </>
  )
}

function ClosingSection() {
  const ref = useFollowGlow<HTMLElement>(50, 50)
  const { t } = useLanguage()
  const pick = useLocalized()

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-[160px] pb-[170px] max-[680px]:py-[92px]"
    >
      <SilkCanvas />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 30% 40%,transparent 20%,rgba(10,10,11,.55) 70%,#0A0A0B 100%)',
        }}
      />
      <div className="wrap relative z-[2] grid grid-cols-2 items-start gap-[70px] max-[1000px]:grid-cols-1 max-[1000px]:gap-12">
        <div>
          <h2 className="max-w-[12ch] text-[clamp(38px,5.4vw,68px)] tracking-[-.042em]">
            {t.home.ctaTitle}<span className="em-u">{t.home.ctaTitleEm}</span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.5] font-light text-fg-2">
            {t.home.ctaLead}
          </p>
          <ul className="mt-[42px] grid gap-4">
            {assurances.map((a) => (
              <li key={a.en} className="flex items-start gap-[13px] text-[16.5px] font-light text-fg-2">
                <Check className="mt-[5px] flex-none text-gold" />
                <span>{pick(a)}</span>
              </li>
            ))}
          </ul>
          <a
            className="mt-[38px] inline-block border-b border-[rgba(233,201,127,.4)] pb-1 text-[20px] font-medium tracking-[-.02em] transition-colors hover:border-gold hover:text-gold"
            href="mailto:ivedesign93@gmail.com"
          >
            ivedesign93@gmail.com
          </a>
        </div>

        <LeadForm source={`${SOURCE}: contact form`} />
      </div>
    </section>
  )
}

function Section({
  children,
  id,
  tight,
}: {
  children: React.ReactNode
  id?: string
  tight?: boolean
}) {
  return (
    <section
      id={id}
      className={
        tight
          ? 'py-[110px] max-[680px]:py-[76px]'
          : 'py-[150px] max-[680px]:py-[92px]'
      }
      style={id ? { scrollMarginTop: '90px' } : undefined}
    >
      <div className="wrap">{children}</div>
    </section>
  )
}

/* ── контент секций ── */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const problems = [
  {
    title: {
      en: 'Poor UX kills conversions',
      de: 'Schlechte UX killt Conversions',
      fr: 'Une mauvaise UX tue les conversions',
    },
    text: {
      en: 'Traffic arrives. Nobody signs up. The funnel leaks where nobody’s looking.',
      de: 'Traffic kommt, niemand registriert sich. Der Trichter leckt genau dort, wo niemand hinschaut.',
      fr: 'Le trafic arrive. Personne ne s’inscrit. L’entonnoir fuit là où personne ne regarde.',
    },
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" {...stroke}>
        <path d="M3.4 4.6h17.2l-6.6 7.7v5.9l-4 2.4v-8.3z" />
        <path
          d="M19.2 15.4c1.1 1.5 1.7 2.4 1.7 3.1a1.7 1.7 0 1 1-3.4 0c0-.7.6-1.6 1.7-3.1z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    title: {
      en: 'Delivery drags for months',
      de: 'Die Lieferung zieht sich über Monate',
      fr: 'La livraison traîne pendant des mois',
    },
    text: {
      en: 'Your launch window closes while the site is still in review.',
      de: 'Ihr Launch-Fenster schließt sich, während die Website noch in der Abstimmung ist.',
      fr: 'Votre fenêtre de lancement se referme pendant que le site est encore en relecture.',
    },
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" {...stroke}>
        <path d="M6.5 3h11M6.5 21h11" />
        <path d="M8 3v3c0 2 1.5 3.5 3 4.4.8.5.8 1.2 0 1.7-1.5.9-3 2.4-3 4.4v3.5" />
        <path d="M16 3v3c0 2-1.5 3.5-3 4.4-.8.5-.8 1.2 0 1.7 1.5.9 3 2.4 3 4.4v3.5" />
      </svg>
    ),
  },
  {
    title: {
      en: "Design and dev don't talk",
      de: 'Design und Entwicklung reden nicht miteinander',
      fr: 'Le design et le développement ne se parlent pas',
    },
    text: {
      en: 'Two vendors, one blame game. The build never matches the mockup.',
      de: 'Zwei Anbieter, ein Schwarzer-Peter-Spiel. Das Ergebnis entspricht nie dem Mockup.',
      fr: 'Deux prestataires, un jeu de blâme. Le résultat ne correspond jamais à la maquette.',
    },
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" {...stroke}>
        <path d="M10 14.6l-2.1 2.1a3.6 3.6 0 0 1-5.1-5.1l2.1-2.1" />
        <path d="M14 9.4l2.1-2.1a3.6 3.6 0 0 1 5.1 5.1l-2.1 2.1" />
        <path d="M9.2 14.8l5.6-5.6" strokeDasharray="2.2 3" />
      </svg>
    ),
  },
]

const services = [
  {
    title: { en: 'UX/UI Design', de: 'UX/UI-Design', fr: 'Design UX/UI' },
    text: {
      en: 'Interfaces built around one path: the one that ends in a signup.',
      de: 'Interfaces, die auf einen einzigen Weg ausgerichtet sind: den, der zur Anmeldung führt.',
      fr: 'Des interfaces construites autour d’un seul parcours : celui qui se termine par une inscription.',
    },
    items: [
      { en: 'Research', de: 'Research', fr: 'Recherche' },
      { en: 'Flows', de: 'Flows', fr: 'Parcours' },
      { en: 'UI', de: 'UI', fr: 'UI' },
      { en: 'Design system', de: 'Design system', fr: 'Système de design' },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18" />
        <path d="M9 9v12" />
        <path d="M14.5 14l4.5 4.5-2 .6-.6 2z" />
      </svg>
    ),
  },
  {
    title: { en: 'Web Development', de: 'Webentwicklung', fr: 'Développement web' },
    text: {
      en: 'Fast, accessible, SEO-ready builds. Pixel-perfect, no excuses.',
      de: 'Schnelle, barrierefreie und SEO-optimierte Umsetzung. Pixelgenau, ohne Ausreden.',
      fr: 'Des réalisations rapides, accessibles et prêtes pour le SEO. Au pixel près, sans excuses.',
    },
    items: [
      { en: 'React', de: 'React', fr: 'React' },
      { en: 'Vite', de: 'Vite', fr: 'Vite' },
      { en: 'CMS', de: 'CMS', fr: 'CMS' },
      { en: 'Analytics', de: 'Analyse', fr: 'Analytique' },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
        <path d="M8.5 7.5L3.5 12l5 4.5" />
        <path d="M15.5 7.5L20.5 12l-5 4.5" />
        <path d="M13.5 4.5l-3 15" />
      </svg>
    ),
  },
  {
    title: { en: 'SaaS & MVP', de: 'SaaS & MVP', fr: 'SaaS & MVP' },
    text: {
      en: 'From idea to a product real users can pay for — in weeks, not quarters.',
      de: 'Von der Idee zu einem Produkt, für das echte Nutzer bezahlen — in Wochen, nicht Quartalen.',
      fr: 'De l’idée à un produit que de vrais utilisateurs paient — en semaines, pas en trimestres.',
    },
    items: [
      { en: 'Onboarding', de: 'Onboarding', fr: 'Onboarding' },
      { en: 'Dashboards', de: 'Dashboards', fr: 'Tableaux de bord' },
      { en: 'Design system', de: 'Design system', fr: 'Système de design' },
      { en: 'Handoff', de: 'Übergabe', fr: 'Transmission' },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
        <path d="M12 3l8.5 4.8-8.5 4.8L3.5 7.8z" />
        <path d="M3.5 12.2L12 17l8.5-4.8" />
        <path d="M3.5 16.4L12 21.2l8.5-4.8" />
      </svg>
    ),
  },
  {
    title: { en: 'Landing Pages', de: 'Landingpages', fr: 'Landing pages' },
    text: {
      en: 'One page, one job. Built to be tested, not admired.',
      de: 'Eine Seite, eine Aufgabe. Gebaut, um getestet zu werden — nicht um bewundert zu werden.',
      fr: 'Une page, un objectif. Conçue pour être testée, pas admirée.',
    },
    items: [
      { en: 'Copy structure', de: 'Textstruktur', fr: 'Structure de contenu' },
      { en: 'A/B ready', de: 'A/B-bereit', fr: 'Prêt pour l’A/B' },
      { en: 'Speed', de: 'Geschwindigkeit', fr: 'Vitesse' },
      { en: 'Tracking', de: 'Tracking', fr: 'Suivi' },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
        <rect x="4" y="2.5" width="16" height="19" rx="3" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <rect x="8" y="15" width="6.5" height="3.2" rx="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const steps = [
  {
    no: '01',
    title: { en: 'Discovery & Strategy', de: 'Discovery & Strategie', fr: 'Découverte et stratégie' },
    text: {
      en: 'Your goals, your numbers, your users. One clear target before anyone opens Figma.',
      de: 'Ihre Ziele, Ihre Zahlen, Ihre Nutzer. Ein klares Ziel, bevor jemand Figma öffnet.',
      fr: 'Vos objectifs, vos chiffres, vos utilisateurs. Un objectif clair avant même d’ouvrir Figma.',
    },
    when: { en: 'Week 1', de: 'Woche 1', fr: 'Semaine 1' },
  },
  {
    no: '02',
    title: { en: 'UX & Design', de: 'UX & Design', fr: 'UX & Design' },
    text: {
      en: 'Flows first, pixels second. You see real screens, not moodboards.',
      de: 'Erst die Abläufe, dann die Pixel. Sie sehen echte Screens, keine Moodboards.',
      fr: 'D’abord les parcours, ensuite les pixels. Vous voyez de vrais écrans, pas des moodboards.',
    },
    when: { en: 'Weeks 2–4', de: 'Wochen 2–4', fr: 'Semaines 2–4' },
  },
  {
    no: '03',
    title: { en: 'Development', de: 'Entwicklung', fr: 'Développement' },
    text: {
      en: 'Same team, same standards. Weekly demos on a live link.',
      de: 'Gleiches Team, gleiche Standards. Wöchentliche Demos auf einem Live-Link.',
      fr: 'Même équipe, mêmes standards. Démos hebdomadaires sur un lien live.',
    },
    when: { en: 'Weeks 4–8', de: 'Wochen 4–8', fr: 'Semaines 4–8' },
  },
  {
    no: '04',
    title: { en: 'Launch', de: 'Launch', fr: 'Lancement' },
    text: {
      en: 'Ship, measure, fix. We stay a month after go-live.',
      de: 'Live schalten, messen, optimieren. Wir bleiben noch einen Monat nach dem Launch an Bord.',
      fr: 'On lance, on mesure, on corrige. Nous restons un mois après la mise en ligne.',
    },
    when: { en: 'Week 9', de: 'Woche 9', fr: 'Semaine 9' },
  },
]

const results = [
  {
    title: { en: 'Better UX', de: 'Bessere UX', fr: 'Meilleure UX' },
    text: {
      en: 'Fewer steps, clearer copy, no dead ends. Users get where they were going.',
      de: 'Weniger Schritte, klarere Texte, keine Sackgassen. Nutzer kommen dort an, wo sie hinwollten.',
      fr: 'Moins d’étapes, des textes plus clairs, aucune impasse. Les utilisateurs arrivent là où ils voulaient aller.',
    },
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" {...stroke} strokeWidth={1.7}>
        <path pathLength={1} d="M3 12h4l2.5-6 4 13 2.5-7h5" />
      </svg>
    ),
  },
  {
    title: { en: 'Higher conversions', de: 'Höhere Conversions', fr: 'Conversions plus élevées' },
    text: {
      en: 'Every screen has one job. We measure it, then we improve it.',
      de: 'Jeder Screen hat eine Aufgabe. Wir messen sie und verbessern sie dann.',
      fr: 'Chaque écran a un seul objectif. Nous le mesurons, puis nous l’améliorons.',
    },
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" {...stroke} strokeWidth={1.7}>
        <path pathLength={1} d="M4 18L11 11l3.5 3.5L21 7" />
        <path pathLength={1} d="M15.5 7H21v5.5" />
      </svg>
    ),
  },
  {
    title: { en: 'Faster launch', de: 'Schnellerer Launch', fr: 'Lancement plus rapide' },
    text: {
      en: 'Weeks to live, not quarters. You start learning from real users sooner.',
      de: 'Wochen bis live, nicht Quartale. Sie lernen früher von echten Nutzern.',
      fr: 'Des semaines jusqu’à la mise en ligne, pas des trimestres. Vous apprenez plus tôt de vrais utilisateurs.',
    },
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" {...stroke} strokeWidth={1.7}>
        <path pathLength={1} d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" />
      </svg>
    ),
  },
]

const why = [
  {
    k: '01',
    title: {
      en: 'Small team, direct communication',
      de: 'Kleines Team, direkte Kommunikation',
      fr: 'Petite équipe, communication directe',
    },
    text: {
      en: 'You talk to the people building it. No account managers in between.',
      de: 'Sie sprechen mit den Menschen, die es bauen. Keine Account-Manager dazwischen.',
      fr: 'Vous parlez directement à ceux qui le construisent. Pas de chargés de compte entre vous et nous.',
    },
  },
  {
    k: '02',
    title: {
      en: 'Design and development in one place',
      de: 'Design und Entwicklung an einem Ort',
      fr: 'Design et développement au même endroit',
    },
    text: {
      en: 'One team, one timeline, one invoice. Nothing gets lost in handoff.',
      de: 'Ein Team, ein Zeitplan, eine Rechnung. Bei der Übergabe geht nichts verloren.',
      fr: 'Une équipe, un planning, une facture. Rien ne se perd lors de la transmission.',
    },
  },
  {
    k: '03',
    title: { en: 'Fast delivery', de: 'Schnelle Lieferung', fr: 'Livraison rapide' },
    text: {
      en: 'Fixed scope, weekly demos, dates we actually hit.',
      de: 'Fester Umfang, wöchentliche Demos, Termine, die wir wirklich einhalten.',
      fr: 'Périmètre fixe, démos hebdomadaires, des délais que nous respectons vraiment.',
    },
  },
  {
    k: '04',
    title: { en: 'SaaS experience', de: 'SaaS-Erfahrung', fr: 'Expérience SaaS' },
    text: {
      en: "Onboarding, pricing pages, dashboards. We've shipped them before.",
      de: 'Onboarding, Preisseiten, Dashboards. Das haben wir schon gebaut.',
      fr: 'Onboarding, pages de tarifs, tableaux de bord. Nous l’avons déjà fait.',
    },
  },
]

const assurances = [
  {
    en: '30 minutes, no pitch deck — we talk about your project.',
    de: '30 Minuten, keine Präsentation — wir sprechen über Ihr Projekt.',
    fr: '30 minutes, sans présentation commerciale — on parle de votre projet.',
  },
  {
    en: 'You leave with a scope, a timeline and a number.',
    de: 'Sie gehen mit einem Leistungsumfang, einem Zeitplan und einer Zahl.',
    fr: 'Vous repartez avec un périmètre, un planning et un chiffre.',
  },
  {
    en: 'We reply within 24 hours, always a human.',
    de: 'Wir antworten innerhalb von 24 Stunden, immer ein Mensch.',
    fr: 'Nous répondons sous 24 heures, toujours par un humain.',
  },
]
