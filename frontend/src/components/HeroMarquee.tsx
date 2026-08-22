import { works } from '@/data/works'
import { Picture } from '@/components/Picture'

/**
 * Лента скриншотов проектов в шапке: едет сама, на ховер замирает.
 * Берём только те работы, у которых есть настоящий скриншот — рисованные
 * обложки в этой ленте выглядели бы чужеродно.
 *
 * Дублируем список дважды: вторая копия догоняет первую, и петля не рвётся.
 */
const shots = works.filter((w) => w.img)

export function HeroMarquee() {
  const half = (
    <div className="hero-marq-half" aria-hidden={undefined}>
      {shots.map((w) => (
        <Shot key={w.slug} name={w.name} img={w.img!} url={w.url} />
      ))}
    </div>
  )

  return (
    <div className="hero-marq relative z-[2] mt-[50px] max-[680px]:mt-[26px]">
      <div className="hero-marq-track">
        {half}
        {/* копия для бесшовной петли — от скринридера прячем */}
        <div className="hero-marq-half" aria-hidden>
          {shots.map((w) => (
            <Shot key={w.slug} name={w.name} img={w.img!} url={w.url} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Shot({ name, img, url }: { name: string; img: string; url?: string }) {
  const inner = (
    <Picture
      src={img}
      alt={name}
      sizes="(max-width: 680px) 232px, 310px"
      className="h-full w-full object-cover object-top"
    />
  )

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="hero-shot"
    >
      {inner}
    </a>
  ) : (
    <span className="hero-shot">{inner}</span>
  )
}
