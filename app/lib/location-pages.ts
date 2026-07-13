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
    title: "Foot Health Practitioner in Cotham, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Cotham, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care in Cotham, including residential streets around Cotham Hill, Cotham Brow and Hampton Road. Routine appointments can help with toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits may suit people who find Cotham’s hills, parking or public transport awkward, as well as relatives arranging care for someone at home. The area links naturally with Clifton, Redland and Bishopston, so nearby patients can enquire with their postcode. Please provide any entry, steps or parking details when booking.",
    localCoverage:
      "Foot+ provides home visits across Cotham, including Cotham Hill, Cotham Brow, Hampton Road and nearby parts of Kingsdown.",
    localAccessNote:
      "For shared houses, flats or hillside streets, please provide entry details and any practical parking notes before the appointment.",
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
        question: "Do you cover Cotham Hill and nearby Kingsdown?",
        answer:
          "Yes. Foot+ covers Cotham and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question:
          "Can appointments take place in student or shared accommodation in Cotham?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Cotham.",
      },
      {
        question: "Can I book without a referral?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What if walking to a clinic is difficult around Cotham?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Cotham, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Cotham. View routine foot care services, prices and booking options for local appointments.",
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
    title: "Foot Health Practitioner in Bishopston, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Bishopston, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides mobile foot-health appointments across Bishopston, including residential areas around Gloucester Road, Bishop Road and Ashley Down. Home visits are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. They can be useful for people who find travelling along busy local routes inconvenient, have reduced mobility, or prefer care at home. Bishopston sits close to Redland and Cotham, and postcode details help confirm the best appointment plan. Please mention flats, steps or parking instructions when enquiring.",
    localCoverage:
      "Foot+ provides home visits across Bishopston, including streets around Gloucester Road, Bishop Road and Ashley Down.",
    localAccessNote:
      "Please share parking, intercom or stair details, especially for flats or homes on busier streets near Gloucester Road.",
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
        question: "Do you offer home foot care around Gloucester Road?",
        answer:
          "Yes. Foot+ covers Bishopston and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "Do you cover Ashley Down from the Bishopston page?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Bishopston.",
      },
      {
        question: "Can appointments work in Bishopston flats or shared houses?",
        answer:
          "Yes. A relative, carer or support worker can help enquire or be present, with appropriate consent from the person receiving care.",
      },
      {
        question: "What foot problems can Foot+ help with?",
        answer:
          "Foot+ will explain if a concern appears outside routine foot-health scope and advise seeking appropriate GP, podiatry, urgent or emergency care.",
      },
    ],
    metaTitle: "Foot Health Practitioner in Bishopston, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Bishopston. View routine foot care services, prices and booking options for local appointments.",
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
    title: "Foot Health Practitioner in Barton Hill, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Barton Hill, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Barton Hill, including areas around Barton Hill Road, Marsh Lane and Avonvale Road. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Easton, St Philips and Old Market.",
    localCoverage:
      "Foot+ provides home visits across Barton Hill, including areas around Barton Hill Road, Marsh Lane and Avonvale Road.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around Barton Hill Road?",
        answer:
          "Yes. Foot+ covers Barton Hill and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Barton Hill appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Barton Hill.",
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
    metaTitle: "Foot Health Practitioner in Barton Hill, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Barton Hill. View routine foot care services, prices and booking options for local appointments.",
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
    title: "Foot Health Practitioner in Southville, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Southville, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Southville, including areas around North Street, Greville Smyth Park and Coronation Road. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Bedminster and Totterdown.",
    localCoverage:
      "Foot+ provides home visits across Southville, including areas around North Street, Greville Smyth Park and Coronation Road.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around North Street?",
        answer:
          "Yes. Foot+ covers Southville and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Southville appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Southville.",
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
    metaTitle: "Foot Health Practitioner in Southville, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Southville. View routine foot care services, prices and booking options for local appointments.",
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
    title: "Foot Health Practitioner in Bedminster, Bristol",
    description:
      "Foot+ provides home-visit nail and skin care across Bedminster, including routine foot care, hard skin, corn care and diabetic foot checks.",
    intro:
      "Foot+ provides home-visit foot care across Bedminster, including areas around East Street, Bedminster Parade and West Street. Appointments are available for routine toenail care, thickened nails, hard skin, calluses, corns where suitable, cracked heels and diabetic foot checks. Home visits can be helpful for people who find travelling, parking or walking to appointments difficult, and for residents who prefer practical foot care in familiar surroundings. Please include the appointment postcode and any access notes when enquiring so Foot+ can plan the visit. Foot+ also covers nearby Southville and Totterdown.",
    localCoverage:
      "Foot+ provides home visits across Bedminster, including areas around East Street, Bedminster Parade and West Street.",
    localAccessNote:
      "Please share parking, steps, entry-system or lift information when enquiring so the home visit can be planned around local access needs.",
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
        question: "Do you provide home visits around East Street?",
        answer:
          "Yes. Foot+ covers Bedminster and nearby Bristol areas. Please include your postcode so current home-visit availability can be confirmed.",
      },
      {
        question: "What access information helps for Bedminster appointments?",
        answer:
          "Please provide parking, stairs, lift access, intercom, entry instructions or any other detail that may affect a home visit in Bedminster.",
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
    metaTitle: "Foot Health Practitioner in Bedminster, Bristol",
    metaDescription:
      "Foot+ provides home-visit nail and skin care across Bedminster. View routine foot care services, prices and booking options for local appointments.",
  },
];

export function getLocationPage(slug: string) {
  return locationPages.find((p) => p.slug === slug);
}
export function locationCanonical(slug: string) {
  return `${SITE_URL}/${slug}`;
}
