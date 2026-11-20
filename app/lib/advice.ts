import type { Metadata } from "next";
import {
  ADVICE_SOCIAL_IMAGE,
  ADVICE_SOCIAL_IMAGE_METADATA,
  SITE_URL,
  ADAM_ID,
} from "./site";

export type AdviceLink = { href: string; label: string; kind?: "service" | "article" | "book" | "pricing" | "areas" | "about" | "forms" };
export type AdviceSubsection = { heading: string; body?: string[]; list?: string[]; afterList?: string[] };
export type AdviceSection = {
  heading: string; body: string[]; list?: string[]; subsections?: AdviceSubsection[]; links?: AdviceLink[];
  /** Short label for the article's "jump to" bar. Defaults to the heading. */
  navLabel?: string;
  /** "warning" marks safety sections (who shouldn't, when to get help) in amber. */
  tone?: "warning";
};
export type AdviceArticle = {
  slug: string; title: string; shortTitle: string; seoTitle?: string; description: string; category: string; authorId: "adam-james";
  datePublished: string; dateModified: string; isPublished: boolean; approvalStatus: "approved" | "awaiting_adam_confirmation"; readingTime: string; wordCount: number;
  intro: string; introAdditional?: string[]; inBrief: string[]; sections: AdviceSection[]; practitionerView: string; disclaimer?: string; relatedServiceRoutes: AdviceLink[];
  relatedArticleSlugs: string[]; callToAction?: string; references: { label: string; url: string }[]; faqs: { question: string; answer: string }[];
};

