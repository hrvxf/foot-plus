// Server only: imports the secret key.
import Stripe from "stripe";

import { clinic } from "./clinic";

export const CLINIC_TAG = "ageuk";
/** How long an unpaid checkout holds its slot. Stripe's minimum is 30 minutes. */
export const HOLD_MINUTES = 30;

let client: Stripe | null = null;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

/**
 * Stripe is the booking record: a slot is taken if a paid checkout holds it,
 * or an unpaid one is still open (someone is on the payment page).
 * Returns slot id -> number of paid bookings (open holds count as 1).
 */
export async function takenSlots(stripe: Stripe) {
  const taken = new Map<string, number>();
  if (clinic.sessions.length === 0) return taken;
  // Bookings are made at most a few months ahead.
  const since = Math.floor(Date.now() / 1000) - 180 * 24 * 60 * 60;

  for (const status of ["complete", "open"] as const) {
    for await (const s of stripe.checkout.sessions.list({ status, created: { gte: since }, limit: 100 })) {
      if (s.metadata?.clinic !== CLINIC_TAG || !s.metadata.slot) continue;
      if (status === "complete" && s.payment_status !== "paid") continue;
      taken.set(s.metadata.slot, (taken.get(s.metadata.slot) ?? 0) + 1);
    }
  }
  return taken;
}
