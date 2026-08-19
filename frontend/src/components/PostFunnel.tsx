import { useCallModal } from '@/context/CallModalContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { SITE_EMAIL } from '@/lib/site'
import { Check } from './icons'

/** Ступени сужаются книзу — это и есть воронка. */
const widths = ['w-full', 'w-[86%]', 'w-[72%]', 'w-[58%]']

/**
 * Блок в конце статьи: коротко пересобирает путь читателя
 * и предлагает следующий шаг.
 */
export function PostFunnel({ source }: { source: string }) {
  const { openCall } = useCallModal()
  const { t } = useLanguage()

  const steps = [t.postFunnel.step1, t.postFunnel.step2, t.postFunnel.step3, t.postFunnel.step4]
  const promises = [t.postFunnel.promise1, t.postFunnel.promise2, t.postFunnel.promise3]

  return (
    <section className="doc mt-[90px]">
      <div className="glow-top overflow-hidden rounded-lg-x border border-[rgba(233,201,127,.22)] bg-[linear-gradient(180deg,rgba(233,201,127,.07),transparent_55%),var(--color-card)] p-[40px_40px_44px] max-[680px]:p-[28px_24px_32px]">
        <span className="eyebrow block text-gold">{t.postFunnel.eyebrow}</span>

        {/* ── воронка ── */}
        <div className="mt-7 flex flex-col items-center gap-[10px]">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`${widths[i]} flex items-center justify-center gap-3 rounded-[10px] border border-[rgba(233,201,127,.18)] px-5 py-[14px] text-center text-[15px] font-light text-fg-2 max-[680px]:w-full max-[680px]:text-[14px]`}
              style={{
                // чем ниже ступень, тем плотнее золото
                background: `rgba(233,201,127,${0.03 + i * 0.025})`,
              }}
            >
              <span className="font-label text-[14.5px] tracking-[.16em] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </div>
          ))}
        </div>

        {/* ── предложение ── */}
        <div className="mt-9 border-t border-line pt-8 text-center">
          <h2 className="mx-auto max-w-[18ch] text-[clamp(26px,3.4vw,38px)] tracking-[-.04em]">
            {t.postFunnel.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[17px] leading-[1.55] font-light text-fg-2">
            {t.postFunnel.lead}
          </p>

          <ul className="mx-auto mt-7 grid max-w-[44ch] gap-3 text-left">
            {promises.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15.5px] font-light text-fg-2">
                <Check size={16} className="mt-[5px] flex-none text-gold" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary mt-8" onClick={() => openCall({ source })}>
            {t.postFunnel.button}
          </button>
          <p className="mt-4 text-[13px] text-fg-3">
            {t.postFunnel.orWrite}{' '}
            <a href={`mailto:${SITE_EMAIL}`} className="text-gold">
              {SITE_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
