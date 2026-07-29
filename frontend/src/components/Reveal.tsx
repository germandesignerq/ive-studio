import type { ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type RevealProps = {
  children: ReactNode
  /** тег обёртки: div по умолчанию */
  as?: ElementType
  className?: string
  /** ступенчатая задержка внутри группы, мс */
  delay?: number
  threshold?: number
  style?: React.CSSProperties
}

/** Обёртка «проявиться при скролле». Логика та же, что была на .rv в статике. */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold = 0.1,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(threshold)

  return (
    <Tag
      ref={ref}
      className={`rv ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
