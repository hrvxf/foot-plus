export type Practitioner = {
  name: string;
  role: string;
  credentials: string[];
  imageSrc: string;
  imageAlt: string;
  bio: string[];
};

export type ServiceLocation = {
  slug: "bristol" | "southampton";
  name: string;
  displayName: string;
  status: "open" | "launching";
  launchDate?: string;
  /** Short availability line, as shown beside the practitioner. */
  availability: string;
  /** One-sentence summary of the area visited. Exact coverage comes from the postcode. */
  coverage: string;
  href: string;
  practitioner?: Practitioner;
};

export const serviceLocations: Record<ServiceLocation["slug"], ServiceLocation> = {
  bristol: {
    slug: "bristol",
    name: "Bristol",
    displayName: "Foot+ Bristol",
    status: "open",
    availability: "Taking new patients",
    coverage: "Central, north, south and east Bristol.",
    href: "/locations/bristol",
    practitioner: {
      name: "Adam James",
      role: "Foot Health Practitioner",
      credentials: ["BA (Hons)", "Dip FH", "MCFHP", "MAFHP"],
      imageSrc: "/images/Adam-James.svg",
      imageAlt: "Portrait of Adam James, Foot+ Bristol foot health practitioner.",
      bio: [
        "Adam has over six years’ experience working in healthcare and rehabilitation, supporting people to regain confidence, mobility and independence.",
        "As a fully trained Foot Health Practitioner, Adam offers a friendly, relaxed service built on trust, clear communication and achievable outcomes.",
        "Adam is fully insured and professionally recognised as a member of the College of Foot Health Practitioners and the Association of Foot Health Practitioners.",
      ],
    },
  },
  southampton: {
    slug: "southampton",
    name: "Southampton",
    displayName: "Foot+ Southampton",
    status: "open",
    availability: "Appointments available now",
    // From the Foot+ Southampton Google Business Profile service area.
    coverage: "Southampton and nearby, including Romsey, Chandler's Ford, North Baddesley and Totton.",
    href: "/locations/southampton",
    practitioner: {
      name: "Katie Preston",
      role: "Foot Health Practitioner",
      credentials: ["BSc", "Dip FH", "MCFHP", "MAFHP"],
      imageSrc: "/images/katie.jpeg",
      imageAlt: "Portrait of Katie Preston, Foot+ Southampton foot health practitioner.",
      bio: [],
    },
  },
};
