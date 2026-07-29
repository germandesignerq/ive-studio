import { useEffect, useRef, useState } from 'react'
import { useCallModal } from '@/context/CallModalContext'
import { ApiError, submitLead } from '@/lib/api'
import { isEmail, isMessage, isName } from '@/lib/validation'
import { Check, Close } from './icons'

type Errors = { name?: boolean; email?: boolean; message?: boolean }

export function CallModal() {
  const { request, closeCall } = useCallModal()
  const open = request !== null
  const plan = request?.plan

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  // при каждом открытии — чистая форма и фокус в первое поле
  useEffect(() => {
    if (!open) return
    restoreFocus.current = document.activeElement as HTMLElement | null
    setValues({ name: '', email: '', message: '' })
    setErrors({})
    setDone(false)
    setFailure(null)
    setSending(false)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => nameRef.current?.focus(), 320)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      restoreFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCall()
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, closeCall])

  const set = (field: keyof typeof values) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    setErrors((e) => ({ ...e, [field]: false }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!request) return

    // в тарифной модалке сообщение необязательно — как в исходной вёрстке
    const messageRequired = !plan
    const next: Errors = {
      name: !isName(values.name),
      email: !isEmail(values.email),
      message: messageRequired && !isMessage(values.message),
    }
    setErrors(next)
    if (next.name) return nameRef.current?.focus()
    if (next.email) return emailRef.current?.focus()
    if (next.message) return messageRef.current?.focus()

    setSending(true)
    setFailure(null)
    try {
      await submitLead({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        plan: plan?.eyebrow,
        source: request.source,
      })
      setDone(true)
    } catch (err) {
      setFailure(err instanceof ApiError ? err.message : 'Could not send the request.')
    } finally {
      setSending(false)
    }
  }

  // отдельный флаг, чтобы карточка успела проиграть анимацию появления
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!open) return setShown(false)
    const raf = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(raf)
  }, [open])

  if (!open) return null

  return (
    <div
      className={`modal fixed inset-0 z-[100] grid place-items-center p-[22px] transition-opacity duration-300 ${
        shown ? 'modal-open opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-modal-title"
    >
      <div
        className="absolute inset-0 bg-[rgba(5,5,6,.74)] backdrop-blur-[12px]"
        onClick={closeCall}
      />

      <div className="modal-card relative max-h-[88vh] w-[min(560px,100%)] overflow-y-auto p-[36px_36px_30px] text-left max-[680px]:p-[28px_24px_24px]">
        <button
          type="button"
          onClick={closeCall}
          aria-label="Close"
          className="modal-x absolute top-4 right-4 z-[2] grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-line text-fg-2 transition-all duration-[250ms]"
        >
          <Close />
        </button>

        {done ? (
          <div className="py-[34px_10px_24px] text-center">
            <div className="mx-auto mb-[22px] grid h-[60px] w-[60px] place-items-center rounded-full bg-gold text-[#0B0B0C]">
              <Check size={26} strokeWidth={2.6} />
            </div>
            <h3 className="text-[26px] tracking-[-.03em]">Request sent.</h3>
            <p className="mx-auto mt-[14px] max-w-[32ch] text-[16px] font-light text-fg-2">
              {plan ? (
                <>
                  We&apos;ll get back to you within 24 hours about the <b>{plan.eyebrow}</b> package.
                </>
              ) : (
                <>We&apos;ll get back to you within 24 hours with a few times for the call.</>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-[26px] border-b border-line pr-[44px] pb-6">
              <span className="eyebrow block text-gold">{plan ? plan.eyebrow : 'Free 30-minute call'}</span>
              <h3 id="call-modal-title" className="mt-[14px] text-[28px] tracking-[-.035em]">
                {plan ? plan.title : (request.title ?? "Tell us what you're building")}
              </h3>

              {plan ? (
                <>
                  <div className="mt-5 flex flex-wrap items-baseline gap-[14px]">
                    <b className="text-[38px] leading-none font-semibold tracking-[-.045em]">
                      <i className="mr-2 text-[15px] font-normal tracking-normal text-fg-2 not-italic">
                        from
                      </i>
                      {plan.from}
                    </b>
                    <span className="font-label text-[16px] text-fg-2">{plan.range}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {plan.incl.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgba(233,201,127,.25)] bg-[rgba(233,201,127,.06)] px-[14px] py-[6px] text-[13.5px] text-gold-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="mt-3 max-w-[36ch] text-[16px] font-light text-fg-2">
                  {request.description ?? 'No pitch deck. You leave with a scope, a timeline and a number.'}
                </p>
              )}
            </div>

            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-0">
                <Field label="Name" htmlFor="cmName" required error={errors.name} message="Please enter your name">
                  <input
                    ref={nameRef}
                    id="cmName"
                    name="name"
                    type="text"
                    placeholder="Alex Petrov"
                    value={values.name}
                    onChange={(e) => set('name')(e.target.value)}
                  />
                </Field>
                <Field
                  label="Email"
                  htmlFor="cmEmail"
                  required
                  error={errors.email}
                  message="Please enter a valid email"
                >
                  <input
                    ref={emailRef}
                    id="cmEmail"
                    name="email"
                    type="email"
                    placeholder="alex@company.com"
                    value={values.email}
                    onChange={(e) => set('email')(e.target.value)}
                  />
                </Field>
              </div>

              <Field
                label={plan ? 'Anything we should know?' : "What's the project?"}
                htmlFor="cmMsg"
                required={!plan}
                error={errors.message}
                message="A sentence or two is enough"
              >
                <textarea
                  ref={messageRef}
                  id="cmMsg"
                  name="message"
                  placeholder="A link to your current site, a deadline, a rough scope — whatever helps."
                  value={values.message}
                  onChange={(e) => set('message')(e.target.value)}
                />
              </Field>

              {failure && (
                <p className="mb-4 text-[14px] text-danger" role="alert">
                  {failure}
                </p>
              )}

              <button className="btn btn-primary w-full" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send request'}
              </button>
              <p className="mt-4 text-center text-[13px] leading-[1.5] text-fg-3">
                We reply within 24 hours, always a human.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/** Поле формы с подписью и сообщением об ошибке. */
export function Field({
  label,
  htmlFor,
  required,
  error,
  message,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: boolean
  message?: string
  children: React.ReactNode
}) {
  return (
    <div className={`field mb-[18px] ${error ? 'field-err' : ''}`}>
      <label htmlFor={htmlFor} className="mb-2 block text-[13.5px] text-fg-2">
        {label} {required && <i className="text-gold not-italic">*</i>}
      </label>
      {children}
      {error && message && <span className="mt-[7px] block text-[13px] text-danger">{message}</span>}
    </div>
  )
}
