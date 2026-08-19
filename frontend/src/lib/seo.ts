/**
 * Метаданные страниц: одно чистое место, из которого их берут и клиент, и пререндер.
 * Никаких браузерных API — модуль импортируется в Node во время сборки.
 */
import { plans } from '@/data/plans'
import { allPosts, type Post } from '@/data/posts'
import { works, type Work } from '@/data/works'
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  OG_IMAGE,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  localePath,
  splitLocale,
  type Locale,
} from './site'

export type PageMeta = {
  /** путь без языкового префикса: '/', '/pricing', '/blog/slug' */
  path: string
  locale: Locale
  title: string
  description: string
  canonical: string
  image: string
  ogType: 'website' | 'article'
  noindex: boolean
  /** языки, на которых страница действительно существует — только они идут в hreflang и sitemap */
  alternates: Locale[]
  jsonLd: object[]
}

/* ────────────────────────── тексты ────────────────────────── */

type MetaText = { title: string; description: string }
type LocalizedMeta = Record<Locale, MetaText>

/**
 * Заголовки написаны под запрос, а не под красоту: сначала услуга,
 * потом бренд. Description — до 155 символов, с обещанием и глаголом.
 */
const pageText: Record<string, LocalizedMeta> = {
  '/': {
    en: {
      title: 'UX/UI Design & Web Development Studio — IVE',
      description:
        'We design and build websites that convert: UX/UI, web development, SaaS and MVP. Fixed scope, fixed price, live in weeks. Free 30-minute call.',
    },
    de: {
      title: 'UX/UI-Design & Webentwicklung Agentur — IVE',
      description:
        'Wir gestalten und entwickeln Websites, die konvertieren: UX/UI, Webentwicklung, SaaS und MVP. Fester Umfang, fester Preis, live in Wochen. Kostenloses Erstgespräch.',
    },
    fr: {
      title: 'Studio de design UX/UI et développement web — IVE',
      description:
        'Nous concevons des sites qui convertissent : UX/UI, développement web, SaaS et MVP. Périmètre et prix fixes, en ligne en quelques semaines. Appel gratuit de 30 min.',
    },
  },
  '/about': {
    en: {
      title: 'About the studio — design and development in one team | IVE',
      description:
        'No handoffs, no account managers. Meet the people who run discovery, draw the screens and ship the code on your project.',
    },
    de: {
      title: 'Über das Studio — Design und Entwicklung in einem Team | IVE',
      description:
        'Keine Übergaben, keine Account-Manager. Lernen Sie die Menschen kennen, die Discovery machen, die Screens zeichnen und den Code ausliefern.',
    },
    fr: {
      title: 'À propos du studio — design et développement dans une équipe | IVE',
      description:
        'Pas de transmission, pas de chargés de compte. Rencontrez les personnes qui mènent la découverte, dessinent les écrans et livrent le code.',
    },
  },
  '/pricing': {
    en: {
      title: 'Pricing — what a landing page, a website and a SaaS cost | IVE',
      description:
        'Fixed scope and fixed price from $2,500. Compare three packages line by line and see exactly what is included before you talk to us.',
    },
    de: {
      title: 'Preise — was Landingpage, Website und SaaS kosten | IVE',
      description:
        'Fester Umfang und fester Preis ab 2.500 $. Vergleichen Sie drei Pakete Zeile für Zeile und sehen Sie genau, was enthalten ist.',
    },
    fr: {
      title: 'Tarifs — le prix d’une landing page, d’un site et d’un SaaS | IVE',
      description:
        'Périmètre et prix fixes à partir de 2 500 $. Comparez trois formules ligne par ligne et voyez exactement ce qui est inclus.',
    },
  },
  '/blog': {
    en: {
      title: 'Blog — conversion, UX and design systems | IVE studio',
      description:
        'Notes from a studio that ships: why landing pages fail, what onboarding tests miss, and what we learned the expensive way.',
    },
    de: {
      title: 'Blog — Conversion, UX und Design-Systeme | IVE studio',
      description:
        'Notizen aus einem Studio, das liefert: warum Landingpages scheitern, was Onboarding-Tests übersehen und was uns teuer zu stehen kam.',
    },
    fr: {
      title: 'Blog — conversion, UX et design systems | IVE studio',
      description:
        'Notes d’un studio qui livre : pourquoi les landing pages échouent, ce que les tests d’onboarding ratent, et nos leçons les plus chères.',
    },
  },
  '/privacy': {
    en: {
      title: 'Privacy policy | IVE studio',
      description: 'What data the site collects, why, how long we keep it and how to have it deleted.',
    },
    de: {
      title: 'Datenschutzerklärung | IVE studio',
      description:
        'Welche Daten die Website erhebt, warum, wie lange wir sie speichern und wie Sie ihre Löschung verlangen.',
    },
    fr: {
      title: 'Politique de confidentialité | IVE studio',
      description:
        'Quelles données le site collecte, pourquoi, combien de temps nous les conservons et comment les faire supprimer.',
    },
  },
  '/404': {
    en: { title: 'Page not found | IVE studio', description: 'The link is dead or the page moved.' },
    de: {
      title: 'Seite nicht gefunden | IVE studio',
      description: 'Der Link ist tot oder die Seite wurde verschoben.',
    },
    fr: {
      title: 'Page introuvable | IVE studio',
      description: 'Le lien est mort ou la page a été déplacée.',
    },
  },
}

