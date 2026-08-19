import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from '@/i18n/Link'
import { Nav } from '@/components/Nav'
import { FooterSlim } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { PostBody } from '@/components/PostBody'
import { PostFunnel } from '@/components/PostFunnel'
import { ShareRow } from '@/components/ShareRow'
import { ArrowRight } from '@/components/icons'
import { PostVisual } from '@/data/post-covers'
import { allPosts, featuredPost } from '@/data/posts'
import { useLanguage } from '@/i18n/LanguageContext'

export function Post() {
  const { slug } = useParams()
  const post = allPosts.find((p) => p.slug === slug) ?? featuredPost
  const next = allPosts[(allPosts.indexOf(post) + 1) % allPosts.length]
  const { t } = useLanguage()

  const articleRef = useRef<HTMLElement>(null)
  const progress = useReadingProgress(articleRef)

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[70] h-[2px] bg-gold transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      <Nav source={`post: ${post.slug}`} back={{ label: t.blog.allPosts, to: '/blog' }} />

      {/* ── HEAD ── */}
      <header className="pt-[140px] max-[680px]:pt-[118px]">
        <div className="doc">
          <div className="mb-6 flex flex-wrap items-center gap-[14px]">
            <span className="rounded-full border border-[rgba(233,201,127,.3)] bg-[rgba(233,201,127,.07)] px-[14px] py-[5px] font-label text-[16px] tracking-[.1em] uppercase text-gold-soft">
              {post.categoryLabel}
            </span>
            <span className="font-label text-[16px] text-fg-2">
              {post.date} · {post.read} {t.blog.read}
            </span>
          </div>

          <h1 className="max-w-[20ch] text-[clamp(34px,5.4vw,60px)] tracking-[-.045em] max-[680px]:max-w-none">
            {post.title}
          </h1>
          <p className="mt-[26px] max-w-[44ch] text-[clamp(19px,2vw,23px)] leading-[1.45] font-light text-fg-2">
            {post.excerpt}
          </p>

          <div className="mt-10 flex items-center gap-[14px] border-t border-line pt-7">
            <img
              className="ava h-12 w-12 rounded-full object-cover"
              src="/herman.jpg"
              alt="Herman Hubanov"
              width={800}
              height={800}
            />
            <div>
              <b className="block text-[16px] font-semibold">Herman Hubanov</b>
              <span className="block text-[14px] text-fg-3">Founder · Designer</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── COVER ── */}
      <Reveal className="wrap mt-[46px]">
        <div className="relative aspect-16/7 overflow-hidden rounded-lg-x border border-line bg-[#0D0D10]">
          <PostVisual post={post} loading="eager" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <p className="mt-[14px] text-center text-[14px] font-light text-fg-3">
          {post.coverCaption}
        </p>
      </Reveal>

      {/* ── ARTICLE ── текст берётся из src/data/posts.ts */}
      <article ref={articleRef} className="doc prose pt-[70px] max-[680px]:pt-[50px]">
        <PostBody blocks={post.body} />

        <ShareRow path={`/blog/${post.slug}`} title={post.title} />
      </article>

      <PostFunnel source={`post funnel: ${post.slug}`} />

      {/* ── NEXT ── */}
      <div className="wrap">
        <div className="mt-[90px] border-t border-line">
          <Link
            to={`/blog/${next.slug}`}
            className="card-link next-link group flex items-center justify-between gap-[30px] py-11 transition-[padding-left] duration-[420ms] ease-[var(--ease)]"
          >
            <div>
              <span className="eyebrow mb-[14px] block">{t.blog.nextPost}</span>
              <h3 className="max-w-[20ch] text-[clamp(26px,3.4vw,40px)] tracking-[-.04em]">
                {next.title}
              </h3>
            </div>
            <span className="arrow h-[52px] w-[52px]">
              <ArrowRight size={18} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>

      <FooterSlim>
        <Link to="/blog">{t.blog.allPosts}</Link> · <Link to="/">{t.nav.home}</Link>
      </FooterSlim>
    </>
  )
}

/** Полоса прогресса чтения: доля прокрученной статьи. */
function useReadingProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const start = el.offsetTop
      const len = el.offsetHeight - innerHeight * 0.4
      const p = Math.min(Math.max((scrollY - start + innerHeight * 0.6) / len, 0), 1)
      setProgress(p * 100)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [ref])

  return progress
}
