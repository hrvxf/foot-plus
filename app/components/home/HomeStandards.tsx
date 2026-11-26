import StandardsSpotlight from "../about/StandardsSpotlight";
import { homeStandards } from "../../lib/home";

/** "The Foot+ standard", moved from /about (Nov 2026) when that page folded into the location pages. */
export default function HomeStandards() {
  return (
    <section className="mx-auto max-w-2xl px-[22px] pb-10 pt-14 text-center md:pt-20" aria-labelledby="standard-heading">
      <h2 id="standard-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
        The Foot+ standard
      </h2>
      <StandardsSpotlight standards={homeStandards} />
    </section>
  );
}
