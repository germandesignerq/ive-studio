import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { CallModalProvider } from '@/context/CallModalContext'
import { CallModal } from '@/components/CallModal'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Blog } from '@/pages/Blog'
import { Post } from '@/pages/Post'
import { CaseStudy } from '@/pages/CaseStudy'
import { Pricing } from '@/pages/Pricing'
import { Privacy } from '@/pages/Privacy'
import { NotFound } from '@/pages/NotFound'

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

export default function App() {
  return (
    <CallModalProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CallModal />
    </CallModalProvider>
  )
}
