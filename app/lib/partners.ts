export type PartnerLocation = "bristol" | "southampton";

/** The kind of help a partner offers. The partners page groups and filters by these, in this order. */
export const partnerGroups = ["Mobility & physio", "Home care", "Community", "Wellbeing"] as const;
export type PartnerGroup = (typeof partnerGroups)[number];

export type LocalPartner = {
  /** URL-safe id, used as the card's anchor on /partners. */
  slug: string;
  name: string;
  /** Which location page and filter the partner appears under. */
  location: PartnerLocation;
  group: PartnerGroup;
  /** One short line for the card. */
  summary: string;
  /** Shown under the name, e.g. "Bristol and surrounding areas". */
  area: string;
  website: string;
  phone?: string;
  email?: string;
  logo?: {
    src: string;
    alt: string;
  };
  relationship: "referral-partner" | "recommended-service" | "community-partner";
  isPublished: boolean;
};

export const localPartners: LocalPartner[] = [
  {
    slug: "severn-physiotherapy",
    name: "Severn Physiotherapy",
    location: "bristol",
    group: "Mobility & physio",
    summary: "Home physio and OT for mobility, falls prevention and rehab.",
    area: "Bristol and surrounding areas",
    website: "https://www.severnphysiotherapy.co.uk/",
    phone: "01275 400466",
    email: "hello@severnphysiotherapy.co.uk",
    logo: {
      src: "/images/SevernPhysiotherapy.png",
      alt: "Severn Physiotherapy logo",
    },
    relationship: "referral-partner",
    isPublished: true,
  },
];

export const publishedLocalPartners = localPartners.filter((partner) => partner.isPublished);

export function partnersFor(location: PartnerLocation) {
  return publishedLocalPartners.filter((partner) => partner.location === location);
}
