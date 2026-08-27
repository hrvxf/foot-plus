import Image from "next/image";
import type { Practitioner } from "../lib/locations";
import { serviceLocations } from "../lib/locations";

export default function PractitionerProfile({
  practitioner = serviceLocations.bristol.practitioner!,
}: {
  practitioner?: Practitioner;
}) {
  return (
    <article className="self-end" aria-label={`${practitioner.name}, ${practitioner.role}`}>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-t-[2rem] bg-white shadow-[0_32px_70px_-48px_rgba(15,23,42,0.45)] lg:rounded-t-[2.5rem]">
        <Image
          src={practitioner.imageSrc}
          alt={practitioner.imageAlt}
          fill
          priority
          sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 90vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/12 to-transparent" aria-hidden="true" />
      </div>

      <div className="border-x border-t border-brand-sageLight/30 bg-white px-6 py-5 sm:px-7 lg:border-x-0 lg:px-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-brand-sageDark">
              {practitioner.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-brand-charcoal/65">{practitioner.role}</p>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.13em] text-brand-charcoal/55 sm:text-right">
            {practitioner.credentials.join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