const d = "2026-07-13";
export const adviceArticles: AdviceArticle[] = [
  {
  "slug": "thickened-toenails-causes-treatment-and-when-to-worry",
  "title": "Thickened Toenails: Causes, Treatment and When to Worry",
  "shortTitle": "Thickened toenails: causes and treatment",
  "seoTitle": "Thick Toenails: Why They Thicken and When to Worry | Foot+",
  "description": "Why toenails, often the big toe, become thick or discoloured, whether it's always fungal, how they're managed and when a thick nail needs checking.",
  "category": "Nail care",
  "authorId": "adam-james",
  "datePublished": "2026-07-30",
  "dateModified": "2026-11-20",
  "isPublished": true,
  "approvalStatus": "approved",
  "readingTime": "4 min read",
  "wordCount": 753,
  "intro": "Usually pressure, an old injury, age or a fungal infection, and the big toe is affected most. Not every thick or discoloured nail is fungal, so a painful or unexplained change is worth getting checked.",
  "inBrief": [],
  "sections": [
    {
      "heading": "What causes toenails to become thick?",
      "navLabel": "Causes",
      "body": [],
      "subsections": [
        {
          "heading": "Pressure or injury",
          "body": [
            "The most common cause: damage to the area that grows the nail. It can follow one knock, or years of tight or shallow shoes, toes hitting the front of a shoe, running or walking, toe shape or pressure from a neighbouring toe. The big toenail is affected most because it takes the most pressure, and it can stay thick after the injury has healed."
          ]
        },
        {
          "heading": "Fungal infection",
          "body": [
            "Can make a nail thick, discoloured, brittle or crumbly. A pharmacist or GP may suggest testing before some treatments."
          ]
        },
        {
          "heading": "Age",
          "body": [
            "Nails grow more slowly with age and can become harder and thicker. Still get a nail checked if the change is painful, sudden or affects only one nail."
          ]
        },
        {
          "heading": "Skin conditions",
          "body": [
            "Psoriasis and some forms of dermatitis can thicken, ridge, pit, crumble or lift a nail, and can look like a fungal infection."
          ]
        },
        {
          "heading": "Circulation and general health",
          "body": [
            "Changes in circulation, sensation, mobility or general health can affect how nails grow and make them harder to look after."
          ]
        }
      ]
    },
    {
      "heading": "Are thickened toenails always fungal?",
      "navLabel": "Always fungal?",
      "body": [
        "No. Injury, shoe pressure, age and skin conditions such as psoriasis can look just the same. Antifungal treatment won't help if the cause isn't fungal, so it's worth knowing the cause first."
      ]
    },
    {
      "heading": "Can you cut a thickened toenail yourself?",
      "navLabel": "Cutting it",
      "tone": "warning",
      "body": [
        "If you have diabetes, poor circulation, reduced feeling or a weakened immune system, don't reduce a thick nail yourself. Ask your GP practice or diabetes team about NHS podiatry, and tell any foot-care provider about these conditions.",
        "Otherwise, a mildly thick nail can often be managed at home if you can see and reach your feet safely:"
      ],
      "list": [
        "Trim after a bath, when the nail is softer",
        "Take small amounts, not the full thickness at once",
        "Don't force clippers through a nail that's too hard",
        "File gently rather than trying to thin it a lot",
        "Never use knives, blades, power tools or household tools",
        "Stop if it causes pain, bleeding or broken skin"
      ],
      "links": [
        {
          "href": "/advice/why-toenails-are-difficult-to-cut",
          "label": "Cutting toenails safely",
          "kind": "article"
        }
      ]
    },
    {
      "heading": "How are thickened toenails treated?",
      "navLabel": "Treatment",
      "body": [],
      "subsections": [
        {
          "heading": "Nail reduction",
          "body": [
            "A Foot Health Practitioner can carefully reduce the thickness, so the nail is more comfortable in shoes and easier to look after. It manages the nail but may not change how it grows."
          ]
        },
        {
          "heading": "Footwear",
          "body": [
            "Shoes with enough depth and width at the toes, and a secure fastening, take the pressure off the nail."
          ]
        },
        {
          "heading": "Antifungal treatment",
          "body": [
            "If infection is suspected or confirmed, nail treatments or prescription tablets may help. They take months because toenails grow slowly, and tablets aren't suitable for everyone and must be prescribed."
          ]
        },
        {
          "heading": "The underlying cause",
          "body": [
            "Easing repeated pressure, or managing a health condition that's contributing, can help prevent further damage."
          ]
        }
      ],
      "links": [
        {
          "href": "/toenail-cutting-bristol",
          "label": "Toenail cutting at home in Bristol",
          "kind": "service"
        },
        {
          "href": "/prices",
          "label": "Prices",
          "kind": "pricing"
        }
      ]
    },
    {
      "heading": "When should you seek professional advice?",
      "navLabel": "Get it checked",
      "tone": "warning",
      "body": [
        "Arrange an assessment if:"
      ],
      "list": [
        "The nail is too thick or hard to cut safely",
        "It's painful or presses on your shoes",
        "It has changed colour, shape or thickness without a clear reason, or several nails are changing",
        "The skin around it is red, swollen, hot or producing discharge, or there's bleeding or broken skin",
        "It has lifted well away from the nail bed",
        "It's getting worse, or home treatment hasn't helped",
        "You're not sure whether it's fungal",
        "You have diabetes, reduced circulation or reduced feeling"
      ]
    },
    {
      "heading": "Symptoms needing prompt medical advice",
      "navLabel": "Urgent signs",
      "tone": "warning",
      "body": [
        "Seek prompt medical advice for spreading redness, significant swelling, severe pain, pus, fever or quickly worsening symptoms.",
        "A dark mark under a nail that didn't follow an injury, doesn't grow out with the nail, or spreads onto the skin around it should be checked promptly by a GP or dermatologist."
      ]
    }
  ],
  "practitionerView": "A thick or discoloured nail shouldn't automatically be treated as fungal. We can reduce it, ease the pressure and tell you when a pharmacist, GP, podiatrist or dermatologist is the better route.",
  "relatedServiceRoutes": [
    {
      "href": "/toenail-cutting-bristol",
      "label": "Toenail cutting in Bristol",
      "kind": "service"
    },
    {
      "href": "/services",
      "label": "Foot+ services",
      "kind": "service"
    },
    {
      "href": "/book",
      "label": "Book an appointment",
      "kind": "book"
    }
  ],
  "relatedArticleSlugs": [
    "why-toenails-are-difficult-to-cut",
    "how-often-older-adults-should-cut-toenails",
    "what-happens-home-foot-health-appointment"
  ],
  "references": [
    {
      "label": "NHS: Nail problems",
      "url": "https://www.nhs.uk/conditions/nail-problems/"
    },
    {
      "label": "NHS: Fungal nail infection",
      "url": "https://www.nhs.uk/conditions/fungal-nail-infection/"
    },
    {
      "label": "NHS: Foot problems and the podiatrist",
      "url": "https://www.nhs.uk/conditions/foot-problems-and-the-podiatrist/"
    }
  ],
  "faqs": [
    {
      "question": "Can a thick toenail go back to normal?",
      "answer": "It depends on the cause. After a one-off injury or a treated infection, it may improve as healthy nail grows. If the growing area is permanently damaged, it may stay thick, but regular care keeps it comfortable."
    },
    {
      "question": "Is a yellow toenail always fungal?",
      "answer": "No. Injury, age, nail products, pressure and some skin or health conditions can also turn a nail yellow."
    },
    {
      "question": "How long does a toenail take to grow out?",
      "answer": "Many months, from base to tip, and it varies from person to person."
    },
    {
      "question": "Can Foot+ cure thick toenails?",
      "answer": "We reduce and look after thick nails to keep them comfortable. We don't diagnose fungal infection, skin disease, circulation problems or nail cancer, and we'll tell you when a pharmacist, GP, podiatrist or dermatologist is better placed to help."
    }
  ]
},
  {
    slug: "why-does-my-heel-hurt-when-i-get-out-of-bed",
    title: "Why Does My Heel Hurt When I Get Out of Bed?",
    shortTitle: "Why does my heel hurt in the morning?",
    seoTitle: "Why Does My Heel Hurt When I Get Out of Bed? | Foot Plus",
    description: "Sharp heel pain with your first steps in the morning? Learn the common causes, home treatments and when to seek professional advice from Foot Plus.",
    category: "Heel pain",
    authorId: "adam-james",
    datePublished: "2026-07-30",
    dateModified: "2026-11-09",
    isPublished: true,
    approvalStatus: "approved",
    readingTime: "6 min read",
    wordCount: 970,
    intro: "One of the most common questions we hear is: “Why is the pain so bad when I take my first few steps in the morning?”",
    introAdditional: ["If you have ever stepped out of bed and felt a sharp pain underneath your heel, you are not alone. This pattern is commonly associated with plantar fasciitis, one of the most frequent causes of heel pain."],
    inBrief: [
      "Morning heel pain is commonly associated with plantar fasciitis, although heel pain can have other causes.",
      "Supportive footwear, activity adjustments and gentle stretching can help in many cases.",
      "Seek an assessment when pain is severe, persistent or affecting normal walking, or when warning signs are present."
    ],
    sections: [
      { heading: "What is plantar fasciitis?", body: ["The plantar fascia is a strong band of tissue that runs from the heel towards the toes. It supports the arch of the foot and helps absorb force when you stand and walk.", "Plantar fasciitis develops when this tissue becomes irritated or overloaded. The symptoms may appear gradually, particularly following a change in activity, footwear or the amount of time spent standing."] },
      { heading: "Why is the pain worse in the morning?", body: ["While you are resting or sleeping, the plantar fascia is not being stretched in the same way as it is during walking.", "When you stand up and take your first few steps, the tissue is suddenly placed under tension again. This can produce a sharp or pulling pain underneath the heel.", "The discomfort may ease after walking for a few minutes, but it can return following another period of rest or after prolonged activity."] },
      { heading: "Common symptoms", body: ["Symptoms can include:"], list: ["Sharp or aching pain underneath the heel", "Pain during the first few steps after getting out of bed", "Pain after sitting for a prolonged period", "Discomfort that eases with movement but returns later", "Tenderness around the underside or inner edge of the heel", "Increased pain after prolonged standing, walking or exercise",], subsections: [{ heading: "Other possible causes", body: ["Not every case of heel pain is plantar fasciitis. Other possible causes include Achilles tendon problems, bursitis, nerve irritation, heel-pad pain and, less commonly, a stress fracture."] }] },
      { heading: "What can contribute to plantar fasciitis?", body: ["Several factors can increase strain through the plantar fascia:"], list: ["A recent increase in walking, running or exercise", "Spending long periods standing", "Unsupportive or worn footwear", "Walking barefoot on hard floors", "Tight calf muscles", "Changes in body weight", "Flat feet or particularly high arches", "Reduced ankle flexibility"], subsections: [{ heading: "Several factors may be involved", body: ["Often, more than one factor is involved."] }] },
      { heading: "What can you do at home?", body: ["Many cases improve with sensible changes, although recovery can take time."], subsections: [
        { heading: "Wear supportive footwear", body: ["Choose footwear with:"], list: ["Cushioning beneath the heel", "A stable sole", "Secure fastening", "Suitable arch support", "Enough width for the foot"], afterList: ["Worn trainers, very flat shoes and loose backless footwear may aggravate symptoms for some people."] },
        { heading: "Avoid walking barefoot on hard floors", body: ["Walking barefoot on hard kitchen or bathroom floors can increase pressure through the heel. Supportive indoor footwear may be more comfortable while symptoms settle."] },
        { heading: "Stretch the calves gently", body: ["Tight calf muscles can increase tension through the heel and plantar fascia.", "Gentle calf stretches may help, but they should not cause sharp pain. Stop if a stretch significantly increases your symptoms."] },
        { heading: "Adjust aggravating activities", body: ["Temporarily reduce activities that repeatedly worsen the pain. This does not necessarily mean complete rest, but the foot may benefit from a more gradual return to longer walks, running or prolonged standing."] },
        { heading: "Use a cold compress", body: ["NHS guidance suggests an ice pack, or a bag of frozen peas wrapped in a towel, on the painful area for up to 20 minutes every 2 to 3 hours. Do not apply ice directly to the skin.", "People with reduced sensation, poor circulation or certain medical conditions should seek professional advice before using cold therapy."] }
      ] },
      { heading: "When should you seek professional advice?", body: ["Arrange an assessment if:"], list: ["The pain is severe or getting worse", "You are struggling to walk normally", "Symptoms have not improved after 2 weeks of self-care", "The pain began after an injury", "There is significant swelling, redness or warmth", "You experience numbness, tingling or burning", "You have diabetes, poor circulation or reduced sensation", "The pain is affecting sleep or normal daily activities"], subsections: [{ heading: "When to seek prompt assessment", body: ["Sudden severe pain, an inability to bear weight or marked swelling following an injury should be assessed promptly."] }] },
      { heading: "How can a Foot Health Practitioner help?", body: ["A Foot Health Practitioner can discuss your symptoms, examine the foot and identify factors that may be contributing to the discomfort.", "Depending on the findings, support may include:"], list: ["Footwear advice", "Advice on pressure reduction", "Padding or insoles where appropriate", "Guidance on foot and calf stretches", "Management of painful callus or other contributing foot problems", "Referral to a GP, podiatrist or another healthcare professional when required"], subsections: [{ heading: "When referral may be needed", body: ["A Foot Health Practitioner cannot confirm every possible cause of heel pain, so referral may be recommended if the symptoms require further investigation."] }] },
      { heading: "Final thoughts", body: ["Most morning heel pain settles with patience and small changes to footwear, activity and stretching, but pain that lingers deserves a proper look.", "If it is severe, has not eased after 2 weeks of self-care, or is changing the way you walk, arrange an assessment rather than waiting for it to resolve on its own."] }
    ],
    practitionerView: "Morning heel pain often reflects a combination of factors rather than one isolated issue. An assessment can help identify practical changes and whether referral for further investigation is appropriate.",
    disclaimer: "This article provides general information and is not a substitute for individual medical advice, diagnosis or treatment.",
    relatedServiceRoutes: [{ href: "/services", label: "Foot+ services", kind: "service" }, { href: "/", label: "Foot Health Practitioner Bristol", kind: "service" }, { href: "/book", label: "Book an appointment", kind: "book" }],
    relatedArticleSlugs: ["maintain-good-foot-health", "foot-health-practitioner-podiatrist-or-chiropodist"],
    references: [
      { label: "NHS: Heel pain", url: "https://www.nhs.uk/conditions/heel-pain/" },
      { label: "NHS: Plantar fasciitis", url: "https://www.nhs.uk/conditions/plantar-fasciitis/" }
    ],
    faqs: [
      { question: "Why does my heel hurt with my first steps in the morning?", answer: "After rest, the plantar fascia is suddenly placed under tension when you stand. This pattern is commonly associated with plantar fasciitis, but heel pain can have other causes." },
      { question: "When should morning heel pain be assessed?", answer: "See a GP if pain is severe or worsening, has not improved after 2 weeks of self-care, causes tingling or numbness, or if you have diabetes. Seek prompt assessment after an injury if you cannot bear weight or have marked swelling." }
    ]
  },
  { slug:"maintain-good-foot-health", title:"How to Maintain Good Foot Health", shortTitle:"Maintain good foot health", seoTitle:"How to Maintain Good Foot Health | Foot+ Bristol", description:"Simple everyday foot-care habits for checking, washing, moisturising, nail cutting, hard skin and knowing when to ask for professional advice.", category:"Everyday foot care", authorId:"adam-james", datePublished:"2026-07-17", dateModified:"2026-11-09", isPublished:true, approvalStatus:"approved", readingTime:"4 min read", wordCount:800, intro:"Good foot health is built from small, regular habits: checking your skin, keeping feet clean and dry, moisturising safely, trimming nails carefully and acting early when something changes. This guide adapts NHS patient information into practical advice for routine home foot care.", inBrief:["Check the tops, soles and between toes regularly for cuts, blisters, wounds, bruising, pain or changes.","Wash feet daily, dry carefully between the toes, and avoid long soaking that can soften the skin too much.","Use moisturiser on the tops and bottoms of feet, but avoid putting cream between toes; seek medical advice for infection signs, wounds or diabetic foot concerns."], sections:[
    {heading:"Check your feet regularly", body:["Look at the tops and bottoms of both feet and between the toes. Notice cuts, scratches, bruises, blisters, wounds, painful areas, colour change, swelling or anything that is new for you.","If bending is difficult, use a mirror, place your feet safely on a chair, or ask someone you trust to help. Regular checks are especially important if eyesight, sensation, circulation, mobility or diabetes makes small problems harder to spot." ]},
    {heading:"Wash and dry carefully", body:["Wash your feet every day with soap and water. A shower, bath or clean bowl can all work as long as you can do it safely and avoid slips.","Clean around the toenails gently rather than digging under them. Avoid soaking feet for long periods; prolonged soaking can soften skin and make it more vulnerable. Dry thoroughly with a clean towel, including between every toe." ]},
    {heading:"Manage moisture between toes", body:["Damp skin between toes can become white, fragile and more prone to soreness or smell. After washing, take time to dry between the toes rather than quickly pulling socks back on.","If sweaty feet are a regular problem, breathable socks, alternating shoes and allowing footwear to dry between wears may help. If skin is cracked, itchy, weeping or sore, ask a pharmacist, GP or podiatrist for advice rather than self-treating repeatedly." ]},
    {heading:"Moisturise the right areas", body:["Dry skin and heel callus often improve with consistent moisturising. A urea-based foot cream may be useful for some people, but the right strength depends on your skin and health needs, so ask a pharmacist or clinician if you are unsure.","Apply cream to the tops and bottoms of the feet, then wait for it to absorb before walking because feet may be slippery. Avoid putting moisturiser between the toes, where extra moisture can encourage maceration."], links:[{href:"/hard-skin-and-callus",label:"hard-skin treatment at home",kind:"service"},{href:"/cracked-heels",label:"cracked heel care",kind:"service"}]},
    {heading:"Cut toenails safely", body:["Trim toenails in good light when you can see and reach comfortably, take small amounts at a time and smooth sharp edges with a file. Do not cut nails very short, tear them or cut down the sides.","How often nails need cutting varies from person to person. If reaching, seeing or cutting your nails has become difficult, or a nail is thick, routine professional nail care may be safer than forcing it."], links:[{href:"/advice/why-toenails-are-difficult-to-cut",label:"safe toenail cutting at home",kind:"article"},{href:"/advice/how-often-older-adults-should-cut-toenails",label:"how often toenails need cutting",kind:"article"},{href:"/toenail-cutting-bristol",label:"toenail-cutting home visits",kind:"service"}]},
    {heading:"Look after hard skin without cutting it", body:["Small areas of hard skin can sometimes be gently filed when the skin is dry. Keep the pressure light, stop if the skin becomes sore, and do not use blades or corn knives at home.","If you have diabetes, poor circulation or reduced feeling in your feet, do not file or treat hard skin yourself. Small injuries can be harder to notice and slower to heal, so ask your GP practice, diabetes team or a podiatrist for advice first.","Hard skin usually returns while pressure or friction continues, so footwear and regular moisturising matter as much as occasional filing."], links:[{href:"/advice/hard-skin-on-feet",label:"hard skin: causes, prevention and treatment",kind:"article"},{href:"/hard-skin-and-callus",label:"callus reduction",kind:"service"}]},
    {heading:"Choose supportive footwear", body:["Shoes should support the foot, leave enough room for the toes and avoid rubbing. Check inside shoes for seams, stones, rough patches or worn areas that could irritate skin.","Socks should be clean, dry and comfortable. If a particular pair of shoes repeatedly causes blisters, pressure marks, corns or nail pain, changing footwear may be part of maintaining foot health." ]},
    {heading:"When to ask for help", body:["Seek appropriate medical or podiatry advice for wounds, spreading redness, heat, swelling, discharge, increasing pain, sudden colour or temperature change, new numbness, severe pain or diabetic foot concerns.","A routine Foot Health Practitioner appointment may help with nail care, hard skin, callus, suitable corn care, cracked heel maintenance and practical advice. If your concern appears outside routine scope, Foot+ will advise you to contact the right professional service."], links:[{href:"/services",label:"view Foot+ services",kind:"service"},{href:"/book",label:"book routine foot care",kind:"book"}]}
  ], practitionerView:"Adam’s practical view: the best foot-care routine is simple enough to keep doing. Regular checks, clean dry skin, safe moisturising, sensible nail care and prompt help for warning signs can prevent small concerns becoming harder to manage.", relatedServiceRoutes:[{href:"/services",label:"All Foot+ services",kind:"service"},{href:"/toenail-cutting-bristol",label:"Toenail cutting",kind:"service"},{href:"/hard-skin-and-callus",label:"Hard-skin treatment",kind:"service"},{href:"/cracked-heels",label:"Cracked heel care",kind:"service"},{href:"/book",label:"Book an appointment",kind:"book"}], relatedArticleSlugs:["why-toenails-are-difficult-to-cut","hard-skin-on-feet","what-happens-home-foot-health-appointment"], references:[{label:"Guy's and St Thomas' NHS Foundation Trust: Caring for your feet and toenails",url:"https://www.guysandstthomas.nhs.uk/health-information/caring-your-feet-and-toenails"},{label:"NHS: Foot problems and the podiatrist",url:"https://www.nhs.uk/conditions/foot-problems-and-the-podiatrist/"},{label:"Diabetes UK: Checking your feet",url:"https://www.diabetes.org.uk/guide-to-diabetes/complications/feet/checking-your-feet"}], faqs:[{question:"How often should I check my feet?",answer:"Check regularly, and more often if you have diabetes, reduced sensation, circulation concerns or a history of wounds. Look at the tops, soles and between toes. If you have diabetes, check your feet every day and make sure you have the annual foot check offered through your GP practice or diabetes team."},{question:"Should I put cream between my toes?",answer:"No. Moisturise the tops and bottoms of feet, but avoid cream between toes because extra moisture can make skin fragile."},{question:"Can Foot+ help me maintain my feet?",answer:"Where suitable, Foot+ can provide routine nail care, hard-skin and callus care, cracked heel maintenance and practical advice during home visits."}]},
  { slug:"corn-callus-or-verruca", title:"Corn, Callus or Verruca: How Can You Tell the Difference?", shortTitle:"Corn, callus or verruca", description:"Learn the broad differences between corns, callus and verrucae, why online self-diagnosis can be unreliable, and when routine foot care may help.", category:"Skin and hard skin", authorId:"adam-james", datePublished:d, dateModified:"2026-11-09", isPublished:true, approvalStatus:"approved", readingTime:"4 min read", wordCount:700, intro:"Corns, callus and verrucae can all appear as small areas of hard or changed skin on the foot, but they are not the same thing. This guide explains common differences in plain language without attempting to diagnose your foot online.", inBrief:["Corns and callus are usually linked with pressure or friction.","A verruca is a type of wart caused by a virus. It needs different care from a corn or hard skin, and Foot+ can treat it at a home visit where suitable.","Do not cut uncertain lesions yourself, especially if you have diabetes, reduced sensation, poor circulation, broken skin or pain."], sections:[
    {heading:"What is a corn?", body:["A corn is a small, concentrated area of thickened skin that forms over a pressure point. Hard corns usually appear on the top or tip of a toe or under the ball of the foot, and may feel like a small plug or pebble when you walk.","Soft corns usually form between the toes, where sweat keeps the skin moist. They are whitish and rubbery rather than hard, and can be mistaken for athlete's foot or simply sore skin.","Corns are commonly linked with pressure from footwear, toe shape, joint position or repeated rubbing. Routine corn care may help reduce discomfort where the concern is suitable for a Foot Health Practitioner appointment."], links:[{href:"/corn-treatment",label:"corn care appointments",kind:"service"}]},
    {heading:"What is a callus?", body:["Callus is a broader, flatter patch of hard skin, often on the heels or the balls of the feet, where the skin is protecting itself from repeated pressure, rubbing or shear. Why it forms, how to manage it and how to stop it building up again are covered in the hard-skin guide."], links:[{href:"/advice/hard-skin-on-feet",label:"hard skin and callus: causes, prevention and treatment",kind:"article"},{href:"/hard-skin-and-callus",label:"callus reduction during home visits",kind:"service"}]},
    {heading:"What is a verruca?", body:["A verruca is a wart on the foot. Verrucae are associated with human papillomavirus infection and can sometimes have tiny dark dots, interrupted skin lines or tenderness when squeezed from side to side.","This guide cannot tell you whether an area is a verruca. If you think it may be, Foot+ can look at it during a home visit and treat it where suitable. A pharmacist can also advise on over-the-counter options." ]},
    {heading:"Key differences", body:["Corns tend to be more focal and pressure-related. Callus is usually broader and linked with repeated friction or load. Verrucae may disrupt normal skin lines and can look different from ordinary hard skin.","These signs overlap. A painful area under the foot is not automatically a corn, and an area with hard skin is not automatically callus." ]},
    {heading:"Why self-diagnosis can be difficult", body:["Lighting, skin thickness, footwear history and exact pain pattern all affect interpretation. Online photographs and descriptions cannot replace looking at the foot in context.","This is particularly important if you have diabetes, reduced sensation, circulation concerns, immune suppression, a wound or unexplained changes." ]},
    {heading:"What not to cut or treat yourself", body:["Do not use blades, scalpels, corn knives or strong acids on uncertain areas. Avoid digging into painful hard skin or cutting anything that bleeds, changes quickly or has broken skin around it.","Over-the-counter products may not be suitable for everyone. Ask a pharmacist or clinician if you are unsure." ]},
    {heading:"When a Foot Health Practitioner may help", body:["A Foot Health Practitioner may help with routine pressure-related corns, hard skin and callus where the concern is within scope. The appointment can include conservative reduction and practical advice about footwear, moisturising and maintenance.","If the area looks outside routine foot-care scope, Adam will advise you to seek the appropriate professional support."], links:[{href:"/services",label:"view Foot+ routine foot-care services",kind:"service"},{href:"/book",label:"book a Foot+ home appointment",kind:"book"}]},
    {heading:"When another professional may be more appropriate", body:["A podiatrist, pharmacist or GP may be more appropriate for wounds, infection, sudden severe pain, spreading redness, unexplained bleeding, or symptoms linked with diabetes or circulation concerns.","Urgent symptoms should be assessed through the appropriate NHS route rather than waiting for routine foot care." ]}
  ], practitionerView:"Adam’s practical view: pressure-related hard skin is often part of a wider pattern involving footwear, mobility and how weight moves through the foot. The aim of routine care is comfort, safer reduction where appropriate, and clear advice about when another professional is needed.", relatedServiceRoutes:[{href:"/corn-treatment",label:"Corn removal and care",kind:"service"},{href:"/hard-skin-and-callus",label:"Callus reduction",kind:"service"},{href:"/services",label:"All Foot+ services",kind:"service"},{href:"/book",label:"Book an appointment",kind:"book"}], relatedArticleSlugs:["hard-skin-on-feet","foot-health-practitioner-podiatrist-or-chiropodist"], references:[{label:"NHS: Warts and verrucas",url:"https://www.nhs.uk/conditions/warts-and-verrucas/"},{label:"NHS: Corns and calluses",url:"https://www.nhs.uk/conditions/corns-and-calluses/"}], faqs:[{question:"Can Foot+ diagnose a verruca from a photo?",answer:"No. This guide is general information and does not diagnose from photographs or descriptions."},{question:"Should I cut a corn out myself?",answer:"No. Cutting into painful or uncertain skin can cause injury, especially for people with diabetes, reduced sensation or circulation concerns."}]},
  { slug:"how-often-older-adults-should-cut-toenails", title:"How Often Should Older Adults Have Their Toenails Cut?", shortTitle:"Toenail cutting for older adults", seoTitle:"Toenail Cutting for the Elderly: How Often? | Foot+", description:"How often elderly people need their toenails cut, why it varies and the signs care is needed sooner. Practical advice for families and carers.", category:"Foot care for older adults", authorId:"adam-james", datePublished:d, dateModified:"2026-11-09", isPublished:true, approvalStatus:"approved", readingTime:"3 min read", wordCount:482, intro:"There is no single toenail-cutting schedule that suits every older adult. Nail growth, comfort, mobility, eyesight, dexterity and health needs all affect timing.", inBrief:["Many people arrange routine care at intervals that reflect their nail growth, comfort, mobility and individual foot-health needs.","Care may be needed sooner if nails press into shoes, snag, curve into skin or become painful.","Home visits can help when travelling to a clinic is difficult."], sections:[{heading:"Why nail-care needs vary",body:["Two people of the same age may need very different nail-care routines. Some nails grow quickly and stay easy to cut; others become thick, curved or hard to reach.","A fixed schedule should not replace individual judgement about comfort and safety." ]},{heading:"Factors affecting nail growth",body:["Nail growth can be influenced by age, circulation, footwear, activity levels, previous injury and general health. Seasonal footwear changes can also affect comfort.","The goal is not to cut as often as possible, but to keep nails at a safe, comfortable length." ]},{heading:"When cutting your own nails gets harder",body:["Reach, eyesight and hand strength often change before the nails themselves do. When home cutting starts to feel awkward or unsafe, nails tend to be left longer between trims, so arranging routine support at a regular interval may be more sensible than waiting until they become uncomfortable."],links:[{href:"/advice/why-toenails-are-difficult-to-cut",label:"why toenails become difficult to cut",kind:"article"}]},{heading:"Thick or curved nails",body:["Thickened, curved or involuted nails often need attention more regularly, because they press on footwear or neighbouring skin sooner. They may need professional equipment and a careful approach rather than home cutting.","Routine appointments can help manage length and pressure, while concerns outside routine care may need podiatry or GP input."],links:[{href:"/advice/thickened-toenails-causes-treatment-and-when-to-worry",label:"thickened toenails: causes and treatment",kind:"article"},{href:"/toenail-cutting-bristol",label:"routine toenail-cutting home visits",kind:"service"}]},{heading:"General appointment intervals",body:["Many people arrange routine care at intervals that reflect their nail growth, comfort, mobility and individual foot-health needs. For some this is several weeks; for others it may be longer.","Adam can discuss a sensible maintenance pattern after seeing how your nails grow between appointments." ]},{heading:"Signs care may be needed sooner",body:["Consider arranging care sooner if nails catch on socks, press into footwear, cause soreness, curve into neighbouring skin, or become too difficult to cut safely.","Seek appropriate medical advice for redness, swelling, discharge, wounds, sudden severe pain or diabetic foot concerns." ]},{heading:"When a family member may arrange an appointment",body:["A family member can help with an enquiry or practical arrangements, but the person receiving care should be involved and consent must be respected.","Home visits can be useful when transport, stairs, parking or clinic access would make routine care harder."],links:[{href:"/locations/bristol/areas-we-cover",label:"areas covered by Foot+ Bristol",kind:"areas"},{href:"/prices",label:"view appointment prices",kind:"pricing"},{href:"/book",label:"request a home appointment",kind:"book"}]}], practitionerView:"Adam’s practical view: the right interval is the one that keeps nails comfortable without letting them become a problem. Routine care should feel planned, not rushed by avoidable discomfort.", relatedServiceRoutes:[{href:"/toenail-cutting-bristol",label:"Toenail cutting",kind:"service"},{href:"/services",label:"Services",kind:"service"},{href:"/prices",label:"Pricing",kind:"pricing"},{href:"/locations/bristol/areas-we-cover",label:"Areas covered",kind:"areas"},{href:"/book",label:"Book",kind:"book"}], relatedArticleSlugs:["why-toenails-are-difficult-to-cut","thickened-toenails-causes-treatment-and-when-to-worry","what-happens-home-foot-health-appointment"], references:[{label:"Age UK: Looking after your feet",url:"https://www.ageuk.org.uk/information-advice/health-wellbeing/conditions-illnesses/foot-care/"},{label:"NHS: Foot problems and the podiatrist",url:"https://www.nhs.uk/conditions/foot-problems-and-the-podiatrist/"}], faqs:[{question:"Is every six weeks right for everyone?",answer:"Not necessarily. Six weeks is a commonly quoted interval, but some people's nails need attention sooner and others can comfortably go longer. The right interval depends on how quickly your nails grow, how thick or curved they are, and whether you can manage them safely between visits."},{question:"Can a relative book for a parent?",answer:"A relative can help enquire, but appropriate consent and practical details are still needed."}]},
  {
  "slug": "what-happens-home-foot-health-appointment",
  "title": "What Happens During a Home Foot Health Appointment?",
  "shortTitle": "Your home nail and foot-care appointment",
  "description": "What to expect from a Foot+ Bristol home visit: arranging your appointment, nail and skin care, prices and aftercare.",
  "category": "Home foot-care appointments",
  "authorId": "adam-james",
  "datePublished": "2026-07-13",
  "dateModified": "2026-10-07",
  "isPublished": true,
  "approvalStatus": "approved",
  "readingTime": "3 min read",
  "wordCount": 440,
  "intro": "A home foot-health appointment brings routine nail and skin care to a familiar setting. Here is what to expect when requesting a visit from Foot+ Bristol.",
  "inBrief": [
    "First appointments cost £60 and take approximately 60 minutes; routine visits for returning patients cost £55 and take approximately 45 minutes.",
    "Nail cutting can be your main reason for booking, with other suitable routine skin care included within the appointment.",
    "Coverage, suitability, availability and any travel supplement are confirmed before your visit."
  ],
  "sections": [
    {
      "heading": "Arranging your home visit",
      "body": [
        "Use the appointment enquiry page to share your postcode and the support you need. A relative or carer can help coordinate the visit, with appropriate consent from the person receiving care.",
        "Foot+ confirms coverage, suitability, availability and cost. Appointments are available in Bristol and Southampton."
      ],
      "links": [
        {
          "href": "/locations/bristol/areas-we-cover",
          "label": "Bristol areas covered",
          "kind": "areas"
        }
      ]
    },
    {
      "heading": "Preparing for your appointment",
      "body": [
        "Choose a comfortable place to sit where the practitioner can work around your feet. Tell Foot+ about stairs, parking, mobility needs or communication requirements when enquiring.",
        "Have relevant health and medication information available, and bring any questions about your nails or skin. The patient forms page explains the Bristol documentation."
      ],
      "links": [
        {
          "href": "/forms?location=bristol",
          "label": "Bristol patient information",
          "kind": "forms"
        }
      ]
    },
    {
      "heading": "Discussion and foot-health observations",
      "body": [
        "Adam discusses your needs and relevant health information before suitable care is provided. Care is explained and consent matters throughout; you can ask questions or request a pause.",
        "A first appointment allows time for assessment and treatment. Routine appointments focus on ongoing nail and skin care."
      ]
    },
    {
      "heading": "Nail and skin care at home",
      "body": [
        "Suitable care may include toenail trimming and filing, conservative reduction of thickened nails, hard-skin and callus reduction, corn care or cracked-heel maintenance. The exact care depends on your needs and suitability.",
        "Toenail cutting can be the main reason for a visit. You do not need to have another skin concern to request routine nail care. Adam uses sterile instruments and is insured and DBS checked."
      ],
      "links": [
        {
          "href": "/toenail-cutting-bristol",
          "label": "Toenail-cutting home visits in Bristol",
          "kind": "service"
        },
        {
          "href": "/services",
          "label": "All Foot+ services",
          "kind": "service"
        }
      ]
    },
    {
      "heading": "Aftercare and next steps",
      "body": [
        "Aftercare can include practical guidance on nail maintenance, footwear and moisturising. Follow-up timing reflects nail growth, comfort and your individual needs.",
        "Foot+ provides routine care rather than emergency treatment or diagnosis of complex conditions. If a concern falls outside scope, Adam will explain when podiatry or medical assessment is appropriate."
      ],
      "links": [
        {
          "href": "/prices",
          "label": "Appointment prices",
          "kind": "pricing"
        }
      ]
    }
  ],
  "practitionerView": "A routine home visit should be clear, calm and respectful. Tell Foot+ what matters to you so the appointment can be planned around your needs.",
  "relatedServiceRoutes": [
    {
      "href": "/toenail-cutting-bristol",
      "label": "Bristol toenail cutting",
      "kind": "service"
    },
    {
      "href": "/prices",
      "label": "Prices",
      "kind": "pricing"
    },
    {
      "href": "/about",
      "label": "Meet your practitioner",
      "kind": "about"
    }
  ],
  "relatedArticleSlugs": [
    "how-often-older-adults-should-cut-toenails",
    "foot-care-learning-disabilities-bristol"
  ],
  "references": [],
  "faqs": [
    {
      "question": "Can I book mainly for nail cutting?",
      "answer": "Yes. Toenail cutting can be the main reason for a routine Foot+ visit. The practitioner checks suitability before care."
    },
    {
      "question": "Do I need to travel to a clinic?",
      "answer": "No. Foot+ provides home visits. Share your postcode so coverage can be confirmed."
    }
  ]
},
  { slug:"hard-skin-on-feet", title:"Hard Skin on Feet: Causes, Prevention and Professional Treatment", shortTitle:"Hard skin on feet", description:"A practical guide to hard skin on feet, including causes, prevention, safe home care and professional reduction without permanent-removal claims.", category:"Skin and hard skin", authorId:"adam-james", datePublished:d, dateModified:"2026-10-21", isPublished:true, approvalStatus:"approved", readingTime:"3 min read", wordCount:544, intro:"Hard skin is common on feet because they carry body weight and deal with repeated pressure. It can often be managed, but it may return if the underlying pressure remains.", inBrief:["Hard skin often develops in response to pressure, friction or shear.","Professional reduction can improve comfort where suitable, but hard skin may return.","Avoid blades, aggressive filing and strong chemicals, especially if you have diabetes or reduced sensation."], sections:[{heading:"What hard skin is",body:["Hard skin is thickened skin that forms as a protective response. On the feet it commonly appears on heels, the balls of the feet and areas that rub against footwear.","Callus is a common form of hard skin. It is not always painful, but it can become uncomfortable, split or build up around pressure points.","A small, focused painful spot may be a corn rather than general hard skin, and a verruca can look similar. If you are unsure which you have, see the guide to telling them apart."],links:[{href:"/advice/corn-callus-or-verruca",label:"corn, callus or verruca: how to tell the difference",kind:"article"}]},{heading:"Why hard skin develops",body:["Pressure, friction and shear are common reasons. Footwear, walking pattern, activity, dry skin and foot shape can all contribute.","Because the cause often continues, hard skin may gradually return after reduction." ]},{heading:"Footwear and walking patterns",body:["Shoes that are tight, loose, worn down or unsupportive can increase rubbing. Changes in mobility or gait can shift pressure to one area.","This guide does not diagnose gait problems, but it explains why the same patch may keep coming back." ]},{heading:"Safe home-care measures",body:["Moisturising regularly can help dry skin stay more comfortable. Gentle filing may be suitable for some people if the skin is intact and sensation is normal.","Stop if skin becomes sore. Do not file aggressively or try to remove all hard skin at once." ]},{heading:"What not to do",body:["Do not use razor blades, scalpels or corn knives on yourself. Avoid strong chemical products unless a pharmacist or clinician says they are suitable for you.","People with diabetes, reduced sensation, poor circulation, wounds or fragile skin should seek individual advice before self-treatment." ]},{heading:"Professional reduction and routine care",body:["Where suitable, Foot+ can provide professional hard-skin and callus reduction during a home appointment. The aim is comfort and safer maintenance, not a promise that hard skin will never return.","Adam may also discuss moisturising, footwear considerations and when further assessment is sensible."],links:[{href:"/hard-skin-and-callus",label:"professional hard-skin treatment",kind:"service"},{href:"/cracked-heels",label:"cracked heel maintenance",kind:"service"},{href:"/book",label:"book routine foot care",kind:"book"}]},{heading:"When hard skin requires further assessment",body:["Seek appropriate advice if hard skin is linked with a wound, bleeding, spreading redness, swelling, discharge, sudden severe pain or diabetic foot concerns.","A podiatrist or GP may be more appropriate if the issue needs diagnosis, wound care or regulated clinical assessment." ]},{heading:"Prevention and maintenance",body:["Prevention usually means reducing pressure where possible, keeping skin supple and arranging care before build-up becomes painful.","Maintenance plans should be realistic and individual rather than based on permanent-removal claims." ]}], practitionerView:"Adam’s practical view: hard skin often tells you where pressure is building. Routine care can make feet more comfortable, but prevention depends on understanding why that pressure keeps happening.", relatedServiceRoutes:[{href:"/hard-skin-and-callus",label:"Hard-skin treatment",kind:"service"},{href:"/cracked-heels",label:"Cracked heel care",kind:"service"},{href:"/services",label:"Services",kind:"service"},{href:"/book",label:"Book",kind:"book"}], relatedArticleSlugs:["corn-callus-or-verruca","what-happens-home-foot-health-appointment"], references:[{label:"NHS: Corns and calluses",url:"https://www.nhs.uk/conditions/corns-and-calluses/"},{label:"Diabetes UK: Checking your feet",url:"https://www.diabetes.org.uk/guide-to-diabetes/complications/feet/checking-your-feet"}], faqs:[{question:"Can hard skin be permanently removed?",answer:"Hard skin can often be reduced, but it may return if pressure or friction continues."},{question:"Is it safe to use a blade at home?",answer:"No. Cutting hard skin yourself can cause injury and is especially risky for people with diabetes, reduced sensation or circulation concerns."}]},
  { slug:"foot-health-practitioner-podiatrist-or-chiropodist", title:"Foot Health Practitioner, Podiatrist or Chiropodist: Who Should You See?", shortTitle:"FHP, podiatrist or chiropodist", description:"Understand the difference between a Foot Health Practitioner, podiatrist and chiropodist in the UK, including protected titles and routine-care boundaries.", category:"Choosing the right professional", authorId:"adam-james", datePublished:d, dateModified:d, isPublished:true, approvalStatus:"approved", readingTime:"9 min read", wordCount:1320, intro:"Choosing the right foot-care professional can be confusing. This guide explains the terms carefully so you can match routine care needs with the appropriate level of assessment.", inBrief:["Adam James is a Foot Health Practitioner, not a podiatrist or chiropodist.","Podiatrist and chiropodist are protected titles in the UK and require HCPC registration.","Routine foot care and regulated clinical assessment are not the same thing."], sections:[{heading:"What a Foot Health Practitioner does",body:["A Foot Health Practitioner commonly supports routine foot care such as nail cutting, thickened nail care, non-surgical ingrown toenail care, fungal nail care, hard-skin and callus reduction, corn care where suitable, cracked heel maintenance, verruca and athlete’s foot care, and practical foot-health advice.","Scope varies by training and individual competence. Foot+ pages describe Adam as a Foot Health Practitioner, MCFHP, MAFHP."],links:[{href:"/",label:"Foot Health Practitioner appointments in Bristol",kind:"service"}]},{heading:"What a podiatrist does",body:["A podiatrist is a regulated healthcare professional. In the UK, podiatrists must be registered with the Health and Care Professions Council to use the protected title.","Podiatrists may assess, diagnose and manage a wider range of foot and lower-limb conditions depending on their qualifications, setting and scope." ]},{heading:"What the term chiropodist means",body:["Chiropodist is also a protected title in the UK. The term is often used historically or interchangeably with podiatrist, but title use is regulated.","Foot+ does not describe Adam as a chiropodist." ]},{heading:"Protected professional titles",body:["The HCPC protects titles including podiatrist and chiropodist. This means people using those titles must meet regulatory requirements and be registered.","Foot Health Practitioner is not the same protected title. This distinction should be clear in marketing and patient information." ]},{heading:"Routine care versus clinical assessment",body:["Routine foot care focuses on practical maintenance and comfort where concerns are within scope. Clinical assessment may involve diagnosis, management of complex conditions, wound care, prescribing pathways or specialist services depending on the professional and setting.","Boundaries are not always absolute because individual qualifications vary, but protected-title and registration differences are important." ]},{heading:"Examples Foot+ may assist with",body:["Foot+ may assist with routine toenail cutting, thickened nail reduction, ingrown and fungal toenails, hard-skin and callus care, corn care where suitable, cracked heel maintenance, verrucas, athlete’s foot and home-visit support for adults who find travel difficult.","Use the services and pricing pages to decide whether the routine appointment offer matches your needs."],links:[{href:"/services",label:"view Foot+ services",kind:"service"},{href:"/prices",label:"view Foot+ pricing",kind:"pricing"},{href:"/about",label:"read about Adam James",kind:"about"}]},{heading:"When a podiatrist or GP may be more suitable",body:["A podiatrist or GP may be more suitable for diagnosis of complex or persistent pain, suspected infection, wounds, diabetic foot complications, sudden changes, significant circulation or sensation concerns, or problems needing regulated clinical assessment.","A pharmacist may also be suitable for some skin and nail concerns such as suspected fungal infection or verruca advice." ]},{heading:"Urgent warning signs",body:["Seek urgent medical support for spreading infection signs, an open wound, sudden severe pain, sudden colour change, significant bleeding, new loss of sensation or acute diabetes-related foot concerns.","Do not wait for a routine home foot-care appointment if symptoms appear urgent." ]},{heading:"How to choose the right service",body:["Choose routine Foot Health Practitioner care for straightforward maintenance needs that match the published Foot+ service scope. Choose podiatry, GP, pharmacy or urgent NHS support when assessment, diagnosis or treatment outside routine care may be needed.","If you are unsure, describe the concern clearly when enquiring so Adam can advise whether Foot+ is likely to be appropriate."],links:[{href:"/book",label:"contact Foot+ about suitability",kind:"book"}]}], practitionerView:"Adam’s practical view: clear professional boundaries protect patients. Foot+ is most useful when the need is routine foot care at home; where symptoms suggest a clinical problem, the right outcome may be signposting to another professional.", relatedServiceRoutes:[{href:"/about",label:"About Adam",kind:"about"},{href:"/services",label:"Services",kind:"service"},{href:"/",label:"Foot Health Practitioner Bristol",kind:"service"},{href:"/prices",label:"Pricing",kind:"pricing"},{href:"/book",label:"Book",kind:"book"}], relatedArticleSlugs:["what-happens-home-foot-health-appointment","corn-callus-or-verruca"], references:[{label:"HCPC: Check the Register",url:"https://www.hcpc-uk.org/check-the-register/"},{label:"HCPC: Protected titles",url:"https://www.hcpc-uk.org/about-us/who-we-regulate/the-professions/"},{label:"Royal College of Podiatry: What is a podiatrist?",url:"https://rcpod.org.uk/"}], faqs:[{question:"Is Adam James a podiatrist?",answer:"No. Adam James is described by Foot+ as a Foot Health Practitioner, MCFHP, MAFHP."},{question:"Are podiatrist and chiropodist protected titles?",answer:"Yes. In the UK, podiatrist and chiropodist are protected titles regulated through HCPC registration."}]},

  {
  "slug": "foot-care-learning-disabilities-bristol",
  "title": "Accessible Foot Care for Adults with Learning Disabilities and Additional Support Needs",
  "shortTitle": "Accessible foot care",
  "seoTitle": "Foot Care for Adults with Learning Disabilities Bristol | Foot+",
  "description": "A practical Bristol guide to accessible home-visit foot care for adults with learning disabilities, sensory, mobility, communication or anxiety-related support needs.",
  "category": "Accessible home visits",
  "authorId": "adam-james",
  "datePublished": "2026-07-13",
  "dateModified": "2026-11-20",
  "isPublished": true,
  "approvalStatus": "approved",
  "readingTime": "3 min read",
  "wordCount": 668,
  "intro": "In Bristol, Foot+ home visits can be adapted for adults with learning disabilities, autism, or sensory, mobility, communication or anxiety-related needs: at home, at their pace, with someone they trust, and only with their consent.",
  "inBrief": [],
  "sections": [
    {
      "heading": "What an accessible visit means",
      "navLabel": "The visit",
      "body": [
        "The visit is planned around the person, as far as reasonably possible:"
      ],
      "list": [
        "Care happens at home, in familiar surroundings",
        "Someone they trust can be there",
        "Everything is explained before it happens",
        "The visit can go slowly, with pauses",
        "They can ask to pause or stop at any time",
        "Treatment only continues with appropriate consent"
      ]
    },
    {
      "heading": "How a home visit can be adapted",
      "navLabel": "Adapting it",
      "body": [
        "Talk to us before booking so we can agree a plan. Not every adjustment is always possible, but visits can include:"
      ],
      "list": [
        "Clear explanations, at a comfortable pace",
        "Extra time, where arranged",
        "Carers, relatives and support workers",
        "Communication and sensory needs discussed beforehand",
        "Equipment shown or explained before it's used",
        "Care in smaller stages, over more than one visit if needed"
      ],
      "links": [
        {
          "href": "/toenail-cutting-bristol",
          "label": "Toenail cutting at home",
          "kind": "service"
        },
        {
          "href": "/hard-skin-and-callus",
          "label": "Hard skin care",
          "kind": "service"
        }
      ]
    },
    {
      "heading": "Consent, capacity and personal choice",
      "navLabel": "Consent",
      "body": [
        "A learning disability doesn't automatically mean someone lacks capacity. Adults are presumed able to make their own decisions unless there is evidence otherwise, and information should be explained in a way that helps them decide. Capacity is about a specific decision at a specific time, so it can change.",
        "A carer or relative can help with communication, but doesn't automatically have legal authority to consent for another adult. That only applies with a registered Lasting Power of Attorney for health and welfare that covers the decision, or a deputy appointed by the Court of Protection, and even then decisions must be in the person's best interests and take their wishes into account. Treatment won't continue just because a carer asks if the person is showing refusal or distress.",
        "This is general information, not legal advice. Complex capacity questions are handled under the Mental Capacity Act, and Foot+ does not carry out formal capacity assessments beyond its scope."
      ]
    },
    {
      "heading": "Preparing for the appointment",
      "navLabel": "Preparing",
      "body": [
        "Share only what helps the visit go well, such as:"
      ],
      "list": [
        "Their preferred name and how they like to communicate (words, pictures, gestures)",
        "Sensory sensitivities, triggers and signs of discomfort, agreement or refusal",
        "The best time of day, and any mobility or transfer needs",
        "Relevant conditions, diabetes, allergies and medication",
        "Who will be there, and any support plan or hospital passport"
      ]
    },
    {
      "heading": "Foot changes carers and support workers can look for",
      "navLabel": "Signs to notice",
      "body": [
        "You don't need to diagnose anything, and changes in behaviour can have many causes. Ask for advice if you notice:"
      ],
      "list": [
        "Very long or thick nails, or nails pressing into other toes",
        "Redness or pressure marks, corns, hard skin or cracked heels",
        "Blisters or rubbing from shoes",
        "Changes in walking, or reluctance to stand",
        "Pulling away when a foot is touched, or new upset when shoes or socks go on",
        "Swelling, colour or temperature changes, broken skin, discharge or a bad smell"
      ]
    },
    {
      "heading": "When another service may be more appropriate",
      "navLabel": "Getting help",
      "tone": "warning",
      "body": [
        "A podiatrist, GP, NHS diabetic foot service or urgent medical service may be needed for open wounds or ulcers, suspected infection, spreading redness, heat or swelling, pus or discharge, sudden changes in skin colour or temperature, new loss of feeling, severe or unexplained pain, an acute injury, significant circulation concerns or high-risk diabetic foot concerns.",
        "A podiatrist may also be needed for biomechanical assessment, prescription devices or surgery. Adam is a Foot Health Practitioner, not a podiatrist or chiropodist."
      ],
      "links": [
        {
          "href": "/advice/foot-health-practitioner-podiatrist-or-chiropodist",
          "label": "FHP, podiatrist or chiropodist?",
          "kind": "article"
        }
      ]
    }
  ],
  "practitionerView": "Accessible foot care starts with listening. Comfort and consent come before finishing quickly.",
  "relatedServiceRoutes": [
    {
      "href": "/book",
      "label": "Discuss support needs",
      "kind": "book"
    },
    {
      "href": "/services",
      "label": "Inclusive home visits",
      "kind": "service"
    },
    {
      "href": "/",
      "label": "professional foot care at home",
      "kind": "service"
    },
    {
      "href": "/toenail-cutting-bristol",
      "label": "Toenail cutting",
      "kind": "service"
    },
    {
      "href": "/hard-skin-and-callus",
      "label": "Hard-skin treatment",
      "kind": "service"
    }
  ],
  "relatedArticleSlugs": [
    "what-happens-home-foot-health-appointment",
    "foot-health-practitioner-podiatrist-or-chiropodist",
    "how-often-older-adults-should-cut-toenails"
  ],
  "references": [
    {
      "label": "NHS England: Reasonable adjustments",
      "url": "https://www.england.nhs.uk/learning-disabilities/improving-health/reasonable-adjustments/"
    },
    {
      "label": "Mental Capacity Act 2005",
      "url": "https://www.legislation.gov.uk/ukpga/2005/9/contents"
    },
    {
      "label": "NHS: Assessing capacity – consent to treatment",
      "url": "https://www.nhs.uk/tests-and-treatments/consent-to-treatment/capacity/"
    },
    {
      "label": "GOV.UK: Lasting power of attorney",
      "url": "https://www.gov.uk/power-of-attorney"
    }
  ],
  "faqs": [
    {
      "question": "Can a carer or support worker be there?",
      "answer": "Yes, if the person wants or benefits from it. They can help with communication, but the person's own choice and consent still come first."
    },
    {
      "question": "What if the person becomes anxious?",
      "answer": "We slow down, explain again, show equipment first and offer a pause. If carrying on isn't right, we stop and talk about a gentler plan or another service."
    },
    {
      "question": "What happens at a first visit?",
      "answer": "An introduction, a look at the feet and only the care that feels manageable. For some people, a good first visit is meeting Adam and agreeing a plan."
    },
    {
      "question": "Can you visit supported living or a care setting?",
      "answer": "We can discuss it when you enquire. Please share access details, consent considerations and who will be there."
    }
  ]
},
  {
  "slug": "why-toenails-are-difficult-to-cut",
  "title": "Why Are Toenails Difficult to Cut?",
  "shortTitle": "Difficult-to-cut toenails and safe trimming",
  "seoTitle": "Why Are My Toenails So Hard to Cut? Causes and Safe Tips | Foot+",
  "description": "Thick nails, hard-to-reach feet or a weak grip can all make toenails hard to cut. How to trim them safely at home, and when to get help.",
  "category": "Nail care",
  "authorId": "adam-james",
  "datePublished": "2026-10-07",
  "dateModified": "2026-11-20",
  "isPublished": true,
  "approvalStatus": "approved",
  "readingTime": "2 min read",
  "wordCount": 318,
  "intro": "It's often not the nail itself. Reaching your feet, seeing clearly and holding clippers all matter, and thick nails make it harder still.",
  "inBrief": [],
  "sections": [
    {
      "heading": "Why toenails get hard to cut",
      "navLabel": "Why it’s hard",
      "body": [],
      "subsections": [
        {
          "heading": "Reaching and seeing your feet",
          "body": [
            "You need to sit securely, reach your feet and see the nail edges clearly. If bending is uncomfortable or your eyesight makes it tricky, get help rather than guess."
          ]
        },
        {
          "heading": "Grip and control",
          "body": [
            "If you can't hold the clippers steadily, you can't take small, accurate cuts. Stop rather than force it."
          ]
        },
        {
          "heading": "Thick or awkward nails",
          "body": [
            "Thickness, shape, tight shoes or an old injury can all make a nail harder to cut. Not every thick or discoloured nail is fungal. Where suitable, a Foot Health Practitioner can trim and gently reduce it."
          ]
        }
      ],
      "links": [
        {
          "href": "/advice/thickened-toenails-causes-treatment-and-when-to-worry",
          "label": "Thick toenails: why they thicken",
          "kind": "article"
        }
      ]
    },
    {
      "heading": "How to cut your toenails safely at home",
      "navLabel": "Cutting safely",
      "body": [
        "If you can see and reach your nails comfortably:"
      ],
      "list": [
        "Sit in good light with your foot supported",
        "Use clean clippers you can hold steadily",
        "Trim after a bath, when nails are softer",
        "Cut small amounts, generally across the nail",
        "Don't cut very short, deep down the sides or in a V",
        "File rough edges instead of tearing them",
        "Don't force clippers, or use blades or household tools",
        "Stop if it causes pain, bleeding or broken skin"
      ],
      "links": [
        {
          "href": "/advice/how-often-older-adults-should-cut-toenails",
          "label": "How often toenails need cutting",
          "kind": "article"
        }
      ]
    },
    {
      "heading": "Who should not cut their own toenails",
      "navLabel": "Who shouldn’t",
      "tone": "warning",
      "body": [
        "Ask for professional help instead if you:"
      ],
      "list": [
        "Have diabetes, poor circulation or reduced feeling in your feet",
        "Take medication that makes you bleed more easily",
        "Have a weakened immune system",
        "Can't safely reach or see your feet",
        "Have hurt yourself cutting your nails before",
        "Have redness, swelling, broken skin or signs of infection around a nail"
      ]
    },
    {
      "heading": "When to get help",
      "navLabel": "Getting help",
      "tone": "warning",
      "body": [
        "Unexplained nail changes, significant pain, broken skin or signs of infection need checking. Spreading redness, pus, fever or quickly worsening symptoms need prompt medical advice."
      ],
      "links": [
        {
          "href": "/toenail-cutting-bristol",
          "label": "Toenail cutting at home in Bristol",
          "kind": "service"
        },
        {
          "href": "/prices",
          "label": "Prices",
          "kind": "pricing"
        }
      ]
    }
  ],
  "practitionerView": "If cutting your nails has become a struggle, asking for help is a sensible next step.",
  "relatedServiceRoutes": [
    {
      "href": "/toenail-cutting-bristol",
      "label": "Toenail cutting in Bristol",
      "kind": "service"
    },
    {
      "href": "/locations/bristol",
      "label": "Bristol home foot care",
      "kind": "service"
    }
  ],
  "relatedArticleSlugs": [
    "how-often-older-adults-should-cut-toenails",
    "thickened-toenails-causes-treatment-and-when-to-worry",
    "what-happens-home-foot-health-appointment"
  ],
  "references": [
    {
      "label": "NHS: Nail problems",
      "url": "https://www.nhs.uk/conditions/nail-problems/"
    },
    {
      "label": "Guy’s and St Thomas’: Caring for your feet and toenails",
      "url": "https://www.guysandstthomas.nhs.uk/health-information/caring-your-feet-and-toenails"
    }
  ],
  "faqs": [
    {
      "question": "Does it mean I have a nail disease?",
      "answer": "No. Reach, eyesight, mobility and grip can make cutting hard on their own. Unexplained changes should still be checked."
    }
  ]
},
];

