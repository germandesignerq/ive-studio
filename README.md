# IVE studio

Studio website: React + TypeScript + Vite + TailwindCSS on the frontend, FastAPI on the backend.
Rebuilt from static markup (six HTML files with duplicated CSS and JS) into a proper SPA.

```
ive-studio/
├── frontend/          React 19 + TS + Vite 6 + Tailwind 4
│   ├── public/        team photos and project covers
│   └── src/
│       ├── components/  Nav, Footer, CallModal, LeadForm, WorkGrid, SilkCanvas…
│       ├── pages/       Home, About, Blog, Post, CaseStudy, Pricing, Privacy, NotFound
│       ├── hooks/       useReveal, useFollowGlow, useStickyNav, useReducedMotion…
│       ├── data/        works, posts, reviews, plans, partners, covers — all content lives here
│       └── lib/         API client and form validation
└── backend/           FastAPI + SQLite
    └── app/           main, config, schemas, db, routers/leads
```

## Running it

You need two terminals. Backend first — the frontend proxies `/api` to it.

### 1. Backend (port 8000)

```bash
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
```

```bash
cd backend && .venv/bin/uvicorn app.main:app --reload --port 8000
```

API docs: http://127.0.0.1:8000/docs

### 2. Frontend (port 5173)

```bash
cd frontend && npm install
```

```bash
cd frontend && npm run dev
```

Site: http://localhost:5173

### Production build

```bash
cd frontend && npm run build
```

`npm run build` теперь делает три шага: собирает клиент, собирает SSR-бандл и
**пререндерит каждый маршрут в готовый HTML** (`scripts/prerender.mjs`). В `dist`
оказываются обычные статические страницы — `dist/pricing/index.html`,
`dist/de/pricing/index.html` и так далее — плюс `sitemap.xml`, `robots.txt` и
`404.html`. Без этого шага краулеры без JS (Bing, LinkedIn, Telegram, WhatsApp,
Facebook) видят пустой `<div id="root">`.

Посмотреть результат ровно так, как его отдаст nginx:

```bash
cd frontend && npm run build && node scripts/serve-dist.mjs 5185
```

`npm run build:spa` собирает без пререндера — если нужно быстро проверить сборку.

### Что должен делать nginx

