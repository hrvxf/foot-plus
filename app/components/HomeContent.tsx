import Link from "next/link";
import Button from "./Button";
import HeroSection from "./HeroSection";
import AnimatedFootPlusLogo from "./AnimatedFootPlusLogo";
import type { SVGProps } from "react";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.73a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.36Zm-8.45 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74 1.03 1-3.65-.24-.38a9.9 9.9 0 1 1 8.38 4.59Zm5.74-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.51-.7-.52h-.6c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.45.26-.71.26-1.33.18-1.45-.08-.12-.28-.2-.59-.36Z" />
    </svg>
  );
}

const whatsappHref = `https://wa.me/447380301555?text=${encodeURIComponent(
  "Hi Adam, I’d like to enquire about an appointment with Foot+ Bristol."
)}`;

const trustChips = [
  { label: "Qualified Foot Health Practitioner" },
  { label: "Fully insured" },
  { label: "DBS checked" },
  { label: "Sterile instruments" },
  { label: "Home visits in Bristol" },
  { label: "LGBT friendly", variant: "rainbow" },
];

const serviceLinks = [
  { title: "Toenail cutting", desc: "Routine nail trimming and filing for nails that are difficult to reach or manage.", href: "/toenail-cutting-bristol" },
  { title: "Thickened toenail care", desc: "Careful reduction of thickened nails where suitable, with practical maintenance advice.", href: "/advice/why-toenails-become-thick" },
  { title: "Corn and callus reduction", desc: "Professional care for suitable corns, callus and areas of uncomfortable hard skin.", href: "/callus-removal-bristol" },
  { title: "Routine foot care", desc: "A home-visit appointment for nail care, skin care, assessment and aftercare guidance.", href: "/services" },
];

const steps = [
  { t: "1) Initial discussion", d: "Adam asks about your foot concern, relevant health information and what you would like help with." },
  { t: "2) Assessment and treatment", d: "Your feet are assessed at home before suitable routine nail or skin care is provided." },
  { t: "3) Advice and aftercare", d: "You receive practical advice, follow-up guidance and signposting if another service is more appropriate." },
];

const faqs = [
  { q: "Do you provide home visits throughout Bristol?", a: "Foot+ provides home visits across Bristol from a central BS2 base. Coverage includes central, north, east and south Bristol, with wider nearby areas confirmed by postcode before booking." },
  { q: "How much does a home foot-care appointment cost?", a: "Current Foot+ prices are listed on the prices page. The cost depends on whether you are booking a new patient appointment or a routine follow-up appointment." },
  { q: "Can someone book an appointment for a relative?", a: "Yes. A relative, carer or support worker can help enquire or arrange an appointment, with appropriate consent from the person receiving care." },
  { q: "What information should I provide before a home visit?", a: "Please share the appointment postcode, parking details, stairs, lift access, entry codes, intercom instructions and whether a relative, carer or support worker will be present." },
  { q: "Do you provide toenail cutting at home in Bristol?", a: "Yes. Foot+ provides toenail cutting at home in Bristol as part of professional foot and nail care, including support for nails that are difficult to reach, thickened or awkward to cut." },
];

