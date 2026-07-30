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
  localCoverage: string;
  localAccessNote: string;
  accessInformation?: string;
  suitableFor?: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  region: LocationRegion;
  mapCoordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number };
  mapLabelPosition?: "left" | "right" | "above" | "below";
};

export const locationPages: LocationPage[] = [
  {
    slug: "foot-health-practitioner-clifton",
    area: "Clifton",
    region: "central",
    mapCoordinates: { lat: 51.4619, lng: -2.619 },
    mapPosition: { x: 33, y: 43 },
    mapLabelPosition: "left",
    hubDescription:
      "Home-visit nail and skin care across Clifton, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Clifton, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Clifton, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides mobile foot-health appointments across Clifton, including Clifton Village and Clifton Down. Home visits are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Appointments at home can be particularly useful for people who find Clifton’s hills, parking or public transport inconvenient, or who live in flats and converted properties with shared access. Access details such as steps, entry systems or parking restrictions can be provided when booking. Foot+ also covers nearby Redland and Cotham.",
    localCoverage:
      "Foot+ provides home visits across Clifton, including Clifton Village, Clifton Down and streets near Whiteladies Road and Pembroke Road.",
    localAccessNote:
      "For flats, converted properties or homes with stepped access, please provide entry and parking information when booking.",
    nearby: [
      {
        title: "Foot health appointments in Redland",
        href: "/foot-health-practitioner-redland",
      },
      {
        title: "Foot health appointments in Cotham",
        href: "/foot-health-practitioner-cotham",
      },
    ],
    faqs: [
      {
        question: "Do you cover Clifton Village and Clifton Down?",
        answer:
          "Yes. Foot+ covers Clifton and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question:
          "Can appointments take place in Clifton flats or converted properties?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Clifton.",
      },
      {
        question: "Can a relative arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern falls outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Clifton, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Clifton. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-redland",
    area: "Redland",
    region: "central",
    mapCoordinates: { lat: 51.4683, lng: -2.6018 },
    mapPosition: { x: 43, y: 32 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit nail and skin care across Redland, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Redland, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Redland, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Redland, including Redland Green, Chandos Road and streets towards Zetland Road. Appointments cover routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for residents who find parking, walking to appointments or travelling across Bristol inconvenient, and for people arranging care for a relative at home. Redland has a mix of family houses, flats and busier roads, so please share access or parking details when enquiring. Foot+ also covers nearby Clifton, Cotham and Bishopston.",
    localCoverage:
      "Home visits are available throughout Redland, including areas around Redland Green, Chandos Road, Cranbrook Road and nearby residential streets.",
    localAccessNote:
      "Please mention stairs, lift access, intercom details or parking restrictions so the visit can be planned around Redland’s mixed housing and busy routes.",
    nearby: [
      {
        title: "Foot health appointments in Clifton",
        href: "/foot-health-practitioner-clifton",
      },
      {
        title: "Foot health appointments in Cotham",
        href: "/foot-health-practitioner-cotham",
      },
      {
        title: "Foot health appointments in Bishopston",
        href: "/foot-health-practitioner-bishopston",
      },
    ],
    faqs: [
      {
        question: "Do you cover Redland Green and Chandos Road?",
        answer:
          "Yes. Foot+ covers Redland and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "Can Foot+ visit family homes and flats in Redland?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Redland.",
      },
      {
        question:
          "Is Redland close enough for Bishopston or Cotham appointments?",
        answer:
          "Yes. Redland links naturally with Bishopston and Cotham. Please send the appointment postcode so Foot+ can confirm current availability.",
      },
      {
        question: "How far ahead should I book?",
        answer:
          "Please enquire as soon as you know you would like care, especially if you need a particular day or time window.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Redland, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Redland. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-cotham",
    area: "Cotham",
    region: "central",
    mapCoordinates: { lat: 51.4629, lng: -2.5952 },
    mapPosition: { x: 50, y: 39 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit nail and skin care across Cotham, with local appointment planning, routine foot care, prices and booking information.",
    title: "Home Foot Care in Cotham, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Cotham, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home foot-care appointments in Cotham for people who would rather receive routine nail and skin care at home. A home visit avoids arranging transport, walking from a parking space or managing a journey when mobility or reaching the feet is difficult. It can also make planning simpler when a relative, carer or support worker is helping with care. Foot+ also has existing coverage pages for neighbouring Clifton, Redland and Bishopston. These links are useful when an address sits close to the edge of Cotham, but the neighbourhood name alone does not confirm availability. Please provide the full appointment postcode when enquiring so Foot+ can check the address and current availability before a visit is arranged.",
    localCoverage:
      "Coverage enquiries may include Cotham and addresses towards the existing Clifton, Redland and Bishopston coverage areas. Neighbourhood boundaries do not necessarily determine availability, so please provide the full appointment postcode when enquiring. Foot+ will use it to confirm whether a home visit can be arranged.",
    localAccessNote:
      "For shared houses, flats or hillside streets, please provide entry details and any practical parking notes before the appointment.",
    accessInformation:
      "When booking, explain any parking restrictions or permit-controlled parking and whether there are steps or stairs. For a flat or shared entrance, include lift access, the entrance code, intercom instructions or gated-access details. Please also say whether a relative, carer or support worker will be present, so arrival and access can be planned without assumptions about the property.",
    suitableFor: [
      "People who find public transport or a clinic journey difficult",
      "People who cannot comfortably reach their feet",
      "People living in flats who can provide clear access instructions",
      "Relatives arranging care for a family member",
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
        question: "Do you cover my part of Cotham?",
        answer:
          "Please send the full appointment postcode. Area boundaries do not necessarily determine availability, so Foot+ confirms each address and current availability when you enquire.",
      },
      {
        question:
          "Can you visit a Cotham flat or property with limited parking?",
        answer:
          "Please provide parking restrictions, permit information, steps, stairs, lift access, entrance codes, intercom or gated-access instructions when enquiring. Foot+ can then consider the practical access details before confirming the visit.",
      },
      {
        question: "Can a relative arrange a Cotham appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "Do you also cover Clifton and Redland?",
        answer:
          "Foot+ has existing coverage pages for both Clifton and Redland. Please provide the appointment postcode so availability for the exact address can be confirmed.",
      },
    ],
    metaTitle: "Home Foot Care in Cotham, Bristol",
    metaDescription:
      "Arrange professional home foot-care appointments in Cotham, with practical guidance on postcode coverage, property access and preparing for a visit.",
  },
  {
    slug: "foot-health-practitioner-bishopston",
    area: "Bishopston",
    region: "north-west",
    mapCoordinates: { lat: 51.475, lng: -2.5896 },
    mapPosition: { x: 53, y: 22 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit nail and skin care across Bishopston, with local appointment planning, routine foot care, prices and booking information.",
    title: "Home Foot Care in Bishopston, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Bishopston, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home foot-care appointments in Bishopston, bringing routine nail and skin care to the patient’s own home. This may help people with reduced mobility or anyone who cannot comfortably reach their feet, and removes the need to organise a lift, use public transport or travel to a clinic. A relative or carer can also help arrange the appointment when appropriate. Existing Foot+ coverage pages include nearby Redland and Cotham, while the wider North Bristol coverage information also names Ashley Down. Because familiar neighbourhood labels and actual addresses do not always align, the full postcode is important. Foot+ will check the address and current availability when responding to an enquiry.",
    localCoverage:
      "Enquiries are welcomed for Bishopston and towards the existing Redland and Cotham coverage areas; Ashley Down is also listed in Foot+ North Bristol coverage. Neighbourhood boundaries do not necessarily determine availability. Please provide the appointment postcode so the exact address and current availability can be checked.",
    localAccessNote:
      "Please share parking, intercom or stair details, especially for flats or homes on busier streets near Gloucester Road.",
    accessInformation:
      "Please mention parking restrictions or permit-controlled parking when booking. Also describe steps, stairs, lift access, entrance codes, intercom systems or gated access. If a relative, carer or support worker will meet Foot+ or remain for the appointment, include that information so the arrival can be planned clearly.",
    suitableFor: [
      "People with reduced mobility",
      "People who cannot comfortably reach their feet",
      "People who no longer drive or find public transport difficult",
      "Carers or support workers arranging an appointment",
    ],
    nearby: [
      {
        title: "Foot health appointments in Redland",
        href: "/foot-health-practitioner-redland",
      },
      {
        title: "Foot health appointments in Cotham",
        href: "/foot-health-practitioner-cotham",
      },
    ],
    faqs: [
      {
        question: "Do you cover my part of Bishopston?",
        answer:
          "Please provide the full appointment postcode. Foot+ checks the exact address and current availability rather than relying only on a neighbourhood boundary.",
      },
      {
        question: "Is Ashley Down included in your coverage information?",
        answer:
          "Yes. Ashley Down is named in Foot+ North Bristol coverage information. Please still provide the appointment postcode so availability for the address can be confirmed.",
      },
      {
        question: "Can you visit a Bishopston flat or gated property?",
        answer:
          "Please provide details of parking, stairs, lift access, entrance codes, intercoms or gates. Foot+ will consider the practical access information when confirming the visit.",
      },
      {
        question: "Can a carer book on someone else’s behalf?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
    ],
    metaTitle: "Home Foot Care in Bishopston, Bristol",
    metaDescription:
      "Professional home foot-care appointments in Bishopston, Bristol, with clear postcode, access and visit-planning information for patients and carers.",
  },
  {
    slug: "foot-health-practitioner-henleaze",
    area: "Henleaze",
    region: "north-west",
    mapCoordinates: { lat: 51.4893, lng: -2.609 },
    mapPosition: { x: 35, y: 19 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit nail and skin care across Henleaze, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Henleaze, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Henleaze, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Henleaze, including areas near Henleaze Road, North View and Wellington Hill. Appointments can help with routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits may be useful for older adults, people with reduced mobility and residents who prefer care at home rather than travelling for a clinic appointment. Henleaze links with Bishopston and Westbury-on-Trym, so please include the appointment postcode when enquiring. Access or parking notes help Foot+ plan the visit.",
    localCoverage:
      "Home visits are available across Henleaze, including Henleaze Road, North View, Wellington Hill and surrounding residential streets.",
    localAccessNote:
      "Please provide driveway, on-street parking, stair or entry-system details so Foot+ can plan a smooth home visit.",
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
          "Yes. Foot+ covers Henleaze and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "Can Foot+ visit homes near Henleaze Road or North View?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Henleaze.",
      },
      {
        question: "Can someone else be present during the appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "Can Foot+ treat cracked heels during a home visit?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Henleaze, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Henleaze. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-westbury-on-trym",
    area: "Westbury-on-Trym",
    region: "north-west",
    mapCoordinates: { lat: 51.4935, lng: -2.6194 },
    mapPosition: { x: 24, y: 18 },
    mapLabelPosition: "left",
    hubDescription:
      "Home-visit nail and skin care across Westbury-on-Trym, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Westbury-on-Trym",
    description:
      "Foot+ provides home-visit nail and skin care across Westbury-on-Trym, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care throughout Westbury-on-Trym, including Westbury Village and residential areas around Stoke Lane, Canford Lane and Falcondale Road. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be useful for older adults, people with reduced mobility and residents who prefer practical foot care without travelling to a clinic. Please provide the appointment postcode and any relevant access or parking information when enquiring. Foot+ also covers nearby Henleaze.",
    localCoverage:
      "Foot+ provides home visits throughout Westbury-on-Trym, including Westbury Village and residential areas around Stoke Lane, Canford Lane and Falcondale Road.",
    localAccessNote:
      "Please provide the appointment postcode plus driveway, parking, steps or entry information when enquiring from this primarily residential area.",
    nearby: [
      {
        title: "Foot health appointments in Henleaze",
        href: "/foot-health-practitioner-henleaze",
      },
      {
        title: "Foot health appointments in Stoke Bishop",
        href: "/foot-health-practitioner-stoke-bishop",
      },
    ],
    faqs: [
      {
        question:
          "Do you cover Westbury Village and nearby residential streets?",
        answer:
          "Yes. Foot+ covers Westbury-on-Trym and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information should I provide when booking?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Westbury-on-Trym.",
      },
      {
        question: "Can someone else be present during the appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "Do you provide routine toenail care at home?",
        answer:
          "Yes. Routine toenail care and thickened nail care are part of Foot+ home-visit appointments where suitable.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Westbury-on-Trym",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Westbury-on-Trym. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-stoke-bishop",
    area: "Stoke Bishop",
    region: "north-west",
    mapCoordinates: { lat: 51.4779, lng: -2.6347 },
    mapPosition: { x: 20, y: 35 },
    mapLabelPosition: "left",
    hubDescription:
      "Home-visit nail and skin care across Stoke Bishop, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Stoke Bishop, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Stoke Bishop, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Stoke Bishop, including areas around Stoke Hill, Shirehampton Road and Druid Stoke. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Sneyd Park, Westbury-on-Trym and Clifton.",
    localCoverage:
      "Foot+ provides home visits across Stoke Bishop, including areas around Stoke Hill, Shirehampton Road and Druid Stoke.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Stoke Hill?",
        answer:
          "Yes. Foot+ covers Stoke Bishop and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question:
          "What access information helps for Stoke Bishop appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Stoke Bishop.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Stoke Bishop, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Stoke Bishop. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-sneyd-park",
    area: "Sneyd Park",
    region: "north-west",
    mapCoordinates: { lat: 51.4789, lng: -2.625 },
    mapPosition: { x: 25, y: 28 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit nail and skin care across Sneyd Park, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Sneyd Park, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Sneyd Park, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Sneyd Park, including areas around Julian Road, Church Road and The Downs. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Stoke Bishop, Clifton and Westbury-on-Trym.",
    localCoverage:
      "Foot+ provides home visits across Sneyd Park, including areas around Julian Road, Church Road and The Downs.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Julian Road?",
        answer:
          "Yes. Foot+ covers Sneyd Park and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Sneyd Park appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Sneyd Park.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Sneyd Park, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Sneyd Park. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-st-philips",
    area: "St Philips",
    region: "central",
    mapCoordinates: { lat: 51.4524, lng: -2.5701 },
    mapPosition: { x: 66, y: 50 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit nail and skin care across St Philips, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in St Philips, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across St Philips, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across St Philips, including areas around Feeder Road, Days Road and Temple Way. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Old Market, Redcliffe and Barton Hill.",
    localCoverage:
      "Foot+ provides home visits across St Philips, including areas around Feeder Road, Days Road and Temple Way.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Feeder Road?",
        answer:
          "Yes. Foot+ covers St Philips and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for St Philips appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in St Philips.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in St Philips, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across St Philips. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-old-market",
    area: "Old Market",
    region: "central",
    mapCoordinates: { lat: 51.4563, lng: -2.5842 },
    mapPosition: { x: 58, y: 46 },
    mapLabelPosition: "above",
    hubDescription:
      "Home-visit nail and skin care across Old Market, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Old Market, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Old Market, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Old Market, including areas around Old Market Street, West Street and Midland Road. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby St Philips, Easton and Redcliffe.",
    localCoverage:
      "Foot+ provides home visits across Old Market, including areas around Old Market Street, West Street and Midland Road.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Old Market Street?",
        answer:
          "Yes. Foot+ covers Old Market and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Old Market appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Old Market.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Old Market, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Old Market. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-redcliffe",
    area: "Redcliffe",
    region: "central",
    mapCoordinates: { lat: 51.4477, lng: -2.5902 },
    mapPosition: { x: 54, y: 59 },
    mapLabelPosition: "below",
    hubDescription:
      "Home-visit nail and skin care across Redcliffe, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Redcliffe, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Redcliffe, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Redcliffe, including areas around Redcliffe Way, Redcliffe Parade and Temple Meads. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby St Philips, Old Market and Totterdown.",
    localCoverage:
      "Foot+ provides home visits across Redcliffe, including areas around Redcliffe Way, Redcliffe Parade and Temple Meads.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Redcliffe Way?",
        answer:
          "Yes. Foot+ covers Redcliffe and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Redcliffe appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Redcliffe.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Redcliffe, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Redcliffe. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-easton",
    area: "Easton",
    region: "east",
    mapCoordinates: { lat: 51.4613, lng: -2.555 },
    mapPosition: { x: 77, y: 42 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit nail and skin care across Easton, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Easton, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Easton, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Easton, including areas around Stapleton Road, Chelsea Road and Easton Road. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Old Market, Barton Hill and Totterdown.",
    localCoverage:
      "Foot+ provides home visits across Easton, including areas around Stapleton Road, Chelsea Road and Easton Road.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Stapleton Road?",
        answer:
          "Yes. Foot+ covers Easton and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Easton appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Easton.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Easton, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Easton. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-barton-hill",
    area: "Barton Hill",
    region: "east",
    mapCoordinates: { lat: 51.4527, lng: -2.56 },
    mapPosition: { x: 74, y: 54 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit nail and skin care across Barton Hill, with local appointment planning, routine foot care, prices and booking information.",
    title: "Home Foot Care in Barton Hill, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Barton Hill, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home foot-care appointments in Barton Hill, allowing routine nail and skin care to take place without a journey to a clinic. This can be useful for someone with reduced mobility, a person who finds public transport difficult, or a relative coordinating care at home. Avoiding travel also means the patient can prepare for the appointment in familiar surroundings. The existing Foot+ location pages for Easton, St Philips and Old Market provide useful neighbouring coverage references. They do not guarantee that every address between the areas can be served, however, because neighbourhood boundaries do not decide availability. Please send the full appointment postcode with an enquiry so Foot+ can check the address and current availability.",
    localCoverage:
      "Barton Hill enquiries can be considered alongside the existing coverage pages for Easton, St Philips and Old Market. Neighbourhood boundaries do not necessarily determine availability. Please provide the full appointment postcode so Foot+ can confirm whether the address can be included when checking current availability.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
    accessInformation:
      "Tell Foot+ about parking restrictions or permit-controlled parking when enquiring. Include any steps, stairs, lift access, entrance code, intercom system or gated access that affects arrival. Please also say whether a relative, carer or support worker will be present to provide access or support during the appointment.",
    suitableFor: [
      "People with reduced mobility",
      "Patients who find public transport difficult",
      "People living in flats or supported accommodation",
      "Relatives arranging care for a family member",
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
        question: "Do you cover my part of Barton Hill?",
        answer:
          "Yes. Foot+ covers Barton Hill and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information should I provide in Barton Hill?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Barton Hill.",
      },
      {
        question: "Do you visit supported-living accommodation?",
        answer:
          "Please enquire with the full postcode and details of access and any support worker who will be present. Foot+ can then confirm whether the address and appointment arrangements are suitable.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Home Foot Care in Barton Hill, Bristol",
    metaDescription:
      "Foot+ offers professional home foot-care appointments in Barton Hill, with useful guidance for confirming coverage and planning property access.",
  },
  {
    slug: "foot-health-practitioner-totterdown",
    area: "Totterdown",
    region: "south",
    mapCoordinates: { lat: 51.4386, lng: -2.5787 },
    mapPosition: { x: 62, y: 72 },
    mapLabelPosition: "right",
    hubDescription:
      "Home-visit nail and skin care across Totterdown, with local appointment planning, routine foot care, prices and booking information.",
    title: "Foot Health Practitioner in Totterdown, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Totterdown, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Totterdown, including areas around Wells Road, Oxford Street and Windmill Hill border. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Bedminster, Southville and Redcliffe.",
    localCoverage:
      "Foot+ provides home visits across Totterdown, including areas around Wells Road, Oxford Street and Windmill Hill border.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Wells Road?",
        answer:
          "Yes. Foot+ covers Totterdown and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Totterdown appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Totterdown.",
      },
      {
        question: "Can a relative or carer arrange an appointment?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What happens if my concern is outside Foot+ scope?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Totterdown, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Totterdown. View routine foot care services, prices and booking options for local appointments.",
  },
  {
    slug: "foot-health-practitioner-southville",
    area: "Southville",
    region: "south",
    mapCoordinates: { lat: 51.4446, lng: -2.6063 },
    mapPosition: { x: 42, y: 67 },
    mapLabelPosition: "left",
    hubDescription:
      "Home-visit nail and skin care across Southville, with local appointment planning, routine foot care, prices and booking information.",
    title: "Home Foot Care in Southville, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Southville, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home foot-care appointments in Southville, so routine nail and skin care can be received at home instead of requiring a clinic journey. This can make appointments easier for someone who no longer drives, finds public transport difficult or cannot comfortably reach their feet. It may also help a relative or carer coordinate practical support around the visit. Foot+ has existing location pages for neighbouring Bedminster and Totterdown, which may help people enquiring for an address near the edge of Southville. Area names are only a guide and do not determine whether an appointment is available. Please provide the full postcode so Foot+ can check the address and current availability before confirming arrangements.",
    localCoverage:
      "Southville enquiries can be checked together with the existing coverage information for neighbouring Bedminster and Totterdown. Neighbourhood boundaries do not necessarily determine availability, so please provide the full appointment postcode. Foot+ will confirm whether the exact address can be covered when responding.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
    accessInformation:
      "When enquiring, describe parking restrictions or permit-controlled parking and any steps or stairs. For flats or controlled entrances, include lift access, entrance codes, intercom details or gated-access instructions. Please say whether a relative, carer or support worker will be present, particularly if they will help Foot+ enter the property.",
    suitableFor: [
      "People who no longer drive",
      "People who find public transport difficult",
      "People who cannot comfortably reach their feet",
      "Relatives or carers coordinating care at home",
    ],
    nearby: [
      {
        title: "Foot health appointments in Bedminster",
        href: "/foot-health-practitioner-bedminster",
      },
      {
        title: "Foot health appointments in Totterdown",
        href: "/foot-health-practitioner-totterdown",
      },
    ],
    faqs: [
      {
        question: "Do you cover my part of Southville?",
        answer:
          "Yes. Foot+ covers Southville and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "Can you visit a Southville flat with limited parking?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Southville.",
      },
      {
        question: "Can two people at the same Southville address enquire together?",
        answer:
          "Yes. Include both people in the enquiry so Foot+ can confirm the appropriate appointment arrangements, current availability and pricing before booking.",
      },
      {
        question: "Do you also cover nearby Bedminster and Totterdown?",
        answer:
          "Foot+ has existing coverage pages for both areas. Please provide the appointment postcode because availability is confirmed for the exact address, not from the neighbourhood name alone.",
      },
    ],
    metaTitle: "Home Foot Care in Southville, Bristol",
    metaDescription:
      "Plan a professional home foot-care appointment in Southville, Bristol, with clear information about local coverage, access and nearby areas served.",
  },
  {
    slug: "foot-health-practitioner-bedminster",
    area: "Bedminster",
    region: "south",
    mapCoordinates: { lat: 51.4412, lng: -2.6015 },
    mapPosition: { x: 45, y: 78 },
    mapLabelPosition: "below",
    hubDescription:
      "Home-visit nail and skin care across Bedminster, with local appointment planning, routine foot care, prices and booking information.",
    title: "Home Foot Care in Bedminster, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Bedminster, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home foot-care appointments in Bedminster for patients who would benefit from receiving routine nail and skin care at home. Avoiding a clinic journey can be practically helpful for older adults, people with reduced mobility and anyone who finds reaching their feet difficult. It can also simplify arrangements when a relative, carer or support worker is organising care. Existing Foot+ pages cover neighbouring Southville and Totterdown, so those are useful reference points for nearby enquiries. Neighbourhood names and boundaries do not by themselves confirm that an address is available for a visit. Please give the full postcode when enquiring so Foot+ can check the location and current availability before an appointment is arranged.",
    localCoverage:
      "Foot+ accepts coverage enquiries for Bedminster and towards the existing Southville and Totterdown coverage areas. Neighbourhood boundaries do not necessarily determine availability. Please provide the full appointment postcode so Foot+ can check the exact address before confirming a home visit.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
    accessInformation:
      "Provide details of parking restrictions or permit-controlled parking when you enquire, along with steps, stairs or lift access. Entrance codes, intercom systems and gated-access instructions should be shared in advance. Please also explain whether a relative, carer or support worker will be present to assist with entry or the appointment.",
    suitableFor: [
      "Older adults who would prefer routine care at home",
      "People with reduced mobility",
      "People who cannot comfortably reach their feet",
      "Support workers arranging an appointment",
    ],
    nearby: [
      {
        title: "Foot health appointments in Southville",
        href: "/foot-health-practitioner-southville",
      },
      {
        title: "Foot health appointments in Totterdown",
        href: "/foot-health-practitioner-totterdown",
      },
    ],
    faqs: [
      {
        question: "Do you cover my part of Bedminster?",
        answer:
          "Yes. Foot+ covers Bedminster and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What property access details should I provide?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Bedminster.",
      },
      {
        question: "Can a relative book a Bedminster visit for someone else?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "Do you also cover Southville and Totterdown?",
        answer:
          "Foot+ has existing location pages for Southville and Totterdown. Send the full appointment postcode so coverage and current availability can be checked for the address.",
      },
    ],
    metaTitle: "Home Foot Care in Bedminster, Bristol",
    metaDescription:
      "Professional home foot-care appointments in Bedminster, with practical information for checking postcode coverage and preparing property access.",
  },
];

export function getLocationPage(slug: string) {
  return locationPages.find((p) => p.slug === slug);
}
export function locationCanonical(slug: string) {
  return `${SITE_URL}/${slug}`;
}
