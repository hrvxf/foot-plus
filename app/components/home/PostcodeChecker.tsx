"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Info, X } from "lucide-react";

import { serviceLocations } from "../../lib/locations";
import { checkServiceArea, type ServiceAreaCheck } from "../../lib/postcodes";
import { emailForPath, phoneForPath } from "../../lib/site";
import { estimateTravel, lookupPostcode, type TravelEstimate } from "../../lib/travel";
import { trackAdviceEvent } from "../advice/AdviceTracker";
import { texturedGreen } from "../site/ui";

type Tone = "card" | "panel" | "plain" | "band" | "compact";

type PostcodeCheckerProps = {
  /** Analytics prefix, so checks from different pages can be told apart. */
  source?: string;
  /**
   * Set when a page has more than one checker. Added to the check event and to
   * the request link's analytics id, so the first checker's ids stay unchanged.
   */
  placement?: string;
  label?: string;
  /** Optional heading shown above the field. */
  title?: string;
  /** Shown under the field until there is a result to show in its place. */
  helper?: ReactNode;
  /**
   * card: white card (inner pages). panel: the dark green block in the home hero.
   * plain: no surround, field and button in one row, for the page background.
   * band: as plain, for use on a dark green surface.
   * compact: field and a square arrow button in one row, label for screen readers only (location pages).
   */
  tone?: Tone;
  /**
   * Compact tone only: the location whose booking form the always-visible "Request a visit" button
   * opens before a postcode is checked. null (home page) opens the form without a location chosen.
   */
  bookLocation?: "bristol" | "southampton" | null;
  /** Anchor id for "Check postcode" links elsewhere on the page. */
  anchorId?: string;
};

// undefined = not looked up, "loading", null = lookup failed
type TravelState = TravelEstimate | "loading" | null | undefined;

const tones: Record<
  Tone,
  {
    wrap: string;
    title: string;
    label: string;
    row: string;
    input: string;
    button: string;
    helper: string;
    result: string;
    error: string;
    link: string;
    action: string;
  }
