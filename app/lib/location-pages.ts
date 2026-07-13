import { SITE_URL } from "./site";

export type LocationRegion = "north-west" | "central" | "east" | "south";

export type LocationPage = {
  slug: string;
  area: string;
  hubDescription?: string;
  nearby: { title: string; href: string }[];
  title: string;
  description: string;
  intro: string;
  local: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  /** Region used by the /areas-we-cover hub for grouping links. */
  region: LocationRegion;
  /** Geographic centre used by the interactive Bristol coverage map. */
  mapCoordinates: { lat: number; lng: number };
  /** Fallback label position as percentages for non-map visual treatments. */
  mapPosition: { x: number; y: number };
  /** Preferred label direction for the illustrative coverage map. */
  mapLabelPosition?: "left" | "right" | "above" | "below";
};

export const locationPages: LocationPage[] = [
  {
    slug: "foot-health-practitioner-clifton",
    mapCoordinates: { lat: 51.4619, lng: -2.619 },
    area: "Clifton",
    region: "central",
    mapPosition: { x: 33, y: 43 },
    mapLabelPosition: "left",
    title: "Foot Health Practitioner in Clifton, Bristol",
    intro:
      "Professional home-visit foot care in Clifton, provided in the comfort of your own home.",
    description:
      "Foot+ provides professional foot care at home in Clifton for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Clifton, Bristol",
    metaDescription:
      "Professional home-visit foot care in Clifton, Bristol. Foot+ provides routine nail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home visits across Clifton, including Clifton Village, Clifton Down and surrounding streets near Whiteladies Road and Pembroke Road.",
      "Appointments take place in your home, so you do not need to travel across Clifton or arrange clinic parking for routine foot care.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Redland",
        href: "/foot-health-practitioner-redland",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Clifton?",
        answer:
          "Foot+ covers Clifton and surrounding parts of Bristol. Please include your postcode when enquiring so current availability can be confirmed.",
      },
      {
        question: "Can I book directly without a referral?",
        answer:
          "Yes. You can request a home-visit foot health appointment directly through Foot+ using the booking enquiry page.",
      },
      {
        question: "Can you help with hard skin and corns at home?",
        answer:
          "Where appropriate, Foot+ can reduce hard skin, callus and corns during a home visit and provide pressure and aftercare advice.",
      },
      {
        question: "What should I prepare before an appointment in Clifton?",
        answer:
          "Please have a comfortable chair, good lighting where possible, and any relevant medical or medication information available.",
      },
      {
        question: "Can family members arrange an appointment?",
        answer:
          "Family members can help submit an enquiry, but Foot+ will still need suitable appointment details and consent from the person receiving care.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-redland",
    mapCoordinates: { lat: 51.4683, lng: -2.6018 },
    area: "Redland",
    region: "central",
    mapPosition: { x: 43, y: 32 },
    mapLabelPosition: "above",
    title: "Foot Health Practitioner in Redland, Bristol",
    intro:
      "Professional home-visit foot care in Redland for patients who prefer practical care at home.",
    description:
      "Foot+ provides home-visit foot care across Redland, helping with routine nail care, hard skin, callus, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Redland, Bristol",
    metaDescription:
      "Home-visit foot care in Redland, Bristol for routine foot care, toenail cutting, hard skin reduction, corn care and diabetic foot checks.",
    local: [
      "Home visits are available throughout Redland, including areas around Redland Green, Chandos Road, Cranbrook Road and nearby residential streets.",
      "This can be useful if getting to an appointment around Redland Road or Zetland Road would be difficult, or if you simply prefer care in familiar surroundings.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
      {
        title: "Foot health appointments in Bishopston",
        href: "/foot-health-practitioner-bishopston",
      },
    ],
    faqs: [
      {
        question: "Which parts of Redland do you cover?",
        answer:
          "Foot+ provides home visits in Redland and nearby Bristol areas. Send your postcode when enquiring so availability can be checked.",
      },
      {
        question: "Do I need to know which service to choose?",
        answer:
          "No. Share your main concerns on the enquiry form and Foot+ can confirm whether a new patient or routine appointment is most suitable.",
      },
      {
        question: "Can you help if toenails are difficult to cut?",
        answer:
          "Yes. Toenail cutting and nail care are part of Foot+ routine foot care, including help with thickened or awkward nails where appropriate.",
      },
      {
        question: "Do you provide diabetic foot checks in Redland?",
        answer:
          "Yes. Diabetic foot checks are listed as a Foot+ service and can be included where appropriate during home-visit care.",
      },
      {
        question: "How long is a routine appointment?",
        answer:
          "The current routine appointment listed by Foot+ is 45 minutes. New patient appointments allow time for a fuller assessment.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-cotham",
    mapCoordinates: { lat: 51.4629, lng: -2.5952 },
    area: "Cotham",
    region: "central",
    mapPosition: { x: 50, y: 39 },
    mapLabelPosition: "above",
    hubDescription:
      "Professional home-visit foot care in Cotham for convenient foot and nail care at home.",
    title: "Foot Health Practitioner in Cotham, Bristol",
    intro:
      "Professional home-visit foot care in Cotham for patients who prefer convenient foot and nail care at home.",
    description:
      "Foot+ provides professional foot care at home in Cotham for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Cotham, Bristol",
    metaDescription:
      "Professional home-visit foot care in Cotham, Bristol, including routine nail care, hard skin and callus reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home-visit appointments across Cotham, including residential streets around Cotham Hill, Cotham Brow, Hampton Road and nearby parts of Kingsdown.",
      "Cotham is included in the existing Central Bristol service-area wording, but appointment availability still depends on travel arrangements, so please contact Foot+ with your postcode to confirm current home-visit availability.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
      {
        title: "Foot health appointments in Redland",
        href: "/foot-health-practitioner-redland",
      },
      {
        title: "Foot health appointments in Bishopston",
        href: "/foot-health-practitioner-bishopston",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Cotham?",
        answer:
          "Foot+ provides home visits in Cotham and nearby Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can I book without a referral?",
        answer:
          "Yes. You can request a home-visit foot health appointment directly through Foot+ using the booking enquiry page.",
      },
      {
        question: "Can you help with hard skin and calluses at home?",
        answer:
          "Where appropriate, Foot+ can reduce hard skin and callus during a home visit and provide practical aftercare advice.",
      },
      {
        question: "Can you cut thick or difficult toenails?",
        answer:
          "Yes. Toenail cutting and nail care are part of routine foot care, including support with thickened or awkward nails where suitable.",
      },
      {
        question: "What should I prepare before an appointment in Cotham?",
        answer:
          "Please have a comfortable chair, good lighting if possible, and any relevant medical or medication information available.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-bishopston",
    mapCoordinates: { lat: 51.475, lng: -2.5896 },
    area: "Bishopston",
    region: "north-west",
    mapPosition: { x: 53, y: 22 },
    mapLabelPosition: "right",
    title: "Foot Health Practitioner in Bishopston, Bristol",
    intro:
      "Home-visit foot care in Bishopston, with professional support for routine foot and nail concerns.",
    description:
      "Foot+ provides professional foot health appointments at home in Bishopston for routine care, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Bishopston, Bristol",
    metaDescription:
      "Professional home-visit foot care in Bishopston, Bristol, including toenail cutting, routine foot care, hard skin reduction and diabetic foot checks.",
    local: [
      "Foot+ provides appointments across Bishopston, including residential areas around Gloucester Road, Bishop Road and Ashley Down.",
      "A home visit can avoid the need to travel along busy local routes when you need routine foot care, nail care or help with uncomfortable skin build-up.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Redland",
        href: "/foot-health-practitioner-redland",
      },
      {
        title: "Foot health appointments in Henleaze",
        href: "/foot-health-practitioner-henleaze",
      },
    ],
    faqs: [
      {
        question: "Do you offer home foot care around Gloucester Road?",
        answer:
          "Foot+ provides Bishopston home visits, including residential streets around Gloucester Road. Please provide your postcode to confirm current availability.",
      },
      {
        question: "What foot problems can you help with?",
        answer:
          "Foot+ helps with routine foot care, toenail cutting, thickened nails, hard skin, callus, corns, cracked heels and diabetic foot checks.",
      },
      {
        question: "Is this a cosmetic pedicure?",
        answer:
          "No. Foot+ provides professional foot care focused on comfort, nail maintenance and foot health rather than cosmetic pedicure treatments.",
      },
      {
        question: "Can I ask about footwear or moisturising?",
        answer:
          "Yes. Appointments may include practical aftercare advice, including footwear, moisturising or pressure management where relevant.",
      },
      {
        question: "Are nearby areas covered too?",
        answer:
          "Foot+ covers selected Bristol areas nearby, including Redland and Henleaze. Contact Foot+ with your postcode for confirmation.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-henleaze",
    mapCoordinates: { lat: 51.4893, lng: -2.609 },
    area: "Henleaze",
    region: "north-west",
    mapPosition: { x: 35, y: 19 },
    mapLabelPosition: "above",
    title: "Foot Health Practitioner in Henleaze, Bristol",
    intro:
      "Professional home-visit foot care in Henleaze for comfortable, practical support at home.",
    description:
      "Foot+ provides home foot health appointments in Henleaze for nail care, routine maintenance, hard skin, callus, corn care and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Henleaze, Bristol",
    metaDescription:
      "Home-visit foot care in Henleaze, Bristol. Foot+ helps with routine nail care, hard skin, callus, corn care, cracked heels and diabetic foot checks.",
    local: [
      "Home visits are available across Henleaze, including areas near Henleaze Road, North View, Wellington Hill and surrounding residential streets.",
      "Foot+ travels to you, which can make appointments easier if reaching your feet is difficult or if leaving home for routine care is inconvenient.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Bishopston",
        href: "/foot-health-practitioner-bishopston",
      },
      {
        title: "Foot health appointments in Westbury-on-Trym",
        href: "/foot-health-practitioner-westbury-on-trym",
      },
    ],
    faqs: [
      {
        question: "Do you provide appointments across Henleaze?",
        answer:
          "Foot+ provides home visits in Henleaze and selected nearby Bristol areas. Use the enquiry form and include your postcode.",
      },
      {
        question: "Can you treat cracked heels during a home visit?",
        answer:
          "Foot+ can assess cracked heel skin, reduce surrounding hard skin where suitable and provide moisturising and aftercare guidance.",
      },
      {
        question: "Can busy patients book home foot care?",
        answer:
          "Yes. Home visits are not only for older or disabled patients; they can also suit people who prefer care at home.",
      },
      {
        question: "What happens at a first appointment?",
        answer:
          "A new patient appointment includes time to discuss your history and concerns, assess your feet and provide appropriate foot care and advice.",
      },
      {
        question: "Can you help with ongoing maintenance?",
        answer:
          "Yes. Routine appointments focus on maintaining comfort, mobility and skin and nail health between visits.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-westbury-on-trym",
    mapCoordinates: { lat: 51.4935, lng: -2.6194 },
    area: "Westbury-on-Trym",
    region: "north-west",
    mapPosition: { x: 24, y: 18 },
    mapLabelPosition: "left",
    title: "Foot Health Practitioner in Westbury-on-Trym",
    intro:
      "Professional home-visit foot care in Westbury-on-Trym, delivered in the comfort of your home.",
    description:
      "Foot+ provides home-visit foot care in Westbury-on-Trym, supporting routine nail care, hard skin, callus, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Westbury-on-Trym",
    metaDescription:
      "Professional home-visit foot care in Westbury-on-Trym, including routine nail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home-visit appointments throughout Westbury-on-Trym, including Westbury Village and residential areas around Stoke Lane, Canford Lane and Falcondale Road.",
      "Appointments are arranged by location and availability, so please include your postcode when enquiring from Westbury-on-Trym.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Henleaze",
        href: "/foot-health-practitioner-henleaze",
      },
    ],
    faqs: [
      {
        question: "Do you cover Westbury Village and nearby streets?",
        answer:
          "Foot+ provides home visits in Westbury-on-Trym, including local residential areas. Exact availability can be confirmed from your postcode.",
      },
      {
        question: "Can you help with painful hard skin?",
        answer:
          "Yes. Foot+ can provide hard skin and callus reduction where appropriate, with practical advice to support comfort between appointments.",
      },
      {
        question: "Can someone else be present during the visit?",
        answer:
          "If the patient is comfortable with this, a family member or carer may be present to help with details or aftercare discussion.",
      },
      {
        question: "Do you provide routine toenail cutting?",
        answer:
          "Yes. Routine toenail cutting and nail care are part of Foot+ professional foot care at home.",
      },
      {
        question: "What if my concern needs medical care?",
        answer:
          "If a concern appears outside Foot+ scope, you will be advised to seek suitable medical support.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-stoke-bishop",
    mapCoordinates: { lat: 51.4779, lng: -2.6347 },
    area: "Stoke Bishop",
    region: "north-west",
    mapPosition: { x: 20, y: 35 },
    mapLabelPosition: "left",
    hubDescription:
      "Professional home-visit foot care in Stoke Bishop, delivered in the comfort of your own home.",
    title: "Foot Health Practitioner in Stoke Bishop, Bristol",
    intro:
      "Professional home-visit foot care in Stoke Bishop, delivered in the comfort of your own home.",
    description:
      "Foot+ provides professional foot health appointments at home in Stoke Bishop for routine care, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Stoke Bishop, Bristol",
    metaDescription:
      "Professional home-visit foot care in Stoke Bishop, Bristol, supporting routine foot care, toenail cutting, hard skin reduction and diabetic foot checks at home.",
    local: [
      "Home visits are available across Stoke Bishop, including residential areas around Stoke Hill, Shirehampton Road, Druid Stoke and nearby streets towards Sneyd Park.",
      "Stoke Bishop sits close to existing North and West Bristol service areas, but please include your postcode when enquiring so Foot+ can confirm current home-visit availability.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Sneyd Park",
        href: "/foot-health-practitioner-sneyd-park",
      },
      {
        title: "Foot health appointments in Westbury-on-Trym",
        href: "/foot-health-practitioner-westbury-on-trym",
      },
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
    ],
    faqs: [
      {
        question: "Which parts of Stoke Bishop do you cover?",
        answer:
          "Foot+ provides home visits across Stoke Bishop, including local residential streets. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can a relative arrange the appointment?",
        answer:
          "A relative can help submit an enquiry, but Foot+ will need suitable appointment details and consent from the person receiving care.",
      },
      {
        question: "Do you provide diabetic foot checks in Stoke Bishop?",
        answer:
          "Yes. Diabetic foot checks are listed as a Foot+ service and can be included where appropriate during home-visit care.",
      },
      {
        question: "Can you help with routine nail maintenance?",
        answer:
          "Yes. Routine appointments can include toenail cutting, nail care and practical advice for maintaining comfort between visits.",
      },
      {
        question: "How do I confirm whether my postcode is covered?",
        answer:
          "Send your postcode when enquiring so Foot+ can check current travel availability for Stoke Bishop home visits.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-sneyd-park",
    mapCoordinates: { lat: 51.4789, lng: -2.625 },
    area: "Sneyd Park",
    region: "north-west",
    mapPosition: { x: 25, y: 28 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit foot care in Sneyd Park for comfortable and practical support at home.",
    title: "Foot Health Practitioner in Sneyd Park, Bristol",
    intro:
      "Professional home-visit foot care in Sneyd Park for comfortable and practical support at home.",
    description:
      "Foot+ provides home-visit foot care across Sneyd Park, helping with routine nail care, hard skin, callus, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Sneyd Park, Bristol",
    metaDescription:
      "Home-visit foot care in Sneyd Park, Bristol for routine foot care, nail care, hard skin and callus reduction, corn care and diabetic foot checks.",
    local: [
      "Foot+ provides home visits throughout Sneyd Park, including residential streets near Julian Road, Church Road, The Downs and the boundary with Stoke Bishop.",
      "Appointments take place in the patient’s home. Please provide your postcode when enquiring so current availability around Sneyd Park can be confirmed.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Stoke Bishop",
        href: "/foot-health-practitioner-stoke-bishop",
      },
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
      {
        title: "Foot health appointments in Westbury-on-Trym",
        href: "/foot-health-practitioner-westbury-on-trym",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Sneyd Park?",
        answer:
          "Foot+ provides home visits in Sneyd Park and nearby areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "How long does a routine appointment take?",
        answer:
          "The current routine appointment listed by Foot+ is 45 minutes. New patient appointments allow time for a fuller assessment.",
      },
      {
        question: "Can you help with corns or calluses?",
        answer:
          "Where suitable, Foot+ can provide corn care plus hard skin and callus reduction, with advice to support comfort after the appointment.",
      },
      {
        question: "Is the appointment at my home?",
        answer:
          "Yes. Sneyd Park appointments are home visits, so Foot+ comes to the appointment address arranged with you.",
      },
      {
        question: "What if my concern needs medical care?",
        answer:
          "If a concern appears outside Foot+ scope, you will be advised to seek suitable medical support.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-st-philips",
    mapCoordinates: { lat: 51.4524, lng: -2.5701 },
    area: "St Philips",
    region: "central",
    mapPosition: { x: 66, y: 50 },
    mapLabelPosition: "right",
    hubDescription:
      "Professional home-visit foot care in St Philips, close to central Bristol and Temple Meads.",
    title: "Foot Health Practitioner in St Philips, Bristol",
    intro:
      "Professional home-visit foot care in St Philips, delivered in the comfort of your own home.",
    description:
      "Foot+ provides professional foot care at home in St Philips for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in St Philips, Bristol",
    metaDescription:
      "Professional home-visit foot care in St Philips, Bristol, including nail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home visits across St Philips and nearby residential areas, with convenient access from central Bristol, Feeder Road, Days Road and Temple Way.",
      "Appointments can support patients around Avon Street and the Temple Meads area who prefer routine foot and nail care in familiar surroundings rather than travelling to a clinic.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Old Market",
        href: "/foot-health-practitioner-old-market",
      },
      {
        title: "Foot health appointments in Redcliffe",
        href: "/foot-health-practitioner-redcliffe",
      },
      {
        title: "Foot health appointments in Barton Hill",
        href: "/foot-health-practitioner-barton-hill",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout St Philips?",
        answer:
          "Foot+ provides home visits in St Philips and nearby central-east Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can I book if I live near Temple Meads?",
        answer:
          "Yes. Foot+ can consider home-visit appointments around the Temple Meads side of St Philips, subject to current travel availability.",
      },
      {
        question: "Can you help with difficult toenails at home?",
        answer:
          "Yes. Routine foot care can include toenail cutting and nail care for nails that are hard to reach, thickened or awkward to manage.",
      },
      {
        question: "Do you treat hard skin and corns in St Philips?",
        answer:
          "Where suitable, Foot+ can reduce hard skin, callus and corns during a home visit and provide practical aftercare advice.",
      },
      {
        question: "What should I include when enquiring?",
        answer:
          "Please include the patient’s postcode, main foot concerns, and any relevant medical or medication information.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-old-market",
    mapCoordinates: { lat: 51.4563, lng: -2.5842 },
    area: "Old Market",
    region: "central",
    mapPosition: { x: 58, y: 46 },
    mapLabelPosition: "above",
    hubDescription:
      "Convenient home-visit foot care in Old Market for routine foot and nail concerns.",
    title: "Foot Health Practitioner in Old Market, Bristol",
    intro:
      "Professional home-visit foot care in Old Market for patients who prefer convenient care at home.",
    description:
      "Foot+ provides professional foot care at home in Old Market for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Old Market, Bristol",
    metaDescription:
      "Convenient home-visit foot care in Old Market, Bristol for routine nail care, hard skin, callus, corns and diabetic foot checks.",
    local: [
      "Foot+ provides home-visit appointments around Old Market, including residential streets near Old Market Street, West Street and Midland Road.",
      "This can be helpful for patients near the Trinity Centre area or central Bristol who prefer practical foot health support at home.",
    ],
    nearby: [
      {
        title: "Foot health appointments in St Philips",
        href: "/foot-health-practitioner-st-philips",
      },
      {
        title: "Foot health appointments in Easton",
        href: "/foot-health-practitioner-easton",
      },
      {
        title: "Foot health appointments in Redcliffe",
        href: "/foot-health-practitioner-redcliffe",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits in Old Market?",
        answer:
          "Foot+ provides home visits in Old Market and nearby Bristol areas. Send your postcode when enquiring so availability can be checked.",
      },
      {
        question: "Can I arrange care without a referral?",
        answer:
          "Yes. You can request a home-visit foot health appointment directly through the Foot+ booking enquiry page.",
      },
      {
        question: "Can you help with routine nail maintenance?",
        answer:
          "Yes. Routine appointments can include toenail cutting, nail care and practical advice for maintaining comfort between visits.",
      },
      {
        question: "Is this care suitable for someone with reduced mobility?",
        answer:
          "Home visits can be useful for people with reduced mobility because the appointment takes place at the arranged home address.",
      },
      {
        question: "Can a family member enquire for me?",
        answer:
          "A family member can help submit an enquiry, but Foot+ will need suitable details and consent from the person receiving care.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-redcliffe",
    mapCoordinates: { lat: 51.4477, lng: -2.5902 },
    area: "Redcliffe",
    region: "central",
    mapPosition: { x: 54, y: 59 },
    mapLabelPosition: "below",
    hubDescription:
      "Professional foot care at home throughout Redcliffe and nearby central Bristol areas.",
    title: "Foot Health Practitioner in Redcliffe, Bristol",
    intro:
      "Home-visit foot care in Redcliffe, providing practical foot and nail care in familiar surroundings.",
    description:
      "Foot+ provides professional foot care at home in Redcliffe for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Redcliffe, Bristol",
    metaDescription:
      "Home-visit foot care in Redcliffe, Bristol, supporting routine foot care, toenail cutting, hard skin reduction and diabetic foot checks at home.",
    local: [
      "Foot+ provides home visits across Redcliffe, including residential areas around Redcliffe Way, Redcliffe Parade and nearby central Bristol streets.",
      "Appointments may suit patients close to Temple Meads or the Queen Square vicinity who want routine foot and nail care without travelling across the city.",
    ],
    nearby: [
      {
        title: "Foot health appointments in St Philips",
        href: "/foot-health-practitioner-st-philips",
      },
      {
        title: "Foot health appointments in Old Market",
        href: "/foot-health-practitioner-old-market",
      },
      {
        title: "Foot health appointments in Totterdown",
        href: "/foot-health-practitioner-totterdown",
      },
    ],
    faqs: [
      {
        question: "Which parts of Redcliffe do you cover?",
        answer:
          "Foot+ provides home visits in Redcliffe and nearby central Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can you provide a first foot health assessment at home?",
        answer:
          "Yes. A new patient appointment includes time to discuss your history and concerns, assess your feet and provide appropriate care and advice.",
      },
      {
        question: "Can you help with corns or calluses?",
        answer:
          "Where appropriate, Foot+ can provide corn care plus hard skin and callus reduction, with advice to support comfort after the appointment.",
      },
      {
        question: "Do you provide diabetic foot checks in Redcliffe?",
        answer:
          "Yes. Diabetic foot checks are listed as a Foot+ service and can be included where appropriate during home-visit care.",
      },
      {
        question: "Do I need to travel to a clinic?",
        answer:
          "No. Redcliffe appointments take place in the patient’s home at the address arranged with Foot+.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-easton",
    mapCoordinates: { lat: 51.4613, lng: -2.555 },
    area: "Easton",
    region: "east",
    mapPosition: { x: 77, y: 42 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit foot care in Easton for patients who prefer practical treatment at home.",
    title: "Foot Health Practitioner in Easton, Bristol",
    intro:
      "Professional home-visit foot care across Easton, helping patients manage routine foot and nail concerns at home.",
    description:
      "Foot+ provides professional foot care at home in Easton for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Easton, Bristol",
    metaDescription:
      "Professional home-visit foot care in Easton, Bristol for routine foot and nail care, hard skin, callus, corn care and diabetic foot checks.",
    local: [
      "Home visits are available across Easton, including areas around Stapleton Road, Chelsea Road, Easton Road and nearby residential streets.",
      "Patients around Greenbank and the wider Easton area can enquire for practical home-based foot care, subject to current appointment availability.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Old Market",
        href: "/foot-health-practitioner-old-market",
      },
      {
        title: "Foot health appointments in Barton Hill",
        href: "/foot-health-practitioner-barton-hill",
      },
      {
        title: "Foot health appointments in Totterdown",
        href: "/foot-health-practitioner-totterdown",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Easton?",
        answer:
          "Foot+ provides home visits in Easton and nearby areas. Please include your postcode when enquiring so current availability can be confirmed.",
      },
      {
        question: "Can you cut toenails that are hard to reach?",
        answer:
          "Yes. Routine foot care can include toenail cutting and nail care for patients who find it difficult to reach their feet.",
      },
      {
        question: "Can you help with cracked heels?",
        answer:
          "Foot+ can assess cracked heel skin, reduce surrounding hard skin where suitable and provide moisturising and aftercare guidance.",
      },
      {
        question: "What happens if my concern needs medical care?",
        answer:
          "If a concern appears outside Foot+ scope, you will be advised to seek suitable medical support.",
      },
      {
        question: "How long is a routine appointment?",
        answer:
          "The current routine appointment listed by Foot+ is 45 minutes. New patient appointments allow time for a fuller assessment.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-barton-hill",
    mapCoordinates: { lat: 51.4527, lng: -2.56 },
    area: "Barton Hill",
    region: "east",
    mapPosition: { x: 74, y: 54 },
    mapLabelPosition: "right",
    hubDescription:
      "Professional foot and nail care appointments delivered at home across Barton Hill.",
    title: "Foot Health Practitioner in Barton Hill, Bristol",
    intro:
      "Home-visit foot care in Barton Hill, delivered professionally and conveniently in your own home.",
    description:
      "Foot+ provides professional foot care at home in Barton Hill for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Barton Hill, Bristol",
    metaDescription:
      "Home-visit foot care in Barton Hill, Bristol, including routine toenail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home-visit appointments across Barton Hill, including residential streets around Barton Hill Road, Marsh Lane and Avonvale Road.",
      "Appointments can support patients near the Urban Park area who prefer foot and nail care in their own home rather than travelling for routine care.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Easton",
        href: "/foot-health-practitioner-easton",
      },
      {
        title: "Foot health appointments in St Philips",
        href: "/foot-health-practitioner-st-philips",
      },
      {
        title: "Foot health appointments in Old Market",
        href: "/foot-health-practitioner-old-market",
      },
    ],
    faqs: [
      {
        question: "Do you offer home visits in Barton Hill?",
        answer:
          "Foot+ provides home visits in Barton Hill and nearby Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can I book for general foot maintenance?",
        answer:
          "Yes. Routine appointments can support general nail and skin maintenance, comfort and practical home-based foot care.",
      },
      {
        question: "Can you help with painful hard skin?",
        answer:
          "Where appropriate, Foot+ can reduce hard skin and callus during a home visit and provide practical aftercare advice.",
      },
      {
        question: "Can a carer or family member be present?",
        answer:
          "If the patient is comfortable with this, a family member or carer may be present to help with details or aftercare discussion.",
      },
      {
        question: "What should I prepare before an appointment?",
        answer:
          "Please have a comfortable chair, good lighting if possible, and any relevant medical or medication information available.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-totterdown",
    mapCoordinates: { lat: 51.4386, lng: -2.5787 },
    area: "Totterdown",
    region: "south",
    mapPosition: { x: 62, y: 72 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit foot care in Totterdown for routine appointments and ongoing foot health support.",
    title: "Foot Health Practitioner in Totterdown, Bristol",
    intro:
      "Professional home-visit foot care in Totterdown for patients looking for convenient appointments at home.",
    description:
      "Foot+ provides professional foot care at home in Totterdown for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Totterdown, Bristol",
    metaDescription:
      "Professional home-visit foot care in Totterdown, Bristol for routine nail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home visits across Totterdown, including residential areas around Wells Road, Oxford Street and nearby streets towards the Windmill Hill border.",
      "Appointments may suit patients close to Victoria Park or the wider Totterdown area who prefer routine foot health support at home.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Bedminster",
        href: "/foot-health-practitioner-bedminster",
      },
      {
        title: "Foot health appointments in Southville",
        href: "/foot-health-practitioner-southville",
      },
      {
        title: "Foot health appointments in Redcliffe",
        href: "/foot-health-practitioner-redcliffe",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Totterdown?",
        answer:
          "Foot+ provides home visits in Totterdown and nearby South and central Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can you help with thickened toenails?",
        answer:
          "Yes. Foot+ can help with toenail cutting and nail care, including thickened nails where routine care is suitable.",
      },
      {
        question: "Can you provide ongoing routine care?",
        answer:
          "Yes. Routine appointments focus on maintaining comfort, mobility and skin and nail health between visits.",
      },
      {
        question: "Do you cover addresses near Wells Road?",
        answer:
          "Foot+ can consider appointments around Wells Road and nearby Totterdown streets, subject to current appointment availability.",
      },
      {
        question: "What if I am not sure which service I need?",
        answer:
          "Share your main concerns on the enquiry form and Foot+ can confirm whether a new patient or routine appointment is most suitable.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-southville",
    mapCoordinates: { lat: 51.4446, lng: -2.6063 },
    area: "Southville",
    region: "south",
    mapPosition: { x: 42, y: 67 },
    mapLabelPosition: "left",
    hubDescription:
      "Professional home-visit foot care in Southville for patients who prefer convenient care at home.",
    title: "Foot Health Practitioner in Southville, Bristol",
    intro:
      "Home-visit foot care in Southville for patients who prefer professional foot and nail care at home.",
    description:
      "Foot+ provides professional foot care at home in Southville for routine appointments, nail care, hard skin, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Southville, Bristol",
    metaDescription:
      "Professional home-visit foot care in Southville, Bristol, including routine nail care, hard skin reduction, corn care and diabetic foot checks at home.",
    local: [
      "Foot+ provides home-visit appointments across Southville, including residential streets around North Street, Greville Smyth Park, Coronation Road and nearby parts of Bedminster.",
      "Southville is included in the existing South Bristol service-area wording, but appointments are arranged by location and availability, so please include the patient’s postcode when enquiring.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Bedminster",
        href: "/foot-health-practitioner-bedminster",
      },
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Southville?",
        answer:
          "Foot+ provides home visits in Southville and nearby Bristol areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can you cut toenails that are hard to reach?",
        answer:
          "Yes. Routine foot care can include toenail cutting and nail care for patients who find it difficult to reach their feet.",
      },
      {
        question: "Can I book for general foot maintenance?",
        answer:
          "Yes. Routine appointments can support general nail and skin maintenance, comfort and practical home-based foot care.",
      },
      {
        question: "Can you help with cracked heels?",
        answer:
          "Foot+ can assess cracked heel skin, reduce surrounding hard skin where suitable and provide moisturising and aftercare guidance.",
      },
      {
        question: "What should I include in my enquiry?",
        answer:
          "Please include the patient’s postcode, the main foot concerns, and any relevant medical or medication information.",
      },
    ],
  },
  {
    slug: "foot-health-practitioner-bedminster",
    mapCoordinates: { lat: 51.4412, lng: -2.6015 },
    area: "Bedminster",
    region: "south",
    mapPosition: { x: 45, y: 78 },
    mapLabelPosition: "below",
    hubDescription:
      "Home-visit foot care in Bedminster for routine foot and nail concerns.",
    title: "Foot Health Practitioner in Bedminster, Bristol",
    intro:
      "Professional home-visit foot care in Bedminster for routine foot and nail concerns.",
    description:
      "Foot+ provides home-visit foot care in Bedminster, supporting routine nail care, hard skin, callus, corns and diabetic foot checks.",
    metaTitle: "Foot Health Practitioner in Bedminster, Bristol",
    metaDescription:
      "Home-visit foot care in Bedminster, Bristol for routine foot and nail concerns, hard skin and callus reduction, corn care and diabetic foot checks.",
    local: [
      "Home visits are available across Bedminster, including residential areas around East Street, Bedminster Parade, West Street and nearby parts of Windmill Hill and Southville.",
      "Bedminster is included in the existing South Bristol service-area wording. Contact Foot+ with your postcode to confirm current home-visit availability for your address.",
    ],
    nearby: [
      {
        title: "Foot health appointments in Southville",
        href: "/foot-health-practitioner-southville",
      },
      {
        title: "Foot health appointments in Cotham",
        href: "/foot-health-practitioner-cotham",
      },
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
    ],
    faqs: [
      {
        question: "Do you provide home visits throughout Bedminster?",
        answer:
          "Foot+ provides home visits in Bedminster and nearby areas. Contact Foot+ with your postcode to confirm current availability.",
      },
      {
        question: "Can you help with thickened toenails?",
        answer:
          "Yes. Foot+ can help with toenail cutting and nail care, including thickened nails where routine care is suitable.",
      },
      {
        question: "Do I need to travel to a clinic?",
        answer:
          "No. Bedminster appointments take place in the patient’s home at the address arranged with Foot+.",
      },
      {
        question: "Can a family member be present?",
        answer:
          "If the patient is comfortable with this, a family member or carer may be present to help with details or aftercare discussion.",
      },
      {
        question: "Can you provide diabetic foot checks?",
        answer:
          "Yes. Diabetic foot checks are available where appropriate as part of Foot+ home-visit foot care.",
      },
    ],
  },
];

export function getLocationPage(slug: string) {
  return locationPages.find((p) => p.slug === slug);
}
export function locationCanonical(slug: string) {
  return `${SITE_URL}/${slug}`;
}
