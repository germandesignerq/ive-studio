import { useRef, useState } from 'react'
import { ApiError, submitLead } from '@/lib/api'
import { isEmail, isMessage, isName } from '@/lib/validation'
import { useLanguage } from '@/i18n/LanguageContext'
import { Field } from './CallModal'
import { Check } from './icons'

/** Значения, которые уходят в бэкенд, всегда на английском — независимо от языка интерфейса. */
const projectOptions = ['Landing page', 'Full website', 'SaaS / MVP', 'Not sure yet']
const budgetOptions = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $40,000', '$40,000+', "Let's discuss"]
const timelineOptions = ['ASAP', 'In 1–2 months', 'This quarter', 'Just exploring']

const initial = {
  name: '',
  email: '',
  company: '',
  project: projectOptions[0],
  budget: budgetOptions[1],
  timeline: timelineOptions[0],
  message: '',
}

/** Большая форма заявки в финальном блоке главной. */
export function LeadForm({ source }: { source: string }) {
  const { t } = useLanguage()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const set = (field: keyof typeof initial) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    setErrors((e) => ({ ...e, [field]: false }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const next = {
      name: !isName(values.name),
      email: !isEmail(values.email),
      message: !isMessage(values.message),
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
        company: values.company.trim() || undefined,
        project: values.project,
        budget: values.budget,
        timeline: values.timeline,
        message: values.message.trim(),
        source,
      })
      setDone(true)
    } catch (err) {
      setFailure(err instanceof ApiError ? err.message : t.leadForm.couldNotSend)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="rounded-lg-x border border-line-hi bg-[linear-gradient(180deg,#16161A,#101013)] p-[38px_38px_34px] shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] max-[680px]:p-[28px_24px_26px]">
      {done ? (
        <div className="px-5 py-[46px] pb-10 text-center">
          <div className="mx-auto mb-6 grid h-[62px] w-[62px] place-items-center rounded-full bg-gold text-[#0B0B0C]">
            <Check size={26} strokeWidth={2.6} />
          </div>
          <h3 className="text-[27px] font-semibold tracking-[-.03em]">{t.leadForm.doneTitle}</h3>
          <p className="mx-auto mt-[14px] max-w-[34ch] text-[16px] font-light text-fg-2">
            {t.leadForm.doneText}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-0">
            <Field
              label={t.leadForm.name}
              htmlFor="fName"
              required
              error={errors.name}
              message={t.leadForm.nameError}
            >
              <input
                ref={nameRef}
                id="fName"
                name="name"
                type="text"
                placeholder="Alex Petrov"
                value={values.name}
                onChange={(e) => set('name')(e.target.value)}
              />
            </Field>
            <Field
              label={t.leadForm.email}
              htmlFor="fEmail"
              required
              error={errors.email}
              message={t.leadForm.emailError}
            >
              <input
                ref={emailRef}
                id="fEmail"
                name="email"
                type="email"
                placeholder="alex@company.com"
                value={values.email}
                onChange={(e) => set('email')(e.target.value)}
              />
            </Field>
          </div>

          <Field label={t.leadForm.company} htmlFor="fCompany">
            <input
              id="fCompany"
              name="company"
              type="text"
              placeholder="company.com"
              value={values.company}
              onChange={(e) => set('company')(e.target.value)}
            />
          </Field>

          <div className="field mb-[18px]">
            <label className="mb-2 block text-[13.5px] text-fg-2">{t.leadForm.whatDoYouNeed}</label>
            <div className="chips flex flex-wrap gap-2">
              {projectOptions.map((opt, i) => (
                <span key={opt} className="relative">
                  <input
                    type="radio"
                    id={`project-${i}`}
                    name="project"
                    value={opt}
                    checked={values.project === opt}
                    onChange={() => set('project')(opt)}
                  />
                  <label htmlFor={`project-${i}`}>{t.leadForm.projectOptions[i]}</label>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-0">
            <Field label={t.leadForm.budget} htmlFor="fBudget">
              <select
                id="fBudget"
                name="budget"
                value={values.budget}
                onChange={(e) => set('budget')(e.target.value)}
              >
                {budgetOptions.map((o, i) => (
                  <option key={o} value={o}>
                    {t.leadForm.budgetOptions[i]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t.leadForm.startDate} htmlFor="fWhen">
              <select
                id="fWhen"
                name="timeline"
                value={values.timeline}
                onChange={(e) => set('timeline')(e.target.value)}
              >
                {timelineOptions.map((o, i) => (
                  <option key={o} value={o}>
                    {t.leadForm.timelineOptions[i]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label={t.leadForm.message}
            htmlFor="fMsg"
            required
            error={errors.message}
            message={t.leadForm.messageError}
          >
            <textarea
              ref={messageRef}
              id="fMsg"
              name="message"
              placeholder={t.leadForm.messagePlaceholder}
              value={values.message}
              onChange={(e) => set('message')(e.target.value)}
              className="min-h-[104px]"
            />
          </Field>

          {failure && (
            <p className="mb-4 text-[14px] text-danger" role="alert">
              {failure}
            </p>
          )}

          <button className="btn btn-primary mt-2 w-full" type="submit" disabled={sending}>
            {sending ? t.leadForm.sending : t.leadForm.send}
          </button>
          <p className="mt-4 text-center text-[13px] leading-[1.5] text-fg-3">
            {t.leadForm.footnote1}
            <br />
            {t.leadForm.footnote2}
          </p>
        </form>
      )}
    </div>
  )
}
