export const SITE_URL = "https://foot-plus.co.uk";
export const BUSINESS_ID = `${SITE_URL}/#organization`;
export const BRISTOL_BUSINESS_ID = `${SITE_URL}/locations/bristol#medicalbusiness`;
export const ADAM_ID = `${SITE_URL}/about#adam-james`;
export const SOUTHAMPTON_BUSINESS_ID = `${SITE_URL}/locations/southampton#medicalbusiness`;
export const KATIE_ID = `${SITE_URL}/about#katie-preston`;

// Advice pages share one stable, absolute social image so link unfurls are consistent.
export const ADVICE_SOCIAL_IMAGE = `${SITE_URL}/foot-plus-advice-social-preview.png`;
export const ADVICE_SOCIAL_IMAGE_ALT = "Foot+ Bristol Advice";
export const ADVICE_SOCIAL_IMAGE_METADATA = {
  url: ADVICE_SOCIAL_IMAGE,
  width: 1200,
  height: 630,
  alt: ADVICE_SOCIAL_IMAGE_ALT,
};

export const bookingHref = "/book";
export const phoneDisplay = "07380 301555";
export const phoneHref = "tel:+447380301555";

/** Each location has its own number. Bristol's is also the general Foot+ number above. */
export const locationPhones = {
  bristol: { display: phoneDisplay, href: phoneHref, e164: "+447380301555" },
  southampton: { display: "07564 614967", href: "tel:+447564614967", e164: "+447564614967" },
} as const;

/** Southampton pages (location pages and town-specific service pages) get Katie's number; everything else gets the general one. */
export type PhoneLocation = keyof typeof locationPhones;

/** Which location a page belongs to, or null for shared pages (home, services, prices…) that serve both. */
export function phoneLocationForPath(pathname: string | null): PhoneLocation | null {
  for (const slug of ["bristol", "southampton"] as const) {
    if (pathname?.startsWith(`/locations/${slug}`) || pathname?.endsWith(`-${slug}`) || pathname === `/card/${slug}`) return slug;
  }
  return null;
}

export function phoneForPath(pathname: string | null) {
  if (pathname?.startsWith("/locations/southampton") || pathname?.endsWith("-southampton") || pathname === "/card/southampton") {
    return locationPhones.southampton;
  }
  return locationPhones.bristol;
}
export const emailDisplay = "hello@foot-plus.co.uk";
export const emailHref = `mailto:${emailDisplay}`;

/** Each location has its own inbox. Its location pages and town-specific service pages use it instead of the general one. */
export const locationEmails = {
  bristol: { display: "bristol@foot-plus.co.uk", href: "mailto:bristol@foot-plus.co.uk", label: "Email Foot+ Bristol", heading: "Bristol enquiries" },
  southampton: { display: "southampton@foot-plus.co.uk", href: "mailto:southampton@foot-plus.co.uk", label: "Email Foot+ Southampton", heading: "Southampton enquiries" },
} as const;

export function emailForPath(pathname: string | null) {
  // Location pages, plus town-specific service pages such as /toenail-cutting-bristol.
  if (pathname?.startsWith("/locations/bristol") || pathname?.endsWith("-bristol")) return locationEmails.bristol;
  if (pathname?.startsWith("/locations/southampton") || pathname?.endsWith("-southampton")) return locationEmails.southampton;
  return { display: emailDisplay, href: emailHref, label: "Email Foot+", heading: "General enquiries" };
}
export const bristolWhatsAppHref = `https://wa.me/447380301555?text=${encodeURIComponent("Hi Adam, I’d like to enquire about a Foot+ Bristol appointment.")}`;

/** Place names shown on the location pages' coverage wall. */
export const coveragePlaces = {
  bristol: [
    "City Centre", "Harbourside", "Clifton", "Hotwells", "Redland", "Cotham", "Stokes Croft", "Bishopston", "Horfield",
    "Ashley Down", "Filton", "Henleaze", "Westbury-on-Trym", "Bedminster", "Southville", "Knowle", "Brislington",
    "Totterdown", "Fishponds", "Stoke Gifford", "Kingswood", "Keynsham",
  ],
  // From the Foot+ Southampton Google Business Profile service area.
  southampton: [
    "Bassett", "Shirley", "Bitterne", "Lordshill", "Lordswood", "Maybush", "Millbrook", "Portswood", "Swaythling",
    "Nursling", "Rownhams", "Chilworth", "North Baddesley", "Romsey", "Chandler’s Ford", "Totton", "Eling",
  ],
};

export const serviceAreas = [
  {
    region: "Central Bristol",
    places:
      "City Centre, Harbourside, Clifton, Hotwells, Redland, Cotham, and Stokes Croft.",
  },
  {
    region: "North Bristol",
    places:
      "Bishopston, Horfield, Ashley Down, Filton, Henleaze, and Westbury-on-Trym.",
  },
  {
    region: "South Bristol",
    places: "Bedminster, Southville, Knowle, Brislington, and Totterdown.",
  },
  {
    region: "Surrounding areas",
    places:
      "Fishponds, Stoke Gifford, Kingswood, Keynsham, and nearby towns by request.",
  },
];

export const prices = [
  {
    name: "New Patient Appointment",
    price: "£60",
    description:
      "An initial appointment covering relevant health information, foot-health observations and appropriate routine treatment.",
  },
  {
    name: "Routine Appointment (45 minutes)",
    price: "£55",
    description:
      "An ongoing treatment appointment focused on maintaining foot health, comfort, and mobility.",
  },
];

export const paymentMethods = ["cash", "card", "cheque", "bank transfer"];
