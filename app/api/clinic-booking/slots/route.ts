import { bookingOpen, clinic, sessionSlots, slotIsPast } from "../../../lib/clinic";
import { getStripe, takenSlots } from "../../../lib/clinicStripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripe = getStripe();
  if (!bookingOpen() || !stripe) return Response.json({ open: false, sessions: [] });

  try {
    const taken = await takenSlots(stripe);
    const sessions = clinic.sessions
      .map((session) => ({
        id: session.id,
        label: session.label,
        slots: sessionSlots(session)
          .filter((slot) => !slotIsPast(slot))
          .map((slot) => ({ id: slot.id, time: slot.time, available: !taken.has(slot.id) })),
      }))
      .filter((s) => s.slots.length > 0);
    return Response.json({ open: true, sessions });
  } catch {
    return Response.json({ error: "Couldn't load times" }, { status: 502 });
  }
}
