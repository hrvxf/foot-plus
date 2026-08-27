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
  practitioner?: Practitioner;
};

export const serviceLocations: Record<ServiceLocation["slug"], ServiceLocation> = {
  bristol: {
    slug: "bristol",
    name: "Bristol",
    displayName: "Foot+ Bristol",
    status: "open",
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
    status: "launching",
    launchDate: "20 October 2026",
    // Add the Southampton practitioner here once their approved name, credentials,
    // portrait and biography are available. The public page hides the profile until
    // the complete practitioner object is supplied.
  },
};
