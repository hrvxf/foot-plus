"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { partnerGroups, publishedLocalPartners, type PartnerGroup, type PartnerLocation } from "../../lib/partners";
import { focusRing, shell } from "../site/ui";
import PartnerLogo from "./PartnerLogo";

const locations: { id: PartnerLocation; label: string }[] = [
  { id: "bristol", label: "Bristol" },
  { id: "southampton", label: "Southampton" },
];

const pill = `inline-flex min-h-10 items-center justify-center rounded-full bg-brand-wash px-4 text-sm font-semibold text-brand-sageDeep transition-colors hover:bg-brand-line ${focusRing}`;

/**
 * /partners list: a Bristol/Southampton switch, kind-of-help filters (only those in use), and partners
 * grouped by kind. ?location=southampton opens on Southampton.
 */
export default function PartnersDirectory() {
  return <PartnersList asked={useSearchParams().get("location")} />;
}

/** The list itself. Also rendered without the URL as the server fallback, so the partners are in the HTML. */
export function PartnersList({ asked }: { asked: string | null }) {
  const [picked, setLocation] = useState<PartnerLocation | null>(null);
  const [group, setGroup] = useState<PartnerGroup | "All">("All");
  const location: PartnerLocation = picked ?? (asked === "southampton" ? "southampton" : "bristol");

  const here = publishedLocalPartners.filter((partner) => partner.location === location);
  const used = partnerGroups.filter((kind) => here.some((partner) => partner.group === kind));
  const active = group !== "All" && used.includes(group) ? group : "All";
  const shown = used.filter((kind) => active === "All" || kind === active);
  const place = locations.find((l) => l.id === location)!.label;

  return (
    <div>
      <div className="flex justify-center bg-brand-offwhite pb-10">
        <div role="group" aria-label="Location" className="inline-flex rounded-full border border-brand-line bg-white p-1">
          {locations.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={l.id === location}
              onClick={() => {
                setLocation(l.id);
                setGroup("All");
              }}
              className={`min-h-10 rounded-full px-5 text-sm font-semibold transition-colors ${focusRing} ${
                l.id === location ? "bg-brand-sageDark text-white" : "text-brand-muted"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {used.length > 1 && (
        <div role="group" aria-label="Kind of help" className="sticky top-16 z-[5] bg-white">
          <div className={`${shell} flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]`}>
            {(["All", ...used] as const).map((kind) => (
              <button
                key={kind}
                type="button"
                aria-pressed={kind === active}
                onClick={() => setGroup(kind)}
                className={`min-h-9 flex-none rounded-full border px-4 text-[0.8125rem] font-semibold transition-colors ${focusRing} ${
                  kind === active ? "border-brand-charcoal bg-brand-charcoal text-white" : "border-brand-line bg-white text-brand-sageDeep"
                }`}
              >
                {kind}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`${shell} max-w-3xl pb-6 pt-4`}>
        {shown.length ? (
          shown.map((kind) => (
            <section key={kind} className="pt-6" aria-labelledby={`group-${kind}`}>
              <h2
                id={`group-${kind}`}
                className="flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark after:h-px after:flex-1 after:bg-brand-line"
              >
                {kind}
              </h2>
              {here
                .filter((partner) => partner.group === kind)
                .map((partner) => (
                  <article
                    key={partner.slug}
                    id={partner.slug}
                    className="grid scroll-mt-32 grid-cols-[88px_1fr] items-start gap-4 border-b border-brand-line py-5 last:border-b-0 md:grid-cols-[140px_1fr] md:gap-6"
                  >
                    <PartnerLogo partner={partner} decorative className="aspect-square bg-brand-offwhite" />
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-semibold leading-tight text-brand-charcoal md:text-xl">{partner.name}</h3>
                      <p className="mt-0.5 text-[0.8125rem] font-semibold text-brand-sageDark">{partner.area}</p>
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.45] text-brand-muted">{partner.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a className={pill} href={partner.website} target="_blank" rel="noopener noreferrer">
                          Website<span className="sr-only"> for {partner.name} (opens in a new tab)</span>
                        </a>
                        {partner.phone && (
                          <a className={pill} href={`tel:${partner.phone.replace(/\s/g, "")}`}>
                            Call<span className="sr-only"> {partner.name} on {partner.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
            </section>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="font-heading text-xl font-semibold text-brand-charcoal">Partners coming soon</p>
            <p className="mt-2 text-brand-muted">We&apos;re building links with local services in {place}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
