"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, Check, Info, MapPin } from "lucide-react";

import { checkServiceArea, type ServiceAreaCheck } from "../../lib/postcodes";
import { emailHref, phoneDisplay, phoneHref } from "../../lib/site";
import { trackAdviceEvent } from "../advice/AdviceTracker";

export default function PostcodeChecker() {
  const inputId = useId();
  const resultId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ServiceAreaCheck | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const check = checkServiceArea(value);
    setResult(check);
    if (check.status !== "invalid") {
      setValue(check.postcode);
      trackAdviceEvent("home_postcode_check", {
        result: check.status,
        outward_code: check.postcode.split(" ")[0],
      });
    }
  }

  const invalid = result?.status === "invalid";

  return (
    <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-[0_24px_60px_-36px_rgba(36,48,40,0.45)] sm:p-6">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className="block text-[15px] font-semibold text-brand-sageDeep">
          Check we visit your area
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id={inputId}
            name="postcode"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="Your postcode, e.g. BS6 7QN"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (result) setResult(null);
            }}
            aria-invalid={invalid || undefined}
            aria-describedby={result ? resultId : undefined}
            className="h-14 w-full rounded-2xl sm:flex-1 border-[1.5px] border-brand-line bg-brand-offwhite px-4 text-lg font-medium tracking-wide text-brand-charcoal placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-brand-muted/80 focus:border-brand-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sageLight"
          />
          <button
            type="submit"
            className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-sageDark px-7 text-base font-semibold text-white transition hover:bg-brand-sageDeep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          >
            Check postcode
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>

      <div id={resultId} aria-live="polite">
        {result ? <CheckResult result={result} /> : null}
      </div>
    </div>
  );
}

function CheckResult({ result }: { result: ServiceAreaCheck }) {
  if (result.status === "invalid") {
    return (
      <p className="mt-3 flex items-center gap-2 text-[15px] font-medium text-red-800">
        <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
        {result.message}
      </p>
    );
  }

  const shell = "mt-4 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-4";
  const action =
    "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-sageDark px-5 text-[15px] font-semibold text-white transition hover:bg-brand-sageDeep";

  if (result.status === "bristol") {
    return (
      <div className={`${shell} bg-brand-wash`}>
        <div className="flex flex-1 items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sageDark text-white">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[15px] leading-snug text-brand-charcoal">
            <strong className="font-semibold">Good news, {result.postcode} is a Foot+ Bristol postcode.</strong>{" "}
            We confirm your exact address when you book.
          </p>
        </div>
        <Link
          href={`/book?location=bristol&postcode=${encodeURIComponent(result.postcode)}`}
          className={action}
          data-analytics-id="home-postcode-book-bristol"
        >
          Book in Bristol
        </Link>
      </div>
    );
  }

  if (result.status === "southampton") {
    return (
      <div className={`${shell} bg-brand-wash`}>
        <div className="flex flex-1 items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-sageDark text-white">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[15px] leading-snug text-brand-charcoal">
            <strong className="font-semibold">Foot+ Southampton opens on 7 November 2026.</strong>{" "}
            Register now to hear first when appointments open.
          </p>
        </div>
        <Link
          href={`/book?location=southampton&postcode=${encodeURIComponent(result.postcode)}`}
          className={action}
          data-analytics-id="home-postcode-register-southampton"
        >
          Register interest
        </Link>
      </div>
    );
  }

  return (
    <div className={`${shell} border border-brand-line bg-brand-offwhite`}>
      <p className="flex-1 text-[15px] leading-snug text-brand-charcoal">
        <strong className="font-semibold">We don&rsquo;t have a Foot+ service at {result.postcode} yet.</strong>{" "}
        Nearby towns may be possible by request, so call{" "}
        <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-2">
          {phoneDisplay}
        </a>{" "}
        or{" "}
        <a href={emailHref} className="font-semibold text-brand-sageDeep underline underline-offset-2">
          email us
        </a>
        .
      </p>
    </div>
  );
}
