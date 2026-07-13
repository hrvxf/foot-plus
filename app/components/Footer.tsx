import Link from "next/link";
import { Mail, Phone, Facebook } from "lucide-react";

import { emailDisplay, emailHref, phoneDisplay, phoneHref } from "../lib/site";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  // Simple WhatsApp-style mark (inline SVG) so you don't need extra deps
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.73a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.36Zm-8.45 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74 1.03 1-3.65-.24-.38a9.9 9.9 0 1 1 8.38 4.59Zm5.74-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.51-.7-.52h-.6c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.45.26-.71.26-1.33.18-1.45-.08-.12-.28-.2-.59-.36Z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappPresetMessage =
    "Hi Adam, I'd like to enquire about an appointment with Foot+ Bristol.";
  const whatsappHref = `https://wa.me/447380301555?text=${encodeURIComponent(
    whatsappPresetMessage
  )}`;
  const iconBtn =
    "group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-200 " +
    "hover:bg-white/20 hover:-translate-y-0.5 hover:ring-white/25 hover:shadow-[0_10px_24px_-18px_rgba(0,0,0,0.75)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const icon =
    "h-5 w-5 text-white transition-transform duration-200 group-hover:scale-[1.03]";

  return (
    <footer className="relative z-10 mt-6 text-white md:mt-8">
      {/* Background texture */}
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px]" />
      {/* Tint overlay for readability */}
      <div className="absolute inset-0 bg-brand-sage/65" />

      {/* Subtle top divider + vignette for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20" />

      <div className="relative mx-auto max-w-6xl px-6 py-4 md:py-5">
        <div className="grid gap-5 md:grid-cols-[1.1fr_minmax(0,1.2fr)_0.9fr] md:items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight">
              <img
                src="/images/footplus-logo_WHITE.svg"
                alt="Foot+ Bristol logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="mt-1 hidden text-sm text-white/70 md:block">Care that starts from the ground up.</p>
          </div>

          <div className="flex flex-col items-center text-center md:text-left">
            <nav aria-label="Quick contact options" className="mt-3 flex items-center justify-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={iconBtn}
                data-analytics-id="footer-whatsapp"
              >
                <WhatsAppIcon className={icon} />
              </a>
              <a
                href={phoneHref}
                aria-label="Call"
                className={iconBtn}
                data-analytics-id="footer-phone"
              >
                <Phone className={icon} />
              </a>
              <a
                href={emailHref}
                aria-label="Email"
                className={iconBtn}
                data-analytics-id="footer-email"
              >
                <Mail className={icon} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586341484139"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={iconBtn}
                data-analytics-id="footer-facebook"
              >
                <Facebook className={icon} />
              </a>
            </nav>
            <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[13px] text-white/80 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.65)] backdrop-blur md:justify-start">
              <span className="font-semibold text-white/90">{phoneDisplay}</span>
              <span className="opacity-50" aria-hidden="true">
                &bull;
              </span>
              <a
                href={emailHref}
                className="transition hover:text-white"
                data-analytics-id="footer-email-inline"
              >
                {emailDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center md:items-end md:text-right">
            <a
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-b from-white/20 to-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:from-white/25 hover:to-white/15 md:w-auto"
              data-analytics-id="footer-book"
            >
              Book an appointment
            </a>
          </div>
        </div>

        <div className="mt-4 border-t border-white/15 pt-2">
          <div className="grid grid-cols-1 gap-3 text-xs text-white/70 md:grid-cols-[1fr_auto] md:items-center">
            <div className="text-sm text-white/80 text-center md:text-left">
              &copy; {new Date().getFullYear()} Foot+ Bristol
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 md:justify-end md:justify-self-end"
            >
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/services"
                data-analytics-id="footer-link-services"
              >
                Services
              </a>
              <Link
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/advice"
                data-analytics-id="footer-link-advice"
              >
                Advice
              </Link>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/areas-we-cover"
                data-analytics-id="footer-link-areas-we-cover"
              >
                Areas We Cover
              </a>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/forms"
                data-analytics-id="footer-link-forms"
              >
                Forms
              </a>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/privacy"
                data-analytics-id="footer-link-privacy"
              >
                Privacy
              </a>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/terms"
                data-analytics-id="footer-link-terms"
              >
                Terms
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
