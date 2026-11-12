import type { Metadata } from "next";
import { Check } from "lucide-react";

import { clinic } from "../../lib/clinic";
import { CLINIC_TAG, getStripe } from "../../lib/clinicStripe";
import { phoneDisplay, phoneHref } from "../../lib/site";
import { body, displayH2, lead, supporting } from "../../components/site/ui";

export const metadata: Metadata = {
  title: "You're booked",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BookedPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let slotLabel: string | null = null;
  let email: string | null = null;

  const stripe = getStripe();
  if (stripe && session_id?.startsWith("cs_")) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      if (s.metadata?.clinic === CLINIC_TAG && s.payment_status === "paid") {
        slotLabel = s.metadata.slotLabel ?? null;
        email = s.customer_details?.email ?? null;
      }
    } catch {
      // Fall through to the general message.
    }
  }

  return (
    <section className="bg-brand-offwhite">
      <div className="mx-auto w-full max-w-2xl px-5 pb-20 pt-12 text-center sm:px-6 md:pt-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-wash text-brand-sageDark">
          <Check className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className={`${displayH2} mt-6`}>{slotLabel ? "You're booked" : "Thank you"}</h1>
        {slotLabel ? (
          <>
            <p className="mt-4 font-heading text-2xl font-semibold text-brand-sageDeep">{slotLabel}</p>
            {clinic.venue && <p className={`${lead} mt-2`}>{clinic.venue}</p>}
            <p className={`${body} mt-6`}>
              {email ? <>We&rsquo;ve emailed your confirmation and receipt to {email}. </> : null}
              Please make a note of your time.
            </p>
          </>
        ) : (
          <p className={`${lead} mt-4`}>
            If your payment went through, you&rsquo;ll get an email confirming your time shortly.
          </p>
        )}
        <p className={`${supporting} mt-8`}>
          Can&rsquo;t make it, or have a question?{" "}
          <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4">
            Call {phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
