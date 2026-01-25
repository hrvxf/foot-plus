import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ ok: false, error: "Server misconfigured: missing RESEND_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const to = process.env.CONTACT_TO_EMAIL || "hello@foot-plus.co.uk";
    const from = "Foot+ Contact <hello@foot-plus.co.uk>";

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Foot+ website enquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to send" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
