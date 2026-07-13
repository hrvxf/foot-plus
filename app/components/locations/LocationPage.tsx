import Link from "next/link";
import Button from "../Button";
import type { LocationPage as LocationPageData } from "../../lib/location-pages";
import { bookingHref, emailHref, phoneDisplay, phoneHref, prices } from "../../lib/site";

const services = [
  { label: "New patient foot health assessment", href: "/services" },
  { label: "Routine foot care", href: "/services" },
  { label: "Toenail cutting and nail care", href: "/toenail-cutting-bristol" },
  { label: "Thickened toenail care", href: "/toenail-cutting-bristol" },
  { label: "Hard skin and callus reduction", href: "/hard-skin-treatment-bristol" },
  { label: "Corn care", href: "/corn-removal-bristol" },
  { label: "Cracked heel care", href: "/cracked-heels-bristol" },
  { label: "Diabetic foot checks", href: "/services" },
];

const reasons = [
  { label: "Difficulty cutting toenails", href: "/toenail-cutting-bristol" },
  { label: "Thickened or awkward toenails", href: "/toenail-cutting-bristol" },
  { label: "Painful hard skin", href: "/hard-skin-treatment-bristol" },
  { label: "Calluses", href: "/callus-removal-bristol" },
  { label: "Corns", href: "/corn-removal-bristol" },
  { label: "Cracked heels", href: "/cracked-heels-bristol" },
  { label: "General foot maintenance", href: "/services" },
  { label: "Diabetic foot checks", href: "/services" },
];

const benefitItems = ["People who find travelling difficult", "People with reduced mobility", "People who find it difficult to reach their feet", "People who prefer care in familiar surroundings", "People who want practical home-based appointments", "Busy patients who prefer care at home"];
const safetyItems = ["open wounds or bleeding", "signs of infection", "sudden swelling", "severe or unexplained pain", "significant loss of sensation", "circulation concerns", "diabetes-related complications", "suspected ingrown toenail infection"];

function CardSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">{title}</h2><div className="mt-4 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">{children}</div></section>;
}

export default function LocalServicePage({ page }: { page: LocationPageData }) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-16 pt-8 md:pt-12">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-brand-charcoal/65"><ol className="flex flex-wrap gap-2"><li><Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/areas-we-cover">Areas We Cover</Link></li><li aria-hidden="true">/</li><li aria-current="page">{page.area}</li></ol></nav>
      <section className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">Home visit foot care</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">{page.intro}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button href={bookingHref} variant="solid">Book an appointment</Button><Button href="/services" variant="outline">View services</Button></div>
      </section>

      <div className="mt-8 space-y-6">
        <CardSection title={`Professional foot care at home in ${page.area}`}><p>{page.description} Home visits can help patients who find travelling difficult, prefer familiar surroundings, or want routine foot health care without attending a clinic.</p></CardSection>
        <CardSection title={`Foot care services available in ${page.area}`}><div className="grid gap-3 sm:grid-cols-2">{services.map(s=><Link key={s.label} href={s.href} className="rounded-xl border border-brand-sageLight/25 bg-brand-offwhite/60 p-3 font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/10">{s.label}</Link>)}</div></CardSection>
        <CardSection title={`Home visits across ${page.area}`}><p className="mb-3 font-semibold text-brand-sageDark">Foot+ provides mobile appointments in {page.area} and nearby parts of Bristol.</p>{page.local.map(p=><p className="mb-3 last:mb-0" key={p}>{p}</p>)}<p className="mt-3">For the wider service area, see <Link className="font-semibold text-brand-sageDark underline" href="/areas-we-cover">areas Foot+ covers</Link>{page.nearby.length ? <>. Nearby pages include {page.nearby.map((n,i)=><span key={n.href}>{i>0 ? ", " : ""}<Link className="font-semibold text-brand-sageDark underline" href={n.href}>{n.title}</Link></span>)}</> : null}.</p></CardSection>
        <CardSection title="Who may benefit from a home visit?"><p>Home-visit foot care can suit a wide range of patients and is not only for one age group or health need.</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{benefitItems.map(i=><li className="rounded-xl bg-brand-sageLight/15 p-3" key={i}>{i}</li>)}</ul></CardSection>
        <CardSection title="Common reasons patients book"><div className="grid gap-3 sm:grid-cols-2">{reasons.map(r=><Link key={r.label} href={r.href} className="font-semibold text-brand-sageDark underline underline-offset-4">{r.label}</Link>)}</div></CardSection>
        <CardSection title="What happens during an appointment?"><ol className="list-decimal space-y-2 pl-5"><li>A brief foot health assessment and review of relevant history.</li><li>Discussion of symptoms, concerns and what you would like help with.</li><li>Appropriate routine foot care, such as nail care or skin care where suitable.</li><li>Advice on aftercare, footwear, moisturising or pressure management where relevant.</li><li>Recommendation to seek additional medical support if a concern falls outside Foot+ scope.</li></ol></CardSection>
        <CardSection title="Pricing"><div className="grid gap-3 sm:grid-cols-2">{prices.map(price=><div key={price.name} className="rounded-xl bg-brand-sageLight/15 p-4"><div className="flex justify-between gap-3"><span className="font-semibold text-brand-sageDark">{price.name}</span><span className="font-semibold text-brand-sageDark">{price.price}</span></div><p className="mt-1 text-sm text-brand-charcoal/70">{price.description}</p></div>)}</div><Link href="/prices" className="mt-4 inline-block font-semibold text-brand-sageDark underline">View full pricing</Link></CardSection>
        <CardSection title="FAQs"><div className="space-y-3">{page.faqs.map(f=><details key={f.question} className="rounded-xl border border-brand-sageLight/25 bg-brand-offwhite/60 p-4"><summary className="cursor-pointer font-semibold text-brand-sageDark">{f.question}</summary><p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{f.answer}</p></details>)}</div></CardSection>
        <CardSection title="When additional medical support may be needed"><p>Please seek appropriate medical care if you have concerns such as:</p><ul className="mt-3 list-disc space-y-1 pl-5">{safetyItems.map(i=><li key={i}>{i}</li>)}</ul></CardSection>
      </div>

      <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-brand-sageDark p-6 text-white shadow-sm md:p-7"><h2 className="font-heading text-2xl font-semibold">Book a home foot care appointment in {page.area}</h2><p className="mt-2 text-sm text-white/85 md:text-base">Appointments take place in your home. Please provide your postcode when enquiring so Foot+ can confirm current availability.</p><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Button href={bookingHref} variant="primary">Book an appointment</Button><a className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10" href={phoneHref}>Call {phoneDisplay}</a><a className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10" href={emailHref}>Email Foot+</a></div></section>
    </main>
  );
}
