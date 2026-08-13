import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useStickyNav } from '@/hooks/useStickyNav'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useCallModal } from '@/context/CallModalContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { Logo } from './Logo'
import { ArrowLeft, Burger, Close } from './icons'

type NavLink = { key: keyof ReturnType<typeof useLanguage>['t']['nav']; to: string; section?: string }

const navLinks: NavLink[] = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/#services', section: 'services' },
  { key: 'process', to: '/#process', section: 'process' },
  { key: 'projects', to: '/#work', section: 'work' },
  { key: 'about', to: '/about' },
  { key: 'blog', to: '/blog' },
  { key: 'pricing', to: '/pricing' },
]

/** Переключатель RU/EN в стекле — общий для десктопа и мобильного меню. */
function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()
  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-white/[.08] bg-white/[.04] p-[3px] text-[13.5px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_8px_20px_-10px_rgba(0,0,0,.6)] backdrop-blur-xl ${className}`}
    >
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full border border-[rgba(233,201,127,.35)] bg-[rgba(233,201,127,.16)] shadow-[inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-md transition-transform duration-300 ease-[var(--ease)]"
        style={{ transform: lang === 'ru' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {(['en', 'ru'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-[1] cursor-pointer px-[13px] py-[6px] uppercase transition-colors duration-300 ${
            lang === l ? 'text-gold-soft' : 'text-fg-3 hover:text-fg-2'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

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
  const { t } = useLanguage()

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
                    key={l.key}
                    to={l.to}
                    aria-current={active ? (l.section ? 'location' : 'page') : undefined}
                    className={`text-[16px] transition-colors hover:text-gold ${
                      active ? 'text-gold' : 'text-fg-2'
                    }`}
                  >
                    {t.nav[l.key]}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="ml-auto flex items-center gap-[14px]">
            <LangSwitch className="max-[520px]:hidden" />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => openCall({ source })}
            >
              {t.common.startProject}
            </button>
            {!back && (
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-2 leading-none text-fg min-[1001px]:hidden"
                aria-label={t.common.menu}
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
  const { t } = useLanguage()

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
                key={l.key}
                to={l.to}
                onClick={onNavigate}
                aria-current={active ? (l.section ? 'location' : 'page') : undefined}
                style={{ transitionDelay: `${(i + 1) * 50}ms` }}
                className={`block border-b border-line py-[18px] text-[clamp(34px,9.5vw,50px)] leading-[1.02] font-semibold tracking-[-.045em] transition-[opacity,transform,color] duration-500 hover:text-gold ${
                  active ? 'text-gold' : 'text-fg'
                } ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {t.nav[l.key]}
              </Link>
            )
          })}
        </nav>
        <div
          className={`mt-auto flex flex-wrap items-center gap-7 pt-[38px] transition-opacity delay-[320ms] duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <LangSwitch />
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
            {t.common.startProject}
          </button>
        </div>
      </div>
    </div>
  )
}
