import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router'
import { CallModalProvider } from '@/context/CallModalContext'
import { CallModal } from '@/components/CallModal'
import { CookieBanner } from '@/components/CookieBanner'
import { Seo } from '@/components/Seo'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Blog } from '@/pages/Blog'
import { Post } from '@/pages/Post'
import { CaseStudy } from '@/pages/CaseStudy'
import { Pricing } from '@/pages/Pricing'
import { Privacy } from '@/pages/Privacy'
import { NotFound } from '@/pages/NotFound'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/site'

/** Переход по маршруту — наверх; переход по якорю — к секции. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

/**
 * Один и тот же набор страниц монтируется трижды: в корне (английский)
 * и под /de, /fr. Язык берётся из адреса — см. LanguageProvider.
 */
function pageRoutes() {
  return [
    <Route key="home" index element={<Home />} />,
    <Route key="about" path="about" element={<About />} />,
    <Route key="blog" path="blog" element={<Blog />} />,
    <Route key="post" path="blog/:slug" element={<Post />} />,
    <Route key="case" path="work/:slug" element={<CaseStudy />} />,
    <Route key="pricing" path="pricing" element={<Pricing />} />,
    <Route key="privacy" path="privacy" element={<Privacy />} />,
    <Route key="404" path="*" element={<NotFound />} />,
  ]
}

/** /en/pricing — законный, но лишний адрес: уводим на канонический /pricing. */
function DropDefaultLocale() {
  const { '*': rest = '' } = useParams()
  return <Navigate to={`/${rest}`} replace />
}

export default function App() {
  return (
    <LanguageProvider>
      <CallModalProvider>
        <Seo />
        <ScrollManager />
        <Routes>
          <Route path={`/${DEFAULT_LOCALE}/*`} element={<DropDefaultLocale />} />
          {LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => (
            <Route key={locale} path={`/${locale}`} element={<Outlet />}>
              {pageRoutes()}
            </Route>
          ))}
          <Route path="/" element={<Outlet />}>
            {pageRoutes()}
          </Route>
        </Routes>
        <CallModal />
        <CookieBanner />
      </CallModalProvider>
    </LanguageProvider>
  )
}
