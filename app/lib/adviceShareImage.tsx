import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { AdviceArticle } from "./advice";

/**
 * Link-preview image for each advice article (Option A, Nov 2026): the promo graphic layout from
 * docs/04-brand-and-promo/brand-guide.md at 1200x630. Eyebrow, two-tone headline, Sage rule, logo and tagline.
 * Used by app/advice/[slug]/opengraph-image.tsx and twitter-image.tsx, so every new article gets one.
 * Headline comes from the article's shareLine1/shareLine2, or its shortTitle split in two.
 */
export const ADVICE_SHARE_SIZE = { width: 1200, height: 630 };
export const ADVICE_SHARE_ALT = "Foot+ advice";

const asset = (name: string) => readFile(join(process.cwd(), "assets/og", name));

// Light "+" confetti kept to the outer margins, away from the text block.
const PLUSES: { left?: number; right?: number; top: number; size: number; opacity: number }[] = [
  { left: 96, top: 84, size: 64, opacity: 0.85 },
  { left: 210, top: 60, size: 26, opacity: 0.45 },
  { left: 130, top: 300, size: 24, opacity: 0.35 },
  { left: 70, top: 480, size: 44, opacity: 0.6 },
  { left: 230, top: 540, size: 22, opacity: 0.35 },
  { right: 110, top: 70, size: 48, opacity: 0.7 },
  { right: 230, top: 150, size: 22, opacity: 0.4 },
  { right: 80, top: 330, size: 28, opacity: 0.45 },
  { right: 120, top: 470, size: 72, opacity: 0.8 },
  { right: 260, top: 560, size: 22, opacity: 0.3 },
];

/** Split a title into two lines of similar length, ending with a full stop unless it has its own punctuation. */
export function splitHeadline(text: string): [string, string] {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return [text, ""];
  let best = 1;
  for (let i = 1; i < words.length; i++) {
    const longest = Math.max(words.slice(0, i).join(" ").length, words.slice(i).join(" ").length);
    const current = Math.max(words.slice(0, best).join(" ").length, words.slice(best).join(" ").length);
    if (longest < current) best = i;
  }
  const second = words.slice(best).join(" ");
  return [words.slice(0, best).join(" "), /[.?!]$/.test(second) ? second : `${second}.`];
}

export async function renderAdviceShareImage(article: AdviceArticle) {
  const [poppins600, poppins700, inter500, inter600, logo] = await Promise.all([
    asset("poppins-latin-600-normal.woff"),
    asset("poppins-latin-700-normal.woff"),
    asset("inter-latin-500-normal.woff"),
    asset("inter-latin-600-normal.woff"),
    asset("logo-sagedark.svg"),
  ]);

  const [line1, line2] =
    article.shareLine1 && article.shareLine2 ? [article.shareLine1, article.shareLine2] : splitHeadline(article.shortTitle);
  // Keep the headline inside ~880px so it clears the confetti; 76px is the brand size.
  const longest = Math.max(line1.length, line2.length);
  const headlineSize = Math.min(76, Math.floor(880 / (longest * 0.6)));
  const eyebrow = `${article.category} · ${article.readingTime}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#F7F6F2",
          color: "#243028",
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        {PLUSES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              // Satori fails on undefined style values, so set only the side in use.
              ...(p.left !== undefined ? { left: p.left } : { right: p.right }),
              top: p.top,
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: p.size,
              lineHeight: 1,
              color: "#6C917B",
              opacity: p.opacity,
            }}
          >
            +
          </div>
        ))}
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 5.4,
            textTransform: "uppercase",
            color: "#4F6F5F",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 26,
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: headlineSize,
            lineHeight: 1.02,
            letterSpacing: -0.02 * headlineSize,
          }}
        >
          <div style={{ color: "#243028" }}>{line1}</div>
          <div style={{ color: "#6C917B" }}>{line2}</div>
        </div>
        <div style={{ width: 90, height: 4, marginTop: 30, borderRadius: 2, background: "#6C917B" }} />
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
          width={150}
          height={47}
          style={{ marginTop: 44 }}
        />
        <div
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 2.8,
            textTransform: "uppercase",
            color: "#55625A",
          }}
        >
          Foot care in your chair
        </div>
      </div>
    ),
    {
      ...ADVICE_SHARE_SIZE,
      fonts: [
        { name: "Poppins", data: poppins600, weight: 600, style: "normal" },
        { name: "Poppins", data: poppins700, weight: 700, style: "normal" },
        { name: "Inter", data: inter500, weight: 500, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
      ],
    },
  );
}
