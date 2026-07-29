import type { ReactElement } from 'react'

/**
 * Логотипы партнёров — заглушки.
 * Все знаки штриховые и с pathLength={1}, поэтому прорисовываются
 * той же анимацией, что иконки в блоке Results.
 *
 * Как заменить на настоящий логотип: положите SVG в /public/partners/
 * и вместо mark укажите logo: '/partners/name.svg' — компонент Partners
 * сам отрисует картинку вместо знака.
 */
export type Partner = {
  name: string
  /** чем занимается — короткая подпись под названием */
  note: string
  /** нарисованный знак-заглушка */
  mark?: ReactElement
  /** путь к настоящему логотипу; если задан, используется вместо mark */
  logo?: string
  /** сайт партнёра */
  url?: string
}

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const partners: Partner[] = [
  {
    name: 'Nordwell',
    note: 'Business banking',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <circle pathLength={1} cx="20" cy="20" r="14" opacity=".45" />
        <path pathLength={1} d="M13 27V13l14 14V13" />
      </svg>
    ),
  },
  {
    name: 'Verity',
    note: 'Insurance platform',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <path pathLength={1} d="M20 5.5 34 20 20 34.5 6 20z" opacity=".45" />
        <path pathLength={1} d="M14 18.5 20 26l6-11" />
      </svg>
    ),
  },
  {
    name: 'Cobalt',
    note: 'Logistics',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <path pathLength={1} d="M20 5 33 12.5v15L20 35 7 27.5v-15z" opacity=".45" />
        <path pathLength={1} d="M20 12.5 27 16.5v8L20 28.5 13 24.5v-8z" />
      </svg>
    ),
  },
  {
    name: 'Meridian',
    note: 'Travel tech',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <circle pathLength={1} cx="20" cy="20" r="14" opacity=".45" />
        <ellipse pathLength={1} cx="20" cy="20" rx="6" ry="14" />
        <path pathLength={1} d="M6.6 15.5h26.8M6.6 24.5h26.8" opacity=".7" />
      </svg>
    ),
  },
  {
    name: 'Halcyon',
    note: 'Health records',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <path pathLength={1} d="M5 27c6-13 24-13 30 0" opacity=".45" />
        <path pathLength={1} d="M11 27c4-8 14-8 18 0" />
        <circle pathLength={1} cx="20" cy="27" r="2.6" />
      </svg>
    ),
  },
  {
    name: 'Kestrel',
    note: 'Fintech',
    mark: (
      <svg viewBox="0 0 40 40" {...s}>
        <path pathLength={1} d="M6 24 20 8l14 16" />
        <path pathLength={1} d="M11 31l9-10 9 10" opacity=".45" />
      </svg>
    ),
  },
]
