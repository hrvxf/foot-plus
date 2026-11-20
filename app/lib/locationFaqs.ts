import { paymentMethods } from "./site";

const payment = paymentMethods.join(", ").replace(/, ([^,]*)$/, " or $1");

/**
 * The four "Still wondering?" flip cards on the location pages. `short` is the card's front; `question`
 * is the full wording used in the FAQPage structured data. Coverage and "can a relative book" are left
 * out: the postcode checker and the chat section already answer them.
 */
export const locationFaqs = [
  {
    short: "Same as a podiatrist?",
    question: "Is a Foot+ visit the same as seeing a podiatrist?",
    answer:
      "No. We're qualified Foot Health Practitioners for routine nail and skin care, and we'll tell you if you need a podiatrist or GP.",
  },
  {
    short: "Diabetic feet?",
    question: "Do you help with diabetic feet?",
    answer: "Yes, routine care with foot checks every visit. Urgent problems need your GP or podiatrist.",
  },
  {
    short: "At my own pace?",
    question: "Can the visit go at my own pace?",
    answer: "Yes. Tell us about anxiety, mobility or other needs and we'll plan around them.",
  },
  {
    short: "How do I pay?",
    question: "How do I pay for a home visit?",
    answer: `${payment.charAt(0).toUpperCase()}${payment.slice(1)}.`,
  },
];
