import { useEffect, useState } from 'react'

/**
 * Определяет, над какой секцией находится читатель.
 * Активной считается последняя секция, чей верх уже прошёл линию offset —
 * поэтому в промежуточных блоках без своего пункта меню подсветка
 * остаётся на предыдущем пункте, а не гаснет.
 */
export function useScrollSpy(ids: readonly string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let raf: number | null = null

    const compute = () => {
      raf = null
      let current: string | null = null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }

      // у самого низа страницы последняя секция может так и не дойти
      // до линии offset — подсвечиваем её принудительно
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        for (let i = ids.length - 1; i >= 0; i--) {
          if (document.getElementById(ids[i])) {
            current = ids[i]
            break
          }
        }
      }

      setActive(current)
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(compute)
    }

    compute()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [ids, offset])

  return active
}
