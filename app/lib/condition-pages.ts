import { SITE_URL } from "./site";

export type ConditionPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  overview: string[];
  help: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
  related: { title: string; href: string }[];
};

export const conditionPages: ConditionPage[] = [
  {
    slug: "hard-skin-treatment-bristol",
    title: "Hard Skin Treatment in Bristol",
    metaTitle: "Hard Skin Treatment in Bristol",
    description:
      "Professional hard skin treatment in Bristol during Foot+ home visits, with careful reduction, prevention advice and practical aftercare.",
    intro:
      "Professional assessment and reduction of uncomfortable hard skin during a Foot+ home visit across Bristol.",
    overview: [
      "Hard skin is a thickened area of skin that often develops where the foot experiences regular pressure, rubbing or dryness. It is common around heels, the balls of the feet and other pressure points.",
      "It can feel rough, tight or uncomfortable in footwear. If the cause continues, hard skin may gradually build up again, so ongoing care and pressure management are often helpful.",
    ],
    help: [
      "During a foot health appointment, Foot+ can assess the area, reduce hard or thickened skin where appropriate and check for factors that may be contributing to discomfort.",
      "You will receive practical aftercare guidance, which may include moisturising routines, footwear advice and ways to reduce pressure between visits.",
    ],
    aftercare: ["Moisturise dry skin regularly, avoiding between the toes unless advised.", "Choose footwear that gives pressure points enough room.", "Arrange routine foot care if hard skin builds up quickly or affects comfort."],
    faqs: [
      { question: "Is hard skin the same as a callus?", answer: "Callus is a type of hard skin, usually linked to repeated pressure or friction in a more localised area." },
      { question: "Does professional hard skin removal hurt?", answer: "Reduction should be comfortable. Please mention any tenderness so care can be adapted during the appointment." },
      { question: "Why does hard skin come back?", answer: "It often returns when pressure, footwear fit, dry skin or walking patterns continue to affect the same area." },
      { question: "Can hard skin be treated at home?", answer: "Yes. Foot+ provides professional foot care in your home, including assessment, reduction and aftercare advice." },
    ],
    related: [
      { title: "Callus removal", href: "/callus-removal-bristol" },
      { title: "Corn treatment", href: "/corn-removal-bristol" },
      { title: "Cracked heel care", href: "/cracked-heels-bristol" },
    ],
  },
  {
    slug: "callus-removal-bristol",
    title: "Callus Removal in Bristol",
    metaTitle: "Callus Removal in Bristol | Home Visits",
    description:
      "Callus removal in Bristol with Foot+ home visits, including professional callus reduction, pressure advice and practical aftercare.",
    intro:
      "Careful reduction of localised callus caused by pressure or friction, provided during home visit foot care in Bristol.",
    overview: [
      "A callus is a localised area of thickened skin that forms as the foot protects itself from repeated pressure or rubbing. It is often found under the ball of the foot, around the heel or where footwear presses.",
      "Callus can return if the pressure point remains. Footwear shape, activity levels and the way weight is carried through the foot can all influence how quickly it builds up.",
    ],
    help: [
      "Foot+ can assess the callus, reduce thickened skin where suitable and talk through likely pressure sources. The aim is to improve comfort and help you manage build-up between appointments.",
      "If the area looks unusual, is very painful, or may need further assessment, you will be advised to seek appropriate medical support.",
    ],
    aftercare: ["Check footwear for seams, tight areas or worn soles.", "Use moisturiser to keep skin more supple.", "Consider regular routine appointments if callus quickly becomes uncomfortable."],
    faqs: [
      { question: "Why does callus keep coming back?", answer: "Callus often returns because pressure or friction continues in the same place. Reducing pressure can help slow build-up." },
      { question: "Is callus removal suitable during a home visit?", answer: "Yes, where appropriate it can be reduced during a Foot+ home visit foot health appointment." },
      { question: "Is a callus different from a corn?", answer: "A corn is usually smaller and more focused, while callus tends to be a broader patch of thickened skin. Assessment helps clarify this." },
    ],
    related: [
      { title: "Hard skin treatment", href: "/hard-skin-treatment-bristol" },
      { title: "Corn treatment", href: "/corn-removal-bristol" },
    ],
  },
  {
    slug: "corn-removal-bristol",
    title: "Corn Treatment in Bristol",
    metaTitle: "Corn Treatment in Bristol | Home Visits",
    description:
      "Corn treatment in Bristol from Foot+ home visits, with assessment, careful reduction and advice on pressure and footwear.",
    intro:
      "Assessment and professional foot care for painful areas that may be corns, provided in your Bristol home.",
    overview: [
      "Corns are small, concentrated areas of hard skin that can form where pressure is focused on one spot. They may feel like a sharp or tender point, especially in shoes or when walking.",
      "Not every painful area is definitely a corn, so assessment is important. Pressure from footwear, toe shape or activity can mean corns return unless the cause is managed.",
    ],
    help: [
      "Foot+ can assess the painful area, provide careful reduction where appropriate and explain how it differs from broader callus or other skin concerns.",
      "You may receive footwear and pressure-relief advice to support comfort after your appointment.",
    ],
    aftercare: ["Avoid cutting corns yourself, especially if you have diabetes or reduced sensation.", "Review footwear that rubs or squeezes toes.", "Book follow-up care if pressure pain returns."],
    faqs: [
      { question: "How do I know if I have a corn?", answer: "A corn often feels like a small focused pressure point, but assessment is needed because other problems can feel similar." },
      { question: "Can corns be reduced during a home visit?", answer: "Where appropriate, Foot+ can provide professional reduction and practical pressure advice at home." },
      { question: "What is the difference between a corn and callus?", answer: "Callus is usually broader thickened skin, while a corn is more concentrated and can feel sharper under pressure." },
    ],
    related: [
      { title: "Callus removal", href: "/callus-removal-bristol" },
      { title: "Routine foot care services", href: "/services" },
    ],
  },
  {
    slug: "cracked-heels-bristol",
    title: "Cracked Heel Treatment in Bristol",
    metaTitle: "Cracked Heel Treatment in Bristol",
    description:
      "Cracked heel treatment in Bristol with Foot+ home visits, including hard skin reduction, moisturising advice and aftercare guidance.",
    intro:
      "Home visit foot care for dry, uncomfortable or fissured heel skin across Bristol.",
    overview: [
      "Cracked heels can develop when dry skin and hard skin build up around the heel. The skin may split, feel tight or become uncomfortable when standing and walking.",
      "Some cracks are shallow, while deeper fissures may need additional medical advice, especially if there is bleeding, infection risk or an underlying health concern.",
    ],
    help: [
      "Foot+ can assess heel skin, reduce surrounding hard skin where suitable and provide practical moisturising and aftercare guidance.",
      "Routine care can support comfort and maintenance, but severe or complicated fissures may need medical support as well as foot care.",
    ],
    aftercare: ["Use an appropriate foot moisturiser consistently.", "Avoid open-backed footwear if it worsens heel pressure or dryness.", "Seek advice promptly if cracks bleed, weep or show signs of infection."],
    faqs: [
      { question: "Can cracked heels be treated during a home visit?", answer: "Yes, Foot+ can assess cracked heels and reduce surrounding hard skin where appropriate during a home visit." },
      { question: "Will one appointment fix cracked heels?", answer: "Some people improve quickly, but ongoing moisturising and pressure management are often needed. Severe fissures may need medical advice." },
      { question: "Are cracked heels linked to hard skin?", answer: "Often, yes. Thick, dry heel skin can lose flexibility and split under pressure." },
    ],
    related: [{ title: "Hard skin treatment", href: "/hard-skin-treatment-bristol" }],
  },
  {
    slug: "toenail-cutting-bristol",
    title: "Toenail Cutting Service in Bristol",
    metaTitle: "Toenail Cutting Service in Bristol | Home Visits",
    description:
      "Toenail cutting in Bristol with Foot+ home visits for difficult, thickened or awkward nails as part of professional foot and nail care.",
    intro:
      "Professional foot and nail care for people who find toenail cutting difficult, provided in your Bristol home.",
    overview: [
      "Toenails can become harder to manage because of thickness, shape, reduced mobility, eyesight changes or discomfort when reaching the feet.",
      "This service is professional foot and nail care rather than a cosmetic pedicure, with attention to comfort, safe trimming and practical maintenance advice.",
    ],
    help: [
      "Foot+ can trim and file toenails, reduce thickened nails where appropriate and check surrounding skin for pressure or irritation.",
      "Appointments can also include routine skin care when suitable, helping keep feet comfortable between visits.",
    ],
    aftercare: ["Avoid cutting nails too short or down the sides.", "Wear shoes with enough depth for thicker nails.", "Arrange routine care if nails become difficult to manage safely."],
    faqs: [
      { question: "Can you help with thick toenails?", answer: "Yes, thickened nails can often be reduced and trimmed as part of professional foot and nail care." },
      { question: "Is this a pedicure?", answer: "No. It is professional foot care focused on comfort, nail maintenance and foot health rather than cosmetic treatment." },
      { question: "How often should I arrange routine foot care?", answer: "Many people book every six to eight weeks, but the right interval depends on nail growth and comfort." },
    ],
    related: [
      { title: "Routine foot care services", href: "/services" },
      { title: "Foot Health Practitioner home visits", href: "/foot-health-practitioner-bristol" },
    ],
  },
  {
    slug: "foot-health-practitioner-bristol",
    title: "Foot Health Practitioner in Bristol",
    metaTitle: "Foot Health Practitioner in Bristol | Home Visits",
    description:
      "Foot+ provides Foot Health Practitioner home visits in Bristol for professional foot care, nail care, hard skin, callus, corns and routine appointments.",
    intro:
      "Professional foot care in your home from Foot+ Bristol, supporting comfort, mobility and routine foot health.",
    overview: [
      "A Foot Health Practitioner provides practical foot care, including nail care, hard skin and callus reduction, corn care where appropriate and routine checks during appointments.",
      "Home visits can help people who find it difficult to travel, prefer care at home or need regular maintenance to keep feet comfortable.",
    ],
    help: [
      "Foot+ appointments may include assessment, nail trimming, hard skin or callus reduction, diabetic foot checks and tailored advice based on your needs.",
      "You can discuss symptoms, footwear, moisturising routines and how often future care may be helpful.",
    ],
    aftercare: ["Keep a note of any changes in comfort, skin or nails between appointments.", "Follow moisturising and footwear advice given during your visit.", "Contact Foot+ if you are unsure which appointment type to book."],
    faqs: [
      { question: "Who may benefit from home visit foot care?", answer: "Adults who need help with nail care, hard skin, callus, corns or routine maintenance may benefit, especially if travel is difficult." },
      { question: "What services does Foot+ provide?", answer: "Foot+ provides new patient assessments, routine foot care, diabetic foot checks, nail care and skin care such as hard skin and callus reduction." },
      { question: "Do appointments take place at home?", answer: "Yes. Foot+ provides home visit foot care across the Bristol service areas listed on the website." },
    ],
    related: [
      { title: "Hard skin treatment", href: "/hard-skin-treatment-bristol" },
      { title: "Callus removal", href: "/callus-removal-bristol" },
      { title: "Corn treatment", href: "/corn-removal-bristol" },
      { title: "Cracked heel care", href: "/cracked-heels-bristol" },
      { title: "Toenail cutting", href: "/toenail-cutting-bristol" },
      { title: "Services", href: "/services" },
    ],
  },
];

export function getConditionPage(slug: string) {
  return conditionPages.find((page) => page.slug === slug);
}

export function canonicalFor(slug: string) {
  return `${SITE_URL}/${slug}`;
}
