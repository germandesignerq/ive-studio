import { useCallModal } from '@/context/CallModalContext'
import { Check } from './icons'

/** Ступени сужаются книзу — это и есть воронка. */
const steps = [
  { label: 'They land on your page', width: 'w-full' },
  { label: 'In ~50 ms they judge how it looks', width: 'w-[86%]' },
  { label: 'In the next seconds they look for themselves in your copy', width: 'w-[72%]' },
  { label: 'Whatever survives both — converts', width: 'w-[58%]' },
]

const promises = [
  'A free 30-minute call — we open your page and go through it live.',
  'You leave with a scope, a timeline and a number.',
  'No pitch deck, no sales sequence. We reply within 24 hours.',
]

/**
 * Блок в конце статьи: коротко пересобирает путь читателя
 * и предлагает следующий шаг.
 */
export function PostFunnel({ source }: { source: string }) {
  const { openCall } = useCallModal()

  return (
    <section className="doc mt-[90px]">
      <div className="glow-top overflow-hidden rounded-lg-x border border-[rgba(233,201,127,.22)] bg-[linear-gradient(180deg,rgba(233,201,127,.07),transparent_55%),var(--color-card)] p-[40px_40px_44px] max-[680px]:p-[28px_24px_32px]">
        <span className="eyebrow block text-gold">Every visit runs this path</span>

        {/* ── воронка ── */}
        <div className="mt-7 flex flex-col items-center gap-[10px]">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={`${s.width} flex items-center justify-center gap-3 rounded-[10px] border border-[rgba(233,201,127,.18)] px-5 py-[14px] text-center text-[15px] font-light text-fg-2 max-[680px]:w-full max-[680px]:text-[14px]`}
              style={{
                // чем ниже ступень, тем плотнее золото
                background: `rgba(233,201,127,${0.03 + i * 0.025})`,
              }}
            >
              <span className="font-label text-[14.5px] tracking-[.16em] text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </div>
          ))}
        </div>

        {/* ── предложение ── */}
        <div className="mt-9 border-t border-line pt-8 text-center">
          <h2 className="mx-auto max-w-[18ch] text-[clamp(26px,3.4vw,38px)] tracking-[-.04em]">
            Want us to build yours?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[17px] leading-[1.55] font-light text-fg-2">
            Send the link to your current page. We&apos;ll tell you which step above it loses people
            on — and what we&apos;d change first.
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
            Get a free review
          </button>
          <p className="mt-4 text-[13px] text-fg-3">
            Or write to{' '}
            <a href="mailto:ivedesign93@gmail.com" className="text-gold">
              ivedesign93@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
