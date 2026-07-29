import { useFollowGlow } from '@/hooks/useFollowGlow'
import { useCallModal } from '@/context/CallModalContext'
import { SilkCanvas } from './SilkCanvas'

type CtaSectionProps = {
  title: string
  sub: string
  button: string
  source: string
  /** шёлковый фон — на кейсе он есть, на остальных страницах нет */
  silk?: boolean
}

/** Центрированный блок «поговорим?» перед подвалом. */
export function CtaSection({ title, sub, button, source, silk = false }: CtaSectionProps) {
  const ref = useFollowGlow<HTMLElement>(50, 50)
  const { openCall } = useCallModal()

  return (
    <section
      ref={ref}
      className="glow glow-wide relative overflow-hidden border-t border-line py-[130px] text-center max-[680px]:py-[90px]"
    >
      {silk && (
        <>
          <SilkCanvas className="z-0" />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'radial-gradient(75% 65% at 50% 50%,transparent 15%,rgba(10,10,11,.55) 62%,#0A0A0B 100%)',
            }}
          />
        </>
      )}
      <div className="wrap relative z-[3]">
        <h2 className="mx-auto max-w-[16ch] text-[clamp(32px,4.6vw,56px)] tracking-[-.042em]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-[18px] font-light text-fg-2">{sub}</p>
        <button
          type="button"
          className="btn btn-primary mt-8"
          onClick={() => openCall({ source })}
        >
          {button}
        </button>
      </div>
    </section>
  )
}
