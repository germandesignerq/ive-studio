/**
 * Статический сервер для проверки собранного сайта — как отдаёт nginx:
 * /pricing → dist/pricing/index.html, неизвестный адрес → 404.html.
 * Это важно проверять именно так: `vite preview` подменяет всё на
 * корневой index.html и пререндер становится не виден.
 */
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.argv[2] ?? 5185)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
}

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidates = [join(dist, clean), join(dist, clean, 'index.html')]
  for (const file of candidates) {
    if (!file.startsWith(dist)) continue
    try {
      if ((await stat(file)).isFile()) return file
    } catch {
      /* нет такого файла — пробуем следующий вариант */
    }
  }
  return null
}

createServer(async (req, res) => {
  const file = (await resolveFile(req.url)) ?? join(dist, '404.html')
  const code = file.endsWith('404.html') && !req.url.startsWith('/404') ? 404 : 200
  res.writeHead(code, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(port, () => console.log(`dist on http://localhost:${port}`))
