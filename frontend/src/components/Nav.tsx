import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useStickyNav } from '@/hooks/useStickyNav'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useCallModal } from '@/context/CallModalContext'
import { Logo } from './Logo'
import { ArrowLeft, Burger, Close } from './icons'

type NavLink = { label: string; to: string; section?: string }

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services', section: 'services' },
  { label: 'Process', to: '/#process', section: 'process' },
  { label: 'Projects', to: '/#work', section: 'work' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
]

/* Следим только за секциями, у которых есть пункт меню: пока читатель
   в «Reviews» или «Results», подсветка остаётся на «Projects». Порядок
   должен совпадать с порядком секций на странице. */
const spiedSections = ['services', 'process', 'work'] as const

type NavProps = {
  /** источник заявки для кнопки «Start a project» */
  source: string
  /** вариант со стрелкой «назад» вместо меню — для статьи и кейса */
  back?: { label: string; to: string }
}

export function Nav({ source, back }: NavProps) {
  const stuck = useStickyNav()
  const [menuOpen, setMenuOpen] = useState(false)
  const { openCall } = useCallModal()
  const { pathname } = useLocation()
  const activeSection = useScrollSpy(spiedSections)

  /* Пункт-якорь подсвечивается по секции и только на главной,
     пункт-страница — по текущему маршруту.
     «Home» гаснет, как только читатель дошёл до секции со своим пунктом,
     иначе на главной горели бы два пункта сразу. */
  const isActive = (l: NavLink) => {
    if (l.section) return pathname === '/' && activeSection === l.section
    if (l.to === '/') return pathname === '/' && activeSection === null
    return pathname === l.to
  }

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => innerWidth > 1000 && setMenuOpen(false)
    addEventListener('keydown', onKey)
    addEventListener('resize', onResize)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener('resize', onResize)
    }
  }, [])

  const shell = stuck || menuOpen ? 'bg-[rgba(10,10,11,.85)] backdrop-blur-[18px]' : ''
  const border = stuck && !menuOpen ? 'border-b-line' : 'border-b-transparent'

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-[60] border-b transition-[background-color,border-color] duration-300 ${shell} ${border}`}
      >
        <div className="wrap flex h-[74px] items-center gap-[26px] min-[1001px]:gap-[38px]">
          <Link to="/" aria-label="IVE — home" className="group inline-flex items-center">
            <Logo />
          </Link>

          {back ? (
            <Link
              to={back.to}
              className="inline-flex items-center gap-[9px] text-[15.5px] text-fg-2 transition-colors hover:text-gold"
            >
              <ArrowLeft />
              {back.label}
            </Link>
          ) : (
            <div className="mr-auto ml-2 hidden gap-7 min-[1001px]:flex">
              {navLinks.map((l) => {
                const active = isActive(l)
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    aria-current={active ? (l.section ? 'location' : 'page') : undefined}
                    className={`text-[16px] transition-colors hover:text-gold ${
                      active ? 'text-gold' : 'text-fg-2'
                    }`}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="ml-auto flex items-center gap-[14px]">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => openCall({ source })}
            >
              Start a project
            </button>
            {!back && (
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-2 leading-none text-fg min-[1001px]:hidden"
                aria-label="Menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <Close size={24} strokeWidth={1.6} /> : <Burger />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {!back && (
        <MobileMenu
          open={menuOpen}
          onNavigate={() => setMenuOpen(false)}
          source={source}
          isActive={isActive}
        />
      )}
    </>
  )
}

function MobileMenu({
  open,
  onNavigate,
  source,
  isActive,
}: {
  open: boolean
  onNavigate: () => void
  source: string
  isActive: (l: NavLink) => boolean
}) {
  const { openCall } = useCallModal()

  return (
    <div
      id="mobile-menu"
      className={`fixed top-[74px] right-0 bottom-0 left-0 z-[59] overflow-y-auto bg-[rgba(9,9,10,.985)] backdrop-blur-[24px] transition-opacity duration-[320ms] min-[1001px]:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="wrap flex min-h-full flex-col py-[26px] pb-[42px]">
        <nav>
          {navLinks.map((l, i) => {
            const active = isActive(l)
            return (
              <Link
                key={l.label}
                to={l.to}
                onClick={onNavigate}
                aria-current={active ? (l.section ? 'location' : 'page') : undefined}
                style={{ transitionDelay: `${(i + 1) * 50}ms` }}
                className={`block border-b border-line py-[18px] text-[clamp(34px,9.5vw,50px)] leading-[1.02] font-semibold tracking-[-.045em] transition-[opacity,transform,color] duration-500 hover:text-gold ${
                  active ? 'text-gold' : 'text-fg'
                } ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div
          className={`mt-auto flex flex-wrap gap-7 pt-[38px] transition-opacity delay-[320ms] duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a href="mailto:ivedesign93@gmail.com" className="text-[16px] text-fg-3 hover:text-gold">
            ivedesign93@gmail.com
          </a>
          <button
            type="button"
            className="cursor-pointer text-[16px] text-fg-3 hover:text-gold"
            onClick={() => {
              onNavigate()
              openCall({ source })
            }}
          >
            Start a project
          </button>
        </div>
      </div>
    </div>
  )
}
