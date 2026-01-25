import { Mail, MessageCircle, Phone } from "lucide-react";
import BrandSeal from "../../components/BrandSeal";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 text-white">
      {/* Background texture */}
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.svg')] bg-cover bg-center bg-no-repeat" />
      {/* Tint overlay for readability */}
      <div className="absolute inset-0 bg-brand-sage/65" />

      {/* Subtle top divider + vignette for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <BrandSeal variant="footer" />

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight">
                <img
                  src="/images/footplus-logo-white.svg"
                  alt="Foot+ logo"
                  className="h-16 w-auto"
                />
              </div>
              <div className="mt-1 text-sm text-white/80">
                Calm, professional foot care at home.
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 md:justify-end">
            <a
              href="tel:+447000000000"
              aria-label="Call"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20"
            >
              <Phone className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://wa.me/447000000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </a>
            <a
              href="mailto:hello@footplusbristol.co.uk"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20"
            >
              <Mail className="h-5 w-5 text-white" />
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="/book"
              className="inline-flex w-fit items-center justify-center rounded-full bg-linear-to-b from-white/20 to-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:from-white/25 hover:to-white/15"
            >
              Book an appointment
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/15 pt-4">
          <div className="flex flex-col gap-2 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Foot+ • Bristol</div>
            <div className="flex items-center gap-2">
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
