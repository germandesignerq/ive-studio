/**
 * Автовыбор языка на первом заходе.
 *
 * Правила по порядку — первый сработавший сигнал и решает:
 *   1. выбор посетителя (localStorage) — сильнее любых догадок;
 *   2. `?lang=de` в адресе — ручное переключение по ссылке;
 *   3. языки браузера (`navigator.languages`) — самый честный сигнал о том,
 *      на каком языке человек читает;
 *   4. регион: сначала субтег страны из языков браузера ('it-CH' → CH),
 *      потом часовой пояс ('Europe/Vienna' → AT). Часовой пояс — единственный
 *      способ узнать регион, не спрашивая внешний геосервис и ничей IP;
 *   5. английский.
 *
 * Почему редирект живёт здесь, а не на сервере: сайт отдаётся статикой
 * с кэшем, `Vary: Accept-Language` на CDN размножил бы каждую страницу.
 * Клиентский редирект отрабатывает до монтирования React (см. main.tsx),
 * ходит только по адресам, у которых перевод действительно есть,
 * и не трогает краулеров — иначе Google увидел бы вместо `/` немецкую версию.
 */
import { metaFor } from '@/lib/seo'
import { DEFAULT_LOCALE, isLocale, localePath, splitLocale, type Locale } from '@/lib/site'

const STORAGE_KEY = 'ive-lang'

/** Страна → язык. Только там, где язык государственный или им пользуется большинство. */
const REGION_LOCALE: Record<string, Locale> = {
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  FR: 'fr',
  BE: 'fr',
  LU: 'fr',
  MC: 'fr',
  /* заморские территории Франции — там тоже французский */
  GP: 'fr',
  MQ: 'fr',
  GF: 'fr',
  RE: 'fr',
  YT: 'fr',
  PF: 'fr',
  NC: 'fr',
  PM: 'fr',
  BL: 'fr',
  MF: 'fr',
  WF: 'fr',
  UA: 'uk',
}

/**
 * Часовой пояс → страна. Список короткий намеренно: нужны только пояса,
 * которые ведут к нашим четырём языкам, остальным всё равно достанется английский.
 * Старые псевдонимы (Kiev, Uzhgorod) оставлены — их всё ещё отдают браузеры.
 */
const TIMEZONE_REGION: Record<string, string> = {
  'Europe/Berlin': 'DE',
  'Europe/Busingen': 'DE',
  'Europe/Vienna': 'AT',
  'Europe/Zurich': 'CH',
  'Europe/Vaduz': 'LI',
  'Europe/Paris': 'FR',
  'Europe/Brussels': 'BE',
  'Europe/Luxembourg': 'LU',
  'Europe/Monaco': 'MC',
  'Europe/Kyiv': 'UA',
  'Europe/Kiev': 'UA',
  'Europe/Uzhgorod': 'UA',
  'Europe/Zaporozhye': 'UA',
  'Europe/Simferopol': 'UA',
  'Indian/Reunion': 'RE',
  'Indian/Mayotte': 'YT',
  'America/Guadeloupe': 'GP',
  'America/Martinique': 'MQ',
  'America/Cayenne': 'GF',
  'America/Miquelon': 'PM',
  'Pacific/Tahiti': 'PF',
  'Pacific/Noumea': 'NC',
}

/** Краулеры и генераторы превью: им отдаём ровно тот адрес, который они запросили. */
const BOT = /bot|crawl|spider|slurp|search|preview|facebookexternalhit|whatsapp|telegram|embedly|lighthouse|headless|pingdom|gtmetrix/i

export type DetectInput = {
  stored?: string | null
  languages?: readonly string[]
  timeZone?: string
}

/** Чистая функция — вся логика выбора здесь, без обращений к браузеру. */
export function detectLocale({ stored, languages = [], timeZone }: DetectInput): Locale {
  if (isLocale(stored)) return stored

  /* 1. прямое совпадение по языку: 'de-AT' → de, 'en-DE' → en */
  for (const tag of languages) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }

  /* 2. регион из языкового тега: 'it-CH' → CH → de */
  for (const tag of languages) {
    const region = tag.split('-')[1]?.toUpperCase()
    if (region && REGION_LOCALE[region]) return REGION_LOCALE[region]
  }

  /* 3. регион из часового пояса */
  const region = timeZone ? TIMEZONE_REGION[timeZone] : undefined
  if (region && REGION_LOCALE[region]) return REGION_LOCALE[region]

  return DEFAULT_LOCALE
}

/** Запомнить выбор — им детект перебивается на всех следующих заходах. */
export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* приватный режим — просто не запоминаем */
  }
}

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function currentTimeZone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return undefined
  }
}

/**
 * Уводит посетителя на его язык, если он открыл адрес без языкового префикса.
 * Возвращает true, если редирект начался — тогда приложение можно не монтировать.
 */
export function autoLocaleRedirect(): boolean {
  if (typeof window === 'undefined') return false

  const { pathname, search, hash } = window.location
  const params = new URLSearchParams(search)

  /* ?lang=de — ручное переключение ссылкой; параметр в адресе не оставляем */
  const forced = params.get('lang')
  if (isLocale(forced)) {
    storeLocale(forced)
    params.delete('lang')
    const query = params.toString()
    const { path } = splitLocale(pathname)
    window.location.replace(localePath(path, forced) + (query ? `?${query}` : '') + hash)
    return true
  }

  if (BOT.test(navigator.userAgent)) return false

  /* адрес уже с префиксом — человек попросил конкретный язык, не спорим */
  const { locale, path } = splitLocale(pathname)
  if (locale !== DEFAULT_LOCALE) return false

  const target = detectLocale({
    stored: readStored(),
    languages: navigator.languages ?? [navigator.language],
    timeZone: currentTimeZone(),
  })
  if (target === DEFAULT_LOCALE) return false

  /* переводим только то, что переведено: у политики и кейсов версий нет */
  if (!metaFor(pathname).alternates.includes(target)) return false

  storeLocale(target)
  window.location.replace(localePath(path, target) + search + hash)
  return true
}
