import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
const DURATION = 1500

/**
 * Цифра, которая докручивается при появлении.
 * Строка режется на числа и всё остальное: «4:20 → 1:50» и «140+» работают одинаково.
 */
export function Counter({ value, delay = 0 }: { value: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.5)
  const reduced = useReducedMotion()
  const raf = useRef<number | null>(null)

  const parts = value.split(/(\d+(?:[.,]\d+)?)/).filter(Boolean)
  const zeroed = parts.map((part) => (/^\d/.test(part) ? '0' : part)).join('')
  const [text, setText] = useState(zeroed)

  useEffect(() => {
    if (!inView || reduced) return

    const start = performance.now() + delay
    const render = (now: number) => {
      const p = Math.min(Math.max((now - start) / DURATION, 0), 1)
      const e = easeOutExpo(p)
      setText(
        parts
          .map((part) =>
            /^\d/.test(part)
              ? String(Math.round(parseFloat(part.replace(',', '.')) * e))
              : part,
          )
          .join(''),
      )
      if (p < 1) raf.current = requestAnimationFrame(render)
    }
    raf.current = requestAnimationFrame(render)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, delay])

  return (
    <b
      ref={ref as React.Ref<HTMLElement>}
      className="block leading-none font-semibold tracking-[-.05em] text-gold tabular-nums"
    >
      {reduced ? value : text}
    </b>
  )
}
