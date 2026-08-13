import { Link } from 'react-router'
import { useFollowGlow } from '@/hooks/useFollowGlow'
import { useCallModal } from '@/context/CallModalContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { Logo } from './Logo'
import { Instagram, Linkedin, Telegram } from './icons'

/** Соцсети подвала. Ссылки — заглушки: подставьте реальные адреса профилей. */
const social = [
  { label: 'Telegram', href: '#', Icon: Telegram },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
]

/** Полный подвал с четырьмя колонками — index, about, blog. */
export function Footer({ source }: { source: string }) {
  const ref = useFollowGlow<HTMLElement>(50, 58)
  const { openCall } = useCallModal()
  const { t } = useLanguage()

  return (
    <footer
      ref={ref}
      className="glow glow-foot relative overflow-hidden border-t border-line bg-bg-deep pt-[78px] pb-[46px]"
    >
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 max-[1000px]:grid-cols-2">
          <div>
            <Link to="/" aria-label="IVE — home" className="group inline-flex items-center">
              <Logo className="h-[39px] w-[46px]" />
            </Link>
            <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.5] text-fg-3">
              {t.footer.description}
            </p>
          </div>

          <FootCol title={t.footer.studio}>
            <FootLink to="/#work">{t.nav.projects}</FootLink>
            <FootLink to="/#services">{t.nav.services}</FootLink>
            <FootLink to="/#process">{t.nav.process}</FootLink>
            <FootLink to="/about">{t.nav.about}</FootLink>
            <FootLink to="/blog">{t.nav.blog}</FootLink>
            <FootLink to="/pricing">{t.nav.pricing}</FootLink>
          </FootCol>

          <FootCol title={t.footer.contact}>
            <li className="py-[7px]">
              <a
                href="mailto:ivedesign93@gmail.com"
                className="text-[15.5px] text-fg-2 transition-colors hover:text-gold"
              >
                ivedesign93@gmail.com
              </a>
            </li>
            <li className="py-[7px]">
              <button
                type="button"
                onClick={() => openCall({ source })}
                className="cursor-pointer text-[15.5px] text-fg-2 transition-colors hover:text-gold"
              >
                {t.common.startProject}
              </button>
            </li>
            <li className="flex gap-3 pt-3 pb-[7px]">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={17} />
                </a>
              ))}
            </li>
          </FootCol>

          <FootCol title={t.footer.legal}>
            <FootLink to="/privacy">{t.footer.privacy}</FootLink>
            <li className="py-[7px]">
              <a href="#" className="text-[15.5px] text-fg-2 transition-colors hover:text-gold">
                {t.footer.terms}
              </a>
            </li>
            <li className="py-[7px]">
              <a href="#" className="text-[15.5px] text-fg-2 transition-colors hover:text-gold">
                {t.footer.cookies}
              </a>
            </li>
            <li className="py-[7px]">
              <a href="#" className="text-[15.5px] text-fg-2 transition-colors hover:text-gold">
                {t.footer.careers}
              </a>
            </li>
          </FootCol>
        </div>

        <div className="mt-[66px] flex flex-wrap justify-between gap-5 text-[14.5px] text-fg-3">
          <span>{t.common.rights}</span>
          <span>{t.common.tagline}</span>
        </div>
      </div>
    </footer>
  )
}

/** Короткий подвал в одну строку — кейс, статья, политика. */
export function FooterSlim({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-line bg-bg-deep py-14">
      <div className="wrap flex flex-wrap justify-between gap-5 text-[14.5px] text-fg-3">
        <span>{t.common.rights}</span>
        <span className="[&_a:hover]:text-gold">{children}</span>
      </div>
    </footer>
  )
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow mb-5">{title}</h4>
      <ul>{children}</ul>
    </div>
  )
}

function FootLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="py-[7px]">
      <Link to={to} className="text-[15.5px] text-fg-2 transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  )
}
