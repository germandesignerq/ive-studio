import type { PostCoverKey } from './post-covers'

export type PostFilter = 'ux' | 'dev' | 'process' | 'business' | 'conversion'

/**
 * Блоки статьи. Внутри text работает **жирный** — разбирается в PostBody.
 * fact — плашка с проверяемым фактом и ссылкой на источник.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'fact'; title: string; text: string; source?: { label: string; url: string } }

/**
 * Список слагов зафиксирован: по нему Record в posts.de.ts и posts.fr.ts
 * обязан покрыть все статьи — забыть перевод не даст компилятор.
 */
export const POST_SLUGS = [
  'landing-page-design-problem',
  'design-system-nobody-maintains',
  'stop-testing-onboarding-on-designers',
  'six-weeks-or-it-never-ships',
  'pricing-pages-are-product-design',
  'what-we-ask-before-we-quote',
  'animations-costing-conversions',
  'dark-mode-is-not-a-feature',
  'handoff-is-a-process',
] as const

export type PostSlug = (typeof POST_SLUGS)[number]

export type Post = {
  slug: PostSlug
  title: string
  category: PostFilter
  categoryLabel: string
  date: string
  read: string
  excerpt: string
  cover: PostCoverKey
  /** фото-обложка из /public/blog; если нет — рисуется SVG по ключу cover */
  image?: string
  coverCaption: string
  body: Block[]
}

/** Переводимая часть статьи. Даты, обложки и категории от языка не зависят. */
export type PostText = Pick<Post, 'title' | 'excerpt' | 'categoryLabel' | 'coverCaption' | 'body'>

type PostFilterLabel = 'filterAll' | 'filterUx' | 'filterDev' | 'filterProcess' | 'filterBusiness'

/** label — ключ в словаре (t.blog.*). Заголовки самих статей остаются английскими. */
export const postFilters: Array<{ key: 'all' | PostFilter; label: PostFilterLabel }> = [
  { key: 'all', label: 'filterAll' },
  { key: 'ux', label: 'filterUx' },
  { key: 'dev', label: 'filterDev' },
  { key: 'process', label: 'filterProcess' },
  { key: 'business', label: 'filterBusiness' },
]

