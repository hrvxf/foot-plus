"use client";

import { useEffect } from "react";

type Props = {
  url: string;
};

export default function CalendlyEmbed({ url }: Props) {
  useEffect(() => {
    // Load Calendly embed script once
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="space-y-4">
      {/* Inline embed */}
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "900px" }}
      />
      <p className="text-sm text-gray-500">
        If the booking widget doesn’t load,{" "}
        <a className="underline" href={url} target="_blank" rel="noreferrer">
          open Calendly in a new tab
        </a>
        .
      </p>
    </div>
  );
}
