import { Resend } from "resend";

import { emailDisplay, phoneDisplay, SITE_URL } from "../../lib/site";
import { validateServicePostcode, type EnquiryLocation } from "../../lib/postcodes";

export const runtime = "nodejs";


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

const patientFormUrls: Partial<Record<EnquiryLocation, string>> = {
  Bristol: `${SITE_URL}/forms?location=bristol`,
};

async function sendPatientConfirmation(
  resend: Resend,
  {
    from,
    to,
    name,
    location,
  }: { from: string; to: string; name: string; location: EnquiryLocation }
) {
  const firstName = name.split(" ")[0] || name;
  const safeFirstName = escapeHtml(firstName);
  const formUrl = patientFormUrls[location];
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

  const formBlockHtml = formUrl
    ? `
      <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#18372d;">One more step: your patient form</p>
      <p style="margin:0 0 20px;font-size:17px;line-height:1.6;">
        If you are a new patient, please complete your patient form. It takes about 5 minutes
        and helps us arrange your visit.
      </p>
      <p style="margin:0 0 24px;">
        <a href="${formUrl}" style="display:inline-block;background:#18372d;color:#ffffff;text-decoration:none;font-weight:700;font-size:17px;padding:14px 26px;border-radius:999px;">Complete your patient form</a>
      </p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#555555;">
        If the button doesn't work, copy this link into your browser:<br/>
        <a href="${formUrl}" style="color:#18372d;">${formUrl}</a>
      </p>
      <p style="margin:0 0 20px;font-size:17px;line-height:1.6;">
        You don't need to send another enquiry. A relative or carer is welcome to help you fill it in.
      </p>`
    : `
      <p style="margin:0 0 20px;font-size:17px;line-height:1.6;">
        We'll be in touch about any forms needed for your visit. You don't need to send another enquiry.
      </p>`;

  const html = `
    <div style="background:#f6f5f0;padding:28px 16px;font-family:${font};color:#2b2b2b;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px 24px;">
        <p style="margin:0 0 16px;font-size:22px;font-weight:700;color:#18372d;">Thank you, ${safeFirstName}</p>
        <p style="margin:0 0 20px;font-size:17px;line-height:1.6;">
          We've received your Foot+ ${escapeHtml(location)} enquiry and aim to reply within 24–48 hours
          to arrange your home visit.
        </p>
        ${formBlockHtml}
        <p style="margin:0;font-size:15px;line-height:1.6;color:#555555;">
          Questions? Call ${phoneDisplay} or reply to this email.
        </p>
      </div>
    </div>
  `;

  const text = [
    `Thank you, ${firstName}`,
    "",
    `We've received your Foot+ ${location} enquiry and aim to reply within 24-48 hours to arrange your home visit.`,
    "",
    ...(formUrl
      ? [
          "One more step: if you are a new patient, please complete your patient form (about 5 minutes):",
          formUrl,
          "",
          "You don't need to send another enquiry. A relative or carer is welcome to help.",
        ]
      : ["We'll be in touch about any forms needed. You don't need to send another enquiry."]),
    "",
    `Questions? Call ${phoneDisplay} or reply to this email.`,
  ].join("\n");

  await resend.emails.send({
    from: from.replace("Foot+ Contact", `Foot+ ${location}`),
    to,
    replyTo: locationRecipients[location],
    subject: formUrl
      ? "We've received your Foot+ enquiry – one more step"
      : "We've received your Foot+ enquiry",
    html,
    text,
  });
}

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
    const { name, email, message, location, postcode } = await req.json();

    if (!name || !email || !message || !postcode || !isEnquiryLocation(location)) {
      return new Response(JSON.stringify({ error: "Missing or invalid fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const postcodeValidation = validateServicePostcode(String(postcode), location);
    if (!postcodeValidation.valid) {
      return new Response(JSON.stringify({ error: postcodeValidation.message }), {
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
    const enquiryType = "appointment enquiry";
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
      text: `Location: ${location}\nPostcode: ${postcodeValidation.postcode}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to send" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Confirmation to the patient, with the patient-form link where one exists.
    // Best effort: a failure here must not fail the enquiry, which has already been sent.
    try {
      await sendPatientConfirmation(resend, {
        from,
        to: replyTo,
        name: String(name).trim(),
        location,
      });
    } catch {
      // ignore
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
