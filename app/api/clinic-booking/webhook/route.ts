import { Resend } from "resend";
import type Stripe from "stripe";

import { clinic, formatPrice, screeningQuestions } from "../../../lib/clinic";
import { CLINIC_TAG, getStripe, takenSlots } from "../../../lib/clinicStripe";
import { emailDisplay, phoneDisplay } from "../../../lib/site";

export const runtime = "nodejs";

const esc = (input: string) =>
  input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

/**
 * Stripe calls this when a payment completes. It's what confirms a booking,
 * so it still works if the patient closes the page straight after paying.
 * Stripe Dashboard > Developers > Webhooks: send checkout.session.completed here.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_CLINIC_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!stripe || !secret || !signature) return new Response("Not configured", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return new Response("Bad signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") return new Response("ignored");
  const session = event.data.object;
  const m = session.metadata ?? {};
  if (m.clinic !== CLINIC_TAG || session.payment_status !== "paid") return new Response("ignored");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return new Response("Email not configured", { status: 500 });
  const resend = new Resend(apiKey);
  const from = `Foot+ Clinic <${emailDisplay}>`;
  const email = session.customer_details?.email ?? "";

  // Two people paying for the same time within seconds is very unlikely, but flag it if it happens.
  let doubleBooked = false;
  try {
    doubleBooked = ((await takenSlots(stripe)).get(m.slot) ?? 0) > 1;
  } catch {
    // Not critical.
  }

  const flagged = (m.flags ?? "")
    .split(",")
    .filter(Boolean)
    .map((id) => screeningQuestions.find((q) => q.id === id)?.question ?? id);

  const rows: [string, string][] = [
    ...(doubleBooked ? ([["⚠ Double-booked", "Another paid booking has this time. Call one of them to move or refund."]] as [string, string][]) : []),
    ...(flagged.length ? ([["⚠ Flag", flagged.map((f) => `Yes: ${f}`).join("\n")]] as [string, string][]) : []),
    ["Time", m.slotLabel ?? m.slot],
    ["Name", m.name],
    ["Phone", m.phone],
    ["Email", email || "Not given"],
    ["Booked by", m.bookingFor === "other" ? `${m.contactName || "Someone else"} (for ${m.name})` : "Themselves"],
    ["Notes", m.notes || "None"],
    ["Paid", formatPrice(session.amount_total ?? 0)],
  ];

  const { error } = await resend.emails.send({
    from,
    to: clinic.inbox,
    ...(email ? { replyTo: email } : {}),
    subject: `${doubleBooked || flagged.length ? "⚠ " : ""}Clinic booking: ${m.slotLabel}, ${m.name}`,
    text: [...rows.map(([k, v]) => `${k}: ${v}`), "", "Screening passed. Agreed to nail-cutting-only, no-refund terms."].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:16px;color:#243028;max-width:560px">
      <h2 style="color:#3E5A4C;margin:0 0 16px">${esc(clinic.partnerName)} clinic booking</h2>
      <table style="border-collapse:collapse;width:100%">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:bold;white-space:nowrap${k.startsWith("⚠") ? ";color:#a33" : ""}">${esc(k)}</td><td style="padding:8px 0">${esc(v ?? "").replace(/\n/g, "<br/>")}</td></tr>`
        )
        .join("")}</table>
      <p style="margin-top:16px;color:#55625A">Screening passed. Agreed to nail-cutting-only, no-refund terms.</p>
    </div>`,
  });
  // A failure here makes Stripe retry, so the notification isn't lost.
  if (error) return new Response("Email failed", { status: 500 });

  if (email) {
    try {
      const venue = clinic.venue ? ` at ${clinic.venue}` : "";
      await resend.emails.send({
        from,
        to: email,
        replyTo: clinic.inbox,
        subject: `You're booked: ${m.slotLabel}`,
        text: `You're booked into the ${clinic.partnerName} toenail cutting clinic: ${m.slotLabel}${venue}.\n\nThis appointment is for toenail cutting only and is non-refundable.\n\nCan't make it, or questions? Call ${phoneDisplay}.`,
        html: `<div style="font-family:Arial,sans-serif;font-size:17px;line-height:1.6;color:#243028;max-width:560px">
          <p style="font-size:22px;font-weight:bold;color:#3E5A4C">You're booked</p>
          <p style="font-size:20px;font-weight:bold">${esc(m.slotLabel ?? "")}${esc(venue)}</p>
          <p>${esc(clinic.partnerName)} toenail cutting clinic with Foot+.</p>
          <p>This appointment is for toenail cutting only and is non-refundable.</p>
          <p>Can't make it, or questions? Call ${phoneDisplay} or reply to this email.</p>
        </div>`,
      });
    } catch {
      // Stripe's own receipt still reaches them.
    }
  }

  return new Response("ok");
}
