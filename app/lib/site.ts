export const SITE_URL = "https://foot-plus.co.uk";
export const BUSINESS_ID = `${SITE_URL}/#medicalbusiness`;

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
