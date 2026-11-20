"use client";

import { useEffect, useRef, useState } from "react";

import { stableViewportHeight } from "../../lib/stableViewport";
import { shell } from "../site/ui";

type Message = { from: "visitor" | "practitioner"; text: string };

/** Header height (top-16): the pinned stage sits below it. */
const HEADER = 64;
/** How many screens of scrolling the conversation plays over on phones. */
const SCREENS = 3.4;

/**
 * Location page "how it works", told as a short text conversation with the practitioner. On phones the
 * section pins and the messages arrive one at a time as you scroll, with typing dots before each reply.
 * Desktop and reduced motion show the whole conversation at once. Every message stays in the page for
 * screen readers and search; only its opacity changes.
 */
export default function VisitChat({
  id,
  practitioner,
  place,
  replies,
}: {
  id: string;
  /** First name, shown above each reply. */
  practitioner: string;
  /** Somewhere the practitioner covers, used in the conversation, e.g. "BS6" or "Romsey". */
  place: string;
  /** Closing line under the conversation, e.g. "Replies within 24 hours by WhatsApp or email." */
  replies: string;
}) {
  const messages: Message[] = [
    { from: "visitor", text: `Hi, could you visit my mum in ${place}?` },
    { from: "practitioner", text: `Yes, I visit ${place}. Would Tuesday at 10am suit?` },
    { from: "visitor", text: "Perfect, thank you." },
    { from: "practitioner", text: "See you Tuesday 👋" },
  ];

  const track = useRef<HTMLDivElement>(null);
  const bubbles = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLDivElement | null)[]>([]);
  const footer = useRef<HTMLParagraphElement>(null);
  // Off until the browser confirms a phone without reduced motion, so the server render shows everything.
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      setPinned(phone.matches && !reduce.matches);
      setHeight(stableViewportHeight());
    };
    decide();
    phone.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      phone.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    const show = (el: HTMLElement | null, on: boolean) => {
      if (!el) return;
      el.style.opacity = on ? "1" : "0";
      el.style.transform = on ? "none" : "translateY(10px) scale(0.97)";
    };
    if (!pinned) {
      bubbles.current.forEach((b) => show(b, true));
      dots.current.forEach((d) => show(d, false));
      show(footer.current, true);
      return;
    }
    let frame = 0;
    function render() {
      frame = 0;
      const t = track.current;
      if (!t) return;
      const rect = t.getBoundingClientRect();
      const travel = rect.height - (height - HEADER);
      const progress = Math.min(1, Math.max(0, (HEADER - rect.top) / travel));
      // One step per message, plus a last step for the closing line.
      const steps = messages.length + 1;
      const at = progress * steps;
      const shown = Math.min(messages.length, Math.floor(at + 0.15));
      const partway = at - Math.floor(at);
      messages.forEach((message, index) => {
        show(bubbles.current[index], index < shown);
        show(dots.current[index], index === shown && message.from === "practitioner" && partway > 0.35);
      });
      show(footer.current, shown === messages.length);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
    // messages is rebuilt from props each render; place and practitioner are what it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned, height, place, practitioner]);

  const fade = "transition-[opacity,transform] duration-[350ms] ease-out";

  return (
    <section id={id} className="scroll-mt-24 bg-white" aria-labelledby={`${id}-heading`}>
      <div ref={track} style={pinned && height ? { height: SCREENS * (height - HEADER) } : undefined}>
        <div
          className={`${shell} flex flex-col items-center text-center ${pinned ? "sticky top-16 justify-center" : "py-16 md:py-24"}`}
          style={pinned && height ? { height: height - HEADER } : undefined}
        >
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">How it works</p>
          <h2
            id={`${id}-heading`}
            className="mt-3 font-heading text-[2.125rem] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal md:text-5xl"
          >
            Just send
            <span className="block text-brand-sage">a message.</span>
          </h2>

          <div className="mt-7 flex w-full max-w-[22rem] flex-col gap-2.5 md:mt-10 md:max-w-md">
            {messages.map((message, index) => {
              const mine = message.from === "visitor";
              return (
                <div key={index} className={`relative ${mine ? "self-end" : "self-start"} max-w-[82%]`}>
                  {!mine && (
                    <div
                      ref={(el) => {
                        dots.current[index] = el;
                      }}
                      aria-hidden="true"
                      className={`absolute left-0 top-0 flex gap-1.5 rounded-[20px] rounded-bl-md border border-brand-line bg-brand-offwhite px-4 py-3.5 opacity-0 ${fade}`}
                    >
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-[7px] w-[7px] animate-bounce rounded-full bg-brand-sageLight"
                          style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
                        />
                      ))}
                    </div>
                  )}
                  <div
                    ref={(el) => {
                      bubbles.current[index] = el;
                    }}
                    className={`rounded-[20px] px-4 py-3 text-left text-base leading-[1.4] ${fade} ${
                      mine
                        ? "rounded-br-md bg-brand-sageDark text-white"
                        : "rounded-bl-md border border-brand-line bg-brand-offwhite text-brand-charcoal"
                    }`}
                  >
                    {mine ? (
                      <span className="sr-only">You: </span>
                    ) : (
                      <span className="mb-0.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-sageDark">
                        {practitioner}
                      </span>
                    )}
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>

          <p ref={footer} className={`mt-6 text-sm text-brand-muted ${fade}`}>
            {replies}
          </p>
        </div>
      </div>
    </section>
  );
}
