import FootCareFor from "./home/FootCareFor";
import HeroVisit from "./home/HeroVisit";
import HomeMobileBar from "./home/HomeMobileBar";
import PriceTicket, { PriceTicketAside } from "./home/PriceTicket";
import ReviewWall from "./home/ReviewWall";
import ReviewSwipe from "./home/ReviewSwipe";
import StatementHero from "./home/StatementHero";
import TreatmentSpotlight from "./home/TreatmentSpotlight";
import WhereWeVisit from "./home/WhereWeVisit";

const CHECKER_ID = "check-postcode";

/**
 * Home page: the brand's front door rather than another location page. A statement hero on why home
 * visits, who they're for, every treatment, prices, reviews, then the two practitioners and the postcode
 * check that routes each visitor to the right one.
 *
 * Desktop (lg+) rearranges the same content: the practitioners and postcode check sit beside the hero
 * statement, the prices ticket joins the "Foot care for" band, treatments get a summary panel, and reviews
 * become a drifting wall. Each piece's phone version is hidden from lg up, and vice versa.
 */
export default function HomeContent() {
  return (
    <>
      <StatementHero aside={<HeroVisit />} />
      <FootCareFor aside={<PriceTicketAside />} />
      <TreatmentSpotlight />
      <PriceTicket />
      <ReviewSwipe />
      <ReviewWall />
      <WhereWeVisit checkerId={CHECKER_ID} />
      <HomeMobileBar checkerId={CHECKER_ID} />
    </>
  );
}
