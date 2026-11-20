// Content for the About page. No em dashes (house style).

/**
 * Why Adam started Foot+, in his own words, one string per paragraph.
 * The "Why Foot+" section on /about stays hidden while this is empty.
 * TODO(Adam): add two or three sentences.
 */
export const founderStory: string[] = [];

/** The letters after the practitioners' names, explained. */
export const qualificationTerms = [
  { term: "Dip FH", meaning: "Diploma in Foot Health" },
  { term: "MCFHP", meaning: "Member of the College of Foot Health Practitioners" },
  { term: "MAFHP", meaning: "Member of the Association of Foot Health Practitioners" },
];

/** Routine care within a Foot Health Practitioner's scope. */
export const withinScope = [
  "Toenail cutting",
  "Reducing thickened nails, where suitable",
  "Ingrown toenail care, without surgery",
  "Fungal nail care",
  "Hard skin and callus care",
  "Corn care",
  "Cracked heel care",
  "Verruca care",
  "Athlete’s foot care",
];

/** Concerns that need another service. */
export const outsideScope = [
  "Anything needing a diagnosis",
  "Complex treatment or nail surgery",
  "Wounds, infection or urgent problems",
];

/** Every set of letters after a practitioner's name, for the tap-to-explain chips on /about. */
export const credentialMeanings: Record<string, string> = {
  "BA (Hons)": "Bachelor of Arts degree, with honours",
  BSc: "Bachelor of Science degree",
  ...Object.fromEntries(qualificationTerms.map((item) => [item.term, item.meaning])),
};
