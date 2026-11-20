import FootCareFor from "./home/FootCareFor";
import HomeMobileBar from "./home/HomeMobileBar";
import PriceTicket from "./home/PriceTicket";
import ReviewSwipe from "./home/ReviewSwipe";
import StatementHero from "./home/StatementHero";
import TreatmentSpotlight from "./home/TreatmentSpotlight";
import WhereWeVisit from "./home/WhereWeVisit";

const CHECKER_ID = "check-postcode";

/**
 * Home page: the brand's front door rather than another location page. A statement hero on why home
 * visits, who they're for, every treatment, prices, reviews, then the two practitioners and the postcode
 * check that routes each visitor to the right one.
 */
export default function HomeContent() {
  return (
    <>
      <StatementHero />
      <FootCareFor />
      <TreatmentSpotlight />
      <PriceTicket />
      <ReviewSwipe />
      <WhereWeVisit checkerId={CHECKER_ID} />
      <HomeMobileBar checkerId={CHECKER_ID} />
    </>
  );
}
