import type { AvatarKey } from './avatars'

export type Review = {
  quote: string
  name: string
  role: string
  /** путь к настоящему фото клиента; пока нет — рисуем аватар по ключу avatar */
  img?: string
  avatar: AvatarKey
  initials: string
  color: string
}

export const reviews: Review[] = [
  {
    quote: "They found the leak in our signup in week one. We'd been guessing for six months.",
    name: 'Mark Sullivan',
    role: 'Co-founder, Sphere',
    img: '/avatar-mark.jpg',
    avatar: 'mark',
    initials: 'MS',
    color: '#8DA9F0',
  },
  {
    quote: 'New site paid for itself in the first quarter. Leads more than doubled.',
    name: 'Ana Ribeiro',
    role: 'Head of Growth, Northline',
    img: '/avatar-ana.jpg',
    avatar: 'ana',
    initials: 'AR',
    color: '#D9B673',
  },
  {
    quote: 'Forty screens in twelve weeks, and the design system still holds two years later.',
    name: 'Daniel Cross',
    role: 'CTO, Quanta',
    img: '/avatar-daniel.jpg',
    avatar: 'daniel',
    initials: 'DC',
    color: '#A78BE0',
  },
  {
    quote: 'We went from a Figma sketch to paying users without hiring a single designer.',
    name: 'Nora Bennett',
    role: 'Founder, Loop',
    img: '/avatar-priya.jpg',
    avatar: 'priya',
    initials: 'NB',
    color: '#6FBFA8',
  },
  {
    quote: "Best-converting page we've ever run on paid. And it shipped in two weeks.",
    name: 'Tom Weber',
    role: 'Marketing Lead, Pace',
    img: '/avatar-tom.jpg',
    avatar: 'tom',
    initials: 'TW',
    color: '#E08F8F',
  },
  {
    quote: 'They rewrote our onboarding end to end. Support tickets dropped by a third.',
    name: 'Sofia Lang',
    role: 'Product Lead, Vera',
    img: '/avatar-sofia.jpg',
    avatar: 'sofia',
    initials: 'SL',
    color: '#7FB2E5',
  },
]
