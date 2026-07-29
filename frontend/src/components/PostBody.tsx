import type { ReactNode } from 'react'
import type { Block } from '@/data/posts'

/** Разбирает **жирный** внутри текста блока. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <b key={i} className="font-medium text-fg">
        {part.slice(2, -2)}
      </b>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                className="mt-14 mb-5 scroll-mt-[100px] text-[clamp(26px,3vw,34px)] tracking-[-.035em]"
              >
                {b.text}
              </h2>
            )

          case 'h3':
            return (
              <h3 key={i} className="mt-[38px] mb-[14px] text-[22px] font-medium tracking-[-.025em]">
                {b.text}
              </h3>
            )

          case 'p':
            return <p key={i}>{rich(b.text)}</p>

          case 'quote':
            return (
              <div
                key={i}
                className="my-[52px] border-l-2 border-gold py-[34px] pl-8 max-[680px]:my-10 max-[680px]:pl-[22px]"
              >
                <p className="max-w-[26ch] text-[clamp(21px,2.4vw,28px)] leading-[1.38] tracking-[-.025em] text-fg">
                  {b.text}
                </p>
              </div>
            )

          case 'list':
            return (
              <ul key={i} className="bul my-6">
                {b.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[14px] py-2 text-[18px] leading-[1.6] font-light text-fg-2"
                  >
                    <span>{rich(item)}</span>
                  </li>
                ))}
              </ul>
            )

          /* Плашка с проверяемым фактом: заголовок, суть и ссылка на источник. */
          case 'fact':
            return (
              <aside
                key={i}
                className="glow-top my-11 rounded-md-x border border-[rgba(233,201,127,.22)] bg-[rgba(233,201,127,.05)] p-[26px_28px] max-[680px]:p-[22px_20px]"
              >
                <span className="eyebrow mb-[10px] block text-gold">Fact</span>
                <h3 className="mb-3 text-[19px] font-medium tracking-[-.02em]">{b.title}</h3>
                <p className="max-w-none text-[16.5px] leading-[1.6]">{rich(b.text)}</p>
                {b.source && (
                  <p className="mt-4 text-[13.5px] text-fg-3">
                    Source:{' '}
                    <a
                      href={b.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-[rgba(233,201,127,.35)] text-gold"
                    >
                      {b.source.label}
                    </a>
                  </p>
                )}
              </aside>
            )
        }
      })}
    </>
  )
}
