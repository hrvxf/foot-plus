export const SITE_URL = "https://foot-plus.co.uk";
export const BUSINESS_ID = `${SITE_URL}/#organization`;
export const BRISTOL_BUSINESS_ID = `${SITE_URL}/locations/bristol#medicalbusiness`;
export const ADAM_ID = `${SITE_URL}/about#adam-james`;

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
export const emailDisplay = "hello@foot-plus.co.uk";
export const emailHref = `mailto:${emailDisplay}`;

/** Each location has its own inbox. Pages under /locations/<slug> use it instead of the general one. */
export const locationEmails = {
  bristol: { display: "bristol@foot-plus.co.uk", href: "mailto:bristol@foot-plus.co.uk", label: "Email Foot+ Bristol", heading: "Bristol enquiries" },
  southampton: { display: "southampton@foot-plus.co.uk", href: "mailto:southampton@foot-plus.co.uk", label: "Email Foot+ Southampton", heading: "Southampton enquiries" },
} as const;

export function emailForPath(pathname: string | null) {
  if (pathname?.startsWith("/locations/bristol")) return locationEmails.bristol;
  if (pathname?.startsWith("/locations/southampton")) return locationEmails.southampton;
  return { display: emailDisplay, href: emailHref, label: "Email Foot+", heading: "General enquiries" };
}
export const bristolWhatsAppHref = `https://wa.me/447380301555?text=${encodeURIComponent("Hi Adam, I’d like to enquire about a Foot+ Bristol appointment.")}`;

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
