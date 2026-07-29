import { useEffect, useState } from 'react'

/** Порог включения выше порога выключения — чтобы шапка не мигала. */
export function useStickyNav(): boolean {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setStuck((prev) => {
        if (!prev && scrollY > 48) return true
        if (prev && scrollY < 12) return false
        return prev
      })
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return stuck
}
