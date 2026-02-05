import { Mail, Phone, Facebook } from "lucide-react";
import BrandSeal from "../../components/BrandSeal";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  // Simple WhatsApp-style mark (inline SVG) so you don't need extra deps
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.73a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.36Zm-8.45 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74 1.03 1-3.65-.24-.38a9.9 9.9 0 1 1 8.38 4.59Zm5.74-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.51-.7-.52h-.6c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.45.26-.71.26-1.33.18-1.45-.08-.12-.28-.2-.59-.36Z" />
    </svg>
  );
}

export default function Footer() {
  const message = encodeURIComponent(
    "Hi Adam, I’d like to enquire about an appointment with Foot+."
  );
  const whatsappHref = `https://wa.me/447380301555?text=${message}`;

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

      <div className="relative mx-auto max-w-6xl px-6 py-6 md:py-7">
        {/* 
          KEY CHANGE:
          On md+, this becomes a 3-col / 2-row grid so:
          - Row 1: brand mark + icons + CTA
          - Row 2: tagline (col 1) aligns with contact info (col 2)
        */}
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-3 md:items-start">
          {/* Brand (row 1, col 1) */}
          <div className="flex items-center gap-4 md:row-start-1 md:col-start-1">
            <BrandSeal variant="footer" />

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight">
                <img
                  src="/images/footplus-logo.png"
                  alt="Foot+ Bristol logo"
                  className="h-16 w-auto"
                />
              </div>

              {/* Mobile tagline stays here */}
              <div className="mt-1 text-sm text-white/80 md:hidden">
                Calm, professional foot care at home.
              </div>
            </div>
          </div>

          {/* Icons (row 1, col 2) */}
          <div className="flex justify-center md:row-start-1 md:col-start-2">
            <div className="flex items-center gap-3">
              {/* WhatsApp (first) */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={iconBtn}
              >
                <WhatsAppIcon className={icon} />
              </a>

              {/* Call */}
              <a href="tel:+447380301555" aria-label="Call" className={iconBtn}>
                <Phone className={icon} />
              </a>

              {/* Email */}
              <a
                href="mailto:hello@foot-plus.co.uk"
                aria-label="Email"
                className={iconBtn}
              >
                <Mail className={icon} />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61586341484139"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={iconBtn}
              >
                <Facebook className={icon} />
              </a>
            </div>
          </div>

          {/* CTA (row 1, col 3) */}
          <div className="flex flex-col items-center gap-3 md:row-start-1 md:col-start-3 md:items-end">
            <a
              href="/book"
              className="inline-flex w-fit items-center justify-center rounded-full bg-linear-to-b from-white/20 to-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:from-white/25 hover:to-white/15"
            >
              Book an appointment
            </a>
          </div>

          {/* Tagline (row 2, col 1) — md+ only, aligns with contact info */}
          <div className="hidden text-sm text-white/80 md:block md:row-start-2 md:col-start-1">
           Care that starts from the ground up.
          </div>

          {/* Contact info (row 2, col 2) — aligns with tagline on md+ */}
          <div className="text-sm text-white/80 md:row-start-2 md:col-start-2 md:text-center">
            <span className="whitespace-nowrap">07380 301555</span>
            <span className="mx-2 text-white/40">•</span>
            <a
              href="mailto:hello@foot-plus.co.uk"
              className="whitespace-nowrap transition hover:text-white"
            >
              hello@foot-plus.co.uk
            </a>
          </div>

          {/* Spacer (row 2, col 3) to keep row alignment clean on md+ */}
          <div className="hidden md:block md:row-start-2 md:col-start-3" />
        </div>

        {/* Bottom bar */}
        <div className="mt-5 border-t border-white/15 pt-3">
          <div className="flex flex-col gap-2 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Foot+ • Bristol</div>
            <div className="flex items-center gap-2">
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/areas"
              >
                Areas
              </a>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/privacy"
              >
                Privacy
              </a>
              <a
                className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                href="/terms"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}