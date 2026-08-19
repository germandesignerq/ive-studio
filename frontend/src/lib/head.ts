/**
 * Один список тегов <head> на страницу. Пререндер печатает его в HTML,
 * клиент применяет тот же список при навигации — так статика и SPA не разъезжаются.
 */
import { alternateLinks, type PageMeta } from './seo'
import { HTML_LANG, SITE_NAME } from './site'

export type HeadTag =
  | { tag: 'title'; text: string }
  | { tag: 'meta'; attrs: Record<string, string> }
  | { tag: 'link'; attrs: Record<string, string> }
  | { tag: 'script'; attrs: Record<string, string>; text: string }

export function buildHead(meta: PageMeta): HeadTag[] {
  const tags: HeadTag[] = [
    { tag: 'title', text: meta.title },
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: meta.canonical } },
    {
      tag: 'meta',
      attrs: {
        name: 'robots',
        content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      },
    },

    /* Open Graph — из него собирают превью Telegram, WhatsApp, LinkedIn, Facebook. */
    { tag: 'meta', attrs: { property: 'og:type', content: meta.ogType } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: meta.canonical } },
    { tag: 'meta', attrs: { property: 'og:image', content: meta.image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:locale', content: ogLocale(meta.locale) } },

    /* Twitter/X читает свои теги и без них берёт маленькую картинку. */
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: meta.image } },
  ]

  for (const alt of meta.alternates)
    if (alt !== meta.locale)
      tags.push({
        tag: 'meta',
        attrs: { property: 'og:locale:alternate', content: ogLocale(alt) },
      })

  for (const link of alternateLinks(meta))
    tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: link.hreflang, href: link.href } })

  if (meta.jsonLd.length)
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify({ '@context': 'https://schema.org', '@graph': meta.jsonLd }),
    })

  return tags
}

const OG_LOCALES: Record<string, string> = { en: 'en_US', de: 'de_DE', fr: 'fr_FR' }
function ogLocale(locale: keyof typeof HTML_LANG): string {
  return OG_LOCALES[locale] ?? 'en_US'
}

/** Экранирование для печати в статический HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Атрибут-маркер: по нему клиент находит и заменяет теги при навигации.
 * Без него он не удалил бы пререндеренные и добавил бы вторые —
 * страница уехала бы с двумя canonical и двумя наборами hreflang.
 */
export const MANAGED_ATTR = 'data-seo'

export function renderHead(tags: HeadTag[]): string {
  return tags
    .map((t) => {
      if (t.tag === 'title') return `<title>${escapeHtml(t.text)}</title>`
      const attrs = [
        MANAGED_ATTR,
        ...Object.entries(t.attrs).map(([k, v]) => `${k}="${escapeHtml(v)}"`),
      ].join(' ')
      if (t.tag === 'script')
        // JSON внутри <script> ломается только на "</" — экранируем именно его
        return `<script ${attrs}>${t.text.replace(/</g, '\\u003c')}</script>`
      return `<${t.tag} ${attrs} />`
    })
    .join('\n    ')
}
