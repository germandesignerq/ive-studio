import { Link } from '@/i18n/Link'
import { Nav } from '@/components/Nav'
import { FooterSlim } from '@/components/Footer'

const sections = [
  { id: 'who', label: '1. Who we are' },
  { id: 'what', label: '2. What we collect' },
  { id: 'why', label: '3. Why we collect it' },
  { id: 'cookies', label: '4. Cookies and analytics' },
  { id: 'third', label: '5. Who else sees it' },
  { id: 'keep', label: '6. How long we keep it' },
  { id: 'rights', label: '7. Your rights' },
  { id: 'security', label: '8. Security' },
  { id: 'children', label: '9. Children' },
  { id: 'changes', label: '10. Changes' },
]

export function Privacy() {

  return (
    <>
      <Nav source="privacy" back={{ label: 'Back to site', to: '/' }} />

      <header className="pt-[150px] pb-[34px] max-[680px]:pt-[120px]">
        <div className="doc">
          <span className="eyebrow block">Legal</span>
          <h1 className="mt-4 text-[clamp(34px,5vw,54px)] tracking-[-.045em]">Privacy Policy</h1>
          <p className="mt-4 font-label text-[16px] text-fg-2">Last updated: 27 July 2026</p>
        </div>
      </header>

      <div className="doc mt-11 rounded-md-x border border-[rgba(233,201,127,.24)] bg-[rgba(233,201,127,.05)] p-[22px_24px]">
        <b className="font-semibold text-gold">Before you publish this</b>
        <p className="mt-2 text-[15.5px] leading-[1.55] font-light text-fg-2">
          This is a working draft written to match what the site actually does. Fill in the bracketed
          details, then have a lawyer review it — especially if you take clients in the EU or
          California. Rules differ by country and this page is not legal advice.
        </p>
      </div>

      <nav className="doc mt-14 border-t border-line pt-[26px]">
        <span className="eyebrow">Contents</span>
        <ul className="mt-4 grid grid-cols-2 gap-x-[30px] gap-y-[10px] max-[680px]:grid-cols-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[15.5px] text-fg-2 transition-colors hover:text-gold">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="doc [&_.s]:pt-[52px] [&_.s_p]:text-[17px] [&_.s_p]:leading-[1.65] [&_.s_p]:font-light [&_.s_p]:text-fg-2 [&_.s_p+p]:mt-4 [&_.s_b]:font-medium [&_.s_b]:text-fg [&_.s_a]:border-b [&_.s_a]:border-[rgba(233,201,127,.35)] [&_.s_a]:text-gold">
        <Section id="who" title="1. Who we are">
          <p>
            IVE studio (“we”, “us”) operates this website. For data protection purposes we are the
            data controller.
          </p>
          <p>
            <b>Legal entity:</b> [full company name]
            <br />
            <b>Registered address:</b> [address]
            <br />
            <b>Registration number:</b> [number]
            <br />
            <b>Contact:</b> <a href="mailto:ivedesign93@gmail.com">ivedesign93@gmail.com</a>
          </p>
        </Section>

        <Section id="what" title="2. What we collect">
          <p>
            We collect very little, and only two ways: you type it into a form, or your browser
            reports it automatically.
          </p>
          <Table
            head={['Data', 'Where it comes from']}
            rows={[
              ['Name', 'The “Book a call” form. Required.'],
              ['Email address', 'The “Book a call” form. Required.'],
              ['Company or website', 'The form. Optional.'],
              [
                'Project details, budget range, timeline',
                'Whatever you choose to write in the message field.',
              ],
              [
                'Which page you sent the form from',
                'Recorded automatically so we know which project you were reading about.',
              ],
              [
                'IP address, browser, device, referring page',
                'Sent by your browser to our hosting provider and analytics.',
              ],
            ]}
          />
          <p>
            We do not ask for payment card details anywhere on this site, and we do not collect
            special categories of data such as health or biometric information.
          </p>
        </Section>

        <Section id="why" title="3. Why we collect it">
          <Bullets
            items={[
              [
                'To answer you.',
                'Without a name and email we cannot reply to a project request. Legal basis: taking steps at your request before entering a contract.',
              ],
              [
                'To run and improve the site.',
                'Aggregate traffic data tells us which pages work. Legal basis: our legitimate interest in a functioning website.',
              ],
              [
                'To keep records.',
                'If we end up working together, correspondence becomes part of the project file. Legal basis: contract and legal obligation.',
              ],
            ]}
          />
          <p>
            We do not sell your data, we do not share it with advertisers, and we will not add you to
            a marketing list because you asked about a project.
          </p>
        </Section>

        <Section id="cookies" title="4. Cookies and analytics">
          <p>This site sets no advertising or tracking cookies of its own.</p>
          <p>
            [If you enable analytics, describe it here. For example: “We use Vercel Analytics, which
            counts page views without cookies and without storing personal identifiers.” If you
            switch to Google Analytics, you must say so, name the cookies, and add a consent banner
            before it loads in the EU and UK.]
          </p>
        </Section>

        <Section id="third" title="5. Who else sees it">
          <p>A short list of services that process data on our behalf:</p>
          <Table
            head={['Service', 'What it handles']}
            rows={[
              ['[Hosting provider]', 'Serves the website. Receives your IP address and request logs.'],
              ['[Form provider]', 'Delivers form submissions to our inbox.'],
              [
                'Google Fonts',
                'Serves the typefaces used on this site. Your IP address is sent to Google when a font loads.',
              ],
              ['[Email provider]', 'Stores our correspondence with you.'],
            ]}
          />
          <p>
            Some of these providers operate outside your country. Where data leaves the EEA or the
            UK, transfers rely on standard contractual clauses or an adequacy decision.
          </p>
        </Section>

        <Section id="keep" title="6. How long we keep it">
          <Bullets
            items={[
              ['Enquiries that go nowhere:', 'deleted after 12 months.'],
              [
                'Client correspondence and project files:',
                'kept for the length of the engagement plus [X] years, as required for accounting and to defend legal claims.',
              ],
              [
                'Server and analytics logs:',
                'retained by our providers according to their own schedules, typically under 14 months.',
              ],
            ]}
          />
        </Section>

        <Section id="rights" title="7. Your rights">
          <p>
            Depending on where you live, you can ask us to show you the data we hold about you,
            correct it, delete it, restrict what we do with it, hand it over in a portable format, or
            object to processing based on legitimate interest.
          </p>
          <p>
            Write to <a href="mailto:ivedesign93@gmail.com">ivedesign93@gmail.com</a> and we will respond within
            30 days. There is no charge. If you are unhappy with our answer, you can complain to your
            national data protection authority.
          </p>
          <p>
            California residents: we do not sell or share personal information as those terms are
            defined by the CCPA, and we will not discriminate against you for exercising any right.
          </p>
        </Section>

        <Section id="security" title="8. Security">
          <p>
            The site is served over HTTPS. Access to form submissions and our inbox is limited to the
            people who need it and protected by two-factor authentication. No system is perfectly
            secure, but if a breach affects your data we will tell you and the relevant authority
            without undue delay.
          </p>
        </Section>

        <Section id="children" title="9. Children">
          <p>
            This site is aimed at businesses and is not directed at anyone under 16. We do not
            knowingly collect data from children. If you believe a child has sent us information,
            write to us and we will delete it.
          </p>
        </Section>

        <Section id="changes" title="10. Changes">
          <p>
            If we change how we handle data, we will update this page and the date at the top.
            Material changes will be announced on the site for at least 30 days.
          </p>
        </Section>

        <div className="mt-[70px] border-t border-line pt-9">
          <p className="text-[17px] font-light text-fg-2">
            Questions about any of this? Write to{' '}
            <a href="mailto:ivedesign93@gmail.com" className="text-gold">
              ivedesign93@gmail.com
            </a>{' '}
            — a person reads it.
          </p>
        </div>
      </main>

      <div className="mt-[90px]">
        <FooterSlim>
          <Link to="/">Back to home</Link>
        </FooterSlim>
      </div>
    </>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="s">
      <h2 id={id} className="mb-[18px] scroll-mt-[100px] text-[26px] tracking-[-.03em]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Table({ head, rows }: { head: [string, string]; rows: Array<[string, string]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-5 w-full border-collapse text-[16px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-line py-[14px] pr-4 text-left font-label text-[14.5px] font-medium tracking-[.18em] uppercase text-fg-2"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}>
              <td className="border-b border-line py-[14px] pr-7 align-top leading-[1.5] text-fg">
                {a}
              </td>
              <td className="border-b border-line py-[14px] align-top leading-[1.5] font-light text-fg-2">
                {b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Bullets({ items }: { items: Array<[string, string]> }) {
  return (
    <ul className="bul mt-4">
      {items.map(([b, text]) => (
        <li key={b} className="flex gap-[13px] py-[7px] text-[17px] leading-[1.6] font-light text-fg-2">
          <span>
            <b className="font-medium text-fg">{b}</b> {text}
          </span>
        </li>
      ))}
    </ul>
  )
}
