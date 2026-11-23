"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";

import { homeServices } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import { checkServiceArea, normalisePostcode, type EnquiryLocation } from "../lib/postcodes";
import { prices } from "../lib/site";
import { estimateTravel, lookupPostcode, type TravelEstimate } from "../lib/travel";
import { trackAdviceEvent } from "../components/advice/AdviceTracker";
import RatingBadge from "../components/reviews/RatingBadge";
import { portraits } from "../components/site/blocks";
import { focusRing } from "../components/site/ui";

/**
 * /book: the enquiry as five short questions, one per screen.
 * Who it's for → postcode (picks Bristol or Southampton and shows who's coming) →
 * what they need → first visit or not → contact details. Sends to /api/contact as before.
 */

type Slug = "bristol" | "southampton";
type Who = "me" | "someone-else";
type Visit = "first" | "routine";
// undefined = not looked up, "loading", null = lookup failed
type TravelState = TravelEstimate | "loading" | null | undefined;
type Area =
  | { status: "empty" }
  | { status: "invalid"; message: string }
  | { status: "outside"; postcode: string }
  | { status: Slug; postcode: string };

const NOT_SURE = "Not sure";
const needOptions = [...homeServices.map((service) => service.title), NOT_SURE];
const STEP_NAMES = ["who", "postcode", "needs", "visit", "contact"] as const;
const LAST = STEP_NAMES.length - 1;

const normalisePromoCode = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 30);
const firstName = (name: string) => name.trim().split(" ")[0];

const field = `w-full rounded-2xl border-[1.5px] border-brand-line bg-white px-4 py-3.5 text-base text-brand-charcoal transition-colors duration-150 placeholder:text-brand-muted/70 focus:border-brand-sage ${focusRing}`;
const solid = `inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-brand-sageDark px-6 text-lg font-semibold text-white transition-[background-color,opacity] duration-200 hover:bg-brand-sageDeep disabled:cursor-default disabled:opacity-35 disabled:hover:bg-brand-sageDark ${focusRing}`;