export const publishedAdviceArticles = adviceArticles.filter((a) => a.isPublished && a.approvalStatus === "approved");
export const draftAdviceArticles = adviceArticles.filter((a) => !a.isPublished || a.approvalStatus !== "approved");
export function getAdviceArticle(slug: string) { return publishedAdviceArticles.find((a) => a.slug === slug); }

// End-of-article "next step" for commercially relevant guides: the most
// relevant Bristol treatment page and, only where booking is a natural next
// step, a home-visit request link. Omit bookingHref where a direct booking
// prompt could compete with diagnostic or safety advice.
export type AdviceNextStep = {
  heading: string;
  summary: string;
  treatments: { href: string; label: string }[];
  bookingHref?: string;
};
const nailBooking = "/book?location=bristol&service=nails";
export const adviceNextSteps: Record<string, AdviceNextStep> = {
  "why-toenails-are-difficult-to-cut": {
    heading: "Toenail cutting at home in Bristol",
    summary: "If cutting your own toenails has become difficult, Foot+ provides careful routine toenail cutting and filing during a home visit.",
    treatments: [{ href: "/toenail-cutting-bristol", label: "Toenail cutting in Bristol" }],
    bookingHref: nailBooking,
  },
  "thickened-toenails-causes-treatment-and-when-to-worry": {
    heading: "Thickened-nail care at home in Bristol",
    summary: "Where suitable, Foot+ can trim and conservatively reduce thickened toenails during a home visit. Routine care manages the nail; it does not diagnose or cure an underlying cause.",
    treatments: [{ href: "/toenail-cutting-bristol#thickened-nails", label: "Thickened-nail care in Bristol" }],
    bookingHref: nailBooking,
  },
  "how-often-older-adults-should-cut-toenails": {
    heading: "Routine toenail care at home in Bristol",
    summary: "Foot+ provides routine toenail cutting at home, which can help when reach, eyesight or hand strength make home cutting harder.",
    treatments: [{ href: "/toenail-cutting-bristol", label: "Toenail cutting in Bristol" }],
    bookingHref: nailBooking,
  },
  "corn-callus-or-verruca": {
    heading: "Corn, callus and verruca care at home",
    summary: "Foot+ treats corns, callus and verrucas at home where suitable. A change you are unsure about may need GP or podiatry advice instead.",
    treatments: [
      { href: "/corn-treatment", label: "Corn treatment" },
      { href: "/hard-skin-and-callus", label: "Hard skin and callus removal" },
      { href: "/services#verrucas", label: "Verruca treatment" },
    ],
  },
  "hard-skin-on-feet": {
    heading: "Hard-skin care at home",
    summary: "Where suitable, Foot+ reduces hard skin and callus during a home visit and offers practical advice to help keep feet comfortable between appointments.",
    treatments: [{ href: "/hard-skin-and-callus", label: "Hard skin and callus removal" }],
    bookingHref: "/book",
  },
};
export function getAdviceNextStep(slug: string) { return adviceNextSteps[slug]; }
export function isPublishedAdviceHref(href: string) { return publishedAdviceArticles.some((article) => href === `/advice/${article.slug}`); }
export function adviceCanonical(slug = "") { return `${SITE_URL}/advice${slug ? `/${slug}` : ""}`; }
export function adviceMetadata(article: AdviceArticle): Metadata {
  const url = adviceCanonical(article.slug);
  const title = article.seoTitle ?? article.shortTitle;

  // Keep each guide's existing search copy while extending its server-rendered social metadata.
  return {
    title: article.seoTitle ? { absolute: title } : title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Foot+ Bristol",
      title,
      description: article.description,
      images: [ADVICE_SOCIAL_IMAGE_METADATA],
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [ADVICE_SOCIAL_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}
export function articleJsonLd(article: AdviceArticle) { const url = adviceCanonical(article.slug); return { "@context":"https://schema.org", "@graph":[{ "@type":"Article", "@id":`${url}#article`, headline:article.title, description:article.description, mainEntityOfPage:{"@type":"WebPage","@id":url}, author:{"@type":"Person","@id":ADAM_ID, name:"Adam James", jobTitle:"Foot Health Practitioner", url:`${SITE_URL}/about`}, publisher:{"@type":"Organization","@id":`${SITE_URL}/#organization`, name:"Foot+ Bristol", url:SITE_URL}, datePublished:article.datePublished, dateModified:article.dateModified, articleSection:article.category }, {"@type":"BreadcrumbList","@id":`${url}#breadcrumb`, itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},{"@type":"ListItem",position:2,name:"Advice",item:adviceCanonical()},{"@type":"ListItem",position:3,name:article.title,item:url}]}, {"@type":"FAQPage","@id":`${url}#faq`, mainEntity:article.faqs.map((faq)=>({"@type":"Question", name:faq.question, acceptedAnswer:{"@type":"Answer", text:faq.answer}}))}]}; }
