import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { MANAGED_ATTR as MANAGED, buildHead } from '@/lib/head'
import { metaFor } from '@/lib/seo'
import { HTML_LANG } from '@/lib/site'

/**
 * Держит <head> в согласии с текущим маршрутом.
 * Смонтирован один раз в App — страницам ничего объявлять не нужно.
 */
export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)
    const head = document.head

    document.documentElement.lang = HTML_LANG[meta.locale]
    document.title = meta.title

    head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove())

    for (const tag of buildHead(meta)) {
      if (tag.tag === 'title') continue
      const el = document.createElement(tag.tag)
      el.setAttribute(MANAGED, '')
      for (const [key, value] of Object.entries(tag.attrs)) el.setAttribute(key, value)
      if (tag.tag === 'script') el.textContent = tag.text
      head.appendChild(el)
    }
  }, [pathname])

  return null
}
