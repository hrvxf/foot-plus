import TreatmentPage, { treatmentMetadata } from "../components/site/TreatmentPage";
import { getTreatment } from "../lib/treatments";

const treatment = getTreatment("corn-treatment");

export const metadata = treatmentMetadata(treatment);

export default function Page() {
  return <TreatmentPage treatment={treatment} />;
}
