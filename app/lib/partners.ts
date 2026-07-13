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
      "A home-visit physiotherapy and occupational therapy service. Foot+ Bristol and Severn Physiotherapy may refer patients between services where appropriate and with patient consent.",
    website: "https://severnphysiotherapy.co.uk",
    relationship: "referral-partner",
    isPublished: true,
  },
];

export const publishedLocalPartners = localPartners.filter((partner) => partner.isPublished);
