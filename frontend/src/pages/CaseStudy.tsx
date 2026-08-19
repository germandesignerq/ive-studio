import { useParams } from 'react-router'
import { Link } from '@/i18n/Link'
import { Nav } from '@/components/Nav'
import { FooterSlim } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { Counter } from '@/components/Counter'
import { CtaSection } from '@/components/CtaSection'
import { ArrowRight } from '@/components/icons'
import { works } from '@/data/works'
import { useLanguage } from '@/i18n/LanguageContext'

export function CaseStudy() {
  const { slug } = useParams()
  const work = works.find((w) => w.slug === slug) ?? works[5]
  const next = works[(works.indexOf(work) + 1) % works.length]
  const { t } = useLanguage()

  return (
    <>
      <Nav source={`case: ${work.slug}`} back={{ label: t.caseStudy.allWork, to: '/#work' }} />

      {/* ── 1. НАЗВАНИЕ ── */}
      <header className="pt-[150px] max-[680px]:pt-[120px]">
        <div className="wrap">
          <span className="eyebrow mb-[22px] block">{work.tags}</span>
          <h1 className="text-[clamp(52px,9vw,116px)] leading-[.94] tracking-[-.05em]">
            {work.name}
          </h1>
          <p className="mt-[26px] max-w-[24ch] text-[clamp(20px,2.3vw,30px)] leading-[1.3] font-light tracking-[-.02em] text-fg-2 max-[680px]:max-w-none">
            {work.result}
          </p>

          <dl className="mt-[58px] mb-[46px] grid grid-cols-4 gap-6 border-t border-line pt-7 max-[1000px]:grid-cols-2 max-[1000px]:gap-7">
            {meta.map((m) => (
              <div key={m.term}>
                <dt className="font-label text-[14.5px] tracking-[.18em] uppercase text-fg-2">
                  {m.term}
                </dt>
                <dd className="mt-[10px] text-[16.5px] leading-[1.4] text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ── 2. ГЛАВНОЕ ФОТО ── */}
      <Reveal className="wrap mt-[10px]">
        {work.img ? (
          <img
            className="block h-auto w-full rounded-lg-x border border-line"
            src={work.img}
            alt={`${work.name} — ${work.tags}`}
            width={1600}
            height={1000}
            fetchPriority="high"
          />
        ) : (
          <div className="ph aspect-video">
            <Placeholder title="Cover" size="2400 × 1350 · jpg" />
          </div>
        )}
        <p className="mt-4 text-[14.5px] font-light text-fg-3">
          Новый онбординг: пять шагов вместо восьми.
        </p>
      </Reveal>

      {/* ── 3. ОПИСАНИЕ ── */}
      <section className="py-[120px] max-[680px]:py-20">
        <div className="wrap narrow">
          <Reveal as="span" className="eyebrow">
            The challenge
          </Reveal>
          <Reveal as="h2" className="mt-[18px] max-w-[20ch] text-[clamp(30px,4vw,48px)] tracking-[-.04em] max-[680px]:max-w-none">
            People opened an account and quietly disappeared.
          </Reveal>
          <Reveal className="mt-[26px] [&_p]:max-w-[66ch] [&_p]:text-[18.5px] [&_p]:leading-[1.62] [&_p]:font-light [&_p]:text-fg-2 [&_p+p]:mt-[22px] [&_b]:font-medium [&_b]:text-fg">
            <p className="max-w-[60ch] text-[22px] leading-[1.5] font-normal text-fg">
              Sphere had traffic, a sales team and a product people liked. What it didn&apos;t have
              was people finishing the signup.
            </p>
            <p>
              Analytics showed the shape of the problem but not the reason:{' '}
              <b>a third of applicants stopped on the document upload step</b> and never came back.
              Support blamed the bank&apos;s compliance rules. Compliance blamed the interface.
              Nobody had watched a real person try it.
            </p>
            <p>
              We recorded eleven sessions in the first two weeks. Every single person hesitated at
              the same sentence — a legal phrase asking for a document most small business owners
              don&apos;t keep on their desk. They left to find it, and the session expired while they
              looked.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 4. ЦИФРЫ ── */}
      <Reveal className="wrap">
        <div className="grid grid-cols-3 gap-6 border-y border-line py-[46px] max-[1000px]:grid-cols-1 max-[1000px]:gap-[34px] max-[1000px]:py-[38px]">
          {numbers.map((n, i) => (
            <div key={n.label} className="[&_b]:text-[clamp(40px,5.4vw,68px)]">
              <Counter value={n.value} delay={(i % 3) * 120} />
              <span className="mt-[14px] block max-w-[24ch] text-[15.5px] font-light text-fg-2">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 5. КАК ДЕЛАЛИ ── */}
      <section className="py-20 max-[680px]:py-[60px]">
        <div className="wrap">
          {chapters.map((c) => (
            <Reveal
              key={c.no}
              className="group glow-top grid grid-cols-[180px_1fr] gap-11 border-t border-line py-14 max-[1000px]:grid-cols-1 max-[1000px]:gap-[18px] max-[1000px]:py-11"
            >
              <div className="font-label text-[15.5px] tracking-[.2em] text-gold transition-colors duration-[350ms] group-hover:text-gold-soft">
                {c.no}
              </div>
              <div>
                <h3 className="mb-4 text-[27px] font-medium tracking-[-.03em]">{c.title}</h3>
                <p className="max-w-[60ch] text-[17px] leading-[1.6] font-light text-fg-2">
                  {c.text}
                </p>
                <div className="mt-8">
                  {c.layout === 'pair' ? (
                    <div className="grid grid-cols-2 gap-6 max-[680px]:grid-cols-1">
                      {c.media.map((m) => (
                        <div key={m.title} className={`ph ${m.ratio}`}>
                          <Placeholder title={m.title} size={m.size} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {c.media.map((m) => (
                        <div key={m.title} className={`ph ${m.ratio}`}>
                          <Placeholder title={m.title} size={m.size} />
                        </div>
                      ))}
                      {c.caption && (
                        <p className="text-[14.5px] font-light text-fg-3">{c.caption}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. ОТЗЫВ КЛИЕНТА ── */}
      <section className="py-20 max-[680px]:py-[60px]">
        <Reveal className="wrap">
          <div className="rounded-lg-x border border-[rgba(233,201,127,.22)] bg-[linear-gradient(150deg,rgba(233,201,127,.08),transparent_55%),var(--color-card)] p-[48px_48px_42px] shadow-[0_0_90px_-34px_rgba(233,201,127,.26)] max-[1000px]:p-[34px_30px_30px]">
            <blockquote className="max-w-[22ch] text-[clamp(22px,2.8vw,34px)] leading-[1.34] tracking-[-.03em] before:text-gold before:content-['“'] after:text-gold after:content-['”']">
              They found the leak in our signup in week one. We&apos;d been guessing for six months.
            </blockquote>
            <div className="mt-[34px] flex items-center gap-[15px]">
              <div className="ava grid h-[52px] w-[52px] flex-none place-items-center rounded-full bg-[linear-gradient(140deg,#8DA9F0,#4b5f8c)] font-label text-[15px] font-semibold text-[#0B0B0C]">
                MS
              </div>
              <div>
                <b className="block text-[17px]">Mark Sullivan</b>
                <span className="block text-[14.5px] text-fg-3">Co-founder, Sphere</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 7. СЛЕДУЮЩИЙ ПРОЕКТ ── */}
      <div className="wrap">
        <div className="border-t border-line pt-[70px]">
          <Link
            to={`/work/${next.slug}`}
            className="card-link next-link group flex items-center justify-between gap-[30px] py-11 transition-[padding-left] duration-[420ms] ease-[var(--ease)]"
          >
            <div>
              <span className="eyebrow mb-4 block">{t.caseStudy.nextProject}</span>
              <h3 className="text-[clamp(34px,5vw,58px)] tracking-[-.045em]">{next.name}</h3>
            </div>
            <span className="arrow h-14 w-14">
              <ArrowRight size={19} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>

      <CtaSection
        title={t.caseStudy.ctaTitle}
        sub={t.caseStudy.ctaSub}
        button={t.caseStudy.ctaButton}
        source={`case: ${work.slug}`}
        silk
      />

      <FooterSlim>
        <Link to="/about">{t.nav.about}</Link> · <Link to="/blog">{t.nav.blog}</Link> ·{' '}
        <Link to="/privacy">{t.footer.privacy}</Link> · <Link to="/">{t.nav.home}</Link>
      </FooterSlim>
    </>
  )
}

function Placeholder({ title, size }: { title: string; size: string }) {
  return (
    <span className="px-5 text-center font-label text-[15px] leading-[1.9] tracking-[.2em] uppercase text-fg-2">
      <b className="block font-medium tracking-[.14em] text-gold">{title}</b>
      {size}
    </span>
  )
}

const meta = [
  { term: 'Client', value: 'Sphere, business banking' },
  { term: 'Year', value: '2025' },
  { term: 'Services', value: 'UX research, UI design, design system' },
  { term: 'Timeline', value: '12 weeks' },
]

const numbers = [
  { value: '−38%', label: 'drop-off on the first step' },
  { value: '4:20 → 1:50', label: 'average time to open an account' },
  { value: '12 weeks', label: 'from first interview to release' },
]

const chapters = [
  {
    no: '01 — Research',
    title: 'We watched people fail before we drew anything',
    text: 'Eleven moderated sessions, three support-call recordings and a read through every ticket mentioning "documents". The insight wasn\'t in the funnel — it was in the wording of one field.',
    layout: 'pair' as const,
    media: [
      { title: 'Research', size: '1200 × 900', ratio: 'aspect-4/3' },
      { title: 'Affinity map', size: '1200 × 900', ratio: 'aspect-4/3' },
    ],
  },
  {
    no: '02 — Design',
    title: 'Ask for the hard thing last',
    text: 'We reordered the flow so the account exists before the paperwork starts, and rewrote every label in the words business owners used in the interviews. Eight steps became five.',
    layout: 'stack' as const,
    media: [{ title: 'Before / after flow', size: '2400 × 1350', ratio: 'aspect-video' }],
    caption: 'Слева старый путь, справа новый — на три экрана короче.',
  },
  {
    no: '03 — Design system',
    title: 'So the next screen takes a day, not a sprint',
    text: "Forty components, real content states, and documentation the in-house team maintains without us. Two years later they're still shipping on it.",
    layout: 'pair' as const,
    media: [
      { title: 'Components', size: '1000 × 1250', ratio: 'aspect-4/5' },
      { title: 'Mobile screens', size: '1000 × 1250', ratio: 'aspect-4/5' },
    ],
  },
]
