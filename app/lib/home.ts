// Content for the home page. Copy here is reused from approved wording elsewhere
// on the site where possible. Keep it free of em dashes (house style).

export const homeServices: {
  title: string;
  description: string;
  /** Location-neutral: each row links to its entry on the services page. */
  href: string;
}[] = [
  {
    title: "Toenail cutting",
    description: "When nails are hard to reach or manage yourself.",
    href: "/services#toenail-cutting",
  },
  {
    title: "Thickened nails",
    description: "Reduced so shoes are comfortable again.",
    href: "/services#thickened-nails",
  },
  {
    title: "Corns",
    description: "Gentle care, with advice on easing the pressure.",
    href: "/services#corns",
  },
  {
    title: "Hard skin and callus",
    description: "Built-up skin reduced so walking is more comfortable.",
    href: "/services#hard-skin",
  },
  {
    title: "Cracked heels",
    description: "Care for dry, split heels and a simple routine to follow.",
    href: "/services#cracked-heels",
  },
  {
    title: "Diabetic foot care",
    description: "Routine nail and skin care, with diabetic foot observations included.",
    href: "/services#foot-health-checks",
  },
];

export const homeScopeNote =
  "Foot Health Practitioners provide routine nail and skin care. They are not podiatrists. If something needs a podiatrist or your GP, we will tell you.";

export const homeSteps = [
  {
    title: "Check the postcode",
    body: "You\u2019ll see your practitioner and any travel fee.",
  },
  {
    title: "Send a short request, or call",
    body: "We usually reply within 24 hours, by WhatsApp or email, to confirm the day, time and price.",
  },
  {
    title: "We come to you",
    body: "Your practitioner brings sterilised instruments and everything needed.",
  },
];

/** One sentence each for the proof line under the home page hero. */
export const homeCredentials =
  "Every practitioner is diploma-trained, insured and DBS checked.";
export const homeMemberships =
  "Members of the College of Foot Health Practitioners and the Association of Foot Health Practitioners.";

export const homeStandards = [
  {
    title: "Qualified practitioners",
    body: "Diploma-trained Foot Health Practitioners and members of professional bodies.",
  },
  {
    title: "Sterile instruments",
    body: "Clean, sterilised instruments for every appointment.",
  },
  {
    title: "Insured and DBS checked",
    body: "Full professional insurance and background checks.",
  },
  {
    title: "Inclusive by default",
    body: "LGBTQ+ friendly, unhurried and respectful of personal choice.",
  },
];

// Rendered on the home page and in its FAQPage schema, so keep the two in step
// by editing only here. "Which areas do you cover?" is answered by the postcode
// checker and lives on the location pages.
export const homeFaqs = [
  {
    question: "Is a Foot Health Practitioner the same as a podiatrist?",
    answer:
      "No. Podiatrist and chiropodist are protected titles in the UK, regulated through HCPC registration. Foot+ practitioners are qualified Foot Health Practitioners who provide routine nail and skin care at home, and will tell you if a concern needs a podiatrist, your GP, or an urgent or emergency service.",
  },
  {
    question: "Can I book for a relative or someone I care for?",
    answer:
      "Yes. A relative, carer or support worker can enquire, help coordinate the visit and be present, with appropriate consent from the person receiving care.",
  },
  {
    question: "Can a visit be adapted for anxiety or additional needs?",
    answer:
      "Yes. Tell us about any communication, sensory, mobility or anxiety-related needs when you get in touch, so the appointment can be planned at a comfortable pace.",
  },
];
