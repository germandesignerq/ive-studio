export const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export const isName = (v: string) => v.trim().length > 1
export const isEmail = (v: string) => emailRe.test(v.trim())
export const isMessage = (v: string) => v.trim().length > 4

export type FieldErrors = Record<string, boolean>
