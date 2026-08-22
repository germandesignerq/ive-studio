import type { Localized } from '@/i18n/LanguageContext'

export type FaqItem = { q: Localized; a: Localized }

/**
 * Вопросы, которые задают на первом же звонке. Отсюда их берут два места:
 * секция на главной и разметка `FAQPage` в seo.ts — текст обязан совпадать
 * с видимым, иначе Google считает разметку обманом и снимает сниппет.
 *
 * Цифры не выдумываем: они те же, что в data/plans.ts.
 */
export const faq: FaqItem[] = [
  {
    q: {
      en: 'How much does a website cost?',
      de: 'Was kostet eine Website?',
      fr: 'Combien coûte un site web ?',
      uk: 'Скільки коштує сайт?',
    },
    a: {
      en: 'A landing page starts at $2,500, a multi-page website at $6,000, a SaaS product or MVP at $18,000. You get a fixed price before we start — not an hourly rate that grows as the project does.',
      de: 'Eine Landingpage beginnt bei 2.500 $, eine mehrseitige Website bei 6.000 $, ein SaaS-Produkt oder MVP bei 18.000 $. Den Festpreis nennen wir vor Projektstart — keinen Stundensatz, der mit dem Projekt wächst.',
      fr: 'Une landing page démarre à 2 500 $, un site multi-pages à 6 000 $, un produit SaaS ou MVP à 18 000 $. Le prix est fixé avant de commencer — pas un taux horaire qui gonfle avec le projet.',
      uk: 'Лендинг — від $2,500, багатосторінковий сайт — від $6,000, SaaS чи MVP — від $18,000. Фіксовану ціну ви знаєте до старту, а не погодинну ставку, що росте разом із проєктом.',
    },
  },
  {
    q: {
      en: 'How long does it take?',
      de: 'Wie lange dauert es?',
      fr: 'Combien de temps ça prend ?',
      uk: 'Скільки це займає часу?',
    },
    a: {
      en: 'A landing page goes live in about two weeks, a full website in four to six. We agree the scope up front and hold the date — a project without a deadline never ships.',
      de: 'Eine Landingpage ist in etwa zwei Wochen live, eine komplette Website in vier bis sechs. Den Umfang legen wir vorab fest und halten den Termin — ein Projekt ohne Deadline geht nie live.',
      fr: 'Une landing page est en ligne en deux semaines environ, un site complet en quatre à six. Le périmètre est fixé au départ et la date tient — un projet sans échéance ne sort jamais.',
      uk: 'Лендинг запускається приблизно за два тижні, повноцінний сайт — за чотири-шість. Обсяг узгоджуємо на старті й тримаємо дату: проєкт без дедлайну не запускається ніколи.',
    },
  },
  {
    q: {
      en: 'What do you need from me to start?',
      de: 'Was brauchen Sie von mir für den Start?',
      fr: 'De quoi avez-vous besoin pour démarrer ?',
      uk: 'Що вам потрібно від мене для старту?',
    },
    a: {
      en: 'A 30-minute call and whatever you already have: the current site, a deck, a rough idea. Everything else — structure, copy, screens — is our job. You leave the call with a scope, a timeline and a number.',
      de: 'Ein 30-minütiges Gespräch und was immer Sie schon haben: die aktuelle Website, ein Deck, eine grobe Idee. Alles Weitere — Struktur, Texte, Screens — ist unsere Aufgabe. Aus dem Gespräch gehen Sie mit Umfang, Zeitplan und einer Zahl.',
      fr: 'Un appel de 30 minutes et ce que vous avez déjà : le site actuel, une présentation, une idée. Le reste — structure, textes, écrans — c’est notre travail. Vous repartez avec un périmètre, un délai et un chiffre.',
      uk: 'Дзвінок на 30 хвилин і те, що вже є: чинний сайт, презентація, начерк ідеї. Решта — структура, тексти, екрани — наша робота. Після дзвінка у вас є обсяг, терміни й цифра.',
    },
  },
  {
    q: {
      en: 'Do you write the copy?',
      de: 'Schreiben Sie auch die Texte?',
      fr: 'Écrivez-vous les textes ?',
      uk: 'Чи пишете ви тексти?',
    },
    a: {
      en: 'We build the structure and write the wording of the page; if you already have a copywriter, we work from their text. Either way copy is part of the design, not something poured in afterwards — words written last are the most common reason a good-looking site converts badly.',
      de: 'Wir bauen die Struktur und formulieren die Seite; wenn Sie schon einen Texter haben, arbeiten wir mit dessen Text. So oder so gehört Text zum Design und wird nicht nachträglich eingefüllt — zuletzt geschriebene Texte sind der häufigste Grund, warum eine hübsche Website schlecht konvertiert.',
      fr: 'Nous construisons la structure et rédigeons la page ; si vous avez déjà un rédacteur, nous partons de son texte. Dans les deux cas le texte fait partie du design, il n’est pas versé après coup — des mots écrits en dernier sont la raison la plus fréquente d’un beau site qui convertit mal.',
      uk: 'Ми будуємо структуру і пишемо текст сторінки; якщо у вас є копірайтер — працюємо з його текстом. У будь-якому разі текст — частина дизайну, а не те, що заливають наприкінці: саме через це гарний на вигляд сайт найчастіше погано конвертує.',
    },
  },
  {
    q: {
      en: 'What happens after launch?',
      de: 'Was passiert nach dem Launch?',
      fr: 'Que se passe-t-il après la mise en ligne ?',
      uk: 'Що відбувається після запуску?',
    },
    a: {
      en: 'Analytics are set up before launch, so you see what the page actually does. The Business package includes 30 days of support after handoff and Premium keeps going month to month; on Starter, later edits are quoted separately.',
      de: 'Analytics stehen vor dem Launch, damit Sie sehen, was die Seite tatsächlich tut. Das Business-Paket enthält 30 Tage Support nach der Übergabe, Premium läuft monatlich weiter; bei Starter werden spätere Änderungen separat angeboten.',
      fr: 'L’analytique est en place avant la mise en ligne : vous voyez ce que la page fait vraiment. La formule Business inclut 30 jours de support après livraison et Premium continue au mois ; sur Starter, les retouches ultérieures sont devisées à part.',
      uk: 'Аналітика налаштована ще до запуску — ви бачите, що сторінка справді робить. Пакет Business включає 30 днів підтримки після передачі, Premium продовжується щомісяця; на Starter пізніші правки рахуються окремо.',
    },
  },
  {
    q: {
      en: 'Do you work with clients in other countries?',
      de: 'Arbeiten Sie mit Kunden im Ausland?',
      fr: 'Travaillez-vous avec des clients à l’étranger ?',
      uk: 'Чи працюєте ви з клієнтами з інших країн?',
    },
    a: {
      en: 'We work remotely, wherever you are, in English, German, French and Ukrainian. Calls are scheduled in your timezone and the scope, the timeline and the price are agreed in writing before work starts.',
      de: 'Wir arbeiten remote, egal wo Sie sitzen — auf Englisch, Deutsch, Französisch und Ukrainisch. Termine liegen in Ihrer Zeitzone; Umfang, Zeitplan und Preis werden vor Arbeitsbeginn schriftlich festgehalten.',
      fr: 'Nous travaillons à distance, où que vous soyez, en anglais, allemand, français et ukrainien. Les appels sont calés sur votre fuseau, et le périmètre, le délai et le prix sont actés par écrit avant de commencer.',
      uk: 'Працюємо віддалено, де б ви не були — англійською, німецькою, французькою та українською. Дзвінки призначаємо у вашому часовому поясі, а обсяг, терміни й ціну фіксуємо письмово до початку робіт.',
    },
  },
]
