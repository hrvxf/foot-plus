import Link from "next/link";

import { serviceLocations, type ServiceLocation } from "../../lib/locations";

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white";

// A full green screen with one question and two answers. It replaces the header
// and footer on purpose (see data-fullscreen-page in globals.css), so the logo
// set into the heading is also the way back to the home page.
export default function LocationChooser({
  before,
  after = "",
  hrefFor = (location) => location.href,
  analyticsPrefix,
}: {
  /** Heading text before the inline Foot+ logo, e.g. "Choose your local". */
  before: string;
  /** Heading text after the logo, e.g. "service". */
  after?: string;
  /** Where each town's button goes. Defaults to the location page. */
  hrefFor?: (location: ServiceLocation) => string;
  analyticsPrefix: string;
}) {
  return (
    <section
      aria-labelledby="locations-heading"
      data-fullscreen-page
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden bg-[#34503F] px-5 py-[calc(env(safe-area-inset-top)+3rem)] text-white sm:px-8"
    >
      {/* Depth: soft light from the top left, a darker foot, and the brand paper grain. */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(143,179,156,0.38),transparent_60%),linear-gradient(180deg,transparent_45%,rgba(20,34,27,0.45))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] opacity-[0.12] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="locations-enter mx-auto w-full max-w-5xl">
        <h1
          id="locations-heading"
          className="text-center font-heading text-[2rem] font-semibold leading-[1.25] tracking-[-0.015em] md:text-[2.75rem] lg:text-[3.5rem]"
        >
          {before}{" "}
          <Link href="/" className={`mx-[0.14em] inline-block rounded-sm align-baseline ${focus}`}>
            <span
              role="img"
              aria-label="Foot+"
              className="inline-block h-[1em] w-[3.19em] translate-y-[0.14em] bg-white [mask:url('/images/footplus-generic-logo_MASTER_FINAL.svg')_center/contain_no-repeat]"
            />
          </Link>
          {after ? ` ${after}` : null}
        </h1>

        <ul className="mx-auto mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2 sm:gap-6 md:mt-14">
          {Object.values(serviceLocations).map((location) => (
            <li key={location.slug}>
              {/* Body typeface and a raised, outlined surface, so these read as buttons and not as more heading. */}
              <Link
                href={hrefFor(location)}
                className={`flex min-h-16 items-center justify-center rounded-lg border border-white/55 bg-white/[0.12] px-6 text-center text-xl font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_-18px_rgba(0,0,0,0.6)] transition-[background-color,color,transform,box-shadow] duration-200 hover:bg-white hover:text-[#34503F] active:translate-y-px active:scale-[0.99] motion-reduce:transition-none md:min-h-20 md:text-2xl ${focus}`}
                data-analytics-id={`${analyticsPrefix}-${location.slug}`}
              >
                {location.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
