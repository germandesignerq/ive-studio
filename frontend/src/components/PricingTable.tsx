import { comparison, plans, type FeatureValue, type PlanKey } from '@/data/plans'
import { useLanguage, useLocalized } from '@/i18n/LanguageContext'
import { Check } from './icons'

/** Значение в ячейке: галочка, прочерк или уточнение текстом. */
function Cell({ value }: { value: FeatureValue }) {
  const { t } = useLanguage()
  const pick = useLocalized()

  if (value === true)
    return (
      <>
        <Check size={17} strokeWidth={2.6} className="mx-auto block text-gold" />
        <span className="sr-only">{t.pricing.included}</span>
      </>
    )

  if (value === false)
    return (
      <>
        <span aria-hidden className="block text-center text-[18px] leading-none text-fg-3">
          –
        </span>
        <span className="sr-only">{t.pricing.notIncluded}</span>
      </>
    )

  return <span className="block text-center text-[14.5px] text-fg-2">{pick(value)}</span>
}

export function PricingTable() {
  const keys = plans.map((p) => p.key) as PlanKey[]
  const { t } = useLanguage()
  const pick = useLocalized()

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[680px] border-collapse">
        <caption className="sr-only">{t.pricing.tableCaption}</caption>

        <thead>
          <tr>
            <th scope="col" className="w-[38%] pb-5 text-left">
              <span className="eyebrow">{t.pricing.whatsIncluded}</span>
            </th>
            {plans.map((p) => (
              <th key={p.key} scope="col" className="pb-5 text-center align-bottom">
                <span
                  className={`block text-[17px] font-medium tracking-[-.02em] ${
                    p.highlight ? 'text-gold' : 'text-fg'
                  }`}
                >
                  {p.eyebrow}
                </span>
                <span className="mt-1 block font-label text-[15.5px] text-fg-2">
                  {t.pricing.from} {p.from}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {comparison.map((group) => (
          <tbody key={group.title.en}>
            <tr>
              <th
                scope="colgroup"
                colSpan={keys.length + 1}
                className="border-t border-line pt-8 pb-3 text-left"
              >
                <span className="eyebrow text-gold">{pick(group.title)}</span>
              </th>
            </tr>

            {group.rows.map((row) => (
              <tr key={row.label.en} className="border-t border-line">
                <th
                  scope="row"
                  className="py-[15px] pr-6 text-left text-[15.5px] font-normal text-fg-2"
                >
                  {pick(row.label)}
                </th>
                {keys.map((k) => (
                  <td
                    key={k}
                    className={`px-3 py-[15px] align-middle ${
                      k === 'business' ? 'bg-[rgba(233,201,127,.035)]' : ''
                    }`}
                  >
                    <Cell value={row.values[k]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
