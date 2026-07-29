import { comparison, plans, type FeatureValue, type PlanKey } from '@/data/plans'
import { Check } from './icons'

/** Значение в ячейке: галочка, прочерк или уточнение текстом. */
function Cell({ value }: { value: FeatureValue }) {
  if (value === true)
    return (
      <>
        <Check size={17} strokeWidth={2.6} className="mx-auto block text-gold" />
        <span className="sr-only">Included</span>
      </>
    )

  if (value === false)
    return (
      <>
        <span aria-hidden className="block text-center text-[18px] leading-none text-fg-3">
          –
        </span>
        <span className="sr-only">Not included</span>
      </>
    )

  return <span className="block text-center text-[14.5px] text-fg-2">{value}</span>
}

export function PricingTable() {
  const keys = plans.map((p) => p.key) as PlanKey[]

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[680px] border-collapse">
        <caption className="sr-only">What each package includes</caption>

        <thead>
          <tr>
            <th scope="col" className="w-[38%] pb-5 text-left">
              <span className="eyebrow">What&apos;s included</span>
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
                <span className="mt-1 block font-label text-[15.5px] text-fg-2">from {p.from}</span>
              </th>
            ))}
          </tr>
        </thead>

        {comparison.map((group) => (
          <tbody key={group.title}>
            <tr>
              <th
                scope="colgroup"
                colSpan={keys.length + 1}
                className="border-t border-line pt-8 pb-3 text-left"
              >
                <span className="eyebrow text-gold">{group.title}</span>
              </th>
            </tr>

            {group.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th
                  scope="row"
                  className="py-[15px] pr-6 text-left text-[15.5px] font-normal text-fg-2"
                >
                  {row.label}
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