> = {
  card: {
    wrap: "rounded-3xl border border-brand-line bg-white p-5 shadow-[0_24px_60px_-36px_rgba(36,48,40,0.45)] sm:p-6",
    title: "font-heading text-xl font-semibold text-brand-charcoal",
    label: "block text-base font-semibold text-brand-sageDeep",
    row: "mt-3 flex flex-col gap-3 sm:flex-row",
    input:
      "sm:flex-1 rounded-2xl border-[1.5px] border-brand-line bg-brand-offwhite focus:border-brand-sageDark focus:bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark",
    button:
      "rounded-full bg-brand-sageDark px-7 text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
    helper: "mt-3 text-base leading-6 text-brand-muted",
    result: "mt-4 rounded-2xl bg-brand-wash p-4 text-brand-charcoal",
    error: "text-red-800",
    link: "font-semibold text-brand-sageDeep underline underline-offset-2",
    action:
      "rounded-full bg-brand-sageDark px-5 text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
  },
  panel: {
    wrap: `rounded-lg p-6 shadow-[0_30px_60px_-36px_rgba(36,48,40,0.55)] sm:p-8 ${texturedGreen}`,
    title: "font-heading text-2xl font-semibold leading-[1.25] text-white",
    label: "block text-base font-medium text-white",
    row: "mt-2 flex flex-col gap-3",
    input:
      "rounded-md border-[1.5px] border-white bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white",
    button:
      "rounded-lg bg-white px-6 text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white",
    helper: "mt-4 text-base leading-6 text-white",
    result: "mt-5 border-t border-white/40 pt-5 text-white",
    error: "text-white",
    link: "font-semibold text-white underline underline-offset-4",
    action:
      "rounded-lg bg-white px-6 text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white",
  },
  band: {
    wrap: "text-white",
    title: "font-heading text-xl font-semibold text-white",
    label: "block text-base font-medium text-white",
    row: "mt-2 flex flex-col gap-3 sm:flex-row",
    input:
      "sm:flex-1 rounded-md border-[1.5px] border-white bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white",
    button:
      "rounded-lg bg-white px-6 text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white",
    helper: "mt-3 text-base leading-6 text-white",
    result: "mt-5 border-t border-white/40 pt-5 text-white",
    error: "text-white",
    link: "font-semibold text-white underline underline-offset-4",
    action:
      "rounded-lg bg-white px-6 text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white",
  },
  compact: {
    wrap: "",
    title: "font-heading text-[1.875rem] font-semibold leading-tight tracking-[-0.015em] text-brand-sageDeep",
    label: "sr-only",
    row: "flex flex-row gap-2",
    input:
      "flex-1 rounded-2xl border-[1.5px] border-brand-line bg-white focus:border-brand-sageDark focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark",
    button:
      "w-14 rounded-2xl bg-brand-sageDark text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
    helper: "mt-3 text-center text-base leading-6 text-brand-muted",
    result: "mt-4 rounded-2xl bg-brand-wash p-4 text-brand-charcoal",
    error: "text-red-800",
    link: "font-semibold text-brand-sageDeep underline underline-offset-2",
    action:
      "rounded-lg bg-brand-sageDark px-5 text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
  },
  plain: {
    wrap: "",
    title: "font-heading text-xl font-semibold text-brand-charcoal",
    label: "block text-base font-medium text-brand-charcoal",
    row: "mt-2 flex flex-col gap-3 sm:flex-row",
    input:
      "sm:flex-1 rounded-md border-[1.5px] border-brand-muted bg-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark",
    button:
      "rounded-lg bg-brand-sageDark px-6 text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
    helper: "mt-3 text-base leading-6 text-brand-charcoal",
    result: "mt-5 border-t border-brand-charcoal/15 pt-5 text-brand-charcoal",
    error: "text-red-800",
    link: "font-semibold text-brand-sageDeep underline underline-offset-4",
    action:
      "rounded-lg bg-brand-sageDark px-6 text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark",
  },
};

export default function PostcodeChecker({
  source = "home",
  placement,
  label = "Check we visit your area",
  title,
  helper,
  tone = "card",
  bookLocation = "bristol",
  anchorId,
}: PostcodeCheckerProps = {}) {
  const inputId = useId();
  const resultId = useId();
  const helperId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ServiceAreaCheck | null>(null);
  const [travel, setTravel] = useState<TravelState>();
  const lookup = useRef<AbortController | null>(null);
  const style = tones[tone];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    lookup.current?.abort();
    const check = checkServiceArea(value);
    setResult(check);
    setTravel(undefined);
    if (check.status === "invalid") return;

    setValue(check.postcode);
    const eventParams = {
      result: check.status,
      outward_code: check.postcode.split(" ")[0],
      ...(placement ? { placement } : {}),
    };
    if (check.status === "outside") {
      trackAdviceEvent(`${source}_postcode_check`, eventParams);
      return;
    }

    const controller = new AbortController();
    lookup.current = controller;
    setTravel("loading");
    const point = await lookupPostcode(check.postcode, controller.signal);
    if (controller.signal.aborted) return;
    const estimate = point ? estimateTravel(point.lat, point.lng, check.status) : null;
    setTravel(estimate);
    trackAdviceEvent(`${source}_postcode_check`, {
      ...eventParams,
      travel_band: estimate?.band ?? "unknown",
    });
  }

  const invalid = result?.status === "invalid";
  const describedBy = result ? resultId : helper ? helperId : undefined;

  return (
    <div id={anchorId} data-postcode-checker className={`scroll-mt-24 ${style.wrap}`}>
      {title ? <h2 className={`mb-4 ${style.title}`}>{title}</h2> : null}
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className={style.label}>
          {label}
        </label>
        <div className={style.row}>
          <input
            id={inputId}
            name="postcode"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder={tone === "compact" ? "Enter your postcode" : "e.g. BS6 7QN"}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (result) {
                lookup.current?.abort();
                setResult(null);
                setTravel(undefined);
              }
            }}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={`h-14 w-full min-w-0 shrink-0 px-4 text-lg font-medium tracking-wide text-brand-charcoal placeholder:font-normal placeholder:tracking-normal placeholder:text-brand-muted ${style.input}`}
          />
          <button
            type="submit"
            className={`inline-flex h-14 shrink-0 items-center justify-center gap-2 text-lg font-semibold transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 ${style.button}`}
          >
            {tone === "compact" ? <span className="sr-only">Check postcode</span> : "Check postcode"}
            <ArrowRight className={tone === "compact" ? "h-6 w-6" : "h-5 w-5"} aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* The result takes the helper's place, so the block keeps one message at a time. */}
      {tone === "compact" ? (
        <CompactRequest result={result} bookLocation={bookLocation} source={source} />
      ) : null}

      {helper && !result ? (
        <p id={helperId} className={style.helper}>
          {helper}
        </p>
      ) : null}

      <div id={resultId} aria-live="polite">
        {result && tone === "compact" ? <CompactAnswer result={result} travel={travel} bookLocation={bookLocation} /> : null}
        {result && tone !== "compact" ? (
          <CheckResult result={result} travel={travel} source={source} placement={placement} tone={tone} />
        ) : null}
      </div>
    </div>
  );
}

