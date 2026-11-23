"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { focusRing, shell, texturedGreen } from "../site/ui";

/**
 * Location page closing section: "Say hello to <name>." over a message bar with the practitioner's photo.
 * Example first messages type themselves out in the bar; tapping it opens the practitioner's messaging
 * (WhatsApp or email). Reduced motion shows the plain placeholder.
 */
export default function MessageClose({
  id,
  name,
  place,
  portraitSrc,
  messageHref,
  messageLabel,
  phone,
}: {
  id: string;
  /** First name, e.g. "Adam". */
  name: string;
  /** Eyebrow, e.g. "Foot+ Bristol". */
  place: string;
  portraitSrc: string;
  /** Where the bar goes: a WhatsApp link, or a mailto: until there's WhatsApp. */
  messageHref: string;
  /** Screen reader name for the bar, e.g. "Message Adam on WhatsApp". */
  messageLabel: string;
  phone: { display: string; href: string };
}) {
  const typed = useTyping([
    `Hi ${name}, could you visit Dad?`,
    "Any visits next week?",
    "Can you help with thick nails?",
  ]);
  const external = messageHref.startsWith("http");

  return (
    <section className={`${texturedGreen} pb-16 pt-11 text-center text-white md:pb-[5.5rem] md:pt-16`} aria-labelledby={id}>
      <div className={shell}>
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#A8E6B8]">{place}</p>
        <h2 id={id} className="mt-3 font-heading text-[2.375rem] font-semibold leading-[1.03] tracking-[-0.025em] md:text-5xl">
          Say hello
          <span className="block text-[#A8E6B8]">to {name}.</span>
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
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-sageDark">
            <ArrowRight className="h-[18px] w-[18px] text-white" aria-hidden="true" />
          </span>
        </a>

        <p className="mt-4 text-sm text-white/80">
          or{" "}
          <a href={phone.href} className={`font-semibold text-white ${focusRing}`}>
            call {name}<span className="sr-only"> on {phone.display}</span>
          </a>
        </p>
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
