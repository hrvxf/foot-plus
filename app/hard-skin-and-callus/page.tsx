import TreatmentPage, { treatmentMetadata } from "../components/site/TreatmentPage";
import { getTreatment } from "../lib/treatments";

const treatment = getTreatment("hard-skin-and-callus");

export const metadata = treatmentMetadata(treatment);

export default function Page() {
  return <TreatmentPage treatment={treatment} />;
}
