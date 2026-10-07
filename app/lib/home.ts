// Content for the home page. Copy here is reused from approved wording elsewhere
// on the site where possible. Keep it free of em dashes (house style).

export type HomeServiceIcon = "nail" | "thick" | "corn" | "skin" | "heel" | "check";

export const homeServices: {
  title: string;
  description: string;
  href: string;
  icon: HomeServiceIcon;
}[] = [
  {
    title: "Toenail cutting",
    description: "Safe, careful trimming when nails are hard to reach or manage at home.",
    href: "/toenail-cutting-bristol",
    icon: "nail",
  },
  {
    title: "Thickened nails",
    description: "Conservative reduction of thick or difficult nails, for comfort in shoes.",
    href: "/toenail-cutting-bristol#thickened-nails",
    icon: "thick",
  },
  {
    title: "Corns",
    description: "Gentle care for painful corns, with advice to help ease pressure.",
    href: "/corn-removal-bristol",
    icon: "corn",
  },
  {
    title: "Hard skin and callus",
    description: "Reducing built-up hard skin so walking feels more comfortable.",
    href: "/hard-skin-treatment-bristol",
    icon: "skin",
  },
  {
    title: "Cracked heels",
    description: "Care for dry, split heels and a simple routine to keep them soft.",
    href: "/cracked-heels-bristol",
    icon: "heel",
  },
  {
    title: "Foot-health checks",
    description: "Careful observations and onward guidance if something needs another service.",
    href: "/services",
    icon: "check",
  },
];

export const homeSteps = [
  {
    title: "Check your postcode",
    body: "See your local Foot+ service and practitioner.",
  },
  {
    title: "Request a visit",
    body: "Send a short request online or call. We confirm availability, timing and price.",
  },
  {
    title: "We come to you",
    body: "Your practitioner arrives with sterile instruments and everything needed.",
  },
];

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

export const homeFaqs = [
  {
    question: "Is a Foot Health Practitioner the same as a podiatrist?",
    answer:
      "No. Podiatrist and chiropodist are protected titles in the UK, regulated through HCPC registration. Foot+ practitioners are qualified Foot Health Practitioners who provide routine nail and skin care at home, and will explain when a concern needs a podiatrist or another service.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "Foot+ Bristol covers central, north, south and east Bristol, with nearby towns considered by request. Foot+ Southampton opens on 7 November 2026. Exact coverage is confirmed from the appointment postcode.",
  },
  {
    question: "Can a relative or carer book or attend the appointment?",
    answer:
      "Yes. A relative, carer or support worker can enquire, help coordinate the visit and be present, with appropriate consent from the person receiving care.",
  },
  {
    question: "Can a visit be adapted for anxiety or additional needs?",
    answer:
      "Yes. Tell us about any communication, sensory, mobility or anxiety-related needs when you get in touch, so the appointment can be planned at a comfortable pace.",
  },
  {
    question: "What if my concern needs podiatry or medical care?",
    answer:
      "Foot+ will explain when a concern appears outside routine foot-health scope and advise seeking an appropriate podiatry, GP, urgent or emergency service.",
  },
];
