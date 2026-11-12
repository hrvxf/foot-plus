import { Mail, Phone } from "lucide-react";

import { bristolWhatsAppHref, locationEmails, phoneDisplay, phoneHref } from "../../lib/site";

export type ContactAction = {
  kind: "phone" | "whatsapp" | "email";
  href: string;
  /** Read out by screen readers and shown as a tooltip; there is no visible text. */
  label: string;
  external?: boolean;
  analyticsId?: string;
};

/** Default Bristol contact set: call, WhatsApp Adam, email to bristol@. */
export function bristolContactActions({
  analyticsPrefix,
  email = locationEmails.bristol,
}: {
  analyticsPrefix?: string;
  email?: { href: string; label: string };
} = {}): ContactAction[] {
  const id = (name: string) => (analyticsPrefix ? `${analyticsPrefix}-${name}` : undefined);
  return [
    { kind: "phone", href: phoneHref, label: `Call Foot+ on ${phoneDisplay}`, analyticsId: id("phone") },
    { kind: "whatsapp", href: bristolWhatsAppHref, label: "WhatsApp Adam", external: true, analyticsId: id("whatsapp") },
    { kind: "email", href: email.href, label: email.label, analyticsId: id("email") },
  ];
}

const tones = {
  /** On green or dark panels. */
  dark: "text-white hover:bg-white/15 focus-visible:outline-white",
  /** On white or off-white backgrounds. */
  light: "text-brand-sageDeep hover:bg-brand-sageDeep/10 focus-visible:outline-brand-sageDark",
};

/**
 * Icon-only call, WhatsApp and email buttons, centred, no ring (48px tap area). Use next to a main "Request a visit"
 * button. Keep the written number in the header, footer and anywhere the number
 * is part of a sentence.
 */
export default function ContactIcons({
  actions = bristolContactActions(),
  tone = "light",
  className = "",
}: {
  actions?: ContactAction[];
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <ul className={`flex justify-center gap-4 ${className}`}>
      {actions.map((action) => (
        <li key={action.kind + action.href}>
          <a
            href={action.href}
            aria-label={action.label}
            title={action.label}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            data-analytics-id={action.analyticsId}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-2 ${tones[tone]}`}
          >
            <ContactGlyph kind={action.kind} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ContactGlyph({ kind }: { kind: ContactAction["kind"] }) {
  if (kind === "phone") return <Phone aria-hidden="true" className="h-6 w-6" />;
  if (kind === "email") return <Mail aria-hidden="true" className="h-6 w-6" />;
  return (
    <svg aria-hidden="true" className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.22-1.58A9.94 9.94 0 1 0 12.04 2Zm0 17.98a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-3.1.94 1-3.02-.2-.31a7.94 7.94 0 1 1 6.7 3.69Zm4.4-5.96c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.25 7.25 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
