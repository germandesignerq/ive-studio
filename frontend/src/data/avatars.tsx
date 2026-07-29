import type { ReactElement } from 'react'

/**
 * Иллюстрированные аватары-заглушки для отзывов.
 * Абстрактный силуэт вместо фото реального человека — так подпись
 * под цитатой не приписывает слова конкретному чужому лицу.
 * Каждый рисуется штрихом при появлении (тот же приём, что у логотипов
 * партнёров и иконок в блоке Results): pathLength={1} + класс .draw.
 *
 * Чтобы заменить на настоящее фото клиента: в src/data/reviews.ts
 * задайте review.img — компонент Testimonials сам подставит <img>
 * вместо иллюстрации.
 */
export type AvatarKey = 'mark' | 'ana' | 'daniel' | 'priya' | 'tom' | 'sofia'

const bust = {
  fill: 'none',
  stroke: '#0B0B0C',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  opacity: 0.82,
}

export const avatars: Record<AvatarKey, ReactElement> = {
  // короткие волосы, круглый ворот
  mark: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M20 46c1-9 5.5-14 12-14s11 5 12 14" />
      <circle pathLength={1} {...bust} cx="32" cy="26" r="10" />
      <path pathLength={1} {...bust} d="M22.5 21c4-3 15-3 19 0" opacity=".55" />
    </svg>
  ),

  // волнистые волосы, V-образный вырез
  ana: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M18 47c2-8 6-13 14-13s12 5 14 13" />
      <path pathLength={1} {...bust} d="M32 34c-9 0-11-7-11-11 0-6 5-10 11-10s11 4 11 10c0 4-2 11-11 11z" />
      <path pathLength={1} {...bust} d="M21.5 15c1 4 0 8-2.5 10M42.5 15c-1 4 0 8 2.5 10" opacity=".55" />
      <path pathLength={1} {...bust} d="M27 47l5-6 5 6" opacity=".5" />
    </svg>
  ),

  // пробор набок, воротник рубашки
  daniel: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M19 47c1.5-9 6-14 13-14s11.5 5 13 14" />
      <circle pathLength={1} {...bust} cx="32" cy="25" r="9.5" />
      <path pathLength={1} {...bust} d="M23 19c4-4 15-2 17 2" opacity=".55" />
      <path pathLength={1} {...bust} d="M26 47l6-5 6 5" opacity=".5" />
    </svg>
  ),

  // собранные волосы, круглый вырез
  priya: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M18.5 47c2-8.5 6-13.5 13.5-13.5s11.5 5 13.5 13.5" />
      <circle pathLength={1} {...bust} cx="32" cy="25" r="9.5" />
      <path pathLength={1} {...bust} d="M22 21c1-5 5-8 10-8s9 3 10 8" opacity=".55" />
      <circle pathLength={1} {...bust} cx="32" cy="13.5" r="2.6" opacity=".5" />
    </svg>
  ),

  // короткая стрижка, круглый ворот в стиле поло
  tom: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M19.5 47c1.5-8.5 5.5-13.5 12.5-13.5s11 5 12.5 13.5" />
      <circle pathLength={1} {...bust} cx="32" cy="25.5" r="9.5" />
      <path pathLength={1} {...bust} d="M23 20.5c3.5-3 14-3 18 0" opacity=".55" />
      <path pathLength={1} {...bust} d="M28.5 44.5l3.5 3.5 3.5-3.5" opacity=".5" />
    </svg>
  ),

  // прямые волосы каре, блузка
  sofia: (
    <svg viewBox="0 0 64 64" className="draw h-full w-full">
      <path pathLength={1} {...bust} d="M18 47c2-8 6-13 14-13s12 5 14 13" />
      <path pathLength={1} {...bust} d="M32 33c-8.5 0-10.5-6.5-10.5-11 0-5.5 4.5-9.5 10.5-9.5s10.5 4 10.5 9.5c0 4.5-2 11-10.5 11z" />
      <path pathLength={1} {...bust} d="M21.5 22v8M42.5 22v8" opacity=".55" />
      <path pathLength={1} {...bust} d="M25 46.5c4 2.5 10 2.5 14 0" opacity=".5" />
    </svg>
  ),
}
