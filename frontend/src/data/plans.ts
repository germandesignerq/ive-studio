import type { Localized } from '@/i18n/LanguageContext'

export type PlanKey = 'starter' | 'business' | 'premium'

export type Plan = {
  key: PlanKey
  /** подпись над заголовком — название пакета, одинаковое на всех языках */
  eyebrow: string
  title: Localized
  note: Localized
  from: string
  range: Localized
  /** чипсы «что входит» в модалке */
  incl: Localized[]
  /** пункты в карточке тарифа */
  features: Localized[]
  highlight?: boolean
  tag?: Localized
}

/** Цены-заглушки: меняются здесь и больше нигде. */
export const plans: Plan[] = [
  {
    key: 'starter',
    eyebrow: 'Starter',
    title: {
      en: 'One page, done right',
      de: 'Eine Seite, richtig gemacht',
      fr: 'Une page, bien faite',
    },
    note: {
      en: 'A landing page built to be tested from day one.',
      de: 'Eine Landingpage, die vom ersten Tag an getestet werden kann.',
      fr: 'Une landing page conçue pour être testée dès le premier jour.',
    },
    from: '$2,500',
    range: {
      en: 'Typical range $2,500 – $4,000',
      de: 'Üblicher Rahmen 2.500 – 4.000 $',
      fr: 'Fourchette habituelle 2 500 – 4 000 $',
    },
    incl: [
      { en: 'Design & build', de: 'Design & Umsetzung', fr: 'Design et réalisation' },
      { en: '2 weeks to live', de: '2 Wochen bis live', fr: '2 semaines jusqu’en ligne' },
      { en: 'Analytics set up', de: 'Analytics eingerichtet', fr: 'Analytique configurée' },
    ],
    features: [
      {
        en: 'Landing page design & build',
        de: 'Landingpage: Design und Umsetzung',
        fr: 'Landing page : design et réalisation',
      },
      {
        en: 'Mobile-first, fast by default',
        de: 'Mobile-first, schnell von Haus aus',
        fr: 'Mobile-first, rapide par défaut',
      },
      {
        en: 'Analytics and events set up',
        de: 'Analytics und Events eingerichtet',
        fr: 'Analytique et événements configurés',
      },
      { en: '2 weeks to live', de: '2 Wochen bis live', fr: '2 semaines jusqu’en ligne' },
    ],
  },
  {
    key: 'business',
    eyebrow: 'Business',
    title: { en: 'Full website', de: 'Komplette Website', fr: 'Site complet' },
    note: {
      en: 'Multi-page site, designed and developed end to end.',
      de: 'Mehrseitige Website, durchgängig gestaltet und entwickelt.',
      fr: 'Site multi-pages, conçu et développé de bout en bout.',
    },
    from: '$6,000',
    range: {
      en: 'Typical range $6,000 – $15,000',
      de: 'Üblicher Rahmen 6.000 – 15.000 $',
      fr: 'Fourchette habituelle 6 000 – 15 000 $',
    },
    incl: [
      { en: 'UX + UI', de: 'UX + UI', fr: 'UX + UI' },
      { en: 'Development & CMS', de: 'Entwicklung & CMS', fr: 'Développement et CMS' },
      { en: 'Design system', de: 'Design-System', fr: 'Système de design' },
      { en: '30 days support', de: '30 Tage Support', fr: '30 jours de support' },
    ],
    features: [
      {
        en: 'UX strategy and full UI design',
        de: 'UX-Strategie und vollständiges UI-Design',
        fr: 'Stratégie UX et design UI complet',
      },
      { en: 'Development and CMS', de: 'Entwicklung und CMS', fr: 'Développement et CMS' },
      {
        en: 'Design system you can reuse',
        de: 'Design-System, das Sie weiterverwenden können',
        fr: 'Système de design réutilisable',
      },
      {
        en: 'Weekly demos, fixed timeline',
        de: 'Wöchentliche Demos, fester Zeitplan',
        fr: 'Démos hebdomadaires, planning fixe',
      },
      {
        en: '30 days of support after launch',
        de: '30 Tage Support nach dem Launch',
        fr: '30 jours de support après le lancement',
      },
    ],
    highlight: true,
    tag: { en: 'Most popular', de: 'Am beliebtesten', fr: 'Le plus choisi' },
  },
  {
    key: 'premium',
    eyebrow: 'Premium',
    title: { en: 'SaaS & MVP', de: 'SaaS & MVP', fr: 'SaaS & MVP' },
    note: {
      en: 'A product, not a brochure. Dedicated team on your roadmap.',
      de: 'Ein Produkt, keine Broschüre. Ein festes Team für Ihre Roadmap.',
      fr: 'Un produit, pas une brochure. Une équipe dédiée à votre feuille de route.',
    },
    from: '$18,000',
    range: {
      en: 'Typical range $18,000 – $45,000',
      de: 'Üblicher Rahmen 18.000 – 45.000 $',
      fr: 'Fourchette habituelle 18 000 – 45 000 $',
    },
    incl: [
      { en: 'Product UX', de: 'Produkt-UX', fr: 'UX produit' },
      { en: 'Web app development', de: 'Web-App-Entwicklung', fr: 'Développement d’application web' },
      { en: 'Dedicated team', de: 'Festes Team', fr: 'Équipe dédiée' },
      { en: 'Ongoing iteration', de: 'Laufende Weiterentwicklung', fr: 'Itération continue' },
    ],
    features: [
      {
        en: 'Product UX and full design system',
        de: 'Produkt-UX und vollständiges Design-System',
        fr: 'UX produit et système de design complet',
      },
      {
        en: 'Web app development',
        de: 'Web-App-Entwicklung',
        fr: 'Développement d’application web',
      },
      {
        en: 'Onboarding and conversion work',
        de: 'Onboarding- und Conversion-Arbeit',
        fr: 'Travail sur l’onboarding et la conversion',
      },
      {
        en: 'Ongoing iteration after launch',
        de: 'Laufende Weiterentwicklung nach dem Launch',
        fr: 'Itération continue après le lancement',
      },
      {
        en: 'Priority access to the team',
        de: 'Bevorzugter Zugang zum Team',
        fr: 'Accès prioritaire à l’équipe',
      },
    ],
  },
]

