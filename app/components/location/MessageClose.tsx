"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { SmallPrint } from "../Footer";
import { focusRing, shell, texturedGreen } from "../site/ui";

/**
 * Location page closing section: "Say hello to <name>." over a message bar with the practitioner's photo.
 * Example first messages type themselves out in the bar; tapping it opens the practitioner's messaging
 * (WhatsApp or email). Reduced motion shows the plain placeholder. It ends the page: the small print sits at
 * the bottom of the section, and the site footer is left out (Footer.tsx, hasOwnClose).
 * The care homes page reuses it in its slate colours, with its own heading, example messages and links.
 */
export default function MessageClose({
  id,
  name,
  portraitSrc,
  messageHref,
  messageLabel,
  sectionId,
  greeting = "Say hello",
  examples,
  tone = "sage",
  children,
}: {
  id: string;
  /** First name, e.g. "Adam". */
  name: string;
  portraitSrc: string;
  /** Where the bar goes: a WhatsApp link, or a mailto: until there's WhatsApp. */
  messageHref: string;
  /** Screen reader name for the bar, e.g. "Message Adam on WhatsApp". */
  messageLabel: string;
  /** Anchor for links that jump to the close, e.g. "care-contact". */
  sectionId?: string;
  /** First heading line; the second is "to <name>." */
  greeting?: string;
  /** Example first messages typed into the bar. */
  examples?: string[];
  /** "care" uses the slate palette of the care homes page. */
  tone?: "sage" | "care";
  /** Extra links under the bar. */
  children?: React.ReactNode;
}) {
  const typed = useTyping(
    examples ?? [`Hi ${name}, could you visit Dad?`, "Any visits next week?", "Can you help with thick nails?"],
  );
  const care = tone === "care";
  const external = messageHref.startsWith("http");

  return (
    <section
      id={sectionId}
      className={`${care ? "relative bg-care-deep text-white" : texturedGreen} z-10 scroll-mt-16 -mt-[30px] rounded-t-[30px] pb-[max(env(safe-area-inset-bottom),12px)] pt-10 text-center text-white md:pt-14`}
      aria-labelledby={id}
    >
      <div className={shell}>
        <h2 id={id} className="font-heading text-[2.375rem] font-semibold leading-[1.03] tracking-[-0.025em] md:text-5xl">
          {greeting}
          <span className={`block ${care ? "text-care-soft" : "text-[#A8E6B8]"}`}>to {name}.</span>
        </h2>

        <a
          href={messageHref}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={messageLabel}
          className={`mx-auto mt-6 flex max-w-[360px] items-center gap-2.5 rounded-full bg-white p-[7px] text-left shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] md:mt-8 ${focusRing}`}
        >
          <Image src={portraitSrc} alt="" width={80} height={80} className="h-10 w-10 flex-none rounded-full object-cover" />
          <span className="flex-1 overflow-hidden whitespace-nowrap text-base text-[#8a948e]" aria-hidden="true">
            {typed ? <span className="text-brand-charcoal">{typed}</span> : `Message ${name}…`}
            <span className="ml-px inline-block h-[18px] w-[1.5px] animate-pulse bg-brand-sageDark align-[-3px] motion-reduce:hidden" />
          </span>
          <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${care ? "bg-care-deep" : "bg-brand-sageDark"}`}>
            <ArrowRight className="h-[18px] w-[18px] text-white" aria-hidden="true" />
          </span>
        </a>
        {children}
      </div>

      {/* The page ends here: no footer pill on the location pages (see Footer.tsx). */}
      <div role="contentinfo" className={`mx-auto max-w-[75rem] px-3 text-left md:px-6 ${children ? "mt-6 md:mt-10" : "mt-12 md:mt-16"}`}>
        <div className="border-t border-white/15 pt-1">
          <SmallPrint />
        </div>
      </div>
    </section>
  );
}

/** Types each line out, holds it, deletes it, and moves to the next. Empty string between lines. */
function useTyping(lines: string[]) {
  const [text, setText] = useState("");
  const key = lines.join("|");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let line = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const current = lines[line];
      if (!deleting) {
        chars += 1;
        if (chars > current.length) {
          deleting = true;
          timer = setTimeout(step, 1600);
          return;
        }
      } else {
        chars -= 1;
        if (chars === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
        }
      }
      setText(current.slice(0, chars));
      timer = setTimeout(step, deleting ? 25 : 55);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
    // key stands in for lines, which is rebuilt each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return text;
}
