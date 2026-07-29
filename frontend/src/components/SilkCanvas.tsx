import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LINES = 32

/** Шёлковые золотые линии на фоне героя и финального CTA. */
export function SilkCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf: number | null = null

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < LINES; i++) {
        const k = i / LINES
        const baseY = h * 0.52 + (k - 0.5) * h * 0.8
        const amp = h * 0.11 * (0.35 + k * 1.1)
        const freq = ((0.9 + k * 0.7) / w) * Math.PI * 2
        const ph = t * 0.00013 * (0.5 + k) + i * 0.42
        const a = 0.05 + 0.24 * Math.pow(Math.sin(k * Math.PI), 1.4)

        const g = ctx.createLinearGradient(0, 0, w, 0)
        g.addColorStop(0, 'rgba(233,201,127,0)')
        g.addColorStop(0.28, `rgba(233,201,127,${(a * 0.7).toFixed(3)})`)
        g.addColorStop(0.55, `rgba(246,232,197,${a.toFixed(3)})`)
        g.addColorStop(0.8, `rgba(233,201,127,${(a * 0.55).toFixed(3)})`)
        g.addColorStop(1, 'rgba(233,201,127,0)')

        ctx.strokeStyle = g
        ctx.lineWidth = 0.7 + k * 1.1
        ctx.beginPath()
        for (let x = 0; x <= w; x += 8) {
          const y =
            baseY + Math.sin(x * freq + ph) * amp + Math.sin(x * freq * 0.43 + ph * 1.7) * amp * 0.42
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const loop = (t: number) => {
      draw(t)
      if (!reduced) raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      size()
      if (reduced) draw(4000)
    }

    size()
    if (reduced) draw(4000)
    else raf = requestAnimationFrame(loop)

    addEventListener('resize', onResize)
    return () => {
      removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return <canvas ref={ref} className={`absolute inset-0 block h-full w-full ${className}`} />
}

/** Затемняющая вуаль поверх канваса, чтобы текст читался. */
export function HeroVeil({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          'radial-gradient(120% 75% at 50% 0%,rgba(10,10,11,.92) 0%,rgba(10,10,11,.3) 46%,transparent 72%),linear-gradient(180deg,transparent 55%,#0A0A0B 97%)',
      }}
    />
  )
}
