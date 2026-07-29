import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Золотое пятно, которое с запаздыванием тянется за курсором.
 * Возвращает ref, который вешается на секцию с классом .glow.
 */
export function useFollowGlow<T extends HTMLElement>(defaultX = 50, defaultY = 44) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !matchMedia('(hover:hover)').matches) return

    let tx = defaultX
    let ty = defaultY
    let cx = defaultX
    let cy = defaultY
    let raf: number | null = null

    const step = () => {
      cx += (tx - cx) * 0.09 // запаздывание: меньше — плавнее
      cy += (ty - cy) * 0.09
      el.style.setProperty('--mx', `${cx.toFixed(2)}%`)
      el.style.setProperty('--my', `${cy.toFixed(2)}%`)
      raf =
        Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(step) : null
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 100
      ty = ((e.clientY - r.top) / r.height) * 100
      if (!raf) raf = requestAnimationFrame(step)
    }
    const onLeave = () => {
      tx = defaultX
      ty = defaultY
      if (!raf) raf = requestAnimationFrame(step)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [defaultX, defaultY, reduced])

  return ref
}
