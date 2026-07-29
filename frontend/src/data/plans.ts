export type PlanKey = 'starter' | 'business' | 'premium'

export type Plan = {
  key: PlanKey
  /** подпись над заголовком */
  eyebrow: string
  title: string
  note: string
  from: string
  range: string
  /** чипсы «что входит» в модалке */
  incl: string[]
  /** пункты в карточке тарифа */
  features: string[]
  highlight?: boolean
  tag?: string
}

/** Цены-заглушки: меняются здесь и больше нигде. */
export const plans: Plan[] = [
  {
    key: 'starter',
    eyebrow: 'Starter',
    title: 'One page, done right',
    note: 'A landing page built to be tested from day one.',
    from: '$2,500',
    range: 'Typical range $2,500 – $4,000',
    incl: ['Design & build', '2 weeks to live', 'Analytics set up'],
    features: [
      'Landing page design & build',
      'Mobile-first, fast by default',
      'Analytics and events set up',
      '2 weeks to live',
    ],
  },
  {
    key: 'business',
    eyebrow: 'Business',
    title: 'Full website',
    note: 'Multi-page site, designed and developed end to end.',
    from: '$6,000',
    range: 'Typical range $6,000 – $15,000',
    incl: ['UX + UI', 'Development & CMS', 'Design system', '30 days support'],
    features: [
      'UX strategy and full UI design',
      'Development and CMS',
      'Design system you can reuse',
      'Weekly demos, fixed timeline',
      '30 days of support after launch',
    ],
    highlight: true,
    tag: 'Most popular',
  },
  {
    key: 'premium',
    eyebrow: 'Premium',
    title: 'SaaS & MVP',
    note: 'A product, not a brochure. Dedicated team on your roadmap.',
    from: '$18,000',
    range: 'Typical range $18,000 – $45,000',
    incl: ['Product UX', 'Web app development', 'Dedicated team', 'Ongoing iteration'],
    features: [
      'Product UX and full design system',
      'Web app development',
      'Onboarding and conversion work',
      'Ongoing iteration after launch',
      'Priority access to the team',
    ],
  },
]

/**
 * Матрица сравнения пакетов.
 * true — входит, false — нет, строка — входит с уточнением.
 */
export type FeatureValue = boolean | string

export type FeatureGroup = {
  title: string
  rows: Array<{ label: string; values: Record<PlanKey, FeatureValue> }>
}

export const comparison: FeatureGroup[] = [
  {
    title: 'Scope',
    rows: [
      {
        label: 'Pages or screens',
        values: { starter: '1 landing page', business: 'Up to 8 pages', premium: 'Product scope' },
      },
      {
        label: 'Time to live',
        values: { starter: '2 weeks', business: '4–6 weeks', premium: 'From 10 weeks' },
      },
      {
        label: 'Fixed scope and price',
        values: { starter: true, business: true, premium: 'Per milestone' },
      },
    ],
  },
  {
    title: 'Design',
    rows: [
      { label: 'Discovery and strategy session', values: { starter: true, business: true, premium: true } },
      { label: 'UX research — interviews, testing', values: { starter: false, business: true, premium: true } },
      {
        label: 'UI design',
        values: { starter: 'Landing only', business: 'Full site', premium: 'Full product' },
      },
      {
        label: 'Design system',
        values: { starter: false, business: 'Reusable basics', premium: 'Full, documented' },
      },
      { label: 'Clickable prototype', values: { starter: false, business: true, premium: true } },
    ],
  },
  {
    title: 'Build',
    rows: [
      { label: 'Development', values: { starter: true, business: true, premium: true } },
      { label: 'Mobile-first and performance budget', values: { starter: true, business: true, premium: true } },
      { label: 'CMS you can edit yourself', values: { starter: false, business: true, premium: true } },
      { label: 'Third-party integrations', values: { starter: false, business: true, premium: true } },
      { label: 'Web app, dashboards, auth', values: { starter: false, business: false, premium: true } },
    ],
  },
  {
    title: 'Launch and after',
    rows: [
      { label: 'Analytics and events set up', values: { starter: true, business: true, premium: true } },
      { label: 'Built to be A/B tested', values: { starter: true, business: true, premium: true } },
      { label: 'Weekly demos on a live link', values: { starter: true, business: true, premium: true } },
      {
        label: 'Support after launch',
        values: { starter: false, business: '30 days', premium: 'Ongoing' },
      },
      { label: 'Priority access to the team', values: { starter: false, business: false, premium: true } },
    ],
  },
]
