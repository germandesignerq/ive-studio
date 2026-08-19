import { useState } from 'react'
import { Link } from '@/i18n/Link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { CtaSection } from '@/components/CtaSection'
import { ArrowRight } from '@/components/icons'
import { PostVisual } from '@/data/post-covers'
import { featuredPost, postFilters, posts, type Post, type PostFilter } from '@/data/posts'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { useLanguage } from '@/i18n/LanguageContext'

const SOURCE = 'blog'

export function Blog() {
  const heroRef = useFollowGlow<HTMLElement>(50, 44)
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | PostFilter>('all')

  /* Карточки не размонтируются при фильтрации, а скрываются: иначе они
     пересоздаются с opacity 0 и ждут наблюдателя появления — выглядит так,
     будто фильтр стёр список. */
  const isHidden = (p: Post) => filter !== 'all' && p.category !== filter
  const shownCount = posts.filter((p) => !isHidden(p)).length

  return (
    <>
      <Nav source={SOURCE} />

      {/* ── FEATURED ── страница начинается сразу с главного материала.
          Его заголовок работает как h1 всей страницы. */}
      <section
        ref={heroRef}
        className="glow relative overflow-hidden pt-[150px] max-[680px]:pt-[120px]"
      >
        <div className="wrap relative z-[2]">
        <Reveal className="group relative grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] overflow-hidden rounded-lg-x border border-line bg-[linear-gradient(180deg,var(--color-card-hi),var(--color-card))] transition-colors duration-[350ms] hover:border-[rgba(233,201,127,.3)] max-[1000px]:grid-cols-1">
          <Link to={`/blog/${featuredPost.slug}`} className="card-link contents">
            <div className="relative min-h-[340px] overflow-hidden bg-[#0D0D10] max-[1000px]:min-h-[220px]">
              <PostVisual
                post={featuredPost}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-[44px_46px_46px] max-[1000px]:p-[32px_30px_34px]">
              <div className="mb-[22px] flex items-center gap-[14px]">
                <span className="rounded-full border border-[rgba(233,201,127,.3)] bg-[rgba(233,201,127,.07)] px-[14px] py-[5px] font-label text-[16px] tracking-[.1em] uppercase text-gold-soft">
                  {featuredPost.categoryLabel}
                </span>
                <span className="font-label text-[16px] text-fg-2">
                  {featuredPost.date} · {featuredPost.read}
                </span>
              </div>
              <h1 className="max-w-[18ch] text-[clamp(28px,3.2vw,40px)] tracking-[-.04em]">
                {featuredPost.title}
              </h1>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.55] font-light text-fg-2">
                {featuredPost.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-[10px] text-[15.5px] font-medium text-gold">
                {t.blog.readPost}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="wrap">
        <div className="filters mt-[70px] flex flex-wrap gap-2">
          {postFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={filter === f.key ? 'on' : ''}
              onClick={() => setFilter(f.key)}
            >
              {t.blog[f.label]}
            </button>
          ))}
        </div>

        <div className="mt-8 border-t border-line">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60} className={isHidden(p) ? 'hidden' : ''}>
              <Link
                to={`/blog/${p.slug}`}
                className="card-link group relative grid grid-cols-[180px_170px_minmax(0,1fr)_auto] items-start gap-[30px] border-b border-line py-[34px] transition-[padding-left] duration-[420ms] ease-[var(--ease)] hover:pl-3 max-[1000px]:grid-cols-[120px_minmax(0,1fr)_auto] max-[1000px]:gap-[22px] max-[680px]:grid-cols-[minmax(0,1fr)_auto]"
              >
                <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-gold opacity-0 transition-opacity duration-[420ms] ease-[var(--ease)] group-hover:opacity-80" />
                <div className="pt-[7px] font-label text-[16px] leading-[1.9] text-fg-2 max-[1000px]:col-span-full max-[1000px]:flex max-[1000px]:items-baseline max-[1000px]:gap-[14px] max-[1000px]:pt-0">
                  <b className="block text-[11px] font-medium tracking-[.1em] uppercase text-gold max-[1000px]:inline">
                    {p.categoryLabel}
                  </b>
                  {p.date} · {p.read}
                </div>
                <div className="relative aspect-16/10 overflow-hidden rounded-md-x border border-line bg-[#0D0D10] max-[680px]:hidden">
                  <PostVisual
                    post={p}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="max-w-[26ch] text-[25px] font-medium tracking-[-.03em] transition-colors duration-[420ms] ease-[var(--ease)] group-hover:text-gold-soft max-[680px]:text-[22px]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.55] font-light text-fg-2">
                    {p.excerpt}
                  </p>
                </div>
                <span className="arrow mt-1 h-10 w-10 text-fg-3 group-hover:border-gold group-hover:bg-gold group-hover:text-[#0B0B0C]">
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}

          {shownCount === 0 && (
            <p className="py-[60px] text-[17px] font-light text-fg-3">
              {t.blog.empty}
            </p>
          )}
        </div>
      </section>

      <div className="mt-[90px]">
        <CtaSection
          title={t.blog.ctaTitle}
          sub={t.blog.ctaSub}
          button={t.blog.ctaButton}
          source={`${SOURCE}: cta`}
        />
      </div>

      <Footer source={`${SOURCE}: footer`} />
    </>
  )
}
