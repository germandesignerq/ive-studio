import type { CoverKey } from './covers'

/** Тип продукта — по нему разложены проекты. */
export type WorkCategory = 'landing' | 'crm' | 'app'

/** Ключи вкладок: категории плюс «есть разбор» — это отдельная ось. */
export type WorkFilterKey = 'all' | WorkCategory | 'case'

export type Work = {
  /** slug для ссылки на кейс */
  slug: string
  name: string
  tags: string
  category: WorkCategory
  /**
   * true — по проекту есть подробный разбор, карточка ведёт на /work/:slug.
   * Иначе карточка — прямая ссылка на живой сайт из url.
   */
  caseStudy?: boolean
  /** адрес готового сайта; без него карточка некликабельна */
  url?: string
  result: string
  /** скриншот из /public, иначе рисуем SVG-обложку */
  img?: string
  cover?: CoverKey
}

type WorkFilterLabel = 'filterAll' | 'filterLanding' | 'filterCrm' | 'filterApp' | 'filterCase'

/**
 * Раздел кейсов временно скрыт: вкладка не показывается, карточки не
 * рендерятся, страницы /work/:slug не попадают в sitemap и закрыты от
 * индексации. Сами данные и разметка кейсов остаются на месте —
 * чтобы вернуть раздел, достаточно поставить true.
 */
export const SHOW_CASE_STUDIES = false

const allFilters: Array<{ key: WorkFilterKey; label: WorkFilterLabel }> = [
  { key: 'all', label: 'filterAll' },
  { key: 'landing', label: 'filterLanding' },
  { key: 'crm', label: 'filterCrm' },
  { key: 'app', label: 'filterApp' },
  { key: 'case', label: 'filterCase' },
]

/** label — ключ в словаре (t.work.*), а не готовая строка. */
export const workFilters = allFilters.filter((f) => SHOW_CASE_STUDIES || f.key !== 'case')

export const works: Work[] = [
  {
    slug: 'aimore',
    name: 'AiMore',
    tags: 'Mobile app · UX/UI · Product design',
    caseStudy: true,
    category: 'app',
    result: 'Dating app built from scratch: onboarding, feed and profiles across 40+ screens.',
    img: '/work-aimore.jpg',
  },
  {
    slug: 'the-alice',
    name: 'The Alice',
    tags: 'SaaS · Web · Dashboard',
    caseStudy: true,
    category: 'crm',
    result: 'Marketing site and admin dashboard for a business tracking system.',
    img: '/work-alice.jpg',
  },
  {
    slug: 'nexora-ai',
    name: 'Nexora AI',
    tags: 'SaaS · Web · Dashboard',
    caseStudy: true,
    category: 'crm',
    result: 'Dark-theme landing and control panel for an AI hotel management platform.',
    img: '/work-nexora.jpg',
  },
  {
    slug: 'hotel-app',
    name: 'Hotel App',
    tags: 'Mobile app · Booking · Concierge',
    caseStudy: true,
    category: 'app',
    result:
      'Booking and concierge app for luxury hotels: search, rooms, amenities, one-tap booking.',
    img: '/work-hotel.jpg',
  },
  {
    slug: 'sales-dashboard',
    name: 'Sales Dashboard',
    tags: 'Mobile app · Dashboard · Data viz',
    caseStudy: true,
    category: 'crm',
    result:
      'Mobile dashboard for sales teams: weekly performance, revenue, orders and refunds at a glance.',
    img: '/work-sales.jpg',
  },
  {
    slug: 'kestra',
    name: 'Kestra',
    tags: 'Fintech · Web · Product design',
    url: 'https://kestra-crypto.vercel.app/',
    category: 'landing',
    result:
      'A full crypto exchange platform — live trading, staking, a card and a mobile app, built from one design system.',
    img: '/work-kestra.jpg',
  },
  {
    slug: 'feasty',
    name: 'Feasty',
    tags: 'Web · Product design · E-commerce',
    url: 'https://feasty-cyan.vercel.app/',
    category: 'landing',
    result:
      'Food delivery site end to end — menu, cart, checkout and payment, with an Instagram-style photo slider on the home page.',
    img: '/work-feasty.jpg',
  },
  {
    slug: 'mstpd',
    name: 'Viacheslav MSTPD',
    tags: 'Landing · Personal portfolio · Audio',
    url: 'https://mstpd.com/',
    category: 'landing',
    result:
      'Personal portfolio for a mixing and mastering engineer — audio players, a filterable credits list and booking built into one page.',
    img: '/work-mstpd.jpg',
  },
  {
    slug: 'casa-marena',
    name: 'Casa Marena',
    tags: 'Hospitality · Web · Booking',
    url: 'https://casa-marena.vercel.app/',
    category: 'landing',
    result:
      'Booking site for a nine-room Positano hotel — room search and filters, dining pre-orders, a live map and multi-currency pricing in five languages.',
    img: '/work-casa-marena.jpg',
  },
  {
    slug: 'happyroom',
    name: 'HAPPY ROOM',
    tags: 'Interior design · Landing · Calculator',
    url: 'https://happyroom-sigma.vercel.app/',
    category: 'landing',
    result:
      'Site for a full-cycle interior design studio — a live cost calculator, a seven-step process breakdown and a filterable project portfolio.',
    img: '/work-happyroom.jpg',
  },
  {
    slug: 'momentum',
    name: 'Momentum',
    tags: 'Fintech · Web app · Wallet',
    url: 'https://momentum-wallet.com/',
    category: 'crm',
    result:
      'Multi-chain crypto wallet workspace — sign-in and account creation flows built for a platform managing BTC, ETH, USDT and TON in one place.',
    img: '/work-momentum.jpg',
  },
  {
    slug: 'finora',
    name: 'Finora',
    tags: 'Fintech · Dashboard · Analytics',
    url: 'https://finora-zeta-ivory.vercel.app/',
    category: 'crm',
    result:
      'Financial overview dashboard — income, expenses, cash flow and revenue mix tracked across connected accounts, with a built-in EN/RU switch.',
    img: '/work-finora.jpg',
  },
  {
    slug: 'cleargatecustoms',
    name: 'ClearGateCustoms',
    tags: 'Logistics · Landing · Calculator',
    url: 'https://cleargatecustoms.com.ua/',
    category: 'landing',
    result:
      'Site for a customs broker clearing cargo from China and Europe — a duty and VAT calculator, service breakdown and a UK/EN language switch.',
    img: '/work-cleargate.jpg',
  },
  {
    slug: 'balance',
    name: 'Balance',
    tags: 'Health · Landing · AI',
    url: 'https://balance-calorie-tracker.vercel.app',
    category: 'landing',
    result:
      'Site for an AI calorie and activity tracker — meals recognised from a photo, a daily kcal ring and a weekly weight trend, no manual food diary.',
    img: '/work-balance.jpg',
  },
  {
    slug: 'aimorelove',
    name: 'AiMore',
    tags: 'Dating · Landing · Mobile app',
    url: 'https://aimorelove.com/',
    category: 'landing',
    result:
      'Marketing site for an AI dating app — App Store and Google Play links, feature screens and reviews built around one download-first goal.',
    img: '/work-aimorelove.jpg',
  },
]

/** То, что реально показываем в сетке: пока кейсы скрыты, их карточек нет. */
export const visibleWorks = works.filter((w) => SHOW_CASE_STUDIES || !w.caseStudy)