export const featuredPost: Post = {
  slug: 'landing-page-design-problem',
  title: "Your landing page doesn't have a design problem",
  category: 'conversion',
  categoryLabel: 'Conversion',
  date: '12 June 2026',
  read: '7 min',
  excerpt:
    'We audited eleven pages that converted under 1%. Ten of them looked fine. The problem was always the same, and it was never the hero section.',
  image: '/blog/landing-page-design-problem.jpg',
  cover: 'chart',
  coverCaption: 'Eleven audits, one recurring pattern.',
  body: [
    {
      kind: 'p',
      text: 'Every few weeks someone sends us a link and the same sentence: **"the site looks great, but nobody signs up."** Last quarter we ran eleven of these audits. Two of the pages genuinely needed a redesign. The other nine were fine — clean type, decent hierarchy, fast enough.',
    },
    { kind: 'p', text: 'The pattern we kept finding had nothing to do with how the page looked.' },

    { kind: 'h2', text: 'The page answered the wrong question' },
    {
      kind: 'p',
      text: 'Almost every underperforming page we opened was built to answer **"what is this product?"** The visitor arrived asking something else entirely: **"is this for someone like me, and what happens if I click?"**',
    },
    {
      kind: 'p',
      text: 'Those are different pages. The first one explains features. The second one removes doubt. When you write the first and expect the second to happen, conversion sits at 1% and no amount of gradient fixes it.',
    },
    {
      kind: 'quote',
      text: 'Nobody bounces because your spacing was off. They bounce because they could not tell whether it was for them.',
    },

    {
      kind: 'fact',
      title: 'The look is judged in 50 milliseconds',
      text: 'Lindgaard and colleagues showed people web pages for just 50 ms and asked them to rate visual appeal. The ratings correlated closely with those given after 500 ms — and stayed stable when the test was repeated. In 50 ms nothing is read and nothing is compared: what registers is colour, density, imagery and type. That verdict lands long before your copy gets a turn, which is exactly why copy has to carry the rest.',
      source: {
        label: 'Lindgaard et al., Behaviour & Information Technology, 2006',
        url: 'https://www.tandfonline.com/doi/abs/10.1080/01449290500330448',
      },
    },

    { kind: 'h2', text: 'Three things we changed first' },
    {
      kind: 'p',
      text: 'Before touching layout, we rewrote the same three places on every page. In most cases that alone moved the number enough to justify the audit.',
    },

    { kind: 'h3', text: '1. The subheadline names the reader' },
    {
      kind: 'p',
      text: 'Headlines get all the attention and most of the budget. The line under it does the real work: it says who this is for and what changes for them. "Analytics for teams" becomes "See which of your ads actually pay, without a data analyst."',
    },

    { kind: 'h3', text: '2. The button says what happens next' },
    {
      kind: 'p',
      text: '"Get started" is not a promise, it is a shrug. "Start free — no card" is a promise. People hesitate over buttons far longer than designers assume, and the label is the only information they have at that moment.',
    },

    { kind: 'h3', text: '3. The first objection appears above the fold' },
    {
      kind: 'p',
      text: 'Every product has one question that stops people cold: price, setup time, lock-in, migration. Burying it three sections down does not delay the doubt, it just sends the reader to a competitor to find the answer.',
    },

    {
      kind: 'fact',
      title: 'Pretty reads as usable — whether or not it is',
      text: 'Kurosu and Kashimura tested 26 variations of an ATM interface with 252 participants. How attractive people found a layout predicted how easy they thought it was to use far better than how easy it actually was. Good looks buy you patience and trust. They do not buy you a decision — that still comes from what the page says.',
      source: {
        label: 'Kurosu & Kashimura, CHI ’95 — summarised by NN/g',
        url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/',
      },
    },

    { kind: 'h2', text: 'What we stopped recommending' },
    {
      kind: 'list',
      items: [
        '**Longer pages.** Adding sections to a page nobody finishes is a way to feel productive, not to convert.',
        '**Social proof without specifics.** "Loved by thousands" reads as decoration. One customer sentence with a number reads as evidence.',
        '**Animation on the primary path.** A 400 ms reveal between the reader and the signup button costs more than it adds.',
      ],
    },

    { kind: 'h2', text: 'So when is it actually design?' },
    {
      kind: 'p',
      text: 'Two of the eleven pages did need rebuilding — both were product dashboards pretending to be marketing sites, with navigation nobody could parse. That is a real design problem and no copy edit saves it.',
    },
    {
      kind: 'p',
      text: 'But if your page is readable, loads fast and still converts under 1%, start with the words. They are cheaper to change and they tell you what to redesign.',
    },
  ],
}

