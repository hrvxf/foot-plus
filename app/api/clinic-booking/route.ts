import { bookingOpen, clinic, findSlot, screeningOutcome, slotIsPast } from "../../lib/clinic";
import { CLINIC_TAG, getStripe, HOLD_MINUTES, takenSlots } from "../../lib/clinicStripe";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) => Response.json(body, { status });
// Stripe metadata values are capped at 500 characters.
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Starts a Stripe Checkout for one clinic slot and returns its URL. */
export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe || !bookingOpen() || clinic.pricePence === null) return json({ error: "Booking isn't open" }, 503);

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const name = str(data.name, 120);
  const phone = str(data.phone, 40);
  const contactName = str(data.contactName, 120);
  const notes = str(data.notes, 450);
  const bookingFor = data.bookingFor === "other" ? "other" : "self";
  const slot = findSlot(str(data.slot, 60));

  if (!name || phone.replace(/\D/g, "").length < 10) return json({ error: "Please add a name and phone number." }, 400);
  if (data.agreed !== true) return json({ error: "Please tick the agreement." }, 400);
  if (!slot || slotIsPast(slot)) return json({ error: "Please choose a time." }, 400);

  const outcome = screeningOutcome((data.answers ?? {}) as Record<string, unknown>);
  if (!outcome.ok) return json({ error: "Not suitable for this clinic" }, 422);

  try {
    const taken = await takenSlots(stripe);
    if (taken.has(slot.id)) {
      return json({ error: "Sorry, someone has just taken that time. Please choose another.", code: "taken" }, 409);
    }

    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: clinic.pricePence,
            product_data: {
              name: "Toenail cutting clinic",
              description: `${slot.label}${clinic.venue ? `, ${clinic.venue}` : ""}. Non-refundable.`,
            },
          },
        },
      ],
      metadata: {
        clinic: CLINIC_TAG,
        slot: slot.id,
        slotLabel: slot.label,
        name,
        phone,
        bookingFor,
        contactName,
        notes,
        flags: outcome.flags.join(","),
        agreed: "yes",
      },
      payment_intent_data: { description: `${clinic.partnerName} clinic: ${name}, ${slot.label}` },
      expires_at: Math.floor(Date.now() / 1000) + HOLD_MINUTES * 60,
      success_url: `${origin}/ageuk/booked?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ageuk?payment=cancelled`,
    });

    return json({ url: session.url });
  } catch {
    return json({ error: "Payment couldn't be started" }, 502);
  }
}
