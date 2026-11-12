"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Lock } from "lucide-react";

import {
  bookingOpen,
  clinic,
  clinicAgreement,
  displayTime,
  formatPrice,
  screeningQuestions,
  sessionSlots,
  type ClinicSession,
  type ScreeningAnswer,
  type ScreeningQuestion,
} from "../lib/clinic";
import { phoneDisplay, phoneHref } from "../lib/site";
import { body, btnSolid, displayH2, focusRing, lead, linkQuiet, supporting } from "../components/site/ui";

type Reason = NonNullable<ScreeningQuestion["reason"]>;
type Step =
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "agree" }
  | { kind: "time" }
  | { kind: "details" }
  | { kind: "stop"; reason: Reason }
  | { kind: "demoPaid" };

type SlotSession = { id: string; label: string; slots: { id: string; time: string; available: boolean }[] };

const field =
  "mt-2 block w-full min-h-14 rounded-lg border-[1.5px] border-brand-charcoal/25 bg-white px-4 text-lg text-brand-charcoal focus:border-brand-sageDark focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";
const label = "block text-lg font-semibold text-brand-charcoal";
const choice = `flex min-h-16 w-full items-center justify-center rounded-lg border-[1.5px] border-brand-sageDark bg-white px-4 text-xl font-semibold text-brand-sageDeep transition-colors duration-150 hover:bg-brand-wash ${focusRing}`;
const selected = "!bg-brand-sageDark !text-white";

// Demo mode: until a real clinic date and price are set, the page runs end to end
// with an example date and stops where Stripe would open. Adding a date turns it off.
const demo = !bookingOpen();
const demoSession: ClinicSession = {
  id: "demo",
  label: "Wednesday 13 January",
  date: "2027-01-13",
  start: "10:00",
  end: "15:00",
  breaks: [["12:20", "13:00"]],
};
const demoTaken = new Set(["10:20", "11:40", "13:40"]);
const sessionsShown = demo ? [demoSession] : clinic.sessions;
const canBook = bookingOpen() || demo;

const price = clinic.pricePence !== null ? formatPrice(clinic.pricePence) : null;

const stopCopy: Record<Reason, { title: string; text: string; urgent?: boolean }> = {
  nails: {
    title: "Very thick nails need a longer appointment",
    text: "Nails that have become very thick or overgrown need specialist tools and more time than a 20-minute clinic slot allows. A Foot+ home visit can help.",
  },
  infection: {
    title: "This needs looking at first",
    text: "A sore, swollen or ingrown toe needs treatment rather than a nail cut. Please speak to your GP or pharmacist, or request a Foot+ home visit.",
    urgent: true,
  },
  wound: {
    title: "Please get this checked first",
    text: "Cuts, sores and ulcers on the feet need to be seen by your GP or practice nurse before any foot care. Please contact them soon.",
    urgent: true,
  },
  mobility: {
    title: "A home visit may suit you better",
    text: "Foot+ can come to you instead, so you don't need to travel or move from your own chair.",
  },
};

