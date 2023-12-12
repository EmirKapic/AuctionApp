import Hero from "./Hero/Hero";
import RecommendedTab from "./Recommended/RecommendedTab";
import SpecialOffers from "./SpecialOffers/SpecialOffers";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <RecommendedTab />
      <SpecialOffers />
    </div>
  );
}
