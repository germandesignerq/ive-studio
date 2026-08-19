import { Link } from '@/i18n/Link'
import { Nav } from '@/components/Nav'
import { FooterSlim } from '@/components/Footer'
import { useLanguage } from '@/i18n/LanguageContext'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <>
      <Nav source="404" />
      <main className="wrap flex min-h-[70vh] flex-col justify-center pt-[150px] pb-[90px]">
        <span className="eyebrow mb-[22px] block">{t.notFound.eyebrow}</span>
        <h1 className="max-w-[14ch] text-[clamp(44px,7.4vw,90px)] tracking-[-.05em]">
          {t.notFound.title}<span className="em-u">{t.notFound.titleEm}</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-[clamp(18px,1.8vw,22px)] leading-[1.5] font-light text-fg-2">
          {t.notFound.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <Link className="btn btn-primary" to="/">
            {t.notFound.backHome}
          </Link>
          <Link className="btn btn-ghost" to="/blog">
            {t.notFound.readBlog}
          </Link>
        </div>
      </main>
      <FooterSlim>
        <Link to="/">Home</Link>
      </FooterSlim>
    </>
  )
}
