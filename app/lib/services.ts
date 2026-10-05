// Content for /services. Wording is drawn from approved copy on the treatment
// and location pages, summarised for this hub. House style: no em dashes.

import { prices } from "./site";

export type ServiceIconKey = "nail" | "thick" | "corn" | "callus" | "skin" | "heel" | "check";

export type ServiceDetail = {
  id: string;
  icon: ServiceIconKey;
  title: string;
  summary: string;
  helps: string[];
  goodToKnow: string;
  guide?: { label: string; href: string };
  advice?: { label: string; href: string };
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "toenail-cutting",
    icon: "nail",
    title: "Toenail cutting and routine nail care",
    summary:
      "Professional nail care for people who find cutting their toenails difficult, whether because of reach, eyesight, grip or flexibility.",
    helps: [
      "Toenails trimmed and filed to a comfortable, safer length",
      "Surrounding skin checked for pressure or irritation",
      "Routine skin care added where suitable",
    ],
    goodToKnow: "Regular appointments help keep nails manageable between visits.",
    guide: { label: "Toenail cutting in Bristol", href: "/toenail-cutting-bristol" },
    advice: { label: "How often should older adults have toenails cut?", href: "/advice/how-often-older-adults-should-cut-toenails" },
  },
  {
    id: "thickened-nails",
    icon: "thick",
    title: "Thickened or difficult nails",
    summary:
      "Conservative reduction of thick, ridged or awkward toenails that press into footwear or are hard to cut safely at home.",
    helps: [
      "Length and bulk reduced where appropriate",
      "Practical advice for comfort in shoes",
      "Guidance on when another assessment may be sensible",
    ],
    goodToKnow:
      "Routine nail care improves comfort but does not diagnose or treat every underlying cause, such as a fungal infection.",
    guide: { label: "Nail care in Bristol", href: "/toenail-cutting-bristol" },
    advice: { label: "Why do toenails become thick?", href: "/advice/why-toenails-become-thick" },
  },
  {
    id: "corns",
    icon: "corn",
    title: "Corns",
    summary:
      "Assessment and careful treatment for small, focused areas of hard skin that feel sharp or tender under pressure.",
    helps: [
      "The painful area assessed and reduced where appropriate",
      "An explanation of how it differs from callus or other skin concerns",
      "Footwear and pressure-relief advice",
    ],
    goodToKnow: "Please do not cut a corn out yourself, especially if you have diabetes or reduced sensation.",
    guide: { label: "Corn treatment in Bristol", href: "/corn-removal-bristol" },
    advice: { label: "Corn, callus or verruca?", href: "/advice/corn-callus-or-verruca" },
  },
  {
    id: "callus",
    icon: "callus",
    title: "Callus removal",
    summary:
      "Careful reduction of localised callus caused by repeated pressure or friction, often under the ball of the foot or around the toes.",
    helps: [
      "Thickened skin reduced where suitable",
      "Likely pressure sources talked through",
      "Ways to manage build-up between appointments",
    ],
    goodToKnow: "If an area looks unusual or is very painful, you will be advised to seek appropriate medical support.",
    guide: { label: "Callus removal in Bristol", href: "/callus-removal-bristol" },
    advice: { label: "Corn, callus or verruca?", href: "/advice/corn-callus-or-verruca" },
  },
  {
    id: "hard-skin",
    icon: "skin",
    title: "Hard skin treatment",
    summary:
      "Reduction of rough, thickened skin on heels, the balls of the feet and other pressure points that makes shoes and walking uncomfortable.",
    helps: [
      "Hard skin reduced where appropriate",
      "Contributing factors checked, such as footwear fit and dry skin",
      "Moisturising and pressure advice for between visits",
    ],
    goodToKnow: "Hard skin often returns while the same pressure continues, so routine care is usually the most effective approach.",
    guide: { label: "Hard skin treatment in Bristol", href: "/hard-skin-treatment-bristol" },
    advice: { label: "Hard skin on feet: causes and prevention", href: "/advice/hard-skin-on-feet" },
  },
  {
    id: "cracked-heels",
    icon: "heel",
    title: "Cracked heels",
    summary: "Care for dry, hard or split heel skin, with a simple routine to help keep heels comfortable.",
    helps: [
      "Heel skin assessed and surrounding hard skin reduced",
      "Practical moisturising and aftercare guidance",
      "Advice on footwear that supports heel comfort",
    ],
    goodToKnow: "Severe or complicated fissures may need medical support as well as routine foot care.",
    guide: { label: "Cracked heel care in Bristol", href: "/cracked-heels-bristol" },
    advice: { label: "Hard skin causes and prevention", href: "/advice/hard-skin-on-feet" },
  },
  {
    id: "foot-health-checks",
    icon: "check",
    title: "Foot-health checks",
    summary:
      "Skin, nail, circulation and sensation observations as part of your appointment, where clinically appropriate. Diabetic foot observations are included.",
    helps: [
      "Changes spotted early and explained clearly",
      "Practical everyday foot-care advice",
      "Signposting to a podiatrist, GP or other service when needed",
    ],
    goodToKnow: "Foot+ does not diagnose medical conditions or provide emergency care.",
    advice: { label: "How to maintain good foot health", href: "/advice/maintain-good-foot-health" },
  },
];