/** Страницы, у которых есть перевод — только они получают hreflang и попадают в sitemap на трёх языках. */
const TRANSLATED_PAGES = new Set(['/', '/about', '/pricing', '/blog'])

/* ────────────────────────── JSON-LD ────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

export const organizationLd = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'IVE',
  url: SITE_URL,
  email: SITE_EMAIL,
  image: absoluteUrl(OG_IMAGE),
  logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.svg') },
  description:
    'UX/UI design and web development studio. We design and build websites, SaaS products and MVPs that convert.',
  founder: { '@type': 'Person', name: 'Herman Hubanov' },
  knowsLanguage: ['en', 'de', 'fr'],
  areaServed: 'Worldwide',
  priceRange: '$$$',
  serviceType: [
    'UX/UI design',
    'Web development',
    'SaaS product design',
    'MVP development',
    'Landing page design',
  ],
}

const websiteLd = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: LOCALES.map((l) => HTML_LANG[l]),
}

function breadcrumbLd(locale: Locale, trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(item.path, locale)),
    })),
  }
}

/**
 * «12 June 2026» → «2026-06-12». Нужен для datePublished, который читают поисковики.
 * Собираем дату из локальных полей, а не через toISOString: тот переводит
 * полночь в UTC и в положительных поясах сдвигает дату на день назад.
 */
export function isoDate(human: string): string {
  const parsed = Date.parse(human)
  if (Number.isNaN(parsed)) return ''
  const d = new Date(parsed)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function postLd(post: Post, locale: Locale) {
  const url = absoluteUrl(localePath(`/blog/${post.slug}`, locale))
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image ?? OG_IMAGE),
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    articleSection: post.categoryLabel,
    inLanguage: HTML_LANG[locale],
    wordCount: countWords(post),
    author: {
      '@type': 'Person',
      name: 'Herman Hubanov',
      jobTitle: 'Founder · Designer',
      url: absoluteUrl(localePath('/about', locale)),
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

function countWords(post: Post): number {
  let text = `${post.title} ${post.excerpt}`
  for (const b of post.body) {
    if ('text' in b) text += ' ' + b.text
    if ('items' in b) text += ' ' + b.items.join(' ')
  }
  return text.split(/\s+/).filter(Boolean).length
}

function workLd(work: Work, locale: Locale) {
  const url = absoluteUrl(localePath(`/work/${work.slug}`, locale))
  return {
    '@type': 'CreativeWork',
    '@id': `${url}#case`,
    name: work.name,
    headline: `${work.name} — case study`,
    description: work.result,
    image: work.img ? absoluteUrl(work.img) : absoluteUrl(OG_IMAGE),
    inLanguage: HTML_LANG[locale],
    creator: { '@id': ORG_ID },
    keywords: work.tags.split(' · '),
    ...(work.url ? { sameAs: work.url } : {}),
  }
}

/**
 * Прайс отдаётся как каталог предложений — из него Google собирает
 * блок с ценами в выдаче. Цены берутся из data/plans, чтобы не разъезжались.
 */
function pricingLd(locale: Locale) {
  const offers = plans.map((p) => ({
    name: p.eyebrow,
    // «$2,500» → «2500»: schema.org ждёт число, а не отформатированную строку
    price: p.from.replace(/[^\d.]/g, ''),
    description: p.note[locale],
  }))
  return {
    '@type': 'Service',
    name: 'UX/UI design and web development',
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    inLanguage: HTML_LANG[locale],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Packages',
      itemListElement: offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        description: o.description,
        price: o.price,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: o.price,
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        },
        url: absoluteUrl(localePath('/pricing', locale)),
      })),
    },
  }
}

/* ────────────────────────── резолвер ────────────────────────── */

const BLOG_LABEL: Record<Locale, string> = { en: 'Blog', de: 'Blog', fr: 'Blog' }
const HOME_LABEL: Record<Locale, string> = { en: 'Home', de: 'Start', fr: 'Accueil' }
const WORK_LABEL: Record<Locale, string> = { en: 'Work', de: 'Projekte', fr: 'Projets' }
const ABOUT_LABEL: Record<Locale, string> = { en: 'About', de: 'Über uns', fr: 'À propos' }
const PRICING_LABEL: Record<Locale, string> = { en: 'Pricing', de: 'Preise', fr: 'Tarifs' }

function text(path: string, locale: Locale): MetaText {
  return pageText[path]?.[locale] ?? pageText['/404'][locale]
}

