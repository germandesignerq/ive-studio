import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { Counter } from '@/components/Counter'
import { CtaSection } from '@/components/CtaSection'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { useLanguage } from '@/i18n/LanguageContext'
import { Picture } from '@/components/Picture'

const SOURCE = 'about page'

export function About() {
  const heroRef = useFollowGlow<HTMLElement>(50, 44)
  const { t } = useLanguage()

  const numbers = [
    { value: '9', label: t.about.numberYears },
    { value: '140+', label: t.about.numberProjects },
    { value: '11', label: t.about.numberPeople },
    { value: '7', label: t.about.numberCountries },
  ]

  const values = [
    { title: t.about.value1Title, text: t.about.value1Text, icon: icons[0] },
    { title: t.about.value2Title, text: t.about.value2Text, icon: icons[1] },
    { title: t.about.value3Title, text: t.about.value3Text, icon: icons[2] },
  ]

  const team = [
    { ...people[0], role: t.about.roleDesigner, text: t.about.bioHerman },
    { ...people[1], role: t.about.roleDeveloper, text: t.about.bioAlexander },
  ]

  return (
    <>
      <Nav source={SOURCE} />

      <header
        ref={heroRef}
        className="glow relative overflow-hidden pt-[170px] pb-[90px] max-[680px]:pt-[130px] max-[680px]:pb-[70px]"
      >
        <div className="wrap relative z-[2]">
          <span className="eyebrow mb-[22px] block">{t.about.eyebrow}</span>
          <h1 className="max-w-[15ch] text-[clamp(44px,7.4vw,90px)] tracking-[-.05em] max-[680px]:max-w-none">
            {t.about.h1}
            <br />
            {t.about.h1b}
            <span className="em-u">{t.about.h1em}</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[clamp(18px,1.8vw,22px)] leading-[1.5] font-light text-fg-2">
            {t.about.lead}
          </p>
        </div>
      </header>

      {/* ── STORY ── */}
      <section className="py-20 max-[680px]:py-[60px]">
        <div className="wrap narrow">
          <Reveal className="mt-[26px] [&_p]:max-w-[66ch] [&_p]:text-[18.5px] [&_p]:leading-[1.62] [&_p]:font-light [&_p]:text-fg-2 [&_p+p]:mt-[22px] [&_b]:font-medium [&_b]:text-fg">
            <p>
              {t.about.story1a}
              <b>{t.about.story1b}</b>
              {t.about.story1c}
            </p>
            <p>{t.about.story2}</p>
            <p>{t.about.story3}</p>
          </Reveal>
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <section className="py-20 max-[680px]:py-[60px]">
        <Reveal className="wrap">
          <div className="grid grid-cols-4 gap-6 border-y border-line py-11 max-[1000px]:grid-cols-2 max-[1000px]:gap-x-6 max-[1000px]:gap-y-[34px]">
            {numbers.map((n, i) => (
              <div key={n.label} className="[&_b]:text-[clamp(34px,4.4vw,54px)]">
                <Counter value={n.value} delay={(i % 4) * 120} />
                <span className="mt-3 block max-w-[20ch] text-[15px] font-light text-fg-2">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="py-[110px] max-[680px]:py-[76px]">
        <div className="wrap">
          <Reveal as="span" className="eyebrow">
            {t.about.howEyebrow}
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-[18ch] text-[clamp(30px,4.2vw,52px)] tracking-[-.042em] max-[680px]:max-w-none">
            {t.about.howTitle}
            <br />
            {t.about.howTitle2}
            <span className="em">{t.about.howTitleEm}</span>
          </Reveal>
          <div className="mt-[52px] grid grid-cols-3 gap-[22px] max-[1000px]:grid-cols-1">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={(i % 3) * 70}
                className="val card glow-top p-[36px_32px_40px]"
              >
                <div className="ico mb-6 h-[50px] w-[50px] rounded-[14px]">{v.icon}</div>
                <h3 className="mb-3 text-[24px] font-medium tracking-[-.03em]">{v.title}</h3>
                <p className="max-w-[32ch] text-[16px] leading-[1.55] font-light text-fg-2">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-20 max-[680px]:py-[60px]">
        <div className="wrap">
          <Reveal as="span" className="eyebrow">
            {t.about.teamEyebrow}
          </Reveal>
          <Reveal as="h2" className="mt-4 max-w-[18ch] text-[clamp(30px,4.2vw,52px)] tracking-[-.042em] max-[680px]:max-w-none">
            {t.about.teamTitle}
            <br />
            {t.about.teamTitle2}
            <span className="em">{t.about.teamTitleEm}</span>
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-[50ch] text-[18px] leading-[1.55] font-light text-fg-2">
            {t.about.teamLead}
          </Reveal>

          <div className="mt-[52px] grid max-w-[720px] grid-cols-2 gap-6 max-[1000px]:max-w-[420px] max-[1000px]:grid-cols-1">
            {team.map((m, i) => (
              <Reveal key={m.name} as="article" delay={(i % 3) * 70} className="group relative min-w-0">
                <div className="relative h-0 w-full overflow-hidden rounded-lg-x border border-line bg-[#101013] pt-[100%] transition-[transform,border-color] duration-[450ms] ease-[var(--ease)] group-hover:-translate-y-1 group-hover:border-[rgba(233,201,127,.3)]">
                  <Picture
                    className="absolute top-0 left-0 block h-full w-full object-cover"
                    src={m.img}
                    alt={`${m.name} — ${m.role}, IVE studio`}
                    sizes="(min-width: 1000px) 350px, min(420px, 100vw)"
                  />
                </div>
                <h3 className="mt-[18px] text-[22px] font-medium tracking-[-.025em]">{m.name}</h3>
                <div className="mt-2 font-label text-[15px] tracking-[.18em] uppercase text-gold">
                  {m.role}
                </div>
                <p className="mt-3 max-w-[34ch] text-[15.5px] leading-[1.5] font-light text-fg-2">
                  {m.text}
                </p>
                <div className="mt-[14px] flex gap-[18px]">
                  {m.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-[14.5px] text-fg-3 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={t.about.ctaTitle}
        sub={t.about.ctaSub}
        button={t.about.ctaButton}
        source={`${SOURCE}: cta`}
      />

      <Footer source={`${SOURCE}: footer`} />
    </>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Иконки принципов — порядок совпадает с value1…value3 в словаре. */
const icons = [
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    <circle cx="12" cy="12" r="3.4" />
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
    <path d="M4 18.5L9.5 10l4 4.6 3-3.8 3.5 6" />
    <path d="M3.5 21h17" />
    <circle cx="17.5" cy="5.5" r="2.2" />
  </svg>,
]

/** Имена, фото и профили — единственное, что не переводится. */
const people = [
  {
    name: 'Herman Hubanov',
    img: '/herman.jpg',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/herman-hubanov/' },
      { label: 'Dribbble', url: 'https://dribbble.com/herman-hubanov' },
    ],
  },
  {
    name: 'Alexander Hubanov',
    img: '/alexander.jpg',
    // Профилей пока нет — впишите адреса, и ссылки появятся сами.
    links: [] as Array<{ label: string; url: string }>,
  },
]
