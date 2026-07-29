import type { ReactElement } from 'react'

/**
 * Обложки статей: генерируемые SVG, по одной на пост.
 * Ничего не грузится по сети и не зависит от лицензий на фото.
 * Чтобы заменить на настоящую картинку — положите файл в /public
 * и подставьте <img> там, где вызывается PostCover.
 */
export type PostCoverKey =
  | 'chart'
  | 'system'
  | 'dropoff'
  | 'timeline'
  | 'plans'
  | 'checklist'
  | 'motion'
  | 'duotone'
  | 'seam'

const G = '#E9C97F'
const range = (n: number) => Array.from({ length: n }, (_, i) => i)

/** Общая сетка-подложка, чтобы обложки читались как одна серия. */
const gridLines = (
  <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
    <path d="M0 100h800M0 200h800M0 300h800M0 400h800" />
  </g>
)

const bg = (id: string) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1A1712" />
        <stop offset="1" stopColor="#0B0B0D" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill={`url(#${id})`} />
  </>
)

const covers: Record<PostCoverKey, ReactElement> = {
  /* Конверсия: линия, которая наконец пошла вверх. */
  chart: (
    <>
      {bg('pc-chart')}
      {gridLines}
      <g fill="none" stroke={G} strokeWidth="1.4">
        <path d="M60 420 L200 300 L340 350 L480 180 L620 240 L760 90" opacity=".95" />
        <path d="M60 450 L200 400 L340 420 L480 380 L620 400 L760 340" opacity=".3" />
      </g>
      <g fill={G}>
        <circle cx="200" cy="300" r="7" />
        <circle cx="340" cy="350" r="7" />
        <circle cx="480" cy="180" r="7" />
        <circle cx="620" cy="240" r="7" />
        <circle cx="760" cy="90" r="9" />
      </g>
    </>
  ),

  /* Дизайн-система: ровная сетка, из которой начали выпадать элементы. */
  system: (
    <>
      {bg('pc-system')}
      <g>
        {range(15).map((i) => {
          const col = i % 5
          const row = Math.floor(i / 5)
          const drift = i > 9 ? (i - 9) * 6 : 0
          const x = 90 + col * 130 + drift
          const y = 110 + row * 120 + drift * 0.6
          const faded = i > 9
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="96"
              height="80"
              rx="14"
              fill={faded ? 'none' : G}
              stroke={G}
              strokeWidth="1.4"
              strokeDasharray={faded ? '5 5' : undefined}
              opacity={faded ? 0.38 : 0.22 + col * 0.12}
              transform={faded ? `rotate(${(i - 9) * 2.5} ${x + 48} ${y + 40})` : undefined}
            />
          )
        })}
      </g>
    </>
  ),

  /* Онбординг: колонки точек, до конца доходят единицы. */
  dropoff: (
    <>
      {bg('pc-dropoff')}
      {gridLines}
      {range(5).map((col) => {
        const left = 8 - col * 1.4
        const count = Math.max(2, Math.round(left))
        return (
          <g key={col} fill={G}>
            {range(count).map((r) => (
              <circle
                key={r}
                cx={110 + col * 145}
                cy={410 - r * 44}
                r="9"
                opacity={0.28 + col * 0.16}
              />
            ))}
          </g>
        )
      })}
      <path
        d="M110 400 C 260 360, 400 300, 690 200"
        fill="none"
        stroke={G}
        strokeWidth="1.6"
        opacity=".5"
        strokeDasharray="7 7"
      />
    </>
  ),

  /* Шесть недель: гантт из шести блоков. */
  timeline: (
    <>
      {bg('pc-timeline')}
      <g stroke="rgba(255,255,255,.07)" strokeWidth="1">
        {range(7).map((i) => (
          <path key={i} d={`M${70 + i * 110} 90V430`} />
        ))}
      </g>
      {[
        { x: 70, w: 210, y: 130 },
        { x: 180, w: 330, y: 200 },
        { x: 400, w: 220, y: 270 },
        { x: 510, w: 220, y: 340 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height="42"
          rx="12"
          fill={G}
          opacity={0.24 + i * 0.18}
        />
      ))}
      <path d="M730 80V440" stroke={G} strokeWidth="2.5" opacity=".9" />
    </>
  ),

  /* Тарифы: три колонки, средняя выбрана. */
  plans: (
    <>
      {bg('pc-plans')}
      {[
        { x: 90, h: 240, o: 0.22 },
        { x: 310, h: 320, o: 0.9 },
        { x: 530, h: 240, o: 0.22 },
      ].map((c, i) => (
        <g key={i}>
          <rect
            x={c.x}
            y={430 - c.h}
            width="180"
            height={c.h}
            rx="18"
            fill={i === 1 ? G : 'none'}
            stroke={G}
            strokeWidth="1.6"
            opacity={c.o}
          />
          {range(3).map((r) => (
            <rect
              key={r}
              x={c.x + 28}
              y={430 - c.h + 60 + r * 34}
              width={124 - r * 26}
              height="10"
              rx="5"
              fill={i === 1 ? '#0B0B0D' : G}
              opacity={i === 1 ? 0.45 : 0.3}
            />
          ))}
        </g>
      ))}
    </>
  ),

  /* Девять вопросов: часть отмечена, часть нет. */
  checklist: (
    <>
      {bg('pc-checklist')}
      {range(9).map((i) => {
        const y = 70 + i * 42
        const done = i < 5
        return (
          <g key={i}>
            <rect
              x="120"
              y={y}
              width="26"
              height="26"
              rx="8"
              fill={done ? G : 'none'}
              stroke={G}
              strokeWidth="1.5"
              opacity={done ? 0.85 : 0.3}
            />
            {done && (
              <path
                d={`M126 ${y + 13} l6 6 10 -12`}
                fill="none"
                stroke="#0B0B0D"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <rect
              x="172"
              y={y + 8}
              width={340 - (i % 3) * 70}
              height="10"
              rx="5"
              fill={G}
              opacity={done ? 0.42 : 0.16}
            />
          </g>
        )
      })}
    </>
  ),

  /* Анимация: кривая скорости и хвост из «призрачных» кадров. */
  motion: (
    <>
      {bg('pc-motion')}
      {gridLines}
      {range(7).map((i) => (
        <rect
          key={i}
          x={90 + i * 92}
          y={300 - i * 26}
          width="62"
          height="62"
          rx="16"
          fill={G}
          opacity={0.08 + i * 0.13}
        />
      ))}
      <path
        d="M110 400 C 320 400, 380 150, 700 150"
        fill="none"
        stroke={G}
        strokeWidth="2"
        opacity=".75"
      />
      <circle cx="110" cy="400" r="6" fill={G} />
      <circle cx="700" cy="150" r="8" fill={G} />
    </>
  ),

  /* Тёмная тема: одна и та же сетка в двух полярностях. */
  duotone: (
    <>
      {bg('pc-duotone')}
      <rect x="0" y="0" width="400" height="500" fill="#F3F1ED" opacity=".9" />
      {range(2).map((side) =>
        range(4).map((i) => (
          <rect
            key={`${side}-${i}`}
            x={side === 0 ? 70 : 470}
            y={110 + i * 78}
            width={260 - (i % 2) * 70}
            height="30"
            rx="10"
            fill={side === 0 ? '#0B0B0D' : G}
            opacity={side === 0 ? 0.14 + i * 0.16 : 0.22 + i * 0.2}
          />
        )),
      )}
      <circle cx="400" cy="250" r="70" fill="#0B0B0D" />
      <path d="M400 180 A70 70 0 0 1 400 320 Z" fill={G} />
      <circle cx="400" cy="250" r="70" fill="none" stroke={G} strokeWidth="2" />
    </>
  ),

  /* Хендофф: два куска, которые не сходятся по шву. */
  seam: (
    <>
      {bg('pc-seam')}
      <g>
        {range(4).map((i) => (
          <rect
            key={`l-${i}`}
            x={80}
            y={110 + i * 80}
            width="270"
            height="52"
            rx="12"
            fill="none"
            stroke={G}
            strokeWidth="1.5"
            opacity={0.55 - i * 0.08}
          />
        ))}
        {range(4).map((i) => (
          <rect
            key={`r-${i}`}
            x={450}
            y={132 + i * 80}
            width="270"
            height="52"
            rx="12"
            fill={G}
            opacity={0.3 - i * 0.05}
          />
        ))}
      </g>
      <path d="M400 60V440" stroke={G} strokeWidth="2" strokeDasharray="10 10" opacity=".85" />
    </>
  ),
}

/** Обложка статьи. Ключ берётся из поля cover в src/data/posts.ts */
export function PostCover({ name, className = '' }: { name: PostCoverKey; className?: string }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {covers[name]}
    </svg>
  )
}

/**
 * Визуал статьи: фотография, если она есть, иначе рисованная обложка.
 * Одна точка входа на все три места, где показывается пост.
 */
export function PostVisual({
  post,
  className = '',
  loading,
}: {
  post: { cover: PostCoverKey; image?: string; title: string }
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  if (post.image) {
    return <img src={post.image} alt="" aria-hidden loading={loading} className={className} />
  }
  return <PostCover name={post.cover} className={className} />
}