/**
 * Главная точка входа: из полного пути ('/de/pricing') собирает всё,
 * что должно оказаться в <head>.
 */
export function metaFor(pathname: string): PageMeta {
  const { locale, path } = splitLocale(pathname)
  const base = {
    path,
    locale,
    image: absoluteUrl(OG_IMAGE),
    ogType: 'website' as const,
    noindex: false,
    alternates: TRANSLATED_PAGES.has(path) ? [...LOCALES] : [DEFAULT_LOCALE],
    canonical: absoluteUrl(localePath(path, TRANSLATED_PAGES.has(path) ? locale : DEFAULT_LOCALE)),
  }

  /* ── статья ── */
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length)
    const post = allPosts.find((p) => p.slug === slug)
    if (post)
      return {
        ...base,
        title: `${post.title} | IVE studio`,
        description: post.excerpt,
        image: absoluteUrl(post.image ?? OG_IMAGE),
        ogType: 'article',
        jsonLd: [
          postLd(post, DEFAULT_LOCALE),
          breadcrumbLd(DEFAULT_LOCALE, [
            { name: HOME_LABEL.en, path: '/' },
            { name: BLOG_LABEL.en, path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ],
      }
  }

  /* ── кейс ── */
  if (path.startsWith('/work/')) {
    const slug = path.slice('/work/'.length)
    const work = works.find((w) => w.slug === slug)
    if (work)
      return {
        ...base,
        title: `${work.name} — case study | IVE studio`,
        description: work.result,
        image: work.img ? absoluteUrl(work.img) : absoluteUrl(OG_IMAGE),
        ogType: 'article',
        jsonLd: [
          workLd(work, DEFAULT_LOCALE),
          breadcrumbLd(DEFAULT_LOCALE, [
            { name: HOME_LABEL.en, path: '/' },
            { name: WORK_LABEL.en, path: '/#work' },
            { name: work.name, path: `/work/${work.slug}` },
          ]),
        ],
      }
  }

  const known = pageText[path] !== undefined
  const t = text(known ? path : '/404', locale)

  const jsonLd: object[] = []
  if (path === '/') jsonLd.push(organizationLd, websiteLd)
  if (path === '/about')
    jsonLd.push(
      { '@type': 'AboutPage', name: t.title, description: t.description, mainEntity: { '@id': ORG_ID } },
      breadcrumbLd(locale, [
        { name: HOME_LABEL[locale], path: '/' },
        { name: ABOUT_LABEL[locale], path: '/about' },
      ]),
    )
  if (path === '/pricing')
    jsonLd.push(
      pricingLd(locale),
      breadcrumbLd(locale, [
        { name: HOME_LABEL[locale], path: '/' },
        { name: PRICING_LABEL[locale], path: '/pricing' },
      ]),
    )
  if (path === '/blog')
    jsonLd.push(
      {
        '@type': 'Blog',
        '@id': `${absoluteUrl(localePath('/blog', locale))}#blog`,
        name: t.title,
        description: t.description,
        inLanguage: HTML_LANG[locale],
        publisher: { '@id': ORG_ID },
        blogPost: allPosts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: absoluteUrl(`/blog/${p.slug}`),
          datePublished: isoDate(p.date),
        })),
      },
      breadcrumbLd(locale, [
        { name: HOME_LABEL[locale], path: '/' },
        { name: BLOG_LABEL[locale], path: '/blog' },
      ]),
    )

  return {
    ...base,
    title: t.title,
    description: t.description,
    noindex: !known,
    alternates: known ? base.alternates : [],
    jsonLd,
  }
}

/** Ссылки hreflang для страницы — включая x-default на английскую версию. */
export function alternateLinks(meta: PageMeta): Array<{ hreflang: string; href: string }> {
  if (meta.alternates.length < 2) return []
  const links = meta.alternates.map((l) => ({
    hreflang: HTML_LANG[l],
    href: absoluteUrl(localePath(meta.path, l)),
  }))
  links.push({ hreflang: 'x-default', href: absoluteUrl(localePath(meta.path, DEFAULT_LOCALE)) })
  return links
}

/** Все индексируемые URL сайта — основа sitemap.xml и списка маршрутов для пререндера. */
export function allRoutes(): Array<{ path: string; locales: Locale[] }> {
  const routes: Array<{ path: string; locales: Locale[] }> = [
    { path: '/', locales: [...LOCALES] },
    { path: '/about', locales: [...LOCALES] },
    { path: '/pricing', locales: [...LOCALES] },
    { path: '/blog', locales: [...LOCALES] },
    { path: '/privacy', locales: [DEFAULT_LOCALE] },
  ]
  for (const p of allPosts) routes.push({ path: `/blog/${p.slug}`, locales: [DEFAULT_LOCALE] })
  for (const w of works) if (w.caseStudy) routes.push({ path: `/work/${w.slug}`, locales: [DEFAULT_LOCALE] })
  return routes
}