/**
 * Матрица сравнения пакетов.
 * true — входит, false — нет, локализованная строка — входит с уточнением.
 */
export type FeatureValue = boolean | Localized

export type FeatureGroup = {
  title: Localized
  rows: Array<{ label: Localized; values: Record<PlanKey, FeatureValue> }>
}

export const comparison: FeatureGroup[] = [
  {
    title: { en: 'Scope', de: 'Umfang', fr: 'Périmètre' },
    rows: [
      {
        label: { en: 'Pages or screens', de: 'Seiten oder Screens', fr: 'Pages ou écrans' },
        values: {
          starter: { en: '1 landing page', de: '1 Landingpage', fr: '1 landing page' },
          business: { en: 'Up to 8 pages', de: 'Bis zu 8 Seiten', fr: 'Jusqu’à 8 pages' },
          premium: { en: 'Product scope', de: 'Produktumfang', fr: 'Périmètre produit' },
        },
      },
      {
        label: { en: 'Time to live', de: 'Zeit bis live', fr: 'Délai de mise en ligne' },
        values: {
          starter: { en: '2 weeks', de: '2 Wochen', fr: '2 semaines' },
          business: { en: '4–6 weeks', de: '4–6 Wochen', fr: '4–6 semaines' },
          premium: { en: 'From 10 weeks', de: 'Ab 10 Wochen', fr: 'À partir de 10 semaines' },
        },
      },
      {
        label: {
          en: 'Fixed scope and price',
          de: 'Fester Umfang und Preis',
          fr: 'Périmètre et prix fixes',
        },
        values: {
          starter: true,
          business: true,
          premium: { en: 'Per milestone', de: 'Pro Meilenstein', fr: 'Par jalon' },
        },
      },
    ],
  },
  {
    title: { en: 'Design', de: 'Design', fr: 'Design' },
    rows: [
      {
        label: {
          en: 'Discovery and strategy session',
          de: 'Discovery- und Strategie-Session',
          fr: 'Session de découverte et stratégie',
        },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: {
          en: 'UX research — interviews, testing',
          de: 'UX-Research — Interviews, Tests',
          fr: 'Recherche UX — entretiens, tests',
        },
        values: { starter: false, business: true, premium: true },
      },
      {
        label: { en: 'UI design', de: 'UI-Design', fr: 'Design UI' },
        values: {
          starter: { en: 'Landing only', de: 'Nur Landingpage', fr: 'Landing uniquement' },
          business: { en: 'Full site', de: 'Gesamte Website', fr: 'Site entier' },
          premium: { en: 'Full product', de: 'Gesamtes Produkt', fr: 'Produit entier' },
        },
      },
      {
        label: { en: 'Design system', de: 'Design-System', fr: 'Système de design' },
        values: {
          starter: false,
          business: { en: 'Reusable basics', de: 'Wiederverwendbare Basis', fr: 'Base réutilisable' },
          premium: { en: 'Full, documented', de: 'Vollständig, dokumentiert', fr: 'Complet, documenté' },
        },
      },
      {
        label: { en: 'Clickable prototype', de: 'Klickbarer Prototyp', fr: 'Prototype cliquable' },
        values: { starter: false, business: true, premium: true },
      },
    ],
  },
  {
    title: { en: 'Build', de: 'Umsetzung', fr: 'Réalisation' },
    rows: [
      {
        label: { en: 'Development', de: 'Entwicklung', fr: 'Développement' },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: {
          en: 'Mobile-first and performance budget',
          de: 'Mobile-first und Performance-Budget',
          fr: 'Mobile-first et budget de performance',
        },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: {
          en: 'CMS you can edit yourself',
          de: 'CMS, das Sie selbst pflegen',
          fr: 'CMS que vous pouvez modifier vous-même',
        },
        values: { starter: false, business: true, premium: true },
      },
      {
        label: {
          en: 'Third-party integrations',
          de: 'Integrationen von Drittanbietern',
          fr: 'Intégrations tierces',
        },
        values: { starter: false, business: true, premium: true },
      },
      {
        label: {
          en: 'Web app, dashboards, auth',
          de: 'Web-App, Dashboards, Login',
          fr: 'Application web, tableaux de bord, authentification',
        },
        values: { starter: false, business: false, premium: true },
      },
    ],
  },
  {
    title: { en: 'Launch and after', de: 'Launch und danach', fr: 'Lancement et après' },
    rows: [
      {
        label: {
          en: 'Analytics and events set up',
          de: 'Analytics und Events eingerichtet',
          fr: 'Analytique et événements configurés',
        },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: {
          en: 'Built to be A/B tested',
          de: 'Für A/B-Tests gebaut',
          fr: 'Conçu pour l’A/B testing',
        },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: {
          en: 'Weekly demos on a live link',
          de: 'Wöchentliche Demos auf einem Live-Link',
          fr: 'Démos hebdomadaires sur un lien live',
        },
        values: { starter: true, business: true, premium: true },
      },
      {
        label: { en: 'Support after launch', de: 'Support nach dem Launch', fr: 'Support après lancement' },
        values: {
          starter: false,
          business: { en: '30 days', de: '30 Tage', fr: '30 jours' },
          premium: { en: 'Ongoing', de: 'Laufend', fr: 'En continu' },
        },
      },
      {
        label: {
          en: 'Priority access to the team',
          de: 'Bevorzugter Zugang zum Team',
          fr: 'Accès prioritaire à l’équipe',
        },
        values: { starter: false, business: false, premium: true },
      },
    ],
  },
]
