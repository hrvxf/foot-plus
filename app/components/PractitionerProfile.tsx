import Image from "next/image";
import type { Practitioner } from "../lib/locations";
import { serviceLocations } from "../lib/locations";

/** Shared with PortraitWarmup so the pre-fetched file is the one this picks. */
export const PRACTITIONER_HERO_SIZES = "(min-width: 1024px) 420px, 90vw";

/** Portrait with name, role and credentials beneath. Used in the location page hero. */
export default function PractitionerProfile({
  practitioner = serviceLocations.bristol.practitioner!,
}: {
  practitioner?: Practitioner;
}) {
  return (
    <article aria-label={`${practitioner.name}, ${practitioner.role}`} className="mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-brand-sageDark/10">
        <Image
          src={practitioner.imageSrc}
          alt={practitioner.imageAlt}
          fill
          priority
          sizes={PRACTITIONER_HERO_SIZES}
          className="object-cover object-center"
        />
      </div>
      <div className="mt-4">
        <h2 className="font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">{practitioner.name}</h2>
        <p className="text-base leading-6 text-brand-charcoal">{practitioner.role}</p>
        <p className="text-base leading-6 text-brand-muted">{practitioner.credentials.join(", ")}</p>
      </div>
    </article>
  );
}
