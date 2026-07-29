import { avatars } from '@/data/avatars'
import { reviews, type Review } from '@/data/reviews'
import { Star } from './icons'

function Card({ review }: { review: Review }) {
  return (
    <figure className="tst-card glow-top p-[28px_28px_24px]">
      <div className="mb-4 flex gap-[3px] text-gold" aria-label="5 out of 5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} />
        ))}
      </div>
      <blockquote className="flex-1 text-[18px] leading-[1.45] tracking-[-.015em]">
        {review.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-[13px] border-t border-line pt-5">
        {review.img ? (
          <img className="ava h-12 w-12 flex-none rounded-full object-cover" src={review.img} alt={review.name} />
        ) : (
          <div
            className="ava ava-init grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-full p-[9px]"
            style={{ '--c': review.color } as React.CSSProperties}
            aria-hidden
          >
            {avatars[review.avatar]}
          </div>
        )}
        <div>
          <b className="block text-[16.5px] font-semibold tracking-[-.01em]">{review.name}</b>
          <span className="block text-[14px] text-fg-3">{review.role}</span>
        </div>
      </figcaption>
    </figure>
  )
}

/** Бесконечная лента: два одинаковых блока подряд дают бесшовную петлю. */
export function Testimonials() {
  const half = (
    <div className="flex gap-4 pr-4 max-[680px]:gap-3 max-[680px]:pr-3">
      {reviews.map((r) => (
        <Card key={r.name} review={r} />
      ))}
    </div>
  )

  return (
    <div className="tst-marquee mt-[38px] py-[14px]">
      <div className="tst-track">
        {half}
        {half}
      </div>
    </div>
  )
}
