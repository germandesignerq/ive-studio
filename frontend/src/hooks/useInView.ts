import { useEffect, useRef, useState } from 'react'

/** Один раз ловим появление элемента во вьюпорте и больше за ним не следим. */
export function useInView<T extends HTMLElement>(threshold = 0.1, rootMargin = '0px 0px -6% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, threshold, rootMargin])

  return { ref, inView }
}
