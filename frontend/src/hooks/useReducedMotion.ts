import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Системная настройка «уменьшить движение» — уважаем её во всех анимациях.
 *
 * Первый рендер всегда false: страницы отдаются пререндером, и если бы значение
 * читалось сразу, разметка сервера и клиента разошлись бы. Реальное значение
 * приезжает в эффекте — до первого кадра анимации.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = matchMedia(QUERY)
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
