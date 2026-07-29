import { Reveal } from './Reveal'
import { useCallModal } from '@/context/CallModalContext'
import { plans } from '@/data/plans'

/** Три карточки тарифов. Клик по карточке открывает заявку с выбранным пакетом. */
export function PlanCards({ source }: { source: string }) {
  const { openCall } = useCallModal()

  return (
    <div className="grid grid-cols-3 items-start gap-[22px] max-[1000px]:mx-auto max-[1000px]:max-w-[470px] max-[1000px]:grid-cols-1">
      {plans.map((plan, i) => (
        <Reveal
          key={plan.key}
          delay={(i % 4) * 70}
          className={plan.highlight ? 'max-[1000px]:order-first' : ''}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => openCall({ source, plan })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openCall({ source, plan })
              }
            }}
            className={`plan glow-top h-full p-[36px_32px_40px] ${plan.highlight ? 'plan-hi' : ''}`}
          >
            {plan.tag && (
              <span className="absolute -top-[14px] left-1/2 z-[3] -translate-x-1/2 rounded-full bg-gold px-4 py-[5px] text-[13px] font-semibold whitespace-nowrap text-[#0B0B0C]">
                {plan.tag}
              </span>
            )}
            <span className="eyebrow mb-[18px] block text-gold">{plan.eyebrow}</span>
            <h3 className="text-[30px] font-semibold tracking-[-.035em]">{plan.title}</h3>
            <p className="mt-3 max-w-[26ch] text-[16px] font-light text-fg-2">{plan.note}</p>

            <div className="mt-6 border-t border-line pt-[22px]">
              <b className="block text-[34px] leading-none font-semibold tracking-[-.045em]">
                <em className="mr-2 text-[15px] font-normal tracking-normal text-fg-2 not-italic">
                  from
                </em>
                {plan.from}
              </b>
              <span className="mt-[10px] block font-label text-[16px] text-fg-2">{plan.range}</span>
            </div>

            <span
              className={`btn my-7 w-full ${plan.highlight ? 'btn-primary' : 'btn-ghost'}`}
              aria-hidden
            >
              Select Package
            </span>

            <ul>
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3 py-2 text-[15.5px] text-fg-2">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
