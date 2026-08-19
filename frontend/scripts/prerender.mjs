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
const { render, allRoutes, metaFor, buildHead, renderHead, HTML_LANG, SITE_URL, localePath } = server

const template = await readFile(join(distDir, 'index.html'), 'utf8')

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

    const html = template
      .replace('<html lang="en">', `<html lang="${HTML_LANG[locale]}">`)
      // дефолтные title/description из index.html нужны только dev-серверу —
      // на статике их заменяют посчитанные для конкретного маршрута
      .replace(/\s*<title>[\s\S]*?<\/title>/, '')
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
      .replace('</head>', `  ${head}\n  </head>`)
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

/* ── sitemap.xml ── только переведённые страницы получают альтернативы */
const entries = allRoutes().flatMap((route) =>
  route.locales.map((locale) => ({
    loc: SITE_URL + (localePath(route.path, locale) === '/' ? '/' : localePath(route.path, locale)),
    alternates:
      route.locales.length > 1
        ? route.locales.map((l) => ({ lang: HTML_LANG[l], href: SITE_URL + localePath(route.path, l) }))
        : [],
    priority: route.path === '/' ? '1.0' : route.path.includes('/blog/') ? '0.6' : '0.8',
  })),
)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${today}</lastmod>
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