Готовый конфиг лежит в репозитории — `deploy/nginx.conf`. Ставится один раз:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/ive-studio && sudo nginx -t && sudo systemctl reload nginx
```

Что в нём важно и почему:

- `try_files $uri $uri/index.html =404` плюс `error_page 404 /404.html`.
  Без `=404` страница ошибки отдаётся с кодом **200** — Google считает такой
  адрес рабочим и годами держит мусор в индексе.
- `rewrite ^(/.+)/$ $1 permanent` — `/pricing/` и `/pricing` перестают быть
  двумя разными страницами. Условие «хотя бы один символ до слэша»
  обязательно, иначе `/` редиректит сам на себя.
- редиректы `http → https` и `www → без www`: без них сайт живёт по четырём
  адресам сразу и делит вес между ними.
- `/assets/*`, `/fonts/*` — `immutable` на год (в именах хеш), `/img/*` — 30
  дней, страницы — 5 минут, иначе после деплоя посетители какое-то время
  видят старую версию.

## SEO

Всё, что попадает в `<head>`, считается в одном месте — `src/lib/seo.ts`
(`metaFor(pathname)`), и это же используют пререндер и клиент при навигации.
Домен лежит в `src/lib/site.ts` — `SITE_URL`.

- title/description на каждый маршрут и на каждый язык
- canonical, hreflang (`en`/`de`/`fr`/`uk` + `x-default`), Open Graph, Twitter Card
- JSON-LD: `ProfessionalService`, `Person` (автор), `WebSite`, `BlogPosting`,
  `CreativeWork`, `Service` с ценами, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` с `xhtml:link` и `robots.txt` — генерируются на сборке.
  У статей `lastmod` свой (`updated` или дата публикации), у остальных страниц —
  дата сборки: одинаковая дата на всех адресах поисковиком игнорируется
- `rss.xml` на каждый язык (`/rss.xml`, `/de/rss.xml`, …), ссылка на фид
  печатается в `<head>` страниц блога

Вопросы с главной лежат в `src/data/faq.ts` — оттуда их берут и секция, и
разметка `FAQPage`. Текст обязан совпадать: расхождение видимого и размеченного
Google считает обманом. Сам сниппет с вопросами он сейчас показывает редко —
разметка нужна прежде всего для понимания страницы.

Даты правок: у статьи есть необязательное поле `updated` (`src/data/posts.ts`).
Заполнили — оно уходит в `dateModified`, в `lastmod` и в подпись «Обновлено»
под заголовком. Пустое — значит статья не менялась; выдуманная свежая дата
хуже отсутствующей.

Ссылки на профили (`sameAs`) — `SITE_PROFILES` и `AUTHOR_PROFILES` в
`src/lib/site.ts`. **Сейчас пустые**: без них поисковику не с чем связать
имя автора. Заполнить теми же адресами, что появятся в подвале.

Немецкая, французская и украинская версии живут на своих адресах (`/de/...`,
`/fr/...`, `/uk/...`) — без этого поисковик их не видел вообще. Переведены
главная, About, Pricing, список блога и все статьи; у кейсов и политики
canonical ведёт на английскую версию. Непереведённые страницы всё равно
собираются под каждым префиксом — иначе `/de/privacy` из подвала отдавал бы
404, — но в `sitemap.xml` попадает только английский оригинал.

### Язык по региону

Посетитель, пришедший на адрес без префикса, попадает на свой язык сам —
`src/i18n/detect.ts`, вызывается из `main.tsx` **до** монтирования React,
поэтому английская страница не успевает мигнуть. Порядок сигналов:

1. прошлый выбор посетителя (`localStorage`) — сильнее любых догадок;
2. `?lang=de` в адресе — ручное переключение ссылкой, параметр тут же убирается;
3. языки браузера: `de-AT` → немецкий, `en-DE` → английский (человек выбрал
   английский осознанно — не спорим);
4. регион: страна из языкового тега (`it-CH` → немецкий), затем часовой пояс
   (`Europe/Vienna` → немецкий, `Europe/Kyiv` → украинский). Часовой пояс —
   единственный способ узнать регион, не запрашивая внешний геосервис и ничей IP;
5. английский.

Чего редирект не делает: не трогает адреса, у которых язык уже указан явно,
не ведёт на страницы без перевода и не срабатывает для краулеров и генераторов
превью — иначе Google вместо `/` индексировал бы немецкую версию. Логика
серверная только на первый взгляд: `Vary: Accept-Language` размножил бы
каждую страницу в кэше CDN, поэтому выбор сделан на клиенте.

Картинка превью — `public/og-cover.jpg`, пересобирается
`python3 scripts/make-og-image.py`.

### Картинки

Исходники — JPEG на 1200–1600 px, а показываются они местами в 310 px.
`scripts/optimize-images.py` раскладывает каждую в AVIF и WebP по нужным
ширинам (`public/img/`) и пишет манифест `src/data/images.generated.ts`;
компонент `<Picture>` собирает из него `srcset` и проставляет `width`/`height`,
без которых страница дёргается при загрузке — это CLS в Core Web Vitals.

```bash
cd frontend && python3 scripts/optimize-images.py
```

Обложки проектов на главной: 1793 КБ JPEG → 230 КБ AVIF. Исходные JPEG
остаются фолбэком для браузеров без AVIF; `og-cover.jpg` не трогаем — скрейперы
соцсетей понимают только JPEG и PNG. Скрипт запускается руками, когда добавили
картинку: на сервере во время деплоя Pillow может не оказаться.

### Шрифты

Кириллицы в Outfit нет — украинская версия рисовалась подстановочным системным
шрифтом. Рядом лежит Onest (тот же геометрический грот, есть і, ї, є, ґ),
подключён отдельным `@font-face` с `unicode-range` на кириллицу: браузер сам
берёт его для символов, которых нет в Outfit, и на английских страницах файл
не скачивается вовсе. `size-adjust: 95%` — поправка на разный рост строчных,
иначе в строке «UX/UI-дизайну» латиница мельче кириллицы.

### Аналитика и согласие

GA4 работает через Google Consent Mode: `analytics_storage: 'denied'` выставлен
в `index.html` до первого хита, поэтому до ответа посетителя аналитика идёт без
cookie и без идентификатора. Баннер — `components/CookieBanner.tsx`, ответ
хранится в `localStorage` и читается тем же inline-скриптом при следующем
заходе. Просмотр страницы отправляет `main.tsx` — после того, как решён язык,
иначе каждый немецкий визит начинался бы с просмотра английской «/».

## What the backend does

The one thing the static version couldn't do: **the forms actually send leads now.**
Every HTML file used to have `e.preventDefault()` and `console.log('Lead:', …)` —
the visitor saw "Request sent" and the lead went nowhere.

| Method | Path          | What it does                                              |
| ------ | ------------- | ----------------------------------------------------------- |
| POST   | `/api/leads`  | accepts a lead from any form, validates it, writes to SQLite |
| GET    | `/api/leads`  | reads leads back, requires an `X-Admin-Token` header         |
| GET    | `/api/health` | liveness check                                                |

Leads are stored in `backend/leads.db`. Each one has a `source` field — which page
and which form it came from (`home: contact form`, `case: sphere`, `blog: cta`…),
plus a `plan` field when it came from a pricing card.

Reading leads back is off by default: while `ADMIN_TOKEN` is empty, `GET /api/leads`
returns 404. Set a token in `backend/.env` (see `.env.example`):

```bash
cd backend && cp .env.example .env
```

## Carried over one-to-one

- The silk canvas behind the hero and the final CTA.
- The gold glow that trails the cursor — hero, CTA, footer.
- Reveal-on-scroll for every section, animated counters, the reading-progress bar.
- The lead modal: a plain version and a pricing-plan version (price + "what's included" chips).
- Portfolio and blog filters, the mobile menu, the sticky header.
- All of it turns off under the system's "reduce motion" setting.

## What changed from the static version

- **The logo, CSS and scripts used to be copy-pasted into every file** — now there's
  one copy of each: `components/Logo.tsx`, `index.css`, shared hooks.
- **Routing instead of separate HTML files.** Routes: `/`, `/about`, `/blog`,
  `/blog/:slug`, `/work/:slug`, `/pricing`, `/privacy`, plus a 404 page that didn't
  exist before.
- **Content moved out of markup** into `src/data/`. Adding a project or a post is
  now adding an object to an array — no more copying a whole file.
- Design tokens (colors, radii, fonts) are declared once via `@theme` in `index.css`
  and available as plain Tailwind utilities: `text-fg-2`, `bg-card`, `border-line`,
  `rounded-lg-x`.
- Nine real blog posts with cited facts, CC0 cover photos and a conversion-funnel
  block at the end of each article — the static version had one shared placeholder
  article that every card linked to.
- A pricing page with a full plan-comparison table, split out from the homepage.
- A portfolio filter with a dedicated "case studies" tab, and a first real project
  linking straight out to its live site.

## Still open

Carried over from the static README — content and legal work, not something code
can close on its own:

1. **Case studies still share one body.** Every project card without a case-study
   flag links straight to the client's live site; the ones that do have a
   case-study (`caseStudy: true` in `src/data/works.ts`) still all render the same
   Sphere write-up. Real copy needs its own entry per project.
2. **Reviews and partners are made up** (`src/data/reviews.ts` and
   `src/data/partners.tsx`). Prices in `src/data/plans.ts` are placeholders.
3. **The numbers on About** ("9 years / 140 projects / 11 people") don't match the
   two-person team shown on the same page. Put in the real ones.
4. **`Privacy.tsx` is a draft — и теперь это срочно.** Баннер согласия ведёт
   именно на неё, а немецкая и французская версии — это трафик из ЕС. Скобочные
   заглушки (юрлицо, адрес, регистрационный номер, сроки хранения, список
   сервисов — GA4 туда добавить обязательно) нужно заполнить и показать юристу
   до публикации.
5. **Ответы в `src/data/faq.ts` — обещания клиенту.** Цифры сверены с
   `data/plans.ts`, но сроки, поддержку и работу с текстом стоит прочитать
   глазами владельца: это то, что вы обязуетесь делать.
6. **`SITE_PROFILES` и `AUTHOR_PROFILES` в `src/lib/site.ts` пустые.** Пока
   там нет ссылок на реальные профили, авторство в разметке ни с чем не
   связывается — и подвал стоит без иконок соцсетей по той же причине.
7. ~~**Link previews.**~~ Закрыто: `og:image` (`public/og-cover.jpg`) и полный
   набор мета-тегов печатаются пререндером в каждую страницу.
8. ~~**Fonts load from Google Fonts.**~~ Закрыто: Outfit и кириллический Onest
   лежат в `public/fonts/` — по одному вариативному woff2.
