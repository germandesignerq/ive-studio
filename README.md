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

Пререндер раскладывает страницы по каталогам, поэтому фолбэк на корневой
`index.html` теперь стирал бы всю работу. Нужен именно такой порядок:

```nginx
location / {
  try_files $uri $uri/index.html /404.html;
}
```

Файлы с хешем в имени (`/assets/*`) и шрифты можно отдавать с
`Cache-Control: public, max-age=31536000, immutable`, а `*/index.html` —
с коротким `max-age`, иначе после деплоя посетители какое-то время будут
видеть старые страницы.

## SEO

Всё, что попадает в `<head>`, считается в одном месте — `src/lib/seo.ts`
(`metaFor(pathname)`), и это же используют пререндер и клиент при навигации.
Домен лежит в `src/lib/site.ts` — `SITE_URL`.

- title/description на каждый маршрут и на каждый язык
- canonical, hreflang (`en`/`de`/`fr` + `x-default`), Open Graph, Twitter Card
- JSON-LD: `ProfessionalService`, `WebSite`, `BlogPosting`, `CreativeWork`,
  `Service` с ценами, `BreadcrumbList`
- `sitemap.xml` с `xhtml:link` и `robots.txt` — генерируются на сборке

Немецкая и французская версии живут на своих адресах (`/de/...`, `/fr/...`) —
без этого поисковик их не видел вообще. Переведены главная, About, Pricing и
список блога; у статей, кейсов и политики canonical ведёт на английскую версию.

Картинка превью — `public/og-cover.jpg`, пересобирается
`python3 scripts/make-og-image.py`.

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
4. **`Privacy.tsx` is a draft.** The bracketed placeholders — legal entity, address,
   registration number, retention periods, service names — still need filling in.
   Have a lawyer review it before it goes live.
5. ~~**Link previews.**~~ Закрыто: `og:image` (`public/og-cover.jpg`) и полный
   набор мета-тегов печатаются пререндером в каждую страницу.
6. ~~**Fonts load from Google Fonts.**~~ Закрыто: Outfit лежит в
   `public/fonts/` одним вариативным woff2.
