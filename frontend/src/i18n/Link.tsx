import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router'
import { localePath, type Locale } from '@/lib/site'
import { useLanguage } from './LanguageContext'

/** Хук для мест, где нужен просто адрес: href, useNavigate, sitemap-подобные списки. */
export function useLocalePath() {
  const { lang } = useLanguage()
  return (to: string, locale: Locale = lang) => (to.startsWith('/') ? localePath(to, locale) : to)
}

/**
 * Ссылка, которая сама держится текущего языка: `/pricing` на немецкой
 * версии ведёт на `/de/pricing`. Внешние и якорные адреса не трогаем.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const withLocale = useLocalePath()
  const target = typeof to === 'string' ? withLocale(to) : to
  return <RouterLink ref={ref} to={target} {...rest} />
})
