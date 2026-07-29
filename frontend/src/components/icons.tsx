type IconProps = { size?: number; className?: string; strokeWidth?: number }

const base = (size: number, strokeWidth: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  className,
  'aria-hidden': true as const,
})

export const ArrowRight = ({ size = 15, className, strokeWidth = 2.2 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
)

export const ArrowLeft = ({ size = 15, className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </svg>
)

export const Check = ({ size = 17, className, strokeWidth = 2.4 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M4 12.5l5.5 5.5L20 7" />
  </svg>
)

export const Close = ({ size = 16, className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const Burger = ({ size = 24, className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M3 7h18M3 17h18" />
  </svg>
)

export const Star = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
  </svg>
)

export const Telegram = ({ size = 20, className, strokeWidth = 1.7 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.5 3.5 3 10.7c-.9.37-.9 1.66.02 2.01l4.1 1.56 1.6 5.06c.2.62 1 .8 1.45.32l2.24-2.4 4.2 3.1c.66.49 1.6.13 1.78-.68l3-13.9c.2-.9-.7-1.63-1.5-1.3Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.7 15.1 17.5 8" />
  </svg>
)

export const Instagram = ({ size = 20, className, strokeWidth = 1.7 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const Linkedin = ({ size = 20, className, strokeWidth = 1.7 }: IconProps) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10.5v6M8 7.8v.1" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5v-3.7c0-1.3.9-2.3 2.1-2.3 1.2 0 1.9.9 1.9 2.3v3.7"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.8v3.7" />
  </svg>
)
