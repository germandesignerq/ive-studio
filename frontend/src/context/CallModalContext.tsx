import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Plan } from '@/data/plans'

export type CallRequest = {
  /** попадает в заявку: по какой странице человек кликнул */
  source: string
  title?: string
  description?: string
  /** если открыли из карточки тарифа — показываем цены в шапке */
  plan?: Plan
}

type CallModalValue = {
  request: CallRequest | null
  openCall: (req: CallRequest) => void
  closeCall: () => void
}

const CallModalContext = createContext<CallModalValue | null>(null)

export function CallModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<CallRequest | null>(null)

  const openCall = useCallback((req: CallRequest) => setRequest(req), [])
  const closeCall = useCallback(() => setRequest(null), [])

  const value = useMemo(() => ({ request, openCall, closeCall }), [request, openCall, closeCall])

  return <CallModalContext.Provider value={value}>{children}</CallModalContext.Provider>
}

export function useCallModal(): CallModalValue {
  const ctx = useContext(CallModalContext)
  if (!ctx) throw new Error('useCallModal must be used inside <CallModalProvider>')
  return ctx
}
