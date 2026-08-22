import { imageSets } from '@/data/images.generated'

type PictureProps = {
  /** путь к исходному JPEG — он же фолбэк: '/work-alice.jpg' */
  src: string
  alt: string
  className?: string
  /** ширина картинки на экране — по ней браузер выбирает вариант из srcset */
  sizes?: string
  loading?: 'lazy' | 'eager'
  /** true для LCP-картинки: браузер заберёт её первой */
  priority?: boolean
}

/**
 * Картинка в трёх форматах: AVIF → WebP → исходный JPEG.
 * Браузер берёт первый формат, который понимает, и внутри него — вариант
 * под свою ширину и плотность экрана: обложка размером 310 px больше
 * не тянет полуторамегабайтный оригинал.
 *
 * Варианты и размеры лежат в сгенерированном images.generated.ts;
 * если картинки там нет (например, добавили и забыли прогнать скрипт),
 * компонент просто отдаёт обычный <img> — страница не ломается.
 *
 * `display: contents` у <picture> убирает саму обёртку из раскладки,
 * поэтому классы и позиционирование остаются на <img>, как было.
 */
export function Picture({ src, alt, className = '', sizes, loading, priority }: PictureProps) {
  const set = imageSets[src]

  const img = (
    <img
      src={src}
      alt={alt}
      width={set?.width}
      height={set?.height}
      sizes={set ? sizes : undefined}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
    />
  )

  if (!set) return img

  const srcSet = (format: 'avif' | 'webp') =>
    set.widths.map((w) => `${set.base}-${w}.${format} ${w}w`).join(', ')

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      {img}
    </picture>
  )
}