export default function ClinicFlow() {
  const [step, setStep] = useState<Step>({ kind: "intro" });
  const [history, setHistory] = useState<Step[]>([]);
  const [answers, setAnswers] = useState<Record<string, ScreeningAnswer>>({});
  const [agreed, setAgreed] = useState(false);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotSession[] | null>(null);
  const [slotsError, setSlotsError] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("payment") === "cancelled") setCancelled(true);
  }, []);

  // Move focus to each new screen's heading so screen readers announce it.
  useEffect(() => {
    if (step.kind !== "intro") headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const loadSlots = async () => {
    setSlotsError(false);
    if (demo) {
      setSlots([
        {
          id: demoSession.id,
          label: demoSession.label,
          slots: sessionSlots(demoSession).map((s) => ({ id: s.id, time: s.time, available: !demoTaken.has(s.time) })),
        },
      ]);
      return;
    }
    try {
      const res = await fetch("/api/clinic-booking/slots", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { sessions: SlotSession[] };
      setSlots(data.sessions);
    } catch {
      setSlotsError(true);
    }
  };

  const go = (next: Step) => {
    setHistory((h) => [...h, step]);
    setStep(next);
    if (next.kind === "time") void loadSlots();
    window.scrollTo({ top: 0 });
  };
  const back = () => {
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory(history.slice(0, -1));
    setStep(prev);
  };

  const answer = (q: ScreeningQuestion, index: number, value: ScreeningAnswer) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    if (q.stopOn && value === q.stopOn) return go({ kind: "stop", reason: q.reason ?? "nails" });
    go(index + 1 < screeningQuestions.length ? { kind: "question", index: index + 1 } : { kind: "agree" });
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (demo) return go({ kind: "demoPaid" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSending(true);
    try {
      const res = await fetch("/api/clinic-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slot: slotId, answers, agreed }),
      });
      const result = (await res.json().catch(() => ({}))) as { url?: string; error?: string; code?: string };
      if (res.ok && result.url) {
        window.location.href = result.url;
        return;
      }
      if (result.code === "taken") {
        setSlotId(null);
        setHistory((h) => h.slice(0, -1));
        setStep({ kind: "time" });
        void loadSlots();
      }
      setError(result.error ?? `Sorry, something went wrong. Please try again or call ${phoneDisplay}.`);
    } catch {
      setError(`Sorry, something went wrong. Please try again or call ${phoneDisplay}.`);
    }
    setSending(false);
  }

  const heading = (text: string) => (
    <h1 ref={headingRef} tabIndex={-1} className={`${displayH2} outline-none`}>
      {text}
    </h1>
  );

  const errorBox = error && (
    <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-lg text-red-800">
      {error}
    </p>
  );

  const qCount = screeningQuestions.length;
  const slotLabel = (() => {
    for (const s of slots ?? []) {
      const slot = s.slots.find((x) => x.id === slotId);
      if (slot) return `${s.label}, ${displayTime(slot.time)}`;
    }
    return null;
  })();

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-20 pt-8 sm:px-6 md:pt-14">
      {demo && (
        <p className="mb-6 rounded-lg bg-brand-wash p-3 text-base text-brand-charcoal">
          Demonstration: the clinic date is an example and no payment is taken.
        </p>
      )}
      {history.length > 0 && step.kind !== "demoPaid" && (
        <button type="button" onClick={back} className={`${linkQuiet} mb-4 no-underline`}>
          <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Back
        </button>
      )}

      {step.kind === "intro" && (
        <>
          {cancelled && (
            <p role="status" className="mb-6 rounded-lg bg-brand-wash p-4 text-lg text-brand-charcoal">
              Your payment wasn&rsquo;t completed, so you haven&rsquo;t been booked. You can start again below.
            </p>
          )}
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-sageDark">
            Foot+ with {clinic.partnerName}
          </p>
          <h1 className="mt-2 font-heading text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.015em] text-brand-sageDeep md:text-[3rem]">
            Toenail cutting clinic
          </h1>
          <p className={`${lead} mt-4`}>
            A simple, friendly nail cut from a qualified Foot Health Practitioner, run with {clinic.partnerName}.
          </p>

          <dl className="mt-8 grid gap-4 border-y border-brand-charcoal/15 py-6 text-lg">
            {clinic.venue && <Row term="Where" detail={clinic.venue} />}
            {sessionsShown.length > 0 && <Row term="When" detail={sessionsShown.map((s) => s.label).join(" · ")} />}
            <Row term="How long" detail={`${clinic.slotMinutes} minutes`} />
            {price && <Row term="Cost" detail={`${price}, paid by card when you book. Non-refundable.`} />}
            <Row term="Included" detail="Cutting and filing your toenails." />
            <Row
              term="Not included"
              detail="Very thick or overgrown nails, ingrown nails, corns, hard skin or verrucas. These need a full appointment."
            />
          </dl>

          {canBook ? (
            <>
              <h2 className="mt-8 font-heading text-xl font-semibold text-brand-sageDeep">How to book</h2>
              <p className={`${body} mt-2`}>
                Answer {qCount} quick questions to check the clinic is right for you, choose a time and pay by card.
                Booking for someone else? That&rsquo;s fine, answer for them.
              </p>
              <button type="button" onClick={() => go({ kind: "question", index: 0 })} className={`${btnSolid} mt-8 w-full`}>
                Start
              </button>
            </>
          ) : (
            <p className={`${lead} mt-8`}>Booking opens soon. Call us to be told when it does.</p>
          )}
          <p className={`${supporting} mt-5 text-center`}>
            Prefer to talk?{" "}
            <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4">
              Call {phoneDisplay}
            </a>
          </p>
        </>
      )}

      {step.kind === "question" &&
        (() => {
          const q = screeningQuestions[step.index];
          return (
            <>
              <p className={supporting}>
                Question {step.index + 1} of {qCount}
              </p>
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-line"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={qCount}
                aria-valuenow={step.index + 1}
                aria-label="Progress"
              >
                <div className="h-full bg-brand-sageDark" style={{ width: `${((step.index + 1) / qCount) * 100}%` }} />
              </div>
              <div className="mt-8">{heading(q.question)}</div>
              {q.hint && <p className={`${body} mt-3 text-brand-muted`}>{q.hint}</p>}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => answer(q, step.index, v)}
                    aria-pressed={answers[q.id] === v}
                    className={`${choice} ${answers[q.id] === v ? selected : ""}`}
                  >
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </>
          );
        })()}

      {step.kind === "agree" && (
        <>
          {heading("Before you book")}
          <p className={`${body} mt-4`}>
            Each appointment is {clinic.slotMinutes} minutes. The practitioner will look at your nails before cutting.
          </p>
          <label className="mt-8 flex cursor-pointer gap-4 rounded-lg border-[1.5px] border-brand-charcoal/20 bg-white p-5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-7 w-7 shrink-0 accent-brand-sageDark"
            />
            <span className="text-lg leading-7 text-brand-charcoal">{clinicAgreement}</span>
          </label>
          <button type="button" disabled={!agreed} onClick={() => go({ kind: "time" })} className={`${btnSolid} mt-8 w-full disabled:opacity-40`}>
            Choose a time
          </button>
        </>
      )}

      {step.kind === "time" && (
        <>
          {heading("Choose a time")}
          {errorBox}
          {slotsError ? (
            <p className={`${body} mt-6`}>
              Sorry, the times didn&rsquo;t load.{" "}
              <button type="button" onClick={loadSlots} className="font-semibold text-brand-sageDeep underline underline-offset-4">
                Try again
              </button>{" "}
              or call {phoneDisplay}.
            </p>
          ) : slots === null ? (
            <p className={`${body} mt-6`} role="status">
              Loading times…
            </p>
          ) : slots.every((s) => s.slots.every((x) => !x.available)) ? (
            <p className={`${lead} mt-6`}>
              Sorry, all appointments are taken. Call{" "}
              <a href={phoneHref} className="font-semibold underline underline-offset-4">
                {phoneDisplay}
              </a>{" "}
              to hear about the next clinic.
            </p>
          ) : (
            <>
              {slots.map((session) => (
                <fieldset key={session.id} className="mt-8">
                  <legend className="font-heading text-xl font-semibold text-brand-sageDeep">{session.label}</legend>
                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {session.slots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        aria-pressed={slotId === slot.id}
                        aria-label={`${session.label}, ${displayTime(slot.time)}${slot.available ? "" : ", taken"}`}
                        onClick={() => setSlotId(slot.id)}
                        className={`${choice} !min-h-14 !text-lg ${slotId === slot.id ? selected : ""} disabled:cursor-not-allowed disabled:border-brand-charcoal/15 disabled:bg-transparent disabled:text-brand-charcoal/35 disabled:line-through`}
                      >
                        {displayTime(slot.time)}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button
                type="button"
                disabled={!slotId}
                onClick={() => {
                  setError(null);
                  go({ kind: "details" });
                }}
                className={`${btnSolid} mt-10 w-full disabled:opacity-40`}
              >
                Continue
              </button>
            </>
          )}
        </>
      )}

      {step.kind === "details" && (
        <>
          {heading("Your details")}
          {slotLabel && (
            <p className={`${lead} mt-3`}>
              <span className="font-semibold text-brand-sageDeep">{slotLabel}</span>
            </p>
          )}
          <form onSubmit={submit} className="mt-8 space-y-6">
            <fieldset>
              <legend className={label}>Who is the appointment for?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ["self", "Me"],
                  ["other", "Someone else"],
                ].map(([value, text]) => (
                  <label key={value} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border-[1.5px] border-brand-charcoal/20 bg-white px-4 text-lg">
                    <input type="radio" name="bookingFor" value={value} defaultChecked={value === "self"} className="h-6 w-6 accent-brand-sageDark" />
                    {text}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="name" className={label}>
                Name of the person having their nails cut
              </label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>
                Phone number
              </label>
              <p className={supporting}>In case we need to reach you about the appointment.</p>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
            </div>
            <div>
              <label htmlFor="contactName" className={label}>
                Your name, if you&rsquo;re booking for someone else <span className="font-normal text-brand-muted">(optional)</span>
              </label>
              <input id="contactName" name="contactName" className={field} />
            </div>
            <div>
              <label htmlFor="notes" className={label}>
                Anything we should know? <span className="font-normal text-brand-muted">(optional)</span>
              </label>
              <p className={supporting}>For example, if you use a wheelchair or someone is coming with you.</p>
              <textarea id="notes" name="notes" rows={3} maxLength={450} className={`${field} py-3`} />
            </div>
            {errorBox}
            <button type="submit" disabled={sending} className={`${btnSolid} w-full disabled:opacity-60`}>
              <Lock className="h-5 w-5" aria-hidden="true" />
              {sending ? "Opening payment…" : price ? `Pay ${price} and book` : "Pay and book"}
            </button>
            <p className={`${supporting} text-center`}>
              You&rsquo;ll pay securely with Stripe. Your time is held for 30 minutes while you pay.
            </p>
          </form>
        </>
      )}

      {step.kind === "demoPaid" && (
        <>
          {heading("This is where payment opens")}
          <p className={`${lead} mt-4`}>
            In the live version, the patient now goes to a secure Stripe card payment page for {price ?? "the fee"}.
          </p>
          <p className={`${body} mt-4`}>
            Once they&rsquo;ve paid, they see a &ldquo;You&rsquo;re booked&rdquo; page with their time, both of you get a
            confirmation email, and the time is removed from the list for everyone else.
          </p>
          {slotLabel && (
            <p className={`${body} mt-6 rounded-lg bg-white p-4`}>
              Time chosen: <span className="font-semibold text-brand-sageDeep">{slotLabel}</span>
            </p>
          )}
          <button type="button" onClick={() => window.location.assign("/ageuk")} className={`${btnSolid} mt-8 w-full`}>
            Start again
          </button>
        </>
      )}

      {step.kind === "stop" &&
        (() => {
          const copy = stopCopy[step.reason];
          return (
            <>
              {heading("This clinic isn't the right fit")}
              <h2 className="mt-6 font-heading text-xl font-semibold text-brand-sageDeep">{copy.title}</h2>
              <p className={`${body} mt-2`}>{copy.text}</p>
              {copy.urgent && (
                <p className={`${body} mt-4 rounded-lg bg-brand-wash p-4`}>
                  If it&rsquo;s getting worse, hot, or spreading, contact your GP today or call NHS 111.
                </p>
              )}
              <div className="mt-8 grid gap-3">
                <Link href="/book" className={`${btnSolid} w-full`}>
                  Request a Foot+ home visit
                </Link>
                <a href={phoneHref} className={`${linkQuiet} justify-center`}>
                  Or call {phoneDisplay}
                </a>
              </div>
              <p className={`${supporting} mt-6`}>Answered by mistake? Use the Back button above to change your answer.</p>
            </>
          );
        })()}
    </div>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="font-semibold text-brand-sageDeep">{term}</dt>
      <dd className="text-brand-charcoal">{detail}</dd>
    </div>
  );
}