export const posts: Post[] = [
  {
    slug: 'design-system-nobody-maintains',
    title: 'The design system nobody maintains',
    category: 'process',
    categoryLabel: 'Process',
    date: '28 May 2026',
    read: '6 min',
    excerpt:
      'Three months of component work, abandoned in five weeks. Here is what we do differently now, and why documentation was never the problem.',
    image: '/blog/design-system-nobody-maintains.jpg',
    cover: 'system',
    coverCaption: 'Every abandoned system looks identical from the inside.',
    body: [
      {
        kind: 'p',
        text: 'We have now watched four design systems die. Different companies, different tools, the same autopsy: a beautiful library, a documentation site nobody opened, and a product team quietly building one-off components next to it.',
      },
      {
        kind: 'p',
        text: 'The usual explanation is **"we ran out of time to document it."** We no longer believe that. Every one of those systems had documentation. What they did not have was a reason for anyone to keep using it on a bad Tuesday.',
      },

      { kind: 'h2', text: 'A system built in isolation is a proposal, not a system' },
      {
        kind: 'p',
        text: 'The failed ones were all built the same way: a designer disappeared for two or three months, then presented a finished library. It was complete, consistent, and completely disconnected from the screens the team was actually shipping that quarter.',
      },
      {
        kind: 'p',
        text: 'The first time a real feature needed something the library did not have, someone made an exception. The second exception took ten minutes to justify. By the fifth, the library was a museum.',
      },
      {
        kind: 'quote',
        text: 'A component nobody had to fight for is a component nobody defends.',
      },

      {
        kind: 'fact',
        title: 'We overvalue what we built ourselves',
        text: 'Norton, Mochon and Ariely called it the IKEA effect: people place a disproportionately high value on things they assembled themselves, even badly. It explains both halves of the problem. The author of the system cannot see why anyone would deviate from it — and the developer who hand-rolled their own dropdown last sprint is genuinely attached to it. Shared ownership is not a nice-to-have here. It is the mechanism.',
      },

      { kind: 'h2', text: 'What we do instead' },
      {
        kind: 'list',
        items: [
          '**Build it out of real screens.** No component enters the library until it has appeared in two different places in the actual product. The second appearance is what proves it is a pattern and not a one-off.',
          '**Name an owner per section.** Not a committee. One person who gets pinged when a button needs a new state.',
          '**Budget the maintenance out loud.** We quote design system work as an ongoing line, not a one-off deliverable. A system with no maintenance budget has a scheduled death date, and everyone should know it.',
          '**Make the shortcut the correct path.** If reaching for the library is slower than copy-pasting a div, the library loses. Every time.',
        ],
      },

      { kind: 'h2', text: 'Documentation is the last 10%' },
      {
        kind: 'p',
        text: 'We still write it. But we write it after the system has survived contact with three or four features, and we keep it in the same place developers already live — the repo, not a separate site that requires a second login.',
      },
      {
        kind: 'p',
        text: 'The one system of the four that is still alive two years later has the worst documentation of the lot. It also has two named owners, a monthly hour blocked for cleanup, and a rule that new components arrive with the feature that needed them. That turned out to matter more than any page of guidelines.',
      },
    ],
  },

  {
    slug: 'stop-testing-onboarding-on-designers',
    title: 'Stop testing onboarding on designers',
    category: 'ux',
    categoryLabel: 'UX',
    date: '14 May 2026',
    read: '5 min',
    excerpt:
      'Your team knows where everything is. That is exactly why they are the worst people to validate a first-run experience.',
    image: '/blog/stop-testing-onboarding-on-designers.jpg',
    cover: 'dropoff',
    coverCaption: 'The first run happens exactly once per person.',
    body: [
      {
        kind: 'p',
        text: 'There is a specific kind of meeting where a team walks through their own onboarding, agrees it is clear, and ships it. Two weeks later activation has not moved and nobody can say why.',
      },
      {
        kind: 'p',
        text: 'The reason is boring: **you cannot un-know your own product.** Once you know the account has to be created before the workspace, every screen that says so feels redundant. To a new user, it is the only thing holding the flow together.',
      },

      { kind: 'h2', text: 'The curse of knowledge, in practice' },
      {
        kind: 'p',
        text: 'Designers and developers do not just know more than the new user. They know a different shape of the product. They think in objects — workspace, project, member. New users think in intentions — "I want to see if this thing can do X before I invite my boss."',
      },
      {
        kind: 'p',
        text: 'When those two models disagree, the interface usually wins the argument and the user leaves.',
      },

      {
        kind: 'fact',
        title: 'Five strangers beat five colleagues',
        text: 'Nielsen and Landauer modelled how usability problems surface as you add testers: with an average detection rate around 31% per person, five users tend to reveal roughly 85% of the problems in a design. Worth knowing the caveat too — across a hundred five-user tests the real range ran from about 55% to 95%, depending on who was recruited. Five is enough to start. Five of the wrong people is still zero.',
        source: {
          label: 'Nielsen & Landauer, 1993 — explained by NN/g',
          url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
        },
      },

      { kind: 'h2', text: 'What a useful first-run test looks like' },
      {
        kind: 'list',
        items: [
          '**Recruit people who match the buyer, not the budget.** A friend from another department is convenient and worthless. They already trust you.',
          '**Give a goal, not a script.** "Get to the point where you would know if this is worth paying for." Then stop talking.',
          '**Watch where they stop talking.** Silence and re-reading are the signal. People rarely announce confusion; they just slow down.',
          '**Test the empty state.** Most onboarding demos run on seeded data. Real accounts open with nothing in them, and that screen is doing more persuasion than any tour.',
        ],
      },

      {
        kind: 'quote',
        text: 'If you have to explain the flow before the test starts, you have already found the problem.',
      },

      { kind: 'h2', text: 'One habit worth stealing' },
      {
        kind: 'p',
        text: 'We ask every new hire to sign up for the client product on their first day, alone, while recording their screen. They will never be that ignorant again, and that ignorance is the most valuable thing they own for about forty minutes.',
      },
      {
        kind: 'p',
        text: 'Those recordings have caught more onboarding problems than any workshop we have run.',
      },
    ],
  },

  {
    slug: 'six-weeks-or-it-never-ships',
    title: 'Six weeks or it never ships',
    category: 'process',
    categoryLabel: 'Process',
    date: '30 April 2026',
    read: '8 min',
    excerpt:
      'Every project we ran longer than six weeks lost momentum somewhere in the middle. So we stopped selling longer ones.',
    image: '/blog/six-weeks-or-it-never-ships.jpg',
    cover: 'timeline',
    coverCaption: 'The middle of a long project is where projects go to die.',
    body: [
      {
        kind: 'p',
        text: 'We used to sell three-month engagements. They were more profitable on paper and easier to staff. They also produced our only two genuinely unhappy clients, and both times the trouble started in exactly the same place: week six.',
      },
      {
        kind: 'p',
        text: 'Not because anything broke. Because nothing did. Week six is where a long project stops feeling urgent to everyone involved.',
      },

      {
        kind: 'fact',
        title: 'Work expands to fill the time available',
        text: "Cyril Northcote Parkinson wrote it as a joke in The Economist in 1955, and it has outlived most serious management theory. The practical version for design work: a decision that must be made this Thursday takes an afternoon. The same decision with a month of runway takes a month — and produces a slightly worse answer, because it collects opinions the whole time.",
      },

      { kind: 'h2', text: 'What actually goes wrong' },
      {
        kind: 'p',
        text: 'Long projects fail in slow motion, and always through the same three doors.',
      },
      {
        kind: 'list',
        items: [
          '**The scope gets amended, politely.** Nobody asks for a redesign. They ask for "just one more state" eleven times.',
          '**The decision-maker drifts away.** The founder who was in every call in week one is now forwarding screenshots to someone who was not.',
          '**The team stops feeling the deadline.** A date twelve weeks out is not a deadline, it is a weather forecast.',
        ],
      },

      { kind: 'h2', text: 'Six weeks, and the scope bends' },
      {
        kind: 'p',
        text: 'The fix was not working faster. It was fixing the date and letting the scope move instead. We now sell six-week blocks with a hard end and a ranked list of what goes in. When something new arrives mid-flight, it does not extend the date — it pushes the lowest-ranked item out.',
      },
      {
        kind: 'quote',
        text: 'A fixed date with a flexible scope ships. A fixed scope with a flexible date negotiates.',
      },
      {
        kind: 'p',
        text: 'Clients push back on this exactly once, usually in the first week. Then something gets cut, the site launches on the promised day, and the cut item turns out to have been optional all along. That conversation has happened often enough that we now have it up front.',
      },

      { kind: 'h2', text: 'What six weeks buys you' },
      {
        kind: 'p',
        text: 'Discovery in week one. Design through weeks two to four, with a live link from the first Friday. Build and hardening in five and six. Everything the client sees is real and clickable by the second week, which means the arguments happen while they are still cheap.',
      },
      {
        kind: 'p',
        text: 'Bigger products obviously take longer than six weeks. They just do not take one six-week block — they take three of them, each with its own end date and its own shippable result. The rhythm is the point, not the total.',
      },
    ],
  },

  {
    slug: 'pricing-pages-are-product-design',
    title: 'Pricing pages are product design, not marketing',
    category: 'business',
    categoryLabel: 'Business',
    date: '11 April 2026',
    read: '7 min',
    excerpt:
      'The page where people decide to pay you gets treated like a brochure. We rebuilt one as a product surface and trials went up 27%.',
    cover: 'plans',
    coverCaption: 'The highest-intent screen on most sites.',
    body: [
      {
        kind: 'p',
        text: 'On most sites the pricing page has the highest intent and the least design attention. It is written by marketing, reviewed by finance, and built last. Yet it is the only page where the visitor has already decided they want the thing and is now deciding whether to trust the number.',
      },
      { kind: 'p', text: 'That is not a brochure. That is a decision interface.' },

      { kind: 'h2', text: 'Too many plans is not generosity' },
      {
        kind: 'p',
        text: 'The most common thing we remove is a plan. Teams add tiers to catch every segment, and each one adds a comparison the visitor now has to perform.',
      },

      {
        kind: 'fact',
        title: 'More options, slower decisions',
        text: "Hick's law — from Hick's 1952 work and Hyman's in 1953 — says the time to make a choice grows with the number and complexity of the options, roughly logarithmically. It is not a licence to strip everything down to one button. It is a reminder that every extra column is a cost paid by every visitor, whether or not that column was for them.",
        source: { label: 'Hick’s law — Laws of UX', url: 'https://lawsofux.com/hicks-law/' },
      },

      { kind: 'h2', text: 'What we change first' },
      {
        kind: 'list',
        items: [
          '**One recommended plan, visibly recommended.** Not because it is a trick, but because an unguided comparison is work the visitor did not sign up for.',
          '**Feature names in the buyer’s words.** "Unlimited seats" is a feature. "Your whole team, no per-person maths" is an answer to what they were actually worried about.',
          '**The objection next to the price.** Contract length, what happens after the trial, whether a card is needed. Every unanswered one of these sends people to your competitor to find out.',
          '**A visible exit.** Downgrade and cancellation terms stated plainly increase signups. Reversibility is what makes a decision cheap.',
        ],
      },

      {
        kind: 'quote',
        text: 'People do not abandon pricing pages because it costs too much. They abandon them because they cannot tell what happens next.',
      },

      {
        kind: 'fact',
        title: 'The plan nobody buys still does work',
        text: 'Dan Ariely popularised a case from The Economist: a subscription offer where a print-only option nobody chose made the print-plus-web bundle look obviously correct. Remove the unwanted option and preferences shift. Anchors and decoys are real and they are already operating on your page — the question is only whether you arranged them deliberately or by accident.',
      },

      { kind: 'h2', text: 'The 27%' },
      {
        kind: 'p',
        text: 'On the rebuild we keep quoting, trials rose 27% and the price did not change. We removed a fourth plan, moved the annual/monthly toggle above the cards instead of below, rewrote nine feature labels, and put the "no card required" line inside the button area instead of in the footnote.',
      },
      {
        kind: 'p',
        text: 'None of that is marketing copy. All of it is interface design applied to the moment someone decides to pay you.',
      },
    ],
  },

  {
    slug: 'what-we-ask-before-we-quote',
    title: 'What we ask before we quote',
    category: 'business',
    categoryLabel: 'Business',
    date: '26 March 2026',
    read: '4 min',
    excerpt:
      'Nine questions. If a client cannot answer four of them, the estimate will be wrong and both sides will be unhappy by week three.',
    image: '/blog/what-we-ask-before-we-quote.jpg',
    cover: 'checklist',
    coverCaption: 'The estimate is only as good as the questions behind it.',
    body: [
      {
        kind: 'p',
        text: 'A studio that quotes fast looks responsive. It is also how you end up rebuilding the same page three times for free. We now refuse to put a number on anything until we have answers to nine questions, and we say so on the first call.',
      },

      {
        kind: 'fact',
        title: 'Everyone underestimates, including us',
        text: 'Kahneman and Tversky named the planning fallacy in 1979: people predict how long their own work will take based on how it should go, discounting how similar work has actually gone before. The fix is not optimism management. It is asking questions whose answers are facts about the past rather than hopes about the future.',
      },

      { kind: 'h2', text: 'The nine' },
      {
        kind: 'list',
        items: [
          '**Who signs off?** One name. If the answer is a list, the timeline has a problem before it starts.',
          '**What has to be true on launch day for this to have been worth it?** The answer is the actual brief.',
          '**What are you measuring now?** If nothing, the first deliverable is analytics, not design.',
          '**Where does the content come from?** Late copy is the single most common cause of a missed date.',
          '**What already exists?** Brand, design system, component library, CMS. Half of estimating is finding out what you do not have to build.',
          '**Who builds it after us?** A team that inherits the code needs different handoff than a team that never touches it.',
          '**What did you try before?** The failed attempt is usually more informative than the brief.',
          '**What is genuinely fixed?** Date, budget or scope — one of the three. Not all three.',
          '**What happens if we do nothing?** If the honest answer is "not much", the project will lose to something urgent by week three.',
        ],
      },

      {
        kind: 'quote',
        text: 'If four of these are unanswerable, we are not quoting a project. We are quoting a guess.',
      },

      { kind: 'h2', text: 'What we do when the answers are missing' },
      {
        kind: 'p',
        text: 'We sell a paid discovery week instead. It is small, fixed and produces a scope both sides can price. Clients who hesitate at a discovery week were never going to be happy with a fixed quote built on assumptions — and finding that out for the cost of one week is cheap for everybody.',
      },
      {
        kind: 'p',
        text: 'Every project we ran that went badly, we can trace back to a question on this list that we let slide because the client seemed keen and we wanted the work.',
      },
    ],
  },

  {
    slug: 'animations-costing-conversions',
    title: 'Your animations are costing you conversions',
    category: 'dev',
    categoryLabel: 'Development',
    date: '8 March 2026',
    read: '6 min',
    excerpt:
      'We love motion. We also measured what happens when a 400ms transition sits between a user and a submit button.',
    image: '/blog/animations-costing-conversions.jpg',
    cover: 'motion',
    coverCaption: 'Motion on the primary path is a tax on every visit.',
    body: [
      {
        kind: 'p',
        text: 'This studio likes motion. There is a canvas animation on our own homepage. So take this as a confession rather than a lecture: most of the animation we shipped in our first years was costing our clients money.',
      },
      {
        kind: 'p',
        text: 'Not the decorative kind. The kind that sits **on the path** — a reveal before the form appears, a 400 ms modal, a scroll-triggered fade between the reader and the button they came to press.',
      },

      {
        kind: 'fact',
        title: 'The 400 ms line',
        text: 'In 1982 Walter Doherty and Arvind Thadani published work at IBM arguing that computer response time should be under 400 ms rather than the two seconds accepted at the time. Below that threshold, productivity and satisfaction rose sharply — the machine stopped interrupting the user’s train of thought. Four decades later it is still a useful ceiling: past roughly 400 ms, your transition is no longer polish, it is latency.',
        source: { label: 'Doherty threshold — Laws of UX', url: 'https://lawsofux.com/doherty-threshold/' },
      },

      { kind: 'h2', text: 'What we measure now' },
      {
        kind: 'p',
        text: 'Before and after any motion work we log time-to-first-interaction on the primary CTA — not page load, but how long from arrival until the visitor can actually act. Two rules came out of it and we have not broken them since.',
      },
      {
        kind: 'list',
        items: [
          '**Nothing animates between the user and the primary action.** Forms, buttons and pricing appear. They do not arrive.',
          '**Feedback animation stays under 200 ms; transitions under 300 ms.** Anything slower gets a reason written down next to it.',
        ],
      },

      {
        kind: 'quote',
        text: 'Animation is free when it runs alongside the user and expensive the moment it runs in front of them.',
      },

      { kind: 'h2', text: 'Scroll reveals deserve a special mention' },
      {
        kind: 'p',
        text: 'Fade-in-on-scroll is the most-copied effect on the web and the easiest to get wrong. Two failure modes we see constantly: content that never appears because the observer never fires on a fast scroll, and reveals applied to text a visitor is actively trying to read.',
      },
      {
        kind: 'p',
        text: 'Our rule is that a reveal may run once, must complete under 800 ms, and must never gate something the visitor scrolled specifically to find.',
      },

      { kind: 'h2', text: 'The accessibility part is not optional' },
      {
        kind: 'p',
        text: 'Motion is not merely an aesthetic preference for everyone. Parallax and large-scale movement can trigger nausea and dizziness in people with vestibular disorders. Every operating system now exposes a "reduce motion" setting, and honouring it takes one media query.',
      },
      {
        kind: 'p',
        text: 'If your site ignores `prefers-reduced-motion`, some share of visitors are closing the tab for reasons your analytics will never explain.',
      },
    ],
  },

  {
    slug: 'dark-mode-is-not-a-feature',
    title: 'Dark mode is not a feature',
    category: 'ux',
    categoryLabel: 'UX',
    date: '19 February 2026',
    read: '5 min',
    excerpt:
      'It is a second design system with its own contrast rules, its own bugs and its own maintenance cost. Decide that on purpose.',
    image: '/blog/dark-mode-is-not-a-feature.jpg',
    cover: 'duotone',
    coverCaption: 'Two themes means two of everything.',
    body: [
      {
        kind: 'p',
        text: 'Dark mode arrives in the backlog as a checkbox. It behaves like a fork. From the moment you ship it you have two colour systems, two sets of contrast decisions, two screenshot sets in your marketing, and every future component has to be born twice.',
      },
      {
        kind: 'p',
        text: 'We are not against it. This site is dark. We are against treating it as a toggle someone can add in a sprint.',
      },

      { kind: 'h2', text: 'Inverting is not designing' },
      {
        kind: 'p',
        text: 'The naive version flips the palette and calls it done. Then the problems show up: pure white text on pure black vibrates, shadows stop conveying elevation because there is nothing left to darken, brand colours that sang on white turn muddy, and every illustration with a transparent background disappears.',
      },
      {
        kind: 'list',
        items: [
          '**Elevation has to be rebuilt.** Light themes raise surfaces with shadow. Dark themes raise them with lightness — the higher the surface, the lighter it gets.',
          '**Brand colours usually need a second tint.** The accent that passes contrast on white rarely passes on near-black.',
          '**Pure black and pure white are both traps.** Maximum contrast produces halation, where light text bleeds into dark background. It is more pronounced for people with astigmatism.',
          '**Images need a plan.** Transparent PNGs, screenshots and logos all assume a background colour somewhere.',
        ],
      },

      {
        kind: 'fact',
        title: 'The contrast floor is a number, not an opinion',
        text: 'WCAG sets 4.5:1 for normal text and 3:1 for large text — and it applies to both themes independently. A palette that passes in light mode tells you nothing about the dark one. This is also the most common thing we find failing in a dark theme that was added late: secondary and disabled text, where designers reach for a grey that looked fine on white.',
      },

      { kind: 'h2', text: 'The honest cost' },
      {
        kind: 'p',
        text: 'Roughly a third more design time on any new component, and a permanent second column in every visual QA pass. That is the real price, and it is worth paying when your product is used at night, for long sessions, or by developers — audiences who will genuinely ask for it.',
      },
      {
        kind: 'quote',
        text: 'Ship one theme you have thought about rather than two you have inverted.',
      },
      {
        kind: 'p',
        text: 'If you do commit, build it from semantic tokens on day one — `surface`, `text-primary`, `border-subtle` — never raw hex values in components. Retrofitting tokens into a codebase that hardcoded colours is a far bigger job than the theme itself.',
      },
    ],
  },

  {
    slug: 'handoff-is-a-process',
    title: 'Handoff is a process, not a Figma link',
    category: 'dev',
    categoryLabel: 'Development',
    date: '2 February 2026',
    read: '6 min',
    excerpt:
      'The build never matches the mockup when design and development are separate contracts. Here is the checklist we use instead.',
    image: '/blog/handoff-is-a-process.jpg',
    cover: 'seam',
    coverCaption: 'The gap between the file and the build.',
    body: [
      {
        kind: 'p',
        text: 'The word "handoff" describes the problem accurately. Something is finished, then thrown. What lands on the other side is a static picture of a system that has to work in states the picture never showed.',
      },
      {
        kind: 'p',
        text: 'Mockups are complete by definition. Products are not. Every gap between them gets filled by a developer making a design decision at 6pm without the context to make it well.',
      },

      {
        kind: 'fact',
        title: 'Your org chart ships in the product',
        text: "Melvin Conway observed in 1968 that systems end up mirroring the communication structure of the organisation that built them. Hire design and development as two separate contracts and you will get an interface with a seam down the middle of it — not because anyone was careless, but because the two halves never had a cheap way to talk.",
      },

      { kind: 'h2', text: 'What is missing from every mockup' },
      {
        kind: 'p',
        text: 'These are the states we now require before anything is called ready. Most of the arguments between designers and developers are actually one of these being undefined.',
      },
      {
        kind: 'list',
        items: [
          '**Empty.** What a new account sees. Usually the most-viewed screen in the product and the least designed.',
          '**Loading.** Skeleton, spinner, or nothing — decided, not defaulted.',
          '**Error.** Per field and per page, with the actual sentence written out.',
          '**Too much.** The longest name, the 400-character description, the forty-item list.',
          '**Too little.** One item. Zero items. A name with two letters.',
          '**Permissions.** What the read-only user sees where the button used to be.',
        ],
      },

      {
        kind: 'quote',
        text: 'A design is finished when its ugliest state has been drawn, not its prettiest.',
      },

      { kind: 'h2', text: 'What replaced handoff for us' },
      {
        kind: 'p',
        text: 'One team, one repository, and a live staging link from the first week. Designers review in the browser rather than in the file — because the browser is where the type renders differently, the shadow is heavier and the hover state exists.',
      },
      {
        kind: 'p',
        text: 'We also stopped treating the design file as the source of truth. Once a component is built, the built one is canonical and the file follows it. A file that disagrees with production is not documentation, it is misinformation.',
      },
      {
        kind: 'p',
        text: 'If you must work with two vendors, buy them a shared weekly call and put the states checklist above in the contract. It costs an hour a week and saves the argument about who was supposed to design the empty state.',
      },
    ],
  },
]

/** Все посты одним списком — для страницы поста и навигации «следующий». */
export const allPosts: Post[] = [featuredPost, ...posts]
