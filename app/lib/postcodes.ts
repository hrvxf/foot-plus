export type EnquiryLocation = "Bristol" | "Southampton";

export type PostcodeValidation =
  | { valid: true; postcode: string }
  | {
      valid: false;
      message: string;
      suggestedLocation?: EnquiryLocation;
    };

const UK_POSTCODE_PATTERN =
  /^(GIR\s?0AA|[A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]?\s?\d[ABD-HJLNP-UW-Z]{2})$/i;

export function normalisePostcode(value: string) {
  const compact = value.toUpperCase().replace(/\s+/g, "");

  if (compact.length <= 3) {
    return compact;
  }

  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function validateServicePostcode(
  value: string,
  location: EnquiryLocation
): PostcodeValidation {
  const postcode = normalisePostcode(value);

  if (!UK_POSTCODE_PATTERN.test(postcode)) {
    return {
      valid: false,
      message: "Enter a full UK postcode, for example BS1 1AA.",
    };
  }

  const outwardCode = postcode.split(" ")[0];

  if (location === "Southampton" && outwardCode.startsWith("BS")) {
    return {
      valid: false,
      suggestedLocation: "Bristol",
      message:
        "This appears to be a Bristol postcode. Select Bristol before sending your enquiry.",
    };
  }

  if (location === "Bristol" && outwardCode.startsWith("SO")) {
    return {
      valid: false,
      suggestedLocation: "Southampton",
      message:
        "This appears to be a Southampton postcode. Select Southampton before sending your enquiry.",
    };
  }

  return { valid: true, postcode };
}
