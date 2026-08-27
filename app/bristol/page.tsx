import { permanentRedirect } from "next/navigation";

export default function BristolRedirect() {
  permanentRedirect("/locations/bristol");
}
