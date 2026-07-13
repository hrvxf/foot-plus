export type LocalPartner = {
  name: string;
  category: string;
  description: string;
  website: string;
  phone?: string;
  email?: string;
  logo?: {
    src: string;
    alt: string;
  };
  areasCovered?: string[];
  relationship: "referral-partner" | "recommended-service" | "community-partner";
  isPublished: boolean;
};

export const localPartners: LocalPartner[] = [
  {
    name: "Severn Physiotherapy",
    category: "Home physiotherapy and occupational therapy",
    description:
      "Expert home-visit physiotherapy and occupational therapy for older adults across Bristol and nearby areas. Severn supports independence, mobility, falls prevention, neurological rehabilitation and recovery after illness or injury with practical, personalised care at home.",
    website: "https://www.severnphysiotherapy.co.uk/",
    phone: "01275 400466",
    email: "hello@severnphysiotherapy.co.uk",
    logo: {
      src: "/images/severn-physiotherapy-logo.svg",
      alt: "Severn Physiotherapy logo",
    },
    areasCovered: ["Bristol", "surrounding areas"],
    relationship: "referral-partner",
    isPublished: true,
  },
];

export const publishedLocalPartners = localPartners.filter((partner) => partner.isPublished);
