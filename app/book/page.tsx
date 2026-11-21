import type { Metadata } from "next";

import { SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";
import BookFlow from "./BookFlow";

export const metadata: Metadata = {
  title: "Request a Foot+ Home-Visit Appointment",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/book` },
  description:
    "Request a Foot+ home-visit appointment in Bristol or Southampton.",
};

export default function BookPage() {
  return (
    <section className="bg-brand-offwhite">
      <BookFlow />
    </section>
  );
}
