// Community nail-cutting clinic run with Age UK South Gloucestershire.
// Everything still to be agreed lives here, so the page never shows a venue,
// date or price that hasn't been confirmed. Until there is a price and at least
// one session, the page shows "booking opens soon" and the phone number.

export type ClinicSession = {
  /** Stable id, e.g. "2027-01-13". Used in slot ids, so don't change it once people have booked. */
  id: string;
  /** e.g. "Wednesday 13 January" */
  label: string;
  /** Local (UK) date, YYYY-MM-DD. */
  date: string;
  /** 24-hour clock, e.g. "10:00". */
  start: string;
  /** Time the last appointment must finish by, e.g. "15:00". */
  end: string;
  /** Optional gaps, e.g. lunch: [["12:20", "13:00"]]. */
  breaks?: [string, string][];
};

export const clinic = {
  partnerName: "Age UK South Gloucestershire",
  /** Venue name and address. */
  venue: null as string | null,
  /** Price in pence, e.g. 2000 for £20. */
  pricePence: 2800 as number | null,
  /** Each appointment's length. */
  slotMinutes: 20,
  sessions: [] as ClinicSession[],
  /** Where booking notifications go. */
  inbox: "bristol@foot-plus.co.uk",
} as const;

export const formatPrice = (pence: number) =>
  `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;

export const bookingOpen = () => clinic.pricePence !== null && clinic.sessions.length > 0;

// ---------- Slots ----------

export type Slot = { id: string; sessionId: string; time: string; label: string };

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
export const displayTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

export function sessionSlots(session: ClinicSession): Slot[] {
  const slots: Slot[] = [];
  const breaks = (session.breaks ?? []).map(([a, b]) => [toMin(a), toMin(b)]);
  for (let m = toMin(session.start); m + clinic.slotMinutes <= toMin(session.end); m += clinic.slotMinutes) {
    const end = m + clinic.slotMinutes;
    if (breaks.some(([a, b]) => m < b && end > a)) continue;
    const time = toTime(m);
    slots.push({
      id: `${session.id}@${time}`,
      sessionId: session.id,
      time,
      label: `${session.label}, ${displayTime(time)}`,
    });
  }
  return slots;
}

export const findSlot = (id: string) =>
  clinic.sessions.flatMap(sessionSlots).find((s) => s.id === id) ?? null;

/** Current UK date and time as "YYYY-MM-DD HH:MM", for hiding past slots. */
export function ukNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
}

export const slotIsPast = (slot: Slot) => {
  const session = clinic.sessions.find((s) => s.id === slot.sessionId);
  return !session || `${session.date} ${slot.time}` <= ukNow();
};

// ---------- Screening ----------

export type ScreeningAnswer = "yes" | "no";

export type ScreeningQuestion = {
  id: string;
  question: string;
  hint?: string;
  /** The answer that means this clinic isn't suitable. */
  stopOn?: ScreeningAnswer;
  reason?: "nails" | "infection" | "wound" | "mobility";
  /** Answer is passed to the practitioner but doesn't stop the booking. */
  flagOn?: ScreeningAnswer;
};

export const screeningQuestions: ScreeningQuestion[] = [
  {
    id: "thick",
    question: "Have any of your toenails become very thick, overgrown or curled?",
    hint: "Nails that are a little thicker than they used to be are fine. Nails left a long time, so they're very thick, hard or curling over, need a longer appointment than the clinic allows.",
    stopOn: "yes",
    reason: "nails",
  },
  {
    id: "ingrown",
    question: "Do you have an ingrown toenail, or a toe that is red, swollen, painful or weeping?",
    stopOn: "yes",
    reason: "infection",
  },
  {
    id: "wound",
    question: "Do you have any cuts, sores, ulcers or open wounds on your feet?",
    stopOn: "yes",
    reason: "wound",
  },
  {
    id: "diabetes",
    question: "Do you have diabetes, poor circulation, or numbness in your feet?",
    hint: "You can still book. This just helps the practitioner prepare.",
    flagOn: "yes",
  },
  {
    id: "mobility",
    question: "Can you take off your shoes and socks and sit in a chair for 20 minutes?",
    hint: "It's fine if a friend, relative or carer comes with you to help.",
    stopOn: "no",
    reason: "mobility",
  },
];

export const clinicAgreement =
  "I understand this clinic is for toenail cutting only. If my nails are very thick or overgrown, or I need other treatment, I won't be treated at the clinic and my payment won't be refunded, because my 20-minute appointment could have gone to someone else.";

/** Server-side check, so a booking can't skip the screening. */
export function screeningOutcome(answers: Record<string, unknown>) {
  const flags: string[] = [];
  for (const q of screeningQuestions) {
    const answer = answers[q.id];
    if (answer !== "yes" && answer !== "no") return { ok: false as const, reason: "incomplete" as const };
    if (q.stopOn && answer === q.stopOn) return { ok: false as const, reason: q.reason ?? "nails" };
    if (q.flagOn && answer === q.flagOn) flags.push(q.id);
  }
  return { ok: true as const, flags };
}
