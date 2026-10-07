import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { phoneDisplay, phoneHref } from "../../lib/site";
import { btnOutlineWhite, btnWhite, container } from "./ui";

type Props = {
  title?: string;
  text?: string;
  /** Prefix for data-analytics-id values, e.g. "home" or "services". */
  analyticsId: string;
  bookingHref?: string;
};

export default function ClosingCta({
  title = "Ready for comfortable feet?",
  text = "Book a home visit in Bristol, or join the Southampton launch list.",
  analyticsId,
  bookingHref = "/book",
}: Props) {
  return (
    <section className={`${container} mb-14 md:mb-20`} aria-labelledby={`${analyticsId}-cta-heading`}>
      <div className="relative isolate flex flex-col gap-7 overflow-hidden rounded-[2rem] bg-brand-sageDark px-6 py-9 text-white md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
        <Image
          src="/images/footplus-generic-logo_MASTER_FINAL.svg"
          alt=""
          width={420}
          height={132}
          className="pointer-events-none absolute -bottom-10 -right-8 -z-10 hidden h-56 w-auto opacity-[0.045] md:block"
          aria-hidden="true"
        />
        <div>
          <h2 id={`${analyticsId}-cta-heading`} className="font-heading text-[1.75rem] font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-white/85">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={bookingHref} className={btnWhite} data-analytics-id={`${analyticsId}-cta-book`}>
            Book a visit
          </Link>
          <a href={phoneHref} className={btnOutlineWhite} data-analytics-id={`${analyticsId}-cta-phone`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
