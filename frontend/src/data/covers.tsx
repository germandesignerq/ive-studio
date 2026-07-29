import type { ReactElement } from 'react'

/** Сгенерированные обложки проектов. Меняются на скриншоты — просто задайте img в works.ts. */
export type CoverKey = 'arcs' | 'grid' | 'bars' | 'wave' | 'flow' | 'burst' | 'blocks' | 'spark'

const frame = { viewBox: '0 0 800 500', preserveAspectRatio: 'xMidYMid slice' } as const
const shell = 'absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms]'

const range = (n: number) => Array.from({ length: n }, (_, i) => i)

export const covers: Record<CoverKey, ReactElement> = {
  arcs: (
    <svg {...frame} className={shell}>
      <defs>
        <linearGradient id="cv-arcs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1A1712" />
          <stop offset="1" stopColor="#0C0C0E" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#cv-arcs)" />
      <g fill="none" stroke="#E9C97F" strokeWidth="1.2">
        {[60, 110, 160, 210, 260].map((r, i) => (
          <circle key={r} cx="400" cy="250" r={r} opacity={[0.9, 0.6, 0.4, 0.25, 0.14][i]} />
        ))}
      </g>
      <circle cx="400" cy="250" r="26" fill="#E9C97F" />
    </svg>
  ),

  grid: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#0E0E11" />
      <g fill="#E9C97F">
        {range(126).map((i) => (
          <circle
            key={i}
            cx={60 + (i % 14) * 52}
            cy={50 + Math.floor(i / 14) * 52}
            r={(1.6 + 3.4 * Math.abs(Math.sin(i * 0.7))).toFixed(1)}
            opacity={(0.15 + 0.55 * Math.abs(Math.cos(i * 0.5))).toFixed(2)}
          />
        ))}
      </g>
    </svg>
  ),

  bars: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#0D0D10" />
      {range(8).map((i) => {
        const h = 70 + Math.abs(Math.sin(i * 1.3)) * 300
        return (
          <rect
            key={i}
            x={70 + i * 88}
            y={430 - h}
            width="46"
            height={h}
            rx="12"
            fill="#E9C97F"
            opacity={(0.16 + i * 0.09).toFixed(2)}
          />
        )
      })}
      <rect y="430" width="800" height="1" fill="rgba(255,255,255,.12)" />
    </svg>
  ),

  wave: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#0B0C0F" />
      <g fill="none" stroke="#E9C97F">
        {range(16).map((i) => {
          const o = i * 20
          return (
            <path
              key={i}
              d={`M-20 ${140 + o} C 180 ${60 + o}, 300 ${300 + o}, 500 ${200 + o} S 760 ${
                120 + o
              }, 820 ${180 + o}`}
              opacity={(0.5 - i * 0.028).toFixed(2)}
              strokeWidth="1.1"
            />
          )
        })}
      </g>
    </svg>
  ),

  flow: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#101014" />
      <g stroke="rgba(233,201,127,.5)" strokeWidth="1.4" fill="none">
        <path d="M190 250h110M420 250h110" />
      </g>
      <g fill="none" stroke="#E9C97F">
        <rect x="70" y="180" width="120" height="140" rx="16" opacity=".9" />
        <rect x="300" y="180" width="120" height="140" rx="16" opacity=".55" />
        <rect x="530" y="180" width="120" height="140" rx="16" opacity=".3" />
      </g>
      <rect x="70" y="180" width="120" height="140" rx="16" fill="#E9C97F" opacity=".12" />
    </svg>
  ),

  burst: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#0C0C0F" />
      <g stroke="#E9C97F" strokeWidth="1.3">
        {range(44).map((i) => {
          const a = (i / 44) * Math.PI * 2
          const r2 = 150 + Math.abs(Math.sin(i * 0.9)) * 180
          return (
            <line
              key={i}
              x1={(400 + Math.cos(a) * 60).toFixed(1)}
              y1={(250 + Math.sin(a) * 60).toFixed(1)}
              x2={(400 + Math.cos(a) * r2).toFixed(1)}
              y2={(250 + Math.sin(a) * r2).toFixed(1)}
              opacity={(0.18 + 0.5 * Math.abs(Math.cos(i * 0.4))).toFixed(2)}
            />
          )
        })}
      </g>
    </svg>
  ),

  blocks: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#101013" />
      <rect x="70" y="70" width="300" height="360" rx="18" fill="#E9C97F" opacity=".85" />
      <rect x="400" y="70" width="330" height="165" rx="18" fill="#E9C97F" opacity=".38" />
      <rect x="400" y="265" width="330" height="165" rx="18" fill="#E9C97F" opacity=".18" />
    </svg>
  ),

  spark: (
    <svg {...frame} className={shell}>
      <rect width="800" height="500" fill="#0A0A0C" />
      <g fill="#E9C97F">
        <path
          d="M400 110c12 68 68 124 136 136-68 12-124 68-136 136-12-68-68-124-136-136 68-12 124-68 136-136z"
          opacity=".95"
        />
        <path
          d="M620 300c5 27 27 49 54 54-27 5-49 27-54 54-5-27-27-49-54-54 27-5 49-27 54-54z"
          opacity=".45"
        />
        <path
          d="M190 130c4 20 20 36 40 40-20 4-36 20-40 40-4-20-20-36-40-40 20-4 36-20 40-40z"
          opacity=".3"
        />
      </g>
    </svg>
  ),
}