function CheckResult({
  result,
  travel,
  source,
  placement,
  tone,
}: {
  result: ServiceAreaCheck;
  travel: TravelState;
  source: string;
  placement?: string;
  tone: Tone;
}) {
  const style = tones[tone];
  const pathname = usePathname();

  if (result.status === "invalid") {
    return (
      <p className={`mt-3 flex items-start gap-2 text-base font-medium leading-6 ${style.error}`}>
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        {result.message}
      </p>
    );
  }

  if (result.status === "outside") {
    return (
      <p className={`text-base leading-6 ${style.result}`}>
        <strong className="font-semibold">We don&rsquo;t visit {result.postcode} yet.</strong>{" "}
        Nearby towns may be possible by request, so call{" "}
        <a href={phoneForPath(pathname).href} className={style.link}>
          {phoneForPath(pathname).display}
        </a>{" "}
        or{" "}
        <a href={emailForPath(pathname).href} className={style.link}>
          email us
        </a>
        .
      </p>
    );
  }

  const location = serviceLocations[result.status];
  const who = location.practitioner
    ? `${location.practitioner.name} from ${location.displayName}`
    : location.displayName;

  // Say nothing definite until the distance is known.
  if (travel === "loading" || travel === undefined) {
    return <p className={`text-base leading-6 ${style.result}`}>Checking {result.postcode}…</p>;
  }

  // Beyond the £5 band a visit is by arrangement, so don't promise it outright.
  const byArrangement = travel !== null && travel.band === "extended" && !travel.borderline;
  const analyticsId = placement
    ? `${source}-${placement}-postcode-book-${location.slug}`
    : `${source}-postcode-book-${location.slug}`;

  return (
    <div className={`flex flex-col gap-4 ${style.result}`}>
      <p className="text-base leading-6">
        {travel === null ? (
          <>
            <strong className="font-semibold">
              {result.postcode} is in the {location.displayName} area.
            </strong>{" "}
            We couldn&rsquo;t work out the distance just now, so {who} will confirm the visit and any
            travel fee when we reply.
          </>
        ) : (
          <>
            <strong className="font-semibold">
              {byArrangement
                ? `We may be able to visit ${result.postcode}.`
                : `Yes, we visit ${result.postcode}.`}
            </strong>{" "}
            {who} {byArrangement ? "is your nearest practitioner." : "covers your area."}{" "}
            <TravelLine travel={travel} />
          </>
        )}
      </p>
      <Link
        href={`/book?location=${location.slug}&postcode=${encodeURIComponent(result.postcode)}`}
        className={`inline-flex min-h-14 items-center justify-center gap-2 self-stretch text-lg font-semibold transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 sm:self-start ${style.action}`}
        data-analytics-id={analyticsId}
      >
        Request a visit
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Compact tone: the request button sits under the field from the start, so an answer never moves it. */
function CompactRequest({
  result,
  bookLocation,
  source,
}: {
  result: ServiceAreaCheck | null;
  bookLocation: "bristol" | "southampton" | null;
  source: string;
}) {
  const covered = result && (result.status === "bristol" || result.status === "southampton") ? result : null;
  const slug = covered ? covered.status : bookLocation;
  const href = covered
    ? `/book?location=${slug}&postcode=${encodeURIComponent(covered.postcode)}`
    : slug
      ? `/book?location=${slug}`
      : "/book";
  return (
    <Link
      href={href}
      className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-sageDark text-lg font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
      data-analytics-id={`${source}-postcode-book-${slug ?? "any"}`}
    >
      Request a visit
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}

/** Compact tone: one short line under the button, "Yes, we cover BS6 7QN · £5 travel". */
function CompactAnswer({
  result,
  travel,
  bookLocation,
}: {
  result: ServiceAreaCheck;
  travel: TravelState;
  bookLocation: "bristol" | "southampton" | null;
}) {
  const pathname = usePathname();
  const line = "mt-3 flex items-center justify-center gap-2 text-center text-base font-semibold leading-6 text-brand-sageDeep";
  const yes = (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A8E6B8]" aria-hidden="true">
      <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
    </span>
  );

  if (result.status === "invalid") {
    return (
      <p className={`${line} font-medium text-red-800`}>
        <Info className="h-5 w-5 shrink-0" aria-hidden="true" />
        Enter a full postcode, like {bookLocation === "southampton" ? "SO16 5LF" : "BS6 7QN"}.
      </p>
    );
  }

  if (result.status === "outside") {
    const phone = phoneForPath(pathname);
    return (
      <p className={line}>
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1E4DC] text-[#8A4A2A]" aria-hidden="true">
          <X className="h-3.5 w-3.5" strokeWidth={3.5} />
        </span>
        <span>
          Not in our area yet ·{" "}
          <a href={phone.href} className="underline underline-offset-2">
            Call to ask
          </a>
        </span>
      </p>
    );
  }

  if (travel === "loading" || travel === undefined) {
    return <p className={`${line} font-medium text-brand-muted`}>Checking {result.postcode}…</p>;
  }

  // A postcode for the other location: say whose area it is (the button already points there).
  const who = result.status === bookLocation ? "we cover" : `${serviceLocations[result.status].displayName} covers`;
  const fee =
    travel === null || travel.borderline
      ? "travel confirmed when we reply"
      : travel.band === "free"
        ? "Free travel"
        : travel.band === "standard"
          ? "£5 travel"
          : "£10+ travel";
  const opening = travel !== null && travel.band === "extended" && !travel.borderline ? "We may cover" : `Yes, ${who}`;

  return (
    <p className={line}>
      {yes}
      <span>
        {opening} {result.postcode} · {fee}
      </span>
    </p>
  );
}

function TravelLine({ travel }: { travel: TravelEstimate }) {
  const miles = travel.roadMiles < 1 ? "under a mile" : `about ${travel.roadMiles.toFixed(1)} miles`;

  if (travel.borderline) {
    return (
      <>
        You&rsquo;re {miles} by road from us, right on a travel boundary, so we&rsquo;ll confirm
        the fee when we reply.
      </>
    );
  }

  if (travel.band === "extended") {
    return (
      <>
        You&rsquo;re {miles} by road from us, so the travel fee is{" "}
        <strong className="font-semibold">£10 or more, by arrangement</strong>. We&rsquo;ll
        confirm it when we reply.
      </>
    );
  }

  return (
    <>
      Travel fee:{" "}
      <strong className="font-semibold">{travel.band === "free" ? "none" : "£5"}</strong>. You&rsquo;re{" "}
      {miles} by road from us. Confirmed when we reply.
    </>
  );
}
