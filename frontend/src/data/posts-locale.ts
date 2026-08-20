import type { Locale } from '@/lib/site'
import { allPosts, featuredPost, posts, type Post } from './posts'
import { postsDe } from './posts.de'
import { postsFr } from './posts.fr'
import { postsUk } from './posts.uk'

/**
 * Структура статьи (слаг, дата, обложка, категория) живёт в posts.ts,
 * а переводимый текст — в posts.de.ts / posts.fr.ts / posts.uk.ts. Здесь склеиваем.
 * Английский — сам posts.ts, поэтому подменять нечего.
 */
const byLocale = { de: postsDe, fr: postsFr, uk: postsUk }

function translate(post: Post, locale: Locale): Post {
  if (locale === 'en') return post
  return { ...post, ...byLocale[locale][post.slug] }
}

export function featuredPostFor(locale: Locale): Post {
  return translate(featuredPost, locale)
}

export function postsFor(locale: Locale): Post[] {
  return posts.map((p) => translate(p, locale))
}

export function allPostsFor(locale: Locale): Post[] {
  return allPosts.map((p) => translate(p, locale))
}

const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', de: 'de-DE', fr: 'fr-FR', uk: 'uk-UA' }

/**
 * Дата только для показа. Само поле post.date остаётся английским —
 * из него собирается datePublished в микроразметке, и его парсит Date.parse.
 */
export function displayDate(date: string, locale: Locale): string {
  const parsed = Date.parse(date)
  if (Number.isNaN(parsed)) return date
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(parsed))
}
