import HomeContent from "./components/HomeContent";

// App Router homepage route (Pages Router index removed to avoid "/" conflicts).

export const metadata = {
  title: "Foot+ Bristol | Foot Health Practitioner | Home Visits",
  description:
    "Foot Health Practitioner in Bristol. Home visits for nail, skin, and diabetic foot care. Book with Foot+ today.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
