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
          "href": "/toenail-cutting-southampton",
          "label": "Toenail cutting at home in Southampton",
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
  "practitionerView": "A thick or discoloured nail shouldn't automatically be treated as fungal. We can reduce it, ease the pressure and tell you when a pharmacist or your GP is the better route.",
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
      "answer": "We reduce and look after thick nails to keep them comfortable. We don't diagnose fungal infection, skin disease, circulation problems or nail cancer, and we'll tell you when a pharmacist or your GP is better placed to help."
    }
  ]
},
  {
    "slug": "why-does-my-heel-hurt-when-i-get-out-of-bed",
    "title": "Why Does My Heel Hurt When I Get Out of Bed?",
    "shortTitle": "Why does my heel hurt in the morning?",
    "seoTitle": "Why Does My Heel Hurt When I Get Out of Bed? | Foot Plus",
    "description": "Sharp heel pain with your first steps in the morning? Learn the common causes, home treatments and when to seek professional advice from Foot Plus.",
    "category": "Heel pain",
    "authorId": "adam-james",
    "datePublished": "2026-07-30",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "3 min read",
    "wordCount": 513,
    "intro": "That sharp pain with your first steps is often linked to plantar fasciitis. It usually eases as you walk, then comes back after rest.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Why it hurts first thing",
        "navLabel": "Why mornings",
        "body": [
          "The plantar fascia is a strong band of tissue under your foot, running from the heel towards the toes. Overnight it isn't being stretched, so your first steps suddenly pull on it.",
          "When it's irritated or overloaded, that pull can feel sharp or tight under the heel. It often eases after a few minutes, then returns after sitting or a long day on your feet."
        ],
        "subsections": [
          {
            "heading": "It isn't always plantar fasciitis",
            "body": [
              "Achilles tendon problems, bursitis, nerve irritation, heel-pad pain and, less often, a stress fracture can all cause heel pain too."
            ]
          }
        ]
      },
      {
        "heading": "What makes it more likely",
        "navLabel": "Causes",
        "body": [
          "Often more than one of these is involved:"
        ],
        "list": [
          "More walking, running or exercise than usual",
          "Long periods of standing",
          "Worn or unsupportive shoes",
          "Walking barefoot on hard floors",
          "Tight calves or stiff ankles",
          "Changes in body weight",
          "Flat feet or high arches"
        ]
      },
      {
        "heading": "What helps at home",
        "navLabel": "At home",
        "body": [
          "Many cases improve with small changes, though it can take time:"
        ],
        "list": [
          "Wear cushioned, supportive shoes that fasten securely",
          "Avoid going barefoot on hard floors",
          "Stretch your calves gently, and stop if it hurts sharply",
          "Ease off whatever makes it worse, then build back up gradually",
          "Hold an ice pack wrapped in a towel on the heel for up to 20 minutes every 2 to 3 hours, never directly on the skin"
        ],
        "subsections": [
          {
            "heading": "Check before using ice",
            "body": [
              "If you have reduced feeling, poor circulation or another medical condition, ask for advice before using cold therapy."
            ]
          }
        ]
      },
      {
        "heading": "When to get it checked",
        "navLabel": "Getting help",
        "tone": "warning",
        "body": [
          "See your GP or arrange an assessment if:"
        ],
        "list": [
          "The pain is severe or getting worse",
          "It hasn't improved after 2 weeks of self-care",
          "You're struggling to walk normally, or it's affecting your sleep or daily life",
          "It started after an injury",
          "There's swelling, redness or warmth",
          "You have numbness, tingling or burning",
          "You have diabetes, poor circulation or reduced feeling in your feet"
        ],
        "subsections": [
          {
            "heading": "Get seen promptly",
            "body": [
              "If you can't put weight on the foot, or there's marked swelling after an injury."
            ]
          }
        ]
      },
      {
        "heading": "How a Foot Health Practitioner can help",
        "navLabel": "How we help",
        "body": [
          "A Foot Health Practitioner can look at your feet, talk through what may be adding to the pain, and help with footwear, pressure, padding or insoles where appropriate, stretches and any painful callus.",
          "If it needs further investigation, they'll suggest seeing your GP."
        ]
      }
    ],
    "practitionerView": "Morning heel pain usually has more than one cause. A look at your feet and footwear can show what's worth changing.",
    "disclaimer": "This article provides general information and is not a substitute for individual medical advice, diagnosis or treatment.",
    "relatedServiceRoutes": [
      {
        "href": "/services",
        "label": "Foot+ services",
        "kind": "service"
      },
      {
        "href": "/",
        "label": "Foot Health Practitioner",
        "kind": "service"
      },
      {
        "href": "/book",
        "label": "Book an appointment",
        "kind": "book"
      }
    ],
    "relatedArticleSlugs": [
      "maintain-good-foot-health",
      "foot-health-practitioner-podiatrist-or-chiropodist"
    ],
    "references": [
      {
        "label": "NHS: Heel pain",
        "url": "https://www.nhs.uk/conditions/heel-pain/"
      },
      {
        "label": "NHS: Plantar fasciitis",
        "url": "https://www.nhs.uk/conditions/plantar-fasciitis/"
      }
    ],
    "faqs": [
      {
        "question": "Why does my heel hurt with my first steps in the morning?",
        "answer": "After rest, the plantar fascia is suddenly placed under tension when you stand. This pattern is commonly associated with plantar fasciitis, but heel pain can have other causes."
      },
      {
        "question": "When should morning heel pain be assessed?",
        "answer": "See a GP if pain is severe or worsening, has not improved after 2 weeks of self-care, causes tingling or numbness, or if you have diabetes. Seek prompt assessment after an injury if you cannot bear weight or have marked swelling."
      }
    ]
  },
  {
    "slug": "maintain-good-foot-health",
    "title": "How to Maintain Good Foot Health",
    "shortTitle": "Maintain good foot health",
    "seoTitle": "How to Maintain Good Foot Health | Foot+",
    "description": "Simple everyday foot-care habits for checking, washing, moisturising, nail cutting, hard skin and knowing when to ask for professional advice.",
    "category": "Everyday foot care",
    "authorId": "adam-james",
    "datePublished": "2026-07-17",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "3 min read",
    "wordCount": 580,
    "intro": "Healthy feet come from a few small habits: checking them, keeping them clean and dry, moisturising, trimming nails carefully and getting help early. This guide is based on NHS advice.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Check your feet",
        "navLabel": "Checking",
        "body": [
          "Look at the tops, the soles and between your toes for cuts, blisters, bruising, sore spots, colour change, swelling or anything new.",
          "If bending is hard, use a mirror, rest your foot on a chair or ask someone to help. Checks matter most if you have diabetes, or if eyesight, feeling or circulation make small problems easy to miss."
        ]
      },
      {
        "heading": "Wash, dry and moisturise",
        "navLabel": "Skin care",
        "body": [],
        "subsections": [
          {
            "heading": "Wash every day",
            "body": [
              "Use soap and water, and clean gently around the nails rather than digging under them. Don't soak your feet for long, as it softens the skin."
            ]
          },
          {
            "heading": "Dry between every toe",
            "body": [
              "Damp skin between the toes can turn white, fragile and sore. If your feet sweat a lot, breathable socks and letting shoes dry out between wears can help. Skin that's cracked, itchy, weeping or sore needs a pharmacist or your GP."
            ]
          },
          {
            "heading": "Moisturise the tops and soles, not between toes",
            "body": [
              "Regular moisturiser helps dry skin and heel callus. A urea-based cream suits some people; ask a pharmacist if you're unsure which. Let it soak in before walking, as feet can be slippery."
            ]
          }
        ],
        "links": [
          {
            "href": "/hard-skin-and-callus",
            "label": "Hard-skin treatment at home",
            "kind": "service"
          },
          {
            "href": "/cracked-heels",
            "label": "Cracked heel care",
            "kind": "service"
          }
        ]
      },
      {
        "heading": "Nails and hard skin",
        "navLabel": "Nails and skin",
        "body": [
          "Trim nails in good light, a little at a time, and file sharp edges. Don't cut them very short, tear them or cut down the sides. If reaching or seeing your nails has become hard, or a nail is thick, professional nail care is safer than forcing it.",
          "Small areas of hard skin can be filed gently when dry. Stop if it gets sore, and never use blades or corn knives. Hard skin tends to return while the pressure continues, so footwear and moisturising matter too."
        ],
        "links": [
          {
            "href": "/advice/why-toenails-are-difficult-to-cut",
            "label": "Safe toenail cutting at home",
            "kind": "article"
          },
          {
            "href": "/advice/hard-skin-on-feet",
            "label": "Hard skin: causes and treatment",
            "kind": "article"
          },
          {
            "href": "/toenail-cutting-bristol",
            "label": "Toenail cutting at home in Bristol",
            "kind": "service"
          },
          {
            "href": "/toenail-cutting-southampton",
            "label": "Toenail cutting at home in Southampton",
            "kind": "service"
          }
        ]
      },
      {
        "heading": "Shoes and socks",
        "navLabel": "Footwear",
        "body": [
          "Shoes should support your foot, leave room for your toes and not rub. Check inside for seams, stones or worn patches. If one pair keeps causing blisters, corns or nail pain, it may be time to change them. Socks should be clean, dry and comfortable."
        ]
      },
      {
        "heading": "If you have diabetes or reduced feeling",
        "navLabel": "Diabetes",
        "tone": "warning",
        "body": [
          "Check your feet every day, and don't file or treat hard skin yourself. Small injuries are easier to miss and slower to heal, so ask your GP practice or diabetes team first. If you have diabetes, make sure you have your annual foot check."
        ]
      },
      {
        "heading": "When to ask for help",
        "navLabel": "Getting help",
        "tone": "warning",
        "body": [
          "Get medical advice for a wound, spreading redness, heat, swelling, discharge, increasing or severe pain, sudden colour or temperature change, or new numbness.",
          "For routine nail care, hard skin, callus, corns and cracked heels, a Foot Health Practitioner can help at home. If something is outside routine care, Foot+ will tell you who to see."
        ],
        "links": [
          {
            "href": "/services",
            "label": "Foot+ services",
            "kind": "service"
          },
          {
            "href": "/book",
            "label": "Request a home visit",
            "kind": "book"
          }
        ]
      }
    ],
    "practitionerView": "The best routine is one simple enough to keep doing, with help sought early when something changes.",
    "relatedServiceRoutes": [
      {
        "href": "/services",
        "label": "All Foot+ services",
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
      },
      {
        "href": "/cracked-heels",
        "label": "Cracked heel care",
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
      "hard-skin-on-feet",
      "what-happens-home-foot-health-appointment"
    ],
    "references": [
      {
        "label": "Guy's and St Thomas' NHS Foundation Trust: Caring for your feet and toenails",
        "url": "https://www.guysandstthomas.nhs.uk/health-information/caring-your-feet-and-toenails"
      },
      {
        "label": "NHS: Foot problems and the podiatrist",
        "url": "https://www.nhs.uk/conditions/foot-problems-and-the-podiatrist/"
      },
      {
        "label": "Diabetes UK: Checking your feet",
        "url": "https://www.diabetes.org.uk/guide-to-diabetes/complications/feet/checking-your-feet"
      }
    ],
    "faqs": [
      {
        "question": "How often should I check my feet?",
        "answer": "Regularly, and every day if you have diabetes, reduced feeling or circulation problems. Look at the tops, soles and between your toes. If you have diabetes, make sure you have the annual foot check from your GP practice or diabetes team."
      },
      {
        "question": "Should I put cream between my toes?",
        "answer": "No. Moisturise the tops and soles, but not between the toes, where extra moisture makes skin fragile."
      },
      {
        "question": "Can Foot+ help me look after my feet?",
        "answer": "Yes. Where suitable, Foot+ provides routine nail care, hard-skin and callus care, cracked heel care and practical advice at home."
      }
    ]
  },
  {
    "slug": "corn-callus-or-verruca",
    "title": "Corn, Callus or Verruca: How Can You Tell the Difference?",
    "shortTitle": "Corn, callus or verruca",
    "description": "Learn the broad differences between corns, callus and verrucae, why online self-diagnosis can be unreliable, and when routine foot care may help.",
    "category": "Skin and hard skin",
    "authorId": "adam-james",
    "datePublished": "2026-07-13",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "2 min read",
    "wordCount": 357,
    "intro": "All three can look like small patches of hard or changed skin, but they're different things and need different care. This guide explains the usual differences. It can't diagnose your foot.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Telling them apart",
        "navLabel": "Differences",
        "body": [],
        "subsections": [
          {
            "heading": "Corn",
            "body": [
              "A small, concentrated patch of hard skin over a pressure point, often on a toe or under the ball of the foot. It can feel like a pebble when you walk. Soft corns form between the toes and look whitish and rubbery."
            ]
          },
          {
            "heading": "Callus",
            "body": [
              "A broader, flatter patch of hard skin, often on the heel or the ball of the foot, where it takes repeated pressure or rubbing."
            ]
          },
          {
            "heading": "Verruca",
            "body": [
              "A wart on the foot, caused by a virus. It may have tiny dark dots, break up the normal skin lines, or hurt when squeezed from side to side."
            ]
          }
        ],
        "links": [
          {
            "href": "/corn-treatment",
            "label": "Corn treatment at home",
            "kind": "service"
          },
          {
            "href": "/advice/hard-skin-on-feet",
            "label": "Hard skin and callus: causes and treatment",
            "kind": "article"
          }
        ]
      },
      {
        "heading": "Why it's hard to tell",
        "navLabel": "Self-diagnosis",
        "body": [
          "The signs overlap, so a sore patch under the foot isn't automatically a corn. Photos and descriptions online can't replace someone looking at your foot, especially if you have diabetes, reduced feeling, circulation problems, a weakened immune system or a wound."
        ]
      },
      {
        "heading": "What not to do",
        "navLabel": "What not to do",
        "tone": "warning",
        "body": [
          "Don't cut, dig into or put strong acids on a patch you're unsure about, and don't use blades, scalpels or corn knives. Leave anything that bleeds, changes quickly or has broken skin around it. Over-the-counter products don't suit everyone, so check with a pharmacist first."
        ]
      },
      {
        "heading": "Who can help",
        "navLabel": "Getting help",
        "body": [
          "Foot+ can treat corns, callus and verrucas at home where suitable, with advice on footwear and moisturising. A pharmacist can also advise on verruca products.",
          "See your GP or a pharmacist for wounds, infection, sudden severe pain, spreading redness, unexplained bleeding, or concerns linked to diabetes or circulation. Urgent symptoms shouldn't wait for routine care."
        ],
        "links": [
          {
            "href": "/hard-skin-and-callus",
            "label": "Callus removal at home",
            "kind": "service"
          },
          {
            "href": "/book",
            "label": "Request a home visit",
            "kind": "book"
          }
        ]
      }
    ],
    "practitionerView": "Hard skin often shows where pressure is building. Routine care eases it, and the right advice helps stop it coming back.",
    "relatedServiceRoutes": [
      {
        "href": "/corn-treatment",
        "label": "Corn removal and care",
        "kind": "service"
      },
      {
        "href": "/hard-skin-and-callus",
        "label": "Callus reduction",
        "kind": "service"
      },
      {
        "href": "/services",
        "label": "All Foot+ services",
        "kind": "service"
      },
      {
        "href": "/book",
        "label": "Book an appointment",
        "kind": "book"
      }
    ],
    "relatedArticleSlugs": [
      "hard-skin-on-feet",
      "foot-health-practitioner-podiatrist-or-chiropodist"
    ],
    "references": [
      {
        "label": "NHS: Warts and verrucas",
        "url": "https://www.nhs.uk/conditions/warts-and-verrucas/"
      },
      {
        "label": "NHS: Corns and calluses",
        "url": "https://www.nhs.uk/conditions/corns-and-calluses/"
      }
    ],
    "faqs": [
      {
        "question": "Can Foot+ diagnose a verruca from a photo?",
        "answer": "No. Your practitioner can look at it during a home visit and treat it where suitable."
      },
      {
        "question": "Should I cut a corn out myself?",
        "answer": "No. Cutting into painful or uncertain skin can cause injury, especially if you have diabetes, reduced feeling or circulation problems."
      }
    ]
  },
  {
    "slug": "how-often-older-adults-should-cut-toenails",
    "title": "How Often Should Older Adults Have Their Toenails Cut?",
    "shortTitle": "Toenail cutting for older adults",
    "seoTitle": "Toenail Cutting for the Elderly: How Often? | Foot+",
    "description": "How often elderly people need their toenails cut, why it varies and the signs care is needed sooner. Practical advice for families and carers.",
    "category": "Foot care for older adults",
    "authorId": "adam-james",
    "datePublished": "2026-07-13",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "2 min read",
    "wordCount": 303,
    "intro": "There's no single schedule. It depends on how fast your nails grow, how thick or curved they are, and how easily you can manage them yourself.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Why it varies",
        "navLabel": "Why it varies",
        "body": [
          "Two people of the same age can need very different routines. Nail growth is affected by circulation, footwear, activity, past injury and general health.",
          "Reach, eyesight and hand strength often change before the nails do. When cutting gets awkward, nails tend to be left longer, so a regular routine is often better than waiting until they hurt."
        ],
        "links": [
          {
            "href": "/advice/why-toenails-are-difficult-to-cut",
            "label": "Why toenails become difficult to cut",
            "kind": "article"
          }
        ]
      },
      {
        "heading": "How often",
        "navLabel": "How often",
        "body": [
          "Six weeks is often quoted, but some people need care sooner and others can go longer. Thick, curved or ingrowing nails usually need attention more often, because they press on shoes and skin sooner.",
          "After a visit or two, your practitioner can suggest a routine that suits how your nails grow."
        ],
        "links": [
          {
            "href": "/advice/thickened-toenails-causes-treatment-and-when-to-worry",
            "label": "Thickened toenails: causes and treatment",
            "kind": "article"
          },
          {
            "href": "/toenail-cutting-bristol",
            "label": "Toenail cutting at home in Bristol",
            "kind": "service"
          },
          {
            "href": "/toenail-cutting-southampton",
            "label": "Toenail cutting at home in Southampton",
            "kind": "service"
          }
        ]
      },
      {
        "heading": "Signs care is needed sooner",
        "navLabel": "Sooner",
        "tone": "warning",
        "body": [
          "Arrange care sooner if nails catch on socks, press into shoes, feel sore, curve into the skin or are too hard to cut safely.",
          "Get medical advice for redness, swelling, discharge, a wound, sudden severe pain or a diabetic foot concern."
        ]
      },
      {
        "heading": "Arranging care for a relative",
        "navLabel": "For a relative",
        "body": [
          "A family member can enquire and help with arrangements, but the person having care should be involved and agree to it. Home visits help when travel, stairs or parking make a clinic hard."
        ],
        "links": [
          {
            "href": "/prices",
            "label": "Prices",
            "kind": "pricing"
          },
          {
            "href": "/book",
            "label": "Request a home visit",
            "kind": "book"
          }
        ]
      }
    ],
    "practitionerView": "The right interval keeps nails comfortable without letting them become a problem.",
    "relatedServiceRoutes": [
      {
        "href": "/toenail-cutting-bristol",
        "label": "Toenail cutting",
        "kind": "service"
      },
      {
        "href": "/services",
        "label": "Services",
        "kind": "service"
      },
      {
        "href": "/prices",
        "label": "Pricing",
        "kind": "pricing"
      },
      {
        "href": "/locations/bristol/areas-we-cover",
        "label": "Areas covered",
        "kind": "areas"
      },
      {
        "href": "/book",
        "label": "Book",
        "kind": "book"
      }
    ],
    "relatedArticleSlugs": [
      "why-toenails-are-difficult-to-cut",
      "thickened-toenails-causes-treatment-and-when-to-worry",
      "what-happens-home-foot-health-appointment"
    ],
    "references": [
      {
        "label": "Age UK: Looking after your feet",
        "url": "https://www.ageuk.org.uk/information-advice/health-wellbeing/conditions-illnesses/foot-care/"
      },
      {
        "label": "NHS: Foot problems and the podiatrist",
        "url": "https://www.nhs.uk/conditions/foot-problems-and-the-podiatrist/"
      }
    ],
    "faqs": [
      {
        "question": "Is every six weeks right for everyone?",
        "answer": "Not necessarily. Some people's nails need attention sooner and others can go longer. It depends on how quickly they grow, how thick or curved they are, and whether you can manage them safely between visits."
      },
      {
        "question": "Can a relative book for a parent?",
        "answer": "Yes, a relative can enquire and help arrange it. The person having care still needs to agree to it."
      }
    ]
  },
  {
    "slug": "what-happens-home-foot-health-appointment",
    "title": "What Happens During a Home Foot Health Appointment?",
    "shortTitle": "Your home nail and foot-care appointment",
    "description": "What to expect from a Foot+ home visit: arranging your appointment, nail and skin care, prices and aftercare.",
    "category": "Home foot-care appointments",
    "authorId": "adam-james",
    "datePublished": "2026-07-13",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "2 min read",
    "wordCount": 310,
    "intro": "A home visit brings routine nail and skin care to you. Here's what to expect, from arranging it to aftercare.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Arranging your visit",
        "navLabel": "Arranging",
        "body": [
          "Send an enquiry with your postcode and what you need help with. A relative or carer can arrange it, with the agreement of the person having care. We confirm the area, any travel fee, suitability and a time.",
          "Let us know about stairs, parking, mobility or communication needs."
        ],
        "links": [
          {
            "href": "/book",
            "label": "Request a home visit",
            "kind": "book"
          }
        ]
      },
      {
        "heading": "Before the visit",
        "navLabel": "Before",
        "body": [
          "Fill in the patient form if you can, and have your health and medication details to hand. Choose a comfortable chair with a little space around your feet."
        ],
        "links": [
          {
            "href": "/forms",
            "label": "Patient form",
            "kind": "forms"
          }
        ]
      },
      {
        "heading": "During the visit",
        "navLabel": "During",
        "body": [
          "Your practitioner talks through your needs and health first, and explains the care as they go. You can ask questions or pause at any time.",
          "Care may include toenail cutting and filing, reducing thick nails, hard skin and callus, corns and cracked heels, depending on what's suitable. Nail cutting alone is a perfectly good reason to book. Instruments are sterile, and practitioners are insured and DBS-checked."
        ],
        "links": [
          {
            "href": "/toenail-cutting-bristol",
            "label": "Toenail cutting at home in Bristol",
            "kind": "service"
          },
          {
            "href": "/toenail-cutting-southampton",
            "label": "Toenail cutting at home in Southampton",
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
        "heading": "Prices and timing",
        "navLabel": "Prices",
        "body": [
          "A first visit is £60 and takes about 60 minutes. Routine visits for returning patients are £55 and take about 45 minutes. Any travel fee is confirmed before you book."
        ],
        "links": [
          {
            "href": "/prices",
            "label": "Prices",
            "kind": "pricing"
          }
        ]
      },
      {
        "heading": "Afterwards",
        "navLabel": "Afterwards",
        "body": [
          "You'll get practical advice on nails, footwear and moisturising, and a suggested time for your next visit.",
          "Foot+ provides routine care, not emergency treatment or diagnosis. If something needs your GP, your practitioner will tell you."
        ]
      }
    ],
    "practitionerView": "A home visit should feel calm and unhurried. Tell us what matters to you and we'll plan around it.",
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
  {
    "slug": "hard-skin-on-feet",
    "title": "Hard Skin on Feet: Causes, Prevention and Professional Treatment",
    "shortTitle": "Hard skin on feet",
    "description": "A practical guide to hard skin on feet, including causes, prevention, safe home care and professional reduction without permanent-removal claims.",
    "category": "Skin and hard skin",
    "authorId": "adam-james",
    "datePublished": "2026-07-13",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "2 min read",
    "wordCount": 324,
    "intro": "Hard skin builds up where your feet take pressure. It can usually be reduced and kept comfortable, but it often comes back while the pressure continues.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Why it forms",
        "navLabel": "Why it forms",
        "body": [
          "Hard skin is the skin protecting itself. It forms on heels, the balls of the feet and anywhere shoes rub. A callus is a defined patch of it.",
          "Pressure, rubbing, worn or ill-fitting shoes, the way you walk, activity and dry skin can all play a part. A small, sharp spot may be a corn instead, and a verruca can look similar."
        ],
        "links": [
          {
            "href": "/advice/corn-callus-or-verruca",
            "label": "Corn, callus or verruca: telling them apart",
            "kind": "article"
          }
        ]
      },
      {
        "heading": "Looking after it at home",
        "navLabel": "At home",
        "body": [
          "Moisturise regularly to keep skin supple. If your skin is unbroken and the feeling in your feet is normal, gentle filing may help. Stop if it gets sore, and don't try to remove it all at once."
        ]
      },
      {
        "heading": "What not to do",
        "navLabel": "What not to do",
        "tone": "warning",
        "body": [
          "Don't use razor blades, scalpels or corn knives, or strong chemical products unless a pharmacist or clinician says they suit you.",
          "If you have diabetes, reduced feeling, poor circulation, a wound or fragile skin, get advice before treating it yourself."
        ]
      },
      {
        "heading": "Professional care",
        "navLabel": "Professional care",
        "body": [
          "Where suitable, Foot+ reduces hard skin and callus at a home visit, and talks through moisturising and footwear. The aim is comfort and easier upkeep, not a promise that it won't return."
        ],
        "links": [
          {
            "href": "/hard-skin-and-callus",
            "label": "Hard skin and callus removal at home",
            "kind": "service"
          },
          {
            "href": "/cracked-heels",
            "label": "Cracked heel care",
            "kind": "service"
          },
          {
            "href": "/book",
            "label": "Request a home visit",
            "kind": "book"
          }
        ]
      },
      {
        "heading": "When to get it checked",
        "navLabel": "Getting help",
        "tone": "warning",
        "body": [
          "Get advice if hard skin comes with a wound, bleeding, spreading redness, swelling, discharge, sudden severe pain or a diabetic foot concern. Your GP may be the right person if it needs diagnosis or wound care."
        ]
      }
    ],
    "practitionerView": "Hard skin shows where pressure is building. Care makes feet comfortable; easing the pressure helps keep them that way.",
    "relatedServiceRoutes": [
      {
        "href": "/hard-skin-and-callus",
        "label": "Hard-skin treatment",
        "kind": "service"
      },
      {
        "href": "/cracked-heels",
        "label": "Cracked heel care",
        "kind": "service"
      },
      {
        "href": "/services",
        "label": "Services",
        "kind": "service"
      },
      {
        "href": "/book",
        "label": "Book",
        "kind": "book"
      }
    ],
    "relatedArticleSlugs": [
      "corn-callus-or-verruca",
      "what-happens-home-foot-health-appointment"
    ],
    "references": [
      {
        "label": "NHS: Corns and calluses",
        "url": "https://www.nhs.uk/conditions/corns-and-calluses/"
      },
      {
        "label": "Diabetes UK: Checking your feet",
        "url": "https://www.diabetes.org.uk/guide-to-diabetes/complications/feet/checking-your-feet"
      }
    ],
    "faqs": [
      {
        "question": "Can hard skin be permanently removed?",
        "answer": "Hard skin can often be reduced, but it may return if pressure or friction continues."
      },
      {
        "question": "Is it safe to use a blade at home?",
        "answer": "No. Cutting hard skin yourself can cause injury and is especially risky for people with diabetes, reduced sensation or circulation concerns."
      }
    ]
  },
  {
    "slug": "foot-health-practitioner-podiatrist-or-chiropodist",
    "title": "Foot Health Practitioner, Podiatrist or Chiropodist: Who Should You See?",
    "shortTitle": "FHP, podiatrist or chiropodist",
    "description": "Understand the difference between a Foot Health Practitioner, podiatrist and chiropodist in the UK, including protected titles and routine-care boundaries.",
    "category": "Choosing the right professional",
    "authorId": "adam-james",
    "datePublished": "2026-07-13",
    "dateModified": "2026-11-23",
    "isPublished": true,
    "approvalStatus": "approved",
    "readingTime": "1 min read",
    "wordCount": 299,
    "intro": "The titles sound alike but mean different things. Here's who does what, so you can choose the right person.",
    "inBrief": [],
    "sections": [
      {
        "heading": "Foot Health Practitioner",
        "navLabel": "FHP",
        "body": [
          "A Foot Health Practitioner provides routine foot care: nail cutting, thick nails, non-surgical ingrown and fungal nail care, hard skin and callus, corns, cracked heels, verrucas, athlete's foot and practical advice. Scope depends on training.",
          "Foot+ practitioners are Foot Health Practitioners (MCFHP, MAFHP), not podiatrists or chiropodists."
        ],
        "links": [
          {
            "href": "/services",
            "label": "Foot+ services",
            "kind": "service"
          },
          {
            "href": "/about",
            "label": "About our practitioners",
            "kind": "about"
          }
        ]
      },
      {
        "heading": "Podiatrist and chiropodist",
        "navLabel": "Podiatrist",
        "body": [
          "The two words are often used to mean the same thing. Both are protected titles in the UK: anyone using them must be registered with the Health and Care Professions Council (HCPC), and you can check the register online.",
          "Podiatrists can assess, diagnose and manage a wider range of foot and lower-leg conditions."
        ]
      },
      {
        "heading": "Which do you need?",
        "navLabel": "Which one",
        "body": [
          "For straightforward upkeep, like nail cutting, hard skin or corns, a Foot Health Practitioner is a good fit.",
          "See a podiatrist or GP for persistent or complex pain, suspected infection, wounds, diabetic foot complications, sudden changes, or circulation or sensation concerns. A pharmacist can help with some skin and nail problems, such as suspected fungal infection or verrucas.",
          "Not sure? Describe it when you enquire and we'll tell you whether Foot+ is right for you."
        ],
        "links": [
          {
            "href": "/prices",
            "label": "Prices",
            "kind": "pricing"
          },
          {
            "href": "/book",
            "label": "Ask about a home visit",
            "kind": "book"
          }
        ]
      },
      {
        "heading": "Urgent warning signs",
        "navLabel": "Urgent",
        "tone": "warning",
        "body": [
          "Get urgent medical help for spreading infection, an open wound, sudden severe pain, sudden colour change, heavy bleeding, new loss of feeling or an acute diabetic foot problem. Don't wait for a routine visit."
        ]
      }
    ],
    "practitionerView": "Clear boundaries protect patients. Foot+ is for routine care at home; if something needs a clinician, we'll say so.",
    "relatedServiceRoutes": [
      {
        "href": "/about",
        "label": "About Adam",
        "kind": "about"
      },
      {
        "href": "/services",
        "label": "Services",
        "kind": "service"
      },
      {
        "href": "/",
        "label": "Foot Health Practitioner",
        "kind": "service"
      },
      {
        "href": "/prices",
        "label": "Pricing",
        "kind": "pricing"
      },
      {
        "href": "/book",
        "label": "Book",
        "kind": "book"
      }
    ],
    "relatedArticleSlugs": [
      "what-happens-home-foot-health-appointment",
      "corn-callus-or-verruca"
    ],
    "references": [
      {
        "label": "HCPC: Check the Register",
        "url": "https://www.hcpc-uk.org/check-the-register/"
      },
      {
        "label": "HCPC: Protected titles",
        "url": "https://www.hcpc-uk.org/about-us/who-we-regulate/the-professions/"
      },
      {
        "label": "Royal College of Podiatry: What is a podiatrist?",
        "url": "https://rcpod.org.uk/"
      }
    ],
    "faqs": [
      {
        "question": "Is Adam James a podiatrist?",
        "answer": "No. Adam James is a Foot Health Practitioner (MCFHP, MAFHP)."
      },
      {
        "question": "Are podiatrist and chiropodist protected titles?",
        "answer": "Yes. In the UK, both are protected titles, and anyone using them must be registered with the HCPC."
      }
    ]
  },

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
          "label": "Toenail cutting at home in Bristol",
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
        "Your GP, an NHS diabetic foot service or urgent medical care may be needed for open wounds or ulcers, suspected infection, spreading redness, heat or swelling, pus or discharge, sudden changes in skin colour or temperature, new loss of feeling, severe or unexplained pain, an acute injury, significant circulation concerns or high-risk diabetic foot concerns.",
        "Biomechanical assessment, prescription devices or surgery need other specialists."
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
          "href": "/toenail-cutting-southampton",
          "label": "Toenail cutting at home in Southampton",
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
// relevant treatment pages and, only where booking is a natural next
// step, a home-visit request link. Omit bookingHref where a direct booking
// prompt could compete with diagnostic or safety advice.
export type AdviceNextStep = {
  heading: string;
  summary: string;
  treatments: { href: string; label: string }[];
  bookingHref?: string;
};
const nailBooking = "/book?service=nails";
export const adviceNextSteps: Record<string, AdviceNextStep> = {
  "why-toenails-are-difficult-to-cut": {
    heading: "Toenail cutting at home",
    summary: "If cutting your own toenails has become difficult, Foot+ provides careful routine toenail cutting and filing during a home visit.",
    treatments: [
      { href: "/toenail-cutting-bristol", label: "Toenail cutting in Bristol" },
      { href: "/toenail-cutting-southampton", label: "Toenail cutting in Southampton" },
    ],
    bookingHref: nailBooking,
  },
  "thickened-toenails-causes-treatment-and-when-to-worry": {
    heading: "Thickened-nail care at home",
    summary: "Where suitable, Foot+ can trim and conservatively reduce thickened toenails during a home visit.",
    treatments: [
      { href: "/toenail-cutting-bristol", label: "Thickened-nail care in Bristol" },
      { href: "/toenail-cutting-southampton", label: "Thickened-nail care in Southampton" },
    ],
    bookingHref: nailBooking,
  },
  "how-often-older-adults-should-cut-toenails": {
    heading: "Routine toenail care at home",
    summary: "Foot+ provides routine toenail cutting at home, which can help when reach, eyesight or hand strength make home cutting harder.",
    treatments: [
      { href: "/toenail-cutting-bristol", label: "Toenail cutting in Bristol" },
      { href: "/toenail-cutting-southampton", label: "Toenail cutting in Southampton" },
    ],
    bookingHref: nailBooking,
  },
  "corn-callus-or-verruca": {
    heading: "Corn, callus and verruca care at home",
    summary: "Foot+ treats corns, callus and verrucas at home where suitable. A change you are unsure about may need your GP's advice instead.",
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
      siteName: "Foot+",
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
