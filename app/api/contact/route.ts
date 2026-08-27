import { Resend } from "resend";

import { emailDisplay } from "../../lib/site";

export const runtime = "nodejs";

type EnquiryLocation = "Bristol" | "Southampton";

const locationRecipients: Record<EnquiryLocation, string> = {
  Bristol: "bristol@foot-plus.co.uk",
  Southampton: "southampton@foot-plus.co.uk",
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isEnquiryLocation = (value: unknown): value is EnquiryLocation =>
  value === "Bristol" || value === "Southampton";

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
    const { name, email, message, location } = await req.json();

    if (!name || !email || !message || !isEnquiryLocation(location)) {
      return new Response(JSON.stringify({ error: "Missing or invalid fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const replyTo = String(email).trim();
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(replyTo);
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, "<br/>");
    const safeLocation = escapeHtml(location);

    const to = locationRecipients[location];
    const from = `Foot+ Contact <${emailDisplay}>`;
    const enquiryType =
      location === "Southampton" ? "launch enquiry" : "appointment enquiry";
    const subject = `New Foot+ ${location} ${enquiryType} — ${String(name).trim()}`;

    const html = `
      <div style="background:#0f1a16;padding:28px 16px;">
        <div style="max-width:640px;margin:0 auto;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:18px;overflow:hidden;">
          <div style="padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.12);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;">
            <div style="font-size:13px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.75;">Foot+ ${safeLocation} Enquiry</div>
            <div style="margin-top:6px;font-size:18px;font-weight:700;line-height:1.25;">New contact form submission</div>
          </div>

          <div style="padding:18px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;">
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
              <div style="flex:1;min-width:240px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:12px 14px;">
                <div style="font-size:12px;opacity:0.75;margin-bottom:4px;">Location</div>
                <div style="font-size:15px;font-weight:600;">${safeLocation}</div>
              </div>
              <div style="flex:1;min-width:240px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:12px 14px;">
                <div style="font-size:12px;opacity:0.75;margin-bottom:4px;">Name</div>
                <div style="font-size:15px;font-weight:600;">${safeName}</div>
              </div>
              <div style="flex:1;min-width:240px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:12px 14px;">
                <div style="font-size:12px;opacity:0.75;margin-bottom:4px;">Email</div>
                <div style="font-size:15px;font-weight:600;">
                  <a href="mailto:${safeEmail}" style="color:#ffffff;text-decoration:underline;">${safeEmail}</a>
                </div>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:14px;">
              <div style="font-size:12px;opacity:0.75;margin-bottom:6px;">Message</div>
              <div style="font-size:15px;line-height:1.55;">${safeMessage}</div>
            </div>

            <div style="margin-top:16px;font-size:12px;opacity:0.7;">
              Reply directly to this email to respond (Reply-To is set to the customer).
            </div>
          </div>

          <div style="padding:14px 20px;border-top:1px solid rgba(255,255,255,0.12);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;opacity:0.7;font-size:12px;">
            Sent via foot-plus.co.uk contact form.
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text: `Location: ${location}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to send" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

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