export default function HomeContent() {
  return (
    <div className="space-y-10 pb-[calc(env(safe-area-inset-bottom)+24px)] md:pb-0">
      <HeroSection className="text-white">
        <div className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-brand-sage/40" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl flex-col items-center gap-12 px-6 pb-2 pt-5 sm:gap-14 md:min-h-[calc(100vh-80px)] md:flex-row md:items-center md:gap-20 md:pb-20 md:pt-8">
          <div className="flex flex-1 flex-col items-center space-y-8 text-center md:space-y-10">
            <div className="space-y-4">
              <div className="relative z-10 flex min-h-55 w-full items-center justify-center overflow-visible">
                <AnimatedFootPlusLogo className="text-white/95 h-36 sm:h-48 md:h-56 lg:h-64" />
              </div>
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] sm:text-[2.75rem] md:text-5xl">Mobile Foot Health Practitioner Bristol</h1>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                Foot+ provides professional foot health appointments across Bristol, delivered by Adam James in the comfort of your own home. This mobile service is designed for people who want routine foot care without travelling to a clinic, including those who find transport, parking, mobility or reaching their feet difficult. Appointments can support toenail cutting, thickened nail care, corn and callus reduction, hard skin care and practical foot-health advice where the concern is within Foot+ scope. A home visit also helps relatives and carers arrange care more easily, because the appointment can take place in familiar surroundings with access needs discussed before the visit.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:justify-center">
              <Button href="/book" variant="primary">Book an appointment</Button>
              <Button href="/prices" variant="secondary">View prices</Button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Ask Foot+ Bristol a question on WhatsApp" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#54bf7a] text-white shadow-md shadow-black/10 transition hover:bg-[#46ad6d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-analytics-id="hero-whatsapp"><WhatsAppIcon className="h-[1.55rem] w-[1.55rem]" /></a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/25 bg-white/12 p-6 shadow-[0_32px_90px_-35px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-2xl md:p-8">
              <p className="text-sm font-medium text-white/70">Professional care that starts from the ground up.</p>
              <div className="mt-5 flex flex-wrap gap-2">{trustChips.map((chip) => <span key={chip.label} className={chip.variant === "rainbow" ? "rounded-full border border-white/35 bg-[linear-gradient(90deg,rgba(228,3,3,0.48),rgba(255,140,0,0.48),rgba(255,237,0,0.48),rgba(0,128,38,0.48),rgba(36,64,142,0.48),rgba(115,41,130,0.48))] px-3 py-1 text-xs font-medium text-white" : "rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/75"}>{chip.label}</span>)}</div>
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="mx-auto max-w-6xl px-6"><div className="rounded-3xl border border-brand-sageLight/40 bg-white p-8 shadow-sm md:p-10"><h2 className="font-heading text-3xl font-semibold text-brand-sageDark">Why choose a home visit?</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><p className="text-base leading-relaxed text-brand-charcoal/75">A mobile foot health appointment removes the need to travel across Bristol, find parking or sit in a waiting room. Care takes place in familiar surroundings, which can be more comfortable for people with reduced mobility, people recovering from illness or injury, and anyone who struggles to reach their feet safely.</p><p className="text-base leading-relaxed text-brand-charcoal/75">Home visits are also convenient when relatives or carers are helping to arrange routine foot care. Practical details such as stairs, access, parking and who will be present can be discussed before the visit, so the appointment is planned around the home rather than a clinic timetable.</p></div></div></section>

      <section className="mx-auto max-w-6xl px-6"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Who Foot+ supports</h2><ul className="mt-5 grid gap-3 text-sm text-brand-charcoal/75 md:grid-cols-2 lg:grid-cols-3">{["Older adults who would prefer routine care at home", "People with reduced mobility or difficulty travelling", "People who cannot comfortably see or reach their feet", "People recovering from illness or injury", "People who prefer appointments in familiar surroundings", "Relatives or carers arranging appropriate foot care"].map((item) => <li key={item} className="rounded-2xl border border-brand-sageLight/30 bg-white p-4 shadow-sm">{item}</li>)}</ul></section>

      <section className="mx-auto max-w-6xl px-6"><div className="rounded-3xl border border-brand-sageLight/40 bg-linear-to-br from-white via-white to-brand-sageLight/10 p-8 shadow-sm md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Bristol coverage</p><h2 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark md:text-3xl">Home foot care across Bristol</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/70 md:text-base">Foot+ is based in central Bristol, BS2, and provides home visits across the city. Visit the <Link href="/areas-we-cover" className="font-semibold text-brand-sageDark underline">areas covered page</Link> for current postcode guidance, including travel information and local coverage notes.</p><div className="mt-5 flex flex-wrap gap-3">{[{href:"/foot-health-practitioner-bishopston",label:"Home foot care in North Bristol"},{href:"/foot-health-practitioner-bedminster",label:"Home foot care in South Bristol"},{href:"/foot-health-practitioner-easton",label:"Home foot care in East Bristol"},{href:"/foot-health-practitioner-clifton",label:"Home foot care in Central Bristol"}].map((link) => <Link key={link.href} href={link.href} className="rounded-full border border-brand-sageLight/35 px-4 py-2 text-sm font-semibold text-brand-sageDark hover:bg-brand-sageLight/10">{link.label}</Link>)}</div></div></section>

      <section id="services" className="mx-auto max-w-6xl px-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sageDark">Services</p><h2 className="mt-2 font-heading text-3xl font-semibold text-brand-sageDark">Professional foot care at home in Bristol</h2><p className="mt-3 max-w-2xl text-base text-brand-charcoal/80">Foot+ focuses on routine nail and skin care within scope. Dedicated service pages explain the details, so this page links you to the most relevant information without repeating every treatment description.</p><div className="mt-8 grid gap-6 md:grid-cols-2">{serviceLinks.map((s) => <Link key={s.title} href={s.href} className="group rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm shadow-brand-sage/10 transition hover:-translate-y-1"><h3 className="font-heading text-lg font-semibold text-brand-sageDark">{s.title}</h3><p className="mt-2 text-sm text-brand-charcoal/70">{s.desc}</p><span className="mt-4 inline-block text-sm font-semibold text-brand-sageDark">Learn more →</span></Link>)}</div></section>

      <section className="mx-auto max-w-6xl px-6"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">What happens during an appointment?</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{steps.map((x) => <div key={x.t} className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm"><h3 className="font-heading text-base font-semibold text-brand-sageDark">{x.t}</h3><p className="mt-2 text-sm text-brand-charcoal/70">{x.d}</p></div>)}</div></section>

      <section className="mx-auto max-w-6xl px-6"><div className="rounded-3xl border border-brand-sageLight/40 bg-brand-offwhite p-8 shadow-sm md:p-10"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Qualified, insured and clear about scope</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">Foot+ is provided by Adam James, a qualified Foot Health Practitioner with a healthcare and rehabilitation background. Foot+ is fully insured, DBS checked and uses sterile instruments. The service is for routine foot health needs at home and does not present itself as a podiatry clinic. If a concern appears outside scope, Adam will explain this and signpost to an appropriate service.</p><Link href="/about" className="mt-5 inline-block text-sm font-semibold text-brand-sageDark underline">Meet Adam and read about Foot+ →</Link></div></section>

      <section className="mx-auto max-w-6xl px-6"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Bristol home foot-care FAQs</h2><div className="mt-4 space-y-3">{faqs.map((f) => <details key={f.q} className="rounded-xl border border-brand-sageLight/25 bg-white p-4 shadow-sm"><summary className="cursor-pointer font-semibold text-brand-sageDark">{f.q}</summary><p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{f.a} {f.q.includes("cost") ? <Link href="/prices" className="font-semibold text-brand-sageDark underline">View prices.</Link> : null} {f.q.includes("toenail") ? <Link href="/toenail-cutting-bristol" className="font-semibold text-brand-sageDark underline">See the toenail cutting service.</Link> : null}</p></details>)}</div></section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-sageLight/30 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"><div className="mx-auto flex max-w-md items-center gap-3"><Link href="/book" className="flex-1 rounded-full bg-brand-sageDark px-4 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-black/10">Book now</Link><Link href="/prices" className="flex-1 rounded-full border border-brand-sageLight/60 px-4 py-3 text-center text-sm font-semibold text-brand-sageDark">Prices</Link></div></div>
    </div>
  );
}
