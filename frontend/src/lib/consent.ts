/**
 * Согласие на аналитику. Google Consent Mode: gtag загружается сразу, но до
 * ответа посетителя работает в урезанном режиме — без cookie и без
 * идентификатора (`analytics_storage: 'denied'` выставлен прямо в index.html,
 * до первого хита). Здесь только смена решения и его память.
 *
 * Немецкая и французская версии — это трафик из ЕС, где аналитика без
 * согласия незаконна; поэтому баннер, а не тихий сбор.
 */
const STORAGE_KEY = 'ive-consent'

export type Consent = 'granted' | 'denied'

export function readConsent(): Consent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'granted' || stored === 'denied' ? stored : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* приватный режим — решение живёт до конца вкладки */
  }
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  /* Просмотр этой страницы уже ушёл — без cookie, но ушёл. Повторять его
     после согласия нельзя: в отчёте появится второй просмотр того же экрана. */
}
