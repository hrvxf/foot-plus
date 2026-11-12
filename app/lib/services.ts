// Content for /services. Wording is drawn from approved copy on the treatment
// and location pages, summarised for this hub. House style: no em dashes.
//
// Kept deliberately short: the detail for each treatment lives on its own page,
// and safety, pricing and adapted-visit information each appear once on this page.

import { prices } from "./site";

export type ServiceIconKey = "nail" | "thick" | "corn" | "callus" | "skin" | "heel" | "check";

export type ServiceDetail = {
  id: string;
  icon: ServiceIconKey;
  title: string;
  summary: string;
  link: { label: string; href: string };
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "toenail-cutting",
    icon: "nail",
    title: "Toenail cutting and routine nail care",
    summary: "Nails trimmed and filed to a comfortable length, for anyone who finds reaching or cutting them difficult.",
    link: { label: "Toenail cutting", href: "/toenail-cutting" },
  },
  {
    id: "thickened-nails",
    icon: "thick",
    title: "Thickened or difficult nails",
    summary: "Thick or ridged nails carefully reduced so they are easier to manage and more comfortable in shoes.",
    link: { label: "Thickened nail care", href: "/toenail-cutting" },
  },
  {
    id: "corns",
    icon: "corn",
    title: "Corns",
    summary: "Sharp, tender spots of hard skin assessed and reduced, with advice on easing the pressure behind them.",
    link: { label: "Corn treatment", href: "/corn-treatment" },
  },
  {
    id: "hard-skin",
    icon: "skin",
    title: "Hard skin and callus",
    summary: "Rough skin and callus on heels and pressure points safely reduced, with simple tips to slow it coming back.",
    link: { label: "Hard skin and callus removal", href: "/hard-skin-and-callus" },
  },
  {
    id: "cracked-heels",
    icon: "heel",
    title: "Cracked heels",
    summary: "Dry, split heel skin treated, plus an easy moisturising routine to keep heels comfortable.",
    link: { label: "Cracked heel care", href: "/cracked-heels" },
  },
  {
    id: "foot-health-checks",
    icon: "check",
    title: "Foot-health checks",
    summary: "Skin, nails, circulation and sensation checked at every visit, including diabetic foot observations.",
    link: { label: "Keeping feet healthy", href: "/advice/maintain-good-foot-health" },
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
      "Personalised aftercare advice",
    ],
    href: "/book",
    featured: true,
  },
  {
    tag: "Returning patients",
    title: "Routine appointment",
    price: prices[1].price,
    duration: "About 45 minutes",
    points: ["Routine nail and skin care", "Ongoing foot-health review", "Advice between appointments"],
    href: "/book",
    featured: false,
  },
];

export const whoWeHelp = [
  "Older adults and people with reduced mobility",
  "Anyone who finds reaching their feet difficult",
  "Relatives, carers and support workers arranging care",
];

export const referOnSigns = [
  "Wounds, ulcers or broken skin that is not healing",
  "Signs of infection, such as heat, spreading redness or discharge",
  "Sudden colour change, swelling or severe pain",
  "Acute diabetic foot concerns",
];
