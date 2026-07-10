import Link from "next/link";
import ServiceMap from "../components/ServiceMap";
import { serviceAreas } from "../lib/site";

export const metadata = {
  title: "Areas Covered for Foot Health in Bristol | Foot+ Bristol",
  description:
    "Foot+ Bristol provides home-visit foot health care across Bristol, including Clifton, Redland, Bedminster, Bishopston, Horfield, and nearby areas.",
};

export default function AreasPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
          Areas covered in Bristol
        </h1>
        <p className="max-w-3xl text-sm text-brand-charcoal/70">
          At Foot+ Bristol we try to schedule appointments by areas, so they are planned carefully to keep
          travel fair and visits unhurried. Explore{" "}
          <Link className="font-semibold text-brand-sageDark underline" href="/services">
            foot care services available for home visits
          </Link>{" "}
          before booking. If you’re unsure about coverage,{" "}
          <Link className="font-semibold text-brand-sageDark underline" href="/book">
            contact us
          </Link>{" "}
          and we’ll confirm availability.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-sageDark">
          Mobile foot health services in Bristol
        </h2>
        <p className="mt-1 text-sm text-brand-charcoal/70">
          Domiciliary foot health services available throughout Bristol and surrounding areas.
          Explore areas covered below for local place names.
        </p>
        <div className="mt-4">
          <ServiceMap />
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {serviceAreas.map((area) => (
          <div key={area.region} className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-brand-sageDark">{area.region}</h2>
            <p className="mt-3 text-sm text-brand-charcoal/70">{area.places}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-sageLight/30 bg-white p-6 text-sm text-brand-charcoal/70 shadow-sm">
        <p>
          Need treatment details? Explore{" "}
          <Link className="font-semibold text-brand-sageDark underline" href="/services">
            home-visit foot health services in Bristol
          </Link>{" "}
          then compare costs. Looking for pricing? See{" "}
          <Link className="font-semibold text-brand-sageDark underline" href="/prices">
            foot health prices in Bristol
          </Link>{" "}
          or learn more{" "}
          <Link className="font-semibold text-brand-sageDark underline" href="/about">
            about your practitioner
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
