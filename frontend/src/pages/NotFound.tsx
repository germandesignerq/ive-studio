import { Link } from 'react-router'
import { Nav } from '@/components/Nav'
import { FooterSlim } from '@/components/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFound() {
  usePageMeta('Page not found — IVE studio')

  return (
    <>
      <Nav source="404" />
      <main className="wrap flex min-h-[70vh] flex-col justify-center pt-[150px] pb-[90px]">
        <span className="eyebrow mb-[22px] block">404</span>
        <h1 className="max-w-[14ch] text-[clamp(44px,7.4vw,90px)] tracking-[-.05em]">
          This page never <span className="em-u">shipped.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-[clamp(18px,1.8vw,22px)] leading-[1.5] font-light text-fg-2">
          The link is dead or the page moved. Everything else is where you left it.
        </p>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <Link className="btn btn-primary" to="/">
            Back home
          </Link>
          <Link className="btn btn-ghost" to="/blog">
            Read the blog
          </Link>
        </div>
      </main>
      <FooterSlim>
        <Link to="/">Home</Link>
      </FooterSlim>
    </>
  )
}