export const appointmentTypes = [
  {
    tag: "New to Foot+",
    title: "New patient appointment",
    price: prices[0].price,
    duration: "About 60 minutes",
    points: [
      "Medical and foot-health history",
      "Neurovascular assessment",
      "Treatment of nail and skin concerns",
      "Personalised care and aftercare advice",
    ],
    href: "/book",
    featured: true,
  },
  {
    tag: "Returning patients",
    title: "Routine appointment",
    price: prices[1].price,
    duration: "About 45 minutes",
    points: [
      "Routine nail and skin care",
      "Callus and hard-skin management",
      "Ongoing foot-health review",
      "Advice between appointments",
    ],
    href: "/book",
    featured: false,
  },
];

export const whoWeHelp = [
  "Older adults and people with reduced mobility",
  "People who find reaching their feet difficult",
  "Anyone who prefers care at home",
  "Relatives, carers or support workers arranging care",
];

export const adaptedCare = [
  "Additional time and clear explanations",
  "Carers, relatives and support workers welcome",
  "Communication, mobility and sensory needs considered",
];

export const referOnSigns = [
  "Wounds, ulcers or broken skin that is not healing",
  "Signs of infection, such as heat, spreading redness or discharge",
  "Sudden colour change, swelling or severe pain",
  "Acute diabetic foot concerns",
];

export const servicesFaqs = [
  {
    question: "Is a Foot Health Practitioner the same as a podiatrist?",
    answer:
      "No. Podiatrist and chiropodist are protected titles in the UK, regulated through HCPC registration. Foot+ practitioners are qualified Foot Health Practitioners who provide routine nail and skin care at home, and will explain when a concern needs a podiatrist or another service.",
  },
  {
    question: "How much does a home visit cost?",
    answer: `A new patient appointment is ${prices[0].price} and a routine appointment is ${prices[1].price}. Travel within central Bristol is included; any wider-area supplement is confirmed before booking.`,
  },
  {
    question: "Can a carer or relative attend?",
    answer:
      "Yes. A relative, carer or support worker is welcome when this helps the patient feel comfortable or supports communication and practical arrangements.",
  },
  {
    question: "Can a visit be adapted for anxiety or additional needs?",
    answer:
      "Yes. Tell us about relevant communication, sensory, mobility or anxiety-related needs when enquiring so the appointment can be planned at an appropriate pace.",
  },
  {
    question: "What if my concern needs podiatry or medical care?",
    answer:
      "Foot+ will explain when a concern appears outside routine foot-health scope and advise seeking an appropriate podiatry, GP, urgent or emergency service.",
  },
];
