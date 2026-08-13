import type { CoverKey } from './covers'

/** Тип услуги — по нему разложены проекты. */
export type WorkCategory = 'ux' | 'web' | 'saas' | 'landing'

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

export const workFilters: Array<{ key: WorkFilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'ux', label: 'UX/UI' },
  { key: 'web', label: 'Web' },
  { key: 'saas', label: 'SaaS & MVP' },
  { key: 'landing', label: 'Landing' },
  { key: 'case', label: 'Case studies' },
]

export const works: Work[] = [
  {
    slug: 'aimore',
    name: 'AiMore',
    tags: 'Mobile app · UX/UI · Product design',
    caseStudy: true,
    category: 'ux',
    result: 'Dating app built from scratch: onboarding, feed and profiles across 40+ screens.',
    img: '/work-aimore.jpg',
  },
  {
    slug: 'the-alice',
    name: 'The Alice',
    tags: 'SaaS · Web · Dashboard',
    caseStudy: true,
    category: 'saas',
    result: 'Marketing site and admin dashboard for a business tracking system.',
    img: '/work-alice.jpg',
  },
  {
    slug: 'nexora-ai',
    name: 'Nexora AI',
    tags: 'SaaS · Web · Dashboard',
    caseStudy: true,
    category: 'saas',
    result: 'Dark-theme landing and control panel for an AI hotel management platform.',
    img: '/work-nexora.jpg',
  },
  {
    slug: 'hotel-app',
    name: 'Hotel App',
    tags: 'Mobile app · Booking · Concierge',
    caseStudy: true,
    category: 'ux',
    result:
      'Booking and concierge app for luxury hotels: search, rooms, amenities, one-tap booking.',
    img: '/work-hotel.jpg',
  },
  {
    slug: 'sales-dashboard',
    name: 'Sales Dashboard',
    tags: 'Mobile app · Dashboard · Data viz',
    caseStudy: true,
    category: 'ux',
    result:
      'Mobile dashboard for sales teams: weekly performance, revenue, orders and refunds at a glance.',
    img: '/work-sales.jpg',
  },
  {
    slug: 'sphere',
    name: 'Sphere',
    tags: 'SaaS · UX/UI · Design system',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'saas',
    result: 'Rebuilt the signup flow for a business banking app. Drop-off on step one fell by 38%.',
    cover: 'arcs',
  },
  {
    slug: 'northline',
    name: 'Northline',
    tags: 'Web · Development',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'web',
    result: 'New site and instant quote calculator. 2.3× more qualified leads.',
    cover: 'wave',
  },
  {
    slug: 'quanta',
    name: 'Quanta',
    tags: 'SaaS · Dashboard',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'saas',
    result: '40 analytics screens and a design system shipped in 12 weeks.',
    cover: 'bars',
  },
  {
    slug: 'atlas-health',
    name: 'Atlas Health',
    tags: 'Web · Booking',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'web',
    result: '61% of patients now book online instead of calling.',
    cover: 'grid',
  },
  {
    slug: 'pace',
    name: 'Pace',
    tags: 'Landing · Paid traffic',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'landing',
    result: 'Launch page built for testing. 8.4% conversion on cold traffic.',
    cover: 'burst',
  },
  {
    slug: 'loop',
    name: 'Loop',
    tags: 'MVP · Product design',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'saas',
    result: 'Idea to live MVP in 9 weeks, with paying users in month one.',
    cover: 'flow',
  },
  {
    slug: 'vera',
    name: 'Vera',
    tags: 'UX/UI · Redesign',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'ux',
    result: 'Onboarding rewritten end to end. Activation up, support tickets down.',
    cover: 'blocks',
  },
  {
    slug: 'kernel',
    name: 'Kernel',
    tags: 'Landing · UX/UI',
    // TODO: адрес живого сайта
    url: undefined,
    category: 'landing',
    result: 'Pricing page rebuilt around one decision. Trials up 27%.',
    cover: 'spark',
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
    url: 'https://mstpd-portfolio.vercel.app/',
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
]