export default function StepsEnquiry({ onSubmitted }: { onSubmitted?: () => void }) {
  const searchParams = useSearchParams();
  const fromNailPage = searchParams.get("service") === "nails";
  const prefilledPostcode = normalisePostcode(searchParams.get("postcode") ?? "");
  const requested = searchParams.get("location")?.toLowerCase();

  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who | null>(null);
  const [postcode, setPostcode] = useState(prefilledPostcode);
  // A postcode passed from a checker elsewhere on the site is checked straight away.
  const [area, setArea] = useState<Area>(() => {
    if (!prefilledPostcode) return { status: "empty" };
    const result = checkServiceArea(prefilledPostcode);
    return result.status === "invalid" ? { status: "empty" } : result;
  });
  const [travel, setTravel] = useState<TravelState>(() =>
    area.status === "bristol" || area.status === "southampton" ? "loading" : undefined
  );
  // For postcodes outside both areas: which practitioner the enquiry goes to.
  const [outsideChoice, setOutsideChoice] = useState<Slug | null>(
    requested === "bristol" || requested === "southampton" ? requested : null
  );
  const [needs, setNeeds] = useState<string[]>(fromNailPage ? [homeServices[0].title] : []);
  const [note, setNote] = useState("");
  const [visit, setVisit] = useState<Visit | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [accessNotes, setAccessNotes] = useState("");
  const [heardAboutUs, setHeardAboutUs] = useState("");
  const [promoCode, setPromoCode] = useState(normalisePromoCode(searchParams.get("promo") ?? ""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heading = useRef<HTMLHeadingElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const lookup = useRef<AbortController | null>(null);
  const typingTimer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);
  const moved = useRef(false);

  const slug: Slug | null =
    area.status === "bristol" || area.status === "southampton" ? area.status : area.status === "outside" ? outsideChoice : null;
  const location = slug ? serviceLocations[slug] : null;
  const practitioner = location?.practitioner;
  const practitionerName = practitioner ? firstName(practitioner.name) : null;

  function track(eventName: string, params: Record<string, unknown> = {}) {
    trackAdviceEvent(eventName, { service_location: slug ?? "unknown", ...params });
  }

  async function check(value: string) {
    lookup.current?.abort();
    setTravel(undefined);
    if (!value.trim()) {
      setArea({ status: "empty" });
      return;
    }
    const result = checkServiceArea(value);
    if (result.status === "invalid") {
      setArea({ status: "invalid", message: result.message });
      return;
    }
    setPostcode(result.postcode);
    setArea(result);
    if (result.status === "outside") {
      trackAdviceEvent("enquiry_postcode_outside", { outward_code: result.postcode.split(" ")[0] });
      return;
    }
    setTravel("loading");
    await lookupTravel(result.postcode, result.status);
  }

  async function lookupTravel(code: string, base: Slug) {
    const controller = new AbortController();
    lookup.current = controller;
    const point = await lookupPostcode(code, controller.signal);
    if (controller.signal.aborted) return;
    const estimate = point ? estimateTravel(point.lat, point.lng, base) : null;
    setTravel(estimate);
    trackAdviceEvent("enquiry_postcode_check", {
      service_location: base,
      outward_code: code.split(" ")[0],
      travel_band: estimate?.band ?? "unknown",
    });
  }

  useEffect(() => {
    openedAt.current = Date.now();
    trackAdviceEvent("enquiry_start", { prefilled_postcode: Boolean(prefilledPostcode), form: "steps" });
    if (area.status === "bristol" || area.status === "southampton") void lookupTravel(area.postcode, area.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New question: bring it to the top and move focus to it, without the jump smooth scrolling adds.
  useEffect(() => {
    if (!moved.current) return;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96;
    if (window.scrollY > y) window.scrollTo(0, Math.max(0, y));
    html.style.scrollBehavior = previous;
    heading.current?.focus({ preventScroll: true });
  }, [step, submitted]);

  function go(to: number) {
    moved.current = true;
    setError(null);
    setStep(to);
    if (to > step) track("enquiry_step", { step: STEP_NAMES[to] });
  }

  const contactOk = name.trim() !== "" && phone.trim() !== "" && /.+@.+\..+/.test(email.trim());
  const canContinue = [
    who !== null,
    (area.status === "empty" && postcode.trim() !== "") ||
      (slug !== null && (area.status === "outside" || travel !== "loading")),
    needs.length > 0 || note.trim() !== "",
    visit !== null,
    contactOk,
  ][step];

  async function send() {
    if (!slug || !location || isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    const code = normalisePromoCode(promoCode);
    const appointmentType = visit === "first" ? "New Patient Assessment & Treatment" : "Routine Foot Care";
    const details = [needs.join(", "), note.trim()].filter(Boolean).join(". ");
    const messageLines = [
      `Service location: ${location.name}`,
      `Postcode: ${postcode}${area.status === "outside" ? " (outside our usual area)" : ""}`,
      `Phone: ${phone}`,
      `For: ${who === "me" ? "Themselves" : "Someone else (a relative, friend or neighbour)"}`,
      `Appointment type: ${appointmentType}`,
      `Appointment details: ${details}`,
      `Mobility or access requirements: ${accessNotes.trim() || "None provided"}`,
      `Heard about us: ${heardAboutUs.trim() || "Not provided"}`,
      `Promo code: ${code || "None"}`,
    ];

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          location: location.name as EnquiryLocation,
          postcode,
          promoCode: code,
          message: messageLines.join("\n"),
          website: honeypot.current?.value ?? "",
          startedAt: openedAt.current,
        }),
      });
      if (!response.ok) throw new Error("Failed to send enquiry.");
      moved.current = true;
      setSubmitted(true);
      onSubmitted?.();
      trackAdviceEvent("generate_lead", {
        method: "enquiry_form",
        service_location: slug,
        service_interest: fromNailPage ? "nail_care" : "routine_foot_care",
        lead_type: "appointment_enquiry",
        promo_code: code || "none",
      });
    } catch {
      track("enquiry_error", { reason: "send_failed" });
      setError("Something went wrong. Please try again, or call us instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted && slug && location) {
    return (
      <Thanks
        slug={slug}
        name={firstName(name)}
        practitionerName={practitionerName ?? "We"}
        headingRef={heading}
        topRef={top}
      />
    );
  }

  const onLast = step === LAST;

  return (
    <div ref={top} className="scroll-mt-24">
      <h1 className="sr-only">Request a home visit</h1>

      <div className="h-[3px] overflow-hidden rounded-full bg-brand-line" aria-hidden="true">
        <div
          className="h-full rounded-full bg-brand-sage transition-[width] duration-500 ease-out"
          style={{ width: `${((step + 1) / STEP_NAMES.length) * 100}%` }}
        />
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 1 && area.status === "empty" && postcode.trim()) {
            window.clearTimeout(typingTimer.current);
            void check(postcode);
            return;
          }
          if (!canContinue) return;
          if (onLast) void send();
          else go(step + 1);
        }}
      >
        {/* Spam trap: hidden from people and screen readers; bots tend to fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <div key={step} className="steps-enter mt-7 min-h-[19rem]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-sageDark">
            {step === 0 ? "Request a home visit" : step === LAST ? "Last step" : `Step ${step + 1} of ${STEP_NAMES.length}`}
          </p>

          {step === 0 ? (
            <>
              <Question headingRef={heading} first="Who's the visit" second="for?" />
              <div className="grid gap-2.5" role="radiogroup" aria-label="Who's the visit for?">
                <BigChoice
                  selected={who === "me"}
                  title="Me"
                  detail="I'm arranging it for myself"
                  onSelect={() => {
                    setWho("me");
                    window.setTimeout(() => go(1), 260);
                  }}
                />
                <BigChoice
                  selected={who === "someone-else"}
                  title="Someone else"
                  detail="A parent, relative or neighbour"
                  onSelect={() => {
                    setWho("someone-else");
                    window.setTimeout(() => go(1), 260);
                  }}
                />
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <Question headingRef={heading} first="Where's" second="the visit?" />
              <label htmlFor="book-postcode" className="sr-only">
                Postcode of the visit
              </label>
              <div>
                <input
                  id="book-postcode"
                  className={`${field} font-heading text-xl font-semibold uppercase tracking-[-0.01em] placeholder:normal-case`}
                  placeholder="Postcode"
                  autoComplete="postal-code"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={10}
                  value={postcode}
                  aria-describedby="book-postcode-result"
                  onChange={(event) => {
                    const value = event.target.value;
                    setPostcode(value);
                    if (area.status !== "empty") {
                      lookup.current?.abort();
                      setArea({ status: "empty" });
                      setTravel(undefined);
                    }
                    // Check as soon as a full postcode is typed, so nobody has to find the arrow.
                    window.clearTimeout(typingTimer.current);
                    if (checkServiceArea(value).status !== "invalid") {
                      typingTimer.current = window.setTimeout(() => void check(value), 350);
                    }
                  }}
                  onBlur={() => {
                    window.clearTimeout(typingTimer.current);
                    if (area.status === "empty" && postcode.trim()) void check(postcode);
                  }}
                  onKeyDown={(event) => {
                    // Enter checks the postcode first; once it's matched, Enter moves on.
                    if (event.key === "Enter" && area.status === "empty") {
                      event.preventDefault();
                      void check(postcode);
                    }
                  }}
                />
              </div>
              <div id="book-postcode-result" aria-live="polite">
                <PostcodeAnswer area={area} travel={travel} outsideChoice={outsideChoice} onChoose={setOutsideChoice} />
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <Question headingRef={heading} first="What can we" second="help with?" />
              <div className="flex flex-wrap gap-2" role="group" aria-label="What can we help with? Pick any that apply.">
                {needOptions.map((option) => {
                  const on = needs.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setNeeds((previous) => (on ? previous.filter((item) => item !== option) : [...previous, option]))
                      }
                      className={`rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${focusRing} ${
                        on
                          ? "border-brand-sageDark bg-brand-sageDark text-white"
                          : "border-brand-line bg-white text-brand-charcoal hover:border-brand-sageLight"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <label htmlFor="book-note" className="sr-only">
                Anything else we should know (optional)
              </label>
              <textarea
                id="book-note"
                rows={2}
                maxLength={1500}
                className={`${field} mt-3 resize-none`}
                placeholder="Anything else? (optional)"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </>
          ) : null}

          {step === 3 ? (
            <>
              <Question
                headingRef={heading}
                first={`Seen ${practitionerName ?? "us"}`}
                second="before?"
              />
              <div className="grid gap-2.5" role="radiogroup" aria-label={`Seen ${practitionerName ?? "us"} before?`}>
                <BigChoice
                  selected={visit === "first"}
                  title="No, first visit"
                  detail={`${prices[0].price} · includes a full assessment`}
                  onSelect={() => {
                    setVisit("first");
                    window.setTimeout(() => go(4), 260);
                  }}
                />
                <BigChoice
                  selected={visit === "routine"}
                  title="Yes, been before"
                  detail={`${prices[1].price} · routine visit`}
                  onSelect={() => {
                    setVisit("routine");
                    window.setTimeout(() => go(4), 260);
                  }}
                />
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <Question headingRef={heading} first="How should we" second="reach you?" />
              <div className="grid gap-2.5">
                <TextField id="book-name" label="Your name" autoComplete="name" value={name} onChange={setName} maxLength={120} />
                <TextField
                  id="book-phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={setPhone}
                  maxLength={30}
                />
                <TextField
                  id="book-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={setEmail}
                  maxLength={254}
                />
                <TextField
                  id="book-heard"
                  label="How did you hear about us?"
                  value={heardAboutUs}
                  onChange={setHeardAboutUs}
                  maxLength={200}
                />
                <details className="group mt-1" open={Boolean(promoCode) || undefined}>
                  <summary
                    className={`inline-flex min-h-11 cursor-pointer list-none items-center rounded-md px-1 text-[15px] font-semibold text-brand-sageDark [&::-webkit-details-marker]:hidden ${focusRing}`}
                  >
                    <span className="transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                    <span className="ml-1.5">Stairs, parking, or a promo code?</span>
                  </summary>
                  <div className="grid gap-2.5 pt-1">
                    <label htmlFor="book-access" className="sr-only">
                      Mobility or access needs (optional)
                    </label>
                    <textarea
                      id="book-access"
                      rows={2}
                      maxLength={1500}
                      className={`${field} resize-none`}
                      placeholder="Stairs, parking, help at the door…"
                      value={accessNotes}
                      onChange={(event) => setAccessNotes(event.target.value)}
                    />
                    <TextField
                      id="book-promo"
                      label="Promo code (optional)"
                      value={promoCode}
                      onChange={setPromoCode}
                      onBlur={() => setPromoCode(normalisePromoCode(promoCode))}
                      maxLength={30}
                      className="uppercase placeholder:normal-case"
                    />
                  </div>
                </details>
              </div>
            </>
          ) : null}
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-[15px] text-red-800">
            {error}
          </p>
        ) : null}

        {/* The who and visit questions move on as soon as an answer is picked, so they have no Next. */}
        <div className="mt-6 flex items-center gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className={`min-h-14 rounded-full px-5 text-base font-semibold text-brand-sageDark ${focusRing}`}
            >
              Back
            </button>
          ) : null}
          {step === 0 || step === 3 ? null : (
            <button type="submit" disabled={!canContinue || isSubmitting} className={solid}>
              {onLast ? (isSubmitting ? "Sending…" : `Send to ${practitionerName ?? "Foot+"}`) : "Next"}
            </button>
          )}
        </div>

        {onLast ? (
          <p className="mt-4 text-center text-sm text-brand-muted">
            By sending, you agree to be contacted about this enquiry.
          </p>
        ) : null}
      </form>

      {step === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <RatingBadge scope="all" analyticsId="book-header-reviews" />
          <p className="text-[15px] text-brand-muted">
            Already enquired?{" "}
            <Link
              href="/forms"
              className="font-semibold text-brand-sageDark"
              data-analytics-id="book-already-enquired-forms"
            >
              Complete your patient form
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Question({
  first,
  second,
  headingRef,
}: {
  first: string;
  second: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <h2
      ref={headingRef}
      tabIndex={-1}
      className="mb-6 mt-2.5 font-heading text-[2.15rem] font-bold leading-[1.05] tracking-[-0.035em] text-brand-charcoal outline-none"
    >
      {first}
      <br />
      <span className="text-brand-sage">{second}</span>
    </h2>
  );
}

function BigChoice({
  selected,
  title,
  detail,
  onSelect,
}: {
  selected: boolean;
  title: string;
  detail: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-center justify-between gap-4 rounded-[1.25rem] border-[1.5px] px-5 py-4 text-left transition-colors duration-200 ${focusRing} ${
        selected ? "border-brand-sageDark bg-brand-wash" : "border-brand-line bg-white hover:border-brand-sageLight"
      }`}
    >
      <span>
        <span className="block font-heading text-lg font-semibold tracking-[-0.02em] text-brand-charcoal">{title}</span>
        <span className="mt-0.5 block text-sm text-brand-muted">{detail}</span>
      </span>
      <span
        aria-hidden="true"
        className={`h-6 w-6 shrink-0 rounded-full border-[1.5px] transition-all duration-200 ${
          selected
            ? "border-brand-sageDark bg-brand-sageDark shadow-[inset_0_0_0_5px_var(--color-brand-wash)]"
            : "border-brand-line"
        }`}
      />
    </button>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  maxLength,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`${field} ${className}`}
      />
    </>
  );
}

function PostcodeAnswer({
  area,
  travel,
  outsideChoice,
  onChoose,
}: {
  area: Area;
  travel: TravelState;
  outsideChoice: Slug | null;
  onChoose: (slug: Slug) => void;
}) {
  if (area.status === "empty") return null;

  if (area.status === "invalid") {
    return <p className="mt-3 px-1 text-[15px] text-red-800">{area.message}</p>;
  }

  if (area.status === "outside") {
    return (
      <div className="steps-enter mt-3 rounded-[1.25rem] bg-brand-wash p-4">
        <p className="text-[15px] leading-6 text-brand-charcoal">
          <strong className="font-semibold">{area.postcode} is outside our usual area.</strong> Send it anyway and
          we&rsquo;ll let you know if we can visit. Which is nearer?
        </p>
        <div className="mt-3 flex gap-2">
          {(["bristol", "southampton"] as const).map((slug) => (
            <button
              key={slug}
              type="button"
              aria-pressed={outsideChoice === slug}
              onClick={() => onChoose(slug)}
              className={`flex-1 rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200 ${focusRing} ${
                outsideChoice === slug
                  ? "border-brand-sageDark bg-brand-sageDark text-white"
                  : "border-brand-line bg-white text-brand-charcoal"
              }`}
            >
              {serviceLocations[slug].name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const location = serviceLocations[area.status];
  const person = location.practitioner ? firstName(location.practitioner.name) : location.displayName;

  return (
    <div className="steps-enter mt-3 flex items-center gap-3 rounded-[1.25rem] bg-brand-sageDark py-2.5 pl-2.5 pr-4 text-white">
      <Image
        src={portraits[area.status]}
        alt=""
        width={104}
        height={104}
        className="h-[52px] w-[52px] shrink-0 rounded-full bg-white object-cover object-[center_15%]"
      />
      <p className="text-sm leading-5 text-white/85">
        <strong className="block font-heading text-base font-semibold text-white">
          {person} covers {area.postcode}
        </strong>
        <TravelNote travel={travel} />
      </p>
    </div>
  );
}

function TravelNote({ travel }: { travel: TravelState }): ReactNode {
  if (travel === "loading" || travel === undefined) return "Checking the travel fee…";
  if (travel === null || travel.borderline) return "Travel fee confirmed when we reply.";
  if (travel.band === "extended") return "Travel £10 or more, by arrangement.";
  return travel.band === "free" ? "No travel fee." : "£5 travel fee.";
}

function Thanks({
  slug,
  name,
  practitionerName,
  headingRef,
  topRef,
}: {
  slug: Slug;
  name: string;
  practitionerName: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  topRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Southampton patient forms are not online yet, so only Bristol gets the next step.
  const hasOnlinePatientForm = slug === "bristol";
  // Adam replies within 24 hours; Katie's reply time isn't confirmed yet.
  const reply =
    slug === "bristol"
      ? `${practitionerName} will reply within 24 hours, by WhatsApp or email.`
      : `${practitionerName} will be in touch within 24–48 hours.`;

  return (
    <div ref={topRef} className="steps-enter scroll-mt-24 pt-4 text-center">
      <span className="relative mx-auto block h-[112px] w-[112px]">
        <Image
          src={portraits[slug]}
          alt=""
          width={224}
          height={224}
          className="h-full w-full rounded-full bg-white object-cover object-[center_15%] shadow-[0_0_0_4px_#fff,0_16px_40px_-20px_rgba(24,55,45,0.6)]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-sageDark text-white shadow-[0_0_0_3px_var(--color-brand-offwhite)]"
        >
          <Check className="h-5 w-5" strokeWidth={2.6} />
        </span>
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-heading text-[2.15rem] font-bold leading-[1.05] tracking-[-0.035em] text-brand-charcoal outline-none"
      >
        Thank you,
        <br />
        <span className="text-brand-sage">{name || "and speak soon"}.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-brand-muted">{reply}</p>

      {hasOnlinePatientForm ? (
        <div className="mt-8 rounded-3xl bg-brand-sageDark p-6 text-left text-white">
          <p className="font-heading text-xl font-semibold">Save time on the day</p>
          <p className="mt-1 text-[15px] leading-6 text-white/80">
            Fill in your patient form now. It takes about 5 minutes.
          </p>
          <a
            href={`/forms?location=${slug}`}
            className={`mt-5 flex min-h-14 w-full items-center justify-center rounded-full bg-brand-offwhite px-6 text-lg font-semibold text-brand-sageDeep transition-colors hover:bg-white ${focusRing}`}
            data-analytics-id="enquiry-success-patient-form"
          >
            Complete patient form
          </a>
          <p className="mt-3 text-sm text-white/70">Our email has the link too, if you&rsquo;d rather do it later.</p>
        </div>
      ) : null}
    </div>
  );
}
