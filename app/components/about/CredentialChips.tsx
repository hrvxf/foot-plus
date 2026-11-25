"use client";

import { useState } from "react";
import { credentialMeanings } from "../../lib/about";
import { focusRing } from "../site/ui";

/** The letters after a practitioner's name as chips: tap one to see what it means. */
export default function CredentialChips({
  credentials,
  align = "center",
}: {
  credentials: string[];
  /** "start" lines the chips and their meaning up on the left (desktop practitioner cards). */
  align?: "center" | "start";
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shown, setShown] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  const choose = (credential: string) => {
    const next = selected === credential ? null : credential;
    setSelected(next);
    setFading(true);
    window.setTimeout(() => {
      setShown(next);
      setFading(false);
    }, 180);
  };

  return (
    <div>
      <ul
        className={`mt-4 flex flex-wrap gap-1.5 ${align === "start" ? "justify-start" : "justify-center"}`}
        aria-label="Qualifications and memberships"
      >
        {credentials.map((credential) => (
          <li key={credential}>
            <button
              type="button"
              aria-pressed={selected === credential}
              onClick={() => choose(credential)}
              className={`rounded-full px-3 py-[7px] text-[0.84375rem] font-semibold transition-colors duration-300 ${focusRing} ${
                selected === credential ? "bg-brand-sageDark text-white" : "bg-brand-wash text-brand-sageDeep"
              }`}
            >
              {credential}
            </button>
          </li>
        ))}
      </ul>
      <p
        className={`mt-2.5 min-h-[22px] text-[0.84375rem] font-semibold text-brand-sage transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
        aria-live="polite"
      >
        {shown ? credentialMeanings[shown] ?? shown : "Tap the letters"}
      </p>
    </div>
  );
}
