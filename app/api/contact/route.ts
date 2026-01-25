import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "hello@foot-plus.co.uk";

    // NOTE: Until you verify your domain in Resend, use onboarding@resend.dev as the from.
    const from = "Foot+ Contact <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Foot+ website enquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to send" }), { status: 500 });
  }
}
