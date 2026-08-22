/**
 * Пререндер: каждый маршрут превращается в готовый HTML.
 *
 * Зачем: SPA отдаёт пустой <div id="root">. Google его отрисует, но Bing,
 * LinkedIn, Telegram, WhatsApp и Facebook — нет: превью ссылок остаются пустыми.
 * После этого шага в dist лежат обычные статические страницы, которые
 * оживают в SPA после гидратации.
 *
 * Запускается из package.json после `vite build` и `vite build --ssr`.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const { render, allRoutes, feedFor, metaFor, buildHead, renderHead } = server
const { HTML_LANG, LOCALES, SITE_URL, localePath } = server

const template = await readFile(join(distDir, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

/** Разворачиваем маршруты в конкретные адреса: путь × язык. */
const urls = []
for (const route of allRoutes())
  for (const locale of route.locales) urls.push({ url: localePath(route.path, locale), locale })
/* 404 тоже отдаётся статикой — иначе на неизвестном адресе виден пустой экран. */
urls.push({ url: '/404', locale: 'en', file: '404.html' })

let failed = 0

for (const { url, locale, file } of urls) {
  try {
    const meta = metaFor(url)
    const body = render(url)
    const head = renderHead(buildHead(meta))

    /* Латиница уже в preload из index.html; украинской странице нужен свой файл,
       иначе кириллица секунду висит в подстановочном шрифте. */
    const preload =
      locale === 'uk'
        ? '<link rel="preload" href="/fonts/onest-cyrillic.woff2" as="font" type="font/woff2" crossorigin />\n    '
        : ''

    const html = template
      .replace('<html lang="en">', `<html lang="${HTML_LANG[locale]}">`)
      // дефолтные title/description из index.html нужны только dev-серверу —
      // на статике их заменяют посчитанные для конкретного маршрута
      .replace(/\s*<title>[\s\S]*?<\/title>/, '')
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
      .replace('</head>', `  ${preload}${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div>`)

    const target = file ? join(distDir, file) : join(distDir, url, 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
    console.log(`  ✓ ${url}`)
  } catch (err) {
    failed++
    console.error(`  ✗ ${url}: ${err.message}`)
  }
}

/* ── sitemap.xml ── в него идут только канонические адреса: у непереведённых
   страниц это английская версия, хотя пререндерены они под каждым языком */
const entries = allRoutes().flatMap((route) =>
  route.indexed.map((locale) => ({
    loc: SITE_URL + (localePath(route.path, locale) === '/' ? '/' : localePath(route.path, locale)),
    alternates:
      route.indexed.length > 1
        ? route.indexed.map((l) => ({ lang: HTML_LANG[l], href: SITE_URL + localePath(route.path, l) }))
        : [],
    /* у статьи дата своя, у остальных страниц — дата сборки: они и правда
       пересобираются каждый деплой */
    lastmod: route.lastmod || today,
    priority: route.path === '/' ? '1.0' : route.path.includes('/blog/') ? '0.6' : '0.8',
  })),
)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <priority>${e.priority}</priority>
${e.alternates
  .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
  .join('\n')}${
      e.alternates.length
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${e.alternates[0].href}" />`
        : ''
    }
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(join(distDir, 'sitemap.xml'), sitemap)

/* ── rss.xml ── по фиду на язык: /rss.xml, /de/rss.xml, /fr/rss.xml, /uk/rss.xml ── */
const escapeXml = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS требует RFC-822: «2026-06-12» → «Fri, 12 Jun 2026 00:00:00 GMT».
    Читаем дату как UTC — иначе полночь по местному времени уезжает на день назад. */
const rfc822 = (iso) => {
  const parsed = Date.parse(`${iso}T00:00:00Z`)
  return Number.isNaN(parsed) ? '' : new Date(parsed).toUTCString()
}

for (const locale of LOCALES) {
  const feed = feedFor(locale)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feed.title)}</title>
    <link>${feed.link}</link>
    <description>${escapeXml(feed.description)}</description>
    <language>${feed.language}</language>
    <atom:link href="${SITE_URL + feed.path}" rel="self" type="application/rss+xml" />
${feed.items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${rfc822(item.date)}</pubDate>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`
  const target = join(distDir, feed.path.replace(/^\//, ''))
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, xml)
}

/* ── robots.txt ── */
await writeFile(
  join(distDir, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

await rm(ssrDir, { recursive: true, force: true })

console.log(`\n${urls.length - failed}/${urls.length} pages prerendered, sitemap has ${entries.length} URLs`)
if (failed) process.exit(1)
