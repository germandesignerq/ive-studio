export type LeadPayload = {
  name: string
  email: string
  message: string
  company?: string
  project?: string
  budget?: string
  timeline?: string
  plan?: string
  /** откуда пришла заявка: 'home form', 'blog', 'case: Sphere' … */
  source: string
}

export type LeadResponse = {
  id: number
  created_at: string
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    /** ошибки по полям, если бэкенд их вернул */
    readonly fields?: Record<string, string>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const BASE = import.meta.env.VITE_API_URL ?? '/api'

/** Отправка заявки в FastAPI. Бросает ApiError — форма покажет сообщение. */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  let res: Response
  try {
    res = await fetch(`${BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiError('Network is down. Write to ivedesign93@gmail.com and we will reply.', 0)
  }

  if (res.status === 422) {
    const body = (await res.json().catch(() => null)) as { detail?: unknown } | null
    const fields: Record<string, string> = {}
    if (Array.isArray(body?.detail)) {
      for (const item of body.detail as Array<{ loc?: unknown[]; msg?: string }>) {
        const field = item.loc?.[item.loc.length - 1]
        if (typeof field === 'string' && item.msg) fields[field] = item.msg
      }
    }
    throw new ApiError('Check the highlighted fields.', 422, fields)
  }

  if (!res.ok) {
    throw new ApiError('Could not send the request. Please try again.', res.status)
  }

  return (await res.json()) as LeadResponse
}
