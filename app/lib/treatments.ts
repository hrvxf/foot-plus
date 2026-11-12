import { SITE_URL } from "./site";

// General treatment pages (both Bristol and Southampton). Nail cutting is the
// main market and keeps its own town pages; these stay location-neutral.
// Wording is drawn from the earlier reviewed Bristol pages. No em dashes.

export type Treatment = {
  slug: string;
  /** Short name for links and lists. */
  name: string;
  /** H1. */
  title: string;
  metaTitle: string;
  description: string;
  /** One line under the heading. */
  intro: string;
  /** A few words for compact service tiles (location pages). */
  short: string;
  /** "What it is": two or three sentences, signs and causes included. */
  about: string[];
  /** "What we do": short points, aftercare included. */
  care: string[];
  /** Condition-specific warning, shown as one line. */
  safety: string;
  faqs: { question: string; answer: string }[];
  guide?: { label: string; href: string };
  lastReviewed: string;
};

export const treatments: Treatment[] = [
  {
    slug: "corn-treatment",
    short: "Painful corns carefully reduced",
    name: "Corn treatment",
    title: "Corn treatment at home",
    metaTitle: "Corn Treatment at Home in Bristol and Southampton | Foot+",
    description:
      "Corn treatment at home from a qualified Foot Health Practitioner in Bristol and Southampton: careful reduction, pressure and footwear advice.",
    intro: "Careful reduction of painful corns, and advice to ease the pressure behind them.",
    about: [
      "A corn is a small, concentrated area of hard skin over a pressure point. It can feel sharp or tender in shoes or when walking.",
      "Corns usually come from local pressure: tight shoes, toe position or a prominent joint. They tend to return unless that pressure is eased.",
    ],
    care: [
      "Your practitioner checks the area first, as other problems can feel similar",
      "The corn is carefully reduced, where suitable",
      "Footwear and pressure advice to help stop it coming back",
    ],
    safety:
      "Don't cut corns yourself, especially with diabetes or reduced feeling in your feet. Severe pain, broken skin or signs of infection need your GP or a podiatrist.",
    faqs: [
      {
        question: "How do I know if it's a corn?",
        answer:
          "A corn often feels like one small, sharp pressure point. Other problems can feel similar, so your practitioner checks it before any care.",
      },
      {
        question: "What's the difference between a corn and a callus?",
        answer: "A corn is small and concentrated, and can feel sharp. A callus is a broader, flatter patch of hard skin.",
      },
      {
        question: "Will the corn come back?",
        answer: "It may, if the same pressure continues. Better-fitting footwear and regular care help slow it down.",
      },
    ],
    guide: { label: "Corn, callus or verruca?", href: "/advice/corn-callus-or-verruca" },
    lastReviewed: "November 2026",
  },
  {
    slug: "hard-skin-and-callus",
    short: "Thick, rough skin safely smoothed",
    name: "Hard skin and callus",
    title: "Hard skin and callus removal at home",
    metaTitle: "Hard Skin and Callus Removal at Home in Bristol and Southampton | Foot+",
    description:
      "Hard skin and callus removal at home in Bristol and Southampton. Thickened skin safely reduced by a qualified Foot Health Practitioner, with advice to slow build-up.",
    intro: "Thick, rough skin on heels and pressure points safely reduced, so walking is more comfortable.",
    about: [
      "Hard skin builds up where the foot takes regular pressure or rubbing, often on the heels and the balls of the feet. A callus is a broader patch of it in one area.",
      "It can feel rough, tight or uncomfortable in shoes. If the pressure continues, it gradually builds up again.",
    ],
    care: [
      "Thickened skin and callus reduced, where suitable",
      "A look at what may be causing the pressure, such as footwear",
      "A simple moisturising routine to slow it coming back",
    ],
    safety:
      "Hard skin with a wound, signs of infection, sudden colour change or an acute diabetic foot concern needs your GP or a podiatrist first.",
    faqs: [
      {
        question: "Is hard skin the same as a callus?",
        answer: "A callus is a type of hard skin, usually a more defined patch caused by repeated pressure or friction.",
      },
      {
        question: "Does it hurt?",
        answer: "It should be comfortable. Mention any tenderness and the care can be adapted.",
      },
      {
        question: "Why does it keep coming back?",
        answer:
          "The same pressure, footwear or dry skin keeps affecting the area. Regular moisturising, better-fitting shoes and routine visits help.",
      },
    ],
    guide: { label: "Hard skin on feet", href: "/advice/hard-skin-on-feet" },
    lastReviewed: "November 2026",
  },
  {
    slug: "cracked-heels",
    short: "Dry, split heels cared for",
    name: "Cracked heels",
    title: "Cracked heel treatment at home",
    metaTitle: "Cracked Heel Treatment at Home in Bristol and Southampton | Foot+",
    description:
      "Cracked heel treatment at home in Bristol and Southampton: hard skin reduced around dry, split heels, with a simple moisturising routine.",
    intro: "Care for dry, split heels, and a simple routine to keep them comfortable.",
    about: [
      "Heels crack when dry skin and hard skin build up and lose their stretch, then split under pressure. They can feel tight and sore when standing.",
      "Open-backed shoes, dry skin and pressure on the heel all make it more likely.",
    ],
    care: [
      "Hard skin around the cracks reduced, where suitable",
      "Heels checked for deeper splits that need more than routine care",
      "An easy moisturising routine to follow between visits",
    ],
    safety: "Deep cracks that bleed, look infected or don't heal need your GP or a podiatrist.",
    faqs: [
      {
        question: "Will one appointment fix cracked heels?",
        answer:
          "Some people improve quickly, but regular moisturising is usually needed to keep heels comfortable. Deep cracks may need medical advice too.",
      },
      {
        question: "Are cracked heels linked to hard skin?",
        answer: "Often, yes. Thick, dry heel skin loses its stretch and splits under pressure.",
      },
    ],
    lastReviewed: "November 2026",
  },
];

export function getTreatment(slug: string) {
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) throw new Error(`Missing treatment: ${slug}`);
  return treatment;
}

export const treatmentUrl = (slug: string) => `${SITE_URL}/${slug}`;
