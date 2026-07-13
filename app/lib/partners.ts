export type LocalPartner = {
  name: string;
  category: string;
  description: string;
  website: string;
  areasCovered?: string[];
  relationship: "referral-partner" | "recommended-service" | "community-partner";
  isPublished: boolean;
};

export const localPartners: LocalPartner[] = [
  {
    name: "Severn Physiotherapy",
    category: "Home physiotherapy and occupational therapy",
    description:
      "Home-visit physiotherapy and occupational therapy support for patients who may benefit from wider mobility or rehabilitation input.",
    website: "https://www.severnphysiotherapy.co.uk/",
    relationship: "referral-partner",
    isPublished: true,
  },
];

export const publishedLocalPartners = localPartners.filter((partner) => partner.isPublished);
