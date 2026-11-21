import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DEFAULT_SOCIAL_IMAGE, locationEmails, locationPhones, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/privacy` },
  title: "Privacy Notice",
  description:
    "How Foot+ Bristol and Foot+ Southampton collect, use, share and protect patient information, and your rights.",
  robots: { index: true, follow: true },
};

/** Update this when the notice changes. */
const LAST_UPDATED = "21 November 2026";

/** ICO registration numbers. Leave null until the ICO confirms them; the line is hidden until both are set. */
const ICO_REGISTRATION: Record<"bristol" | "southampton", string | null> = {
  bristol: null,
  southampton: null,
};

const link =
  "font-medium text-brand-sageDark underline decoration-brand-sageDark/30 underline-offset-4 transition hover:decoration-brand-sageDark";

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-heading text-xl font-semibold text-brand-sageDark">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-6 text-brand-charcoal/80">{children}</div>
    </section>
  );
}

/** A table on wider screens; stacked cards on phones so nothing scrolls sideways. */
function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <>
      <ul className="space-y-3 sm:hidden">
        {rows.map((row, i) => (
          <li key={i} className="rounded-xl border border-brand-line p-4">
            <p className="font-semibold text-brand-charcoal">{row[0]}</p>
            <dl className="mt-2 space-y-2">
              {row.slice(1).map((cell, j) => (
                <div key={j}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-sageDark">
                    {head[j + 1]}
                  </dt>
                  <dd>{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-xl border border-brand-line sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-brand-sageDark/5 text-brand-sageDark">
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-brand-line align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const Mail = ({ to }: { to: { display: string; href: string } }) => (
  <a className={link} href={to.href}>
    {to.display}
  </a>
);
const Tel = ({ to }: { to: { display: string; href: string } }) => (
  <a className={link} href={to.href}>
    {to.display}
  </a>
);

export default function PrivacyPage() {
  const icoReady = ICO_REGISTRATION.bristol && ICO_REGISTRATION.southampton;

  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">Privacy Notice</h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Foot+ only collects the information it needs to arrange your visits and look after your feet
        safely. We never sell your information. Last updated {LAST_UPDATED}.
      </p>

      <div className="mt-10 space-y-10">
        <Section title="Who we are">
          <p>
            Foot+ is a mobile foot health service covering Bristol and Southampton. Each location is run by
            its own practitioner, who keeps their own patients&rsquo; records and is responsible for them.
            That practitioner is the data controller for your information under UK data protection law. In
            this notice, &ldquo;we&rdquo; means the Foot+ practitioner who looks after you.
          </p>
          <Table
            head={["Location", "Run by", "Contact"]}
            rows={[
              [
                "Foot+ Bristol",
                "Adam James, sole trader",
                <span key="b">
                  <Tel to={locationPhones.bristol} />
                  <br />
                  <Mail to={locationEmails.bristol} />
                </span>,
              ],
              [
                "Foot+ Southampton",
                "Katie Preston, sole trader",
                <span key="s">
                  <Tel to={locationPhones.southampton} />
                  <br />
                  <Mail to={locationEmails.southampton} />
                </span>,
              ],
            ]}
          />
          {icoReady && (
            <p>
              ICO registration numbers: Bristol {ICO_REGISTRATION.bristol}, Southampton{" "}
              {ICO_REGISTRATION.southampton}.
            </p>
          )}
          <p>
            Your records stay with the location that treats you. Bristol and Southampton don&rsquo;t share
            patient records with each other unless you ask them to.
          </p>
        </Section>

        <Section title="Information we collect">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-semibold text-brand-charcoal">Contact details:</strong> name, address,
              phone number, email and date of birth.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Health information:</strong> medical
              history, current medication, allergies, and conditions such as diabetes that affect foot care.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Care records:</strong> what we see at each
              visit, the treatment given, aftercare advice, and photos of your feet if you agree to them.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Contacts:</strong> your GP and an emergency
              contact.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Visit details:</strong> access or mobility
              needs, appointment history and payments.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Messages:</strong> emails, WhatsApp
              messages and calls with us.
            </li>
          </ul>
          <p>
            Most of this comes from you, or from someone booking on your behalf, such as a relative or
            carer. Please don&rsquo;t send detailed medical information through social media or the website
            contact form. Use our patient form or speak to us directly.
          </p>
        </Section>

        <Section title="How we use it and why we're allowed to">
          <p>
            We use your information to provide your foot care. The law requires us to have a reason, called a
            lawful basis, for each use.
          </p>
          <Table
            head={["What we do", "Lawful basis (UK GDPR)"]}
            rows={[
              [
                "Check whether our service suits you, book visits and provide treatment",
                "Article 6(1)(b): providing the service you asked for",
              ],
              [
                "Keep health and treatment records",
                "Article 9(2)(h): providing health care, by a practitioner who owes you a duty of confidentiality",
              ],
              [
                "Send reminders and follow-ups, take payments and answer your questions",
                "Article 6(1)(f): our legitimate interest in running the service well",
              ],
              [
                "Keep records for insurance, tax and legal reasons",
                "Article 6(1)(c): legal obligation",
              ],
              [
                "Contact your GP, emergency services or a safeguarding team when there is a serious risk to you or someone else",
                "Article 9(2)(c): protecting someone's vital interests, and the safeguarding provisions of the Data Protection Act 2018",
              ],
            ]}
          />
          <p>
            We don&rsquo;t rely on your consent to keep your records, because we need them to treat you
            safely. We still ask your agreement before any treatment, and before sharing your details with
            another professional, except in an emergency.
          </p>
          <p>
            We will only send marketing, such as offers, if you&rsquo;ve asked to receive it. You can opt out at
            any time.
          </p>
        </Section>

        <Section title="Who we share it with">
          <p>
            Both locations use a small number of trusted companies to run the service. They only act on our
            instructions and must keep your information secure.
          </p>
          <Table
            head={["Provider", "What they do", "Where data is held"]}
            rows={[
              ["Splose", "Patient forms, records, appointments and reminders", "Australia, on Amazon Web Services"],
              ["Stripe", "Card payments", "UK, EU and US"],
              ["Neo", "Email", "Ask us for details"],
              ["Resend", "Delivers messages sent through our website forms", "US"],
              ["WhatsApp (Meta)", "Messages, if you choose to contact us this way", "Meta's servers, including outside the UK"],
              ["Vercel", "Runs foot-plus.co.uk", "Global network, US-based company"],
              ["Google", "Shows our service-area map and loads the site's fonts", "US-based company"],
            ]}
          />
          <p>
            When a provider stores data outside the UK, we make sure legal safeguards are in place, such as
            UK-approved contract terms.
          </p>
          <p>
            <strong className="font-semibold text-brand-charcoal">Other professionals.</strong> We may suggest
            you see your GP, a podiatrist, a pharmacist or NHS 111. We&rsquo;ll ask your permission before
            sharing your details with them. The exceptions are an emergency, a serious safeguarding concern,
            or when the law requires it.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep adult patient records for 8 years after your last appointment, then securely delete them.
            This follows the minimum period in the NHS records management code for adult health records.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-semibold text-brand-charcoal">Under-18s:</strong> until their 25th
              birthday, or their 26th if they were 17 when treatment ended.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">
                Enquiries that don&rsquo;t lead to treatment:
              </strong>{" "}
              up to 12 months.
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Payment and tax records:</strong> 6 years,
              as HMRC requires.
            </li>
          </ul>
          <p>
            We may keep a record longer if it&rsquo;s needed for an ongoing complaint, insurance claim or legal
            matter.
          </p>
        </Section>

        <Section title="Keeping it secure">
          <p>
            Records are stored in password-protected systems, and only the practitioner treating you can see
            them. Our devices are locked and encrypted. Any paper notes are kept secure and shredded once
            they&rsquo;ve been added to your digital record.
          </p>
          <p>
            If something goes wrong and your information is put at risk, we&rsquo;ll tell you, and the ICO where
            the law requires it.
          </p>
        </Section>

        <Section title="Your rights">
          <p>You can ask us to:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>give you a copy of the information we hold about you</li>
            <li>correct anything that&rsquo;s wrong or incomplete</li>
            <li>delete your information, where we don&rsquo;t need to keep it by law</li>
            <li>restrict or object to how we use it</li>
            <li>send it to you or another provider in a usable format</li>
          </ul>
          <p>
            We also treat children. For patients under 16, a parent or guardian can make these requests on the
            child&rsquo;s behalf. Young people aged 16 or 17 can usually make them themselves.
          </p>
          <p>
            These requests are free. Contact your practitioner: Bristol on{" "}
            <Tel to={locationPhones.bristol} /> or <Mail to={locationEmails.bristol} />, Southampton on{" "}
            <Tel to={locationPhones.southampton} /> or <Mail to={locationEmails.southampton} />. We&rsquo;ll reply
            within one month.
          </p>
          <p>
            If you&rsquo;re unhappy with how we&rsquo;ve handled your information, please tell us first so we can
            put it right. You also have the right to complain to the Information Commissioner&rsquo;s Office at{" "}
            <a className={link} href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
              ico.org.uk/make-a-complaint
            </a>{" "}
            or on <a className={link} href="tel:+443031231113">0303 123 1113</a>.
          </p>
        </Section>

        <Section id="cookies" title="Our website, cookies and tracking">
          <p>Our website uses two optional tools to understand how it&rsquo;s used and to measure our adverts.</p>
          <Table
            head={["Tool", "What it does", "Needs your agreement?"]}
            rows={[
              ["Meta (Facebook) Pixel", "Measures visits from our Facebook adverts", "Yes, only runs if you accept cookies"],
              ["Google Analytics", "Counts visits and shows which pages are used", "Yes, only runs if you accept cookies"],
            ]}
          />
          <p>
            You can change your choice at any time using the Cookies link at the bottom of each page. Forms on
            the site never send health details to these tools.
          </p>
        </Section>

        <Section title="Changes to this notice">
          <p>We&rsquo;ll update this notice if the way we handle information changes. Last updated {LAST_UPDATED}.</p>
        </Section>
      </div>
    </section>
  );
}
